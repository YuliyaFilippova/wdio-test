import AllureReporter from '@wdio/allure-reporter';
import { URLs } from '../../urls';

export class Other {

  public static async deleteCacheCookies(): Promise<void> {
    try {
      await browser.execute('window.sessionStorage.clear()');
      await browser.execute('window.localStorage.clear()');
      await browser.refresh();
      await browser.deleteCookies();
    } catch (err) { }
  };

  public static async deleteCacheCookiesUSA(): Promise<void> {
    await browser.url(URLs.USAPortalURL);
    await this.deleteCacheCookies();
    await browser.url(URLs.authUrl);
    await this.deleteCacheCookies();
  };

  public static async deleteCacheCookiesUK(): Promise<void> {
    AllureReporter.startStep(`Remove ${URLs.UKPortalURL} from Session storage`);
    await browser.url(URLs.UKPortalURL);
    await this.deleteCacheCookies();
    await browser.url(URLs.authUrl);
    await this.deleteCacheCookies();
    console.log('get cookies after refresh - ', await browser.getCookies());
    AllureReporter.endStep();
  };

  public static parseLocaleNumber(stringNumber: string, locale: string): number {
    const thousandSeparator = Intl.NumberFormat(locale).format(11111).replace(/\p{Number}/gu, '');
    const decimalSeparator = Intl.NumberFormat(locale).format(1.1).replace(/\p{Number}/gu, '');
    return parseFloat(stringNumber
      .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
      .replace(new RegExp('\\' + decimalSeparator), '.')
    );
  }
}
