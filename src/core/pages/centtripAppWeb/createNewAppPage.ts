import AllureReporter from '@wdio/allure-reporter';
import { allureStep } from '../../../core/helper/allure/allureSteps';
import { applicationServiceMainPageElements, createNewAppElements, general, startKYCElements } from '../../../core/pages/locators';
import { Actions } from '../../utils/actions';
import { Button } from '../../controls/button';
import { RandomGenerator } from '../../utils/randomGenerator';
import { MailMainPage } from '../externalServices/mailPage';
import { AppServicePage } from '../../../core/pages/centtripAppWeb/appServicePage';
import { SignInPage } from '../../../core/pages/centtripAppWeb/signInPage';
import moment = require('moment');
import { URLs } from '../../../urls';

const mailMainPage = new MailMainPage();
const appServicePage = new AppServicePage();
const signInPage = new SignInPage();

export class CreateNewAppPage {
  async contAppFirstStepUSA(countryOfIncorp: string, prefix: string, companyType: string, buildingNumber: string, addressStreet: string,
    addressCity: string, addressPostCode: string, taxNumber: string, tradingName: string, randEmail: string): Promise<string> {
    const randName = prefix + moment().format("DD.MM.YY.HH:mm:ss");

    AllureReporter.startStep('Creating a new application - First step USA');
    await Actions.waitAndClick(await applicationServiceMainPageElements.functionality.newAppButton);
    try { await Actions.waitAndClick(await applicationServiceMainPageElements.functionality.selectRegionButton('USA')); } catch {
      await Actions.waitAndClick(await applicationServiceMainPageElements.functionality.newAppButton);
      await Actions.waitAndClick(await applicationServiceMainPageElements.functionality.selectRegionButton('USA'));
    }
    await Actions.waitAndClick(await applicationServiceMainPageElements.selectRegion.continueButton);
    await (await createNewAppElements.firstStep.newAppIframe).waitForDisplayed();
    // await Iframe.switchToIframe(createNewAppElements.firstStep.newAppIframe);
    await browser.switchToFrame(await createNewAppElements.firstStep.newAppIframe)
    await (await createNewAppElements.firstStep.newAppHeaderUSA).waitForDisplayed();
    await (await createNewAppElements.firstStep.countryOfIncorp).addValue(countryOfIncorp);
    await Button.clickOnOptionFromDropdown(await createNewAppElements.firstStep.countryOfIncorp, await createNewAppElements.firstStep.firstCountry);
    await (await createNewAppElements.firstStep.stateOfIncorp).addValue('New York');
    await Button.clickOnOptionFromDropdown(await createNewAppElements.firstStep.stateOfIncorp, await createNewAppElements.thirdStep.selectNationality);
    await (await createNewAppElements.firstStep.tradingName).addValue(tradingName);
    await Actions.waitAndClick(await createNewAppElements.firstStep.companyName);
    await (await createNewAppElements.firstStep.companyName).addValue('t');
    await Actions.waitAndClick(await createNewAppElements.firstStep.enterManually);
    await (await createNewAppElements.firstStep.manualCompanyName).addValue(randName);
    await (await createNewAppElements.firstStep.manualCompanyNumber).addValue(RandomGenerator.numbers(15));
    await Button.clickOnOptionFromDropdown(await createNewAppElements.firstStep.companyType, await createNewAppElements.selectFromDropdown(companyType));
    await (await createNewAppElements.firstStep.addressCountryUSA).addValue('USA');
    await Button.clickOnOptionFromDropdown(await createNewAppElements.firstStep.addressCountryUSA, await general.divByName('United'));
    await Actions.waitAndClick(await createNewAppElements.firstStep.addressSearchUSA);
    await (await createNewAppElements.firstStep.addressSearchUSA).addValue('t');
    await Actions.waitAndClick(await createNewAppElements.firstStep.enterManuallyAddress);
    await (await createNewAppElements.firstStep.buildingNumber).addValue(buildingNumber);
    await (await createNewAppElements.firstStep.addressStreet).addValue(addressStreet);
    await (await createNewAppElements.firstStep.addressCity).addValue(addressCity);
    await (await createNewAppElements.firstStep.addressState).addValue('New York');
    await Button.clickOnOptionFromDropdown(await createNewAppElements.firstStep.addressState, await general.divByNameNum('New', 2));
    await (await createNewAppElements.firstStep.addressPostCode).addValue(addressPostCode);
    await (await createNewAppElements.firstStep.taxNumber).addValue(taxNumber);
    await (await createNewAppElements.firstStep.dateOfIncorporation.day).addValue('31');
    await (await createNewAppElements.firstStep.dateOfIncorporation.month).addValue('12');
    await (await createNewAppElements.firstStep.dateOfIncorporation.year).addValue('2000');
    await (await createNewAppElements.firstStep.csaFirstName).addValue('FirstCSA');
    await (await createNewAppElements.firstStep.csaLastName).addValue('User');

    await (await createNewAppElements.firstStep.dateOfBirth.day).addValue('11');
    await (await createNewAppElements.firstStep.dateOfBirth.month).addValue('11');
    await (await createNewAppElements.firstStep.dateOfBirth.year).addValue('1980');

    await (await createNewAppElements.firstStep.csaPhoneNumber).addValue('2064563059');
    await Button.clickOnOptionFromDropdown(await createNewAppElements.firstStep.csaPhoneCountryCode, await createNewAppElements.selectFromDropdown('US +1'));
    await (await createNewAppElements.firstStep.csaEmail).addValue(randEmail);

    await Actions.uploadFile(`/src/testData/files/Cat.pdf`, await createNewAppElements.firstStep.loaderPath);
    await browser.pause(1000);
    await Actions.waitAndClick(await createNewAppElements.firstStep.continueButton);
    AllureReporter.endStep();
    return randName;
  };

