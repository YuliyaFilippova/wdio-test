import { Credentials } from '../../testData/Credentials';
import { SignInPage } from '../../core/pages/centtripAppWeb/signInPage';
import allureReporter from '@wdio/allure-reporter';
import { addEpic } from '../../core/helper/allure/reporter';
import { Actions } from '../../core/utils/actions';
import {LoginAPICall} from '../../core/utils/loginAPICall';
import {
  USACreateUserPageElements, general, USAMainPageElements,
  USARolesPageElements, USAUsersPageElements,
  USAManageCardsPageElements
} from '../../core/pages/locators';
import { Other } from '../../core/utils/other';
import { HttpMethods } from '../../core/api/rest';
import { UsersPage } from '../../core/pages/centtripUSA/usersPage';
import { CommonPageUSA } from '../../core/pages/centtripUSA/commonUSA';
import { RolesPage } from '../../core/pages/centtripUSA/rolesPage';
import { roles, testUsers, requestHeadersToken, rolesId, requestBody } from '../../testData/other';
import { apiEndpoints } from '../../testData/apiEndpoints';
import { Salesforce } from '../../core/pages/externalServices/salesforce';
import { Button } from '../../core/controls/button';
import { URLs } from '../../urls';

const signInPage = new SignInPage();
const commonPageUSA = new CommonPageUSA();
const usersPage = new UsersPage();
const rolesPage = new RolesPage();

