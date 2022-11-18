import AllureReporter from '@wdio/allure-reporter';
import { Actions } from '../../../core/utils/actions';
import {UsersPage} from '../../../core/pages/centtripUSA/usersPage';
import {
  general, USAMainPageElements,
  USARolesPageElements,
} from '../../../core/pages/locators';

const usersPage = new UsersPage();

export class RolesPage {
  async removeRolePattern(email: string, role: string): Promise<void> {
    AllureReporter.startStep(`Remove the ${role} role from user with ${email} email`);
      await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Roles'));
      await (await USAMainPageElements.columnHeader('Role Name')).waitForDisplayed();
      await Actions.waitAndClick(await USARolesPageElements.roleByName(role));
      await (await USARolesPageElements.roleDetails.rolesTable).waitForDisplayed();
      await browser.pause(1000);
      await (await USARolesPageElements.roleDetails.searchInRoleDetails).addValue(email);
      await Actions.waitAndClick(await USARolesPageElements.roleDetails.userRoleBlockByEmail(email));
      await Actions.waitAndClick(await USARolesPageElements.roleDetails.removeUserRoleButtonByEmail(email));
      await browser.pause(1000);
      await Actions.waitAndClick(await general.buttonByName('Remove'));
      await (await USAMainPageElements.loaderRightSkeleton).waitForDisplayed();
      await (await USARolesPageElements.roleDetails.rolesTable).waitForDisplayed();
      expect(await USARolesPageElements.roleDetails.checkUserByEmail(email)).not.toBePresent();
      AllureReporter.endStep();
  };
}

