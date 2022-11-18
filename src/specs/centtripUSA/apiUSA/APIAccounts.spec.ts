import { addTestId, addSeverity, addFeature } from '../../../core/helper/allure/reporter';
import { connectionUSA } from '../../../wdio.conf';
import { LoginAPICall } from '../../../core/utils/loginAPICall';
import { AppServicePage } from '../../../core/pages/centtripAppWeb/appServicePage';
import { Credentials } from '../../../testData/Credentials';
import { CommonPageUSA } from '../../../core/pages/centtripUSA/commonUSA';
import { AccountsPage } from '../../../core/pages/centtripUSA/accountsPage';
import { CardsPage } from '../../../core/pages/centtripUSA/cardsPage';
import { apiEndpoints } from '../../../testData/apiEndpoints';
import { RandomGenerator } from '../../../core/utils/randomGenerator';
import { requestBody, requestHeadersToken, requestHeadersAdyen } from '../../../testData/other';
import { HttpMethods } from '../../../core/api/rest';
import { URLs } from '../../../urls';

const cardsPage = new CardsPage();
const accountsPage = new AccountsPage();
const appServicePage = new AppServicePage();
const { v4: uuidv4 } = require('uuid');
const commonPageUSA = new CommonPageUSA();

describe(`API > Accounts`, () => {
  let accessToken;
  const primaryAccount = {
    accountId: '112932bb-98fe-4931-474d-f6443fb68957',
    groupLimitsId: 'cd78f42f-b2ae-46d1-964d-3d1640f2ff0b'
  };
  const nonPrimaryAccount = {
    accountId: 'be18acc2-740c-e8c7-20a2-75da4615bd7e',
    groupLimitsId: 'c704e1a7-41a0-4544-9a9f-2b7a41fdb6ee'
  };
  before(async () => {
    if (!connectionUSA._connectCalled) {
      await connectionUSA.connect();
    }
    accessToken = await LoginAPICall.getAccessTokenForAPI(Credentials.CenttripAdminAPI.Email, Credentials.CenttripAdminAPI.Password);
    console.log(accessToken);
  });
  it(`[C36507] Create account for old corporate with Standart limits @smoke`, async () => {
    addSeverity('critical');
    addFeature('API Accounts');
    addTestId('https://centtrip.testrail.io/index.php?/cases/view/36507');
    const corporateRefId = 'd85eea06-c2d3-465b-8fa3-12fdb23e887a';
    const randAccountId = uuidv4();
    console.log(randAccountId);
    const accountName = 'Auto2022 ' + RandomGenerator.uppperTextAndNumbers(7);
    console.log(accountName);

    const cardLimit = await cardsPage.checkCardGroupLimit('AutoQAStandart');
    console.log(cardLimit);

    const body = requestBody.createExtraAccount(randAccountId, corporateRefId, accountName, 'Operating', 'Standard')

    const createAccountRequest = await HttpMethods.post(apiEndpoints.createAccount, requestHeadersToken(accessToken), body, URLs.USAPortalURL);
    expect(createAccountRequest.status).toBe(200);
    expect(createAccountRequest.body.isSuccess).toBe(true);

    const accountDetails = await commonPageUSA.getAccountDetailsFromDB(randAccountId);
    expect(accountDetails[0]).toBe(accountName);
    expect(accountDetails[1]).toBe('Operating');
    expect(accountDetails[2].toJSON().data[0]).toBe(0);
    expect(accountDetails[3].toJSON().data[0]).toBe(0);
    expect(accountDetails[4]).not.toBe(null);

    const entityDetails = await appServicePage.checkEntitiesDetailsInDB(randAccountId);
    expect(entityDetails[0]).toBe(accountName);
    expect(entityDetails[1]).not.toBe(null);

    const accountLimits = await commonPageUSA.checkAccountLimitInDB(randAccountId);
    expect(accountLimits[0][0]).not.toBe(null);
    expect(accountLimits[0][3]).not.toBe(null);

    const getGroupLimitsRequest = await HttpMethods.get(apiEndpoints.getPaymentInstrumentGroupTransactionRules(accountLimits[0][0]),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getGroupLimitsRequest.status).toBe(200);
    expect(Object.keys(getGroupLimitsRequest.body)).toEqual(['transactionRules']);
    expect(getGroupLimitsRequest.body.transactionRules[0].ruleRestrictions.totalAmount.value.value).toEqual(15000000);
    expect(getGroupLimitsRequest.body.transactionRules[1].ruleRestrictions.totalAmount.value.value).toEqual(3000000);
    expect(getGroupLimitsRequest.body.transactionRules[2].ruleRestrictions.totalAmount.value.value).toEqual(75000000);
    expect(getGroupLimitsRequest.body.transactionRules[3].ruleRestrictions.totalAmount.value.value).toEqual(300000);
    expect(getGroupLimitsRequest.body.transactionRules[4].ruleRestrictions.totalAmount.value.value).toEqual(15000000);

    const getTransactionRuleLimitFirst = await HttpMethods.get(apiEndpoints.getTransactionRuleData(accountLimits[0][3]),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getTransactionRuleLimitFirst.status).toBe(200);
    expect(getTransactionRuleLimitFirst.body.transactionRule.ruleRestrictions.totalAmount.value.value).toEqual(15000000);

    const getTransactionRuleLimitsecond = await HttpMethods.get(apiEndpoints.getTransactionRuleData(accountLimits[1][3]),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getTransactionRuleLimitsecond.status).toBe(200);
    expect(getTransactionRuleLimitsecond.body.transactionRule.ruleRestrictions.totalAmount.value.value).toEqual(75000000);

    const getTransactionRuleLimitThird = await HttpMethods.get(apiEndpoints.getTransactionRuleData(accountLimits[2][3]),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getTransactionRuleLimitThird.status).toBe(200);
    expect(getTransactionRuleLimitThird.body.transactionRule.ruleRestrictions.totalAmount.value.value).toEqual(15000000);

    const getTransactionRuleLimitFourth = await HttpMethods.get(apiEndpoints.getTransactionRuleData(accountLimits[3][3]),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getTransactionRuleLimitFourth.status).toBe(200);
    expect(getTransactionRuleLimitFourth.body.transactionRule.ruleRestrictions.totalAmount.value.value).toEqual(300000);

    const getTransactionRuleLimitFiveth = await HttpMethods.get(apiEndpoints.getTransactionRuleData(accountLimits[4][3]),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getTransactionRuleLimitFiveth.status).toBe(200);
    expect(getTransactionRuleLimitFiveth.body.transactionRule.ruleRestrictions.totalAmount.value.value).toEqual(3000000);
  });

  it(`[C36510] Create account for old corporate with Increased limits`, async () => {
    addSeverity('critical');
    addFeature('API Accounts');
    addTestId('https://centtrip.testrail.io/index.php?/cases/view/36510');
    const corporateRefId = 'c394538f-6344-4994-bb65-9573aec0cd7e';
    const randAccountId = uuidv4();
    console.log(randAccountId);
    const accountName = 'Auto2022 ' + RandomGenerator.uppperTextAndNumbers(7);
    console.log(accountName);
    // const accessToken = await LoginAPICall.getAccessTokenForAPI(Credentials.CenttripAdminAPI.Email, Credentials.CenttripAdminAPI.Password);
    // console.log(accessToken);
    const cardLimit = await cardsPage.checkCardGroupLimit('AutoQAIncreased');
    console.log(cardLimit);

    const body = requestBody.createExtraAccount(randAccountId, corporateRefId, accountName, 'Operating', 'Increased')

    const createAccountRequest = await HttpMethods.post(apiEndpoints.createAccount, requestHeadersToken(accessToken), body, URLs.USAPortalURL);
    expect(createAccountRequest.status).toBe(200);
    expect(createAccountRequest.body.isSuccess).toBe(true);

    const accountDetails = await commonPageUSA.getAccountDetailsFromDB(randAccountId);
    expect(accountDetails[0]).toBe(accountName);
    expect(accountDetails[1]).toBe('Operating');
    expect(accountDetails[2].toJSON().data[0]).toBe(0);
    expect(accountDetails[3].toJSON().data[0]).toBe(0);
    expect(accountDetails[4]).not.toBe(null);

    const entityDetails = await appServicePage.checkEntitiesDetailsInDB(randAccountId);
    expect(entityDetails[0]).toBe(accountName);
    expect(entityDetails[1]).not.toBe(null);

    const accountLimits = await commonPageUSA.checkAccountLimitInDB(randAccountId);
    expect(accountLimits[0][0]).not.toBe(null);
    expect(accountLimits[0][3]).not.toBe(null);

    const getGroupLimitsRequest = await HttpMethods.get(apiEndpoints.getPaymentInstrumentGroupTransactionRules(accountLimits[0][0]),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getGroupLimitsRequest.status).toBe(200);
    expect(Object.keys(getGroupLimitsRequest.body)).toEqual(['transactionRules']);
    expect(getGroupLimitsRequest.body.transactionRules[0].ruleRestrictions.totalAmount.value.value).toEqual(15000000);
    expect(getGroupLimitsRequest.body.transactionRules[1].ruleRestrictions.totalAmount.value.value).toEqual(3000000);
    expect(getGroupLimitsRequest.body.transactionRules[2].ruleRestrictions.totalAmount.value.value).toEqual(75000000);
    expect(getGroupLimitsRequest.body.transactionRules[3].ruleRestrictions.totalAmount.value.value).toEqual(300000);
    expect(getGroupLimitsRequest.body.transactionRules[4].ruleRestrictions.totalAmount.value.value).toEqual(15000000);

    const getTransactionRuleLimitFirst = await HttpMethods.get(apiEndpoints.getTransactionRuleData(accountLimits[0][3]),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getTransactionRuleLimitFirst.status).toBe(200);
    expect(getTransactionRuleLimitFirst.body.transactionRule.ruleRestrictions.totalAmount.value.value).toEqual(15000000);

    const getTransactionRuleLimitsecond = await HttpMethods.get(apiEndpoints.getTransactionRuleData(accountLimits[1][3]),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getTransactionRuleLimitsecond.status).toBe(200);
    expect(getTransactionRuleLimitsecond.body.transactionRule.ruleRestrictions.totalAmount.value.value).toEqual(75000000);

    const getTransactionRuleLimitThird = await HttpMethods.get(apiEndpoints.getTransactionRuleData(accountLimits[2][3]),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getTransactionRuleLimitThird.status).toBe(200);
    expect(getTransactionRuleLimitThird.body.transactionRule.ruleRestrictions.totalAmount.value.value).toEqual(15000000);

    const getTransactionRuleLimitFourth = await HttpMethods.get(apiEndpoints.getTransactionRuleData(accountLimits[3][3]),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getTransactionRuleLimitFourth.status).toBe(200);
    expect(getTransactionRuleLimitFourth.body.transactionRule.ruleRestrictions.totalAmount.value.value).toEqual(300000);

    const getTransactionRuleLimitFiveth = await HttpMethods.get(apiEndpoints.getTransactionRuleData(accountLimits[4][3]),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getTransactionRuleLimitFiveth.status).toBe(200);
    expect(getTransactionRuleLimitFiveth.body.transactionRule.ruleRestrictions.totalAmount.value.value).toEqual(3000000);
  });

  it(`[C36511/1] Update account limits for old corporate - primary account @smoke`, async () => {
    addSeverity('critical');
    addFeature('API Accounts');
    addTestId('https://centtrip.testrail.io/index.php?/cases/view/36511');
    const guid = uuidv4();
    const cardLimit = await cardsPage.checkCardGroupLimit('AutoQAForUpdate');
    expect(cardLimit).toEqual('Increased');

    const updateLimitsToStandart = await HttpMethods.patch(apiEndpoints.updateGroupLimits(primaryAccount.groupLimitsId), requestHeadersToken(accessToken),
      requestBody.updateGroupLimits('Standard', guid), URLs.USAPortalURL);
    expect(updateLimitsToStandart.status).toBe(200);

    const updateLimit = await cardsPage.checkCardGroupLimit('AutoQAForUpdate');
    expect(updateLimit).toEqual('Standard');

    const checkLimitsPrimaryAcc = await commonPageUSA.checkAccountLimitInDB(primaryAccount.accountId);
    // console.log(checkLimitsPrimaryAcc);
    const rulesPrimaryIds = await commonPageUSA.getAmountIds(checkLimitsPrimaryAcc);

    const getPrimaryGroupLimits = await HttpMethods.get(apiEndpoints.getPaymentInstrumentGroupTransactionRules(checkLimitsPrimaryAcc[0][0]),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getPrimaryGroupLimits.status).toBe(200);
    expect(Object.keys(getPrimaryGroupLimits.body)).toEqual(['transactionRules']);
    // console.log(getPrimaryGroupLimits.body);

    await accountsPage.getGroupLimits(rulesPrimaryIds.MaximumDailySpendAmount, 15000000);
    await accountsPage.getGroupLimits(rulesPrimaryIds.MaximumMonthlySpendAmount, 75000000);
    await accountsPage.getGroupLimits(rulesPrimaryIds.MaximumSingleTransactionAmount, 15000000);
    await accountsPage.getGroupLimits(rulesPrimaryIds.MaximumDailyAtmWithdrawalAmount, 300000);
    await accountsPage.getGroupLimits(rulesPrimaryIds.MaximumMonthlyAtmWithdrawalAmount, 3000000);
  });

  it(`[C36511/2] Update account limits for old corporate  - not primary account @smoke`, async () => {
    addSeverity('critical');
    addFeature('API Accounts');
    addTestId('https://centtrip.testrail.io/index.php?/cases/view/36511');
    const checkLimitsNonPrimaryAcc = await commonPageUSA.checkAccountLimitInDB(nonPrimaryAccount.accountId);
    const rulesNonPrimaryIds = await commonPageUSA.getAmountIds(checkLimitsNonPrimaryAcc);
    const getNonPrimaryGroupLimits = await HttpMethods.get(apiEndpoints.getPaymentInstrumentGroupTransactionRules(checkLimitsNonPrimaryAcc[0][0]),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getNonPrimaryGroupLimits.status).toBe(200);
    expect(Object.keys(getNonPrimaryGroupLimits.body)).toEqual(['transactionRules']);

    await accountsPage.getGroupLimits(rulesNonPrimaryIds.MaximumDailySpendAmount, 15000000);
    await accountsPage.getGroupLimits(rulesNonPrimaryIds.MaximumMonthlySpendAmount, 75000000);
    await accountsPage.getGroupLimits(rulesNonPrimaryIds.MaximumSingleTransactionAmount, 15000000);
    await accountsPage.getGroupLimits(rulesNonPrimaryIds.MaximumDailyAtmWithdrawalAmount, 300000);
    await accountsPage.getGroupLimits(rulesNonPrimaryIds.MaximumMonthlyAtmWithdrawalAmount, 3000000);
  });

  it(`[C36511/3] Update account limits for old corporate - Update limits @smoke`, async () => {
    addSeverity('critical');
    addFeature('API Accounts');
    addTestId('https://centtrip.testrail.io/index.php?/cases/view/36511');
    const updateLimitsToIncreased = await HttpMethods.patch(apiEndpoints.updateGroupLimits(primaryAccount.groupLimitsId), requestHeadersToken(accessToken),
      requestBody.updateGroupLimits('Increased', uuidv4()), URLs.USAPortalURL);
    expect(updateLimitsToIncreased.status).toBe(200);

    const updateLimit = await cardsPage.checkCardGroupLimit('AutoQAForUpdate');
    expect(updateLimit).toEqual('Increased');
    const checkLimitsPrimaryAcc = await commonPageUSA.checkAccountLimitInDB(primaryAccount.accountId);
    const rulesPrimaryIds = await commonPageUSA.getAmountIds(checkLimitsPrimaryAcc);

    const getPrimaryGroupLimits = await HttpMethods.get(apiEndpoints.getPaymentInstrumentGroupTransactionRules(checkLimitsPrimaryAcc[0][0]),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getPrimaryGroupLimits.status).toBe(200);
    expect(Object.keys(getPrimaryGroupLimits.body)).toEqual(['transactionRules']);

    await accountsPage.getGroupLimits(rulesPrimaryIds.MaximumDailySpendAmount, 27500000);
    await accountsPage.getGroupLimits(rulesPrimaryIds.MaximumMonthlySpendAmount, 100000000);
    await accountsPage.getGroupLimits(rulesPrimaryIds.MaximumSingleTransactionAmount, 25000000);
    await accountsPage.getGroupLimits(rulesPrimaryIds.MaximumDailyAtmWithdrawalAmount, 500000);
    await accountsPage.getGroupLimits(rulesPrimaryIds.MaximumMonthlyAtmWithdrawalAmount, 5000000);

    const checkLimitsNonPrimaryAcc = await commonPageUSA.checkAccountLimitInDB(nonPrimaryAccount.accountId);
    const rulesNonPrimaryIds = await commonPageUSA.getAmountIds(checkLimitsNonPrimaryAcc);

    const getNonPrimaryGroupLimits = await HttpMethods.get(apiEndpoints.getPaymentInstrumentGroupTransactionRules(checkLimitsNonPrimaryAcc[0][0]),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getNonPrimaryGroupLimits.status).toBe(200);
    expect(Object.keys(getNonPrimaryGroupLimits.body)).toEqual(['transactionRules']);

    await accountsPage.getGroupLimits(rulesNonPrimaryIds.MaximumDailySpendAmount, 27500000);
    await accountsPage.getGroupLimits(rulesNonPrimaryIds.MaximumMonthlySpendAmount, 100000000);
    await accountsPage.getGroupLimits(rulesNonPrimaryIds.MaximumSingleTransactionAmount, 25000000);
    await accountsPage.getGroupLimits(rulesNonPrimaryIds.MaximumDailyAtmWithdrawalAmount, 500000);
    await accountsPage.getGroupLimits(rulesNonPrimaryIds.MaximumMonthlyAtmWithdrawalAmount, 5000000);
  });

  it(`[C36509] Account details: primary account @smoke`, async () => {
    addSeverity('critical');
    addFeature('API Accounts');
    addTestId('https://centtrip.testrail.io/index.php?/cases/view/36509');
    const primaryAccId = '112932bb-98fe-4931-474d-f6443fb68957';
    const getAccountdetails = await HttpMethods.get(apiEndpoints.getAccountDetails(primaryAccId), requestHeadersToken(accessToken), URLs.USAPortalURL);
    expect(getAccountdetails.status).toBe(200);
    console.log('thissss is datasss', getAccountdetails.body.value);
    expect(getAccountdetails.body.value.accountName).toEqual('QaUpdatePrimary');
    expect(getAccountdetails.body.value.description).toEqual('QaUpdatePrimary');
    expect(getAccountdetails.body.value.accountType).toEqual('Operating');
    expect(getAccountdetails.body.value.accountCodeRefId).toEqual(primaryAccId);
    expect(getAccountdetails.body.value.operatingEntityCodeRefId).toEqual('f669ea48-6a91-41bc-ac48-3a7076df3243');
    expect(getAccountdetails.body.value.corporateName).toEqual('AutoQAForUpdate');
    expect(getAccountdetails.body.value.externalId).toEqual('BA3227C223222B5GBPWQX9K42');
    expect(getAccountdetails.body.value.accountStatus).toEqual('Active');
    expect(getAccountdetails.body.value.isPrimary).toEqual(true);
    expect(getAccountdetails.body.value.cardCodeRefId).toEqual(null);
  });

  it(`[C36516] Account details: card account @smoke`, async () => {
    addSeverity('critical');
    addFeature('API Accounts');
    addTestId('https://centtrip.testrail.io/index.php?/cases/view/36516');
    const cardAccountId = 'a39cc53c-3611-4f5f-953f-7a7676be43d1';
    const getAccountdetails = await HttpMethods.get(apiEndpoints.getAccountDetails(cardAccountId), requestHeadersToken(accessToken), URLs.USAPortalURL);
    expect(getAccountdetails.status).toBe(200);
    console.log(getAccountdetails.body);
    expect(getAccountdetails.body.value.accountName).toEqual('Auto Own');
    expect(getAccountdetails.body.value.description).toEqual('AQ Own');
    expect(getAccountdetails.body.value.accountType).toEqual('Card');
    expect(getAccountdetails.body.value.accountCodeRefId).toEqual(cardAccountId);
    expect(getAccountdetails.body.value.operatingEntityCodeRefId).toEqual('f683ec3c-35e3-449b-a27a-27aab2b5d805');
    expect(getAccountdetails.body.value.corporateName).toEqual('AutoQAForUpdate');
    expect(getAccountdetails.body.value.externalId).toEqual('BA32272223222B5GBTG5BCX5J');
    expect(getAccountdetails.body.value.accountStatus).toEqual('Active');
    expect(getAccountdetails.body.value.isPrimary).toEqual(false);
    expect(getAccountdetails.body.value.cardCodeRefId).toEqual('d48f7829-afc2-48ed-895a-d90ab1fae663');
  });

  it(`[C36514] Accounts list: not primary account @smoke`, async () => {
    addSeverity('critical');
    addFeature('API Accounts');
    addTestId('https://centtrip.testrail.io/index.php?/cases/view/36514');
    const corpEntityCode = 'a5b18c28-df6c-486e-9797-78a691005d14';
    const body = {
      "filters": {
        "corporates": [corpEntityCode],
        "accountStatus": [
          "Active",
          "Active Partial"
        ],
        "accountType": [
          "Operating"
        ]
      },
      "pageSize": 100,
      "direction": "Next"
    }
    const checkAccount = await HttpMethods.post(apiEndpoints.accountDetails, requestHeadersToken(accessToken), body, URLs.USAPortalURL)
    expect(checkAccount.status).toBe(200);
    const nonPrimaryAccData = checkAccount.body.value.data[0];

    expect(nonPrimaryAccData.accountName).toEqual('QAForUpdate');
    expect(nonPrimaryAccData.description).toEqual('QAForUpdate');
    expect(nonPrimaryAccData.accountType).toEqual('Operating');
    expect(nonPrimaryAccData.accountCodeRefId).toEqual('be18acc2-740c-e8c7-20a2-75da4615bd7e');
    expect(nonPrimaryAccData.operatingEntityCodeRefId).toEqual('f683ec3c-35e3-449b-a27a-27aab2b5d805');
    expect(nonPrimaryAccData.corporateName).toEqual('AutoQAForUpdate');
    expect(nonPrimaryAccData.externalId).toEqual('BA32272223222B5GBPWW2CJPR');
    expect(nonPrimaryAccData.accountStatus).toEqual('Active');
    expect(nonPrimaryAccData.isPrimary).toEqual(false);
  });
});