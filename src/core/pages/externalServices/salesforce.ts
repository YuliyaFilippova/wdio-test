import { HttpMethods } from '../../api/rest';
import { apiEndpoints } from '../../../testData/apiEndpoints';
import { requestBody, requestHeadersSalesforce } from '../../../testData/other';
import AllureReporter from '@wdio/allure-reporter';

export class Salesforce {

  public static async getToken() {
    let token: string;
    let url: string;
    AllureReporter.startStep(`Get token for Salesforce`);
    const authenticateRequest = await HttpMethods.post(apiEndpoints.salesforceApi.authenticate, requestHeadersSalesforce,
      requestBody.salesforceAuthenticate(), 'https://test.salesforce.com');
    expect(authenticateRequest.status).toBe(200);
    token = authenticateRequest.body.access_token;
    url = authenticateRequest.body.instance_url;
    AllureReporter.endStep();
    return [token, url];
  };

  public static async getAccountsbyCenttripPlatformId(centtripPlatformId: string) {
    let data: JSON;
    AllureReporter.startStep(`Get salesforce account data by CenttripPlatformId`);
    const authData = await this.getToken();
    const requestHeadersSalesforceWIthAuth = {
      Authorization: `Bearer ${authData[0]}`,
      Cookie: 'CookieConsentPolicy=0:0; BrowserId=VQb-xP5cEeu63r_jm6pcwQ'
    };
    const getRequest = await HttpMethods.get(apiEndpoints.salesforceApi.getAccountsByCenttripPlatformId(centtripPlatformId),
      requestHeadersSalesforceWIthAuth, authData[1]);
    expect(getRequest.status).toBe(200);
    if (getRequest.body.totalSize !== 0) { } else {
      throw new Error(`The record you requested does not exist in Salesforce`);
    }
    data = getRequest.body.records;
    AllureReporter.endStep();
    return data;
  };

  public static async getContactsByEmail(email: string) {
    let data: JSON;
    AllureReporter.startStep(`Get salesforce contact data by email`);
    const authData = await this.getToken();
    const requestHeadersSalesforceWIthAuth = {
      Authorization: `Bearer ${authData[0]}`,
      Cookie: 'CookieConsentPolicy=0:0; BrowserId=VQb-xP5cEeu63r_jm6pcwQ'
    };
    const getRequest = await HttpMethods.get(apiEndpoints.salesforceApi.getContactsByEmail(email),
      requestHeadersSalesforceWIthAuth, authData[1]);
    expect(getRequest.status).toBe(200);
    if (getRequest.body.totalSize !== 0) { } else {
      throw new Error(`The contact you requested does not exist in Salesforce`);
    }
    data = getRequest.body.records;
    AllureReporter.endStep();
    return data;
  };

  public static async getContactsByAccountId(accountId: string) {
    let data: JSON;
    AllureReporter.startStep(`Get salesforce contact data by AccountId`);
    const authData = await this.getToken();
    const requestHeadersSalesforceWIthAuth = {
      Authorization: `Bearer ${authData[0]}`,
      Cookie: 'CookieConsentPolicy=0:0; BrowserId=VQb-xP5cEeu63r_jm6pcwQ'
    };
    const getRequest = await HttpMethods.get(apiEndpoints.salesforceApi.getContactsById(accountId),
      requestHeadersSalesforceWIthAuth, authData[1]);
    expect(getRequest.status).toBe(200);
    if (getRequest.body.totalSize !== 0) { } else {
      throw new Error(`The contact you requested does not exist in Salesforce`);
    }
    data = getRequest.body.records;
    AllureReporter.endStep();
    return data;
  };

  public static async getAccountsByCompanyName(companyName: string) {
    let data: JSON;
    AllureReporter.startStep(`Get salesforce account data by name`);
    const authData = await this.getToken();
    const requestHeadersSalesforceWIthAuth = {
      Authorization: `Bearer ${authData[0]}`,
      Cookie: 'CookieConsentPolicy=0:0; BrowserId=VQb-xP5cEeu63r_jm6pcwQ'
    };
    const getRequest = await HttpMethods.get(apiEndpoints.salesforceApi.getAccountsByCompanyName(companyName),
      requestHeadersSalesforceWIthAuth, authData[1]);
    expect(getRequest.status).toBe(200);
    if (getRequest.body.totalSize !== 0) { } else {
      throw new Error(`The record you requested does not exist in Salesforce`);
    }
    data = getRequest.body.records;
    AllureReporter.endStep();
    return data;
  };

