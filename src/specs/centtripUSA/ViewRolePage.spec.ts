import allureReporter from '@wdio/allure-reporter';
import { Credentials } from '../../testData/Credentials';
import { SignInPage } from '../../core/pages/centtripAppWeb/signInPage';
import { addEpic } from '../../core/helper/allure/reporter';
import { Actions } from '../../core/utils/actions';
import { USAMainPageElements, USARolesPageElements } from '../../core/pages/locators';
import { Other } from '../../core/utils/other';
import { CommonPageUSA } from '../../core/pages/centtripUSA/commonUSA';
import { URLs } from '../../urls';

const signInPage = new SignInPage();
const commonPageUSA = new CommonPageUSA();

describe(`Roles > Roles page`, () => {
  beforeEach(async () => {
    addEpic('Roles');
    allureReporter.addFeature('Roles page');
    await browser.url(URLs.USAPortalURL);
  });
  afterEach(async () => {
    await commonPageUSA.checkBrowserLogsForServerErrors();
    await Other.deleteCacheCookiesUSA();
  });

  it('[C9672] Default Centtrip roles in the Roles table @smoke', async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/9672');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdminNew.Email, Credentials.CenttripAdminNew.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Roles'));
    await (await USAMainPageElements.columnHeader('Date Created')).waitForDisplayed();
    await commonPageUSA.checkThatSelectedElementsAreDisplayed(await USARolesPageElements.roleByName('Cardholder'),
      await USARolesPageElements.roleByName('Centtrip Administrator'), await USARolesPageElements.roleByName('Corporate Administrator'));
  });
});
