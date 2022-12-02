import {Actions} from '../../utils/actions';
import {general,signInPageElements,UKGeneralElements, UKSignUpPageElements, USAMainPageElements, } from '../locators';
import {Other} from '../../utils/other';
import AllureReporter from '@wdio/allure-reporter';
import { Password } from '../../../testData/usersData';

export class CommonPageUK {

  async logoutFromUK(): Promise<void> {
    AllureReporter.startStep(`Log out from Centtrip UK`);
    await (await UKGeneralElements.userMenu).moveTo(); 
    await Actions.waitAndClick(await general.linkByName('Log out'));
    await (await USAMainPageElements.logoutPage).waitForDisplayed(); 
    await Other.deleteCacheCookies();
    AllureReporter.endStep();
  };

//   async verifyUserAndSetPassword(verifyCode: string): Promise<void> {
//     await allureStep(`Verify account and set password for new registered user`, async () => {
//       await Waiters.waitUntilElementIsDisplayed(UKPortalFirstTimeLoginPageElements.verificationField);
//       await Actions.sendKeys(UKPortalFirstTimeLoginPageElements.verificationField, verifyCode);
//       await Actions.waitAndClick(UKPortalFirstTimeLoginPageElements.confirmButton);
//       await this.setPasswordForNewUser();
//     });
//   };

  async setPasswordForNewUser(): Promise<void> {
    AllureReporter.startStep(`Set password for new registered user`);
    await (await UKSignUpPageElements.passwordField).waitForDisplayed();
    await (await UKSignUpPageElements.passwordField).setValue(Password);
    AllureReporter.addStep(`Set password!`);
    await (await UKSignUpPageElements.confirmPassField).setValue(Password);
    AllureReporter.addStep(`Confirm password!`);
    await (await UKSignUpPageElements.confirmButton).click();
    AllureReporter.addStep(`New passowrd is set`);
    await (await signInPageElements.signInWindow).waitForDisplayed();
    AllureReporter.endStep();
  };

}

export const commonPageUK = new CommonPageUK();