import AllureReporter from '@wdio/allure-reporter';
// import { browser } from 'protractor';
import { Actions } from '../../../core/utils/actions';
// import {allureStep} from '../../../core/helper/allure/allureSteps';
import {
  dashboardPageElements, general, USAAccountsPageElements,
  USAMainPageElements
} from '../../../core/pages/locators';
// import {Waiters} from '../../../core/helper/waiters';
import { connectionUSA } from '../../../wdio.conf';
import { DBQueries } from '../../../testData/DBQueries';
import { Button } from '../../../../src/core/controls/button';
import { Other } from '../../utils/other';

export class DashboardPage {
  async openDashboardPage(account: string): Promise<void> {
    AllureReporter.startStep('Go to the Accounts page and open Dashboard page for selected account')
    await Actions.waitAndClick(await USAMainPageElements.selectCorporateDropdown);
    await Actions.waitAndClick(await general.selectOption(account));
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Account List'));
    await (await USAAccountsPageElements.accountsTable).waitForDisplayed();
    await (await USAAccountsPageElements.searchField).addValue(account);
    await (await USAMainPageElements.columnHeader('Account name')).waitForDisplayed();
    await Actions.waitAndClick(await USAAccountsPageElements.linkButtonForTheLastAccount);
    await (await general.buttonByName('Confirm')).waitForDisplayed();
    AllureReporter.endStep();
  };

  // async checkTransferRequest(method: string, url: string, methodType: string, expectedData: string, expExtraData?: any) {
  //   await browser.manage().logs().get('performance').then((browserLogs) => {
  //     let postData: string;
  //     browserLogs.forEach((browserLog) => {
  //       const message = JSON.parse(browserLog.message).message;
  //       if (message.method === method && message.params.request.url.includes(url) && message.params.request.method === methodType) {
  //         postData = message.params.request.postData;
  //       }
  //     });
  //     expect(postData).toContain(expectedData);
  //     if (expExtraData !== undefined) {
  //       expect(postData).not.toContain(expExtraData);
  //     }
  //     if (expExtraData === 400) {
  //       let statusCode: number;
  //       browserLogs.forEach((browserLog) => {
  //         const message = JSON.parse(browserLog.message).message;
  //         if (message.method === 'Network.responseReceived' && message.params.response.status === 400) {
  //           statusCode = message.params.response.status;
  //           expect(statusCode).toBe(400);
  //           expect(message.params.response.url).toContain(url);
  //         }
  //       });
  //     }
  //   });
  // };

  async checkingUIRecentTransactionData(creationDate: string, type: string, cardName: string, ccy: string, amount: number,
    details: string): Promise<void> {
    AllureReporter.startStep('Check that balance transaction data which was sent by API call are matched with data from UI');
    const dateUI = await (await dashboardPageElements.recentTransactions.dateOflastTransactionRow).getText();
    const typeUI = await (await dashboardPageElements.recentTransactions.typeOflastTransactionRow).getText();
    const cardNameUI = await (await dashboardPageElements.recentTransactions.cardNameOflastTransactionRow).getText();
    const ccyUI = await (await dashboardPageElements.recentTransactions.ccyOflastTransactionRow).getText();
    const amountUI = await (await dashboardPageElements.recentTransactions.amountOflastTransactionRow).getText();
    const detailsUI = await (await dashboardPageElements.recentTransactions.detailsOflastTransactionRow).getText();

    expect(dateUI).toBe(creationDate);
    expect(typeUI).toBe(type);
    expect(cardNameUI).toBe(cardName);
    expect(ccyUI).toBe(ccy);
    expect(Number(amountUI)).toBe(amount);
    expect(detailsUI).toBe(details);
    AllureReporter.endStep();
  };