  public static async checkThatContactNotExist(email: string) {
    let data: JSON;
    AllureReporter.startStep(`Get salesforce contact data by email`);
    const authData = await this.getToken();
    const requestHeadersSalesforceWIthAuth = {
      Authorization: `Bearer ${authData[0]}`,
      Cookie: 'CookieConsentPolicy=0:0; BrowserId=VQb-xP5cEeu63r_jm6pcwQ'
    };
    const getRequest = await HttpMethods.get(apiEndpoints.salesforceApi.getContactsByEmail(email),
      requestHeadersSalesforceWIthAuth, authData[1]);
    expect(getRequest.status).toBe(200);
    if (getRequest.body.totalSize !== 0) {
      throw new Error(`Deleted contact is exist in Salesforce`);
    } else {
    }
    data = getRequest.body.records;
    AllureReporter.endStep();
    return data;
  };

  public static async getContactsByEmailAndName(email: string, name: string) {
    let data: JSON;
    AllureReporter.startStep(`Get salesforce contact data by email`);
    const authData = await this.getToken();
    const requestHeadersSalesforceWIthAuth = {
      Authorization: `Bearer ${authData[0]}`,
      Cookie: 'CookieConsentPolicy=0:0; BrowserId=VQb-xP5cEeu63r_jm6pcwQ'
    };
    const getRequest = await HttpMethods.get(apiEndpoints.salesforceApi.getContactsByEmailAndName(email, name),
      requestHeadersSalesforceWIthAuth, authData[1]);
    expect(getRequest.status).toBe(200);
    if (getRequest.body.totalSize !== 0) { } else {
      throw new Error(`The contact you requested does not exist in Salesforce`);
    }
    data = getRequest.body.records;
    AllureReporter.endStep();
    return data;
  };

  public static async getPersonAccountDataByEmail(email: string) {
    let data: JSON;
    AllureReporter.startStep(`Get salesforce contact data by email`);
    const authData = await this.getToken();
    const requestHeadersSalesforceWIthAuth = {
      Authorization: `Bearer ${authData[0]}`,
      Cookie: 'CookieConsentPolicy=0:0; BrowserId=VQb-xP5cEeu63r_jm6pcwQ'
    };
    const getRequest = await HttpMethods.get(apiEndpoints.salesforceApi.getPersonAccountDataByEmail(email),
      requestHeadersSalesforceWIthAuth, authData[1]);
    expect(getRequest.status).toBe(200);
    if (getRequest.body.totalSize !== 0) { } else {
      throw new Error(`The account you requested does not exist in Salesforce`);
    }
    data = getRequest.body.records;
    AllureReporter.endStep();
    return data;
  };

  public static async checkUserRoleInSalesforce(testEmail:string, expCorpAdminStatus: boolean,
    expCardholderStatus: boolean, expCorpSuperAdminStatus?: boolean) {
    let data: JSON;
    AllureReporter.startStep(`Check role in salesforce for ${testEmail} user`);
    const authData = await this.getToken();
    const requestHeadersSalesforceWIthAuth = {
      Authorization: `Bearer ${authData[0]}`,
      Cookie: 'CookieConsentPolicy=0:0; BrowserId=VQb-xP5cEeu63r_jm6pcwQ'
    };
    const getRequest = await HttpMethods.get(apiEndpoints.salesforceApi.getContactsByEmail(testEmail),
      requestHeadersSalesforceWIthAuth, authData[1]);
    expect(getRequest.status).toBe(200);
    data = getRequest.body.records;
    Object.keys(data).forEach(function (keyItem) {
      const row = data[keyItem];
      const isCardholder = row.Is_Cardholder__c;
      const isCorpAdmin = row.Corporate_Admin_User__c;
      const isCorpSupAdmin = row.Corporate_Super_Admin__c;
      expect(isCardholder).toBe(expCardholderStatus);
      expect(isCorpAdmin).toBe(expCorpAdminStatus);
      if(expCorpSuperAdminStatus !== undefined) {
        expect(isCorpSupAdmin).toBe(expCorpSuperAdminStatus);
      };
    });
    AllureReporter.endStep();
  };

  public static async getContactsByEmailAdminAndCardholder(email:string) {
    let data: JSON;
    AllureReporter.startStep(`Get salesforce contact data by email`);
    const authData = await this.getToken();
    const requestHeadersSalesforceWIthAuth = {
      Authorization: `Bearer ${authData[0]}`,
      Cookie: 'CookieConsentPolicy=0:0; BrowserId=VQb-xP5cEeu63r_jm6pcwQ'
    };
    const getRequest = await HttpMethods.get(apiEndpoints.salesforceApi.getContactsByEmail(email),
      requestHeadersSalesforceWIthAuth, authData[1]);
    expect(getRequest.status).toBe(200);
    expect(getRequest.body.totalSize).toEqual(2);
    data = getRequest.body.records;
    AllureReporter.addStep(`Contacts by Email: `, JSON.stringify(data));
    console.log('Admin + Cardholder: ', data);
    AllureReporter.endStep();
    return data;
  };  

