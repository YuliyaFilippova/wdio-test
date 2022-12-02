import { Actions } from '../../utils/actions';
import {
  general, signInPageElements,
  UKGeneralElements,
  verificationWindowElements
} from '../locators';
import AllureReporter from '@wdio/allure-reporter';
import { MailMainPage } from '../../../core/pages/externalServices/mailPage';
import { NewBrowserTab } from '../../../core/utils/newBrowserTab';
import { URLs } from '../../../urls';
import { Other } from '../../utils/other';

const mailMainPage = new MailMainPage();

export class SignInPage {
  async signInAsRegisteredUser(email: string, password: string, waitingElement: any = 0): Promise<void> {
    AllureReporter.startStep(`Sign in as registered user with ${email}`);
    await (await signInPageElements.emailField).addValue(email);
    await (await signInPageElements.passwordField).addValue(password);
    await Actions.waitAndClick(await signInPageElements.termsCheckbox);
    await Actions.waitAndClick(await signInPageElements.signInButton);
    if (waitingElement !== 0) {
      await (await waitingElement).waitForDisplayed();
    }
    AllureReporter.endStep();
  };

  async signInAsRegisteredUserUSA(email: string, password: string, waitingElement: any = 0): Promise<void> {
    AllureReporter.startStep(`Sign in as registered user with ${email}`);
    await signInPageElements.emailField.waitForClickable();
    await signInPageElements.emailField.addValue(email);
    await browser.pause(1000);
    await signInPageElements.passwordField.addValue(password);
    await Actions.waitAndClick(await signInPageElements.signInButton);
    if (waitingElement !== 0) {
      await waitingElement.waitForDisplayed();
    }
    await general.spanByName('Select Account').waitForDisplayed({ reverse: true });
    AllureReporter.endStep();
  };

  async verifyEmail(email: string): Promise<void> {
    AllureReporter.startStep(`Sign in via ${email} mail confirmation`);
    await Actions.waitAndClick(await verificationWindowElements.verifyByEmailButton);
    const verCode = await mailMainPage.getVerificationCodeByAPI(email);
    await NewBrowserTab.closeFromTabAndSwitchToTab(1, 0);
    await (await verificationWindowElements.verifyCodeField).addValue(verCode);
    await Actions.waitAndClick(await verificationWindowElements.submitButton);
    AllureReporter.endStep();
  };

  async signInAsRegisteredUserUK(email: string, password: string): Promise<void> {
    AllureReporter.startStep(`Sign in as registered user with ${email}`);
    (await signInPageElements.emailField).waitForClickable();
    (await signInPageElements.emailField).setValue(email);
    (await signInPageElements.passwordField).setValue(password);
    await Actions.waitAndClick(await signInPageElements.signInButton);

    try { (await UKGeneralElements.UKcontent).waitForDisplayed(); }
    catch {
      (await UKGeneralElements.alreadyLoginError).waitForDisplayed();
      await browser.url(URLs.ExpensesURL);
      (await UKGeneralElements.expenseLogoutBtn).waitForClickable();
      (await UKGeneralElements.expenseLogoutBtn).click();
      await Other.deleteCacheCookies();
      await browser.url(URLs.UKPortalURL);
      (await signInPageElements.signInWindow).waitForDisplayed();
      await this.signInAsRegisteredUserUK(email, password);
    };
    AllureReporter.endStep();
  };

  async signInAsActivatedUser(email: string, password: string): Promise<void> {
    AllureReporter.startStep(`Sign in as activated user with ${email} mail`);
    await (await signInPageElements.emailField).waitForClickable();
    await (await signInPageElements.emailField).setValue(email);
    await (await signInPageElements.passwordField).setValue(password);
    await Actions.waitAndClick(await signInPageElements.signInButton);
    try {
      await (await UKGeneralElements.multiFactorAuth).waitForDisplayed();
      console.log('MFA page');
    }
    catch {
      console.log('MFA page is not found');
      await (await UKGeneralElements.multiFactorAuth).waitForDisplayed();
    }
    AllureReporter.endStep();
  };
};

export const signInPage = new SignInPage();