  async createAppSecondStepUSA(accountName: string, accountNumber: string, accountType: string, bankName: string, routingNumber: string): Promise<void> {
    AllureReporter.startStep('Creating a new application - Second step USA');
    await (await createNewAppElements.secondStep.secondStepHeaderUSA).waitForDisplayed();
    await (await createNewAppElements.secondStep.accountName).addValue(accountName);
    await (await createNewAppElements.secondStep.accountNumber).addValue(accountNumber);
    await Button.clickOnOptionFromDropdown(await createNewAppElements.secondStep.accountType,
      await createNewAppElements.selectFromDropdown(accountType));
    await (await createNewAppElements.secondStep.bankName).addValue(bankName);
    await (await createNewAppElements.secondStep.routingNumber).addValue(routingNumber);

    await Actions.uploadFile(`/src/testData/files/Cat.pdf`, await createNewAppElements.secondStep.loaderPath);
    await Button.clickOnOptionFromDropdown(await createNewAppElements.secondStep.purposeOfPayment,
      await createNewAppElements.selectFromDropdown('Payment for Goods Purchased'));
    await (await createNewAppElements.secondStep.purposeOfPaymentDesc).addValue('We pay our suppliers each month');
    await browser.pause(1000);
    await Actions.waitAndClick(await createNewAppElements.firstStep.continueButton);
    AllureReporter.endStep();
  };

  async createAppThirdStepUSA(name: string, surname: string, addressCountry: string, addressCityPerson: string, buildingNumberPerson: string, addressStreet: string,
    addressPostCode: string, dob: string, mob: string, yob: string, nationality: string): Promise<void> {
    AllureReporter.startStep('Creating a new application - Third step USA');
    await (await createNewAppElements.thirdStep.thirdStepHeaderUSA).waitForDisplayed();
    await Actions.waitAndClick(await createNewAppElements.thirdStep.addAssociate);
    await (await createNewAppElements.thirdStep.associateDetails).waitForDisplayed();
    await (await createNewAppElements.thirdStep.firstName).addValue(name);
    await (await createNewAppElements.thirdStep.surName).addValue(surname);
    await Actions.waitAndClick(await createNewAppElements.thirdStep.authPerson);
    await Actions.waitAndClick(await createNewAppElements.thirdStep.benefOwner);
    await Actions.waitAndClick(await createNewAppElements.thirdStep.director);
    await (await createNewAppElements.thirdStep.addressCountry).addValue(addressCountry);
    await browser.pause(1000);
    await (await createNewAppElements.thirdStep.addressCountry).keys('Enter');
    await Actions.waitAndClick(await createNewAppElements.thirdStep.addressSearchUSA);
    await (await createNewAppElements.thirdStep.addressSearchUSA).addValue('t');
    await Actions.waitAndClick(await createNewAppElements.firstStep.enterManuallyAddress);
    await (await createNewAppElements.addInfoUSA.buildingNumberPerson).addValue(buildingNumberPerson);
    await (await createNewAppElements.thirdStep.addressStreet).addValue(addressStreet);
    await (await createNewAppElements.addInfoUSA.addressCityPerson).addValue(addressCityPerson);
    if (addressCountry === 'USA') {
      await (await createNewAppElements.firstStep.addressState).addValue('New York');
      await Button.clickOnOptionFromDropdown(await createNewAppElements.firstStep.addressState,
        await createNewAppElements.thirdStep.selectNationality);
    };
    await (await createNewAppElements.thirdStep.addressPostCode).addValue(addressPostCode);
    await (await createNewAppElements.thirdStep.dob).addValue(dob);
    await (await createNewAppElements.thirdStep.mob).addValue(mob);
    await (await createNewAppElements.thirdStep.yob).addValue(yob);
    await (await createNewAppElements.thirdStep.nationality).addValue(nationality);
    await Button.clickOnOptionFromDropdown(await createNewAppElements.thirdStep.nationality, await general.divByName('United'));
    await (await createNewAppElements.thirdStep.percentageShareholding).addValue('75');
    await Actions.waitAndClick(await createNewAppElements.butttonByName('Save associate'));
    await browser.pause(1000);
    await Actions.waitAndClick(await createNewAppElements.firstStep.continueButton);
    AllureReporter.endStep();
  };

