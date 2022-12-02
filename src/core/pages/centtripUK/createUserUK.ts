import AllureReporter from '@wdio/allure-reporter';
import { Button } from '../../controls/button';
import { Actions } from '../../utils/actions';
import { general, UKCardMigrationPageElements, UKCreateUserPageElements, UKGeneralElements, UKUpdateAccountPageElements } from '../locators';

export class CreateUserPageUK {

  async openCreateUserPageUnderCentripAdmin(): Promise<void> {
    AllureReporter.startStep(`Open "Create user" page`);
    await (await UKGeneralElements.settingsButton).moveTo();
    await Actions.waitAndClick(await general.linkByName('Corporate Menu'));
    await Actions.waitAndClick(await general.linkByName('Create Admin'));
    await (await UKCreateUserPageElements.emailField).waitForDisplayed();
    AllureReporter.endStep();
  };

  async switchToAnotherAccount(email: string): Promise<void> {
    AllureReporter.startStep(`Switch to ${email} SuperAdmin account`);
    await (await UKGeneralElements.searchField).waitForDisplayed();
    await (await UKGeneralElements.searchField).setValue(email);
    await Actions.waitAndClick(await UKGeneralElements.optionDropdown);
    await Actions.waitAndClick(await general.spanByName('Email'));
    await Actions.waitAndClick(await UKGeneralElements.searchButton);
    await (await general.linkByName('These are not your personal details')).waitForDisplayed();
    AllureReporter.endStep();
  };

  async openCreateUserPageUnderSuperAdmin(email: string): Promise<void> {
    AllureReporter.startStep(`Open "Create user" page`);
    await (await UKGeneralElements.settingsButton).moveTo();
    await Actions.waitAndClick(await general.linkByName('Corporate Super Admin Menu'));
    await Actions.waitAndClick(await general.linkByName('Create / Manage Users'));
    await Actions.waitAndClick(await UKCreateUserPageElements.submitButton);
    await Actions.waitAndClick(await UKCreateUserPageElements.addButton);
    await (await UKCreateUserPageElements.emailSAField).waitForDisplayed();
    await (await UKCreateUserPageElements.emailSAField).setValue(email);
    await Actions.waitAndClick(await UKCreateUserPageElements.submitButton);
    await (await UKCreateUserPageElements.superAdmin.firstNameField).waitForDisplayed();
    AllureReporter.endStep();
  };

  async openCardMigrationPage(): Promise<void> {
    AllureReporter.startStep('Open "Card Migration" page');
    await (await UKGeneralElements.settingsButton).moveTo();
    await Actions.waitAndClick(await general.linkByName('Migration'));
    await Actions.waitAndClick(await general.linkByName('Card Migration'));
    await (await UKCardMigrationPageElements.templateButton).waitForDisplayed();
    AllureReporter.endStep();
  };

