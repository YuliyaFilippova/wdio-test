import { HttpMethods } from '../../api/rest';
import { apiEndpoints } from '../../../testData/apiEndpoints';
import { Actions } from '../../../core/utils/actions';
import { Button } from '../../../core/controls/button';
import { requestBody } from '../../../testData/other';
import { DBQueries } from '../../../testData/DBQueries';
import {
  USACreateUserPageElements, general,
  createNewAppElements, USARolesPageElements
} from '../../../core/pages/locators';
import { connection, connectionUSA } from '../../../wdio.conf';
import { roles } from '../../../testData/other';
import { URLs } from '../../../urls';
import AllureReporter from '@wdio/allure-reporter';

export class CreateUserPage {

  async fillDateFieldTestPattern(): Promise<void> {
    AllureReporter.startStep('Set date in date picker');
    await Button.clickOnOptionFromDropdown(await USACreateUserPageElements.monthField, await general.selectOption('April'));
    await (await general.dropDown).waitForDisplayed({ reverse: true });
    await Button.clickOnOptionFromDropdown(await USACreateUserPageElements.dayField, await general.selectOption('12'));
    await (await general.dropDown).waitForDisplayed({ reverse: true });
    await (await USACreateUserPageElements.yearField).addValue('1994');
    AllureReporter.endStep();
  };

  async fillDateFieldTestPatternCustom(year: string, month: string, day: string): Promise<void> {
    AllureReporter.startStep('Set date in date picker');
    await Button.clickOnOptionFromDropdown(await USACreateUserPageElements.monthField, await general.selectOption(month));
    await Button.clickOnOptionFromDropdown(await USACreateUserPageElements.dayField, await general.selectOption(day));
    await (await USACreateUserPageElements.yearField).setValue(year);
    AllureReporter.endStep();
  };

  async checkDateFieldPattern(expYear: string, expMonth: string, expDay: string, page: string): Promise<void> {
    AllureReporter.startStep('Check date in date picker');
    const yearToCompare = await (await general.inputValue('Year')).getValue();
    expect(yearToCompare).toEqual(expYear);
    if (page === 'Edit') {
      const monthToCompare = await USACreateUserPageElements.monthSelected.getText();
      const dayToCompare = await USACreateUserPageElements.daySelected.getText();
      expect(monthToCompare).toEqual(expMonth);
      expect(dayToCompare).toEqual(expDay);
    } else if (page === 'Create') {
      const monthToCompareCreate = await USACreateUserPageElements.monthSelectedCreate.getText();
      const dayToCompareCreate = await USACreateUserPageElements.daySelectedCreate.getText();
      expect(monthToCompareCreate).toEqual(expMonth);
      expect(dayToCompareCreate).toEqual(expDay);
    }
    AllureReporter.endStep();
  };

  async selectFirstRolePattern(role: string): Promise<void> {
    AllureReporter.startStep(`Select ${role} as first user role`);
    await Actions.waitAndClick(await USACreateUserPageElements.removeRoleButton);
    await browser.pause(1000);
    await Actions.waitAndClick(await USACreateUserPageElements.addNewRoleButton);
    if (role === 'Centtrip Administrator') {
      await Actions.waitAndClick(await USACreateUserPageElements.centripRoles);
    } else {
      await Actions.waitAndClick(await USACreateUserPageElements.customRoles);
    }
    try {
      await Actions.waitAndClick(await USACreateUserPageElements.userRoleFirst);
      await (await general.spanByName(role)).waitForDisplayed();
    } catch {
      try {
        await Actions.waitAndClick(await USACreateUserPageElements.userRoleFirst);
        await (await general.spanByName(role)).waitForDisplayed();
      } catch {
        await Actions.waitAndClick(await USACreateUserPageElements.userRoleFirst);
      }
    }
    await Actions.waitAndClick(await general.spanByName(role));
    AllureReporter.endStep();
  };