  public static async checkContactArrayInSalesforce(contactsData:JSON, expEmail:string, expRecordType:string, expFirstName:string, expLastName:string, 
    expCurrency:string, expCardholderStatus:boolean, expCorpAdminStatus:boolean, expCorpSuperAdminStatus:boolean) {
    AllureReporter.startStep(`Check Contact data in Salesforce`);
    let objArray = Object.entries(contactsData);
    objArray.forEach(([key, value]) => {
      if (key == 'RecordTypeId') {
        expect(contactsData[key]).toBe(expRecordType);
        AllureReporter.addStep(`Expect ${contactsData[key]} is equal to ${expRecordType}`);
      } 
      if (key == 'Email') {
        expect(contactsData[key]).toBe(expEmail);
        AllureReporter.addStep(`Expect ${contactsData[key]} is equal to ${expEmail}`);
      } 
      if (key == 'FirstName') {
        expect(contactsData[key]).toBe(expFirstName);
        AllureReporter.addStep(`Expect ${contactsData[key]} is equal to ${expFirstName}`);
      } 
      if (key == 'LastName') {
        expect(contactsData[key]).toBe(expLastName);
        AllureReporter.addStep(`Expect ${contactsData[key]} is equal to ${expLastName}`);
      } 
      if (key == 'Is_Cardholder__c') {
        expect(contactsData[key]).toBe(expCardholderStatus);
        AllureReporter.addStep(`Expect ${contactsData[key]} is equal to ${expCardholderStatus}`);
      } 
      if (key == 'Corporate_Admin_User__c') {
        expect(contactsData[key]).toBe(expCorpAdminStatus);
        AllureReporter.addStep(`Expect ${contactsData[key]} is equal to ${expCorpAdminStatus}`);
      } 
      if (key == 'Corporate_Super_Admin__c') {
        expect(contactsData[key]).toBe(expCorpSuperAdminStatus);
        AllureReporter.addStep(`Expect ${contactsData[key]} is equal to ${expCorpSuperAdminStatus}`);
      } 
      if (key == 'CurrencyIsoCode') {
        expect(contactsData[key]).toBe(expCurrency);
        AllureReporter.addStep(`Expect ${contactsData[key]} is equal to ${expCurrency}`);
      } 
    });
    AllureReporter.endStep();
  };

  // public static async getAccountContactRelationshipsByAccountId(acccountId:string) {
  //   let data;
  //   await allureStep(`Get salesforce account relationships data by AccountId`, async () => {
  //     const authData = await this.getToken();
  //     const requestHeadersSalesforceWIthAuth = {
  //       Authorization: `Bearer ${authData[0]}`,
  //       Cookie: 'CookieConsentPolicy=0:0; BrowserId=VQb-xP5cEeu63r_jm6pcwQ'
  //     };
  //     const getRequest = await HttpMethods.get(apiEndpoints.salesforceApi.getAccountContactRelationshipsByAccountId(acccountId),
  //       requestHeadersSalesforceWIthAuth, authData[1]);
  //     expect(getRequest.status).toBe(200);
  //     data = getRequest.body;
  //   });
  //   return data;
  // };

  // public static async checkAccountStatus(profileId:string, expectStatus:string) {
  //   await allureStep(`Check account status in Salesforce`, async () => {
  //     const accountData = await this.getAccountsbyCenttripPlatformId(profileId);
  //     Object.keys(accountData).forEach(function(keyItem) {
  //       const row = accountData[keyItem];
  //       const salesforceStatus = row.Account_Status__c;
  //       console.log(salesforceStatus);
  //       expect(salesforceStatus).toBe(expectStatus);
  //     });
  //   });
  // };

