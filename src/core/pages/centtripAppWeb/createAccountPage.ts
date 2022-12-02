import AllureReporter from "@wdio/allure-reporter";
import { Actions } from '../../../core/utils/actions';
import { RandomGenerator } from '../../../core/utils/randomGenerator';
import { createAccountPageElements, signInPageElements, confirmAccountPageElements } from '../../../core/pages/locators';
import { Button } from '../../controls/button'
import { RegistrationInput } from '../../../testData/usersData';

export class CreateAccountPage {

  async registerTestUser(): Promise<string> {
    const randEmail = await RandomGenerator.generateRandEmail('auto@harakirimail.com');
    AllureReporter.addStep('Register test user');
    await Actions.waitAndClick(await signInPageElements.registerButton);
    await (await createAccountPageElements.createAccountWindow).waitForDisplayed();
    await (await createAccountPageElements.firstNameField).addValue(RegistrationInput.defaultUser.firstName);
    await (await createAccountPageElements.lastNameField).addValue(RegistrationInput.defaultUser.lastName);
    await (await createAccountPageElements.dobField).addValue(RegistrationInput.defaultUser.dobField);
    await Button.clickOnOptionFromDropdown(await createAccountPageElements.mobField,
      await createAccountPageElements.selectMonth);
    await (await createAccountPageElements.yobField).addValue(RegistrationInput.defaultUser.yobField);
    await (await createAccountPageElements.emailField).addValue(randEmail);
    await (await createAccountPageElements.backButton).scrollIntoView();
    await (await createAccountPageElements.passField).addValue(RegistrationInput.defaultUser.passField);
    await (await createAccountPageElements.confirmPassField).addValue(RegistrationInput.defaultUser.confirmPassField);
    await Actions.waitAndClick(await createAccountPageElements.submitButton);
    const confirmEmail = await confirmAccountPageElements.emailConfirm.getText();
    await (await confirmAccountPageElements.confirmAccountWindow).waitForDisplayed();
    expect(randEmail).toEqual(confirmEmail);
    return randEmail;
  };

  async registerCustomApplicationUser(firstName:string, lastName:string, dob:string, yearOfBirth:string):Promise<string> {
    AllureReporter.startStep('Register Custom Application user - ${email}');
    const randEmail = await RandomGenerator.generateRandEmail('_apuser3@harakirimail.com');
    await Actions.waitAndClick(await signInPageElements.registerButton);
    await (await createAccountPageElements.createAccountWindow).waitForDisplayed();
    await (await createAccountPageElements.firstNameField).setValue(firstName);
    await (await createAccountPageElements.lastNameField).setValue(lastName);
    await (await createAccountPageElements.dobField).setValue(dob);
    await Button.clickOnOptionFromDropdown(await createAccountPageElements.mobField, await createAccountPageElements.selectMonth);
    await (await createAccountPageElements.yobField).setValue(yearOfBirth);
    await (await createAccountPageElements.emailField).setValue(randEmail);
    await (await createAccountPageElements.backButton).scrollIntoView();
    await (await createAccountPageElements.passField).setValue(RegistrationInput.defaultUser.passField);
    await (await createAccountPageElements.confirmPassField).setValue(RegistrationInput.defaultUser.passField);
    await Actions.waitAndClick(await createAccountPageElements.submitButton);
    const confirmEmail = await confirmAccountPageElements.emailConfirm.getText();
    await (await confirmAccountPageElements.confirmAccountWindow).waitForDisplayed();
    expect(randEmail).toEqual(confirmEmail);
    AllureReporter.endStep();
    return randEmail;
  };
}; 

export const createAccountPage = new CreateAccountPage();