import allureReporter from '@wdio/allure-reporter';
import { general } from '../../core/pages/locators';
import { addEpic } from '../../core/helper/allure/reporter';
import { Credentials } from '../../testData/Credentials';
import { SignInPage } from '../../core/pages/centtripAppWeb/signInPage';
import { CommonPageUSA } from '../../core/pages/centtripUSA/commonUSA';
import { Other } from '../../core/utils/other';
import { Actions } from '../../core/utils/actions';
import { URLs } from '../../urls';

const signInPage = new SignInPage();
const commonPageUSA = new CommonPageUSA();

describe('Access > Sign out', () => {

  before(async () => {
    addEpic('Access');
    allureReporter.addFeature('Sign out');
  });
  afterEach(async () => {
    await Other.deleteCacheCookiesUSA();
  });

  it('[C14519] Sign out from Centtrip USA', async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/14519');
    await browser.url(URLs.USAPortalURL);
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await commonPageUSA.signOutUSA();
    await (await general.divByName('You are now signed out')).waitForDisplayed();
    await Actions.waitAndClick(await general.linkByName('Return to Centtrip'));
    expect(await browser.getUrl()).toContain(URLs.USAPortalURL);
  });
});