  public static async checkContactDataInSalesforce(contactsData: JSON, expEmail: string, expRecordType: string, expFirstName: string, expLastName: string, expCurrency: string,
    expCardholderStatus: boolean, expCorpAdminStatus: boolean, expCorpSuperAdminStatus: boolean) {
    AllureReporter.startStep(`Check contact data in Salesforce`);
    Object.keys(contactsData).forEach(function (keyItem) {
      const row = contactsData[keyItem];
      const recordType = row.RecordTypeId;
      const name = row.Name;
      const email = row.Email;
      const currencyCode = row.CurrencyIsoCode;
      const isCardholder = row.Is_Cardholder__c;
      const isCorpAdmin = row.Corporate_Admin_User__c;
      const isCorpSuperAdmin = row.Corporate_Super_Admin__c;

      expect(recordType).toBe(expRecordType);
      AllureReporter.addStep(`Expect ${recordType} is equal to ${expRecordType}`);
      expect(name).toBe(expFirstName + ' ' + expLastName);
      AllureReporter.addStep(`Expect ${name} is equal to "${expFirstName} ${expLastName}"`);
      expect(email).toBe(expEmail);
      AllureReporter.addStep(`Expect ${email} is equal to ${expEmail}`);
      expect(currencyCode).toBe(expCurrency);
      AllureReporter.addStep(`Expect ${currencyCode} is equal to ${expCurrency}`);
      expect(isCardholder).toBe(expCardholderStatus);
      AllureReporter.addStep(`Expect ${isCardholder} is equal to ${expCardholderStatus}`);
      expect(isCorpAdmin).toBe(expCorpAdminStatus);
      AllureReporter.addStep(`Expect ${isCorpAdmin} is equal to ${expCorpAdminStatus}`);
      expect(isCorpSuperAdmin).toBe(expCorpSuperAdminStatus);
      AllureReporter.addStep(`Expect ${isCorpSuperAdmin} is equal to ${expCorpSuperAdminStatus}`);
    });
    AllureReporter.endStep();
  };

  public static async checkPersonAccountDataInSalesforce(contactsData: JSON, expEmail: string, expRecordType: string, expFirstName: string, expLastName: string, expDOB: string,
    expSex: string, expMobileNum: string, expStreet: string, expCity: string, expPostalCode: string, expCountry: string, expCardholderStatus: boolean,
    expCorpAdminStatus: boolean) {
    AllureReporter.startStep(`Check contact data in Salesforce`);
    Object.keys(contactsData).forEach(function (keyItem) {
      const row = contactsData[keyItem];
      const recordType = row.RecordTypeId;
      const name = row.Name;
      const email = row.PersonEmail;
      const dob = row.Date_of_Birth__c;
      const sex = row.Sex__c;
      const mobilePhone = row.PersonMobilePhone;
      const street = row.BillingAddress.street;
      const city = row.BillingAddress.city;
      const postalCode = row.BillingAddress.postalCode;
      const country = row.BillingAddress.country;
      const isCardholder = row.Is_Cardholder__pc;
      const isCorpAdmin = row.Corporate_Admin_User__pc;

      expect(recordType).toBe(expRecordType);
      expect(name).toBe(expFirstName + ' ' + expLastName);
      expect(email).toBe(expEmail);
      expect(dob).toBe(expDOB);
      expect(sex).toBe(expSex);
      expect(mobilePhone).toBe(expMobileNum);
      expect(street).toBe(expStreet);
      expect(city).toBe(expCity);
      expect(postalCode).toBe(expPostalCode);
      expect(country).toBe(expCountry);
      expect(isCardholder).toBe(expCardholderStatus);
      expect(isCorpAdmin).toBe(expCorpAdminStatus);
    });
    AllureReporter.endStep();
  };

  public static async getCashMovementData(amount: string, count: number) {
    let data: JSON;
    AllureReporter.startStep(`Get Cash Movement data by Amount in Salesforce`);
    const authData = await this.getToken();
    const requestHeadersSalesforceWIthAuth = {
      Authorization: `Bearer ${authData[0]}`,
      Cookie: 'CookieConsentPolicy=0:0; BrowserId=VQb-xP5cEeu63r_jm6pcwQ'
    };
    const getRequest = await HttpMethods.get(apiEndpoints.salesforceApi.getCashMovementData(amount, count),
      requestHeadersSalesforceWIthAuth, authData[1]);
    expect(getRequest.status).toBe(200);
    if (getRequest.body.totalSize !== 0) { } else {
      throw new Error(`The account you requested does not exist in Salesforce`);
    }
    data = getRequest.body.records;
    //console.log('Cash Movement records[] - ', data);
    AllureReporter.endStep();
    return data;
  };

  public static async checkCashMovementExpectedInSalesforce(records: JSON, currency: string, amount: string, type: string, status: string) {
    AllureReporter.startStep(`Check data on Cash Movement tab in Salesforce`);
    Object.keys(records).forEach(key => {
      if (key == 'Payment_Type__c') {
        console.log(`Expect ${records[key]} is equal to ${type}`);
        expect(records[key]).toMatch(type);
      }
      if (key == 'Selected_Currency__c') {
        console.log(`Expect ${records[key]} is equal to ${currency}`);
        expect(records[key]).toMatch(currency);
      }

      if (key == 'Amount__c') {
        console.log(`Expect ${records[key]} is equal to ${amount}`);
        expect(records[key]).toEqual(+amount);
      }
      if (key == 'Status__c') {
        console.log(`Expect ${records[key]} is equal to ${status}`);
        expect(records[key]).toMatch(status);
      }
    })
    AllureReporter.endStep();
  };