  async createAdminUK(role: string, email: string, accountName: string, title: string, gender: string, firstName: string, lastName: string, postalCode: string,
    address1: string, address2: string, city: string, country: string, mobileCode: string, homeCode: string,
    phoneNumber: string, homeNumber: string, dob: string): Promise<void> {
    AllureReporter.startStep(`Create ${role} user with ${email}`);
    await (await UKCreateUserPageElements.emailField).setValue(email);
    AllureReporter.addStep(`Email ${email} is entered`);
    await (await UKCreateUserPageElements.createAdminArea).click();
    await (await UKGeneralElements.loadingScreen).waitForDisplayed({ reverse: true });
    await browser.pause(1000);
    await Button.clickOnHiddenOptionFromDropdown(await UKCreateUserPageElements.accountDropdown, await general.spanByNameNum(accountName, 1));
    AllureReporter.addStep(`Account "${accountName}" is selected`);
    await (await UKCreateUserPageElements.titleDropdown).selectByVisibleText(title);
    AllureReporter.addStep(`Title "${title}" is selected`);
    await (await UKCreateUserPageElements.genderDropdown).selectByVisibleText(gender);
    AllureReporter.addStep(`Gender "${gender}" is selected`);
    await (await UKCreateUserPageElements.firstNameField).setValue(firstName);
    AllureReporter.addStep(`First Name "${firstName}" is entered`);
    await (await UKCreateUserPageElements.lastNameField).setValue(lastName);
    AllureReporter.addStep(`Last Name "${lastName}" is entered`);
    await (await UKCreateUserPageElements.dobField).setValue(dob);
    await (await UKCreateUserPageElements.dobFieldExist).click();
    AllureReporter.addStep(`Date of birth "${dob}" is entered`);
    await (await UKCreateUserPageElements.postCodeField).setValue(postalCode);
    AllureReporter.addStep(`Postal Code "${postalCode}" is entered`);
    await (await UKCreateUserPageElements.address1Field).setValue(address1);
    AllureReporter.addStep(`Address Line 1 "${address1}" is entered`);
    await (await UKCreateUserPageElements.address2Field).setValue(address2);
    AllureReporter.addStep(`Address Line 2 "${address2}" is entered`);
    await (await UKCreateUserPageElements.cityField).setValue(city);
    AllureReporter.addStep(`City "${city}" is entered`);
    await Button.clickOnHiddenOptionFromDropdown(await UKCreateUserPageElements.countryDropdown, await general.spanByNameNum(country, 1));
    AllureReporter.addStep(`Country "${country}" is selected`);
    if (mobileCode == '0044 (GB)' && homeCode == '0044 (GB)') {
      await (await UKCreateUserPageElements.mobileCodeDropdown).selectByAttribute('value', 232); //0044 (GB)
      await (await UKCreateUserPageElements.homeCodeDropdown).selectByAttribute('value', 232); //0044 (GB)
    }
    else {
      await (await UKCreateUserPageElements.mobileCodeDropdown).selectByAttribute('value', 233); //001 (US)
      await (await UKCreateUserPageElements.homeCodeDropdown).selectByAttribute('value', 233); //001 (US)
    }
    await (await UKCreateUserPageElements.mobileNumberField).setValue(phoneNumber);
    await (await UKCreateUserPageElements.homeNumberField).setValue(homeNumber);
    AllureReporter.addStep(`Phone Number "${mobileCode}${phoneNumber}" is entered`);
    if (role === 'superAdmin') {
      await Actions.waitAndClick(await UKCreateUserPageElements.isSuperAdminButton);
    } else if (role === 'corporateAdmin') {
      await Actions.waitAndClick(await UKCreateUserPageElements.isAdminButton);
    }
    AllureReporter.addStep(`Role "${role}" is chosen`);
    console.log(`Role "${role}" is chosen`);
    await Actions.waitAndClick(await UKCreateUserPageElements.defaultPrivileges);
    AllureReporter.addStep(`Default Priv-s are set`);
    await (await UKCreateUserPageElements.createButton).scrollIntoView();
    await browser.pause(1000);
    await Actions.waitAndClick(await UKCreateUserPageElements.createButton);
    await (await UKGeneralElements.loadingScreen).waitForDisplayed({ reverse: true });
    await (await UKCreateUserPageElements.successCreateMesssage).waitForDisplayed();
    AllureReporter.endStep();
  };

