
import AllureReporter from "@wdio/allure-reporter";
import { connectionUSA } from '../../../wdio.conf';
import { DBQueries } from '../../../testData/DBQueries';
import { Actions } from '../../utils/actions';
import {
  general, USAMainPageElements, statementsPageElements,
  USAManageCardsPageElements, USACreateUserPageElements
} from '../locators';

export class CommonPageUSA {
  async checkBrowserLogsForServerErrors(): Promise<void> {
    AllureReporter.addStep('Checking browserlogs for server errors');
    const statusCode = (await browser.getLogs('browser'))[0]['message'].match(/([5][0-9][0-9])/);
    if (statusCode !== null) { console.log(statusCode['input']) }
  };

  async getRelatedAccountsFromDB(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getRelatedAccountsQuery(id), function (err, rows) {
        if (err) {
          console.log('we came here');
          console.log(err);
          reject(err);
        } else if (rows.length === 0) {
          reject(new Error('EntityCodeId not found'));
        } else {
          console.log(rows);
          const numberOfAccounts = rows.length;
          resolve(numberOfAccounts);
        }
      });
    });
  };

  async signOutUSA(): Promise<void> {
    AllureReporter.addStep(`Sign Out from the current USA account`);
    await Actions.waitAndClick(await general.userIcon);
    await (await general.logOut).waitForDisplayed();
    await Actions.waitAndClick(await general.logOut);
  };

  async checkAccountLimitInDB(codeRefId: string): Promise<any> {
    const limitsAndExternalId = [];
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getAccountLimit(codeRefId), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            const groupId = row.GroupExternalId;
            const amount = row.Amount;
            const value = row.Value;
            const ruleId = row.RuleExternalId;
            limitsAndExternalId.push([groupId, amount, value, ruleId]);
            resolve(limitsAndExternalId);
          });
        }
      });
    });
  };

  async getAccountDetailsFromDB(codeRefId: string): Promise<any> {
    const accountData = [];
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getAccountDetails(codeRefId), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            const name = row.Name;
            const accountType = row.AccountType;
            const checkPrimary = row.IsPrimary;
            const checkLiable = row.IsLiable;
            const externalId = row.ExternalId;
            accountData.push(name, accountType, checkPrimary, checkLiable, externalId);
            resolve(accountData);
          });
        }
      });
    });
  };

  getAmountIds(amountArr: []) {
    const amountIds = {
      MaximumDailySpendAmount: '',
      MaximumMonthlySpendAmount: '',
      MaximumSingleTransactionAmount: '',
      MaximumDailyAtmWithdrawalAmount: '',
      MaximumMonthlyAtmWithdrawalAmount: ''
    };
    amountArr.forEach((item) => {
      amountIds[item[2]] = item[3];
    });
    return amountIds;
  };

  async checkThatSelectedElementsAreDisplayed(...checkingField: WebdriverIO.Element[]): Promise<void> {
    AllureReporter.startStep('Check that necessary elements are displayed');
    for (let i = 0; i < checkingField.length; i += 1) {
      expect(checkingField[i].isDisplayed());
    }
    AllureReporter.endStep();
  };

  async checkTransactionRulesForOwnCard(cardName: string): Promise<any> {
    const cardData = [];
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getTransactionRulesForOwnCard(cardName), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          Object.keys(rows).forEach(function (keyItem) {
            const CardRequest = rows[keyItem];
            cardData.push(CardRequest);
            resolve(cardData);
          });
        }
      });
    });
  };

  async getCorporateAdyenIdFromDB(companyName: string): Promise<any> {
    const adyenData = [];
    let externalId: string;
    let accountHolderId: string;
    let corporateId: string;

    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.C11613_1Query(companyName), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows.length === 0) {
          reject(new Error('ExternalId not found'));
        } else {
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            externalId = row.CorporateExternalId;
            accountHolderId = row.AdyenAccountHolderId;
            corporateId = row.CorporateId;
            expect(externalId).not.toEqual(undefined);
            expect(accountHolderId).not.toEqual(undefined);
            adyenData.push(externalId, accountHolderId, corporateId);
            resolve(adyenData);
          });
        }
      });
    });
  };

  async pasteCompanyNameAndClickOnTheCreateButton(companyName: string, button: WebdriverIO.Element): Promise<void> {
    AllureReporter.startStep('Paste the company name into the search field and click the create button');
    await (await USAMainPageElements.searchField).addValue(companyName);
    try {
      await Actions.waitAndClick(button);
    } catch {
      try {
        await browser.pause(20000);
        await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Manage cards'));
        await (await USAManageCardsPageElements.table.nameOfLastCard).waitForDisplayed();
        await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Provisioning'));
        await (await USAMainPageElements.columnHeader('KYC Approved Date')).waitForDisplayed();
        await (await USAMainPageElements.searchFieldClear).clearValue();
        await (await USAMainPageElements.searchField).addValue(companyName);
        await Actions.waitAndClick(button);
      } catch {
        throw new Error('Corporate not found');
      }
    };
    AllureReporter.endStep();
  };

  async checkFullCorporateDataInEHDB(companyName: string, corporateName: string, postalCode: string, street: string, city: string, state: string, country: string, phoneType: string,
    phoneNumber: string, email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getFullCorporateDataQuery(companyName), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            const corporate = row.LegalName;
            expect(corporateName).toEqual(row.LegalName);
            expect(postalCode).toEqual(row.PostalCode);
            expect(street).toEqual(row.Street);
            expect(city).toEqual(row.City);
            expect(state).toEqual(row.State);
            expect(country).toEqual(row.Country);
            expect(phoneType).toEqual(row.PhoneType);
            expect(phoneNumber).toEqual(row.PhoneNumber);
            expect(email).toEqual(row.Email);
            resolve(corporate);
          });
        }
      });
    });
  };

  async getExternalIDforCard(name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getExternalId(name), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows.length === 0) {
          reject(new Error('ExternalId not found'));
        } else {
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            const externalId = row.ExternalId;
            resolve(externalId);
          });
        }
      });
    });
  };

  async fillDateFieldCustom(dateButton: WebdriverIO.Element, year: string, month: string, day: string, currentYear?: boolean): Promise<void> {
    AllureReporter.startStep('Set date in date picker');
    try {
      await Actions.waitAndClick(dateButton);
      await (await USACreateUserPageElements.dateActivePeriod).waitForDisplayed();
    } catch {
      await Actions.waitAndClick(dateButton);
    }
    await Actions.waitAndClick(await USACreateUserPageElements.dateActivePeriod);
    await Actions.waitAndClick(await USACreateUserPageElements.previousArrow);
    if (currentYear === false) {
      await Actions.waitAndClick(await general.divByName(year));
    } else {
      await Actions.waitAndClick(await general.divByNameNum(year, 2));
    }
    await Actions.waitAndClick(await general.divByName(month));
    await Actions.waitAndClick(await statementsPageElements.dateByNum(day, 1));
    AllureReporter.endStep();
  };
}