  async selectCorpAdminRole(corporate: string, access: string, account?: string): Promise<void> {
    AllureReporter.startStep(`Add ${access} to ${corporate} corporate`);
    try {
      await (await USACreateUserPageElements.userRoleFirst).waitForDisplayed();
      await Actions.waitAndClick(await USACreateUserPageElements.customRoles);
    } catch {
      await Actions.waitAndClick(await USACreateUserPageElements.addNewRoleButton);
      await (await USACreateUserPageElements.userRoleFirst).waitForDisplayed();
      await Actions.waitAndClick(await USACreateUserPageElements.customRoles);
    }
    await (await USACreateUserPageElements.userRoleFirst).waitForDisplayed();
    await Actions.waitAndClick(await USACreateUserPageElements.customRoles);
    await Button.clickOnOptionFromDropdown(await USACreateUserPageElements.userRoleFirst,
      await general.spanByName(roles.corpAdmin));
    await Actions.waitAndClick(await USACreateUserPageElements.selectResourse.selectResourseButton);
    await (await USACreateUserPageElements.selectResourse.selectCorporateField);
    await Button.clickOnOptionFromDropdown(await USACreateUserPageElements.selectResourse.selectCorporateField,
      await general.selectOption(corporate));
    await Button.clickOnOptionFromDropdown(await USACreateUserPageElements.selectResourse.selectAccessField,
      await general.selectOption(access));
    if (access === 'Operation access') {
      await Button.clickOnOptionFromDropdown(await USARolesPageElements.addUser.selectAccount,
        await general.selectOption(account));
    }
    await Actions.waitAndClick(await USACreateUserPageElements.selectResourse.selectButton);
  };

  async createUserFirstStep(randEmail: string, firstName: string, lastName: string, phoneNumber: string): Promise<void> {
    AllureReporter.startStep('Filling the fields at the first step of user creation');
    await Actions.waitAndClick(await general.spanByName('Users'));
    await Actions.waitAndClick(await general.linkByName('Create user'));
    await Actions.waitAndClick(await USACreateUserPageElements.emailField);
    await (await USACreateUserPageElements.emailField).addValue(randEmail)
    await (await USACreateUserPageElements.firstName).addValue(firstName);
    await (await USACreateUserPageElements.lastName).addValue(lastName);
    await this.fillDateFieldTestPattern();
    await Button.clickOnOptionFromDropdown(await USACreateUserPageElements.gender, await general.spanByName('Female'));
    await Button.clickOnOptionFromDropdown(await USACreateUserPageElements.country, await general.spanByName('United States of America'));
    await Button.clickOnOptionFromDropdown(await USACreateUserPageElements.state, await general.spanByName('Alabama'));
    await (await USACreateUserPageElements.city).addValue('Los Angeles');
    await (await USACreateUserPageElements.street).addValue('606 N Oxford Ave');
    await (await USACreateUserPageElements.postalCode).addValue('90004');
    await (await USACreateUserPageElements.phoneNumber).addValue(phoneNumber);
    await Actions.waitAndClick(await createNewAppElements.butttonByName('Next'));
    await browser.pause(1000);
    AllureReporter.endStep();
  };

  async clickOnCreateButton(): Promise<void> {
    AllureReporter.startStep('Click on the "Create" button');
    await (await USACreateUserPageElements.selectResourse.selectButton).waitForDisplayed({ reverse: true });
    await Actions.waitAndClick(await USACreateUserPageElements.nextButton);
    await (await USACreateUserPageElements.completeMessage).waitForDisplayed();
  };

