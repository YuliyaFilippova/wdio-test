import allureReporter from '@wdio/allure-reporter';
import { Credentials } from '../../testData/Credentials';
import { SignInPage } from '../../core/pages/centtripAppWeb/signInPage';
import { addEpic } from '../../core/helper/allure/reporter';
import { Actions } from '../../core/utils/actions';
import { Button } from '../../core/controls/button';
import {
  general,
  USAMainPageElements, USAManageCardsPageElements
} from '../../core/pages/locators';
import { Other } from '../../core/utils/other';
import {
  getCodeRefIdByType, idDataManageLimits, requestBody,
  requestHeadersUSAEntities, requestHeadersAdyen
} from '../../testData/other';
import { HttpMethods } from '../../core/api/rest';
import { apiEndpoints } from '../../testData/apiEndpoints';
import { config, connectionUSA } from '../../wdio.conf';
import { RandomGenerator } from '../../core/utils/randomGenerator';
import { CardsPage } from '../../core/pages/centtripUSA/cardsPage';
import { URLs } from '../../urls';

const signInPage = new SignInPage();
const { v4: uuidv4 } = require('uuid');
const cardsPage = new CardsPage();

describe(`Cards > Manage limits`, () => {
  const randCardId = uuidv4();

  let adyenDailySpendIdCorp: string;
  let adyenMonthlySpendIdCorp: string;
  let adyenTransactionAmountIdCorp: string;
  let adyenLimitPerDayIdCorp: string;
  let adyenLimitPerMonthIdCorp: string;
  let cardHolderName: string;
  let cardHolderNameCorp: string;

  before(async () => {
    if (!connectionUSA._connectCalled) {
      await connectionUSA.connect();
    }
  });
  beforeEach(async () => {
    addEpic('Cards');
    allureReporter.addFeature('Manage limits');
    await browser.url(URLs.USAPortalURL);
  });
  afterEach(async () => {
    await Other.deleteCacheCookiesUSA();
  });

  it(`[C10311] Change default limits on "Manage Limits" popup for Card of Card account under Centtrip Admin @smoke`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/10311');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Manage cards'));
    await (await USAManageCardsPageElements.table.nameOfLastCard).waitForDisplayed();
    await Actions.waitAndClick(await USAManageCardsPageElements.searchField);
    await (await USAManageCardsPageElements.searchField).addValue('Tom Petti');
    await Actions.waitAndClick(await USAManageCardsPageElements.table.rowByName('Tom Petti'));
    await (await USAManageCardsPageElements.details.cardDetailsWindow).waitForDisplayed();
    await cardsPage.updateCardLimitsPattern('74998', '349997', '746', '9995', '74994');

    await (await USAManageCardsPageElements.details.manageLimitsButton).waitForDisplayed();
    await cardsPage.checkCardLimitsOnManageLimitsModalPattern('74998', '349997', '746', '9995', '74994');
    await Actions.waitAndClick(await USAManageCardsPageElements.manageLimits.crossButton);
    await cardsPage.updateCardLimitsPattern('74999', '349998', '747', '9996', '74995');
    await (await USAManageCardsPageElements.details.manageLimitsButton).waitForDisplayed();
    await cardsPage.checkCardLimitsOnManageLimitsModalPattern('74999', '349998', '747', '9996', '74995');
  }).timeout(350000);

  it(`[C10312] Change default limits on "Manage Limits" popup for Card of Operating account under Corporate Admin @smoke`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/10312');
    const cardId = uuidv4();
    const cardGroupId = 'f6343c5a-cc17-4432-ba56-cba28ab870ac';
    const operatingAccountId = 'f7b66d0b-aa3c-775d-2e3e-0084a1875e73';
    const cardholderName = `Sonny Limits ${RandomGenerator.textAndNumbers(8)}`;

    await HttpMethods.post(apiEndpoints.createCardForOperatingAccount, requestHeadersUSAEntities,
      requestBody.createCardForOperatingAccountFull(cardId, cardGroupId, operatingAccountId, cardholderName, 'Eddi', `Limits${RandomGenerator.lowerCaseText(8)}`),
      URLs.apiEntityHierarchyUrl);

    await signInPage.signInAsRegisteredUserUSA(Credentials.corporateAdmCapital.Email, Credentials.corporateAdmCapital.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Manage cards'));
    await (await USAManageCardsPageElements.table.nameOfLastCard).waitForDisplayed();
    await Actions.waitAndClick(await USAManageCardsPageElements.searchField);
    await (await USAManageCardsPageElements.searchField).addValue(cardholderName);
    await Actions.waitAndClick(await USAManageCardsPageElements.table.rowByName(cardholderName));
    await (await USAManageCardsPageElements.details.cardDetailsWindow).waitForDisplayed();

    await cardsPage.updateCardLimitsPattern('74998', '349997', '746', '9995', '74994');
    await (await USAManageCardsPageElements.details.manageLimitsButton).waitForDisplayed();
    await cardsPage.checkCardLimitsOnManageLimitsModalPattern('74998', '349997', '746', '9995', '74994');
    await Actions.waitAndClick(await USAManageCardsPageElements.manageLimits.crossButton);
    await cardsPage.updateCardLimitsPattern('74999', '349998', '747', '9996', '74995');
    await (await USAManageCardsPageElements.details.manageLimitsButton).waitForDisplayed();
    await cardsPage.checkCardLimitsOnManageLimitsModalPattern('74999', '349998', '747', '9996', '74995');
  }).timeout(350000);

  it(`[C14061/1(Decrease a limit)] Change default limits under Centtrip Admin - check changes in DB and in Adyen @smoke`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/14061');
    cardHolderName = `${RandomGenerator.lowerCaseText(8)} Test Holder`;

    const createCardForCardAccountRequest = await HttpMethods.post(apiEndpoints.createCardForOperatingAccount, requestHeadersUSAEntities,
      requestBody.createCardForCardAccount(randCardId, idDataManageLimits.cardGroupCodeRefId, idDataManageLimits.accountCodeRefId, cardHolderName),
      URLs.apiEntityHierarchyUrl);
    expect(createCardForCardAccountRequest.status).toBe(200);
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Manage cards'));
    await (await USAManageCardsPageElements.table.nameOfLastCard).waitForDisplayed();
    await Actions.waitAndClick(await USAManageCardsPageElements.searchField);
    await (await USAManageCardsPageElements.searchField).addValue(cardHolderName);
    await Actions.waitAndClick(await USAManageCardsPageElements.table.rowByName(cardHolderName));
    await (await USAManageCardsPageElements.details.cardDetailsWindow).waitForDisplayed();
    await cardsPage.updateCardLimitsPattern('74998', '349996', '744', '9992', '74990');

    await (await USAManageCardsPageElements.details.manageLimitsButton).waitForDisplayed();
    await (await USAManageCardsPageElements.details.limits.maxDailySpendField).waitForDisplayed();
    try {
      await Actions.waitAndClick(await USAManageCardsPageElements.details.manageLimitsButton);
      await (await USAManageCardsPageElements.manageLimits.maxDailySpendField).waitForDisplayed();
    } catch {
      await Actions.waitAndClick(await USAManageCardsPageElements.details.manageLimitsButton);
      await (await USAManageCardsPageElements.manageLimits.maxDailySpendField).waitForDisplayed();
    };
    const cardRefId = await cardsPage.getCardCodeRefIdFromDB(cardHolderName);
    const externalId = await cardsPage.getAdyenCardTransactionRuleIdFromDB(cardRefId);

    const getCardLimitRequest = await HttpMethods.get(apiEndpoints.getTransactionRuleData(externalId), requestHeadersAdyen,
      URLs.apiAdyenUrl);
    expect(getCardLimitRequest.body.transactionRule.ruleRestrictions.totalAmount.value.value).toEqual(7499000);
  }).timeout(350000);

  it(`[C14061/2(Increase a limit)] Change default limits under Centtrip Admin - check changes in DB and in Adyen @smoke`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/14061');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Manage cards'));
    await (await USAManageCardsPageElements.table.nameOfLastCard).waitForDisplayed();
    await Actions.waitAndClick(await USAManageCardsPageElements.searchField);
    await (await USAManageCardsPageElements.searchField).addValue(cardHolderName);
    await Actions.waitAndClick(await USAManageCardsPageElements.table.rowByName(cardHolderName));
    await (await USAManageCardsPageElements.details.cardDetailsWindow).waitForDisplayed();
    await cardsPage.updateCardLimitsPattern('74999', '349997', '745', '9993', '74993');

    await (await USAManageCardsPageElements.details.manageLimitsButton).waitForDisplayed();
    await (await USAManageCardsPageElements.details.limits.maxDailySpendField).waitForDisplayed();
    try {
      await Actions.waitAndClick(await USAManageCardsPageElements.details.manageLimitsButton);
      await (await USAManageCardsPageElements.manageLimits.maxDailySpendField).waitForDisplayed();
    } catch {
      await Actions.waitAndClick(await USAManageCardsPageElements.details.manageLimitsButton);
      await (await USAManageCardsPageElements.manageLimits.maxDailySpendField).waitForDisplayed();
    };
    const cardRefId = await cardsPage.getCardCodeRefIdFromDB(cardHolderName);
    const externalId = await cardsPage.getAdyenCardTransactionRuleIdFromDB(cardRefId);
    console.log(externalId);

    const getCardLimitRequest = await HttpMethods.get(apiEndpoints.getTransactionRuleData(externalId), requestHeadersAdyen,
      URLs.apiAdyenUrl);
    expect(getCardLimitRequest.body.transactionRule.ruleRestrictions.totalAmount.value.value).toEqual(7499300);
  }).timeout(350000);

  it.only(`[C14062/1(Decrease a limit)] Change default limits under Corporate Admin - check changes in DB and in Adyen @smoke`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/14062');
    const cardId = uuidv4();
    const cardGroupId = 'f6343c5a-cc17-4432-ba56-cba28ab870ac';
    const operatingAccountId = 'f7b66d0b-aa3c-775d-2e3e-0084a1875e73';
    cardHolderNameCorp = `Sonny Limits ${RandomGenerator.textAndNumbers(8)}`;

    const cardData = await HttpMethods.post(apiEndpoints.createCardForOperatingAccount, requestHeadersUSAEntities,
      requestBody.createCardForOperatingAccountFull(cardId, cardGroupId, operatingAccountId, cardHolderNameCorp, 'Eddi', `Limits${RandomGenerator.lowerCaseText(8)}`),
      URLs.apiEntityHierarchyUrl);
    console.log(cardData.body)
    console.log(cardHolderNameCorp);

    await signInPage.signInAsRegisteredUserUSA(Credentials.corporateAdmCapital.Email, Credentials.corporateAdmCapital.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Manage cards'));
    await (await USAManageCardsPageElements.table.nameOfLastCard).waitForDisplayed();
    await Actions.waitAndClick(await USAManageCardsPageElements.searchField);
    await (await USAManageCardsPageElements.searchField).addValue(cardHolderNameCorp);
    await Actions.waitAndClick(await USAManageCardsPageElements.table.rowByName(cardHolderNameCorp));
    await (await USAManageCardsPageElements.details.cardDetailsWindow).waitForDisplayed();
    await cardsPage.updateCardLimitsPattern('74998', '349996', '744', '9992', '74990');

    try {
      await Actions.waitAndClick(await USAManageCardsPageElements.details.manageLimitsButton);
      await (await USAManageCardsPageElements.manageLimits.maxDailySpendField).waitForDisplayed();
    } catch {
      await Actions.waitAndClick(await USAManageCardsPageElements.details.manageLimitsButton);
      await (await USAManageCardsPageElements.manageLimits.maxDailySpendField).waitForDisplayed();
    };
    const getCardLimitsRequest = await HttpMethods.get(apiEndpoints.getCardsLimits(cardId), requestHeadersUSAEntities,
      URLs.apiEntityHierarchyUrl);
    const codeRefIdDailySpendCorp = await getCodeRefIdByType(getCardLimitsRequest.body, 'MaximumDailySpendAmount');
    const codeRefIdMonthlySpendCorp = await getCodeRefIdByType(getCardLimitsRequest.body, 'MaximumMonthlySpendAmount');
    const codeRefIdTransactionAmountCorp = await getCodeRefIdByType(getCardLimitsRequest.body, 'MaximumSingleTransactionAmount');
    const codeRefIdLimitPerDayCorp = await getCodeRefIdByType(getCardLimitsRequest.body, 'MaximumDailyAtmWithdrawalAmount');
    const codeRefIdLimitPerMonthCorp = await getCodeRefIdByType(getCardLimitsRequest.body, 'MaximumMonthlyAtmWithdrawalAmount');
    expect(getCardLimitsRequest.status).toBe(200);

    const adyenCardTransactionRulesIdData = await cardsPage.getAdyenCardTransactionRulesIdFromDB(codeRefIdDailySpendCorp, codeRefIdMonthlySpendCorp,
      codeRefIdTransactionAmountCorp, codeRefIdLimitPerDayCorp, codeRefIdLimitPerMonthCorp);
    adyenDailySpendIdCorp = adyenCardTransactionRulesIdData[0];
    adyenMonthlySpendIdCorp = adyenCardTransactionRulesIdData[1];
    adyenTransactionAmountIdCorp = adyenCardTransactionRulesIdData[2];
    adyenLimitPerDayIdCorp = adyenCardTransactionRulesIdData[3];
    adyenLimitPerMonthIdCorp = adyenCardTransactionRulesIdData[4];

    await browser.pause(5000);

    const getDailySpendTransactionRuleRequest = await HttpMethods.get(apiEndpoints.getTransactionRuleData(adyenDailySpendIdCorp),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getDailySpendTransactionRuleRequest.status).toBe(200);
    expect(getDailySpendTransactionRuleRequest.body.transactionRule.ruleRestrictions.totalAmount.value.value).toBe(7499800);
    const getMonthlySpendTransactionRuleRequest = await HttpMethods.get(apiEndpoints.getTransactionRuleData(adyenMonthlySpendIdCorp),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getMonthlySpendTransactionRuleRequest.status).toBe(200);
    expect(getMonthlySpendTransactionRuleRequest.body.transactionRule.ruleRestrictions.totalAmount.value.value).toBe(34999600);
    const getTransactionAmountTransactionRuleRequest = await HttpMethods.get(apiEndpoints.getTransactionRuleData(adyenTransactionAmountIdCorp),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getTransactionAmountTransactionRuleRequest.status).toBe(200);
    expect(getTransactionAmountTransactionRuleRequest.body.transactionRule.ruleRestrictions.totalAmount.value.value).toBe(7499000);
    const getLimitPerDayRequest = await HttpMethods.get(apiEndpoints.getTransactionRuleData(adyenLimitPerDayIdCorp),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getLimitPerDayRequest.status).toBe(200);
    expect(getLimitPerDayRequest.body.transactionRule.ruleRestrictions.totalAmount.value.value).toBe(74400);
    const getLimitPerMonthRequest = await HttpMethods.get(apiEndpoints.getTransactionRuleData(adyenLimitPerMonthIdCorp),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getLimitPerMonthRequest.status).toBe(200);
    expect(getLimitPerMonthRequest.body.transactionRule.ruleRestrictions.totalAmount.value.value).toBe(999200);
  }).timeout(350000);

  it.only(`[C14062/2(Increase a limit)] Change default limits under Corporate Admin - check changes in DB and in Adyen @smoke`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/14062');
    await signInPage.signInAsRegisteredUserUSA(Credentials.corporateAdmCapital.Email, Credentials.corporateAdmCapital.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Manage cards'));
    await (await USAManageCardsPageElements.filter.selectCorporateField).waitForDisplayed();
    await Button.clickOnOptionFromDropdown(await USAManageCardsPageElements.filter.selectOperatingAccountField,
      await general.selectOption('Select all'));
    await Button.clickOnOptionFromDropdown(await USAManageCardsPageElements.filter.selectOperatingAccountField,
      await general.selectOption('USA'));
    await Actions.waitAndClick(await USAManageCardsPageElements.searchField);
    await (await USAManageCardsPageElements.searchField).addValue(cardHolderNameCorp);
    await Actions.waitAndClick(await USAManageCardsPageElements.table.rowByName(cardHolderNameCorp));
    await (await USAManageCardsPageElements.details.cardDetailsWindow).waitForDisplayed();
    await cardsPage.updateCardLimitsPattern('74999', '349997', '745', '9993', '74993');

    try {
      await Actions.waitAndClick(await USAManageCardsPageElements.details.manageLimitsButton);
      await (await USAManageCardsPageElements.manageLimits.maxDailySpendField).waitForDisplayed();
    } catch {
      await Actions.waitAndClick(await USAManageCardsPageElements.details.manageLimitsButton);
      await (await USAManageCardsPageElements.manageLimits.maxDailySpendField).waitForDisplayed();
    };

    const getDailySpendTransactionRuleRequest = await HttpMethods.get(apiEndpoints.getTransactionRuleData(adyenDailySpendIdCorp),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getDailySpendTransactionRuleRequest.status).toBe(200);
    expect(getDailySpendTransactionRuleRequest.body.transactionRule.ruleRestrictions.totalAmount.value.value).toBe(7499900);
    const getMonthlySpendTransactionRuleRequest = await HttpMethods.get(apiEndpoints.getTransactionRuleData(adyenMonthlySpendIdCorp),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getMonthlySpendTransactionRuleRequest.status).toBe(200);
    expect(getMonthlySpendTransactionRuleRequest.body.transactionRule.ruleRestrictions.totalAmount.value.value).toBe(34999700);
    const getTransactionAmountTransactionRuleRequest = await HttpMethods.get(apiEndpoints.getTransactionRuleData(adyenTransactionAmountIdCorp),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getTransactionAmountTransactionRuleRequest.status).toBe(200);
    expect(getTransactionAmountTransactionRuleRequest.body.transactionRule.ruleRestrictions.totalAmount.value.value).toBe(7499300);
    const getLimitPerDayRequest = await HttpMethods.get(apiEndpoints.getTransactionRuleData(adyenLimitPerDayIdCorp),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getLimitPerDayRequest.status).toBe(200);
    expect(getLimitPerDayRequest.body.transactionRule.ruleRestrictions.totalAmount.value.value).toBe(74500);
    const getLimitPerMonthRequest = await HttpMethods.get(apiEndpoints.getTransactionRuleData(adyenLimitPerMonthIdCorp),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getLimitPerMonthRequest.status).toBe(200);
    expect(getLimitPerMonthRequest.body.transactionRule.ruleRestrictions.totalAmount.value.value).toBe(999300);
  }).timeout(350000);
});
