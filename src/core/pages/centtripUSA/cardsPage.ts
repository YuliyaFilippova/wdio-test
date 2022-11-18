/* eslint-disable max-len */
import { connectionUSA } from '../../../wdio.conf';
import { DBQueries } from '../../../testData/DBQueries';
import AllureReporter from '@wdio/allure-reporter';
import {
  general, USAManageCardsPageElements, USAExpensesPageElements,
  USAMainPageElements, USATransactionsPageElements
} from '../locators';
import { Actions } from '../../utils/actions';
import { Button } from '../../controls/button';
import { downloadsExpPath } from '../../../testData/usersData';

const XLSX = require('xlsx');

export class CardsPage {
  async selectingFieldCheckPattern(num: number, columnName: string, isPresentCheck: boolean): Promise<void> {
    AllureReporter.startStep(`Click on the ${columnName} checkbox and check that the selected column is is appeared/disappeared`);
    await Actions.waitAndClick(await USAExpensesPageElements.fieldsButton);
    await Actions.waitAndClick(await USAExpensesPageElements.checkboxByNumber(num));
    if (isPresentCheck === false) {
      try {
        await (await USAExpensesPageElements.columnheaderByName(columnName)).waitForDisplayed();
      } catch {
        await Actions.waitAndClick(await USAExpensesPageElements.checkboxByNumber(num));
        await (await USAExpensesPageElements.columnheaderByName(columnName)).waitForDisplayed();
      }
    } else {
      await (await USAExpensesPageElements.columnheaderByName(columnName)).waitForDisplayed({ reverse: true });
      expect(await USAExpensesPageElements.columnheaderByName(columnName)).not.toBePresent();
    }
    AllureReporter.endStep();
  };