  async createUserFullAPI(email: string, token: string, role: string, firstNm: string, lastNm: string, dob: string, gender: string, phoneNumber: string, street: string,
    postalCode: string, city: string, country: string, state: string): Promise<void> {
    AllureReporter.startStep('Filling the fields at the first step of user creation');
    const requestHeadersToken = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    const createUserRequest = await HttpMethods.post(apiEndpoints.createUser, requestHeadersToken,
      requestBody.createUserIF(email, firstNm, lastNm, dob, gender, phoneNumber, street, postalCode, city, country, state), URLs.USAPortalURL);
    expect(createUserRequest.status).toBe(200);
    const userId = createUserRequest.body.value[0].value.id;
    if (role === 'CorporateAdmin') {
      const assignRoleRequest = await HttpMethods.put(apiEndpoints.assignRole, requestHeadersToken,
        requestBody.assignRoleCorporateAdmin(userId), URLs.USAPortalURL);
      expect(assignRoleRequest.status).toBe(204);
      console.log(assignRoleRequest.status);
    } else {
      const assignRoleRequest = await HttpMethods.put(apiEndpoints.assignRole, requestHeadersToken,
        requestBody.assignRoleCenttripAdmin(userId), URLs.USAPortalURL);
      expect(assignRoleRequest.status).toBe(204);
      console.log(assignRoleRequest.status);
    }
    AllureReporter.endStep();
  };

  async editUserFullAPI(email: string, token: string, firstNm: string, lastNm: string, dob: string, gender: string, phoneNumber: string,
    postalCode: string, country: string, state: any, city: string, street: string, identityId: string): Promise<void> {
    AllureReporter.startStep('Filling the fields at the first step of udpating user');
    const requestHeadersToken = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    console.log(`EditUser.requestBody - ${requestBody.editUserFull(email, firstNm, lastNm, dob, gender, phoneNumber, postalCode, country, state, city, street, 
      identityId)}`);
    const editUserRequest = await HttpMethods.put(apiEndpoints.editUser, requestHeadersToken,
      requestBody.editUserFull(email, firstNm, lastNm, dob, gender, phoneNumber, postalCode, country, state, city, street, identityId), URLs.USAPortalURL);
    console.log(JSON.stringify(editUserRequest.body));
    expect(editUserRequest.status).toBe(200);
    AllureReporter.endStep();
  };

  async createUserRequiredFieldsAPI(email: string, token: string, role: string, firstNm: string, lastNm: string, dob: string, phoneNumber: string): Promise<void> {
    AllureReporter.startStep(`Create ${role} user with required fields thouhgt the API`);
    const requestHeadersToken = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    console.log(`CreateUser.requestBody - ${requestBody.createUserIF(email, firstNm, lastNm, dob, null, phoneNumber, null, null, null, null, null)}`);
    const createUserRequest = await HttpMethods.post(apiEndpoints.createUser, requestHeadersToken,
      requestBody.createUserIF(email, firstNm, lastNm, dob, null, phoneNumber, null, null, null, null, null), URLs.USAPortalURL);
    expect(createUserRequest.status).toBe(200);
    const userId = createUserRequest.body.value[0].value.id;
    console.log(`user Id: ${userId}`);
    if (role === 'CorporateAdmin') {
      const assignRoleRequest = await HttpMethods.put(apiEndpoints.assignRole, requestHeadersToken,
        requestBody.assignRoleCorporateAdmin(userId), URLs.USAPortalURL);
      expect(assignRoleRequest.status).toBe(204);
      console.log(assignRoleRequest.status);
    } else {
      const assignRoleRequest = await HttpMethods.put(apiEndpoints.assignRole, requestHeadersToken,
        requestBody.assignRoleCenttripAdmin(userId), URLs.USAPortalURL);
      expect(assignRoleRequest.status).toBe(204);
      console.log(assignRoleRequest.status);
    }
    AllureReporter.endStep();
  };

  async checkUserDataInIdentityDB(email: string): Promise<number> {
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getUserDataFromIdentityDBQuery(email), function (err, rows) {
        if (err) {
          reject(err);
        } else {
          expect(rows.length).not.toEqual(0);
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            const emailIdentity = row.Email;
            const recordsQuantity = rows.length;
            expect(emailIdentity).toEqual(email);
            resolve(recordsQuantity);
          });
        }
      });
    });
  };
};

export const createUserPage = new CreateUserPage();