  async updateUserUK(email: string, accountName: string, title: string, gender: string, firstName: string, lastName: string, postalCode: string,
    address1: string, address2: string, city: string, country: string, mobileCode: string, homeCode: string, phoneNumber: string, homeNumber: string, dob: string,
    newPhone: boolean): Promise<void> {
    AllureReporter.startStep(`Update user with ${email} email `);
    await (await UKCreateUserPageElements.emailField).setValue(email);
    AllureReporter.addStep(`Email ${email} is entered`);
    await (await UKCreateUserPageElements.createAdminArea).click();
    await (await UKGeneralElements.loadingScreen).waitForDisplayed({ reverse: true });
    await browser.pause(1000);
    await Button.clickOnHiddenOptionFromDropdown(await UKCreateUserPageElements.accountDropdown, await general.spanByNameNum(accountName, 1));
    AllureReporter.addStep(`Account "${accountName}" is selected`);
    await (await UKCreateUserPageElements.titleDropdown).selectByVisibleText(title);
    AllureReporter.addStep(`Title "${title}" is selected`);
    await (await UKCreateUserPageElements.genderDropdown).selectByVisibleText(gender);
    AllureReporter.addStep(`Gender "${gender}" is selected`);
    await (await UKCreateUserPageElements.firstNameField).setValue(firstName);
    AllureReporter.addStep(`First Name "${firstName}" is entered`);
    await (await UKCreateUserPageElements.lastNameField).setValue(lastName);
    AllureReporter.addStep(`Last Name "${lastName}" is entered`);
    await (await UKCreateUserPageElements.dobField).setValue(dob);
    await (await UKCreateUserPageElements.dobFieldExist).click();
    AllureReporter.addStep(`Date of birth "${dob}" is entered`);
    await (await UKCreateUserPageElements.postCodeField).setValue(postalCode);
    AllureReporter.addStep(`Postal Code "${postalCode}" is entered`);
    await (await UKCreateUserPageElements.address1Field).setValue(address1);
    AllureReporter.addStep(`Address Line 1 "${address1}" is entered`);
    await (await UKCreateUserPageElements.address2Field).setValue(address2);
    AllureReporter.addStep(`Address Line 2 "${address2}" is entered`);
    await (await UKCreateUserPageElements.cityField).setValue(city);
    AllureReporter.addStep(`City "${city}" is entered`);
    await Button.clickOnHiddenOptionFromDropdown(await UKCreateUserPageElements.countryDropdown, await general.spanByNameNum(country, 1));
    AllureReporter.addStep(`Country "${country}" is selected`);
    if (newPhone === true) {
      if (mobileCode == '0044 (GB)' && homeCode == '0044 (GB)') {
        await (await UKCreateUserPageElements.mobileCodeDropdown).selectByAttribute('value', 232); //0044 (GB)
        await (await UKCreateUserPageElements.homeCodeDropdown).selectByAttribute('value', 232); //0044 (GB)
      }
      else {
        await (await UKCreateUserPageElements.mobileCodeDropdown).selectByAttribute('value', 233); //001 (US)
        await (await UKCreateUserPageElements.homeCodeDropdown).selectByAttribute('value', 233); //001 (US)
      }
      await (await UKCreateUserPageElements.mobileNumberField).setValue(phoneNumber);
      await (await UKCreateUserPageElements.homeNumberField).setValue(homeNumber);
    }
    AllureReporter.addStep(`Phone Number "${mobileCode}${phoneNumber}" is entered`);
    await Actions.waitAndClick(await UKCreateUserPageElements.updateButton);
    await (await UKGeneralElements.loadingScreen).waitForDisplayed({ reverse: true });
    await (await UKCreateUserPageElements.successCreateMesssage).waitForDisplayed();
    AllureReporter.endStep();
  };

  async updateAccountEmail(oldEmail: string, newEmail: string): Promise<void> {
    AllureReporter.startStep(`Update user with ${oldEmail} email and set ${newEmail} email for him`);
    await (await UKGeneralElements.settingsButton).moveTo();
    await Actions.waitAndClick(await general.linkByName('Update Account'));
    await (await UKUpdateAccountPageElements.oldEmailField).waitForDisplayed();
    await (await UKUpdateAccountPageElements.oldEmailField).setValue(oldEmail);
    await Actions.waitAndClick(await UKUpdateAccountPageElements.findButton);
    await (await UKUpdateAccountPageElements.newEmailField).waitForDisplayed();
    await (await UKUpdateAccountPageElements.newEmailField).setValue(newEmail);
    await Actions.waitAndClick(await UKUpdateAccountPageElements.updateButton);
    await browser.pause(1000);
    await browser.acceptAlert();
    await browser.pause(1000);
    console.log('Alert is closed');
    AllureReporter.endStep();
  };

  async updateCardholderUserUK(email: string, phoneNumber: string, dob: string): Promise<void> {
    AllureReporter.startStep(`Update cardholder with ${email} email`);
    await (await UKCreateUserPageElements.firstNameField).waitForDisplayed();
    await (await UKCreateUserPageElements.dobField).setValue(dob);
    await (await UKCreateUserPageElements.mobileNumberField).setValue(phoneNumber);
    await (await UKCreateUserPageElements.modifyButton).scrollIntoView();
    await Actions.waitAndClick(await UKCreateUserPageElements.modifyButton);
    await (await UKCreateUserPageElements.successCreateMesssage).waitForDisplayed();
    await Actions.waitAndClick(await UKCreateUserPageElements.successOkButton);
    AllureReporter.endStep();
  };

