import AllureReporter from "@wdio/allure-reporter";
import { DBQueries } from "../../testData/DBQueries";
import { configMSSQL, connection, connectionUSA } from "../../wdio.conf";

const sql = require('mssql');
const dynamo = require('dynamodb');
const AWS = require('aws-sdk');

export class UserDataInDB {

  //AspNetUsers

  async userExistsAspNetUsersDB(email: string, expFirstName: string, expLastName: string, expDob: string, expPhoneNumber: string): Promise<string> {
    return new Promise((resolve, reject) => {
      AllureReporter.startStep(`Check ${email} user is existed in AspNetUsers DB`);
      connection.query(DBQueries.getUserDataFromAspNetUsersDB(email), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows.length === 0) {
          reject(new Error('User not found'));
        } else {
          expect(rows.length).not.toEqual(0);
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            const firstName = row.FirstName;
            const lastName = row.LastName;
            const dob = row.DateOfBirth;
            const phoneNumber = row.PhoneNumber;

            expect(firstName).toEqual(expFirstName);
            AllureReporter.addStep(`Expect ${firstName} is equal to ${expFirstName}`);
            expect(lastName).toEqual(expLastName);
            AllureReporter.addStep(`Expect ${lastName} is equal to ${expLastName}`);
            expect(String(dob)).toContain(expDob);
            AllureReporter.addStep(`Expect ${String(dob)} is equal to ${expDob}`);
            expect(phoneNumber).toEqual(expPhoneNumber);
            AllureReporter.addStep(`Expect ${phoneNumber} is equal to ${expPhoneNumber}`);
            resolve(phoneNumber);
          });
        }
      });
      AllureReporter.endStep();
    });
  };

  async userNotExistsAspNetUsersDB(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      AllureReporter.startStep(`Check ${email} user is NOT existed in AspNetUsers DB`);
      connection.query(DBQueries.getUserDataFromAspNetUsersDB(email), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows.length !== 0) {
          reject(new Error('Deleted user is found'));
        } else {
          expect(rows.length).toEqual(0);
          AllureReporter.addStep(`Expect ${rows.length} is equal to 0`);
          resolve(rows.length);
        }
      });
      AllureReporter.endStep();
    });
  };

  async checkUserDataInAspNetUsersDB(email: string, expFirstName: string, expLastName: string, expDob: string, expPhoneNumber: string): Promise<string> {
    return new Promise((resolve, reject) => {
      connection.query(DBQueries.getUserDataFromAspNetUsersDB(email), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows.length === 0) {
          reject(new Error('User is not found'));
        } else {
          expect(rows.length).not.toEqual(0);
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            const firstName = row.FirstName;
            const lastName = row.LastName;
            const dob = row.DateOfBirth;
            const phoneNumber = row.PhoneNumber;

            expect(firstName).toEqual(expFirstName);
            expect(lastName).toEqual(expLastName);
            expect(String(dob)).toContain(expDob);
            expect(phoneNumber).toEqual(expPhoneNumber);
            resolve(phoneNumber);
          });
        }
      });
    });
  };

  async getUserIdFromAspNetUsersDB(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      connection.query(DBQueries.getUserIdFromAspNetUsersDB(email), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows.length === 0) {
          reject(new Error('User not found'));
        } else {
          expect(rows.length).not.toEqual(0);
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            const id = row.id;
            expect(id).toBeDefined();
            resolve(id);
            console.log(id);
            return id;
          });
        }
      });
    });
  };

  //Unique Identity

  async userExistsUniqueIdentityv2(email: string, expFirstName: string, expLastName: string, expDisplayName: string, expDob: string,
    expPhoneNumber: string, expContactPhoneNumber: string, expAddressLine1: string, expAddressLine2: string, expCity: string, expState: string,
    expPostCode: string, expCountryName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      AllureReporter.startStep(`Check ${email} user is existed in Identity v2`);
      connection.query(DBQueries.getUserDataFromUniqueIdentity2(email), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows.length === 0) {
          reject(new Error('User is not found'));
        } else {
          expect(rows.length).not.toEqual(0);
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            const firstName = row.FirstName;
            const lastName = row.LastName;
            const dob = row.DateOfBirth;
            const mobilePhoneNumber = row.MobilePhoneNumber;
            const contactPhoneNumber = row.ContactPhoneNumber;
            const addressLine1 = row.AddressLine1;
            const addressLine2 = row.AddressLine2;
            const city = row.City;
            const state = row.State;
            const postCode = row.PostCode;
            const countryName = row.Name;
            expect(firstName).toEqual(expFirstName);
            AllureReporter.addStep(`Expect ${firstName} is equal to ${expFirstName}`);
            expect(lastName).toEqual(expLastName);
            AllureReporter.addStep(`Expect ${lastName} is equal to ${expLastName}`);
            expect(String(dob)).toContain(expDob);
            AllureReporter.addStep(`Expect ${String(dob)} is equal to ${expDob}`);
            expect(mobilePhoneNumber).toEqual(expPhoneNumber);
            AllureReporter.addStep(`Expect ${mobilePhoneNumber} is equal to ${expPhoneNumber}`);
            expect(contactPhoneNumber).toEqual(expContactPhoneNumber);
            AllureReporter.addStep(`Expect ${contactPhoneNumber} is equal to ${expContactPhoneNumber}`);
            expect(addressLine1).toEqual(expAddressLine1);
            AllureReporter.addStep(`Expect ${addressLine1} is equal to ${expAddressLine1}`);
            expect(addressLine2).toEqual(expAddressLine2);
            AllureReporter.addStep(`Expect ${addressLine2} is equal to ${expAddressLine2}`);
            expect(city).toEqual(expCity);
            AllureReporter.addStep(`Expect ${city} is equal to ${expCity}`);
            expect(state).toEqual(expState);
            AllureReporter.addStep(`Expect ${state} is equal to ${expState}`);
            expect(postCode).toEqual(expPostCode);
            AllureReporter.addStep(`Expect ${postCode} is equal to ${expPostCode}`);
            expect(countryName).toEqual(expCountryName);
            AllureReporter.addStep(`Expect ${countryName} is equal to ${expCountryName}`);
            resolve(countryName);
          });
        }
      });
      AllureReporter.endStep();
    });
  };

  async userNotExistsUniqueIdentityv2(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      AllureReporter.startStep(`Check ${email} user is NOT existed in Identity v2`);
      connection.query(DBQueries.getUserDataFromUniqueIdentity2(email), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows.length !== 0) {
          reject(new Error('Deleted user is found'));
        } else {
          expect(rows.length).toEqual(0);
          AllureReporter.addStep(`Expect ${rows.length} is equal to 0`);
          resolve(rows.length);
        }
      });
      AllureReporter.endStep();
    });
  };

  // Identity US

  async userExistsIdentityUS(email: string, expFirstName: string, expLastName: string, expDob: string, expPhoneNumber: string, expGender: string,
    expAddress: string, expAddress2: string, expAddress3: string, expAddress4: string, expState: string, expCity: string, expCounty: string,
    expPostCode: string, expCountry: number): Promise<string> {
    return new Promise((resolve, reject) => {
      AllureReporter.startStep(`Check ${email} user is existed in Identity US`);
      connectionUSA.query(DBQueries.getUserFromIdentityUS(email), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows.length === 0) {
          reject(new Error('User is not found'));
        } else {
          expect(rows.length).not.toEqual(0);
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            const city = row.City;
            const county = row.County;
            const state = row.State;
            const postCode = row.PostCode;
            const country = row.CountryNumericCode;
            const gender = row.Gender;
            const firstName = row.FirstName;
            const lastName = row.LastName;
            const displayName = row.DisplayName;
            const dob = row.DateOfBirth;
            const phoneNumber = row.ContactPhoneNumber;
            const address = row.AddressLine1;
            const address2 = row.AddressLine2;
            const address3 = row.AddressLine3;
            const address4 = row.AddressLine4;
            expect(firstName).toEqual(expFirstName);
            AllureReporter.addStep(`Expect ${firstName} is equal to ${expFirstName}`);
            expect(lastName).toEqual(expLastName);
            AllureReporter.addStep(`Expect ${lastName} is equal to ${expLastName}`);
            expect(String(dob)).toContain(expDob);
            AllureReporter.addStep(`Expect ${String(dob)} is equal to ${expDob}`);
            expect(phoneNumber).toEqual(expPhoneNumber);
            AllureReporter.addStep(`Expect phonenumber ${phoneNumber} is equal to ${expPhoneNumber}`);
            expect(gender).toEqual(expGender);
            AllureReporter.addStep(`Expect gender ${gender} is equal to ${expGender}`);
            expect(city).toEqual(expCity);
            AllureReporter.addStep(`Expect city ${city} is equal to ${expCity}`);
            expect(postCode).toEqual(expPostCode);
            AllureReporter.addStep(`Expect Postal Code ${postCode} is equal to ${expPostCode}`);
            expect(country).toEqual(expCountry);
            AllureReporter.addStep(`Expect country ${country} is equal to ${expCountry}`);
            expect(displayName).toEqual(expFirstName + ' ' + expLastName);
            AllureReporter.addStep(`Expect Emboss Name ${displayName} is equal to "${expFirstName} ${expLastName}"`);
            expect(address).toEqual(expAddress);
            AllureReporter.addStep(`Expect address ${address} is equal to ${expAddress}`);
            expect(address2).toEqual(expAddress2);
            AllureReporter.addStep(`Expect address2 ${address2} is equal to ${expAddress2}`);
            expect(address3).toEqual(expAddress3);
            AllureReporter.addStep(`Expect address3 ${address3} is equal to ${expAddress3}`);
            expect(address4).toEqual(expAddress4);
            AllureReporter.addStep(`Expect address4 ${address4} is equal to ${expAddress4}`);
            expect(state).toEqual(expState);
            AllureReporter.addStep(`Expect state ${state} is equal to ${expState}`);
            expect(county).toEqual(expCounty);
            AllureReporter.addStep(`Expect county ${county} is equal to ${expCounty}`);
            resolve(phoneNumber);
          });
        }
      });
      AllureReporter.endStep();
    });
  };

  async userNotExistsIdentityUS(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      AllureReporter.startStep(`Check ${email} user is NOT existed in Identity US`);
      connectionUSA.query(DBQueries.getUserFromIdentityUS(email), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows.length !== 0) {
          reject(new Error('Deleted user is found'));
        } else {
          expect(rows.length).toEqual(0);
          AllureReporter.addStep(`Expect ${rows.length} is equal to 0`);
          resolve(rows.length);
        }
      });
      AllureReporter.endStep();
    });
  };

  async checkUserDataInIdentityUS(email: string, expFirstName: string, expLastName: string, expDob: string, expPhoneNumber: string, expGender: string): Promise<string> {
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getUserMainDataFromIndentityUS(email), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          expect(rows.length).not.toEqual(0);
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            const firstName = row.FirstName;
            const lastName = row.LastName;
            const dob = row.DateOfBirth;
            const phoneNumber = row.ContactPhoneNumber;
            const gender = row.Gender;
            expect(firstName).toEqual(expFirstName);
            expect(lastName).toEqual(expLastName);
            expect(String(dob)).toContain(expDob);
            expect(phoneNumber).toEqual(expPhoneNumber);
            expect(gender).toEqual(expGender);
            resolve(phoneNumber);
          });
        }
      });
    });
  };

  async checkUserFullDataIndentityUS(email: string, expFirstName: string, expLastName: string, expDob: string, expPhoneNumber: string, expGender: string, expAddress: string,
    expCity: string, expPostCode: string, expCountry: number): Promise<string> {
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getUserMainDataFromIndentityUS(email), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          expect(rows.length).not.toEqual(0);
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            const address = row.AddressLine2;
            const city = row.City;
            const postCode = row.PostCode;
            const country = row.CountryNumericCode;
            const gender = row.Gender;
            const firstName = row.FirstName;
            const lastName = row.LastName;
            const dob = row.DateOfBirth;
            const phoneNumber = row.ContactPhoneNumber;
            expect(firstName).toEqual(expFirstName);
            expect(lastName).toEqual(expLastName);
            expect(String(dob)).toContain(expDob);
            expect(phoneNumber).toEqual(expPhoneNumber);
            expect(gender).toEqual(expGender);
            expect(address).toEqual(expAddress);
            expect(city).toEqual(expCity);
            expect(postCode).toContain(expPostCode);
            expect(country).toEqual(expCountry);
            resolve(phoneNumber);
          });
        }
      });
    });
  };

  async checkUserDataInAuthenticationDB(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      connection.query(DBQueries.getUserDataFromAuthenticationDBQuery(email), function (err, rows) {
        if (err) {
          // console.log(err);
          reject(err);
        } else {
          // console.log(rows);
          expect(rows.length).toEqual(1);
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            const emailAspNetUsers = row.Email;
            expect(emailAspNetUsers).toEqual(email);
            resolve(emailAspNetUsers);
          });
        }
      });
    });
  };

  // Identity UK

  async userExistsIdentityUK(email: string, expTitle: string, expFirstName: string, expLastName: string, expDob: string, expPhoneNumber: string,
    expHomeNumber: string, expAddress: string[], emptyAddress?: boolean): Promise<string> {
    return new Promise((resolve, reject) => {
      AllureReporter.startStep(`Check ${email} user is existed in Identity UK`);
      connection.query(DBQueries.getUserDataFromIdentityDB(email), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows.length === 0) {
          reject(new Error('User is not found'));
        } else {
          expect(rows.length).not.toEqual(0);
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            const title = row.Title;
            const firstName = row.FirstName;
            const lastName = row.LastName;
            const dob = row.DateOfBirth;
            const phoneNumber = row.PhoneNumber;
            const homeNumber = row.LandlinePhone;
            const address = row.Address;

            expect(title).toEqual(expTitle);
            AllureReporter.addStep(`Expect ${title} is equal to ${expTitle}`);
            expect(firstName).toEqual(expFirstName);
            AllureReporter.addStep(`Expect ${firstName} is equal to ${expFirstName}`);
            expect(lastName).toEqual(expLastName);
            AllureReporter.addStep(`Expect ${lastName} is equal to ${expLastName}`);
            expect(String(dob)).toContain(expDob);
            AllureReporter.addStep(`Expect ${String(dob)} is equal to ${expDob}`);
            expect(phoneNumber).toEqual(expPhoneNumber);
            AllureReporter.addStep(`Expect phoneNumber ${phoneNumber} is equal to ${expPhoneNumber}`);
            expect(homeNumber).toEqual(expHomeNumber);
            AllureReporter.addStep(`Expect homeNumber ${homeNumber} is equal to ${expHomeNumber}`);
            for (let i = 0; i < expAddress.length; i += 1) {
              expect(address).toContain(expAddress[i]);
              AllureReporter.addStep(`Expect addressExists ${address} is equal to ${expAddress[i]}`);
            }
            if (emptyAddress === true) {
              expect(address).toBe(expAddress);
              AllureReporter.addStep(`Expect address=Null ${address} is equal to ${expAddress}`);
            }
            resolve(phoneNumber);
          });
        }
      });
      AllureReporter.endStep();
    });
  };

  async userNotExistsIdentityUK(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      AllureReporter.startStep(`Check ${email} user is NOT existed in Identity UK`);
      connection.query(DBQueries.getUserDataFromIdentityDB(email), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows.length !== 0) {
          reject(new Error('Deleted user is found'));
        } else {
          expect(rows.length).toEqual(0);
          AllureReporter.addStep(`Expect ${rows.length} is equal to 0`);
          resolve(rows.length);
        }
      });
      AllureReporter.endStep();
    });
  };

  // MSSQL 

  async userExistInMSSQLDB(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      sql.connect(configMSSQL, (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const request = new sql.Request();
          request.query(DBQueries.checkThatUserExistInMSSQLDB(email), (err, rows) => {
            if (err) {
              console.log(err);
              reject(err);
            } else if (rows.recordset.length === 0) { reject(new Error('User not found')); } else {
              const result = rows.recordset.length;
              console.log(result);
              resolve(result);
            }
          });
        }
      });
    });
  };

  async userNotExistInMSSQLDB(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      sql.connect(configMSSQL, (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const request = new sql.Request();
          request.query(DBQueries.checkThatUserExistInMSSQLDB(email), (err, rows) => {
            if (err) {
              console.log(err);
              reject(err);
            } else if (rows.recordset.length === 0) {
              expect(rows.length).toEqual(0);
              AllureReporter.addStep(`Expect ${rows.length} is equal to 0`);
              resolve(rows.recordset.length);
            }
          });
        }
      });
    });
  };

  //DynamoDB 

  async userExistsInDynamoDB(email: string, expFirstName: string, expLastName: string, expGender: string, expTitle: string, expDob: string, expCountry: string,
    expCountryCode: string, expPostCode: string, expState: string, expCity: string, expAddress1: string, expAddress2: string, expAddress3: string, expAddress4: string,
    expPhone: string, expMobileNumber: string): Promise<string> {
    return new Promise((resolve, reject) => {
      dynamo.AWS.config.update({ region: 'eu-west-1' });
      const docClient = new AWS.DynamoDB.DocumentClient();
      const params = {
        TableName: 'EndUser',
        Key: {
          A: email
        }
      };
      docClient.get(params, function (err, data) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (JSON.stringify(data) === '{}') {
          reject(new Error(`User "${email}" is not found in DynamoDB`));
        } else {
          Object.keys(data).forEach(function (keyItem) {
            const row = data[keyItem];
            const userEmail = row.A;
            const firstName = row.B;
            const lastName = row.C;
            const gender = row.AH;
            const title = row.AI;
            const dateOfBirth = row.E;
            const country = row.L;
            const countryCode = row.M;
            const postCode = row.O;
            const state = row.K;
            const city = row.J;
            const addressLine1 = row.F;
            const addressLine2 = row.G;
            const addressLine3 = row.H;
            const addressLine4 = row.I;
            const phone = row.P;
            const mobileNumber = row.Q;
            expect(email).toEqual(userEmail);
            AllureReporter.addStep(`Expect ${email} is equal to ${userEmail}`);
            expect(expFirstName).toEqual(firstName);
            AllureReporter.addStep(`Expect ${expFirstName} is equal to ${firstName}`);
            expect(expLastName).toEqual(lastName);
            AllureReporter.addStep(`Expect ${expLastName} is equal to ${lastName}`);
            expect(expGender).toEqual(gender);
            AllureReporter.addStep(`Expect ${expGender} is equal to ${gender}`);
            expect(expTitle).toEqual(title);
            AllureReporter.addStep(`Expect ${expTitle} is equal to ${title}`);
            expect(expDob).toEqual(dateOfBirth);
            AllureReporter.addStep(`Expect ${expDob} is equal to ${dateOfBirth}`);
            expect(expCountry).toEqual(country);
            AllureReporter.addStep(`Expect ${expCountry} is equal to ${country}`);
            expect(expCountryCode).toEqual(countryCode);
            AllureReporter.addStep(`Expect countryCode ${expCountryCode} is equal to ${countryCode}`);
            expect(expPostCode).toEqual(postCode);
            AllureReporter.addStep(`Expect postalCode ${expPostCode} is equal to ${postCode}`);
            expect(expState).toEqual(state);
            AllureReporter.addStep(`Expect state ${expState} is equal to ${state}`);
            expect(expCity).toEqual(city);
            AllureReporter.addStep(`Expect city ${expCity} is equal to ${city}`);
            expect(expAddress1).toEqual(addressLine1);
            AllureReporter.addStep(`Expect address1 ${expAddress1} is equal to ${addressLine1}`);
            expect(expAddress2).toEqual(addressLine2);
            AllureReporter.addStep(`Expect address2 ${expAddress2} is equal to ${addressLine2}`);
            expect(expAddress3).toEqual(addressLine3);
            AllureReporter.addStep(`Expect address3 ${expAddress3} is equal to ${addressLine3}`);
            expect(expAddress4).toEqual(addressLine4);
            AllureReporter.addStep(`Expect address4 ${expAddress4} is equal to ${addressLine4}`);
            expect(expPhone).toEqual(phone);
            AllureReporter.addStep(`Expect phone ${expPhone} is equal to ${phone}`);
            expect(expMobileNumber).toEqual(mobileNumber);
            AllureReporter.addStep(`Expect mobileNUmber ${expMobileNumber} is equal to ${mobileNumber}`);
            resolve(firstName);
          });
        }
      });
    });
  };

  async userNotExistInDynamoDB(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      dynamo.AWS.config.update({ region: 'eu-west-1' });
      const docClient = new AWS.DynamoDB.DocumentClient();
      const params = {
        TableName: 'EndUser',
        Key: {
          A: email
        }
      };
      docClient.get(params, function (err, data) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (JSON.stringify(data) !== '{}') {
          reject(new Error('Deleted user is found in DynamoDB'));
        } else {
          expect(JSON.stringify(data)).toEqual('{}');
          AllureReporter.addStep(`Expect ${JSON.stringify(data)} is equal to {}`);
          resolve(JSON.stringify(data));
        }
      });
    });
  };

  async checkPhoneNumberInDynamoDB(email: string, expMobileNumber: string): Promise<string> {
    return new Promise((resolve, reject) => {
      dynamo.AWS.config.update({ region: 'eu-west-1' });
      const docClient = new AWS.DynamoDB.DocumentClient();
      const params = {
        TableName: 'EndUser',
        Key: {
          A: email
        }
      };
      docClient.get(params, function (err, data) {
        if (err) {
          console.log(err);
          reject(err);
        } else if (JSON.stringify(data) === '{}') {
          reject(new Error(`User "${email}" is not found in DynamoDB`));
        } else {
          Object.keys(data).forEach(function (keyItem) {
            const row = data[keyItem];
            const userEmail = row.A;
            const mobileNumber = row.Q;
            console.log('MobilePhonein Dynamo: ', mobileNumber);
            expect(expMobileNumber).toEqual(mobileNumber);
            AllureReporter.addStep(`Expect ${expMobileNumber} is equal to ${mobileNumber}`);
            expect(email).toEqual(userEmail);
            AllureReporter.addStep(`Expect ${email} is equal to ${userEmail}`);
            resolve(mobileNumber);
          });
        }
      });
    });
  };
};

export const userDataInDB = new UserDataInDB();