import { createUserPage } from '../../core/pages/centtripUSA/createUser';
import { createUserPageUK } from '../../core/pages/centtripUK/createUserUK';
import { commonPageUK } from '../../core/pages/centtripUK/commonUK';
import { cardMigrationPage } from '../../core/pages/centtripUK/cardMigrationPage';
import { salesforceData } from '../../testData/other';
import { signInPage } from '../../core/pages/centtripAppWeb/signInPage';
import { Salesforce } from '../../core/pages/externalServices/salesforce';
import { signInPageElements, UKCardMigrationPageElements } from '../../core/pages/locators';
import { LoginAPICall } from '../../core/utils/loginAPICall';
import { Other } from '../../core/utils/other';
import { createAccountPage } from '../../core/pages/centtripAppWeb/createAccountPage';
import userDataIF, { Password, pathToUploadPfsCardCreation, UserIF } from '../../testData/usersData';
import AllureReporter from '@wdio/allure-reporter';
import { userDataInDB } from '../../core/pages/userDataInDB';
import { URLs } from '../../urls';
import { Actions } from '../../core/utils/actions';
import ping from '../../connections'

describe(`Identity Facade >> C3 - Create All regions users`, () => {
  let corpAdminAP = '';

  before(async () => {
    if (!ping.connectionUSA._connectCalled) {
      await ping.connectionUSA.connect();
    }
    if (!ping.connection._connectCalled) {
      await ping.connection.connect();
    }
  });

  beforeEach(async () => {
    AllureReporter.addFeature('Create User All regions');
  });

  afterEach(async () => {
    await Other.deleteCacheCookiesUK();
    await Other.deleteCacheCookiesUSA();
  });

  // -------- C3.1 Corporate Admin: US All fields > UK ----------------------------------

  it(`[C17588] Corporate Admin: Create in USA (all fields) > Create in UK (US country): AspNetUsers @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.1 Corporate Admin: US All fields > UK');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/17588');
    console.log('3.1 - ', await UserIF.emailCorpAdminUSUK);
    const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
    await createUserPage.createUserFullAPI(await UserIF.emailCorpAdminUSUK, token, 'CorporateAdmin', UserIF.corpAdminAllFields.firstName,
      UserIF.corpAdminAllFields.lastName, UserIF.corpAdminAllFields.dob, UserIF.corpAdminAllFields.gender, UserIF.corpAdminAllFields.phoneNumber,
      UserIF.corpAdminAllFields.street, UserIF.corpAdminAllFields.postalCode, UserIF.corpAdminAllFields.city, 'US', UserIF.corpAdminAllFields.state);
    await Other.deleteCacheCookiesUSA();
    // Create UK user
    await browser.url(URLs.UKPortalURL);
    await (await signInPageElements.signInWindow).waitForDisplayed();
    await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
    await createUserPageUK.openCreateUserPageUnderCentripAdmin();
    await createUserPageUK.createAdminUK('corporateAdmin', await UserIF.emailCorpAdminUSUK, userDataIF.accountUK, UserIF.corpAdminUK.title, 'Female',
      UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.postalCode, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2,
      UserIF.corpAdminUK.city, 'United States', UserIF.phoneCodeUSA, UserIF.phoneCodeUSA, UserIF.corpAdminUK.phoneNumber, UserIF.corpAdminUK.homeNumber,
      UserIF.corpAdminUK.dob);
    await userDataInDB.userExistsAspNetUsersDB(await UserIF.emailCorpAdminUSUK, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.dobDB,
      `+1${UserIF.corpAdminUK.phoneNumber}`);
    await commonPageUK.logoutFromUK();
  });

  it(`[C22080] Corporate Admin: Create in USA (all fields) > Create in UK (US country): UK identity @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.1 Corporate Admin: US All fields > UK');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22080');
    const addressArray = [UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2, UserIF.corpAdminUK.city, 'US', UserIF.corpAdminUK.postalCode];
    await userDataInDB.userExistsIdentityUK(await UserIF.emailCorpAdminUSUK, null, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.dobDB,
      `+1${UserIF.corpAdminUK.phoneNumber}`, null, addressArray);
  });

  it(`[C22081] Corporate Admin: Create in USA (all fields) > Create in UK (US country): US identity @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.1 Corporate Admin: US All fields > UK');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22081');
    await userDataInDB.userExistsIdentityUS(await UserIF.emailCorpAdminUSUK, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.dobDB,
      `+1${UserIF.corpAdminUK.phoneNumber}`, UserIF.corpAdminUK.gender, '', `${UserIF.corpAdminUK.address1} ${UserIF.corpAdminUK.address2}`, null, null, null, UserIF.corpAdminUK.city, null, UserIF.corpAdminUK.postalCode, 840);
  });

  xit(`[C22082] Corporate Admin: Create in USA (all fields) > Create in UK (US country): DynamoDb @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.1 Corporate Admin: US All fields > UK');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22082');
    await userDataInDB.userExistsInDynamoDB(await UserIF.emailCorpAdminUSUK, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, 'Female', '2', UserIF.corpAdminUK.dob,
      'United States', 'US', UserIF.corpAdminUK.postalCode, undefined, UserIF.corpAdminUK.city, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2, undefined, undefined, `+1${UserIF.corpAdminUK.homeNumber}`,
      `+1${UserIF.corpAdminUK.phoneNumber}`);
  });

  it(`[C22083] Corporate Admin: Create in USA (all fields) > Create in UK (US country): SalesForce @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.1 Corporate Admin: US All fields > UK');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22083');
    const contactsData = await Salesforce.getContactsByEmail(await UserIF.emailCorpAdminUSUK);
    await Salesforce.checkContactDataInSalesforce(contactsData, await UserIF.emailCorpAdminUSUK, salesforceData.standardRecordTypeId, UserIF.corpAdminUK.firstName,
      UserIF.corpAdminUK.lastName, 'GBP', false, true, false);
  });

  it(`[C30441] Corporate Admin: Create in USA (all fields) > Create in UK (US country): Unique identity @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.1 Corporate Admin: US All fields > UK');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30441');
    await userDataInDB.userExistsUniqueIdentityv2(await UserIF.emailCorpAdminUSUK, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
      `${UserIF.corpAdminUK.firstName} ${UserIF.corpAdminUK.lastName}`, UserIF.corpAdminUK.dobDB,
      `+1${UserIF.corpAdminUK.phoneNumber}`, `+1${UserIF.corpAdminUK.phoneNumber}`, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2,
      UserIF.corpAdminUK.city, null, UserIF.corpAdminUK.postalCode, "United States of America");
  });

  // --------- C3.2 Corporate Admin US Required fields  > UK -----------------------------------

  it(`[C19606] Corporate Admin US Required fields  > UK: AspNetUsers @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C3.2 Corporate Admin US Required fields  > UK');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/19606');
    console.log('3.2 - ', await UserIF.emailCardholderUSCorpAdminUK);
    const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
    await createUserPage.createUserRequiredFieldsAPI(await UserIF.emailCardholderUSCorpAdminUK, token, 'CorporateAdmin',
      UserIF.corpAdminOnlyRequiredFields.firstName, UserIF.corpAdminOnlyRequiredFields.lastName,
      UserIF.corpAdminOnlyRequiredFields.dob, UserIF.corpAdminOnlyRequiredFields.phoneNumber);
    await Other.deleteCacheCookiesUSA();
    // Create UK admin 
    await browser.url(URLs.UKPortalURL);
    await (await signInPageElements.signInWindow).waitForDisplayed();
    await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
    await createUserPageUK.openCreateUserPageUnderCentripAdmin();
    await createUserPageUK.createAdminUK('corporateAdmin', await UserIF.emailCardholderUSCorpAdminUK, userDataIF.accountUK, UserIF.corpAdminUK.title,
      UserIF.corpAdminUK.gender, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.postalCode, UserIF.corpAdminUK.address1,
      UserIF.corpAdminUK.address2, UserIF.corpAdminUK.city, 'United Kingdom', UserIF.phoneCodeUK, UserIF.phoneCodeUK, UserIF.corpAdminUK.phoneNumber,
      UserIF.corpAdminUK.homeNumber, UserIF.corpAdminUK.dob);
    await commonPageUK.logoutFromUK();
    await userDataInDB.userExistsAspNetUsersDB(await UserIF.emailCardholderUSCorpAdminUK, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.dobDB,
      `+44${UserIF.corpAdminUK.phoneNumber}`);
  }).timeout(5000000);

  it(`[C30442] Corporate Admin US Required fields  > UK: Unique identity @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C3.2 Corporate Admin US Required fields  > UK');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30442');
    await userDataInDB.userExistsUniqueIdentityv2(await UserIF.emailCardholderUSCorpAdminUK, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
      `${UserIF.corpAdminUK.firstName} ${UserIF.corpAdminUK.lastName}`, UserIF.corpAdminUK.dobDB,
      `+44${UserIF.corpAdminUK.phoneNumber}`, `+44${UserIF.corpAdminUK.phoneNumber}`, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2,
      UserIF.corpAdminUK.city, null, UserIF.corpAdminUK.postalCode, "United Kingdom");
  });

  it(`[C22119] Corporate Admin US Required fields  > UK: UK identity @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C3.2 Corporate Admin US Required fields  > UK');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22119');
    const addressArray = [UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2, UserIF.corpAdminUK.city, 'GB', UserIF.corpAdminUK.postalCode];
    await userDataInDB.userExistsIdentityUK(await UserIF.emailCardholderUSCorpAdminUK, null, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
      UserIF.corpAdminUK.dobDB, `+44${UserIF.corpAdminUK.phoneNumber}`, null, addressArray);
  });

  it(`[C22120] Corporate Admin US Required fields  > UK: US identity @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C3.2 Corporate Admin US Required fields  > UK');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22120');
    await userDataInDB.userExistsIdentityUS(await UserIF.emailCardholderUSCorpAdminUK, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.dobDB,
      `+44${UserIF.corpAdminUK.phoneNumber}`, 'Female', '', `${UserIF.corpAdminUK.address1} ${UserIF.corpAdminUK.address2}`, null, null, null, UserIF.corpAdminUK.city, null,
      UserIF.corpAdminUK.postalCode, 826);
  });

  xit(`[C22082] Corporate Admin US Required fields  > UK: DynamoDb @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C3.2 Corporate Admin US Required fields  > UK');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22082');
    await userDataInDB.userExistsInDynamoDB(await UserIF.emailCardholderUSCorpAdminUK, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.gender,
      '2', UserIF.corpAdminUK.dob, 'United Kingdom', 'GB', UserIF.corpAdminUK.postalCode, undefined, UserIF.corpAdminUK.city, UserIF.corpAdminUK.address1,
      UserIF.corpAdminUK.address2, undefined, undefined, `+44${UserIF.corpAdminUK.homeNumber}`, `+44${UserIF.corpAdminUK.phoneNumber}`);
  });

  it(`[C22122] Corporate Admin US Required fields  > UK: SalesForce @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C3.2 Corporate Admin US Required fields  > UK');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22122');
    const contactsData = await Salesforce.getContactsByEmail(await UserIF.emailCardholderUSCorpAdminUK);
    await Salesforce.checkContactDataInSalesforce(contactsData, await UserIF.emailCardholderUSCorpAdminUK, salesforceData.standardRecordTypeId, UserIF.corpAdminUK.firstName,
      UserIF.corpAdminUK.lastName, 'GBP', false, true, false);
  });

  // -------- C3.3 Corporate Admin: UK > US All fields ------------------------------------

  it(`[C17391] Corporate Admin: UK > US All fields: AspNetUsers @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.3 Corporate Admin: UK > US All fields');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/17391');
    console.log('3.3 - ',await UserIF.emailCorpAdminUKUSA);
    await browser.url(URLs.UKPortalURL);
    await (await signInPageElements.signInWindow).waitForDisplayed();
    await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
    await createUserPageUK.openCreateUserPageUnderCentripAdmin();
    await createUserPageUK.createAdminUK('corporateAdmin', await UserIF.emailCorpAdminUKUSA, userDataIF.accountUK, UserIF.corpAdminUK.title, UserIF.corpAdminUK.gender,
      UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.postalCode, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2,
      UserIF.corpAdminUK.city, UserIF.countryUK, UserIF.phoneCodeUK, UserIF.phoneCodeUK, UserIF.corpAdminUK.phoneNumber, UserIF.corpAdminUK.homeNumber,
      UserIF.corpAdminUK.dob);
    await commonPageUK.logoutFromUK();
    // Create USA admin
    const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
    await createUserPage.createUserFullAPI(await UserIF.emailCorpAdminUKUSA, token, 'CorporateAdmin', UserIF.corpAdminAllFields.firstName,
      UserIF.corpAdminAllFields.lastName, UserIF.corpAdminAllFields.dob, UserIF.corpAdminAllFields.gender, `+1${UserIF.corpAdminAllFields.phoneNumber}`,
      UserIF.corpAdminAllFields.street, UserIF.corpAdminAllFields.postalCode, UserIF.corpAdminAllFields.city, 'US', UserIF.corpAdminAllFields.state);
    await Other.deleteCacheCookiesUSA();
    await userDataInDB.userExistsAspNetUsersDB(await UserIF.emailCorpAdminUKUSA, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName, UserIF.corpAdminAllFields.dobDB,
      `+1${UserIF.corpAdminAllFields.phoneNumber}`);
  }).timeout(5000000);

  it(`[C22084] Corporate Admin: UK > US All fields: UK identity @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.3 Corporate Admin: UK > US All fields');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22084');
    const addressArray = [UserIF.corpAdminAllFields.street, UserIF.corpAdminAllFields.city, UserIF.corpAdminAllFields.state, 'US', UserIF.corpAdminAllFields.postalCode];
    await userDataInDB.userExistsIdentityUK(await UserIF.emailCorpAdminUKUSA, null, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
      UserIF.corpAdminAllFields.dobDB, `+1${UserIF.corpAdminAllFields.phoneNumber}`, null, addressArray);
  });

  it(`[C22085] Corporate Admin: UK > US All fields: US identity @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.3 Corporate Admin: UK > US All fields');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22085');
    await userDataInDB.userExistsIdentityUS(await UserIF.emailCorpAdminUKUSA, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
      UserIF.corpAdminAllFields.dobDB, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.gender, '',
      UserIF.corpAdminAllFields.street, null, null, UserIF.corpAdminAllFields.state, UserIF.corpAdminAllFields.city,
      null, UserIF.corpAdminAllFields.postalCode, 840);
  });

  xit(`[C22086] Corporate Admin: UK > US All fields: DynamoDb @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.3 Corporate Admin: UK > US All fields');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22086');
    await userDataInDB.userExistsInDynamoDB(await UserIF.emailCorpAdminUKUSA, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
      UserIF.corpAdminAllFields.gender, '2', UserIF.corpAdminAllFields.dobDynamo, UserIF.countryUSA, 'US', UserIF.corpAdminAllFields.postalCode,
      UserIF.corpAdminAllFields.state, UserIF.corpAdminAllFields.city, UserIF.corpAdminAllFields.street, undefined, '  ',
      undefined, `+1${UserIF.corpAdminAllFields.phoneNumber}`, `+1${UserIF.corpAdminAllFields.phoneNumber}`);
  });

  it(`[C22103] Corporate Admin: UK > US All fields: SalesForce @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.3 Corporate Admin: UK > US All fields');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22103');
    const contactsData = await Salesforce.getContactsByEmail(await UserIF.emailCorpAdminUKUSA);
    await Salesforce.checkContactDataInSalesforce(contactsData, await UserIF.emailCorpAdminUKUSA, salesforceData.standardRecordTypeId,
      UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName, 'USD', false, true, false);
  });

  it(`[C30443] Corporate Admin: UK > US All fields: Unique identity @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.3 Corporate Admin: UK > US All fields');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30443');
    await userDataInDB.userExistsUniqueIdentityv2(await UserIF.emailCorpAdminUKUSA, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
      `${UserIF.corpAdminAllFields.firstName} ${UserIF.corpAdminAllFields.lastName}`, UserIF.corpAdminAllFields.dobDB,
      `+1${UserIF.corpAdminAllFields.phoneNumber}`, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.street, null,
      UserIF.corpAdminAllFields.city, UserIF.corpAdminAllFields.state, UserIF.corpAdminAllFields.postalCode, UserIF.countryUSA);
  });

  // --------- C3.4 Corporate Admin: UK > US Required fields ---------------------------------

  it(`[C19605] Corporate Admin: UK > US Required fields: AspNetUsers`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.4 Corporate Admin: UK > US Required fields');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/19605');
    console.log('3.4 - ', UserIF.emailCorpAdminUKUSARequired);
    // Create UK admin
    await browser.url(URLs.UKPortalURL);
    await (await signInPageElements.signInWindow).waitForDisplayed();
    await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
    await createUserPageUK.openCreateUserPageUnderCentripAdmin();
    await createUserPageUK.createAdminUK('corporateAdmin', await UserIF.emailCorpAdminUKUSARequired, userDataIF.accountUK, UserIF.corpAdminUK.title, 'Female',
      UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.postalCode, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2,
      UserIF.corpAdminUK.city, 'United States', UserIF.phoneCodeUSA, UserIF.phoneCodeUSA, UserIF.corpAdminUK.phoneNumber, UserIF.corpAdminUK.homeNumber,
      UserIF.corpAdminUK.dob,);
    await commonPageUK.logoutFromUK();
    await Other.deleteCacheCookiesUK();
    // Create USA user
    const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
    await createUserPage.createUserRequiredFieldsAPI(await UserIF.emailCorpAdminUKUSARequired, token, 'CorporateAdmin',
      UserIF.corpAdminOnlyRequiredFields.firstName, UserIF.corpAdminOnlyRequiredFields.lastName, UserIF.corpAdminOnlyRequiredFields.dob,
      `+1${UserIF.corpAdminOnlyRequiredFields.phoneNumber}`);
    await Other.deleteCacheCookiesUSA();
    await userDataInDB.userExistsAspNetUsersDB(await UserIF.emailCorpAdminUKUSARequired, UserIF.corpAdminOnlyRequiredFields.firstName, UserIF.corpAdminOnlyRequiredFields.lastName,
      UserIF.corpAdminOnlyRequiredFields.dobDB, `+1${UserIF.corpAdminOnlyRequiredFields.phoneNumber}`);
  }).timeout(5000000);

  it(`[C30444] Corporate Admin: UK > US Required fields: Unique identity @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.4 Corporate Admin: UK > US Required fields');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30444');
    await userDataInDB.userExistsUniqueIdentityv2(await UserIF.emailCorpAdminUKUSARequired, UserIF.corpAdminOnlyRequiredFields.firstName, UserIF.corpAdminOnlyRequiredFields.lastName,
      `${UserIF.corpAdminOnlyRequiredFields.firstName} ${UserIF.corpAdminOnlyRequiredFields.lastName}`, UserIF.corpAdminOnlyRequiredFields.dobDB,
      `+1${UserIF.corpAdminOnlyRequiredFields.phoneNumber}`, `+1${UserIF.corpAdminOnlyRequiredFields.phoneNumber}`, null, null,
      null, null, null, null);
  });

  it(`[C22104] Corporate Admin: UK > US Required fields: UK identity`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.4 Corporate Admin: UK > US Required fields');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22104');
    const addressArray = [UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2, UserIF.corpAdminUK.city, 'US', UserIF.corpAdminUK.postalCode];
    await userDataInDB.userExistsIdentityUK(await UserIF.emailCorpAdminUKUSARequired, null, UserIF.corpAdminOnlyRequiredFields.firstName, UserIF.corpAdminOnlyRequiredFields.lastName,
      UserIF.corpAdminOnlyRequiredFields.dobDB, `+1${UserIF.corpAdminOnlyRequiredFields.phoneNumber}`, null, []);
  });

  it(`[C22105] Corporate Admin: UK > US Required fields: US identity`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.4 Corporate Admin: UK > US Required fields');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22105');
    await userDataInDB.userExistsIdentityUS(await UserIF.emailCorpAdminUKUSARequired, UserIF.corpAdminOnlyRequiredFields.firstName, UserIF.corpAdminOnlyRequiredFields.lastName,
      UserIF.corpAdminOnlyRequiredFields.dobDB, `+1${UserIF.corpAdminOnlyRequiredFields.phoneNumber}`, null, null, null, null, null,
      null, null, null, null, null);
  });

  xit(`[C22106] Corporate Admin: UK > US Required fields: DynamoDb`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.4 Corporate Admin: UK > US Required fields');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22106');
    await userDataInDB.userExistsInDynamoDB(await UserIF.emailCorpAdminUKUSARequired, UserIF.corpAdminOnlyRequiredFields.firstName, UserIF.corpAdminOnlyRequiredFields.lastName,
      undefined, '2', UserIF.corpAdminOnlyRequiredFields.dobDynamo, undefined, undefined, undefined, undefined, undefined,
      undefined, undefined, '  ', undefined, `+1${UserIF.corpAdminOnlyRequiredFields.phoneNumber}`, `+1${UserIF.corpAdminOnlyRequiredFields.phoneNumber}`);
  });

  it(`[C22107] Corporate Admin: UK > US Required fields: SalesForce`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.4 Corporate Admin: UK > US Required fields');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22107');
    const contactsData = await Salesforce.getContactsByEmail(await UserIF.emailCorpAdminUKUSARequired);
    await Salesforce.checkContactDataInSalesforce(contactsData, await UserIF.emailCorpAdminUKUSARequired, salesforceData.standardRecordTypeId, UserIF.corpAdminOnlyRequiredFields.firstName,
      UserIF.corpAdminOnlyRequiredFields.lastName, 'USD', false, true, false);
  });

  // ----------- C3.5 UK Cardholder > US Corporate Admin --------------------------------

  it(`[C19615] UK Cardholder > US Corporate Admin: AspNetUsers @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.5 UK Cardholder > US Corporate Admin');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/19615');
    console.log('С3.5 - ', await UserIF.emailCardholderUKUSA);
    // Create UK cardholder
    const fileName = await cardMigrationPage.generateBatchFile(await UserIF.emailCardholderUKUSA, process.env.env);
    await browser.url(URLs.UKPortalURL);
    await (await signInPageElements.signInWindow).waitForDisplayed();
    await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
    await createUserPageUK.openCardMigrationPage();
    await Actions.uploadFile(`${pathToUploadPfsCardCreation}${fileName}.xlsx`, await UKCardMigrationPageElements.chooseButton);
    await browser.pause(2000);
    await Actions.waitAndClick(await UKCardMigrationPageElements.uploadButton);
    await (await UKCardMigrationPageElements.uploadedMessage).waitForDisplayed();
    await cardMigrationPage.batchProccessCheck();
    await commonPageUK.logoutFromUK();
    // Create USA admin
    const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
    await createUserPage.createUserFullAPI(await UserIF.emailCardholderUKUSA, token, 'CorporateAdmin', UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
      UserIF.corpAdminAllFields.dob, UserIF.corpAdminAllFields.gender, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.street,
      UserIF.corpAdminAllFields.postalCode, UserIF.corpAdminAllFields.city, 'US', UserIF.corpAdminAllFields.state);
    await userDataInDB.userExistsAspNetUsersDB(await UserIF.emailCardholderUKUSA, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
      UserIF.corpAdminAllFields.dobDB, `+1${UserIF.corpAdminAllFields.phoneNumber}`);
  }).timeout(7000000);

  it(`[C22123] UK Cardholder > US Corporate Admin: UK identity @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.5 UK Cardholder > US Corporate Admin');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22123');
    const addressArray = [UserIF.corpAdminAllFields.street, UserIF.corpAdminAllFields.city, 'US', UserIF.corpAdminAllFields.postalCode];
    await userDataInDB.userExistsIdentityUK(await UserIF.emailCardholderUKUSA, null, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
      UserIF.corpAdminAllFields.dobDB, `+1${UserIF.corpAdminAllFields.phoneNumber}`, null, addressArray);
  });

  it(`[C22124] UK Cardholder > US Corporate Admin: US identity @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.5 UK Cardholder > US Corporate Admin');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22124');
    await userDataInDB.userExistsIdentityUS(await UserIF.emailCardholderUKUSA, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
      UserIF.corpAdminAllFields.dobDB, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.gender, '', `${UserIF.corpAdminAllFields.street}`,
      null, null, UserIF.corpAdminAllFields.state, UserIF.corpAdminAllFields.city, null, UserIF.corpAdminAllFields.postalCode, 840);
  });

  xit(`[C22125] UK Cardholder > US Corporate Admin: DynamoDb @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.5 UK Cardholder > US Corporate Admin');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22125');
    await userDataInDB.userExistsInDynamoDB(await UserIF.emailCardholderUKUSA, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName, UserIF.corpAdminAllFields.gender,
      undefined, UserIF.corpAdminAllFields.dobDynamo, UserIF.countryUSA, 'US', UserIF.corpAdminAllFields.postalCode, UserIF.corpAdminAllFields.state, UserIF.corpAdminAllFields.city, UserIF.corpAdminAllFields.street,
      undefined, '  ', undefined, `+1${UserIF.corpAdminAllFields.phoneNumber}`, `+1${UserIF.corpAdminAllFields.phoneNumber}`);
  });

  it(`[C22126] UK Cardholder > US Corporate Admin: SalesForce @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.5 UK Cardholder > US Corporate Admin');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22126');
    const contactsData = await Salesforce.getContactsByEmailAdminAndCardholder(await UserIF.emailCardholderUKUSA);
    await Salesforce.checkContactArrayInSalesforce(contactsData[0], await UserIF.emailCardholderUKUSA, salesforceData.standardRecordTypeId, UserIF.corpAdminAllFields.firstName,
      UserIF.corpAdminAllFields.lastName, 'USD', false, true, false);
    await Salesforce.checkContactArrayInSalesforce(contactsData[1], await UserIF.emailCardholderUKUSA, null, UserIF.cardholderUK.firstNameSF,
      UserIF.cardholderUK.lastNameSF, 'GBP', false, false, false);
  });

  it(`[C30445] UK Cardholder > US Corporate Admin: Unique identity @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.5 UK Cardholder > US Corporate Admin');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30445');
    await userDataInDB.userExistsUniqueIdentityv2(await UserIF.emailCardholderUKUSA, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
      `${UserIF.corpAdminAllFields.firstName} ${UserIF.corpAdminAllFields.lastName}`, UserIF.corpAdminAllFields.dobDB,
      `+1${UserIF.corpAdminAllFields.phoneNumber}`, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.street, null,
      UserIF.corpAdminAllFields.city, UserIF.corpAdminAllFields.state, UserIF.corpAdminAllFields.postalCode, UserIF.countryUSA);
  });

  // ------------ C3.6 US Corporate Admin > UK Cardholder --------------------------------

  it(`[C23744] US Corporate Admin > UK Cardholder: AspNetUsers @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.6 US Corporate Admin > UK Cardholder');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/23744');
    console.log('С3.6 - ', await UserIF.emailCorpAdminUSUK);
    // Create USA admin
    const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
    await createUserPage.createUserFullAPI(await UserIF.emailCorpAdminUSUK, token, 'CorporateAdmin', UserIF.corpAdminAllFields.firstName,
      UserIF.corpAdminAllFields.lastName, UserIF.corpAdminAllFields.dob, UserIF.corpAdminAllFields.gender, `+1${UserIF.corpAdminAllFields.phoneNumber}`,
      UserIF.corpAdminAllFields.street, UserIF.corpAdminAllFields.postalCode, UserIF.corpAdminAllFields.city, 'US',
      UserIF.corpAdminAllFields.state);
    await Other.deleteCacheCookiesUSA();
    // Create UK cardholder
    const fileName2 = await cardMigrationPage.generateBatchFile(await UserIF.emailCorpAdminUSUK, process.env.env);
    await browser.url(URLs.UKPortalURL);
    await (await signInPageElements.signInWindow).waitForDisplayed();
    await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
    await createUserPageUK.openCardMigrationPage();
    await Actions.uploadFile(`${pathToUploadPfsCardCreation}${fileName2}.xlsx`, await UKCardMigrationPageElements.chooseButton);
    await browser.pause(2000);
    await Actions.waitAndClick(await UKCardMigrationPageElements.uploadButton);
    await (await UKCardMigrationPageElements.uploadedMessage).waitForDisplayed();
    await cardMigrationPage.batchProccessCheck();
    await commonPageUK.logoutFromUK();
    await userDataInDB.userExistsAspNetUsersDB(await UserIF.emailCorpAdminUSUK, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
      UserIF.corpAdminAllFields.dobDB, `+1${UserIF.corpAdminAllFields.phoneNumber}`);
  }).timeout(7000000);

  it(`[C22123] US Corporate Admin > UK Cardholder: UK identity @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.6 US Corporate Admin > UK Cardholder');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22123');
    const addressArray = [UserIF.cardholderUK.address1, UserIF.cardholderUK.address2, UserIF.cardholderUK.city, 'GB',
    UserIF.cardholderUK.postalCode];
    await userDataInDB.userExistsIdentityUK(await UserIF.emailCorpAdminUSUK, null, UserIF.cardholderUK.firstName, UserIF.cardholderUK.lastName, UserIF.cardholderUK.dobDB,
      `+44${UserIF.cardholderUK.phoneNumber}`, null, addressArray);
  });

  it(`[C22124] US Corporate Admin > UK Cardholder: US identity @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.6 US Corporate Admin > UK Cardholder');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22124');
    await userDataInDB.userExistsIdentityUS(await UserIF.emailCorpAdminUSUK, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
      UserIF.corpAdminAllFields.dobDB, `+1${UserIF.corpAdminAllFields.phoneNumber}`, null, '', `${UserIF.corpAdminAllFields.street}`, null, null, null,
      UserIF.corpAdminAllFields.city, null, UserIF.corpAdminAllFields.postalCode, 840);
  });

  xit(`[C22125] US Corporate Admin > UK Cardholder: DynamoDb @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.6 US Corporate Admin > UK Cardholder');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22125');
    await userDataInDB.userExistsInDynamoDB(await UserIF.emailCorpAdminUSUK, UserIF.cardholderUK.firstName, UserIF.cardholderUK.lastName, undefined, undefined,
      UserIF.cardholderUK.dob, undefined, 'US', UserIF.cardholderUK.postalCode, undefined, UserIF.cardholderUK.city, UserIF.cardholderUK.address1,
      UserIF.cardholderUK.address2, undefined, undefined, undefined, `+44${UserIF.cardholderUK.phoneNumber}`);
  });

  it(`[C22126] US Corporate Admin > UK Cardholder: SalesForce @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.6 US Corporate Admin > UK Cardholder');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22126');
    const contactsData = await Salesforce.getContactsByEmailAdminAndCardholder(await UserIF.emailCorpAdminUSUK);
    await Salesforce.checkContactArrayInSalesforce(contactsData[0], await UserIF.emailCorpAdminUSUK, salesforceData.standardRecordTypeId, UserIF.corpAdminAllFields.firstName,
      UserIF.corpAdminAllFields.lastName, 'USD', false, true, false);
    await Salesforce.checkContactArrayInSalesforce(contactsData[1], await UserIF.emailCorpAdminUSUK, null, UserIF.cardholderUK.firstNameSF,
      UserIF.cardholderUK.lastNameSF, 'GBP', false, false, false);
  });

  it(`[C30445] US Corporate Admin > UK Cardholder: Unique identity @smoke`, async () => {
    AllureReporter.addSeverity('trivial');
    AllureReporter.addStory('C3.6 US Corporate Admin > UK Cardholder');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30445');
    await userDataInDB.userExistsUniqueIdentityv2(await UserIF.emailCorpAdminUSUK, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
      `${UserIF.corpAdminAllFields.firstName} ${UserIF.corpAdminAllFields.lastName}`, UserIF.corpAdminAllFields.dobDB,
      `+1${UserIF.corpAdminAllFields.phoneNumber}`, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.street, '',
      UserIF.corpAdminAllFields.city, UserIF.corpAdminAllFields.state, UserIF.corpAdminAllFields.postalCode, UserIF.countryUSA);
  });

  // ------------ C3.7 AP User > US Corporate Admin --------------------------------

  it(`[C19599] AP User > US Corporate Admin: AspNetUsers @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C3.7 AP User > US Corporate Admin');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/19599');
    await browser.url(URLs.baseUrl);
    await (await signInPageElements.signInWindow).waitForDisplayed();
    corpAdminAP = await createAccountPage.registerCustomApplicationUser('FirstAP', 'LastAP', '8', '1994');
    console.log('3.7 - ', corpAdminAP);
    const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
    await createUserPage.createUserFullAPI(corpAdminAP, token, 'CorporateAdmin', UserIF.corpAdminAP.firstName, UserIF.corpAdminAP.lastName,
      UserIF.corpAdminAllFields.dob, UserIF.corpAdminAP.gender, `+1${UserIF.corpAdminAP.phoneNumber}`, UserIF.corpAdminAP.street, UserIF.corpAdminAP.postalCode,
      UserIF.corpAdminAP.city, 'US', UserIF.corpAdminAP.state);
    await userDataInDB.userExistsAspNetUsersDB(corpAdminAP, UserIF.corpAdminAP.firstName, UserIF.corpAdminAP.lastName,
      UserIF.corpAdminAP.dob, `+1${UserIF.corpAdminAP.phoneNumber}`);
  });

  it(`[C22108] AP User > US Corporate Admin: US identity @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C3.7 AP User > US Corporate Admin');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22108');
    await userDataInDB.userExistsIdentityUS(corpAdminAP, UserIF.corpAdminAP.firstName, UserIF.corpAdminAP.lastName, UserIF.corpAdminAP.dob,
      `+1${UserIF.corpAdminAP.phoneNumber}`, UserIF.corpAdminAP.gender, '', UserIF.corpAdminAP.street, null, null, UserIF.corpAdminAP.state,
      UserIF.corpAdminAP.city, null, UserIF.corpAdminAP.postalCode, 840);
  });

  it(`[C22109] AP User > US Corporate Admin: SalesForce @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory(('C3.7 AP User > US Corporate Admin'));
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22109');
    const contactsData = await Salesforce.getContactsByEmail(corpAdminAP);
    await Salesforce.checkContactDataInSalesforce(contactsData, corpAdminAP, salesforceData.standardRecordTypeId, UserIF.corpAdminAP.firstName, UserIF.corpAdminAP.lastName, 'USD',
      false, true, false);
  });

  it(`[C30446] AP User > US Corporate Admin: Unique Identity @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C3.7 AP User > US Corporate Admin');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30446');
    await userDataInDB.userExistsUniqueIdentityv2(await corpAdminAP, UserIF.corpAdminAP.firstName, UserIF.corpAdminAP.lastName,
      `${UserIF.corpAdminAP.firstName} ${UserIF.corpAdminAP.lastName}`, UserIF.corpAdminAP.dob,
      `+1${UserIF.corpAdminAP.phoneNumber}`, `+1${UserIF.corpAdminAP.phoneNumber}`, UserIF.corpAdminAP.street, null,
      UserIF.corpAdminAP.city, UserIF.corpAdminAP.state, UserIF.corpAdminAP.postalCode, UserIF.countryUSA);
  });

  // ---------- C3.8 AP User > UK Corporate Admin ------------------------------

  it(`[C19600] AP User > UK Corporate Admin: AspNetUsers @smoke`, async () => {
    AllureReporter.addSeverity('minor');
    AllureReporter.addStory('C3.8 AP User > UK Corporate Admin');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/19600');
    await browser.url(URLs.baseUrl);
    corpAdminAP = await createAccountPage.registerCustomApplicationUser('FirstAP', 'LastAP', '8', '1994');
    console.log('3.8 - ', corpAdminAP);
    await browser.url(URLs.UKPortalURL);
    await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
    await createUserPageUK.openCreateUserPageUnderCentripAdmin();
    await createUserPageUK.createAdminUK('corporateAdmin', corpAdminAP, userDataIF.accountUK, UserIF.corpAdminUK.title,
      UserIF.corpAdminUK.gender, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.postalCode, UserIF.corpAdminUK.address1,
      UserIF.corpAdminUK.address2, UserIF.corpAdminUK.city, UserIF.countryUK, UserIF.phoneCodeUK, UserIF.phoneCodeUK, UserIF.corpAdminUK.phoneNumber,
      UserIF.corpAdminUK.homeNumber, UserIF.corpAdminUK.dob);
    await commonPageUK.logoutFromUK();
    await Other.deleteCacheCookiesUK();
    await userDataInDB.userExistsAspNetUsersDB(corpAdminAP, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
      UserIF.corpAdminUK.dobDB, `+44${UserIF.corpAdminUK.phoneNumber}`);
  });

  it(`[C22110] AP User > UK Corporate Admin: UK identity @smoke`, async () => {
    AllureReporter.addSeverity('minor');
    AllureReporter.addStory('C3.8 AP User > UK Corporate Admin');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22110');
    const addressArray = [UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2, UserIF.corpAdminUK.city, 'GB',
    UserIF.corpAdminUK.postalCode];
    await userDataInDB.userExistsIdentityUK(corpAdminAP, null, UserIF.corpAdminUK.firstName,
      UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.dobDB, `+44${UserIF.corpAdminUK.phoneNumber}`,
      null, addressArray);
  });

  xit(`[C22111] AP User > UK Corporate Admin: DynamoDb @smoke`, async () => {
    AllureReporter.addSeverity('minor');
    AllureReporter.addStory('C3.8 AP User > UK Corporate Admin');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22111');
    await userDataInDB.userExistsInDynamoDB(corpAdminAP, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
      UserIF.corpAdminUK.gender, '2', UserIF.corpAdminUK.dob, 'United Kingdom', 'GB',
      UserIF.corpAdminUK.postalCode, undefined, UserIF.corpAdminUK.city, UserIF.corpAdminUK.address1,
      UserIF.corpAdminUK.address2, undefined, undefined, `+44${UserIF.corpAdminUK.homeNumber}`, `+44${UserIF.corpAdminUK.phoneNumber}`);
  });

  it(`[C22109] AP User > US Corporate Admin: SalesForce @smoke`, async () => {
    AllureReporter.addSeverity('minor');
    AllureReporter.addStory('C3.8 AP User > UK Corporate Admin');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22112');
    const contactsData = await Salesforce.getContactsByEmail(corpAdminAP);
    await Salesforce.checkContactDataInSalesforce(contactsData, corpAdminAP, salesforceData.standardRecordTypeId, UserIF.corpAdminUK.firstName,
      UserIF.corpAdminUK.lastName, 'GBP', false, true, false);
  });

  it(`[C30447] AP User > UK Corporate Admin: Unique identity @smoke`, async () => {
    AllureReporter.addSeverity('minor');
    AllureReporter.addStory('C3.8 AP User > UK Corporate Admin');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30447');
    await userDataInDB.userExistsUniqueIdentityv2(corpAdminAP, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
      `${UserIF.corpAdminUK.firstName} ${UserIF.corpAdminUK.lastName}`, UserIF.corpAdminUK.dobDB,
      `+44${UserIF.corpAdminUK.phoneNumber}`, `+44${UserIF.corpAdminUK.phoneNumber}`, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2,
      UserIF.corpAdminUK.city, null, UserIF.corpAdminUK.postalCode, UserIF.countryUK);
  });
});