  public static async getDealsData(amountFrom: string, amountTo: string) {
    let data: JSON;
    AllureReporter.startStep(`Get Deals data by Amount From/To in Salesforce`);
    const authData = await this.getToken();
    const requestHeadersSalesforceWIthAuth = {
      Authorization: `Bearer ${authData[0]}`,
      Cookie: 'CookieConsentPolicy=0:0; BrowserId=VQb-xP5cEeu63r_jm6pcwQ'
    };
    const getRequest = await HttpMethods.get(apiEndpoints.salesforceApi.getDealsData(amountFrom, amountTo),
      requestHeadersSalesforceWIthAuth, authData[1]);
    expect(getRequest.status).toBe(200);
    if (getRequest.body.totalSize !== 0) { } else {
      throw new Error(`The account you requested does not exist in Salesforce`);
    }
    data = getRequest.body.records[0];
    //console.log('Deals - ', data);
    AllureReporter.endStep();
    return data;
  };

  public static async checkDealsInSalesforce(record: JSON, currencyFrom: string, amountFrom: string, currencyTo: string, amountTo: string, status: string,
    from: string, to: string,) {
    let pfsRef = '';
    AllureReporter.startStep(`Check data on Cash Movement tab in Salesforce`);
    Object.keys(record).forEach(key => {
      if (key == 'Sell_Currency__c') expect(record[key]).toEqual(currencyFrom);
      if (key == 'Sell_Amount__c') expect(record[key]).toEqual(+amountFrom);
      if (key == 'Buy_Amount__c') expect(record[key]).toEqual(+amountTo);
      if (key == 'Buy_Currency__c') expect(record[key]).toEqual(currencyTo);
      if (key == 'Deal_Status__c') expect(record[key]).toEqual(status);
      if (key == 'Payment_From__c') expect(record[key]).toEqual(from);
      if (key == 'Payment_To__c') expect(record[key]).toEqual(to);
      if (key == 'PFS_Ref__c') pfsRef = record[key];
    })
    AllureReporter.endStep();
    console.log('PfsRef: ', pfsRef);
    return pfsRef;
  };

  public static async getBrokerDealsData(amountFrom: string, amountTo: string) {
    let data: JSON;
    AllureReporter.startStep(`Get Broker Deals data by Amount From/To in Salesforce`);
    const authData = await this.getToken();
    const requestHeadersSalesforceWIthAuth = {
      Authorization: `Bearer ${authData[0]}`,
      Cookie: 'CookieConsentPolicy=0:0; BrowserId=VQb-xP5cEeu63r_jm6pcwQ'
    };
    const getRequest = await HttpMethods.get(apiEndpoints.salesforceApi.getBrokerDealsData(amountFrom, amountTo),
      requestHeadersSalesforceWIthAuth, authData[1]);
    expect(getRequest.status).toBe(200);
    if (getRequest.body.totalSize !== 0) { } else {
      throw new Error(`The account you requested does not exist in Salesforce`);
    }
    data = getRequest.body.records[0];
    //console.log('Broker Deals - ', data);
    AllureReporter.endStep();
    return data;
  };

  public static async checkBrokerDealsInSalesforce(record: JSON, currencyFrom: string, amountFrom: string, currencyTo: string, amountTo: string, status: string,
    from: string, to: string,) {
    let refCC = '';
    AllureReporter.startStep(`Check data on Cash Movement tab in Salesforce`);
    Object.keys(record).forEach(key => {
      if (key == 'Sell_Currency__c') expect(record[key]).toEqual(currencyFrom);
      if (key == 'Sell_Amount__c') expect(record[key]).toEqual(+amountFrom);
      if (key == 'Buy_Amount__c') expect(record[key]).toEqual(+amountTo);
      if (key == 'Buy_Currency__c') expect(record[key]).toEqual(currencyTo);
      if (key == 'Status__c') expect(record[key]).toEqual(status);
      if (key == 'Payment_From__c') expect(record[key]).toEqual(from);
      if (key == 'Payment_To__c') expect(record[key]).toEqual(to);
      if (key == 'Broker_Deal_Ref__c') refCC = record[key];
    })
    AllureReporter.endStep();
    return refCC;
  };
}
