import allureReporter from '@wdio/allure-reporter';
import { Credentials } from '../../testData/Credentials';
import { SignInPage } from '../../core/pages/centtripAppWeb/signInPage';
import { addEpic} from '../../core/helper/allure/reporter';
import { Actions } from '../../core/utils/actions';
import {
  general, mainMailPageElements,
  USAMainPageElements, USAUsersPageElements
} from '../../core/pages/locators';
import { Other } from '../../core/utils/other';
import { CommonPageUSA } from '../../core/pages/centtripUSA/commonUSA';
import { MailMainPage } from '../../core/pages/externalServices/mailPage';
import { other } from '../../testData/other';
import { URLs } from '../../urls';

const signInPage = new SignInPage();
const commonPageUSA = new CommonPageUSA();
const mailMainPage = new MailMainPage();

describe(`Users >> Users page >> Corporate Admin with Corporate/Operating access`, () => {
  beforeEach(async () => {
    addEpic('Users');
    allureReporter.addFeature('Users page');
    allureReporter.addStory('Corporate Admin with Corporate/Operating access');
    await browser.url(URLs.USAPortalURL);
  });
  afterEach(async () => {
    await commonPageUSA.checkBrowserLogsForServerErrors();
    await Other.deleteCacheCookiesUSA();
  });

  it('[C13786] Resend email from the table by Corporate Admin', async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/13786');
    const emailsCount = await mailMainPage.getNumberOfEmailsForCurrentDate('a.mozart@harakirimail.com', URLs.USAPortalURL);
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Users'));
    await (await USAUsersPageElements.selectOperatingAccounts).addValue('Clu_increased');
    await Actions.waitAndClick(await general.divByName('Select all'));
    await Actions.waitAndClick(await general.divByName('Clu_increased'));
    await (await general.divByName('User Name')).waitForDisplayed();
    await (await USAUsersPageElements.searchField).addValue('iogann.bach@harakirimail.com');
    await (await USAUsersPageElements.editUser).waitForDisplayed();
    expect(await USAUsersPageElements.resendEmail).not.toBePresent();
    await (await USAUsersPageElements.searchField).setValue('a.mozart@harakirimail.com');
    await (await USAUsersPageElements.resendEmail).waitForDisplayed;
    expect(await USAUsersPageElements.resendEmail.isDisplayed());
    await Actions.waitAndClick(await USAUsersPageElements.resendEmail);
    await await browser.newWindow(URLs.mainMail);
    await (await mainMailPageElements.emailField).addValue('a.mozart@harakirimail.com');
    await Actions.waitAndClick(await mainMailPageElements.checkButton);
    await mailMainPage.checkNumberOfEmails(mainMailPageElements.emailsOnCurrentDate(other.mailDate), emailsCount + 1);
  });
});
