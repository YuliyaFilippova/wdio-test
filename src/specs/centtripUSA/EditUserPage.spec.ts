import allureReporter from '@wdio/allure-reporter';
import { Credentials } from '../../testData/Credentials';
import { SignInPage } from '../../core/pages/centtripAppWeb/signInPage';
import { addEpic } from '../../core/helper/allure/reporter';
import { Actions } from '../../core/utils/actions';
import {
  USACreateUserPageElements, general,
  USAManageCardsPageElements, USAUsersPageElements
} from '../../core/pages/locators';
import { Other } from '../../core/utils/other';
import { UsersPage } from '../../core/pages/centtripUSA/usersPage';
import { CommonPageUSA } from '../../core/pages/centtripUSA/commonUSA';
import { LoginAPICall } from '../../core/utils/loginAPICall';
import { CreateUserPage } from '../../core/pages/centtripUSA/createUser';
import { Button } from '../../core/controls/button';
import { RandomGenerator } from '../../core/utils/randomGenerator';
import { connection, connectionUSA } from '../../wdio.conf';
import { roles } from '../../testData/other';
import { URLs } from '../../urls';
import { UserDataInDB } from '../../core/pages/userDataInDB';

const signInPage = new SignInPage();
const usersPage = new UsersPage();
const userDataInDB = new UserDataInDB();
const commonPageUSA = new CommonPageUSA();
const createUserPage = new CreateUserPage();

