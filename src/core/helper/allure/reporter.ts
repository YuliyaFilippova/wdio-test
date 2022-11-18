import AllureReporter from "@wdio/allure-reporter";

declare let allure: any;

export function addTestComment(description: string) {
  allure.addArgument('comment', description);
}
export function addSeverity(severity: string) {
  allure.addLabel('severity', severity);
}
export function addTestId(value: string) {
  allure.addLabel('testId', value);
}
export function addEpic(epic: string) {
  AllureReporter.addLabel('epic', epic);
}
export function addFeature(feature: string) {
  allure.addLabel('feature', feature);
}
export function addStory(story: string) {
  allure.addLabel('story', story);
}

export async function takeScreenShot(screenshotName = 'Screenshot', done = undefined): Promise<any> {
  return (browser as any).takeScreenshot()
    .then((png) => allure.createAttachment(screenshotName,
      () => Buffer.from(png, 'base64'),
      'image/png')())
    .then(() => {
      if (done) {
        done();
      }
    });
}
