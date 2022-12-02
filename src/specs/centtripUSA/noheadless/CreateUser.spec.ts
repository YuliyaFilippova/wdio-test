import allureReporter from '@wdio/allure-reporter';
import { Credentials } from '../../../testData/Credentials';
import { SignInPage } from '../../../core/pages/centtripAppWeb/signInPage';
import { SignUpPageUSA } from '../../../core/pages/centtripUSA/signUpPage';

import { CreateAccountPage } from '../../../core/pages/centtripAppWeb/createAccountPage';
import { MailMainPage } from '../../../core/pages/externalServices/mailPage';
import { CreateUserPage } from '../../../core/pages/centtripUSA/createUser';
import { userDataInDB } from '../../../core/pages/userDataInDB';
import { addEpic } from '../../../core/helper/allure/reporter';
import { Actions } from '../../../core/utils/actions';
import { Button } from '../../../core/controls/button';
import {
  USACreateUserPageElements, general,
  USAUsersPageElements, createNewAppElements,
  congratulationsWindowElements,
  signInPageElements, USAMainPageElements,
  verificationWindowElements, signUpUSAPageElements
} from '../../../core/pages/locators';
import { Other } from '../../../core/utils/other';
import { roles } from '../../../testData/other';
import { NewBrowserTab } from '../../../core/utils/newBrowserTab';
import { CommonPageUSA } from '../../../core/pages/centtripUSA/commonUSA';
import { UsersPage } from '../../../core/pages/centtripUSA/usersPage';
import { RandomGenerator } from '../../../core/utils/randomGenerator';
import { URLs } from '../../../urls';
import ping from '../../../connections'

const commonPageUSA = new CommonPageUSA();
const signInPage = new SignInPage();
const signUpPage = new SignUpPageUSA();
const createAccountPage = new CreateAccountPage();
const mailMainPage = new MailMainPage();
const createUserPage = new CreateUserPage();
const usersPage = new UsersPage();