describe(`Roles > Remove role`, () => {
  beforeEach(async () => {
    await browser.url(URLs.USAPortalURL);
  });
  afterEach(async () => {
    await commonPageUSA.checkBrowserLogsForServerErrors();
    await Other.deleteCacheCookiesUSA();
  });

  it(`[C22092] Remove last role - Centtrip Admin @smoke`, async () => {
    allureReporter.addSeverity('normal');
    addEpic('Roles');
    allureReporter.addFeature('Remove role');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22092');
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    const token = await LoginAPICall.getTokenWithoutLogin();
    await usersPage.updateUserRoleAPI(token, '5b5c7f90-bb49-4f55-8a3a-f1d6d621ca6d', 'centtripAdmin');
    await rolesPage.removeRolePattern(testUsers.removeRoleCenttripAdmin, 'Centtrip Administrator');
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Users'));
    await (await general.divByName('User Name')).waitForDisplayed();
    await (await (USAUsersPageElements.searchField)).addValue(testUsers.removeRoleCenttripAdmin);
    await (await USAManageCardsPageElements.table.rowByName(testUsers.removeRoleCenttripAdmin)).waitForDisplayed({reverse: true});
    await (await general.divByName('No results found')).waitForDisplayed();
  });

  it(`[C22093] Remove last role - Corporate Admin with Corporate Access @smoke`, async () => {
    allureReporter.addSeverity('normal');
    addEpic('Roles');
    allureReporter.addFeature('Remove role');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22093');
    await Salesforce.checkUserRoleInSalesforce(testUsers.removeRoleCorpAdminCorpAccess, true, false);
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await rolesPage.removeRolePattern(testUsers.removeRoleCorpAdminCorpAccess, 'Corporate Administrator');
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Users'));
    await (await general.divByName('User Name')).waitForDisplayed();
    await (await USAUsersPageElements.searchField).addValue(testUsers.removeRoleCenttripAdmin);
    await (await USAManageCardsPageElements.table.rowByName(testUsers.removeRoleCenttripAdmin)).waitForDisplayed({reverse: true});
    // await rolesPage.checkUserWithoutRolesPattern(testUsers.removeRoleCorpAdminCorpAccess);
  });

  it('[C22188] Remove last role - Corporate Admin: Salesforce @smoke', async () => {
    allureReporter.addSeverity('normal');
    addEpic('Roles');
    allureReporter.addFeature('Remove role');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22188');
    await Salesforce.checkUserRoleInSalesforce(testUsers.removeRoleCorpAdminCorpAccess, false, false);
    const token = await LoginAPICall.getToken();
    await usersPage.updateUserRoleAPI(token, 'fb1f476e-1e3d-4b6c-bace-ce644efc2a08', 'corporateAdmin', '512d192c-65e5-458e-be91-21e8cbe5a14a');
  })

  it(`[C22302] For CardHolder add Corporate Admin role, remove CardHolder role: Salesforce @smoke`, async () => {
    allureReporter.addSeverity('normal');
    addEpic('Roles');
    allureReporter.addFeature('Remove role');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22302');
    await Salesforce.checkUserRoleInSalesforce(testUsers.removeRoleMixSecond, false, true);
    const token = await LoginAPICall.getToken();
    await usersPage.updateUserRoleAPI(token, '38c81191-d45f-4dbd-854b-4177c833b974', 'corporateAdmin', '512d192c-65e5-458e-be91-21e8cbe5a14a');
    await rolesPage.removeRolePattern(testUsers.removeRoleMixSecond, 'Cardholder');
    await Salesforce.checkUserRoleInSalesforce(testUsers.removeRoleMixSecond, true, false);
    const removeUserRoleRequest = await HttpMethods.put(apiEndpoints.removeUserRole, requestHeadersToken(token),
      requestBody.removeUserRole(rolesId.corpAdmin, '38c81191-d45f-4dbd-854b-4177c833b974'), URLs.USAPortalURL);
    expect(removeUserRoleRequest.status).toBe(200);
    await usersPage.updateUserRoleAPI(token, '38c81191-d45f-4dbd-854b-4177c833b974', 'cardHolder', '089ac1b4-fbbc-4b63-8798-5a52909b229a');
  });

  it(`[C23037] Remove Corporate Admin role, add Corporate Admin role`, async () => {
    allureReporter.addSeverity('normal');
    addEpic('Users');
    allureReporter.addFeature('Edit user');
    allureReporter.addStory('Remove role');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/23037');
    await Salesforce.checkUserRoleInSalesforce(testUsers.removeRoleMixEdit, true, false);
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await Actions.waitAndClick(await general.spanByName('Users'));
    await usersPage.openUserDetailsForSelectedUser(testUsers.removeRoleMixEdit);
    await Actions.waitAndClick(await USAUsersPageElements.userDetails.editUserButton);
    await Actions.clickTwiceIfExpectedElementNotDisplayed(await general.buttonByName('Next'),
      await USACreateUserPageElements.addNewRoleButton);
    await browser.pause(3000);
    await Actions.clickTwiceIfExpectedElementNotDisplayed(await USACreateUserPageElements.removeRoleButton,
      await general.spanByName('Are you sure to remove'));
    await (await general.spanByName('Are you sure to remove')).waitForDisplayed();
    await Actions.waitAndClick(await general.buttonByName('Remove'));
    await (await general.spanByName('Remove')).waitForDisplayed();
    await (await USACreateUserPageElements.removeRoleButton).waitForDisplayed({reverse: true});
    await Actions.waitAndClick(await USACreateUserPageElements.addNewRoleButton);
    await Actions.waitAndClick(await USACreateUserPageElements.customRoles);
    await (USACreateUserPageElements.userRoleFirst).waitForDisplayed();
    await Button.clickOnOptionFromDropdown(await USACreateUserPageElements.userRoleFirst,
      await general.spanByName(roles.corpAdmin));
    await Actions.waitAndClick(await USACreateUserPageElements.selectResourse.selectResourseButton);
    await (USACreateUserPageElements.selectResourse.selectCorporateField).waitForDisplayed();
    await Button.clickOnOptionFromDropdown(await USACreateUserPageElements.selectResourse.selectCorporateField,
      await general.selectOption('Clutter'));
    await Button.clickOnOptionFromDropdown(await USACreateUserPageElements.selectResourse.selectAccessField,
      await general.selectOption('Operation access'));
    await Actions.waitAndClick(await USARolesPageElements.addUser.selectAccount);
    await Actions.waitAndClick(await general.selectOption('Clu_standard'));
    await browser.keys('Escape');
    await browser.pause(1000);
    await Actions.waitAndClick(await USACreateUserPageElements.selectResourse.selectButton);
    await browser.pause(1000);
    await Actions.clickTwiceIfExpectedElementNotDisplayed(await general.buttonByName('Confirm'),
      await USACreateUserPageElements.completeMessage);
    await (USACreateUserPageElements.completeMessage);
    await Actions.waitAndClick(await USACreateUserPageElements.finishButton);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Users'));
    await browser.pause(1000);
    await usersPage.openUserDetailsForSelectedUser(testUsers.removeRoleMixEdit);
    await (await (general.divByName('Clu_standard'))).waitForDisplayed();
    await Actions.waitAndClick(await USAUsersPageElements.userDetails.closeButton);
    const actualRole = await USAUsersPageElements.table.rolesOfLastUser.getText();
    expect(actualRole).toBe(roles.corpAdmin);
  }).timeout(300000);

  it('[C25138] Remove last role - Corporate Super Admin', async () => {
    allureReporter.addSeverity('normal');
    addEpic('Roles');
    allureReporter.addFeature('Remove role');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/25138');
    await Salesforce.checkUserRoleInSalesforce(testUsers.clutterCSA, true, false);
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdminNew.Email, Credentials.CenttripAdminNew.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Roles'));
    await (await USAMainPageElements.columnHeader('Role Name')).waitForDisplayed();
    await Actions.waitAndClick(await USARolesPageElements.roleByName('Corporate Super Administrator'));
    await (await USARolesPageElements.roleDetails.searchInRoleDetails).waitForDisplayed();
    await (await USARolesPageElements.roleDetails.searchInRoleDetails).setValue(testUsers.clutterCSA);
    await browser.waitUntil(async () => (await USARolesPageElements.roleDetails.numberOfRemoveButtons).length === (1 || 2));
    await Actions.waitAndClick(await USARolesPageElements.roleDetails.removeUser);
    await Actions.waitAndClick(await general.buttonByName('Remove'));
    await (await general.buttonByName('Remove')).waitForDisplayed({reverse: true});
    await (await USARolesPageElements.roleDetails.firstUser).waitForDisplayed();
    await browser.pause(1000);
    await Actions.waitAndClick(await general.spanByName('Users'));
    await (await general.divByName('User Name')).waitForDisplayed();
    await (await USAUsersPageElements.searchField).setValue(testUsers.clutterCSA);
    await (await general.divByName('No results found')).waitForDisplayed();
  });

  it('[C25139] Remove last role - Corporate Super Admin: Salesforce', async () => {
    allureReporter.addSeverity('normal');
    addEpic('Roles');
    allureReporter.addFeature('Remove role');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/25139');
    await Salesforce.checkUserRoleInSalesforce(testUsers.clutterCSA, false, false, false);
    const token = await LoginAPICall.getToken();
    const requestBody = JSON.stringify(
      {
        policyCode: 'b4e306fd-713f-4e2b-b0db-e6c919047736',
        principals: ['5f122bc0-965c-4b2c-89a3-6a08a9e63712'],
        resources: [{ value: '50c82db2-7818-418a-8574-cac20cac9345', type: 'Entity' }]
      }
    );
    const assignUserRole = await HttpMethods.put('api/administration/v1/users/assignUserRole', requestHeadersToken(token), requestBody, URLs.USAPortalURL);
    expect(assignUserRole.status).toBe(204);
  });
});