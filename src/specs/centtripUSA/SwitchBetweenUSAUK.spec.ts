import allureReporter from '@wdio/allure-reporter';
import {general, UKGeneralElements, USAMainPageElements} from '../../core/pages/locators';
import {Credentials} from '../../testData/Credentials';
import {SignInPage} from '../../core/pages/centtripAppWeb/signInPage';
import {addEpic, addFeature, addSeverity, addStory, addTestId} from '../../core/helper/allure/reporter';
import {Other} from '../../core/utils/other';
import {Actions} from '../../core/utils/actions';
import { URLs } from '../../urls';

const signInPage = new SignInPage();

describe('Navigation, header, footer > Switch between USA and UK', () => {

  beforeEach(async () => {
    addEpic('Navigation, header, footer');
    allureReporter.addFeature('Switch between USA and UK');
  });
  afterEach(async () => {
    await Other.deleteCacheCookiesUSA();
  });

  it('[C12699] [UK] Corporate Admin with access to USA-UK can switch between USA and UK', async () => {
    allureReporter.addStory('USA access / UK access - Yes / Yes');
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/12699');
    await browser.url(URLs.USAPortalURL);
    await signInPage.signInAsRegisteredUserUSA('usa.uk.corp.admin.qa@harakirimail.com', Credentials.CorporateAdminCredentials.Password);
    await Actions.waitAndClick(await USAMainPageElements.switcherUSAUK.switchCountryButton);
    await Actions.waitAndClick(await USAMainPageElements.switcherUSAUK.selectUK);
    await (await UKGeneralElements.settingsButton).waitForDisplayed();
    expect(await browser.getUrl()).toContain(URLs.UKPortalURL);
    await UKGeneralElements.settingsButton.moveTo();
    await Actions.waitAndClick(await general.linkByName('Centtrip USA Dashboard'));
    await USAMainPageElements.switcherUSAUK.switchCountryButton.waitForDisplayed();
    expect(await browser.getUrl()).toContain(URLs.USAPortalURL);
  });
});
