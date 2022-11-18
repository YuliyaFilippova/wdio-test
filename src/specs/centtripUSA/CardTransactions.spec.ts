import allureReporter from '@wdio/allure-reporter';
import { Credentials } from '../../testData/Credentials';
import { SignInPage } from '../../core/pages/centtripAppWeb/signInPage';
import {CardsPage} from '../../core/pages/centtripUSA/cardsPage';
import { addEpic } from '../../core/helper/allure/reporter';
import {
  USAMainPageElements
} from '../../core/pages/locators';
import {RandomGenerator} from '../../core/utils/randomGenerator';
import {HttpMethods} from '../../core/api/rest';
import {apiEndpoints} from '../../testData/apiEndpoints';
import {transactionSettings} from '../../testData/usersData';
import {getUSATransactionDate, getUSATransactionDetailsDate, other, requestBody, requestHeaders2} from '../../testData/other';
import { Other } from '../../core/utils/other';
import { config } from '../../wdio.conf';
import { DashboardPage } from '../../core/pages/centtripUSA/dashboardPage';
import { URLs } from '../../urls';

const signInPage = new SignInPage();
const dashboardPage = new DashboardPage();
const cardsPage = new CardsPage();

describe(`Card transactions > Card transactions page`, () => {
  const creationDate = other.creationDate();
  const creationDateSecond = other.creationDate().add(1, 'seconds');
  const creationDateThird = other.creationDate().add(2, 'seconds');
  // const creationDateFourth = other.creationDate().add(3, 'seconds');
  // const creationDateFifth = other.creationDate().add(4, 'seconds');
  const creationDateUI = getUSATransactionDate();
  // const creationDateTransactionDetails = getUSATransactionDetailsDate();

  let randomAuthCode01: string;
  // let randomAuthCode04: string;
  // let randomAuthCode06: string;

  beforeEach(async () => {
    await browser.url(URLs.USAPortalURL);
  });
  afterEach(async () => {
    await Other.deleteCacheCookiesUSA();
  });

  it(`[C24340] Card transaction 01 Auth = Cap | ecommerce | no state @smoke`, async () => {
    addEpic('Card transactions');
    allureReporter.addFeature('Card transactions page');
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24340');
    const amount = 31.00;
    const amountAdyenMinus = -amount * 100;
    randomAuthCode01 = RandomGenerator.numbers(6);
    const paymentId = RandomGenerator.uppperTextAndNumbers(9) + ' ' + RandomGenerator.uppperTextAndNumbers(6);
    const randomId = RandomGenerator.uppperTextAndNumbers(9) + ' ' + RandomGenerator.uppperTextAndNumbers(6);
    const data = transactionSettings.olgaNuggets;

    const createAuthorizeRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2,
      requestBody.authorizeTransaction(creationDate, transactionSettings.types.ecommerce, paymentId, randomAuthCode01, 'USD', amountAdyenMinus, 'USD', amountAdyenMinus,
        data.fromAccountHolderName, data.fromAccountHolderId, data.fromAccountName, data.fromAccountAdyenId, data.fromCardAdyenId, data.merchantMCC, data.merchantId,
        data.merchantCity, null, data.merchantCountry, data.merchantName, data.merchantAll, data.reference), URLs.apiAdyenNotificationUrl);
    expect(createAuthorizeRequest.status).toBe(200);
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await cardsPage.goToCardTransactionAndSelectCard('Amir wallet', 'Snacks and Drinks', data.fromAccountName, randomAuthCode01);
    await cardsPage.checkingUITransactionData(1, creationDateUI, 'Ecommerce', randomAuthCode01, 'USD', -amount, 'NB Bookstore', 'in-progress', 'Add', 'Add', 'approved',
      data.fromCardName, '•• 4491', 'US', 'N/A', data.merchantCity, 'NB Bookstore New York US', 'Piece Goods, Notions, and Other Dry Goods', data.merchantMCC);

    const capturedTransactionRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2,
      requestBody.capturedTransaction(other.creationDate(), transactionSettings.types.ecommerce, randomId, paymentId, amountAdyenMinus, data.fromAccountHolderName,
        data.fromAccountHolderId, data.fromAccountName, data.fromAccountAdyenId, data.fromCardAdyenId, data.merchantMCC, data.merchantId, data.merchantCity, null,
        data.merchantCountry, data.merchantName, data.merchantAll), URLs.apiAdyenNotificationUrl);
    expect(capturedTransactionRequest.status).toBe(200);
    await browser.refresh();
    await cardsPage.goToCardTransactionAndSelectCard('Amir wallet', 'Snacks and Drinks', data.fromAccountName, randomAuthCode01);
    await cardsPage.checkingUITransactionData(1, creationDateUI, 'Ecommerce', randomAuthCode01, 'USD', -amount, 'NB Bookstore', 'approved', 'Add', 'Add', 'approved',
      data.fromCardName, '•• 4491', 'US', 'N/A', data.merchantCity, 'NB Bookstore New York US', 'Piece Goods, Notions, and Other Dry Goods', data.merchantMCC);
  });

  it(`[C24341] Card transaction 02 Auth = Exp = Cap | moto @smoke`, async () => {
    addEpic('Card transactions');
    allureReporter.addFeature('Card transactions page');
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24341');
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
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await cardsPage.goToCardTransactionAndSelectCard('Amir wallet', 'Snacks and Drinks', data.fromAccountName, randomAuthCode);
    await cardsPage.checkingUITransactionData(1, creationDateUI, 'Moto', randomAuthCode, 'USD', -amount, 'NB Bookstore', 'in-progress', 'Add', 'Add', 'cross-red',
      data.fromAccountName, '•• 8237', 'US', 'NY', data.merchantCity, 'NB Bookstore New York NY US', 'Piece Goods, Notions, and Other Dry Goods', data.merchantMCC);

    const paymentExpiredTransactionRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2,
      requestBody.expiredTransaction(creationDateSecond, transactionSettings.types.moto, paymentId, randomAuthCode, amountAdyenMinus, 'USD', amountAdyenMinus, amountAdyen,
        data.fromAccountHolderName, data.fromAccountHolderId, data.fromAccountName, data.fromAccountAdyenId, data.fromCardName, data.fromCardAdyenId, data.merchantMCC,
        data.merchantId, data.merchantCity, data.merchantState, data.merchantCountry, data.merchantName, data.merchantAll), URLs.apiAdyenNotificationUrl);
    expect(paymentExpiredTransactionRequest.status).toBe(200);
    await browser.refresh();
    await cardsPage.goToCardTransactionAndSelectCard('Amir wallet', 'Snacks and Drinks', data.fromAccountName, randomAuthCode);
    await cardsPage.checkingUITransactionData(1, creationDateUI, 'Moto', randomAuthCode, 'USD', amount, 'NB Bookstore', 'approved', 'Add', 'Add', 'cross-red',
      data.fromAccountName, '•• 8237', 'US', 'NY', data.merchantCity, 'Refund from NB Bookstore New York NY US', 'Piece Goods, Notions, and Other Dry Goods', data.merchantMCC);

    const capturedTransactionRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2,
      requestBody.capturedTransaction(creationDateThird, transactionSettings.types.moto, randomId, paymentId, amountAdyenMinus, data.fromAccountHolderName,
        data.fromAccountHolderId, data.fromAccountName, data.fromAccountAdyenId, data.fromCardAdyenId, data.merchantMCC, data.merchantId, data.merchantCity, null,
        data.merchantCountry, data.merchantName, data.merchantAll), URLs.apiAdyenNotificationUrl);
    expect(capturedTransactionRequest.status).toBe(200);
    await browser.refresh();
    await cardsPage.goToCardTransactionAndSelectCard('Amir wallet', 'Snacks and Drinks', data.fromAccountName, randomAuthCode);
    await cardsPage.checkingUITransactionData(1, creationDateUI, 'Moto', randomAuthCode, 'USD', -amount, 'NB Bookstore', 'approved', 'Add', 'Add', 'cross-red',
      data.fromAccountName, '•• 8237', 'US', 'NY', data.merchantCity, 'Return to NB Bookstore New York NY US', 'Piece Goods, Notions, and Other Dry Goods', data.merchantMCC);
  });

  it(`[C24362] Card transaction on Dashboard 04 AuthFX = Cap + Exp, Can | balanceInquiry @smoke`, async () => {
    addEpic('Dashboard');
    allureReporter.addFeature('Recent transactions');
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24362');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await dashboardPage.openDashboardPage('Snacks and Drinks');
    await (await USAMainPageElements.columnHeader('DATE')).waitForDisplayed();
    await dashboardPage.checkingUISelectedTransactionData(1, creationDateUI, 'Balance Inquiry', 'Diana Bishop', 'USD', 0.01, 'Refund from NB Bookstore New York NY US');
    await dashboardPage.checkingUISelectedTransactionData(2, creationDateUI, 'Balance Inquiry', 'Diana Bishop', 'USD', -10.01, 'NB Bookstore New York NY US');
  });

  it(`[C24363] Card transaction on Dashboard 05 AuthFee = Cap + Can + Exp | pos | amount != mod @smoke`, async () => {
    addEpic('Dashboard');
    allureReporter.addFeature('Recent transactions');
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24363');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await dashboardPage.openDashboardPage('Snacks and Drinks');
    await (await USAMainPageElements.columnHeader('DATE')).waitForDisplayed();
    await dashboardPage.checkingUISelectedTransactionData(4, creationDateUI, 'Fee', 'Diana Bishop', 'USD', -1.50, 'Fee. NB Bookstore New York NY US');
    await dashboardPage.checkingUISelectedTransactionData(3, creationDateUI, 'Pos', 'Diana Bishop', 'USD', -17.00, 'NB Bookstore New York NY US');
    await dashboardPage.checkingUISelectedTransactionData(2, creationDateUI, 'Pos', 'Diana Bishop', 'USD', 11.00, 'Refund from NB Bookstore New York NY US');
    await dashboardPage.checkingUISelectedTransactionData(1, creationDateUI, 'Fee', 'Diana Bishop', 'USD', 1.50, 'Refund from NB Bookstore New York NY US');
  });

  it(`[C24364] Card transaction on Dashboard 06 AuthFX2Fees = Cap = Ref | atmWithdraw @smoke`, async () => {
    addEpic('Dashboard');
    allureReporter.addFeature('Recent transactions');
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24364');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await dashboardPage.openDashboardPage('Snacks and Drinks');
    await (await USAMainPageElements.columnHeader('DATE')).waitForDisplayed();
    await dashboardPage.checkingUISelectedTransactionData(3, creationDateUI, 'Fee', 'Diana Bishop', 'USD', -3.00, 'ATM withdrawal');
    await dashboardPage.checkingUISelectedTransactionData(2, creationDateUI, 'Atm', 'Diana Bishop', 'USD', -20.00, 'NB Bookstore New York NY US');
    await dashboardPage.checkingUISelectedTransactionData(1, creationDateUI, 'Atm', 'Diana Bishop', 'USD', 23.00, 'Refund from NB Bookstore New York NY US');
  });

  it(`[C24365] Card transaction on Dashboard 08 Declined with FX and Fee | ecommerce @smoke`, async () => {
    addEpic('Dashboard');
    allureReporter.addFeature('Recent transactions');
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24365');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await dashboardPage.openDashboardPage('Snacks and Drinks');
    await (await USAMainPageElements.columnHeader('DATE')).waitForDisplayed();
    await dashboardPage.checkingUISelectedTransactionData(1, creationDateUI, 'Ecommerce', 'Diana Bishop', 'USD', 0.00, 'Denied NB Bookstore New York NY US Amount: -200.00 USD');
  });
});
