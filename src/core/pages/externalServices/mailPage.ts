import AllureReporter from '@wdio/allure-reporter';
import { mainMailPageElements } from '../locators';
import { Actions } from '../../utils/actions';
import { HttpMethods } from '../../../core/api/rest';
import { other } from '../../../testData/other';
import { URLs } from '../../../urls';

export class MailMainPage {
  async switchToNewUrl(expectedUrl: string): Promise<void> {
    AllureReporter.addStep(`Open ${expectedUrl} page and cheking URL`);
      await browser.url(expectedUrl);
      expect(await browser.getUrl()).toContain(expectedUrl);
  };

  async checkNumberOfEmails(arraysLocator, expectedNumber: number): Promise<void> {
    AllureReporter.addStep('Open mail service for cheking sign up emails')
    await browser.refresh();
    const emailsCount = await arraysLocator.length;
    expect(emailsCount).toBe(expectedNumber);
  };

  async getNumberOfEmailsForCurrentDate(email: string, defaultUrl: string): Promise<number> {
    let emailsCount: number;
    AllureReporter.addStep('Open mail service for cheking number of emails for current date');
    await browser.url(URLs.mainMail);
    await (await mainMailPageElements.emailField).addValue(email);
    await Actions.waitAndClick(await mainMailPageElements.checkButton);
    await (await mainMailPageElements.numberOfEmails).waitForDisplayed();
    await browser.refresh();
    emailsCount = (await mainMailPageElements.emailsOnCurrentDate(other.mailDate)).length;
    await browser.url(defaultUrl);
    return emailsCount;
  };

  async verifyEmailByAPI(email: string) {
    AllureReporter.startStep('User Verification process by API');
    const endPoint = (email).slice(0, -17);
    console.log('Email after cutting ', endPoint);
    const getRequest = await HttpMethods.get(`/inbox/${endPoint}`, {}, 'https://harakirimail.com');
    expect(getRequest.status).toBe(200);
    AllureReporter.addStep(`Mailbox is available https://harakirimail.com/inbox/${endPoint}`);
    const responce = getRequest.body;
    const text = '/email/';
    const indexOfText = responce.indexOf(text) + text.length;
    const emailId = responce.substring(indexOfText, indexOfText + 24);
    await browser.url(`https://harakirimail.com/email/${emailId}`);
    AllureReporter.addStep(`Varification email is opened https://harakirimail.com//email/${emailId}`);
    await (await mainMailPageElements.verifyButton).scrollIntoView(); 
    await (await mainMailPageElements.verifyButton).waitForClickable();
    await (await mainMailPageElements.verifyButton).click();
    AllureReporter.endStep();
  };

  async getVerificationCodeByAPI(email: string): Promise<string> {
    AllureReporter.addStep('Obtaining a verification code for log in in account with email');
    const endPoint = (email).slice(0, -17);
    const getRequest = await HttpMethods.get(`/inbox/${endPoint}`, {}, 'https://harakirimail.com');
    expect(getRequest.status).toBe(200);
    const responce = getRequest.body;
    const text = '/email/';
    const indexOfText = responce.indexOf(text) + text.length;
    const emailId = responce.substring(indexOfText, indexOfText + 24);
    // await NewBrowserTab.openNewURLInNewTab(`https://harakirimail.com/email/${emailId}`);
    await browser.newWindow(`https://harakirimail.com/email/${emailId}`);
    const verificationCode = await mainMailPageElements.verificationCode.getText();
    return verificationCode;
  };
};

export const mailMainPage = new MailMainPage();