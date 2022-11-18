import allureReporter from '@wdio/allure-reporter';
import { Credentials } from '../../testData/Credentials';
import { SignInPage } from '../../core/pages/centtripAppWeb/signInPage';
import { addEpic } from '../../core/helper/allure/reporter';
import { Actions } from '../../core/utils/actions';
import {
  dashboardPageElements, general, USAAccountsPageElements,
  USAMainPageElements, masterDashboardPageElements
} from '../../core/pages/locators';
import { Other } from '../../core/utils/other';
import { connectionUSA } from '../../wdio.conf';
import { Button } from '../../core/controls/button';
import { DashboardPage } from '../../core/pages/centtripUSA/dashboardPage';
import { getUSATransactionDashboardDate, other, requestBody, requestHeaders2 } from '../../testData/other';
import { RandomGenerator } from '../../core/utils/randomGenerator';
import { HttpMethods } from '../../core/api/rest';
import { apiEndpoints } from '../../testData/apiEndpoints';
import { CommonPageUSA } from '../../core/pages/centtripUSA/commonUSA';
import { TransactionsPage } from '../../core/pages/centtripUSA/transactionsPage';
import { CardsPage } from '../../core/pages/centtripUSA/cardsPage';
import { URLs } from '../../urls';
import { transactionSettings } from '../../testData/usersData';
import moment = require('moment');

const dashboardPage = new DashboardPage();
const signInPage = new SignInPage();
const commonPageUSA = new CommonPageUSA();
const transactionsPage = new TransactionsPage();
const cardsPage = new CardsPage();

