import AllureReporter from "@wdio/allure-reporter";
import { Actions } from '../../utils/actions';
import {
  receiveSMSServicePageElements, signUpUSAPageElements,
  signInPageElements
} from '../../../core/pages/locators';
import { RegistrationInput } from '../../../testData/usersData';
import { URLs } from "../../../urls";

export class SignUpPageUSA {
  async getAvailablePhoneNumberFromSMSService(num: number): Promise<string> {
    let phoneNumberToRegister: string;
    AllureReporter.addStep('Get available phone number from SMS service');
    // await mailMainPage.switchToNewUrl(URLs.recieveSMSUSA);
    await browser.url(URLs.recieveSMSUSA)
    const phoneNumberWithCode = await (await receiveSMSServicePageElements.availablePhoneNumber(num)).getText();
    phoneNumberToRegister = await phoneNumberWithCode.substring(1, 100);
    return phoneNumberToRegister;
  };

  async setPasswordForNewUserUsa(): Promise<void> {
    AllureReporter.addStep('Set password for new registered user USA');
    await browser.pause(3000);
    await (await signUpUSAPageElements.createPassword.passField).waitForDisplayed();
    await (await signUpUSAPageElements.createPassword.passField).addValue(RegistrationInput.defaultUser.passField);
    await (await signUpUSAPageElements.createPassword.confirmPassField).addValue(RegistrationInput.defaultUser.confirmPassField);
    await Actions.waitAndClick(await signUpUSAPageElements.createPassword.submitButton);
    await browser.pause(1000);
    await (await signInPageElements.signInWindow).waitForDisplayed();
  }
};