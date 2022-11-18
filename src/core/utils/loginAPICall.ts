import AllureReporter from '@wdio/allure-reporter';
import { Actions } from '../../core/utils/actions';
import { Credentials } from '../../testData/Credentials';
import { SignInPage } from '../../core/pages/centtripAppWeb/signInPage';
import { signInPageElements, USAMainPageElements } from '../../core/pages/locators';
import { URLs } from '../../urls';
import { HttpMethods } from '../api/rest';

const signInPage = new SignInPage();

export class LoginAPICall {
  public static async getToken() {
    AllureReporter.addStep('Get token from local storage');
    await browser.url(URLs.USAPortalURL);
    await (await signInPageElements.emailField).waitForDisplayed();
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdmin.Email, Credentials.CenttripAdmin.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Provisioning'));
    return await browser.execute(function () { return this.localStorage.getItem('access_token') });
  };

  public static async getAccessTokenForAPI(email: string, pass: string) {
    let token: string;
    AllureReporter.addStep(`Get authorized Access Token`)
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = {
      client_id: 'Autotest',
      grant_type: 'password',
      username: email,
      password: pass,
      scope: 'openid profile api_public_v1 CentsolMobileApi api_account_v1 api_administration_v1 api_card_v1 api_payment_v1 api_profile_v1 api_reference_v1'
    };
    const dataForToken = await HttpMethods.post('/connect/token', headers, body, URLs.authUrl);
    token = dataForToken.body.access_token;
    return token;
  };

  public static async getTokenWithoutLogin(): Promise<string> {
    let token: string;
    AllureReporter.addStep(`Get token from browser logs`);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Provisioning'));
    return await browser.execute(function () { return this.localStorage.getItem('access_token') });
  };
}