describe(`Dashboard > Quick transfer`, () => {
  let transferAccountToInstrumentId: number;
  before(async () => {
    if (!connectionUSA._connectCalled) {
      await connectionUSA.connect();
    }
  });
  beforeEach(async () => {
    addEpic('Dashboard');
    await browser.url(URLs.USAPortalURL);
  });
  afterEach(async () => {
    await commonPageUSA.checkBrowserLogsForServerErrors();
    await Other.deleteCacheCookiesUSA();
  });

  it(`[C11220] Switching between OPERATING ACCOUNTS @smoke`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addFeature('Quick transfer');
    allureReporter.addStory('Centtrip Admin');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/11220');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await Actions.waitAndClick(await USAMainPageElements.dashboardPage);
    await (await dashboardPageElements.selectCorporate).waitForDisplayed();
    await (await dashboardPageElements.selectCorporate).clearValue();
    await (await dashboardPageElements.selectAccount).clearValue();
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.selectCorporate,
      await general.selectOption('Capital'));
    await (await general.divByName('USA')).waitForDisplayed();
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.selectAccount,
      await general.selectOption('Europe'));
    await (await general.divByName('Europe')).waitForDisplayed();
    // await browser.get(`${config.params.USAPortalURL}dashboard/21d8c15f-ca2b-44c2-b258-67592d792354`);
    await Actions.waitAndClick(await dashboardPageElements.fromAccount);
    await (await general.spanByName('Operating')).waitForDisplayed();
    const operatingAccountsNum = await (await general.spanByNameArray('Operating')).length;
    expect(operatingAccountsNum).toBe(1);
    await Actions.waitAndClick(await general.selectOption('Europe'));
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.fromAccount,
      await general.selectOption('Europe'));
    await browser.pause(1000);
    await Actions.waitAndClick(await dashboardPageElements.toAccount);
    await commonPageUSA.checkThatSelectedElementsAreDisplayed(await general.selectOption('Canada'),
    await general.selectOption('USA'));
  });

  it(`[C11222] Select "From" account @smoke`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addFeature('Quick transfer');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/11222');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdminNew.Email, Credentials.CenttripAdminNew.Password);
    await Actions.waitAndClick(await USAMainPageElements.dashboardPage);
    await (await dashboardPageElements.selectCorporate).waitForDisplayed();
    await (await dashboardPageElements.selectCorporate).clearValue();
    await (await dashboardPageElements.selectAccount).clearValue();
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.selectCorporate, await general.selectOption('Capital'));
    await (await dashboardPageElements.fromAccount).waitForDisplayed();
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.fromAccount, await general.selectOption('Alex Great'));
    // await dashboardPage.openDashboardPage('Canada');
    // await Button.clickOnOptionFromDropdown(dashboardPageElements.fromAccount, general.selectOption('Canada'));
  });

  it(`[C11223] Select "To" account @smoke`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addFeature('Quick transfer');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/11223');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdminNew.Email, Credentials.CenttripAdminNew.Password);
    await Actions.waitAndClick(await USAMainPageElements.dashboardPage);
    await (await dashboardPageElements.selectCorporate).waitForDisplayed();
    await dashboardPageElements.selectCorporate.clearValue();
    await dashboardPageElements.selectAccount.clearValue();
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.selectCorporate, await general.selectOption('Capital'));
    await browser.pause(2000);
    expect(await (await dashboardPageElements.toAccountInputStatus).isEnabled()).toBe(false);
    await (await dashboardPageElements.fromAccount).waitForDisplayed();
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.fromAccount, await general.selectOption('Alex Great'));
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.toAccount, await general.selectOption('Capital Utah'));
  });

  it(`[C11219] Transfer: from CARD (Account Type) to ACCOUNT (Operating Account Type) under Centtrip admin  @smoke`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addFeature('Quick transfer');
    allureReporter.addStory('Centtrip Admin');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/11219');
    const dateDB = other.tradeDateDB;
    const randAmount = RandomGenerator.numbers(1);
    const amountAdyen = Number(randAmount) * 100;
    const amountAdyenMinus = -Number(randAmount) * 100;
    const creationDateUI = getUSATransactionDashboardDate();
    const depositTransactionTag = RandomGenerator.uppperTextAndNumbers(16);
    const randomTransactionTag = RandomGenerator.uppperTextAndNumbers(16);

    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await Actions.waitAndClick(await USAMainPageElements.dashboardPage);

    await (await dashboardPageElements.selectCorporate).waitForDisplayed();
    await (await dashboardPageElements.selectCorporate).clearValue();
    await dashboardPageElements.selectAccount.clearValue();
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.selectCorporate, await general.selectOption('Clutter'));
    await (await general.divByName('Clu_standard')).waitForDisplayed();
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.selectAccount,
      await general.selectOption('Clu_increased'));
    await (await general.divByName('Clu_increased')).waitForDisplayed();
    await (await dashboardPageElements.fromAccount).waitForDisplayed();
    const balanceData = await dashboardPage.createTransferAndReturnBalanceData('Iogann Bach', 'Clu_increased', randAmount);
    const accountBalance = balanceData[0];
    const cardBalance = balanceData[1];
    const totalBalance = balanceData[2];
    const accountBalanceAfter = balanceData[3];
    const cardBalanceAfter = balanceData[4];
    const totalBalanceAfter = balanceData[5];

    expect(accountBalance).toEqual(accountBalanceAfter);
    expect(cardBalance - Number(randAmount)).toEqual(cardBalanceAfter);
    expect(totalBalance - Number(randAmount)).toEqual(totalBalanceAfter);

    // await dashboardPage.checkTransferRequest('Network.requestWillBeSent', `${config.params.USAPortalURL}api/account/v1/transfers`, 'POST',
    //   `"amount":${Number(randAmount)},"currencyCode":"USD"`);
    const transactionData = await dashboardPage.getTransactionTagFromDB(dateDB, Number(randAmount));
    const transactionTag = transactionData[0];
    const fromAccountName = transactionData[1];
    const fromAccountAdyenId = transactionData[2];
    const fromAccountHolderId = transactionData[3];
    const toAccountName = transactionData[4];
    const toAccountAdyenId = transactionData[5];
    const toAccountHolderId = transactionData[6];

    const paymentSettledNotificationRequest = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2,
      requestBody.paymentSettledNotificationCustom(transactionTag, fromAccountName, fromAccountHolderId,
        amountAdyenMinus, fromAccountName, fromAccountAdyenId), URLs.apiAdyenNotificationUrl);
    expect(paymentSettledNotificationRequest.status).toBe(200);

    const depositSettledNotificationRequest = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2,
      requestBody.depositSettledNotification(depositTransactionTag, randomTransactionTag, transactionTag, 'Account Holder', toAccountHolderId,
        amountAdyen, toAccountName, toAccountAdyenId, 'IncomingTransfer'), URLs.apiAdyenNotificationUrl);
    expect(depositSettledNotificationRequest.status).toBe(200);
    await browser.refresh();
    await (await dashboardPageElements.selectCorporate).waitForDisplayed();
    await (await dashboardPageElements.selectCorporate).clearValue();
    await (await dashboardPageElements.selectAccount).clearValue();
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.selectCorporate,
      await general.selectOption('Clutter'));
    await (await general.divByName('Clu_standard')).waitForDisplayed();
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.selectAccount,
      await general.selectOption('Clu_increased'));
    await (await general.divByName('Clu_increased')).waitForDisplayed();
    await (await USAMainPageElements.columnHeader('DATE')).waitForDisplayed();
    await dashboardPage.checkingUIRecentTransactionData(creationDateUI, 'Transfer', '', 'USD', Number(randAmount), 'Transfer from Iogann Bach');
  });

  it(`[C24100] Transfer: from Account to TransferInstrument under Centtrip Admin @smoke`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addFeature('Quick transfer');
    allureReporter.addStory('Centtrip Admin');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24100');
    const amount = '5';
    const amountAdyenMinus = -Number(amount) * 100;
    const creationDateUI = getUSATransactionDashboardDate();;

    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdminNew.Email, Credentials.CenttripAdminNew.Password);
    await Actions.waitAndClick(await USAMainPageElements.dashboardPage);
    await (await dashboardPageElements.selectCorporate).waitForDisplayed();
    await (await dashboardPageElements.selectCorporate).clearValue();
    await dashboardPageElements.selectAccount.clearValue();
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.selectCorporate,
      await general.selectOption('Amir wallet'));
    await (await general.divByName('Snacks and Drinks')).waitForDisplayed();
    await (await dashboardPageElements.fromAccount).waitForDisplayed();
    const balanceData = await dashboardPage.createTransferAndReturnBalanceData('Snacks and Drinks', 'Wallet usd account', amount);
    const accountBalance = balanceData[0];
    const cardBalance = balanceData[1];
    const totalBalance = balanceData[2];
    const accountBalanceAfter = balanceData[3];
    const cardBalanceAfter = balanceData[4];
    const totalBalanceAfter = balanceData[5];

    // await dashboardPage.checkTransferRequest('Network.requestWillBeSent', `${config.params.USAPortalURL}api/account/v1/transfers`, 'POST',
    //   `"toAccountCodeRefId":null`, `"toPayeeCodeRefId":null`);
    await browser.refresh();
    await (await dashboardPageElements.selectCorporate).waitForDisplayed();
    await (await dashboardPageElements.selectCorporate).clearValue();
    await (await dashboardPageElements.selectAccount).clearValue();
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.selectCorporate,
      await general.selectOption('Amir wallet'));
    await (await general.divByName('Snacks and Drinks')).waitForDisplayed();
    // await JsScripts.scrollDown();
    await (await USAMainPageElements.columnHeader('DATE')).waitForDisplayed();
    await dashboardPage.checkingUIRecentTransactionData(creationDateUI, 'Payment', '', 'USD',
      -Number(amount), 'Payment to Wallet usd account');
    expect(totalBalance - Number(amount)).toEqual(totalBalanceAfter);
    expect(accountBalance - Number(amount)).toEqual(accountBalanceAfter);
    expect(cardBalance).toEqual(cardBalanceAfter);

    const paymentId = await dashboardPage.getTransactionId(moment().format('YYYY-MM-DD'), Number(amount));
    const randomPaymentId = RandomGenerator.uppperTextAndNumbers(16);
    const debitTransferBody = requestBody.transferSettledNotification(randomPaymentId, paymentId, 'Amir wallet', 'AH3227C223222B5FKBMZL8XNG',
      'Amir', amountAdyenMinus, 'BA3227C223222B5FL6C4Z4JRB', '0f412ec0-de5d-43fc-ee3d-ef215e9f355a', 'BA32272223222B5FKBQGK97R3');
    const authorizeTransactionTrip = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, debitTransferBody, URLs.apiAdyenNotificationUrl);
    expect(authorizeTransactionTrip.status).toBe(200);
    expect(authorizeTransactionTrip.body).toEqual('[accepted]');

    await transactionsPage.selectAccountAndCheckStatus('Amir wallet', 'Snacks and Drinks', 'approved');
  }).timeout(300000);

  it.skip(`[C24103] Transfer: from Account to TransferInstrument under Centtrip Admin - TransferSendOut updating @smoke`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addFeature('Quick transfer');
    allureReporter.addStory('Centtrip Admin');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24103');
    const randAmount = '1';
    const amountAdyenMinus = -Number(randAmount) * 100;
    const creationDate = other.creationDate();
    const data = transactionSettings.olgaNuggets;

    const transactionTag = await dashboardPage.getTransferTransactionTagFromDB(transferAccountToInstrumentId);
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await transactionsPage.selectNessesaryCorporateAndGoToBalancePage('Snacks and Drinks', 'Snacks and Drinks', 'Snacks and Drinks');
    await cardsPage.checkingUIBalanceTransferData(1, 'Payment', -1.00, 'in-progress', 'Payment to Wallet usd account', 'Wallet usd account');
    const depositSettledNotificationRequest = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2,
      requestBody.depositSettledNotificationModified(creationDate, transactionTag, 'Amir Wallet', data.fromAccountHolderId,
        amountAdyenMinus, 'Snacks and Drinks', data.fromAccountAdyenId, 'OutgoingTransfer', 'TransferSentOut'), URLs.apiAdyenNotificationUrl);
    expect(depositSettledNotificationRequest.status).toBe(200);
    await transactionsPage.updateBalancePage('Snacks and Drinks', 'Snacks and Drinks');
    await cardsPage.checkingUIBalanceTransferData(1, 'Payment', -1.00, 'approved', 'Payment to Wallet usd account', 'Wallet usd account');
  });

  it(`[C11218] Transfer: from ACCOUNT to CARD under Corporate admin with Operating access @smoke`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addFeature('Quick transfer');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/11218');
    const creationDateUI = getUSATransactionDashboardDate();
    const dateDB = other.tradeDateDB;
    const randAmount = RandomGenerator.numbers(2);
    const depositTransactionTag = RandomGenerator.uppperTextAndNumbers(16);
    const randomTransactionTag = RandomGenerator.uppperTextAndNumbers(16);
    const amountAdyen = Number(randAmount) * 100;
    const amountAdyenMinus = -Number(randAmount) * 100;

    await signInPage.signInAsRegisteredUserUSA(Credentials.corporateAdmCapital.Email, Credentials.corporateAdmCapital.Password);
    await (await general.buttonByName('Confirm')).waitForDisplayed();
    const balanceData = await dashboardPage.createTransferAndReturnBalanceData('USA', 'Mark twain', randAmount);
    const accountBalance = balanceData[0];
    const cardBalance = balanceData[1];
    const totalBalance = balanceData[2];
    const accountBalanceAfter = balanceData[3];
    const cardBalanceAfter = balanceData[4];
    const totalBalanceAfter = balanceData[5];

    expect(accountBalance).toEqual(accountBalanceAfter + Number(randAmount));
    expect(cardBalance).toEqual(cardBalanceAfter);
    expect(totalBalance).toEqual(totalBalanceAfter + Number(randAmount));

    await dashboardPage.checkingUIRecentTransactionData(creationDateUI, 'Transfer', '', 'USD', -Number(randAmount), 'Transfer to Mark Twain');

    const transactionData = await dashboardPage.getTransactionTagFromDB(dateDB, Number(randAmount));
    const transactionTag = transactionData[0];
    const fromAccountName = transactionData[1];
    const fromAccountAdyenId = transactionData[2];
    const fromAccountHolderId = transactionData[3];
    const toAccountName = transactionData[4];
    const toAccountAdyenId = transactionData[5];
    const toAccountHolderId = transactionData[6];

    const paymentSettledNotificationRequest = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2,
      requestBody.paymentSettledNotificationCustom(transactionTag, fromAccountName, fromAccountHolderId,
        amountAdyenMinus, fromAccountName, fromAccountAdyenId), URLs.apiAdyenNotificationUrl);
    expect(paymentSettledNotificationRequest.status).toBe(200);

    const depositSettledNotificationRequest = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2,
      requestBody.depositSettledNotification(depositTransactionTag, randomTransactionTag, transactionTag, 'Account Holder', toAccountHolderId,
        amountAdyen, toAccountName, toAccountAdyenId, 'IncomingTransfer'), URLs.apiAdyenNotificationUrl);
    expect(depositSettledNotificationRequest.status).toBe(200);
    await browser.refresh();
    await (await USAMainPageElements.columnHeader('DATE')).waitForDisplayed();
    await dashboardPage.checkingUIRecentTransactionData(creationDateUI, 'Transfer', '', 'USD', Number(randAmount), 'Transfer from USA');
  });

  it(`[C15254] Transfer: from ACCOUNT to ACCOUNT under Corporate admin with Corporate access @smoke`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addFeature('Quick transfer');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/15254');
    const creationDateUI = getUSATransactionDashboardDate();
    const dateDB = other.tradeDateDB;
    const depositTransactionTag = RandomGenerator.uppperTextAndNumbers(16);
    const randomTransactionTag = RandomGenerator.uppperTextAndNumbers(16);
    const randAmount = RandomGenerator.numbers(1);
    const amountAdyen = Number(randAmount) * 100;
    const amountAdyenMinus = -Number(randAmount) * 100;

    await signInPage.signInAsRegisteredUserUSA(Credentials.corporateAdmCapital.Email, Credentials.corporateAdmCapital.Password);
    await (await dashboardPageElements.selectCorporate).waitForDisplayed();
    await (await dashboardPageElements.selectCorporate).clearValue();
    await (await dashboardPageElements.selectAccount).clearValue();
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.selectCorporate,
      await general.selectOption('Capital'));
    await (await general.divByName('USA')).waitForDisplayed();
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.selectAccount,
      await general.selectOption('Canada'));
    await (await general.divByName('Canada')).waitForDisplayed();
    await (await dashboardPageElements.fromAccount).waitForDisplayed();

    const balanceData = await dashboardPage.createTransferAndReturnBalanceData('Canada', 'USA', randAmount);
    const accountBalance = balanceData[0];
    const cardBalance = balanceData[1];
    const totalBalance = balanceData[2];
    const accountBalanceAfter = balanceData[3];
    const cardBalanceAfter = balanceData[4];
    const totalBalanceAfter = balanceData[5];

    expect(accountBalance).toEqual(accountBalanceAfter + Number(randAmount));
    expect(cardBalance).toEqual(cardBalanceAfter);
    expect(totalBalance).toEqual(totalBalanceAfter + Number(randAmount));
    await dashboardPage.checkingUIRecentTransactionData(creationDateUI, 'Transfer', '', 'USD', -Number(randAmount), 'Transfer to USA');

    const transactionData = await dashboardPage.getTransactionTagFromDB(dateDB, Number(randAmount));
    const transactionTag = transactionData[0];
    const fromAccountName = transactionData[1];
    const fromAccountAdyenId = transactionData[2];
    const fromAccountHolderId = transactionData[3];
    const toAccountName = transactionData[4];
    const toAccountAdyenId = transactionData[5];
    const toAccountHolderId = transactionData[6];
    const paymentSettledNotificationRequest = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2,
      requestBody.paymentSettledNotificationCustom(transactionTag, fromAccountName, fromAccountHolderId,
        amountAdyenMinus, fromAccountName, fromAccountAdyenId), URLs.apiAdyenNotificationUrl);
    expect(paymentSettledNotificationRequest.status).toBe(200);

    const depositSettledNotificationRequest = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2,
      requestBody.depositSettledNotification(depositTransactionTag, randomTransactionTag, transactionTag, 'Account Holder', toAccountHolderId,
        amountAdyen, toAccountName, toAccountAdyenId, 'IncomingTransfer'), URLs.apiAdyenNotificationUrl);
    expect(depositSettledNotificationRequest.status).toBe(200);
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.selectCorporate,
      await general.selectOption('Capital'));
    await (await general.divByName('USA')).waitForDisplayed();
    await (await USAMainPageElements.columnHeader('DATE')).waitForDisplayed();
    await dashboardPage.checkingUIRecentTransactionData(creationDateUI, 'Transfer', '', 'USD', Number(randAmount), 'Transfer from Canada');
  });

  it(`[C24101] Transfer: from Card Account to TransferInstrument under Corporate Admin @smoke`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addFeature('Quick transfer');
    allureReporter.addStory('Corporate Admin');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24101');
    const amount = '1';
    const amountAdyenMinus = -Number(amount) * 100;
    const creationDateUI = getUSATransactionDashboardDate();

    await signInPage.signInAsRegisteredUserUSA(Credentials.corporateAmir.Email, Credentials.corporateAmir.Password);
    await (await general.divByName('Snacks and Drinks')).waitForDisplayed();
    const balanceData = await dashboardPage.createTransferAndReturnBalanceData('Diana Bishop', 'Wallet usd account', amount);
    const accountBalance = balanceData[0];
    const cardBalance = balanceData[1];
    const totalBalance = balanceData[2];
    const accountBalanceAfter = balanceData[3];
    const cardBalanceAfter = balanceData[4];
    const totalBalanceAfter = balanceData[5];

    await browser.refresh();
    await (await USAMainPageElements.columnHeader('DATE')).waitForDisplayed();
    await dashboardPage.checkingUIRecentTransactionData(creationDateUI, 'Payment', '', 'USD', -Number(amount), 'Payment to Wallet usd account');
    expect(totalBalance - Number(amount)).toEqual(totalBalanceAfter);
    expect(accountBalance).toEqual(accountBalanceAfter);
    expect(cardBalance - Number(amount)).toEqual(cardBalanceAfter);

    const paymentId = await dashboardPage.getTransactionId(moment().format('YYYY-MM-DD'), Number(amount));
    const randomPaymentId = RandomGenerator.uppperTextAndNumbers(16);
    const debitTransferBody = requestBody.transferSettledNotification(randomPaymentId, paymentId, 'Diana Bishop', 'AH3227C223222B5FKBMZL8XNG',
      'Amir', amountAdyenMinus, 'BA32272223222B5FKBQGK97R3', '16e08988-c36c-4cd2-82eb-a905c8e90c5d', 'SE322KH223222D5FKBMZN2X99');
    const authorizeTransactionTrip = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, debitTransferBody, URLs.apiAdyenNotificationUrl);
    expect(authorizeTransactionTrip.status).toBe(200);
    expect(authorizeTransactionTrip.body).toEqual('[accepted]');

    await transactionsPage.selectAccountAndCheckStatus('Amir wallet', 'Snacks and Drinks', 'approved');
  }).timeout(130000);

  it(`[C24107] Transfer: from Account to TransferInstrument under Corporate Admin - TransferFailed updating @smoke`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addFeature('Quick transfer');
    allureReporter.addStory('Corporate Admin');
    allureReporter.addTestId('https://centtrip.testrail.io/index.phpм?/cases/view/24107');
    const transactionData = await dashboardPage.getLastTransactionDataFromDB();
    transferAccountToInstrumentId = transactionData[0];

    const randAmount = '1';
    const amountAdyenMinus = -Number(randAmount) * 100;
    const creationDate = other.creationDate();
    const data = transactionSettings.dianaBishop;

    const transactionTag = await dashboardPage.getTransferTransactionTagFromDB(transferAccountToInstrumentId);
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await transactionsPage.selectNessesaryCorporateAndGoToBalancePage('Snacks and Drinks', 'Snacks and Drinks', 'Snacks and Drinks');
    await cardsPage.checkingUIBalanceTransferData(1, 'Payment', -1.00, 'in-progress', 'Payment to Wallet usd account', 'Wallet usd account');
    const depositSettledNotificationRequest = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2,
      requestBody.depositSettledNotificationModified(creationDate, transactionTag, 'Amir Wallet', data.fromAccountHolderId,
        amountAdyenMinus, data.fromAccountName, data.fromAccountAdyenId, 'OutgoingTransfer', 'TransferFailed'), URLs.apiAdyenNotificationUrl);
    expect(depositSettledNotificationRequest.status).toBe(200);
    await transactionsPage.updateBalancePage('Snacks and Drinks', 'Snacks and Drinks');
    await cardsPage.checkingUIBalanceTransferData(1, 'Payment', -1.00, 'cross-red', 'Payment to Wallet usd account', 'Wallet usd account');
  });

  it('[C30398] Fields for all types of Source of funds under CSA with 2 corporates @smoke', async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addFeature('Source of funds');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/13180');
    await signInPage.signInAsRegisteredUserUSA('erikadmin@harakirimail.com', 'Password1!');
    await Actions.waitAndClick(await USAMainPageElements.dashboardPage);
    await (dashboardPageElements.selectCorporate).waitForDisplayed();
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.selectCorporate,
      await general.selectOption('Clutter'));
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.selectAccount,
      await general.selectOption('Clu_increased'));
    await (await dashboardPageElements.accountName).waitForDisplayed();
    const accountName = await (await dashboardPageElements.accountName).getText();
    expect(accountName).toEqual('Clu_increased');
    await Actions.waitAndClick(await dashboardPageElements.soureOfFundsTab);
    await (await dashboardPageElements.soureOfFunds.soureOfFundsAccountName).waitForDisplayed();
    const sourceOfFundsName = await dashboardPageElements.soureOfFunds.soureOfFundsAccountName.getText();
    expect(sourceOfFundsName).toEqual('Clutter');

    await Button.clickOnOptionFromDropdown(await dashboardPageElements.selectCorporate, await general.selectOption('Erikson'));
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.selectAccount, await general.selectOption('Larsen'));
    await browser.pause(10000);
    await (await dashboardPageElements.soureOfFunds.soureOfFundsAccountName).waitForDisplayed();
    const sourceOfFundsNameRef = await (await dashboardPageElements.soureOfFunds.soureOfFundsAccountName).getText();
    expect(sourceOfFundsNameRef).toEqual('Erikson');
  });
  
  it('[C31649] Corporates selection @smoke', async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addFeature('Master dashboard');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/31649');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdminNew.Email, Credentials.CenttripAdminNew.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Master Dashboard'));
    await (await dashboardPageElements.selectCorporate).waitForDisplayed();
    await (await masterDashboardPageElements.accountDescription).waitForDisplayed();
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.selectCorporate, await general.selectOption('Ander Corporate'));
    await (await general.divByName('VItebsk')).waitForDisplayed();
  });

  it('[C31668] PRIMARY ACCOUNTS @smoke', async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addFeature('Master dashboard');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/31668');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdminNew.Email, Credentials.CenttripAdminNew.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Master Dashboard'));
    await (await masterDashboardPageElements.totalbalance).waitForDisplayed();
    const firstBalance = await (await masterDashboardPageElements.totalbalance).getText();
    await (await dashboardPageElements.selectCorporate).waitForDisplayed();
    await Button.clickOnOptionFromDropdown(await dashboardPageElements.selectCorporate,
      await general.selectOption('Erikson'));
    await (await masterDashboardPageElements.totalbalance).waitForDisplayed();
    await browser.pause(2000);
    const secondBalance = await (await masterDashboardPageElements.totalbalance).getText();
    expect(secondBalance).not.toEqual(firstBalance);
    let primaryAccountBalance = await masterDashboardPageElements.primaryAccount.getText();
    primaryAccountBalance = primaryAccountBalance.substring(0, primaryAccountBalance.length - 6);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Account List'));
    await Actions.waitAndClick(await USAAccountsPageElements.selectCorporate);
    await Actions.waitAndClick(await general.spanByName('Select all'));
    await Actions.waitAndClick(await general.divByName('Erikson'));
    await Actions.waitAndClick(await general.divByName('Filters'));
    await Button.clickOnOptionFromDropdown(await USAAccountsPageElements.selectAccountType,
      await general.spanByName('All types'));
    await Actions.waitAndClick(await general.spanByName('Operating'));
    await Actions.waitAndClick(await USAAccountsPageElements.selectCorporate);
    await Actions.waitAndClick(await general.buttonByName('Update'));
    await Actions.waitAndClick(await USAAccountsPageElements.searchField);
    await (await USAAccountsPageElements.searchField).addValue('Larsen');
    await (await USAAccountsPageElements.accountBalanceOfLastAccount).waitForDisplayed();
    await browser.pause(2000);
    let accountBalance = await (await USAAccountsPageElements.accountBalanceOfLastAccount).getText();
    expect(accountBalance).toEqual(primaryAccountBalance);
  });

  it('[C31669] OPERATING ACCOUNTS by CSA @smoke', async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addFeature('Total Balances & Operating Account Balances');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/31669');
    await signInPage.signInAsRegisteredUserUSA('csa.snackanddrinks@harakirimail.com', Credentials.CenttripAdminNew.Password);
    await (await masterDashboardPageElements.accountBalenceByNum(1)).waitForDisplayed();
    let accountsBalance = 0;
    const numberOfAccounts = await (await masterDashboardPageElements.arrayOfAccounts).length;
    for (let i = 1; i <= numberOfAccounts; i++) {
      const balance = await masterDashboardPageElements.accountBalenceByNum(i).getText();
      accountsBalance += parseFloat(balance.replace(/[^0-9.]/g, ''));
    }
    const operatingBalance = (await masterDashboardPageElements.operatingAccountBalance.getText()).replace(/[^0-9.]/g, '');
    const primaryBalance = (await masterDashboardPageElements.primaryAccount.getText()).replace(/[^0-9.]/g, '');
    let expectedCondition = (accountsBalance - Number(primaryBalance)).toFixed(2);
    expect(operatingBalance).toEqual(expectedCondition);

    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Account List'));
    await (await USAMainPageElements.columnHeader('Account name')).waitForDisplayed();
    await Actions.waitAndClick(await general.divByName('Filters'));
    await Button.clickOnOptionFromDropdown(await USAAccountsPageElements.selectAccountType,await general.spanByName('All types'));
    await Actions.waitAndClick(await general.spanByName('Operating'));
    await Actions.waitAndClick(await USAAccountsPageElements.selectCorporate);
    await Actions.waitAndClick(await general.buttonByName('Update'));
    await (await general.divByName('Snacks and Drinks')).waitForDisplayed();

    let accountPageBalance = 0;
    for (let i = 1; i <= numberOfAccounts; i++) {
      accountPageBalance += Number(await (await USAAccountsPageElements.accountBalenceByNum(i)).getText());
    };
    expect(Number(operatingBalance)).toEqual(accountPageBalance);
  });
});