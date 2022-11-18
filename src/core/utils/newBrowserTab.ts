import AllureReporter from '@wdio/allure-reporter';

export class NewBrowserTab {
  public static async closeCurrentTabAndSwitchToFirstTab(fromTab: number, toTab: number) {
    AllureReporter.addStep('Close current tab and switch to first tab');
    const hendles = await browser.getWindowHandles();
    await browser.switchToWindow(hendles[fromTab]);
    await browser.closeWindow();
    await browser.switchToWindow(hendles[toTab]);
  };
}