describe(`Users >> Edit User`, () => {
  const randEmailUser = RandomGenerator.generateRandEmail('11auto@harakirimail.com');

  before(async () => {
    if (!connectionUSA._connectCalled) {
      await connectionUSA.connect();
    }
    if (!connection._connectCalled) {
      await connection.connect();
    }
  });
  beforeEach(async () => {
    addEpic('Users');
    allureReporter.addFeature('Edit user');
    await browser.url(URLs.USAPortalURL);
  });
  afterEach(async () => {
    await commonPageUSA.checkBrowserLogsForServerErrors();
    await Other.deleteCacheCookiesUSA();
  });

  it(`[C14064] "Edit user" button is not displayed for Corporate Admin`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/14064');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CorporateAdminGoogle.Email, Credentials.CorporateAdminGoogle.Password);
    await Actions.waitAndClick(await general.spanByName('Users'));
    await (await general.divByName('User Name')).waitForDisplayed();
    expect(await USAUsersPageElements.arrayOfEditButtons).toHaveLength(0);
    await Actions.waitAndClick(await USAUsersPageElements.table.lastUserRow);
    await (await USAUsersPageElements.usersDetailsPopup).waitForDisplayed();
    await browser.pause(3000);
    expect(await (await USAUsersPageElements.userDetails.editUserButton).isExisting()).toBe(false);
  });

  it(`[C13959] Start editing user - Prefilled data`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/13959');
    const token = await LoginAPICall.getToken();
    await createUserPage.createUserFullAPI(await randEmailUser, token, 'CorporateAdmin', 'Eddi', 'Test', '1994-04-08T13:07:03.00',
      'male', '323232322', 'street1', '21001', 'city1', 'AF', null);
    await Actions.waitAndClick(await general.spanByName('Users'));
    await (await general.divByName('User Name')).waitForDisplayed();
    await (await USAUsersPageElements.searchField).addValue(await randEmailUser);
    await Actions.waitAndClick(await USAManageCardsPageElements.table.rowByName(await randEmailUser));
    await browser.pause(7000);
    await (await USAUsersPageElements.usersDetailsPopup).waitForDisplayed();
    await Actions.waitAndClick(await USAUsersPageElements.userDetails.editUserButton);
    await (await USACreateUserPageElements.placeholderByName('Enter email')).waitForDisplayed();
    await (await USACreateUserPageElements.genderSelected).waitForDisplayed();

    const emailToCompare = await (await general.inputValue('Enter email')).getValue();
    const firstNameToCompare = await (await general.inputValue('Enter first name')).getValue();
    const lastNameToCompare = await (await general.inputValue('Enter last name')).getValue();
    const yearToCompare = await (await general.inputValue('Year')).getValue();
    const genderToCompare = await USACreateUserPageElements.genderSelected.getText();
    const countryToCompare = await (await general.inputValue('Select your country')).getValue();
    const monthToCompare = await USACreateUserPageElements.monthSelected.getText();
    const dayToCompare = await USACreateUserPageElements.daySelected.getText();

    const cityToCompare = await (await general.inputValue('City')).getValue();
    const streetToCompare = await (await general.inputValue('Street')).getValue();
    const postalCodeToCompare = await (await general.inputValue('Enter postal code')).getValue();
    const phoneNumberToCompare = await (await general.inputValue('Enter phone number')).getValue();

    expect(emailToCompare).toEqual(await randEmailUser);
    expect(firstNameToCompare).toEqual('Eddi');
    expect(lastNameToCompare).toEqual('Test');
    expect(monthToCompare).toEqual('April');
    expect(dayToCompare).toEqual('8');
    expect(yearToCompare).toEqual('1994');
    expect(genderToCompare).toEqual('Male');
    expect(countryToCompare).toEqual('Afghanistan');
    expect(cityToCompare).toEqual('city1');
    expect(streetToCompare).toEqual('street1');
    expect(postalCodeToCompare).toEqual('21001');
    expect(phoneNumberToCompare).toEqual('+323232322');
  }).timeout(100000);

  it(`[C14068] Create user with all fields are filled and edit all fields`, async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/14068');
    const token = await LoginAPICall.getToken();
    const randEmail = RandomGenerator.generateRandEmail('11auto@harakirimail.com');
    await createUserPage.createUserFullAPI(await randEmail, token, 'CorporateAdmin', 'Eddi', 'Test', '1994-04-08T13:07:03.00',
      'male', '323232322', 'street1', '21001', 'city1', 'AF', null);
    const newRandEmail = RandomGenerator.lowerCaseText(8) + 'auto@harakirimail.com';
    const newRandName = RandomGenerator.lowerCaseText(8);
    const newRandLastName = RandomGenerator.lowerCaseText(8);
    const newRandPhoneNumber = '+' + RandomGenerator.numbers(9);

    await usersPage.openEditUserPageForSelectedUser(await randEmail);
    await usersPage.editUserDataPattern(await general.inputValue('Enter email'), newRandEmail);
    await usersPage.editUserDataPattern(await general.inputValue('Enter first name'), newRandName);
    await usersPage.editUserDataPattern(await general.inputValue('Enter last name'), newRandLastName);
    await createUserPage.fillDateFieldTestPatternCustom('1983', 'August', '17');
    await createUserPage.checkDateFieldPattern('1983', 'August', '17', 'edit');
    await Button.clickOnOptionFromDropdown(await USACreateUserPageElements.gender, await general.spanByName('Female'));
    const genderToCompare = await USACreateUserPageElements.genderSelected.getText();
    expect(genderToCompare).toEqual('Female');
    await Button.clickOnOptionFromDropdown(await USACreateUserPageElements.country, await general.spanByName('Albania'));
    const countryToCompare = await (await general.inputValue('Select your country')).getValue();
    expect(countryToCompare).toEqual('Albania');
    await usersPage.editUserDataPattern(await general.inputValue('City'), 'vitebsk');
    await usersPage.editUserDataPattern(await general.inputValue('Street'), 'street 4722');
    await usersPage.editUserDataPattern(await general.inputValue('Enter postal code'), '33221');
    await usersPage.editUserDataPattern(await general.inputValue('Enter phone number'), newRandPhoneNumber);
    await Actions.waitAndClick(await general.buttonByName('Next'));
    await Actions.waitAndClick(await USACreateUserPageElements.addNewRoleButton);
    await (await USACreateUserPageElements.userRoleSecond).waitForDisplayed();
    await Button.clickOnOptionFromDropdown(await USACreateUserPageElements.userRoleSecond,
      await general.spanByName(roles.centtripAdmin));
    await Actions.clickTwiceIfExpectedElementNotDisplayed(await general.buttonByName('Confirm'),
      await USACreateUserPageElements.completeMessage);
    await (await USACreateUserPageElements.completeMessage).waitForDisplayed();
    await userDataInDB.checkUserDataInIdentityUS(newRandEmail, newRandName, newRandLastName, 'Wed Aug 17 1983', newRandPhoneNumber, 'Female');
    await userDataInDB.checkUserFullDataIndentityUS(newRandEmail, newRandName, newRandLastName, 'Wed Aug 17 1983', newRandPhoneNumber, 'Female',
      'street 4722', 'vitebsk', '33221', 8);
    await userDataInDB.checkUserDataInAspNetUsersDB(newRandEmail, newRandName, newRandLastName, 'Wed Aug 17 1983', newRandPhoneNumber);
  }).timeout(100000);
});
