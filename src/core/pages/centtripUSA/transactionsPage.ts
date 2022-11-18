
import AllureReporter from '@wdio/allure-reporter';
import { Actions } from '../../../core/utils/actions';
import { Button } from '../../controls/button';
import {
  general, USAMainPageElements,
  statementsPageElements,
  USATransactionsPageElements
} from '../locators';
import { connectionUSA } from '../../../../src/wdio.conf';
import { DBQueries } from '../../../../src/testData/DBQueries';

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
}