  async checkingUISelectedTransactionData(row: number, creationDate:string, type:string, cardName: string, ccy:string, amount:number,
    details:string): Promise<void> {
      AllureReporter.startStep('Check that balance transaction data which was sent by API call are matched with data from UI');
      const dateUI = await (await dashboardPageElements.recentTransactions.dateOfSelectedTransactionRow(row)).getText();
      const typeUI = await (await dashboardPageElements.recentTransactions.typeOfSelectedTransactionRow(row)).getText();
      const cardNameUI = await (await dashboardPageElements.recentTransactions.cardNameOfSelectedTransactionRow(row)).getText();
      const ccyUI = await (await dashboardPageElements.recentTransactions.ccyOfSelectedTransactionRow(row)).getText();
      const amountUI = await (await dashboardPageElements.recentTransactions.amountOfSelectedTransactionRow(row)).getText();
      const detailsUI = await (await dashboardPageElements.recentTransactions.detailsOfSelectedTransactionRow(row)).getText();

      expect(creationDate).toContain(dateUI);
      expect(typeUI).toBe(type);
      expect(cardNameUI).toBe(cardName);
      expect(ccyUI).toBe(ccy);
      expect(Number(amountUI)).toBe(amount);
      expect(detailsUI).toBe(details);
      AllureReporter.endStep();
  };

