import AllureReporter from '@wdio/allure-reporter';

export class Button {

  public static returnByText(buttonText: string) {
    return $(`button=${buttonText}`);
  };

  public static async clickOnOptionFromDropdown(dropdownMenu: WebdriverIO.Element, dropdownOption: WebdriverIO.Element) {
    AllureReporter.startStep(`Select option from dropdown list`);
    await dropdownMenu.waitForDisplayed();
    await dropdownMenu.click();
    await dropdownOption.waitForDisplayed();
    await dropdownOption.click();
    AllureReporter.endStep();
  };

  public static async clickOnOptionsFromDropdown(dropdownMenu:WebdriverIO.Element, ...dropdownOption: WebdriverIO.Element[]) {
    AllureReporter.startStep(`Select options from dropdown list`);
    await dropdownMenu.click();
    for (let i = 0; i < dropdownOption.length; i += 1) {
      await dropdownOption[i].waitForDisplayed();
      await dropdownOption[i].click();
    }
    AllureReporter.endStep();
  };

  public static async clickOnHiddenOptionFromDropdown(dropdownMenu: WebdriverIO.Element, dropdownOption: WebdriverIO.Element) {
    AllureReporter.startStep(`Open and select option`);
    await dropdownMenu.waitForClickable();
    await dropdownMenu.click();
    await dropdownOption.scrollIntoView();
    await dropdownOption.click();
    AllureReporter.endStep();
  };
}