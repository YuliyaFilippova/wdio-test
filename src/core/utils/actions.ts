import AllureReporter from "@wdio/allure-reporter";

const path = require('path');

export class Actions {

  public static async waitAndClick(element: WebdriverIO.Element) {
    AllureReporter.startStep(`Click on the element`);
    await element.waitForClickable();
    await element.click();
    AllureReporter.endStep();
  };

  public static async clickTwiceIfExpectedElementNotDisplayed(elm:WebdriverIO.Element, expectedElm:WebdriverIO.Element) {
    AllureReporter.startStep(`Click on the ${elm} until ${expectedElm} is not displayed`);
    await Actions.waitAndClick(elm);
    try {
      await expectedElm.waitForDisplayed();
    } catch {
      await Actions.waitAndClick(elm);
      await expectedElm.waitForDisplayed();
    }
    AllureReporter.endStep();
  };

  public static async uploadFile(pathToFile:string, uploadArea:WebdriverIO.Element): Promise<void> {
    AllureReporter.addStep(`Upload file to element`);
      const fileToUpload = pathToFile;
      const absolutePath = path.resolve(process.cwd() + fileToUpload);
      await (await uploadArea).setValue(absolutePath);
  };

  public static async uploadFileForHiddenInput(pathToFile: string, hiddenInput:WebdriverIO.Element): Promise<void> {
    AllureReporter.addStep(`Upload file to the hidden element`);
      const fileToUpload = pathToFile;
      const absolutePath = path.resolve(process.cwd() + fileToUpload);
      await browser.execute(() => {
        document.getElementById('file').removeAttribute('hidden');
      })
      await hiddenInput.waitForClickable();
      await hiddenInput.setValue(absolutePath);
  };
}
