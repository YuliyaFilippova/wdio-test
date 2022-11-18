import {Actions} from '../../utils/actions';
import {general,UKGeneralElements, USAMainPageElements, } from '../locators';
import {Other} from '../../utils/other';
import AllureReporter from '@wdio/allure-reporter';

export class CommonPageUK {

  async logoutFromUK(): Promise<void> {
    AllureReporter.startStep(`Log out from Centtrip UK`);
    await (await UKGeneralElements.userMenu).moveTo(); 
    await Actions.waitAndClick(await general.linkByName('Log out'));
    await (await USAMainPageElements.logoutPage).waitForDisplayed(); 
    await Other.deleteCacheCookies();
    AllureReporter.endStep();
  };

//   async passFirstTimeLoginProccess(email: string, cardHolderID: string, phoneNumber: string): Promise<void> {
//     await allureStep(`Pass First Time Login proccess for ${email} user`, async () => {
//       await browser.get(config.params.firstTimeLoginURL);
//       await Waiters.waitUntilElementIsDisplayed(UKPortalFirstTimeLoginPageElements.cardholderId);
//       await Actions.sendKeys(UKPortalFirstTimeLoginPageElements.emailField, email);
//       await Actions.sendKeys(UKPortalFirstTimeLoginPageElements.cardholderId, cardHolderID);
//       await Actions.sendKeys(UKPortalFirstTimeLoginPageElements.mobileNumber, phoneNumber);
//       await Actions.waitAndClick(UKPortalFirstTimeLoginPageElements.confirmButton);
//       await Waiters.waitUntilElementIsDisplayed(UKPortalFirstTimeLoginPageElements.successMessage);
//     });
//   };

//   async verifyUserAndSetPassword(verifyCode: string): Promise<void> {
//     await allureStep(`Verify account and set password for new registered user`, async () => {
//       await Waiters.waitUntilElementIsDisplayed(UKPortalFirstTimeLoginPageElements.verificationField);
//       await Actions.sendKeys(UKPortalFirstTimeLoginPageElements.verificationField, verifyCode);
//       await Actions.waitAndClick(UKPortalFirstTimeLoginPageElements.confirmButton);
//       await this.setPasswordForNewUser();
//     });
//   };

//   async setPasswordForNewUser(): Promise<void> {
//     await allureStep(`Set password for new registered user`, async () => {
//       await Waiters.waitUntilElementIsDisplayed(UKPortalSignUpPageElements.passwordField);
//       await Actions.sendKeys(UKPortalSignUpPageElements.passwordField, RegistrationInput.defaultUser.passField);
//       await Actions.sendKeys(UKPortalSignUpPageElements.confirmPassField, RegistrationInput.defaultUser.passField);
//       await Actions.waitAndClick(UKPortalSignUpPageElements.confirmButton);
//       await Waiters.waitUntilElementIsDisplayed(signInPageElements.signInWindow);
//     });
//   };


}

export const commonPageUK = new CommonPageUK();