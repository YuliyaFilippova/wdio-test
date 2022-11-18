import AllureReporter from '@wdio/allure-reporter';

export class RandomGenerator {
  public static numbers(charsAmount:number) {
    let text:string = '';
    const possible:string = '123456789';
    for (let i = 0; i < charsAmount; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  public static text(charsAmount:number) {
    let text:string = '';
    const possible:string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < charsAmount; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  public static upperCaseText(charsAmount:number) {
    let text:string = '';
    const possible:string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < charsAmount; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  public static lowerCaseText(charsAmount:number) {
    let text:string = '';
    const possible:string = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < charsAmount; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  public static textAndNumbers(charsAmount:number) {
    let text:string = '';
    const possible:string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < charsAmount; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  public static uppperTextAndNumbers(charsAmount:number) {
    let text:string = '';
    const possible:string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < charsAmount; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  public static async generateRandEmail(ending: string): Promise<string> {
    const randEmail = this.lowerCaseText(5) + ending;
    AllureReporter.addStep(`Generating a random email address: ${randEmail}`, async () => {
    });
    return randEmail;
  };
}