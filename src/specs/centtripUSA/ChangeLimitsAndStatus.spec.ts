import allureReporter from '@wdio/allure-reporter';
import { config, connectionUSA, connection } from '../../wdio.conf';
import { addEpic } from '../../core/helper/allure/reporter';
import { HttpMethods } from '../../core/api/rest';
import { requestHeadersAdyen } from '../../testData/other';
import { apiEndpoints } from '../../testData/apiEndpoints';
import { Actions } from '../../core/utils/actions';
import { Other } from '../../core/utils/other';
import { CommonPageUSA } from '../../core/pages/centtripUSA/commonUSA';
import { CardsPage } from '../../core/pages/centtripUSA/cardsPage';
import { Credentials } from '../../testData/Credentials';
import { SignInPage } from '../../core/pages/centtripAppWeb/signInPage';
import {
  general, USAMainPageElements, USAManageCardsPageElements
} from '../../core/pages/locators';
import { URLs } from '../../urls';

const commonPageUSA = new CommonPageUSA();
const signInPage = new SignInPage();
const cardsPage = new CardsPage();

describe('New corporate start flow > CSA creates new cards', () => {

  before(async () => {
    if (!connectionUSA._connectCalled) {
      await connectionUSA.connect();
    }
    if (!connection._connectCalled) {
      await connection.connect();
    }
  });

  beforeEach(async () => {
    addEpic('New corporate start flow');
    allureReporter.addFeature('CSA changes limits and status');
  });

  afterEach(async () => {
    await commonPageUSA.checkBrowserLogsForServerErrors();
    await Other.deleteCacheCookiesUSA();
  });

  it('[C36647] Update limits of new own carde @smoke', async () => {
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36647');
    allureReporter.addSeverity('normal');
    await browser.url(URLs.USAPortalURL);
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdminAPI.Email, Credentials.CenttripAdmin.Password);
    await (await USAMainPageElements.navigationMenu('Users')).waitForDisplayed();
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Manage cards'));
    await (await USAManageCardsPageElements.manageCardsTable).waitForDisplayed();
    await (await USAManageCardsPageElements.searchField).addValue('FO Card');
    await (await USAMainPageElements.columnHeader('OPERATING ACCOUNT')).waitForDisplayed();
    await browser.pause(2000);
    const cardName = await (await USAManageCardsPageElements.table.nameOfLastCard).getText();

    await Actions.waitAndClick(await general.rowByName('FO Card'));
    await (await USAManageCardsPageElements.details.cardDetailsWindow).waitForDisplayed();
    await cardsPage.checkCardLimitsOnManageLimitsModalPattern('150000', '750000', '3000', '30000', '150000');
    await Actions.waitAndClick(await USAManageCardsPageElements.manageLimits.crossButton);
    await cardsPage.updateCardLimitsPattern('1', '1', '1', '1', '1');
    await (await USAManageCardsPageElements.details.manageLimitsButton).waitForDisplayed();
    await browser.pause(1000);
    await cardsPage.checkCardLimitsPattern('1', '1', '1', '1', '1', true);
    await cardsPage.checkCardLimitsOnManageLimitsModalPattern('1', '1', '1', '1', '1');

    const cardData = await commonPageUSA.checkTransactionRulesForOwnCard(cardName);
    for (let i = 1; i < cardData.length; i++) {
      const externalId = cardData[i].ExternalId;
      const getAmountSpendTransactionRuleRequest = await HttpMethods.get(apiEndpoints.getTransactionRuleData(externalId),
        requestHeadersAdyen, config.params.apiAdyenUrl);
      expect(getAmountSpendTransactionRuleRequest.status).toBe(200);
      expect(getAmountSpendTransactionRuleRequest.body.transactionRule.ruleRestrictions.totalAmount.value.value).toEqual(100);
    };
  });
});