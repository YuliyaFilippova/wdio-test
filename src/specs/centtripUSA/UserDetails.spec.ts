import allureReporter from '@wdio/allure-reporter';
import { Credentials } from '../../testData/Credentials';
import { SignInPage } from '../../core/pages/centtripAppWeb/signInPage';
import { addEpic } from '../../core/helper/allure/reporter';
import { Actions } from '../../core/utils/actions';
import { general, USAUsersPageElements } from '../../core/pages/locators';
import { Other } from '../../core/utils/other';
import { checkAccountsInUserDetails } from '../../testData/other';
import { CommonPageUSA } from '../../core/pages/centtripUSA/commonUSA';
import { UsersPage } from '../../core/pages/centtripUSA/usersPage';
import { connectionUSA } from '../../wdio.conf';
import { URLs } from '../../urls';

const signInPage = new SignInPage();
const commonPageUSA = new CommonPageUSA();
const usersPage = new UsersPage();

describe(`Users >> User details >> Centtrip Admin`, () => {
  before(async () => {
    if (!connectionUSA._connectCalled) {
      await connectionUSA.connect();
    }
  });
  beforeEach(async () => {
    addEpic('Users');
    allureReporter.addFeature('User details');
    allureReporter.addStory('Centtrip Admin');
    await browser.url(URLs.USAPortalURL);
  });
  afterEach(async () => {
    await commonPageUSA.checkBrowserLogsForServerErrors();
    await Other.deleteCacheCookiesUSA();
  });

  it(`[C13775] User details view for Centtrip Admin`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/13775');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await Actions.waitAndClick(await general.spanByName('Users'));
    await usersPage.openUserDetailsForSelectedUser('1lpxmysic11auto@harakirimail.com');
    await (await USAUsersPageElements.userDetails.allAccountBlocks).waitForDisplayed();
    expect(await (await USAUsersPageElements.userDetails.userName).isDisplayed());
    expect(await (await USAUsersPageElements.userDetails.userDateOfBirth).isDisplayed());
    expect(await (await USAUsersPageElements.userDetails.userEmail).isDisplayed());
    expect(await (await USAUsersPageElements.userDetails.userId).isDisplayed());
    expect(await (await USAUsersPageElements.userDetails.openSiteAccess).isDisplayed());
    expect(await (await USAUsersPageElements.userDetails.allAccountBlocks).isDisplayed());
  });

  it(`[C25120] Accounts of Corporate Super Admin on User details`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/25120');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdminNew.Email, Credentials.CenttripAdminNew.Password);
    await Actions.waitAndClick(await general.spanByName('Users'));
    await usersPage.openUserDetailsForSelectedUser('skaogtsswn@cutradition.com');
    await (await USAUsersPageElements.userDetails.allAccountBlocks).waitForDisplayed();
    expect(await (await USAUsersPageElements.userDetails.userName).isDisplayed());
    expect(await (await USAUsersPageElements.userDetails.userDateOfBirth).isDisplayed());
    expect(await (await USAUsersPageElements.userDetails.userEmail).isDisplayed());
    expect(await (await USAUsersPageElements.userDetails.userId).isDisplayed());
    expect(await (await USAUsersPageElements.userDetails.openSiteAccess).isDisplayed());
    expect(await (await USAUsersPageElements.userDetails.allAccountBlocks).isDisplayed());
  });

  it(`[C14072] Accounts of Corporate Admin with Corporate Access on User details`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/14072');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await Actions.waitAndClick(await general.spanByName('Users'));
    await usersPage.openUserDetailsForSelectedUser(Credentials.CorporateAdminGoogle.Email);
    await (await USAUsersPageElements.userDetails.allAccountBlocks).waitForDisplayed();
    const data = await Promise.all((await USAUsersPageElements.userDetails.block).map(element => element.getText()));
    const dataQuantity = await USAUsersPageElements.userDetails.block.length;

    await checkAccountsInUserDetails(data, 'Operating', 'Clu_standard');
    await checkAccountsInUserDetails(data, 'Operating', 'Clu_increased');
    await checkAccountsInUserDetails(data, 'Card', 'Laura Chief Manager');
    await checkAccountsInUserDetails(data, 'Card', 'Clutter CEO');
    await checkAccountsInUserDetails(data, 'Card', 'Iogann Bach');
    const numberOfAccountsDB = await commonPageUSA.getRelatedAccountsFromDB(17);
    expect(numberOfAccountsDB).toEqual(dataQuantity);
  });

  it(`[C14073] Accounts of Corporate Admin with Operating Access on User details`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/14073');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await Actions.waitAndClick(await general.spanByName('Users'));
    await usersPage.openUserDetailsForSelectedUser(Credentials.CorporateAdminOperating.Email);
    await (await USAUsersPageElements.userDetails.allAccountBlocks).waitForDisplayed();
    const numberOfBlocks = await USAUsersPageElements.userDetails.block.length;
    const data = await Promise.all((await USAUsersPageElements.userDetails.block).map(element => element.getText()));
    expect(numberOfBlocks).toBe(1);
    await checkAccountsInUserDetails(data, 'Operating', 'Clu_increased');
  });

  it(`[C14074] Accounts of Cardholder with Card Access on User details`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/14074');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await Actions.waitAndClick(await general.spanByName('Users'));
    await usersPage.openUserDetailsForSelectedUser('sinatra@harakirimail.com');
    await (await USAUsersPageElements.userDetails.allAccountBlocks).waitForDisplayed();
    const numberOfBlocks = await USAUsersPageElements.userDetails.block.length;
    const data = await Promise.all((await USAUsersPageElements.userDetails.block).map(element => element.getText()));
    expect(numberOfBlocks).toBe(1);
    await checkAccountsInUserDetails(data, 'Card', 'Frank Sinatra');
  });

  it(`[C25124] User data on User details is the same as in the table under CSA`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/25124');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await Actions.waitAndClick(await general.spanByName('Users'));
    await usersPage.openUserDetailsForSelectedUser('cusa.capital_ander_amadei@harakirimail.com');
    await (await USAUsersPageElements.userDetails.allAccountBlocks).waitForDisplayed();
    const numberOfBlocks = await USAUsersPageElements.userDetails.block.length;
    const data = await Promise.all((await USAUsersPageElements.userDetails.block).map(element => element.getText()));
    expect(numberOfBlocks).toBe(2);
    await checkAccountsInUserDetails(data, 'Operating', 'Minsk');
    await checkAccountsInUserDetails(data, 'Card', 'Amadei Mozart');
  });
});