  async checkCardGroupLimit(corpNAme: string): Promise<string> {
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getCardGroupLimitCorporate(corpNAme), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows.length === 0) {
          reject(new Error('Card not found'));
        } else {
          const cardGroupLimit = rows[0].CorporateGroupLimitType;
          resolve(cardGroupLimit);
        }
      });
    });
  };

  async generateXlsxFileWithCustomCardData(email: string, firstName: string, lastName: string, embossName: string, DD: string, MM: string, YYYY: string,
    mobileCode: string, mobileNumber: string, corporateName: string, shared: string, filename: string): Promise<void> {
    AllureReporter.startStep(`Generate .xlsx file with CardData for Batch card upload process`);
    const data = [];
    data.push(['Corporate name', 'First Name', 'Last Name', 'Emboss Name', 'Email', 'Birth Date. Day (DD)', 'Birth Date. Month (MM)',
      'Birth Date. Year (YYYY)', 'Mobile Phone Code (for example, enter 1 for USA)', 'Mobile Phone Number', 'Shared balance (Yes/No)']);
    data.push([corporateName, firstName, lastName, embossName, email, DD, MM, YYYY, mobileCode, mobileNumber, shared]);
    const book = XLSX.utils.book_new();
    const sheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(book, sheet, 'sheet1');
    XLSX.writeFile(book, `${downloadsExpPath}/${filename}.xlsx`);
    AllureReporter.endStep();
  };

  async goToCardOrdersPageAndSelectCorporate(corporate: string, account: string): Promise<void> {
    AllureReporter.startStep(`Open Card Orders page and select ${corporate} corporate and ${account} account`);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Manage cards'));
    await Actions.waitAndClick(await general.linkByName('Card orders'));
    await (await USAManageCardsPageElements.cardOrders.corporateField).waitForDisplayed();
    await Actions.waitAndClick(await USAManageCardsPageElements.cardOrders.corporateField);
    await (await USAManageCardsPageElements.cardOrders.corporateField).setValue(corporate);
    await Actions.waitAndClick(await general.selectOption(corporate));
    await Button.clickOnOptionsFromDropdown(await USAManageCardsPageElements.cardOrders.operatingAccountField, await general.selectOption(account));
    await Actions.clickTwiceIfExpectedElementNotDisplayed(await general.buttonByName('Next'), await USAManageCardsPageElements.cardOrders.selectDeliveryType);
    await (await USAManageCardsPageElements.cardOrders.selectDeliveryType).waitForDisplayed();
    await Actions.waitAndClick(await USAManageCardsPageElements.cardOrders.selectDeliveryAddress);
    await Actions.clickTwiceIfExpectedElementNotDisplayed(await USAManageCardsPageElements.cardOrders.nextButtonDelivery,
      await general.spanByName('Download template'));
    await (await general.spanByName('Download template')).waitForDisplayed();
    AllureReporter.endStep();
  };

  async checkBatchCardUploadSuccess(user: string, corporate: string, account: string, numberOfCards: string): Promise<void> {
    AllureReporter.startStep(`Go to Batch Card Result page and check that all cards created successfully`);
    await Actions.waitAndClick(await general.linkByName('Batch card result'));
    await (await USAManageCardsPageElements.batchCardResult.tableResults).waitForDisplayed();
    // do {
    //   await (await USAManageCardsPageElements.batchCardResult.refreshBatchCardResults).click();
    //   console.log('we are here in DO');
    // }
    // while (await (await USAManageCardsPageElements.batchCardResult.progressStatusOfLastCard).waitForDisplayed());
    // console.log('we are out of DO-WHILE');
    // await (await USAManageCardsPageElements.batchCardResult.successStatusOfLastCard).waitForDisplayed();

    try {
      await (await USAManageCardsPageElements.batchCardResult.progressStatusOfLastCard).waitForDisplayed();
    } catch {
      try {
        await browser.refresh();
        await (await USAManageCardsPageElements.batchCardResult.progressStatusOfLastCard).waitForDisplayed();
      } catch {
        await (await USAManageCardsPageElements.batchCardResult.successStatusOfLastCard).waitForDisplayed();
      }
    }
    try {
      await (await USAManageCardsPageElements.batchCardResult.successStatusOfLastCard).waitForDisplayed();
    }
    catch {
      await browser.refresh();
      await (await USAManageCardsPageElements.batchCardResult.successStatusOfLastCard).waitForDisplayed();
    }
    const userName = await USAManageCardsPageElements.batchCardResult.userOfLastCard.getText();
    const corpName = await USAManageCardsPageElements.batchCardResult.corporateOfLastCard.getText();
    const accName = await USAManageCardsPageElements.batchCardResult.accountNameOfLastCard.getText();
    const totalCards = await USAManageCardsPageElements.batchCardResult.totalCardsOfLastCard.getText();
    expect(userName).toEqual(user);
    expect(corpName).toEqual(corporate);
    expect(accName).toEqual(account);
    expect(totalCards).toEqual(numberOfCards);
    AllureReporter.endStep();
  };

  async checkCardLimitsPattern(maxDaily: string, maxMonthly: string, limitPerDay: string, limitPerMonth: string, maxTransaction: string,
    limitsMixed: boolean): Promise<void> {
    AllureReporter.startStep('Check that card limits are matched with expected');
    if (limitsMixed === false) {
      const maxDailySpendField = await (await USAManageCardsPageElements.details.limits.maxDailySpendField).getText();
      const maxMonthlySpendField = await (await USAManageCardsPageElements.details.limits.maxMonthlySpendField).getText();
      const atmLimitPerDayField = await (await USAManageCardsPageElements.details.limits.atmLimitPerDayField).getText();
      const atmLimitPerMonthField = await (await USAManageCardsPageElements.details.limits.atmLimitPerMonthField).getText();
      const maxTransactionAmountField = await (await USAManageCardsPageElements.details.limits.maxTransactionAmountField).getText();

      expect(maxDailySpendField.substring(2)).toEqual(`$ ${maxDaily},000.00`);
      expect(maxMonthlySpendField.substring(2)).toEqual(`$ ${maxMonthly},000.00`);
      expect(atmLimitPerDayField.substring(2)).toEqual(`$ ${limitPerDay},000.00`);
      expect(atmLimitPerMonthField.substring(2)).toEqual(`$ ${limitPerMonth},000.00`);
      expect(maxTransactionAmountField.substring(2)).toEqual(`$ ${maxTransaction},000.00`);
    } else if (limitsMixed === true) {
      const atmLimitPerDayField = await (await USAManageCardsPageElements.details.limits.atmCardLimitPerDayField).getText();
      const atmLimitPerMonthField = await (await USAManageCardsPageElements.details.limits.atmCardPerMonthField).getText();
      const maxDailySpendField = await (await USAManageCardsPageElements.details.limits.cardDailySpendField).getText();
      const maxMonthlySpendField = await (await USAManageCardsPageElements.details.limits.cardMonthlySpendField).getText();
      const maxTransactionAmountField = await (await USAManageCardsPageElements.details.limits.cardTransactionAmountField).getText();

      expect(maxDailySpendField).toEqual(`$ ${maxDaily}.00`);
      expect(maxMonthlySpendField).toEqual(`$ ${maxMonthly}.00`);
      expect(atmLimitPerDayField).toEqual(`$ ${limitPerDay}.00`);
      expect(atmLimitPerMonthField).toEqual(`$ ${limitPerMonth}.00`);
      expect(maxTransactionAmountField).toEqual(`$ ${maxTransaction}.00`);
    }
    AllureReporter.endStep();
  };

  async checkCardLimitsOnManageLimitsModalPattern(maxDaily: string, maxMonthly: string, limitPerDay: string, limitPerMonth: string, maxTransaction: string): Promise<void> {
    AllureReporter.startStep(`Check that card limtis on the "Manage Limits" modal are matched with expected`);
    try {
      await Actions.waitAndClick(await USAManageCardsPageElements.details.manageLimitsButton);
      await (await USAManageCardsPageElements.manageLimits.maxDailySpendField).waitForDisplayed();
    } catch { await Actions.waitAndClick(await USAManageCardsPageElements.details.manageLimitsButton); }
    await (await USAManageCardsPageElements.manageLimits.maxDailySpendField).waitForDisplayed();
    const maxDailySpend = await (await USAManageCardsPageElements.manageLimits.maxDailySpendField).getValue();
    const maxMonthlySpend = await (await USAManageCardsPageElements.manageLimits.maxMonthlySpendField).getValue();
    const atmDayLimit = await (await USAManageCardsPageElements.manageLimits.atmDaylimitField).getValue();
    const atmMonthLimit = await (await USAManageCardsPageElements.manageLimits.atmMonthlimitField).getValue();
    const maxSingleTrans = await (await USAManageCardsPageElements.manageLimits.maxSingleTransactionField).getValue();
    expect(maxDailySpend).toBe(maxDaily);
    expect(maxMonthlySpend).toBe(maxMonthly);
    expect(atmDayLimit).toBe(limitPerDay);
    expect(atmMonthLimit).toBe(limitPerMonth);
    expect(maxSingleTrans).toBe(maxTransaction);
    AllureReporter.endStep();
  };

  async updateCardLimitsPattern(maxDaily: string, maxMonthly: string, limitPerDay: string, limitPerMonth: string, maxTransaction: string): Promise<void> {
    AllureReporter.startStep('Update the card limits');
    await Actions.waitAndClick(await USAManageCardsPageElements.details.manageLimitsButton);
    await (await USAManageCardsPageElements.manageLimits.maxDailySpendField).waitForDisplayed();
    await (await USAManageCardsPageElements.manageLimits.maxDailySpendField).setValue(maxDaily);
    await (await USAManageCardsPageElements.manageLimits.maxMonthlySpendField).setValue(maxMonthly);
    await (await USAManageCardsPageElements.manageLimits.atmDaylimitField).setValue(limitPerDay);
    await (await USAManageCardsPageElements.manageLimits.atmMonthlimitField).setValue(limitPerMonth);
    await (await USAManageCardsPageElements.manageLimits.maxSingleTransactionField).setValue(maxTransaction);
    await Actions.waitAndClick(await USAManageCardsPageElements.manageLimits.saveButton);
    await (await general.divByName('The limit(s) are updated')).waitForDisplayed();
    expect(general.divByName('The limit(s) are updated').isDisplayed());
    await Actions.waitAndClick(await USAManageCardsPageElements.closeNotification);
    await (await general.divByName('The limit(s) are updated')).waitForDisplayed();
    AllureReporter.endStep();
  };

  async checkingUIBalanceTransferData(rowNumber: number, type: string, amount: number, status: string, details: string, recipient: string): Promise<void> {
    AllureReporter.startStep('Check that transfer data on the Balance page are matched with data from UI');
    const typeUI = await USATransactionsPageElements.balanceTransactions.typeOfSelectedTransactionRow(rowNumber).getText();
    const amountUI = await USATransactionsPageElements.balanceTransactions.amountOfSelectedTransactionRow(rowNumber).getText();
    const statusUI = await USATransactionsPageElements.balanceTransactions.statusOfSelectedTransactionRow(rowNumber).getAttribute('data-mat-icon-name');
    const detailsUI = await USATransactionsPageElements.balanceTransactions.detailsAfterOfSelectedTransactionRow(rowNumber).getText();
    const recipientUI = await USATransactionsPageElements.balanceTransactions.recipientOfSelectedTransactionRow(rowNumber).getText();

    expect(typeUI).toBe(type);
    expect(Number(amountUI)).toBe(amount);
    expect(statusUI).toBe(status);
    expect(recipientUI).toBe(recipient);
    expect(detailsUI).toBe(details);
    AllureReporter.endStep();
  };

  async goToCardTransactionAndSelectCard(corporate: string, operatingAccount: string, card: string, authCode: string): Promise<void> {
    AllureReporter.startStep('Open Expenses page and select necessary card and fields');
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Expenses'));
    await (await general.elementByText('No Card transactions')).waitForDisplayed();
    await Button.clickOnOptionFromDropdown(await USAExpensesPageElements.selectCorporateAccount,
      await general.selectOption(corporate));
    await Button.clickOnOptionFromDropdown(await USAExpensesPageElements.selectOperatingAccount,
      await general.selectOption(operatingAccount));
    await this.selectingFieldCheckPattern(1, 'Date', false);
    await Actions.waitAndClick(await USAExpensesPageElements.filtersButton);
    await Button.clickOnOptionsFromDropdown(await USAExpensesPageElements.selectCard,
      await general.spanByName('Check all'), await general.spanByName(card));
    await browser.keys('Escape');
    await Actions.waitAndClick(await USAExpensesPageElements.updateButton);
    AllureReporter.endStep();
  };

  async checkingUITransactionData(rowNumber: number, creationDate: string, type: string, authCode: string, ccy: string, amount: number, merchant: string, cleared: string, labels: string, receipts: string,
    sharedBalance: string, cardName: string, cardNumber: string, country: string, state: string, city: string, details: string, merchantCategory: string, mcc: string): Promise<void> {
    AllureReporter.startStep('Check that card transaction data which was sent by API call are matched with data from UI');
    const dateUI = await (await USAExpensesPageElements.cardTransactions.dateOfSelectedTransactionRow(rowNumber)).getText();
    const typeUI = await (await USAExpensesPageElements.cardTransactions.typeOfSelectedTransactionRow(rowNumber)).getText();
    const authCodeUI = await (await USAExpensesPageElements.cardTransactions.authOfSelectedTransactionRow(rowNumber)).getText();
    const ccyUI = await (await USAExpensesPageElements.cardTransactions.ccyOfSelectedTransactionRow(rowNumber)).getText();
    const amountUI = await (await USAExpensesPageElements.cardTransactions.amountOfSelectedTransactionRow(rowNumber)).getText();
    const merchantUI = await (await USAExpensesPageElements.cardTransactions.merchantOfSelectedTransactionRow(rowNumber)).getText();
    const clearedUI = await (await USAExpensesPageElements.cardTransactions.clearedOfSelectedTransactionRow(rowNumber)).getAttribute('data-mat-icon-name');
    const labelsUI = await (await USAExpensesPageElements.cardTransactions.labelsOfSelectedTransactionRow(rowNumber)).getText();
    const receiptsUI = await (await USAExpensesPageElements.cardTransactions.receiptsOfSelectedTransactionRow(rowNumber)).getText();
    const sharedBalanceUI = await (await USAExpensesPageElements.cardTransactions.sharedBalanceOfSelectedTransactionRow(rowNumber)).getAttribute('data-mat-icon-name');
    const cardNameUI = await (await USAExpensesPageElements.cardTransactions.cardNameOfSelectedTransactionRow(rowNumber)).getText();
    const cardNumberUI = await (await USAExpensesPageElements.cardTransactions.cardNumberOfSelectedTransactionRow(rowNumber)).getText();
    const countryUI = await (await USAExpensesPageElements.cardTransactions.countryOfSelectedTransactionRow(rowNumber)).getText();
    const stateUI = await (await USAExpensesPageElements.cardTransactions.stateOfSelectedTransactionRow(rowNumber)).getText();
    const cityUI = await (await USAExpensesPageElements.cardTransactions.cityOfSelectedTransactionRow(rowNumber)).getText();
    const detailsUI = await (await USAExpensesPageElements.cardTransactions.detailsOfSelectedTransactionRow(rowNumber)).getText();
    const merchantCategoryUI = await (await USAExpensesPageElements.cardTransactions.merchantCategoryOfSelectedTransactionRow(rowNumber)).getText();
    const mccUI = await (await USAExpensesPageElements.cardTransactions.mccCategoryOfSelectedTransactionRow(rowNumber)).getText();

    expect(authCodeUI).toBe(authCode);
    expect(dateUI).toBe(creationDate);
    expect(typeUI).toBe(type);
    expect(ccyUI).toBe(ccy);
    expect(Number(amountUI)).toBe(amount);
    expect(merchantUI).toBe(merchant);
    expect(clearedUI).toBe(cleared);
    expect(labelsUI).toBe(labels);
    expect(receiptsUI).toBe(receipts);
    expect(sharedBalanceUI).toBe(sharedBalance);
    expect(cardNameUI).toBe(cardName);
    expect(cardNumberUI).toBe(cardNumber);
    expect(countryUI).toBe(country);
    expect(stateUI).toBe(state);
    expect(cityUI).toBe(city);
    expect(detailsUI).toBe(details);
    expect(merchantCategoryUI).toBe(merchantCategory);
    expect(mccUI).toBe(mcc);
    AllureReporter.endStep();
  };
}; 

export const cardsPage = new CardsPage();