  async createAppAddStepUSA(jobTitle: string, socSecNumber: string, email: string, phoneNumber: string, phoneType: string, phoneCode: string,
    numberOfBlocks: number, marketCode: string, stockSymbol: string): Promise<void> {
    AllureReporter.startStep('Creating a new application- Additional Step USA');
    await (await createNewAppElements.additonalStep.addStepHeader).waitForDisplayed();
    if (numberOfBlocks === 2) {
      await Actions.waitAndClick(await createNewAppElements.additonalStep.selectAddDetailsButton(1));
      await (await createNewAppElements.addInfoUSA.addStepHeaderCustom('US Listed Public Company Additional Information')).waitForDisplayed();
      await (await createNewAppElements.addInfoUSA.jobTitle).addValue(marketCode);
      await (await createNewAppElements.addInfoUSA.socSecNumber).addValue(stockSymbol);
      await Actions.waitAndClick(await createNewAppElements.firstStep.continueButton);
      await Actions.waitAndClick(await createNewAppElements.additonalStep.finishButton);
      await Actions.waitAndClick(await createNewAppElements.additonalStep.finishButton);

      await Actions.waitAndClick(await createNewAppElements.additonalStep.selectAddDetailsButton(1));
      await (await createNewAppElements.addInfoUSA.addStepHeader).waitForDisplayed();
      await (await createNewAppElements.addInfoUSA.jobTitle).addValue(jobTitle);
      await (await createNewAppElements.addInfoUSA.socSecNumber).addValue(socSecNumber);
      await (await createNewAppElements.addInfoUSA.email).addValue(email);
      await (await createNewAppElements.addInfoUSA.phoneNumber).addValue(phoneNumber);
      await Button.clickOnOptionFromDropdown(await createNewAppElements.addInfoUSA.phoneType,
        await createNewAppElements.selectFromDropdown(phoneType));
      await Button.clickOnOptionFromDropdown(await createNewAppElements.addInfoUSA.phoneCode,
        await createNewAppElements.selectFromDropdown(phoneCode));
      await Actions.waitAndClick(await createNewAppElements.firstStep.continueButton);
      await browser.pause(3000);
      await Actions.waitAndClick(await createNewAppElements.additonalStep.finishButton);
      await browser.pause(5000);
    } else {
      await Actions.waitAndClick(await createNewAppElements.additonalStep.addDetailsButton);
      await (await createNewAppElements.addInfoUSA.addStepHeader).waitForDisplayed();
      await (await createNewAppElements.addInfoUSA.jobTitle).addValue(jobTitle);
      await (await createNewAppElements.addInfoUSA.socSecNumber).addValue(socSecNumber);
      await (await createNewAppElements.addInfoUSA.email).addValue(email);
      await (await createNewAppElements.addInfoUSA.phoneNumber).addValue(phoneNumber);
      await Button.clickOnOptionFromDropdown(await createNewAppElements.addInfoUSA.phoneType,
        await createNewAppElements.selectFromDropdown(phoneType));
      try {
        await Actions.waitAndClick(await createNewAppElements.firstStep.continueButton);
      } catch {
        // await JsScripts.scrollDown();
        await Button.clickOnOptionFromDropdown(await createNewAppElements.addInfoUSA.phoneCode, await createNewAppElements.selectFromDropdown(phoneCode));
        await Actions.waitAndClick(await createNewAppElements.firstStep.continueButton);
      }
      await browser.pause(3000);
      await Actions.waitAndClick(await createNewAppElements.additonalStep.finishButton);
      await browser.pause(5000);
    }
    AllureReporter.endStep();
  };

  async confirmUSAApp(email: string, password: string): Promise<void> {
    await allureStep('Confirm information in USA app', async () => {
      await mailMainPage.switchToNewUrl(URLs.baseUrl);
      await appServicePage.signOut();
      await signInPage.signInAsRegisteredUser(email, password,
        createNewAppElements.additonalStep.termsCheckbox);
      await Actions.waitAndClick(await createNewAppElements.additonalStep.termsCheckbox);
      await Actions.waitAndClick(await createNewAppElements.additonalStep.termsCheckboxMonex);
      await Actions.waitAndClick(await createNewAppElements.additonalStep.submitButton);
      await (await applicationServiceMainPageElements.general.appSection).waitForDisplayed();
      expect(applicationServiceMainPageElements.general.appSection.isDisplayed());
    });
  };

  async waitAndClickOnStartKYCButton(): Promise<void> {
    AllureReporter.startStep('Wait and click on the startKYC button');
    try { await Actions.waitAndClick(await applicationServiceMainPageElements.listOfAppsUSA.startKYCButton); } catch {
      try {
        await browser.pause(60000);
        await Actions.waitAndClick(await applicationServiceMainPageElements.functionality.searchButton);
        await Actions.waitAndClick(await applicationServiceMainPageElements.listOfAppsUSA.startKYCButton);
      } catch {
        throw new Error(`StartKYCButton isn't displayed`);
      }
    }
    await (await startKYCElements.modal).waitForDisplayed();
    await (await startKYCElements.corporateInformation.legalName).waitForDisplayed();
    await Actions.waitAndClick(await startKYCElements.startButton);
    await (await startKYCElements.modal).waitForDisplayed({ reverse: true });
    AllureReporter.endStep();
  };
}
