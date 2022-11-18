import AllureReporter from "@wdio/allure-reporter";
import { URLs } from "../../../urls";
import { Actions } from '../../utils/actions';
import { general, USAManageCardsPageElements, USAUsersPageElements } from '../locators';
import { requestBody } from '../../../testData/other';
import { HttpMethods } from '../../api/rest';
import { apiEndpoints } from '../../../testData/apiEndpoints';

export class UsersPage {

  async editUserDataPattern(inputElm: WebdriverIO.Element, sendValue: string): Promise<void> {
    AllureReporter.addStep(`Edit User: send ${sendValue} to ${inputElm} field`);
    await (inputElm).setValue(sendValue);
    const emailToCompare = await inputElm.getValue();
    expect(emailToCompare).toEqual(sendValue);
  };

  async compareUserDataFromTableWithExpected(email: string, expName: string, expRoles: string, expAccess: string, expValidation: string): Promise<void> {
    AllureReporter.addStep('Check that user data on the users page are matched with data that was added during creation user')
    await (await general.divByName('User Name')).waitForDisplayed();
    await browser.pause(8000);
    await (await USAUsersPageElements.searchField).setValue(email);
    await browser.pause(8000);
    await (await general.divByName('User Name')).waitForDisplayed();
    const userNameTable = await USAUsersPageElements.table.nameOfLastUser.getText();
    const userEmailTable = await USAUsersPageElements.table.emailOfLastUser.getText();
    const userRoleTable = await USAUsersPageElements.table.rolesOfLastUser.getText();
    const userAccessTable = await (await USAUsersPageElements.table.siteAccessOfLastUser).getAttribute('data-mat-icon-name');
    const userValidationTable = await (await USAUsersPageElements.table.validationOfLastUser).getAttribute('data-mat-icon-name');
    expect(userNameTable).toEqual(expName);
    expect(userEmailTable).toEqual(email);
    expect(userRoleTable).toEqual(expRoles);
    expect(userAccessTable).toEqual(expAccess);
    expect(userValidationTable).toEqual(expValidation);
  };

  async openUserDetailsForSelectedUser(email: string): Promise<void> {
    AllureReporter.addStep(`Open user details for ${email} user`);
    (await general.divByName('User Name')).waitForDisplayed();
    (await USAUsersPageElements.searchField).addValue(email);
    await Actions.waitAndClick(await USAManageCardsPageElements.table.rowByName(email));
    (await USAUsersPageElements.usersDetailsPopup).waitForDisplayed();
  };

  async openEditUserPageForSelectedUser(email: string): Promise<void> {
    AllureReporter.addStep(`Open the "Edit User" page for the user with ${email} email`);
    await Actions.waitAndClick(await general.spanByName('Users'));
    await (await general.divByName('User Name')).waitForDisplayed();
    await (await USAUsersPageElements.searchField).addValue(email);
    await Actions.waitAndClick(await USAManageCardsPageElements.table.rowByName(email));
    await (await USAUsersPageElements.usersDetailsPopup).waitForDisplayed();
    await Actions.waitAndClick(await USAUsersPageElements.userDetails.editUserButton);
    await (await general.buttonByName('Next')).waitForDisplayed();
    await browser.pause(2000);
  };

  async updateUserRoleAPI(token: string, userId: string, role:string, resourceId?: string): Promise<void> {
    const requestHeadersToken = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    if (role === 'corporateAdmin') {
      const assignRoleRequest = await HttpMethods.put(apiEndpoints.assignRole, requestHeadersToken,
        requestBody.assignRoleCorporateAdminSelectedCorporate(userId, resourceId), URLs.USAPortalURL);
      expect(assignRoleRequest.status).toBe(204);
    } else if (role === 'centtripAdmin') {
      const assignRoleRequest = await HttpMethods.put(apiEndpoints.assignRole, requestHeadersToken,
        requestBody.assignRoleCenttripAdmin(userId), URLs.USAPortalURL);
      expect(assignRoleRequest.status).toBe(204);
    } else if (role === 'cardHolder') {
      const assignRoleRequest = await HttpMethods.put(apiEndpoints.assignRole, requestHeadersToken,
        requestBody.assignRoleCardholder(userId, resourceId), URLs.USAPortalURL);
      expect(assignRoleRequest.status).toBe(204);
    }
  };
}