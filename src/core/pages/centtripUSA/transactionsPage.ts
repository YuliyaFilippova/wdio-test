
import AllureReporter from '@wdio/allure-reporter';
import { Actions } from '../../../core/utils/actions';
import { Button } from '../../controls/button';
import {
  general, USAMainPageElements,
  statementsPageElements,
  USATransactionsPageElements
} from '../locators';
import { other, requestBody, requestHeaders2, requestHeadersUSATransactions } from '../../../testData/other';
import { apiEndpoints } from '../../../testData/apiEndpoints';
import { connectionUSA } from '../../../../src/wdio.conf';
import { CommonPageUSA } from '../../../core/pages/centtripUSA/commonUSA';
import { DBQueries } from '../../../../src/testData/DBQueries';
import { Other } from '../../utils/other';
import { RandomGenerator } from '../../utils/randomGenerator';
import { HttpMethods } from '../../api/rest';
import { URLs } from "../../../urls";

const commonPageUSA = new CommonPageUSA();

export class TransactionsPage {
  async getTransactionRefId(externalId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getTransactionRefId(externalId), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows.length === 0) {
          reject(new Error('Card transaction not found'));
        } else {
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            resolve(row.RefId);
          });
        }
      });
    });
  };

  async selectAccountAndCheckStatus(corporate: string, account: string, transactionStatus: string): Promise<void> {
    AllureReporter.startStep('Check that the data on card transaction details are matched with expected');
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Statements'));
    await (await statementsPageElements.selectCorporate).waitForDisplayed();
    await (await general.divByName('Select account or card')).waitForDisplayed();
    await Button.clickOnOptionFromDropdown(await statementsPageElements.selectCorporate, await general.selectOption(corporate));
    await browser.pause(1000);
    await Button.clickOnOptionFromDropdown(await statementsPageElements.selectDepartament, await general.selectOption(account));
    await Button.clickOnOptionFromDropdown(await statementsPageElements.selectAccount, await general.selectOption(account));
    await (await statementsPageElements.statusOfLastTransaction).waitForDisplayed();
    expect(await (await statementsPageElements.statusOfLastTransaction).getAttribute('data-mat-icon-name')).toEqual(transactionStatus);
    AllureReporter.endStep();
  };

  async selectNessesaryCorporateAndGoToBalancePage(corporateAccount: string, corporate: string, account?: string): Promise<void> {
    AllureReporter.startStep(`Select ${corporateAccount} account and go to balance page with ${corporate} corporate`);
    await Actions.waitAndClick(await general.selectOption(corporateAccount));
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Transactions'));
    await Actions.waitAndClick(await general.linkByName('Balance'));
    await ((await USATransactionsPageElements.balance.selectOperatingAccountField)).waitForDisplayed();
    await (await USATransactionsPageElements.balance.collapseButton).moveTo();
    await Actions.waitAndClick(await USATransactionsPageElements.balance.collapseButton);
    await (await USATransactionsPageElements.balance.selectOperatingAccountField).addValue(corporate);
    await Actions.waitAndClick(await general.selectOption(corporate));
    if (account !== undefined) {
      await (await USATransactionsPageElements.balance.selectAccountField).waitForDisplayed();
      await (await USATransactionsPageElements.balance.selectAccountField).addValue(account);
      await Actions.waitAndClick(await general.selectOption(account));
    }
    try {
      await (await USAMainPageElements.columnHeader('Date')).waitForDisplayed();
    } catch {
      await (await general.divByName('No transactions')).waitForDisplayed();
    };
    AllureReporter.endStep();
  };

  async selectCorporateAndAccountOnStatementsPage(corporate: string, departament: string, account: string): Promise<void> {
    AllureReporter.startStep(`Go to Statements page select ${corporate} corporate and ${account} account`);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Statements'));
    await (await general.divByName('Select account or card')).waitForDisplayed();
    await Button.clickOnOptionFromDropdown(await statementsPageElements.selectCorporate, await general.selectOption(corporate));
    await browser.pause(2500);
    await Button.clickOnOptionFromDropdown(await statementsPageElements.selectDepartament, await general.selectOption(departament));
    await Actions.waitAndClick(await general.divByName('Filters'));
    await Button.clickOnOptionFromDropdown(await statementsPageElements.selectAccount, await general.selectOption(account));
    await Actions.waitAndClick(await general.buttonByName('Update'));
    await (await general.elementByText('Date')).waitForDisplayed();
    AllureReporter.endStep();
  };

  async updateBalancePage(corporate: string, account: string): Promise<void> {
    AllureReporter.startStep('Update Balance page with current settings');
    await Actions.waitAndClick(await USAMainPageElements.selectCorporateDropdown);
    await browser.refresh();
    await (await USATransactionsPageElements.balance.selectOperatingAccountField).waitForDisplayed();
    await (await USATransactionsPageElements.balance.collapseButton).moveTo();
    await Actions.waitAndClick(await USATransactionsPageElements.balance.collapseButton);
    await (await USATransactionsPageElements.balance.selectOperatingAccountField).addValue(corporate);
    await Actions.waitAndClick(await general.selectOption(corporate));
    await (await USATransactionsPageElements.balance.selectAccountField).waitForDisplayed();
    await (await USATransactionsPageElements.balance.selectAccountField).addValue(account);
    await Actions.waitAndClick(await general.selectOption(account));
    await (await USAMainPageElements.columnHeader('Date')).waitForDisplayed();
    AllureReporter.endStep();
  };

  async getStartBalanceData(): Promise<number> {
    let startBalance: string;
    AllureReporter.startStep('Get Start Balance Data');
    const startMoneyNumberDefault = await statementsPageElements.balance.startBalanceFull.getText();
    const startMoneyCentsNumberDefault = await statementsPageElements.balance.startBalanceCents.getText();
    startBalance = startMoneyNumberDefault + startMoneyCentsNumberDefault.substring(0, 3);
    AllureReporter.endStep();
    return Number(startBalance.replace(/[\s,%]/g, ''));
  };

  async getEndBalanceData(): Promise<number> {
    let endBalance: number;
    AllureReporter.startStep('Get End Balance Data');
    const endMoneyNumberDefault = await statementsPageElements.balance.endBalanceFull.getText();
    const endMoneyCentsNumberDefault = await statementsPageElements.balance.endBalanceCents.getText();
    const endBalance2 = endMoneyNumberDefault + endMoneyCentsNumberDefault.substring(0, 3);
    endBalance = await Other.parseLocaleNumber(endBalance2, 'en-GB');
    AllureReporter.endStep()
    return endBalance;
  };

  async getMoneyInData(): Promise<number> {
    let moneyIn: string;
    AllureReporter.startStep('Get Money In Data');
    const moneyInNumberDefault = await statementsPageElements.balance.moneyInFull.getText();
    const moneyInCentsNumberDefault = await statementsPageElements.balance.moneyInCents.getText();
    moneyIn = moneyInNumberDefault + moneyInCentsNumberDefault.substring(0, 3);
    AllureReporter.endStep();
    return Number(moneyIn.replace(/[\s,%]/g, ''));
  };

  async getMoneyOutData(): Promise<number> {
    let moneyOut: string;
    AllureReporter.startStep('Get Money Out Data');
    const moneyOutNumberDefault = await statementsPageElements.balance.moneyOutFull.getText();
    const moneyOutCentsNumberDefault = await statementsPageElements.balance.moneyOutCents.getText();
    moneyOut = moneyOutNumberDefault + moneyOutCentsNumberDefault.substring(0, 3);
    AllureReporter.endStep();
    return Number(moneyOut.replace(/[\s,%]/g, ''));
  };

  async fixAmountNumber(amount: number): Promise<number> {
    const fixNumber = amount.toFixed(2);
    return Number(fixNumber.replace(/[\s,%]/g, ''));
  };

  async createCustomTransfer(amount: number, amountAdyen: number, amountAdyenMinus: number, fromAccountName: string, fromAccountRefId: string, fromAccountAdyenId: string,
    fromAccountHolderName: string, fromAccountHolderId: string, toAccountName: string, toAccountRefId: string, toAccountAdyenId: string, toAccountHolderName: string,
    toAccountHolderId: string): Promise<string> {
    const creationDate = other.creationDate();
    const creationDateSecond = other.creationDate().add(1, 'seconds');
    const paymentTransactionTag = RandomGenerator.uppperTextAndNumbers(16);
    const depositTransactionTag = RandomGenerator.uppperTextAndNumbers(16);
    const randomTransactionTag = RandomGenerator.uppperTextAndNumbers(16);

    AllureReporter.startStep(`Create transfer from ${fromAccountName} to ${toAccountName}`);
    const createPaymentRequest = await HttpMethods.post(apiEndpoints.createPayment, requestHeadersUSATransactions, requestBody.createPaymentCustom(
      fromAccountRefId, toAccountRefId, toAccountName, amount),
      URLs.apiTransactionUrl);
    const paymentTransactionId = createPaymentRequest.body.results[0].value.id;
    expect(createPaymentRequest.status).toBe(200);

    const addTagToPaymentRequest = await HttpMethods.post(apiEndpoints.addTagToPayment(paymentTransactionId), requestHeadersUSATransactions,
      requestBody.addTagToPayment(paymentTransactionTag), URLs.apiTransactionUrl);
    expect(addTagToPaymentRequest.status).toBe(200);

    const addPaymentToGroupRequest = await HttpMethods.post(apiEndpoints.addPaymentToGroup, requestHeadersUSATransactions, requestBody.addPaymentToGroup(paymentTransactionId),
      URLs.apiTransactionUrl);
    expect(addPaymentToGroupRequest.status).toBe(204);

    const createDepositRequest = await HttpMethods.post(apiEndpoints.createDeposit, requestHeadersUSATransactions, requestBody.createDepositCustom(
      fromAccountRefId, toAccountRefId, fromAccountName, amount),
      URLs.apiTransactionUrl);
    const depositTransactionId = createDepositRequest.body.results[0].value.id;
    expect(createDepositRequest.status).toBe(200);

    const addTagToDepositRequest = await HttpMethods.post(apiEndpoints.addTagToDeposit(depositTransactionId), requestHeadersUSATransactions,
      requestBody.addTagToPayment(depositTransactionTag), URLs.apiTransactionUrl);
    expect(addTagToDepositRequest.status).toBe(200);

    const addDeposiToGroupRequest = await HttpMethods.post(apiEndpoints.addDepositToGroup, requestHeadersUSATransactions,
      requestBody.addDepositToGroup(paymentTransactionId, depositTransactionId), URLs.apiTransactionUrl);
    expect(addDeposiToGroupRequest.status).toBe(204);

    const applyActionToGroupRequest = await HttpMethods.post(apiEndpoints.applyActionToGroup, requestHeadersUSATransactions,
      requestBody.addActionToGroup(paymentTransactionId), URLs.apiTransactionUrl);
    expect(applyActionToGroupRequest.status).toBe(200);

    const paymentSettledNotificationRequest = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2,
      requestBody.paymentSettledNotificationCustom(paymentTransactionTag, fromAccountHolderName, fromAccountHolderId,
        amountAdyenMinus, fromAccountName, fromAccountAdyenId), URLs.apiAdyenNotificationUrl);
    expect(paymentSettledNotificationRequest.status).toBe(200);

    const depositSettledNotificationRequest = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2,
      requestBody.depositSettledNotification(depositTransactionTag, randomTransactionTag, paymentTransactionTag, toAccountHolderName, toAccountHolderId,
        amountAdyen, toAccountName, toAccountAdyenId, 'IncomingTransfer'), URLs.apiAdyenNotificationUrl);
    expect(depositSettledNotificationRequest.status).toBe(200);
    AllureReporter.endStep();
    return depositTransactionTag;
  };

  async getTransactionInfoByGroupId(groupID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getCardTransactionsInUSADbByGroupId(groupID), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows.length === 0) {
          reject(new Error('Card transaction not found'));
        } else {
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            resolve(row);
          });
        }
      });
    });
  };

  async checkStatementsBalances(startBalance: number, moneyIn: number, moneyOut: number, endBalance: number): Promise<void> {
    expect(await this.getStartBalanceData()).toEqual(startBalance);
    expect(await this.getMoneyInData()).toEqual(moneyIn);
    expect(await this.getMoneyOutData()).toEqual(moneyOut);
    expect(await this.getEndBalanceData()).toEqual(endBalance);
  };

  async fillDateFieldsAndCheckBalances(firstYear: string, secondYear: string, firstMonth: string, secondMonth: string, firstDay: string,
    secondDay: string, startBalance: number, moneyIn: number, moneyOut: number, endBalance: number, currentYear?: boolean) {
    await commonPageUSA.fillDateFieldCustom(await USATransactionsPageElements.balance.arrowDownIcon(1), firstYear, firstMonth, firstDay, currentYear);
    await Actions.waitAndClick(await statementsPageElements.balance.moneyInFull);
    await commonPageUSA.fillDateFieldCustom(await USATransactionsPageElements.balance.arrowDownIcon(2), secondYear, secondMonth, secondDay, currentYear);
    await browser.pause(1000);
    await this.checkStatementsBalances(startBalance, moneyIn, moneyOut, endBalance);
    await browser.pause(1000);
  }
}