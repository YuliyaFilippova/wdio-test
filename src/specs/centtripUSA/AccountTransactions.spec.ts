import allureReporter from '@wdio/allure-reporter';
import { Credentials } from '../../testData/Credentials';
import { SignInPage } from '../../core/pages/centtripAppWeb/signInPage';
import { addEpic } from '../../core/helper/allure/reporter';
import {
  general, statementsPageElements
} from '../../core/pages/locators';
import { Other } from '../../core/utils/other';
import { getUSATransactionDate, other, requestBody, requestHeaders2 } from '../../testData/other';
import { HttpMethods } from '../../core/api/rest';
import { apiEndpoints } from '../../testData/apiEndpoints';
import { RandomGenerator } from '../../core/utils/randomGenerator';
import { CardsPage } from '../../core/pages/centtripUSA/cardsPage';
import { TransactionsPage } from '../../core/pages/centtripUSA/transactionsPage';
import { transactionSettings } from '../../testData/usersData';
import { URLs } from '../../urls';
import moment = require('moment');

const signInPage = new SignInPage();
const cardsPage = new CardsPage();
const transactionsPage = new TransactionsPage();

describe(`Account transactions > Balance page`, () => {
  const creationDate = other.creationDate();
  const creationDateSecond = other.creationDate().add(1, 'seconds');
  const creationDateThird = other.creationDate().add(20, 'seconds');
  const creationDateFourth = other.creationDate().add(3, 'seconds');
  const creationDateFifth = other.creationDate().add(4, 'seconds');
  const creationDateUI = getUSATransactionDate();

  before(async () => {
    addEpic('Account transactions');
    allureReporter.addFeature('Balance page');
    await browser.url(URLs.USAPortalURL);
  });
  afterEach(async () => {
    await Other.deleteCacheCookiesUSA();
  });

  it(`[C24354] Card transaction on Balance page 01 Auth = Cap | ecommerce | no state @smoke`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24354');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Amir wallet', 'Snacks and Drinks', 'Snacks and Drinks');

    const startBalance = await transactionsPage.getStartBalanceData();
    const endBalance = await transactionsPage.getEndBalanceData();
    const moneyIn = await transactionsPage.getMoneyInData();
    const moneyOut = await transactionsPage.getMoneyOutData();

    const amount = 31.00;
    const amountAdyenMinus = -amount * 100;
    const randomAuthCode01 = RandomGenerator.numbers(6);
    const paymentId = RandomGenerator.uppperTextAndNumbers(9) + ' ' + RandomGenerator.uppperTextAndNumbers(6);
    const randomId = RandomGenerator.uppperTextAndNumbers(9) + ' ' + RandomGenerator.uppperTextAndNumbers(6);
    const data = transactionSettings.olgaNuggets;
    const creationDateUI = getUSATransactionDate();

    const createAuthorizeRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2,
      requestBody.authorizeTransaction(creationDate, transactionSettings.types.ecommerce, paymentId, randomAuthCode01, 'USD', amountAdyenMinus, 'USD', amountAdyenMinus,
        data.fromAccountHolderName, data.fromAccountHolderId, data.fromAccountName, data.fromAccountAdyenId, data.fromCardAdyenId, data.merchantMCC, data.merchantId,
        data.merchantCity, null, data.merchantCountry, data.merchantName, data.merchantAll, data.reference), URLs.apiAdyenNotificationUrl);
    expect(createAuthorizeRequest.status).toBe(200);
    await browser.refresh()
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Amir wallet', 'Snacks and Drinks', 'Snacks and Drinks');

    const startBalanceAfter = await transactionsPage.getStartBalanceData();
    const endBalanceAfter = await transactionsPage.getEndBalanceData();
    const moneyInAfter = await transactionsPage.getMoneyInData();
    const moneyOutAfter = await transactionsPage.getMoneyOutData();

    expect(startBalance).toEqual(startBalanceAfter);
    expect(endBalanceAfter).toEqual(await transactionsPage.fixAmountNumber(endBalance - 31));
    expect(moneyIn).toEqual(moneyInAfter);
    expect(moneyOutAfter).toEqual(await transactionsPage.fixAmountNumber(moneyOut + 31));
    await cardsPage.checkingUIBalanceTransactionData(1, creationDateUI, 'Ecommerce', 'USD', -31.00, 'in-progress', endBalanceAfter, 'NB Bookstore New York US',
      data.fromCardName, '');

    const capturedTransactionRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2,
      requestBody.capturedTransaction(other.creationDate(), transactionSettings.types.ecommerce, randomId, 'U8P3Q0LYP D7H6GD', amountAdyenMinus, data.fromAccountHolderName,
        data.fromAccountHolderId, data.fromAccountName, data.fromAccountAdyenId, data.fromCardAdyenId, data.merchantMCC, data.merchantId, data.merchantCity, null,
        data.merchantCountry, data.merchantName, data.merchantAll), URLs.apiAdyenNotificationUrl);
    expect(capturedTransactionRequest.status).toBe(200);
    await browser.refresh()
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Amir wallet', 'Snacks and Drinks', 'Snacks and Drinks');

    expect(startBalance).toEqual(startBalanceAfter);
    expect(endBalanceAfter).toEqual(await transactionsPage.fixAmountNumber(endBalance - 31));
    expect(moneyIn).toEqual(moneyInAfter);
    expect(moneyOutAfter).toEqual(await transactionsPage.fixAmountNumber(moneyOut + 31));
    await cardsPage.checkingUIBalanceTransactionData(1, creationDateUI, 'Ecommerce', 'USD', -31.00, 'approved', endBalanceAfter, 'NB Bookstore New York US',
      data.fromCardName, '');
  });

  it(`[C24355] Card transaction on Balance page 02 Auth = Exp = Cap | moto @smoke`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24355');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Amir wallet', 'Snacks and Drinks', 'Diana Bishop');
    await (await general.elementByText('Date')).waitForDisplayed();
    const startBalance = await transactionsPage.getStartBalanceData();
    const endBalance = await transactionsPage.getEndBalanceData();
    const moneyIn = await transactionsPage.getMoneyInData();
    const moneyOut = await transactionsPage.getMoneyOutData();

    const amount = 32.00;
    const amountAdyen = amount * 100;
    const amountAdyenMinus = -amount * 100;
    const randomAuthCode = RandomGenerator.numbers(6);
    const paymentId = RandomGenerator.uppperTextAndNumbers(9) + ' ' + RandomGenerator.uppperTextAndNumbers(6);
    const randomId = RandomGenerator.uppperTextAndNumbers(9) + ' ' + RandomGenerator.uppperTextAndNumbers(6);
    const data = transactionSettings.dianaBishop;

    const createAuthorizeRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2,
      requestBody.authorizeTransaction(creationDate, transactionSettings.types.moto, paymentId, randomAuthCode, 'USD', amountAdyenMinus, 'USD', amountAdyenMinus,
        data.fromAccountHolderName, data.fromAccountHolderId, data.fromAccountName, data.fromAccountAdyenId, data.fromCardAdyenId, data.merchantMCC, data.merchantId,
        data.merchantCity, data.merchantState, data.merchantCountry, data.merchantName, data.merchantAll, data.reference), URLs.apiAdyenNotificationUrl);
    expect(createAuthorizeRequest.status).toBe(200);

    const paymentExpiredTransactionRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2,
      requestBody.expiredTransaction(creationDateSecond, transactionSettings.types.moto, paymentId, randomAuthCode, amountAdyenMinus, 'USD', amountAdyenMinus, amountAdyen,
        data.fromAccountHolderName, data.fromAccountHolderId, data.fromAccountName, data.fromAccountAdyenId, data.fromCardName, data.fromCardAdyenId, data.merchantMCC,
        data.merchantId, data.merchantCity, data.merchantState, data.merchantCountry, data.merchantName, data.merchantAll), URLs.apiAdyenNotificationUrl);
    expect(paymentExpiredTransactionRequest.status).toBe(200);

    const capturedTransactionRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2,
      requestBody.capturedTransaction(creationDateThird, transactionSettings.types.moto, randomId, paymentId, amountAdyenMinus, data.fromAccountHolderName,
        data.fromAccountHolderId, data.fromAccountName, data.fromAccountAdyenId, data.fromCardAdyenId, data.merchantMCC, data.merchantId, data.merchantCity, null,
        data.merchantCountry, data.merchantName, data.merchantAll), URLs.apiAdyenNotificationUrl);
    expect(capturedTransactionRequest.status).toBe(200);

    await browser.refresh();
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Amir wallet', 'Snacks and Drinks', 'Diana Bishop');
    await (await general.elementByText('Date')).waitForDisplayed();
    const startBalanceAfter = await transactionsPage.getStartBalanceData();
    const endBalanceAfter = await transactionsPage.getEndBalanceData();
    const moneyInAfter = await transactionsPage.getMoneyInData();
    const moneyOutAfter = await transactionsPage.getMoneyOutData();

    expect(startBalance).toEqual(startBalanceAfter);
    const difff = await transactionsPage.fixAmountNumber(endBalance - 32)
    expect(endBalanceAfter).toEqual(await transactionsPage.fixAmountNumber(endBalance - 32));
    expect(moneyInAfter).toEqual(await transactionsPage.fixAmountNumber(moneyIn + 32));
    expect(moneyOutAfter).toEqual(await transactionsPage.fixAmountNumber(moneyOut + 64));
    await cardsPage.checkingUIBalanceTransactionData(3, creationDateUI, 'Moto', 'USD', -32.00, 'approved', endBalanceAfter, 'NB Bookstore New York NY US',
      data.fromCardName, '');
    await cardsPage.checkingUIBalanceTransactionData(2, creationDateUI, 'Moto', 'USD', 32.00, 'approved', endBalanceAfter + 32, 'Refund from NB Bookstore New York NY US',
      data.fromCardName, '');
    await cardsPage.checkingUIBalanceTransactionData(1, creationDateUI, 'Moto', 'USD', -32.00, 'approved', endBalanceAfter, 'Return to NB Bookstore New York NY US',
      data.fromCardName, '');
  });

  it(`[C24356] Card transaction on Balance page 03 AuthFX = Cap + Can + Can, Ref | recurring @smoke`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24356');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Amir wallet', 'Snacks and Drinks', 'Diana Bishop');
    await (await general.elementByText('Date')).waitForDisplayed();
    const startBalance = await transactionsPage.getStartBalanceData();
    const endBalance = await transactionsPage.getEndBalanceData();
    const moneyIn = await transactionsPage.getMoneyInData();
    const moneyOut = await transactionsPage.getMoneyOutData();

    const amount = 24.00;
    const amountAdyenMinus = -amount * 100;
    const originalAmount = 22.00;
    const originalAmountAdyenMinus = -originalAmount * 100;
    const differentAmount = 9.00;
    const differentAmountAdyenMinus = -differentAmount * 100;
    const differentAmount2 = 8.00;
    const differentAmountAdyen2 = differentAmount2 * 100;
    const differentAmountAdyenMinus2 = -differentAmount2 * 100;
    const differentOriginalAmount2 = 7.50;
    const differentOriginalAmountAdyenMinus2 = -differentOriginalAmount2 * 100;
    const differentAmount3 = 7.00;
    const differentAmountAdyen3 = differentAmount3 * 100;
    const differentAmountAdyenMinus3 = -differentAmount3 * 100;
    const differentOriginalAmount3 = 6.50;
    const differentOriginalAmountAdyenMinus3 = -differentOriginalAmount3 * 100;
    const differentAmount4 = 9.00;
    const differentAmountAdyen4 = differentAmount4 * 100;
    const differentOriginalAmount4 = 8.00;
    const differentOriginalAmountAdyen4 = differentOriginalAmount4 * 100;

    const randomAuthCode = RandomGenerator.numbers(6);
    const paymentId = RandomGenerator.uppperTextAndNumbers(9) + ' ' + RandomGenerator.uppperTextAndNumbers(6);
    const randomId = RandomGenerator.uppperTextAndNumbers(9) + ' ' + RandomGenerator.uppperTextAndNumbers(6);
    const data = transactionSettings.dianaBishop;

    const createAuthorizeRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2, requestBody.authorizeTransaction(creationDate,
      transactionSettings.types.recurring, paymentId, randomAuthCode, 'USD', amountAdyenMinus, 'EUR', originalAmountAdyenMinus, data.fromAccountHolderName,
      data.fromAccountHolderId, data.fromAccountName, data.fromAccountAdyenId, data.fromCardAdyenId, data.merchantMCC, data.merchantId, data.merchantCity,
      data.merchantState, data.merchantCountry, data.merchantName, data.merchantAll, data.reference), URLs.apiAdyenNotificationUrl);
    expect(createAuthorizeRequest.status).toBe(200);

    const capturedTransactionRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2, requestBody.capturedTransaction(creationDateSecond,
      transactionSettings.types.recurring, randomAuthCode, paymentId, differentAmountAdyenMinus, data.fromAccountHolderName, data.fromAccountHolderId,
      data.fromAccountName, data.fromAccountAdyenId, data.fromCardAdyenId, data.merchantMCC, data.merchantId, data.merchantCity, data.merchantState, data.merchantCountry,
      data.merchantName, data.merchantAll), URLs.apiAdyenNotificationUrl);
    expect(capturedTransactionRequest.status).toBe(200);

    const cancelledTransactionRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2,
      requestBody.cancelledTransaction(creationDateThird, transactionSettings.types.recurring, paymentId, randomAuthCode, differentAmountAdyenMinus2,
        'EUR', differentOriginalAmountAdyenMinus2, differentAmountAdyen2, data.fromAccountHolderName, data.fromAccountHolderId, data.fromAccountName,
        data.fromAccountAdyenId, data.fromCardName, data.fromCardAdyenId, data.merchantMCC, data.merchantId, data.merchantCity, data.merchantState,
        data.merchantCountry, data.merchantName, data.merchantAll), URLs.apiAdyenNotificationUrl);
    expect(cancelledTransactionRequest.status).toBe(200);

    const cancelledSecondTransactionRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2,
      requestBody.cancelledTransaction(creationDateFourth, transactionSettings.types.recurring, paymentId, randomAuthCode, differentAmountAdyenMinus3,
        'EUR', differentOriginalAmountAdyenMinus3, differentAmountAdyen3, data.fromAccountHolderName, data.fromAccountHolderId, data.fromAccountName,
        data.fromAccountAdyenId, data.fromCardName, data.fromCardAdyenId, data.merchantMCC, data.merchantId, data.merchantCity, data.merchantState,
        data.merchantCountry, data.merchantName, data.merchantAll), URLs.apiAdyenNotificationUrl);
    expect(cancelledSecondTransactionRequest.status).toBe(200);

    const refundedTransactionRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2,
      requestBody.refundedTransaction(creationDateFifth, transactionSettings.types.recurring, randomId, paymentId, differentAmountAdyen4, 'EUR', differentOriginalAmountAdyen4,
        data.fromAccountHolderName, data.fromAccountHolderId, data.fromAccountName, data.fromAccountAdyenId), URLs.apiAdyenNotificationUrl);
    expect(refundedTransactionRequest.status).toBe(200);

    await browser.refresh();
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Amir wallet', 'Snacks and Drinks', 'Diana Bishop');
    await (await general.elementByText('Date')).waitForDisplayed();
    const startBalanceAfter = await transactionsPage.getStartBalanceData();
    const endBalanceAfter = await transactionsPage.getEndBalanceData();
    const moneyInAfter = await transactionsPage.getMoneyInData();
    const moneyOutAfter = await transactionsPage.getMoneyOutData();

    expect(startBalance).toEqual(startBalanceAfter);
    expect(endBalanceAfter).toEqual(endBalance);
    expect(moneyInAfter).toEqual(await transactionsPage.fixAmountNumber(moneyIn + 24));
    expect(moneyOutAfter).toEqual(await transactionsPage.fixAmountNumber(moneyOut + 24));
    // await takeScreenShot();
    await cardsPage.checkingUIBalanceTransactionData(4, creationDateUI, 'Recurring', 'USD', -24.00, 'approved', endBalanceAfter - 24, 'NB Bookstore New York NY US',
      data.fromCardName, '');
    await cardsPage.checkingUIBalanceTransactionData(3, creationDateUI, 'Recurring', 'USD', 8.00, 'approved', endBalanceAfter - 16, 'Refund from NB Bookstore New York NY US',
      data.fromCardName, '');
    await cardsPage.checkingUIBalanceTransactionData(2, creationDateUI, 'Recurring', 'USD', 7.00, 'approved', endBalanceAfter - 9, 'Refund from NB Bookstore New York NY US',
      data.fromCardName, '');
    await cardsPage.checkingUIBalanceTransactionData(1, creationDateUI, 'Recurring', 'USD', 9.00, 'approved', endBalanceAfter, 'Refund from NB Bookstore New York NY US',
      data.fromCardName, '');
  });

  it(`[C24357] Card transaction on Balance page 04 AuthFX = Cap + Exp, Can | balanceInquiry @smoke`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24357');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Amir wallet', 'Snacks and Drinks', 'Diana Bishop');
    await (await general.elementByText('Date')).waitForDisplayed();
    const startBalance = await transactionsPage.getStartBalanceData();
    const endBalance = await transactionsPage.getEndBalanceData();
    const moneyIn = await transactionsPage.getMoneyInData();
    const moneyOut = await transactionsPage.getMoneyOutData();

    const amount = 10.01;
    const amountAdyenMinus = -amount * 100;
    const originalAmount = 9.00;
    const originalAmountAdyenMinus = -originalAmount * 100;
    const differentAmount = 10.00;
    const differentAmountAdyenMinus = -differentAmount * 100;
    const differentAmount2 = 0.01;
    const differentAmountAdyen2 = differentAmount2 * 100;
    const differentAmountAdyenMinus2 = -differentAmount2 * 100;
    const differentOriginalAmount2 = 0.01;
    const differentOriginalAmountAdyenMinus2 = -differentOriginalAmount2 * 100;
    const differentAmount3 = 0.01;
    const differentAmountAdyen3 = differentAmount3 * 100;
    const differentAmountAdyenMinus3 = -differentAmount3 * 100;
    const differentOriginalAmount3 = 0.01;
    const differentOriginalAmountAdyenMinus3 = -differentOriginalAmount3 * 100;

    const randomAuthCode04 = RandomGenerator.numbers(6);
    const paymentId = RandomGenerator.uppperTextAndNumbers(9) + ' ' + RandomGenerator.uppperTextAndNumbers(6);
    const data = transactionSettings.dianaBishop;

    const createAuthorizeRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2, requestBody.authorizeTransaction(creationDate,
      transactionSettings.types.balanceInquiry, paymentId, randomAuthCode04, 'USD', amountAdyenMinus, 'EUR', originalAmountAdyenMinus, data.fromAccountHolderName,
      data.fromAccountHolderId, data.fromAccountName, data.fromAccountAdyenId, data.fromCardAdyenId, data.merchantMCC, data.merchantId, data.merchantCity,
      data.merchantState, data.merchantCountry, data.merchantName, data.merchantAll, data.reference), URLs.apiAdyenNotificationUrl);
    expect(createAuthorizeRequest.status).toBe(200);

    const capturedTransactionRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2, requestBody.capturedTransaction(creationDateSecond,
      transactionSettings.types.balanceInquiry, randomAuthCode04, paymentId, differentAmountAdyenMinus, data.fromAccountHolderName, data.fromAccountHolderId,
      data.fromAccountName, data.fromAccountAdyenId, data.fromCardAdyenId, data.merchantMCC, data.merchantId, data.merchantCity, data.merchantState, data.merchantCountry,
      data.merchantName, data.merchantAll), URLs.apiAdyenNotificationUrl);
    expect(capturedTransactionRequest.status).toBe(200);

    const paymentExpiredTransactionRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2,
      requestBody.expiredTransaction(creationDateThird, transactionSettings.types.balanceInquiry, paymentId, randomAuthCode04, differentAmountAdyenMinus2,
        'EUR', differentOriginalAmountAdyenMinus2, differentAmountAdyen2, data.fromAccountHolderName, data.fromAccountHolderId, data.fromAccountName, data.fromAccountAdyenId,
        data.fromCardName, data.fromCardAdyenId, data.merchantMCC, data.merchantId, data.merchantCity, data.merchantState, data.merchantCountry, data.merchantName,
        data.merchantAll), URLs.apiAdyenNotificationUrl);
    expect(paymentExpiredTransactionRequest.status).toBe(200);

    const cancelledSecondTransactionRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2,
      requestBody.cancelledTransaction(creationDateFourth, transactionSettings.types.recurring, paymentId, randomAuthCode04, differentAmountAdyenMinus3,
        'EUR', differentOriginalAmountAdyenMinus3, differentAmountAdyen3, data.fromAccountHolderName, data.fromAccountHolderId, data.fromAccountName,
        data.fromAccountAdyenId, data.fromCardName, data.fromCardAdyenId, data.merchantMCC, data.merchantId, data.merchantCity, data.merchantState,
        data.merchantCountry, data.merchantName, data.merchantAll), URLs.apiAdyenNotificationUrl);
    expect(cancelledSecondTransactionRequest.status).toBe(200);

    await browser.refresh();
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Amir wallet', 'Snacks and Drinks', 'Diana Bishop');
    await (await general.elementByText('Date')).waitForDisplayed();
    const startBalanceAfter = await transactionsPage.getStartBalanceData();
    const endBalanceAfter = await transactionsPage.getEndBalanceData();
    const moneyInAfter = await transactionsPage.getMoneyInData();
    const moneyOutAfter = await transactionsPage.getMoneyOutData();

    expect(startBalance).toEqual(startBalanceAfter);
    expect(endBalanceAfter).toEqual(await transactionsPage.fixAmountNumber(endBalance - 10));
    expect(moneyInAfter).toEqual(await transactionsPage.fixAmountNumber(moneyIn + 0.01));
    expect(moneyOutAfter).toEqual(await transactionsPage.fixAmountNumber(moneyOut + 10.01));
    // await takeScreenShot();
    await cardsPage.checkingUIBalanceTransactionData(1, creationDateUI, 'BalanceInquiry', 'USD', 0.01, 'approved', endBalanceAfter, 'Refund from NB Bookstore New York NY US',
      data.fromCardName, '');
    await cardsPage.checkingUIBalanceTransactionData(2, creationDateUI, 'BalanceInquiry', 'USD', -10.01, 'approved', endBalanceAfter - 0.01, 'NB Bookstore New York NY US',
      data.fromCardName, '');
  });

  it(`[C24358] Card transaction on Balance page 05 AuthFee = Cap + Can + Exp | pos | amount != mod @smoke`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24358');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Amir wallet', 'Snacks and Drinks', 'Diana Bishop');
    await (await general.elementByText('Date')).waitForDisplayed();
    const startBalance = await transactionsPage.getStartBalanceData();
    const endBalance = await transactionsPage.getEndBalanceData();
    const moneyIn = await transactionsPage.getMoneyInData();
    const moneyOut = await transactionsPage.getMoneyOutData();

    const amount = 17;
    const amountAdyenMinus = -amount * 100;
    const fee1 = 1.50;
    const fee1AdyenMinus = -fee1 * 100;
    const modificationAmount = amount + fee1;
    const modificationAmountAdyenMinus = -modificationAmount * 100;
    const differentAmount = 6.00;
    const differentAmountAdyenMinus = -differentAmount * 100;
    const differentAmount2 = 11.00;
    const differentAmountAdyen2 = differentAmount2 * 100;
    const differentAmountAdyenMinus2 = -differentAmount2 * 100;
    const differentAmount3 = 1.50;
    const differentAmountAdyen3 = differentAmount3 * 100;
    const differentAmountAdyenMinus3 = -differentAmount3 * 100;

    const randomAuthCode = RandomGenerator.numbers(6);
    const paymentId = RandomGenerator.uppperTextAndNumbers(9) + ' ' + RandomGenerator.uppperTextAndNumbers(6);
    const data = transactionSettings.dianaBishop;

    const createAuthorizeRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2, requestBody.authorizeTransactionWithFee(transactionSettings.types.pos, paymentId, randomAuthCode, 'USD', amountAdyenMinus, 'USD', amountAdyenMinus, 'USD', modificationAmountAdyenMinus, fee1AdyenMinus,
      data.fromAccountHolderName, data.fromAccountHolderId, data.fromAccountName, data.fromAccountAdyenId, data.fromCardAdyenId, data.merchantMCC, data.merchantId,
      data.merchantCity, data.merchantState, data.merchantCountry, data.merchantName, data.merchantAll, data.reference), URLs.apiAdyenNotificationUrl);
    expect(createAuthorizeRequest.status).toBe(200);

    const capturedTransactionRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2, requestBody.capturedTransaction(creationDateSecond,
      transactionSettings.types.pos, randomAuthCode, paymentId, differentAmountAdyenMinus, data.fromAccountHolderName, data.fromAccountHolderId,
      data.fromAccountName, data.fromAccountAdyenId, data.fromCardAdyenId, data.merchantMCC, data.merchantId, data.merchantCity, data.merchantState, data.merchantCountry,
      data.merchantName, data.merchantAll), URLs.apiAdyenNotificationUrl);
    expect(capturedTransactionRequest.status).toBe(200);

    const cancelledSecondTransactionRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2,
      requestBody.cancelledTransaction(creationDateThird, transactionSettings.types.pos, paymentId, randomAuthCode, differentAmountAdyenMinus2,
        'USD', differentAmountAdyenMinus2, differentAmountAdyen2, data.fromAccountHolderName, data.fromAccountHolderId, data.fromAccountName,
        data.fromAccountAdyenId, data.fromCardName, data.fromCardAdyenId, data.merchantMCC, data.merchantId, data.merchantCity, data.merchantState,
        data.merchantCountry, data.merchantName, data.merchantAll), URLs.apiAdyenNotificationUrl);
    expect(cancelledSecondTransactionRequest.status).toBe(200);

    const paymentExpiredTransactionRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2,
      requestBody.expiredTransaction(creationDateFourth, transactionSettings.types.pos, paymentId, randomAuthCode, differentAmountAdyenMinus3,
        'USD', differentAmountAdyenMinus3, differentAmountAdyen3, data.fromAccountHolderName, data.fromAccountHolderId, data.fromAccountName, data.fromAccountAdyenId,
        data.fromCardName, data.fromCardAdyenId, data.merchantMCC, data.merchantId, data.merchantCity, data.merchantState, data.merchantCountry, data.merchantName,
        data.merchantAll), URLs.apiAdyenNotificationUrl);
    expect(paymentExpiredTransactionRequest.status).toBe(200);

    await browser.refresh();
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Amir wallet', 'Snacks and Drinks', 'Diana Bishop');
    await (await general.elementByText('Date')).waitForDisplayed();
    const startBalanceAfter = await transactionsPage.getStartBalanceData();
    const endBalanceAfter = await transactionsPage.getEndBalanceData();
    const moneyInAfter = await transactionsPage.getMoneyInData();
    const moneyOutAfter = await transactionsPage.getMoneyOutData();

    expect(startBalance).toEqual(startBalanceAfter);
    expect(endBalanceAfter).toEqual(await transactionsPage.fixAmountNumber(endBalance - 6));
    expect(moneyInAfter).toEqual(await transactionsPage.fixAmountNumber(moneyIn + 12.50));
    expect(moneyOutAfter).toEqual(await transactionsPage.fixAmountNumber(moneyOut + 18.50));
    // await takeScreenShot();
    await cardsPage.checkingUIBalanceTransactionData(1, creationDateUI, 'Fee', 'USD', -1.50, 'approved', endBalanceAfter - 12.50, 'Fee. NB Bookstore New York NY US',
      data.fromCardName, '');
    await cardsPage.checkingUIBalanceTransactionData(2, creationDateUI, 'Pos', 'USD', -17.00, 'approved', endBalanceAfter - 11, 'NB Bookstore New York NY US',
      data.fromCardName, '');
    await cardsPage.checkingUIBalanceTransactionData(4, creationDateUI, 'Pos', 'USD', 11.00, 'approved', endBalanceAfter - 1.50, 'Refund from NB Bookstore New York NY US',
      data.fromCardName, '');
    await cardsPage.checkingUIBalanceTransactionData(3, creationDateUI, 'Fee', 'USD', 1.50, 'approved', endBalanceAfter, 'Refund from NB Bookstore New York NY US',
      data.fromCardName, '');
  });

  it(`[C24359] Card transaction on Balance page 06 AuthFX2Fees = Cap = Ref | atmWithdraw @smoke`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24359');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Amir wallet', 'Snacks and Drinks', 'Diana Bishop');
    await (await general.elementByText('Date')).waitForDisplayed();
    const startBalance = await transactionsPage.getStartBalanceData();
    const endBalance = await transactionsPage.getEndBalanceData();
    const moneyIn = await transactionsPage.getMoneyInData();
    const moneyOut = await transactionsPage.getMoneyOutData();

    const amount = 20.00;
    const originalAmount = 19.00;
    const originalAmountAdyen = originalAmount * 100;
    const originalAmountAdyenMinus = -originalAmount * 100;
    const fee1 = 2.00;
    const fee2 = 1.00;
    const fee1AdyenMinus = -fee1 * 100;
    const fee2AdyenMinus = -fee2 * 100;
    const modificationAmount = amount + fee1 + fee2;
    const modificationAmountAdyen = modificationAmount * 100;
    const modificationAmountAdyenMinus = -modificationAmount * 100;

    const randomAuthCode06 = RandomGenerator.numbers(6);
    const paymentId = RandomGenerator.uppperTextAndNumbers(9) + ' ' + RandomGenerator.uppperTextAndNumbers(6);
    const randomId = RandomGenerator.uppperTextAndNumbers(9) + ' ' + RandomGenerator.uppperTextAndNumbers(6);
    const data = transactionSettings.dianaBishop;

    const createAuthorizeRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2, requestBody.authorizeTransactionWithFeeAdjustment(transactionSettings.types.atmWithdraw, paymentId, randomAuthCode06, 'USD', modificationAmountAdyenMinus, 'EUR', originalAmountAdyenMinus, 'USD',
      modificationAmountAdyenMinus, fee1AdyenMinus, fee2AdyenMinus, data.fromAccountHolderName, data.fromAccountHolderId, data.fromAccountName, data.fromAccountAdyenId,
      data.fromCardAdyenId, data.merchantMCC, data.merchantId, data.merchantCity, data.merchantState, data.merchantCountry, data.merchantName, data.merchantAll, data.reference),
      URLs.apiAdyenNotificationUrl);
    expect(createAuthorizeRequest.status).toBe(200);

    const capturedTransactionRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2, requestBody.capturedTransactionModified(transactionSettings.types.atmWithdraw, randomAuthCode06, paymentId, 'USD', modificationAmountAdyenMinus, 'EUR', originalAmountAdyenMinus, data.fromAccountHolderName,
      data.fromAccountHolderId, data.fromAccountName, data.fromAccountAdyenId, data.fromCardAdyenId, data.merchantMCC, data.merchantId, data.merchantCity, data.merchantState,
      data.merchantCountry, data.merchantName, data.merchantAll), URLs.apiAdyenNotificationUrl);
    expect(capturedTransactionRequest.status).toBe(200);

    const refundedTransactionRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2,
      requestBody.refundedTransaction(creationDateThird, transactionSettings.types.atmWithdraw, randomId, paymentId, modificationAmountAdyen, 'EUR', originalAmountAdyen,
        data.fromAccountHolderName, data.fromAccountHolderId, data.fromAccountName, data.fromAccountAdyenId), URLs.apiAdyenNotificationUrl);
    expect(refundedTransactionRequest.status).toBe(200);

    await browser.refresh();
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Amir wallet', 'Snacks and Drinks', 'Diana Bishop');
    await (await general.elementByText('Date')).waitForDisplayed();
    const startBalanceAfter = await transactionsPage.getStartBalanceData();
    const endBalanceAfter = await transactionsPage.getEndBalanceData();
    const moneyInAfter = await transactionsPage.getMoneyInData();
    const moneyOutAfter = await transactionsPage.getMoneyOutData();

    expect(startBalance).toEqual(startBalanceAfter);
    expect(endBalanceAfter).toEqual(endBalance);
    expect(moneyInAfter).toEqual(await transactionsPage.fixAmountNumber(moneyIn + 23));
    expect(moneyOutAfter).toEqual(await transactionsPage.fixAmountNumber(moneyOut + 23));
    // await takeScreenShot();
    await cardsPage.checkingUIBalanceTransactionData(3, creationDateUI, 'Atm', 'USD', -20.00, 'approved', endBalanceAfter - 20, 'NB Bookstore New York NY US',
      data.fromCardName, '');
    await cardsPage.checkingUIBalanceTransactionData(2, creationDateUI, 'Fee', 'USD', -3.00, 'approved', endBalanceAfter - 23, 'ATM withdrawal',
      data.fromCardName, '');
    await cardsPage.checkingUIBalanceTransactionData(1, creationDateUI, 'Atm', 'USD', 23.00, 'approved', endBalanceAfter, 'Refund from NB Bookstore New York NY US',
      data.fromCardName, '');
  });

  it(`[C24360] Card transaction on Balance page 07 Declined | atmWithdraw @smoke`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24360');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Amir wallet', 'Snacks and Drinks', 'Diana Bishop');
    await (await general.elementByText('Date')).waitForDisplayed();
    const startBalance = await transactionsPage.getStartBalanceData();
    const endBalance = await transactionsPage.getEndBalanceData();
    const moneyIn = await transactionsPage.getMoneyInData();
    const moneyOut = await transactionsPage.getMoneyOutData();

    const amount = 1255.00;
    const amountAdyenMinus = -amount * 100;
    const randomId = RandomGenerator.uppperTextAndNumbers(9) + ' ' + RandomGenerator.uppperTextAndNumbers(6);
    const data = transactionSettings.dianaBishop;

    const createAuthorizeRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2,
      requestBody.refusedTransaction(creationDate, transactionSettings.types.atmWithdraw, randomId, amountAdyenMinus, data.fromAccountHolderName,
        data.fromAccountHolderId, data.fromAccountName, data.fromAccountAdyenId, data.fromCardName, data.fromCardAdyenId, data.merchantMCC, data.merchantId,
        data.merchantCity, data.merchantState, data.merchantCountry, data.merchantName, data.merchantAll), URLs.apiAdyenNotificationUrl);
    expect(createAuthorizeRequest.status).toBe(200);

    await browser.refresh();
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Amir wallet', 'Snacks and Drinks', 'Diana Bishop');
    await (await general.elementByText('Date')).waitForDisplayed();
    const startBalanceAfter = await transactionsPage.getStartBalanceData();
    const endBalanceAfter = await transactionsPage.getEndBalanceData();
    const moneyInAfter = await transactionsPage.getMoneyInData();
    const moneyOutAfter = await transactionsPage.getMoneyOutData();

    expect(startBalance).toEqual(startBalanceAfter);
    expect(endBalanceAfter).toEqual(endBalance);
    expect(moneyInAfter).toEqual(moneyIn);
    expect(moneyOutAfter).toEqual(moneyOut);
    // await takeScreenShot();
    await cardsPage.checkingUIBalanceTransactionData(1, creationDateUI, 'Atm', 'USD', 0.00, 'cross-red', endBalanceAfter, 'Denied NB Bookstore New York NY US Amount: 1255.00 USD',
      data.fromCardName, '');
  });

  it(`[C24361] Card transaction on Balance page 08 Declined with FX and Fee | ecommerce @smoke`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24361');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CorporateAdminGoogle.Email, Credentials.CorporateAdminGoogle.Password);
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Amir wallet', 'Snacks and Drinks', 'Diana Bishop');
    await (await general.elementByText('Date')).waitForDisplayed();
    const startBalance = await transactionsPage.getStartBalanceData();
    const endBalance = await transactionsPage.getEndBalanceData();
    const moneyIn = await transactionsPage.getMoneyInData();
    const moneyOut = await transactionsPage.getMoneyOutData();

    const amount = 200.00;
    const originalAmount = 190.00;
    const originalAmountAdyenMinus = -originalAmount * 100;
    const fee1 = 5.00;
    const fee1AdyenMinus = -fee1 * 100;
    const modificationAmount = amount + fee1;
    const modificationAmountAdyenMinus = -modificationAmount * 100;

    const randomId = RandomGenerator.uppperTextAndNumbers(9) + ' ' + RandomGenerator.uppperTextAndNumbers(6);
    const data = transactionSettings.dianaBishop;

    const createAuthorizeRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2,
      requestBody.refusedTransactionAdjustment(creationDate, transactionSettings.types.ecommerce, randomId, 'USD', modificationAmountAdyenMinus, 'EUR',
        originalAmountAdyenMinus, modificationAmountAdyenMinus, fee1AdyenMinus, data.fromAccountHolderName, data.fromAccountHolderId, data.fromAccountName,
        data.fromAccountAdyenId, data.fromCardName, data.fromCardAdyenId, data.merchantMCC, data.merchantId, data.merchantCity, data.merchantState, data.merchantCountry,
        data.merchantName, data.merchantAll), URLs.apiAdyenNotificationUrl);
    expect(createAuthorizeRequest.status).toBe(200);

    await browser.refresh();
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Amir wallet', 'Snacks and Drinks', 'Diana Bishop');
    await (await general.elementByText('Date')).waitForDisplayed();
    const startBalanceAfter = await transactionsPage.getStartBalanceData();
    const endBalanceAfter = await transactionsPage.getEndBalanceData();
    const moneyInAfter = await transactionsPage.getMoneyInData();
    const moneyOutAfter = await transactionsPage.getMoneyOutData();

    expect(startBalance).toEqual(startBalanceAfter);
    expect(endBalanceAfter).toEqual(endBalance);
    expect(moneyInAfter).toEqual(moneyIn);
    expect(moneyOutAfter).toEqual(moneyOut);
    // await takeScreenShot();
    await cardsPage.checkingUIBalanceTransactionData(1, creationDateUI, 'Ecommerce', 'USD', 0.00, 'cross-red', endBalanceAfter,
      'Denied NB Bookstore New York NY US Amount: 200.00 USD', data.fromCardName, '');
  });

  it(`[C15265] Account transaction on Balance page - Deposit @smoke`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/15265');
    const randomID = RandomGenerator.uppperTextAndNumbers(16);
    const paymentID = RandomGenerator.uppperTextAndNumbers(16);
    const amount = 10000;
    await signInPage.signInAsRegisteredUserUSA(Credentials.CorporateAdminGoogle.Email, Credentials.CorporateAdminGoogle.Password);
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Clutter', 'Clu_increased', 'Frida Kalo');
    await (await general.elementByText('Date')).waitForDisplayed();
    const startBalance = await transactionsPage.getStartBalanceData();
    const endBalance = await transactionsPage.getEndBalanceData();
    const moneyIn = await transactionsPage.getMoneyInData();
    const moneyOut = await transactionsPage.getMoneyOutData();
    const data = transactionSettings.fridaKalo;

    const body = requestBody.paymentDeposit('Clu_increased', 'AH3227C223222B5F4DFS98ZCW', amount * 100, 'Frida Kalo', 'BA3227C223222B5F58T3R75JL', randomID, paymentID);
    const createDepositRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2, body, URLs.apiAdyenNotificationUrl);
    expect(createDepositRequest.status).toBe(200);

    await browser.refresh();
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Clutter', 'Clu_increased', 'Frida Kalo');
    await (await general.elementByText('Date')).waitForDisplayed();
    const startBalanceAfter = await transactionsPage.getStartBalanceData();
    const endBalanceAfter = await transactionsPage.getEndBalanceData();
    const moneyInAfter = await transactionsPage.getMoneyInData();
    const moneyOutAfter = await transactionsPage.getMoneyOutData();

    expect(startBalance).toEqual(startBalanceAfter);
    expect(endBalanceAfter).toEqual(endBalance + 10000);
    expect(moneyInAfter).toEqual(moneyIn + 10000);
    expect(moneyOutAfter).toEqual(moneyOut);

    // await JsScripts.scrollDown();
    await cardsPage.checkingUIBalanceTransactionData(1, creationDateUI, 'Deposit', 'USD', 10000.00, 'approved', endBalanceAfter,
      'UNKNOWN ACCOUNT - NO REFERENCE PROVIDED', data.fromCardName, '');
  }).timeout(250000);

  it(`[C15268] Account transaction on Balance page - Account to Card transfer @smoke`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/15268');
    const amount = 200;
    const amountAdyen = amount * 100;
    const amountAdyenMinus = -amount * 100;
    const fromAccountName = 'Clu_increased';
    const fromAccountRefId = 'b78894ff-2c40-e056-1ff7-ee6c0fc6b693';
    const fromAccountAdyenId = 'BA3227C223222B5F4DHB58ZGM';
    const fromAccountHolderName = 'Clu_increased';
    const fromAccountHolderId = 'AH3227C223222B5F4DFS98ZCW';
    const toAccountName = 'Frida Kalo';
    const toAccountRefId = '215ba32c-0ef5-452f-9d31-5db233d29aca';
    const toAccountAdyenId = 'BA3227C223222B5F58T3R75JL';
    const toAccountHolderName = 'Clu_increased';
    const toAccountHolderId = 'AH3227C223222B5F4DFS98ZCW';

    await signInPage.signInAsRegisteredUserUSA(Credentials.CorporateAdminGoogle.Email, Credentials.CorporateAdminGoogle.Password);
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Clutter', 'Clu_increased', 'Frida Kalo');
    const fridaEndBalance = await transactionsPage.getEndBalanceData();
    await browser.refresh();
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Clutter', 'Clu_increased', 'Clu_increased');
    const startBalance = await transactionsPage.getStartBalanceData();
    const endBalance = await transactionsPage.getEndBalanceData();
    const moneyIn = await transactionsPage.getMoneyInData();
    const moneyOut = await transactionsPage.getMoneyOutData();

    const externalId = await transactionsPage.createCustomTransfer(amount, amountAdyen, amountAdyenMinus, fromAccountName, fromAccountRefId, fromAccountAdyenId,
      fromAccountHolderName, fromAccountHolderId, toAccountName, toAccountRefId, toAccountAdyenId, toAccountHolderName, toAccountHolderId);
    const creationDateUI = getUSATransactionDate();
    await browser.pause(2000);
    expect(externalId).not.toEqual(null);


    await browser.refresh();
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Clutter', 'Clu_increased', 'Clu_increased');
    const startBalanceAfter = await transactionsPage.getStartBalanceData();
    const endBalanceAfter = await transactionsPage.getEndBalanceData();
    const moneyInAfter = await transactionsPage.getMoneyInData();
    const moneyOutAfter = await transactionsPage.getMoneyOutData();

    expect(startBalance).toEqual(startBalanceAfter);
    expect(endBalanceAfter).toEqual(await transactionsPage.fixAmountNumber(endBalance - amount));
    expect(moneyIn).toEqual(moneyInAfter);
    expect(moneyOutAfter).toEqual(await transactionsPage.fixAmountNumber(moneyOut + amount));
    await cardsPage.checkingUIBalanceTransactionData(1, creationDateUI, 'Transfer', 'USD', -amount, 'approved', endBalance - amount, 'Transfer to Frida Kalo',
      '', 'Frida Kalo');
    await browser.refresh();
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Clutter', 'Clu_increased', 'Frida Kalo');
    await cardsPage.checkingUIBalanceTransactionData(1, creationDateUI, 'Transfer', 'USD', amount, 'approved', fridaEndBalance + amount, 'Transfer from Clu_increased',
      '', 'Frida Kalo');

  }).timeout(250000);

  it(`[C15269] Account transaction on Balance page - Card to Account transfer @smoke`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/15269');
    const amount = 50;
    const amountAdyen = amount * 100;
    const amountAdyenMinus = -amount * 100;
    const fromAccountName = 'Frida Kalo';
    const fromAccountRefId = '215ba32c-0ef5-452f-9d31-5db233d29aca';
    const fromAccountAdyenId = 'BA3227C223222B5F58T3R75JL';
    const fromAccountHolderName = 'Clu_increased';
    const fromAccountHolderId = 'AH3227C223222B5F4DFS98ZCW';
    const toAccountName = 'Clu_increased';
    const toAccountRefId = 'b78894ff-2c40-e056-1ff7-ee6c0fc6b693';
    const toAccountAdyenId = 'BA3227C223222B5F4DHB58ZGM';
    const toAccountHolderName = 'Clu_increased';
    const toAccountHolderId = 'AH3227C223222B5F4DFS98ZCW';

    await signInPage.signInAsRegisteredUserUSA(Credentials.CorporateAdminGoogle.Email, Credentials.CorporateAdminGoogle.Password);
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Clutter', 'Clu_increased', 'Clu_increased');
    const cluEndBalance = await transactionsPage.getEndBalanceData();
    await browser.refresh();
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Clutter', 'Clu_increased', 'Frida Kalo');
    const startBalance = await transactionsPage.getStartBalanceData();
    const endBalance = await transactionsPage.getEndBalanceData();
    const moneyIn = await transactionsPage.getMoneyInData();
    const moneyOut = await transactionsPage.getMoneyOutData();

    const externalId = await transactionsPage.createCustomTransfer(amount, amountAdyen, amountAdyenMinus, fromAccountName, fromAccountRefId, fromAccountAdyenId,
      fromAccountHolderName, fromAccountHolderId, toAccountName, toAccountRefId, toAccountAdyenId, toAccountHolderName, toAccountHolderId);
    const creationDateUI = getUSATransactionDate();
    await browser.pause(2000);
    console.log(externalId);

    await browser.refresh();
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Clutter', 'Clu_increased', 'Frida Kalo');
    const startBalanceAfter = await transactionsPage.getStartBalanceData();
    const endBalanceAfter = await transactionsPage.getEndBalanceData();
    const moneyInAfter = await transactionsPage.getMoneyInData();
    const moneyOutAfter = await transactionsPage.getMoneyOutData();

    expect(startBalance).toEqual(startBalanceAfter);
    expect(endBalanceAfter).toEqual(await transactionsPage.fixAmountNumber(endBalance - amount));
    expect(moneyIn).toEqual(moneyInAfter);
    expect(moneyOutAfter).toEqual(await transactionsPage.fixAmountNumber(moneyOut + amount));
    await cardsPage.checkingUIBalanceTransactionData(1, creationDateUI, 'Transfer', 'USD', -amount, 'approved', endBalanceAfter, 'Transfer to Clu_increased',
      '', 'Clu_increased');

    await browser.refresh();
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Clutter', 'Clu_increased', 'Clu_increased');
    await cardsPage.checkingUIBalanceTransactionData(1, creationDateUI, 'Deposit', 'USD', amount, 'approved', cluEndBalance + amount, 'UNKNOWN ACCOUNT - NO REFERENCE PROVIDED',
      '', '');
  }).timeout(250000);

  it(`[C15270] Account transaction on Balance page - Account to Account transfer @smoke`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/15270');
    const amount = 100;
    const amountAdyen = amount * 100;
    const amountAdyenMinus = -amount * 100;
    const fromAccountName = "Clu_increased";
    const fromAccountRefId = "b78894ff-2c40-e056-1ff7-ee6c0fc6b693";
    const fromAccountAdyenId = "BA3227C223222B5F4DHB58ZGM";
    const fromAccountHolderName = "Clu_increased";
    const fromAccountHolderId = "AH3227C223222B5F4DFS98ZCW"

    const toAccountName = "Clu_standard";
    const toAccountRefId = "9d66ee3d-7516-0faf-687a-efa82c210cb9";
    const toAccountAdyenId = "BA3227C223222B5F4DH8Q8ZDJ";
    const toAccountHolderName = "Clu_standard";
    const toAccountHolderId = "AH3227C223222B5F4DFS98ZCW";

    await signInPage.signInAsRegisteredUserUSA(Credentials.CorporateAdminGoogle.Email, Credentials.CorporateAdminGoogle.Password);
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Clutter', 'Clu_standard', 'Clu_standard');
    const standardBalance = await transactionsPage.getEndBalanceData();
    await browser.refresh();
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Clutter', 'Clu_increased', 'Clu_increased');
    const startBalance = await transactionsPage.getStartBalanceData();
    const endBalance = await transactionsPage.getEndBalanceData();
    const moneyIn = await transactionsPage.getMoneyInData();
    const moneyOut = await transactionsPage.getMoneyOutData();

    const externalId = await transactionsPage.createCustomTransfer(amount, amountAdyen, amountAdyenMinus, fromAccountName, fromAccountRefId, fromAccountAdyenId,
      fromAccountHolderName, fromAccountHolderId, toAccountName, toAccountRefId, toAccountAdyenId, toAccountHolderName, toAccountHolderId);
    const creationDateUI = getUSATransactionDate();
    await browser.pause(2000);
    console.log(externalId);

    await browser.refresh();
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Clutter', 'Clu_increased', 'Clu_increased');
    await (await statementsPageElements.transactions.lastTransaction).waitForDisplayed();
    const startBalanceAfter = await transactionsPage.getStartBalanceData();
    const endBalanceAfter = await transactionsPage.getEndBalanceData();
    const moneyInAfter = await transactionsPage.getMoneyInData();
    const moneyOutAfter = await transactionsPage.getMoneyOutData();

    expect(startBalance).toEqual(startBalanceAfter);
    expect(endBalanceAfter).toEqual(await transactionsPage.fixAmountNumber(endBalance - amount));
    expect(moneyIn).toEqual(moneyInAfter);
    expect(moneyOutAfter).toEqual(await transactionsPage.fixAmountNumber(moneyOut + amount));
    await cardsPage.checkingUIBalanceTransactionData(1, creationDateUI, 'Transfer', 'USD', -amount, 'approved', endBalanceAfter, 'Transfer to Clu_standard',
      '', 'Clu_standard');

    await browser.refresh();
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Clutter', 'Clu_standard', 'Clu_standard');
    await (await statementsPageElements.transactions.lastTransaction).waitForDisplayed();
    await browser.pause(22000);
    await cardsPage.checkingUIBalanceTransactionData(1, creationDateUI, 'Deposit', 'USD', amount, 'approved', standardBalance + amount, 'UNKNOWN ACCOUNT - NO REFERENCE PROVIDED',
      '', '');
  }).timeout(250000);

  it(`[C15271] Account transaction on Balance page - Card to Card transfer @smoke`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/15271');
    const amount = 3;
    const amountAdyen = amount * 100;
    const amountAdyenMinus = -amount * 100;
    const fromAccountName = 'Frida Kalo';
    const fromAccountRefId = '215ba32c-0ef5-452f-9d31-5db233d29aca';
    const fromAccountAdyenId = 'BA3227C223222B5F58T3R75JL';
    const fromAccountHolderName = 'Clutter';
    const fromAccountHolderId = 'AH3227C223222B5F4DFS98ZCW';

    const toAccountName = 'Iogann Bach';
    const toAccountRefId = '2f631fc9-532d-4848-9d63-253cdeb64ee2';
    const toAccountAdyenId = 'BA3227C223222B5F4K3T5F5VW';
    const toAccountHolderName = 'Clutter';
    const toAccountHolderId = 'AH3227C223222B5F4DFS98ZCW';

    await signInPage.signInAsRegisteredUserUSA(Credentials.CorporateAdminGoogle.Email, Credentials.CorporateAdminGoogle.Password);
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Clutter', 'Clu_increased', 'Iogann Bach');
    const ioganEnddBalance = await transactionsPage.getEndBalanceData();
    await browser.refresh();
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Clutter', 'Clu_increased', 'Frida Kalo');
    const startBalance = await transactionsPage.getStartBalanceData();
    const endBalance = await transactionsPage.getEndBalanceData();
    const moneyIn = await transactionsPage.getMoneyInData();
    const moneyOut = await transactionsPage.getMoneyOutData();

    const externalId = await transactionsPage.createCustomTransfer(amount, amountAdyen, amountAdyenMinus, fromAccountName, fromAccountRefId, fromAccountAdyenId,
      fromAccountHolderName, fromAccountHolderId, toAccountName, toAccountRefId, toAccountAdyenId, toAccountHolderName, toAccountHolderId);
    const creationDateUI = getUSATransactionDate();
    await browser.pause(2000);
    console.log(externalId);

    await browser.refresh();
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Clutter', 'Clu_increased', 'Frida Kalo');
    const startBalanceAfter = await transactionsPage.getStartBalanceData();
    const endBalanceAfter = await transactionsPage.getEndBalanceData();
    const moneyInAfter = await transactionsPage.getMoneyInData();
    const moneyOutAfter = await transactionsPage.getMoneyOutData();

    expect(startBalance).toEqual(startBalanceAfter);
    expect(endBalanceAfter).toEqual(await transactionsPage.fixAmountNumber(endBalance - amount));
    expect(moneyIn).toEqual(moneyInAfter);
    expect(moneyOutAfter).toEqual(await transactionsPage.fixAmountNumber(moneyOut + amount));
    await cardsPage.checkingUIBalanceTransactionData(1, creationDateUI, 'Transfer', 'USD', -amount, 'approved', endBalanceAfter, 'Transfer to Iogann Bach',
      '', 'Iogann Bach');

    await browser.refresh();
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Clutter', 'Clu_increased', 'Iogann Bach');
    await cardsPage.checkingUIBalanceTransactionData(1, creationDateUI, 'Deposit', 'USD', amount, 'approved', ioganEnddBalance + amount, 'UNKNOWN ACCOUNT - NO REFERENCE PROVIDED',
      '', '');
  }).timeout(250000);

  it(`[C15256] Balance statistics for old transactions of Card account under Centtrip Admin @smoke`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/15256');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdminNew.Email, Credentials.CenttripAdminNew.Password);
    await transactionsPage.selectCorporateAndAccountOnStatementsPage('Clutter', 'Clu_increased', 'Iogann Bach');

    await transactionsPage.fillDateFieldsAndCheckBalances('2021', '2021', 'OCT', 'OCT', '1', '10',
      0.00, 0.00, 0.00, 0.00, false);
    await transactionsPage.fillDateFieldsAndCheckBalances('2021', '2021', 'OCT', 'OCT', '17 ', '31',
      0.00, 0.00, 50002, -50002, false);
    await transactionsPage.fillDateFieldsAndCheckBalances('2021', '2021', 'NOV', 'NOV', '8 ', '13',
      -50002, 272107.01, 6496.01, 215609, false);
    await transactionsPage.fillDateFieldsAndCheckBalances('2021', '2021', 'NOV', 'NOV', '14 ', '19',
      218609, 50000, 20714, 247895, false);
  }).timeout(250000);
});
