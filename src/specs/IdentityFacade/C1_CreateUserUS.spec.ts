import { Other } from '../../core/utils/other';
import { LoginAPICall } from '../../core/utils/loginAPICall';
import { createUserPage } from '../../core/pages/centtripUSA/createUser';
import { salesforceData } from '../../testData/other';
import { signInPage } from '../../core/pages/centtripAppWeb/signInPage';
import { cardsPage } from '../../core/pages/centtripUSA/cardsPage';
import AllureReporter from '@wdio/allure-reporter';
import userDataIF, { Password, UserIF } from '../../testData/usersData';
import { userDataInDB } from '../../core/pages/userDataInDB';
import { Salesforce } from '../../core/pages/externalServices/salesforce';
import { URLs } from '../../urls';
import { RandomGenerator } from '../../core/utils/randomGenerator';
import { USAManageCardsPageElements } from '../../core/pages/locators';
import { Actions } from '../../core/utils/actions';
import ping from '../../connections'

describe(`Identity Facade >> C1 - Create USA users`, () => {

  before(async () => {
    if (!ping.connectionUSA._connectCalled) {
      await ping.connectionUSA.connect();
    }
    if (!ping.connection._connectCalled) {
      await ping.connection.connect();
    }
  });

  beforeEach(async () => {
    AllureReporter.addFeature('Create User USA');
  });

  afterEach(async () => {
    await Other.deleteCacheCookiesUSA();
  });

  // ----------------- C1.1 US Corporate Admin: All fields ---------------------------------------------

  it(`[C17378] US Corporate Admin: All fields: AspNetUsers @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C1.1 US Corporate Admin: All fields');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/17378');
    console.log('C1.1 - ', await UserIF.corpAdminAllFields.email);
    const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
    await createUserPage.createUserFullAPI(await UserIF.corpAdminAllFields.email, token, 'CorporateAdmin',
      UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName, UserIF.corpAdminAllFields.dob,
      UserIF.corpAdminAllFields.gender, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.street,
      UserIF.corpAdminAllFields.postalCode, UserIF.corpAdminAllFields.city, 'US', UserIF.corpAdminAllFields.state);
    await userDataInDB.userExistsAspNetUsersDB(await UserIF.corpAdminAllFields.email, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
      UserIF.corpAdminAllFields.dobDB, `+1${UserIF.corpAdminAllFields.phoneNumber}`);
  });

  it(`[C22023] US Corporate Admin: All fields: US identity @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C1.1 US Corporate Admin: All fields');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22023');
    await userDataInDB.userExistsIdentityUS(await UserIF.corpAdminAllFields.email, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
      UserIF.corpAdminAllFields.dobDB, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.gender, '', UserIF.corpAdminAllFields.street,
      null, null, UserIF.corpAdminAllFields.state, UserIF.corpAdminAllFields.city, null, UserIF.corpAdminAllFields.postalCode, 840);
  });

  it(`[C22024] US Corporate Admin: All fields: SalesForce @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C1.1 US Corporate Admin: All fields');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22024');
    const contactsData = await Salesforce.getContactsByEmail(await UserIF.corpAdminAllFields.email);
    await Salesforce.checkContactDataInSalesforce(contactsData, await UserIF.corpAdminAllFields.email, salesforceData.standardRecordTypeId,
      UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName, 'USD', false, true, false);
  });

  it(`[C30431] US Corporate Admin: All fields: Unique identity @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C1.1 US Corporate Admin: All fields');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30431');
    await userDataInDB.userExistsUniqueIdentityv2(await UserIF.corpAdminAllFields.email, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
      `${UserIF.corpAdminAllFields.firstName} ${UserIF.corpAdminAllFields.lastName}`, UserIF.corpAdminAllFields.dobDB,
      `+1${UserIF.corpAdminAllFields.phoneNumber}`, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.street, null,
      UserIF.corpAdminAllFields.city, UserIF.corpAdminAllFields.state, UserIF.corpAdminAllFields.postalCode, UserIF.countryUSA);
  });

  // --------------- C1.2 US Corporate Admin: Required fields ------------------------------

  it(`[C19608] US Corporate Admin: Required fields: AspNetUsers @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C1.2 US Corporate Admin: Required fields');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/19608');
    console.log('C1.2 - ', await UserIF.corpAdminOnlyRequiredFields.email);
    const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
    await createUserPage.createUserRequiredFieldsAPI(await UserIF.corpAdminOnlyRequiredFields.email, token, 'CorporateAdmin',
      UserIF.corpAdminOnlyRequiredFields.firstName, UserIF.corpAdminOnlyRequiredFields.lastName, UserIF.corpAdminOnlyRequiredFields.dob,
      `+1${UserIF.corpAdminAllFields.phoneNumber}`);
    await userDataInDB.userExistsAspNetUsersDB(await UserIF.corpAdminOnlyRequiredFields.email, UserIF.corpAdminOnlyRequiredFields.firstName,
      UserIF.corpAdminOnlyRequiredFields.lastName, UserIF.corpAdminOnlyRequiredFields.dobDB, `+1${UserIF.corpAdminOnlyRequiredFields.phoneNumber}`);
  });

  it(`[C22025] US Corporate Admin: Required fields: US identity @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C1.2 US Corporate Admin: Required fields');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22025');
    await userDataInDB.userExistsIdentityUS(await UserIF.corpAdminOnlyRequiredFields.email, UserIF.corpAdminOnlyRequiredFields.firstName,
      UserIF.corpAdminOnlyRequiredFields.lastName, UserIF.corpAdminOnlyRequiredFields.dobDB,
      `+1${UserIF.corpAdminOnlyRequiredFields.phoneNumber}`, null, null, null, null, null, null, null, null, null, null);
  });

  it(`[C22026] US Corporate Admin: Required fields: SalesForce @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C1.2 US Corporate Admin: Required fields');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22026');
    const contactsData = await Salesforce.getContactsByEmail(await UserIF.corpAdminOnlyRequiredFields.email);
    await Salesforce.checkContactDataInSalesforce(contactsData, await UserIF.corpAdminOnlyRequiredFields.email, salesforceData.standardRecordTypeId,
      UserIF.corpAdminOnlyRequiredFields.firstName,
      UserIF.corpAdminOnlyRequiredFields.lastName, 'USD', false, true, false);
  });

  it(`[C30434] US Corporate Admin: Required fields: Unique identity @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C1.2 US Corporate Admin: Required fields');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30434');
    await userDataInDB.userExistsUniqueIdentityv2(await UserIF.corpAdminOnlyRequiredFields.email, UserIF.corpAdminOnlyRequiredFields.firstName, UserIF.corpAdminOnlyRequiredFields.lastName,
      `${UserIF.corpAdminOnlyRequiredFields.firstName} ${UserIF.corpAdminOnlyRequiredFields.lastName}`, UserIF.corpAdminOnlyRequiredFields.dobDB,
      `+1${UserIF.corpAdminOnlyRequiredFields.phoneNumber}`, `+1${UserIF.corpAdminOnlyRequiredFields.phoneNumber}`, null,
      null, null, null, null, null);
  });

  // ----------------- C1.3 US Cardholder -------------------------------------

  it(`[C21889] US Cardholder: AspNetUsers @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C1.3 US Cardholder');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/21889');
    console.log('C1.3 - ', await UserIF.cardholder1_3.email);
    await browser.url(URLs.USAPortalURL);
    const filename = 'batchCardUpload' + RandomGenerator.numbers(5);
    await cardsPage.generateXlsxFileWithCustomCardData(await UserIF.cardholder1_3.email, UserIF.cardholder1_3.firstName, UserIF.cardholder1_3.lastName,
      `${UserIF.cardholder1_3.firstName} ${UserIF.cardholder1_3.lastName}`, UserIF.cardholder1_3.birthDateDay,
      UserIF.cardholder1_3.birthDateMonth, UserIF.cardholder1_3.birthDateYear, '1', UserIF.cardholder1_3.phoneNumber, userDataIF.chAccountUS.corporate, 'No', filename);
    await signInPage.signInAsRegisteredUserUSA(userDataIF.CenttripAdminUSA, Password);
    await cardsPage.goToCardOrdersPageAndSelectCorporate(userDataIF.chAccountUS.corporate, userDataIF.chAccountUS.operAccount);
    await Actions.uploadFileForHiddenInput(`/src/testData/tmp/${filename}.xlsx`, await USAManageCardsPageElements.cardOrders.uploadFileInput);
    await Actions.waitAndClick(await USAManageCardsPageElements.cardOrders.nextButtonSelectFile);
    await (await USAManageCardsPageElements.cardOrders.successMessage).waitForDisplayed();
    await cardsPage.checkBatchCardUploadSuccess(userDataIF.adminFullName, userDataIF.chAccountUS.corporate, userDataIF.chAccountUS.operAccount, '1 card');
    await userDataInDB.userExistsAspNetUsersDB(await UserIF.cardholder1_3.email, UserIF.cardholder1_3.firstName, UserIF.cardholder1_3.lastName, UserIF.cardholder1_3.dob,
      `+1${UserIF.cardholder1_3.phoneNumber}`);
  }).timeout(300000);

  it(`[C22028] US Cardholder: US identity @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C1.3 US Cardholder');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22028');
    await userDataInDB.userExistsIdentityUS(await UserIF.cardholder1_3.email, UserIF.cardholder1_3.firstName, UserIF.cardholder1_3.lastName,
      UserIF.cardholder1_3.dob, `+1${UserIF.cardholder1_3.phoneNumber}`, null, null, null, null, null, null, null, null, null, null);
  });

  it(`[C22029] US Cardholder: SalesForce @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C1.3 US Cardholder');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22029');
    const contactsData = await Salesforce.getContactsByEmail(await UserIF.cardholder1_3.email);
    await Salesforce.checkContactDataInSalesforce(contactsData, await UserIF.cardholder1_3.email, salesforceData.standardRecordTypeId,
      UserIF.cardholder1_3.firstName, UserIF.cardholder1_3.lastName, 'USD', true, false, false);
  });

  it(`[C30435] US Cardholder: Unique identity @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C1.3 US Cardholder');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30435');
    await userDataInDB.userExistsUniqueIdentityv2(await UserIF.cardholder1_3.email, UserIF.cardholder1_3.firstName, UserIF.cardholder1_3.lastName,
      `${UserIF.cardholder1_3.firstName} ${UserIF.cardholder1_3.lastName}`, UserIF.cardholder1_3.dob,
      `+1${UserIF.cardholder1_3.phoneNumber}`, `+1${UserIF.cardholder1_3.phoneNumber}`, null,
      null, null, null, null, null);
  });
  
  // ----------------- C1.4 US Corporate Admin > US Cardholder -------------------------------------

  it(`[C37790] US Corporate Admin > US Cardholder: AspNetUsers @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C1.4 US Corporate Admin > US Cardholder');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37790');
    console.log('C1.4 - ', await UserIF.corpAdmin1_4.email);
    // Create Admin US to Tesla
    const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
    await createUserPage.createUserFullAPI(await UserIF.corpAdmin1_4.email, token, 'CorporateAdmin',
      UserIF.corpAdmin1_4.firstName, UserIF.corpAdmin1_4.lastName, UserIF.corpAdmin1_4.dob,
      UserIF.corpAdmin1_4.gender, `+1${UserIF.corpAdmin1_4.phoneNumber}`, UserIF.corpAdmin1_4.street,
      UserIF.corpAdmin1_4.postalCode, UserIF.corpAdmin1_4.city, 'US', UserIF.corpAdmin1_4.state);
    // Create Cardholder US 
    await browser.url(URLs.USAPortalURL);
    await signInPage.signInAsRegisteredUserUSA(userDataIF.CenttripAdminUSA, Password);
    const filename = 'batchCardUpload' + RandomGenerator.numbers(4);
    await cardsPage.generateXlsxFileWithCustomCardData(await UserIF.corpAdmin1_4.email, UserIF.cardholder4.firstName, UserIF.cardholder4.lastName, `${UserIF.cardholder4.firstName} ${UserIF.cardholder4.lastName} `,
      UserIF.cardholder4.birthDateDay, UserIF.cardholder4.birthDateMonth, UserIF.cardholder4.birthDateYear, '1', UserIF.cardholder4.phoneNumber, 
      userDataIF.chAccountUS.corporate, 'No', filename);
    console.log('email', await UserIF.corpAdmin1_4.email);
    await cardsPage.goToCardOrdersPageAndSelectCorporate(userDataIF.chAccountUS.corporate, userDataIF.chAccountUS.operAccount);
    await Actions.uploadFileForHiddenInput(`/src/testData/tmp/${filename}.xlsx`, await USAManageCardsPageElements.cardOrders.uploadFileInput);
    await Actions.waitAndClick(await USAManageCardsPageElements.cardOrders.nextButtonSelectFile);
    await (await USAManageCardsPageElements.cardOrders.successMessage).waitForDisplayed();
    await cardsPage.checkBatchCardUploadSuccess(userDataIF.adminFullName, userDataIF.chAccountUS.corporate, userDataIF.chAccountUS.operAccount, '1 card');
    await userDataInDB.userExistsAspNetUsersDB(await UserIF.corpAdmin1_4.email, UserIF.corpAdmin1_4.firstName, UserIF.corpAdmin1_4.lastName, UserIF.corpAdmin1_4.dobDB,
      `+1${UserIF.corpAdmin1_4.phoneNumber}`);
  }).timeout(300000);

  it(`[C37791] US Corporate Admin > US Cardholder: US identity @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C1.4 US Corporate Admin > US Cardholder');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37791');
    await userDataInDB.userExistsIdentityUS(await UserIF.corpAdmin1_4.email, UserIF.corpAdmin1_4.firstName, UserIF.corpAdmin1_4.lastName, UserIF.corpAdmin1_4.dobDB,
      `+1${UserIF.corpAdmin1_4.phoneNumber}`, UserIF.corpAdmin1_4.gender, '', UserIF.corpAdmin1_4.street, null, null,
      UserIF.corpAdmin1_4.state, UserIF.corpAdmin1_4.city, null, UserIF.corpAdmin1_4.postalCode, 840);
  });

  it(`[C37792] US Corporate Admin > US Cardholder: SalesForce @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C1.4 US Corporate Admin > US Cardholder');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37792');
    const contactsData = await Salesforce.getContactsByEmail(await UserIF.corpAdmin1_4.email);
    await Salesforce.checkContactDataInSalesforce(contactsData, await UserIF.corpAdmin1_4.email, salesforceData.standardRecordTypeId,
      UserIF.corpAdmin1_4.firstName, UserIF.corpAdmin1_4.lastName, 'USD',
      true, true, false);
  });

  it(`[C37793] US Corporate Admin > US Cardholder: Unique Identity @smoke`, async () => {
    AllureReporter.addSeverity('normal');
    AllureReporter.addStory('C1.4 US Corporate Admin > US Cardholder');
    AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37793');
    await userDataInDB.userExistsUniqueIdentityv2(await UserIF.corpAdmin1_4.email, UserIF.corpAdmin1_4.firstName, UserIF.corpAdmin1_4.lastName,
      `${UserIF.corpAdmin1_4.firstName} ${UserIF.corpAdmin1_4.lastName}`, UserIF.corpAdmin1_4.dobDB,
      `+1${UserIF.corpAdmin1_4.phoneNumber}`, `+1${UserIF.corpAdmin1_4.phoneNumber}`, UserIF.corpAdmin1_4.street, null,
      UserIF.corpAdmin1_4.city, UserIF.corpAdmin1_4.state, UserIF.corpAdmin1_4.postalCode, UserIF.countryUSA);
  });

});