describe(`Users > Create a user`, () => {
  const randEmail11380 = RandomGenerator.generateRandEmail('auto@harakirimail.com');
  // const randEmail11412 = RandomGenerator.generateRandEmail('auto@harakirimail.com');
  let phoneNumber;

  before(async () => {
    if (!ping.connectionUSA._connectCalled) {
      await ping.connectionUSA.connect();
    }
    if (!ping.connection._connectCalled) {
      await ping.connection.connect();
    }
  });

  beforeEach(async () => {
    addEpic('Users');
    allureReporter.addFeature('Create a user');
    await browser.url(URLs.USAPortalURL);
  });
  afterEach(async () => {
    await commonPageUSA.checkBrowserLogsForServerErrors();
    await Other.deleteCacheCookiesUSA();
  });

  it(`[C11380/1] Create Centtrip Admin: User DOESN'T exist in AUTHENTICATION DB and IDENTITY DB - Create User and Check DB Part`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/11380');
    phoneNumber = await signUpPage.getAvailablePhoneNumberFromSMSService(1);
    await browser.url(URLs.USAPortalURL);
    await (await signInPageElements.signInWindow).waitForDisplayed();
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await createUserPage.createUserFirstStep(await randEmail11380, 'Jane', 'White', phoneNumber);
    await createUserPage.selectFirstRolePattern(roles.centtripAdmin);
    await Actions.waitAndClick(await USACreateUserPageElements.nextButton);
    await (await USACreateUserPageElements.completeMessage).waitForDisplayed();
    expect(await (await USACreateUserPageElements.completeMessage).isDisplayed());
    await Actions.waitAndClick(await general.linkByName('Users list'));
    await usersPage.compareUserDataFromTableWithExpected(await randEmail11380, 'Jane White', 'Centtrip Administrator', 'unlocked', 'cross-red');
    await createUserPage.checkUserDataInIdentityDB(await randEmail11380);
    await userDataInDB.checkUserDataInAuthenticationDB(await randEmail11380);
  }).timeout(200000);

  it(`[C11380/2] Create Centtrip Admin: User DOESN'T exist in AUTHENTICATION DB and IDENTITY DB - Check Userslist and Sign UP part`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/11380');
    await mailMainPage.verifyEmailByAPI(await randEmail11380);
    await browser.pause(2000);
    await NewBrowserTab.closeFromTabAndSwitchToTab(0, 1);
    await (await signUpUSAPageElements.createPassword.passField).waitForDisplayed();
    await browser.pause(1000);
    await signUpPage.setPasswordForNewUserUsa();
    await browser.pause(1000);
    await signInPage.signInAsRegisteredUserUSA(await randEmail11380, Credentials.CenttripAdmin.Password);
    await Actions.waitAndClick(await verificationWindowElements.verifyByEmailButton);
    const verCode = await mailMainPage.getVerificationCodeByAPI(await randEmail11380);
    await NewBrowserTab.closeFromTabAndSwitchToTab(1, 0);
    await (await verificationWindowElements.verifyCodeField).addValue(verCode);
    await Actions.waitAndClick(await verificationWindowElements.submitButton);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Users'));
  });

  it(`[C11378] Create Corporate Admin with Corporate access: User exists in AUTHENTICATION DB but there are no records in IDENTITY DB`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/11378');
    await browser.url(URLs.baseUrl);
    const randEmail11378 = await createAccountPage.registerTestUser();
    await mailMainPage.verifyEmailByAPI(randEmail11378);
    // await mailMainPage.verifyEmail(randEmail11378);
    await browser.pause(2000);
    await NewBrowserTab.closeFromTabAndSwitchToTab(0, 1);
    await browser.pause(2000);
    await (await congratulationsWindowElements.congratWindow).waitForDisplayed();

    await browser.url(URLs.USAPortalURL);
    await (await signInPageElements.signInWindow).waitForDisplayed();
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);

    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Users'));
    await (await USAUsersPageElements.usersPage).waitForDisplayed();
    await Actions.waitAndClick(await USACreateUserPageElements.createUserButton);
    await Actions.waitAndClick(await USACreateUserPageElements.emailField);
    await (await USACreateUserPageElements.emailField).addValue(randEmail11378);
    await (await USACreateUserPageElements.matchedEmailTip).waitForDisplayed();
    await Actions.waitAndClick(await general.selectOption(randEmail11378));
    const firstNameToCompare = await (await general.inputValue('Enter first name')).getValue();
    const lastNameToCompare = await (await general.inputValue('Enter last name')).getValue();
    const yearToCompare = await (await general.inputValue('Year')).getValue();
    const monthToCompare = await (await USACreateUserPageElements.monthSelectedCreate).getText();
    const dayToCompare = await (await USACreateUserPageElements.daySelectedCreate).getText();
    expect(firstNameToCompare).toEqual('Olga');
    expect(lastNameToCompare).toEqual('Nolga');
    expect(monthToCompare).toEqual('January');
    expect(dayToCompare).toEqual('1');
    expect(yearToCompare).toEqual('1980');
    await Button.clickOnOptionFromDropdown(await USACreateUserPageElements.gender, await general.spanByName('Female'));
    await Button.clickOnOptionFromDropdown(await USACreateUserPageElements.country,
      await general.spanByName('United States of America'));
    await Button.clickOnOptionFromDropdown(await USACreateUserPageElements.state, await general.spanByName('Alabama'));
    await (await USACreateUserPageElements.city).addValue('Los Angeles');
    await (await USACreateUserPageElements.street).addValue('606 N Oxford Ave');
    await (await USACreateUserPageElements.postalCode).addValue('90004');
    await (await USACreateUserPageElements.phoneNumber).addValue('12345678');
    await Actions.waitAndClick(await createNewAppElements.butttonByName('Next'));
    await createUserPage.selectCorpAdminRole('AMC Networks', 'Corporate access');
    await createUserPage.clickOnCreateButton();
    expect((await USACreateUserPageElements.completeMessage).isDisplayed());
    await (await general.linkByName('Users list')).scrollIntoView()
    await Actions.waitAndClick(await general.linkByName('Users list'));
    await browser.pause(1000);
    await usersPage.compareUserDataFromTableWithExpected(randEmail11378, 'Olga Nolga', 'Corporate Administrator', 'unlocked', 'checkmark');
    await createUserPage.checkUserDataInIdentityDB(randEmail11378);
    await commonPageUSA.signOutUSA();
    await Other.deleteCacheCookiesUSA();
    await Other.deleteCacheCookies();
    await browser.url(URLs.USAPortalURL);
    await signInPage.signInAsRegisteredUserUSA(randEmail11378, Credentials.CenttripAdmin.Password);
    await signInPage.verifyEmail(randEmail11378);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Users'));
  }).timeout(200000);
});