  async getLastTransactionDataFromDB(): Promise<any> {
    const transactionData = [];
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getDataOfLastTransaction, function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            const id = row.Id;
            const sourceAccountCodeRefId = row.SourceAccountCodeRefId;
            const targetAccountName = row.TargetAccountName;
            const amount = row.Amount;
            transactionData.push(id, sourceAccountCodeRefId, targetAccountName, amount);
            resolve(transactionData);
          });
        }
      });
    });
  };

  async getTransactionTagFromDB(date: string, amount: number): Promise<any> {
    const transactionData = [];
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getTransactionData(date, amount), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const row = rows.reduce((acc, next) => acc.ID > next.ID ? acc : next);
          const transactionTag = row.Value;
          const fromAccountName = row.SourceAccountName;
          const fromAccountAdyenId = row.ExternalId;
          const fromAccountHolderId = row.AdyenAccountHolderId;
          const toAccountName = row.TargetAccountName;
          const toAccountAdyenId = row.ToExternalId;
          const toAccountHolderId = row.ToAdyenAccountHolderId;
          transactionData.push(transactionTag, fromAccountName, fromAccountAdyenId, fromAccountHolderId, toAccountName, toAccountAdyenId, toAccountHolderId);
          resolve(transactionData);
        }
      });
    });
  };

  async getExternalIdForCreatedTransaction(date: string, code: string): Promise<string> {
    let externalId: string;
    let transactionId = 0;
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getCreatedTransactionData(date, code), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows.length === 0) {
          reject(new Error('Transaction not found'));
        } else {
          console.log(rows);
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            if (row.Id > transactionId) {
              transactionId = row.Id;
              externalId = row.ExternalId;
            }
            resolve(externalId);
          });
        }
      });
    });
  };

  async getTransactionId(date: string, amount: number): Promise<string> {
    let externalId: string;
    let transactionId = 0;
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getCreatedTransactionValue(date, amount), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows.length === 0) {
          reject(new Error('Transaction not found'));
        } else {
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            if (row.Id > transactionId) {
              transactionId = row.Id;
              externalId = row.Value;
            }
            resolve(externalId);
          });
        }
      });
    });
  };

  async getTransferTransactionTagFromDB(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getTransferTransactionTag(id), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows.length === 0) {
          reject(new Error('Transaction not found'));
        } else {
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            const transactionTag = row.value;
            resolve(transactionTag);
          });
        }
      });
    });
  };

  async createTransferAndReturnBalanceData(firstAccount: string, secondAccount: string, amount: string): Promise<any> {
    const balanceData = [];
    AllureReporter.startStep(`Send ${amount}$ from ${firstAccount} to ${secondAccount}`);
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.fromAccount,
      await general.selectOption(firstAccount));
    await browser.pause(1000);
    try {
      await Button.clickOnOptionFromDropdown(await dashboardPageElements.toAccount,
        await general.selectOption(secondAccount));
    } catch {
      await Button.clickOnOptionFromDropdown(await dashboardPageElements.toAccount,
        await general.selectOption(secondAccount));
    }
    await (await dashboardPageElements.amountField).addValue(amount);
    await (await dashboardPageElements.accountBalance).waitForDisplayed();
    const accountBalance = await dashboardPageElements.accountBalance.getText();
    const accountBalanceNum = Other.parseLocaleNumber(accountBalance, 'en-GB');
    const cardBalance = await (await dashboardPageElements.cardBalance).getText();
    const cardBalanceNum = Other.parseLocaleNumber(cardBalance, 'en-GB');
    const totalBalance = await (await dashboardPageElements.totalBalance).getText();
    const totalBalanceNum = Other.parseLocaleNumber(totalBalance, 'en-GB');
    try {
      await Actions.waitAndClick(await general.buttonByName('Confirm'));
      await (await dashboardPageElements.transferSucessModal).waitForDisplayed();
    } catch {
      await Actions.waitAndClick(await general.spanByNameNum('Confirm', 3));
      await (await dashboardPageElements.transferSucessModal).waitForDisplayed();
    }
    await Actions.waitAndClick(await dashboardPageElements.modalCloseButton);
    await (await USAMainPageElements.columnHeader('DATE')).waitForDisplayed();
    const accountBalanceAfter = await dashboardPageElements.accountBalance.getText();
    const accountBalanceAfterNum = Other.parseLocaleNumber(accountBalanceAfter, 'en-GB');
    const cardBalanceAfter = await dashboardPageElements.cardBalance.getText();
    const cardBalanceAfterNum = Other.parseLocaleNumber(cardBalanceAfter, 'en-GB');
    const totalBalanceAfter = await dashboardPageElements.totalBalance.getText();
    const totalBalanceAfterNum = Other.parseLocaleNumber(totalBalanceAfter, 'en-GB');
    balanceData.push(accountBalanceNum, cardBalanceNum, totalBalanceNum, accountBalanceAfterNum, cardBalanceAfterNum, totalBalanceAfterNum);
    AllureReporter.endStep();
    return (balanceData);
  };

  //   async selectCorporateAndAccount(companyName: string, defauldAccount: string, accountName: string): Promise<void> {
  //     await Waiters.waitUntilElementIsDisplayed(dashboardPageElements.selectCorporate);
  //     await dashboardPageElements.selectCorporate.clear();
  //     await dashboardPageElements.selectAccount.clear();
  //     await Button.clickOnOptionFromDropdown(dashboardPageElements.selectCorporate, general.selectOption(companyName));
  //     await Waiters.waitUntilElementIsDisplayed(general.divByName(defauldAccount));
  //     await Button.clickOnOptionFromDropdown(dashboardPageElements.selectAccount, general.selectOption(accountName));
  //     await Waiters.waitUntilElementIsDisplayed(general.divByName(accountName));
  //   };

  //   async createTransferAndCheckErrors(firstAccount: string, secondAccount: string, amount: string): Promise<void> {
  //     await allureStep(`Send ${amount}$ from ${firstAccount} to ${secondAccount}`, async () => {
  //       await Button.clickOnOptionFromDropdown(dashboardPageElements.fromAccount, general.selectOption(firstAccount));
  //       await browser.sleep(1000);
  //       try { await Button.clickOnOptionFromDropdown(dashboardPageElements.toAccount, general.selectOption(secondAccount)); } catch {
  //         await Button.clickOnOptionFromDropdown(dashboardPageElements.toAccount, general.selectOption(secondAccount));
  //       } await Actions.sendKeys(dashboardPageElements.amountField, amount);
  //       await Waiters.waitUntilElementIsDisplayed(dashboardPageElements.accountBalance);
  //       await Actions.waitAndClick(general.buttonByName('Confirm'));
  //       await Waiters.waitUntilElementIsDisplayed(general.notificationByText('Something went wrong, please try again later'));
  //       expect(general.notificationByText(' Something went wrong, please try again later').isDisplayed());
  //     });
  //   };
  async getAccountsStatisticFromDB(entityCodeRefId: string): Promise<object> {
    const data = {};
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getAccountsStatistics(entityCodeRefId), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows.length === 0) {
          reject(new Error('Statistics not found'));
        } else {
          data[rows[0].AccountType] = rows[0]['COUNT(*)'];
          data[rows[1].AccountType] = rows[1]['COUNT(*)'];
          resolve(data);
        }
      });
    });
  }

  async getCardsStatisticFromDB(entityCodeRefId: string): Promise<object> {
    const data = {};
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getCardsStatistics(entityCodeRefId), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows.length === 0) {
          reject(new Error('Statistics not found'));
        } else {
          data[rows[0].AccountType] = rows[0]['COUNT(*)'];
          data[rows[1].AccountType] = rows[1]['COUNT(*)'];
          resolve(data);
        }
      });
    });
  }
}