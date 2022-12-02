import AllureReporter from '@wdio/allure-reporter';

export class NewBrowserTab {
  
  public static async closeFromTabAndSwitchToTab(fromTab: number, toTab: number) {
    AllureReporter.startStep('Close current tab and switch to first tab');
    const hendles = await browser.getWindowHandles();
    await browser.switchToWindow(hendles[fromTab]);
    AllureReporter.addStep(`Close ${fromTab} tab`);
    await browser.closeWindow();
    await browser.switchToWindow(hendles[toTab]);
    AllureReporter.addStep(`Leave on ${toTab} tab`);
    AllureReporter.endStep();
  };

}