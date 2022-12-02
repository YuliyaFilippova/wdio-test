import { Other } from '../../core/utils/other';
import { LoginAPICall } from '../../core/utils/loginAPICall';
import { createUserPage } from '../../core/pages/centtripUSA/createUser';
import { salesforceData } from '../../testData/other';
import { Salesforce } from '../../core/pages/externalServices/salesforce';
import AllureReporter from '@wdio/allure-reporter';
import { userDataInDB } from '../../core/pages/userDataInDB';
import userDataIF, { Password, UserIF } from '../../testData/usersData';
import ping from '../../connections';

describe(`Identity Facade >> U1 - Update USA users`, () => {

  before(async () => {
    if (!ping.connectionUSA._connectCalled) {
      await ping.connectionUSA.connect();
    }
  });

  beforeEach(async () => {
    AllureReporter.addFeature('Update User USA');
  });
  afterEach(async () => {
    await Other.deleteCacheCookiesUSA();
  });

  // ---------- U1.1 US Corporate Admin - Edit UStoUK country -------------------------------

  it(`[C17702] US Corporate Admin - Edit UStoUK country: AspNetUsers @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('U1.1 US Corporate Admin - Edit UStoUK country');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/17702');
    console.log('U1.1 - ', await UserIF.emailUpdateCorpAdminAll);
    const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
    await createUserPage.createUserFullAPI(await UserIF.emailUpdateCorpAdminAll, token, 'CorporateAdmin',
      UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName, UserIF.corpAdminAllFields.dob,
      UserIF.corpAdminAllFields.gender, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.street,
      UserIF.corpAdminAllFields.postalCode, UserIF.corpAdminAllFields.city, 'US', UserIF.corpAdminAllFields.state);
    const identityUserRefId = await userDataInDB.getUserIdFromAspNetUsersDB(await UserIF.emailUpdateCorpAdminAll);
    await createUserPage.editUserFullAPI(await UserIF.emailUpdateCorpAdminAll, token, UserIF.corpAdminEdited.firstName, UserIF.corpAdminEdited.lastName,
      UserIF.corpAdminEdited.dob, UserIF.corpAdminEdited.gender, `+44${UserIF.corpAdminEdited.phoneNumber}`,
      UserIF.corpAdminEdited.postalCode, UserIF.countryUK, '', UserIF.corpAdminEdited.city, UserIF.corpAdminEdited.street, identityUserRefId);
    await userDataInDB.userExistsAspNetUsersDB(await UserIF.emailUpdateCorpAdminAll, UserIF.corpAdminEdited.firstName, UserIF.corpAdminEdited.lastName,
      UserIF.corpAdminEdited.dobDB, `+44${UserIF.corpAdminEdited.phoneNumber}`);
  });

  it(`[C22127] US Corporate Admin - Edit UStoUK country: US identity @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('U1.1 US Corporate Admin - Edit UStoUK country');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22127');
    await userDataInDB.userExistsIdentityUS(await UserIF.emailUpdateCorpAdminAll, UserIF.corpAdminEdited.firstName, UserIF.corpAdminEdited.lastName,
      UserIF.corpAdminEdited.dobDB, `+44${UserIF.corpAdminEdited.phoneNumber}`, UserIF.corpAdminEdited.gender, '', UserIF.corpAdminEdited.street, null,
      null, '', UserIF.corpAdminEdited.city, null, UserIF.corpAdminEdited.postalCode, 826);
  });

  it(`[C22129] US Corporate Admin - Edit UStoUK country: SalesForce @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('U1.1 US Corporate Admin - Edit UStoUK country');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22129');
    const contactsData = await Salesforce.getContactsByEmail(await UserIF.emailUpdateCorpAdminAll);
    await Salesforce.checkContactDataInSalesforce(contactsData, await UserIF.emailUpdateCorpAdminAll, salesforceData.standardRecordTypeId,
      UserIF.corpAdminEdited.firstName, UserIF.corpAdminEdited.lastName, 'USD', false, true, false);
  });

  it(`[C30449] US Corporate Admin - Edit UStoUK country: Unique Identity @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('U1.1 US Corporate Admin - Edit UStoUK country');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30449');
    await userDataInDB.userExistsUniqueIdentityv2(await UserIF.emailUpdateCorpAdminAll, UserIF.corpAdminEdited.firstName, UserIF.corpAdminEdited.lastName,
      `${UserIF.corpAdminEdited.firstName} ${UserIF.corpAdminEdited.lastName}`, UserIF.corpAdminEdited.dobDB,
      `+44${UserIF.corpAdminEdited.phoneNumber}`, `+44${UserIF.corpAdminEdited.phoneNumber}`, UserIF.corpAdminEdited.street, null,
      UserIF.corpAdminEdited.city, '', UserIF.corpAdminEdited.postalCode, UserIF.countryUK);
  });

  // ------------ U1.2 US Corporate Admin - Remove address ----------------------------

  it(`[C19601] US Corporate Admin - Remove address: AspNetUsers`, async () => {
    AllureReporter.addSeverity('trvial');
    AllureReporter.addStory('U1.2 US Corporate Admin - Remove address');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/19601');
    console.log('U1.2 - ', await UserIF.emailUpdateCorpAdminAll2);
    const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
    await createUserPage.createUserFullAPI(await UserIF.emailUpdateCorpAdminAll2, token, 'CorporateAdmin',
      UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName, UserIF.corpAdminAllFields.dob,
      UserIF.corpAdminAllFields.gender, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.street,
      UserIF.corpAdminAllFields.postalCode, UserIF.corpAdminAllFields.city, 'US', UserIF.corpAdminAllFields.state);
    //edit USA user
    const identityUserRefId = await userDataInDB.getUserIdFromAspNetUsersDB(await UserIF.emailUpdateCorpAdminAll2);
    await createUserPage.editUserFullAPI(await UserIF.emailUpdateCorpAdminAll2, token, UserIF.corpAdminEdited.firstName, UserIF.corpAdminEdited.lastName,
      UserIF.corpAdminEdited.dob, UserIF.corpAdminEdited.gender, `+44${UserIF.corpAdminEdited.phoneNumber}`, '', '', null, '', '', identityUserRefId);
    await userDataInDB.userExistsAspNetUsersDB(await UserIF.emailUpdateCorpAdminAll2, UserIF.corpAdminEdited.firstName, UserIF.corpAdminEdited.lastName,
      UserIF.corpAdminEdited.dobDB, `+44${UserIF.corpAdminEdited.phoneNumber}`);
  });

  it(`[C22128] US Corporate Admin - Remove address: US identity`, async () => {
    AllureReporter.addSeverity('trvial');
    AllureReporter.addStory('U1.2 US Corporate Admin - Remove address');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22128');
    await userDataInDB.userExistsIdentityUS(await UserIF.emailUpdateCorpAdminAll2, UserIF.corpAdminEdited.firstName, UserIF.corpAdminEdited.lastName,
      UserIF.corpAdminEdited.dobDB, `+44${UserIF.corpAdminEdited.phoneNumber}`, UserIF.corpAdminEdited.gender, null, null, null, null,
      null, null, null, null, null);
  });

  it(`[C22130] US Corporate Admin - Remove address: SalesForce`, async () => {
    AllureReporter.addSeverity('trvial');
    AllureReporter.addStory('U1.2 US Corporate Admin - Remove address');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22130');
    const contactsData = await Salesforce.getContactsByEmail(await UserIF.emailUpdateCorpAdminAll2);
    await Salesforce.checkContactDataInSalesforce(contactsData, await UserIF.emailUpdateCorpAdminAll2, salesforceData.standardRecordTypeId, UserIF.corpAdminEdited.firstName,
      UserIF.corpAdminEdited.lastName, 'USD', false, true, false);
  });

  it(`[C30450] US Corporate Admin - Remove address: Unique Identity @smoke`, async () => {
    AllureReporter.addSeverity('trvial');
    AllureReporter.addStory('U1.2 US Corporate Admin - Remove address');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30450');
    AllureReporter.addIssue('https://centtrip.atlassian.net/browse/CU-3350');
    await userDataInDB.userExistsUniqueIdentityv2(await UserIF.emailUpdateCorpAdminAll2, UserIF.corpAdminEdited.firstName, UserIF.corpAdminEdited.lastName,
      `${UserIF.corpAdminEdited.firstName} ${UserIF.corpAdminEdited.lastName}`, UserIF.corpAdminEdited.dobDB,
      `+44${UserIF.corpAdminEdited.phoneNumber}`, `+44${UserIF.corpAdminEdited.phoneNumber}`, null, null, null, null, null, null);
  });

  // ------------ U1.3 US Corporate Admin - Add address ----------------------------

  it(`[C30468] US Corporate Admin - Add address: AspNetUsers`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('U1.3 US Corporate Admin - Add address');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30468');
    console.log('U1.3 - ', await UserIF.emailUpdateCorpAdminRequired);
    const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
    await createUserPage.createUserRequiredFieldsAPI(await UserIF.emailUpdateCorpAdminRequired, token, 'CorporateAdmin',
      UserIF.corpAdminOnlyRequiredFields.firstName, UserIF.corpAdminOnlyRequiredFields.lastName, UserIF.corpAdminOnlyRequiredFields.dob,
      `+1${UserIF.corpAdminAllFields.phoneNumber}`);
    const identityUserRefId = await userDataInDB.getUserIdFromAspNetUsersDB(await UserIF.emailUpdateCorpAdminRequired);
    await createUserPage.editUserFullAPI(await UserIF.emailUpdateCorpAdminRequired, token, UserIF.corpAdminEdited.firstName, UserIF.corpAdminEdited.lastName,
      UserIF.corpAdminEdited.dob, UserIF.corpAdminEdited.gender, `+1${UserIF.corpAdminEdited.phoneNumber}`, UserIF.corpAdminEdited.postalCode,
      UserIF.countryUSA, UserIF.corpAdminEdited.state, UserIF.corpAdminEdited.city, UserIF.corpAdminEdited.street, identityUserRefId);
    await userDataInDB.userExistsAspNetUsersDB(await UserIF.emailUpdateCorpAdminRequired, UserIF.corpAdminEdited.firstName, UserIF.corpAdminEdited.lastName,
      UserIF.corpAdminEdited.dobDB, `+1${UserIF.corpAdminEdited.phoneNumber}`);
  });

  it(`[C30469] US Corporate Admin - Add address: US identity`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('U1.3 US Corporate Admin - Add address');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30469');
    AllureReporter.addIssue('https://centtrip.atlassian.net/browse/CU-2729');
    await userDataInDB.userExistsIdentityUS(await UserIF.emailUpdateCorpAdminRequired, UserIF.corpAdminEdited.firstName, UserIF.corpAdminEdited.lastName,
      UserIF.corpAdminEdited.dobDB, `+1${UserIF.corpAdminEdited.phoneNumber}`, UserIF.corpAdminEdited.gender, '', UserIF.corpAdminEdited.street, null, null,
      UserIF.corpAdminEdited.state, UserIF.corpAdminEdited.city, null, UserIF.corpAdminEdited.postalCode, 840);
  });

  it(`[C30470] US Corporate Admin - Add address: SalesForce`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('U1.3 US Corporate Admin - Add address');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30470');
    const contactsData = await Salesforce.getContactsByEmail(await UserIF.emailUpdateCorpAdminRequired);
    await Salesforce.checkContactDataInSalesforce(contactsData, await UserIF.emailUpdateCorpAdminRequired, salesforceData.standardRecordTypeId,
      UserIF.corpAdminEdited.firstName, UserIF.corpAdminEdited.lastName, 'USD', false, true, false);
  });

  it(`[C30471] US Corporate Admin - Add address: Unique Identity @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('U1.3 US Corporate Admin - Add address');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30471');
    await userDataInDB.userExistsUniqueIdentityv2(await UserIF.emailUpdateCorpAdminRequired, UserIF.corpAdminEdited.firstName, UserIF.corpAdminEdited.lastName,
      `${UserIF.corpAdminEdited.firstName} ${UserIF.corpAdminEdited.lastName}`, UserIF.corpAdminEdited.dobDB,
      `+1${UserIF.corpAdminEdited.phoneNumber}`, `+1${UserIF.corpAdminEdited.phoneNumber}`, UserIF.corpAdminEdited.street, null,
      UserIF.corpAdminEdited.city, UserIF.corpAdminEdited.state, UserIF.corpAdminEdited.postalCode, UserIF.countryUSA);
  });
});