  async updatePhoneNumberUK(phoneNumber: string,): Promise<void> {
    AllureReporter.startStep(`Update cardholder phone number`);
    await (await UKCreateUserPageElements.mobileNumberField).waitForDisplayed();
    await (await UKCreateUserPageElements.mobileNumberField).setValue(`+44${phoneNumber}`);
    await Actions.waitAndClick(await UKCreateUserPageElements.modifyButton);
    await (await UKCreateUserPageElements.successCreateMesssage).waitForDisplayed();
    await Actions.waitAndClick(await UKCreateUserPageElements.successOkButton);
    AllureReporter.endStep();
  };

  async createAdminUKUnderSA(firstName: string, lastName: string, postalCode: string, address1: string, address2: string, city: string, country: string,
    phoneNumber: string, homeNumber: string): Promise<void> {
    AllureReporter.startStep(`Create Corporate Admin in UK under Super Admin`);
    await (await UKCreateUserPageElements.superAdmin.firstNameField).setValue(firstName);
    AllureReporter.addStep(`First Name "${firstName}" is entered`);
    await (await UKCreateUserPageElements.superAdmin.lastNameField).setValue(lastName);
    AllureReporter.addStep(`Last Name "${lastName}" is entered`);
    await (await UKCreateUserPageElements.superAdmin.postCodeField).setValue(postalCode);
    AllureReporter.addStep(`Postal Code "${postalCode}" is entered`);
    await (await UKCreateUserPageElements.superAdmin.address1Field).setValue(address1);
    AllureReporter.addStep(`Address Line 1 "${address1}" is entered`);
    await (await UKCreateUserPageElements.superAdmin.address2Field).setValue(address2);
    AllureReporter.addStep(`Address Line 2 "${address2}" is entered`);
    await (await UKCreateUserPageElements.superAdmin.cityField).setValue(city);
    AllureReporter.addStep(`City "${city}" is entered`);
    await Button.clickOnHiddenOptionFromDropdown(await UKCreateUserPageElements.superAdmin.countryDropdown, await general.spanByNameNum(country, 1));
    AllureReporter.addStep(`Country "${country}" is selected`);
    await (await UKCreateUserPageElements.superAdmin.mobileNumberField).setValue(phoneNumber);
    AllureReporter.addStep(`Mobile Number "${phoneNumber}" is entered`);
    await (await UKCreateUserPageElements.superAdmin.homeNumberField).setValue(homeNumber);
    AllureReporter.addStep(`Home Number "${homeNumber}" is entered`);
    await Actions.waitAndClick(await UKCreateUserPageElements.superAdmin.dobField);
    await (await UKCreateUserPageElements.superAdmin.doBSelector.yearOption).waitForDisplayed();
    await Actions.waitAndClick(await UKCreateUserPageElements.superAdmin.doBSelector.selectDay('1'));
    AllureReporter.addStep(`Dob is set `);
    await Actions.waitAndClick(await UKCreateUserPageElements.superAdmin.saveButton);
    AllureReporter.addStep(`Save btn is pressed`);
    await (await UKCreateUserPageElements.addButton).waitForDisplayed();
    AllureReporter.endStep();
  };

  async updateCardholderUKUnderCSA(dob: string, phoneCode: string, phoneNumber: string): Promise<void> {
    AllureReporter.startStep(`Update Cardholder UK under Super Admin`);
    await Button.clickOnHiddenOptionFromDropdown(await UKCreateUserPageElements.superAdmin.chPhoneTitleField,
      await UKCreateUserPageElements.superAdmin.chPhoneTitleItem(phoneCode));
    await (await UKCreateUserPageElements.superAdmin.chPhoneNumberField).setValue(phoneNumber);
    await (await UKCreateUserPageElements.superAdmin.chDOBfield).setValue(dob);
    await (await UKCreateUserPageElements.superAdmin.updateChSubmit).scrollIntoView();
    await Actions.waitAndClick(await UKCreateUserPageElements.superAdmin.updateChSubmit);
    await (await UKCreateUserPageElements.superAdmin.confirmationModal).waitForDisplayed();
    await Actions.waitAndClick(await UKCreateUserPageElements.superAdmin.confirmationModalOK);
    await (await UKCreateUserPageElements.superAdmin.successUpdateMesssage).waitForDisplayed();
    await Actions.waitAndClick(await UKCreateUserPageElements.superAdmin.successUpdateMesssageOk);
    AllureReporter.endStep();
  };
};

export const createUserPageUK = new CreateUserPageUK();
