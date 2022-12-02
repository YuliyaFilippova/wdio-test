import { Other } from '../../core/utils/other';
import { LoginAPICall } from '../../core/utils/loginAPICall';
import { RandomGenerator } from '../../core/utils/randomGenerator';
import { Salesforce } from '../../core/pages/externalServices/salesforce';
import { salesforceData } from '../../testData/other';
import { signInPageElements, UKCardMigrationPageElements } from '../../core/pages/locators';
import { Actions } from '../../core/utils/actions';
import AllureReporter from '@wdio/allure-reporter';
import { createUserPage } from '../../core/pages/centtripUSA/createUser';
import { URLs } from '../../urls';
import userDataIF, { Password, pathToUploadPfsCardCreation, UserIF } from '../../testData/usersData';
import { commonPageUK } from '../../core/pages/centtripUK/commonUK';
import { userDataInDB } from '../../core/pages/userDataInDB';
import { signInPage } from '../../core/pages/centtripAppWeb/signInPage';
import { createUserPageUK } from '../../core/pages/centtripUK/createUserUK';
import { cardMigrationPage } from '../../core/pages/centtripUK/cardMigrationPage';
import ping from '../../connections'

describe(`Identity Facade >> E3 - Edit email for All Regions users`, () => {

    const emailuser3_1 = RandomGenerator.generateRandEmail('_e3.1@harakirimail.com');
    const emailuser3_1_edited = RandomGenerator.generateRandEmail('_e3.1e@harakirimail.com');
    const emailuser3_2 = RandomGenerator.generateRandEmail('_e3.2@harakirimail.com');
    const emailuser3_2_edited = RandomGenerator.generateRandEmail('_e3.2e@harakirimail.com');
    const emailuser3_3 = RandomGenerator.generateRandEmail('_e3.3@harakirimail.com');
    const emailuser3_3_edited = RandomGenerator.generateRandEmail('_e3.3e@harakirimail.com');
    const emailuser3_4 = RandomGenerator.generateRandEmail('_e3.4@harakirimail.com');
    const emailuser3_4_edited = RandomGenerator.generateRandEmail('_e3.4e@harakirimail.com');

    before(async () => {
        if (!ping.connectionUSA._connectCalled) {
            await ping.connectionUSA.connect();
        }
        if (!ping.connection._connectCalled) {
            await ping.connection.connect();
        }
    });

    beforeEach(async () => {
        AllureReporter.addFeature('Edit phone number in My details - All Regions');
        await Other.deleteCacheCookiesUSA();
        await Other.deleteCacheCookiesUK();
    });

    afterEach(async () => {
        await Other.deleteCacheCookiesUSA();
        await Other.deleteCacheCookiesUK();
    });

    // ---------------- E3.1 Corporate Admin: US > UK - US Edit email -------------------------------  

    it(`[C21987] Corporate Admin: US > UK - US Edit email: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.1 Corporate Admin: US > UK - US Edit email');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/21987');
        console.log('E3.1 - ', await emailuser3_1);
        console.log('E3.1 - ', await emailuser3_1_edited);
        // Create user in US
        const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
        await createUserPage.createUserFullAPI(await emailuser3_1, token, 'CorporateAdmin', UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
            UserIF.corpAdminAllFields.dob, UserIF.corpAdminAllFields.gender, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.street,
            UserIF.corpAdminAllFields.postalCode, UserIF.corpAdminAllFields.city, 'US', UserIF.corpAdminAllFields.state);
        // Create user in UK
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('corporateAdmin', await emailuser3_1, userDataIF.accountUK, UserIF.corpAdminUK.title, UserIF.corpAdminUK.gender,
            UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.postalCode, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2,
            UserIF.corpAdminUK.city, UserIF.countryUK, UserIF.phoneCodeUK, UserIF.phoneCodeUK, UserIF.corpAdminUK.phoneNumber, UserIF.corpAdminUK.homeNumber,
            UserIF.corpAdminUK.dob);
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        // edit user in US (email)
        const identityUserRefId = await userDataInDB.getUserIdFromAspNetUsersDB(await emailuser3_1);
        await createUserPage.editUserFullAPI(await emailuser3_1_edited, token, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
            UserIF.corpAdminUK.dobAPI, UserIF.corpAdminUK.gender, `+44${UserIF.corpAdminUK.phoneNumber}`, UserIF.corpAdminUK.postalCode,
            'GB', '', UserIF.corpAdminUK.city, UserIF.corpAdminUK.address1, identityUserRefId);
        // check in AspNetUsers
        await userDataInDB.userNotExistsAspNetUsersDB(await emailuser3_1);
        await userDataInDB.userExistsAspNetUsersDB(await emailuser3_1_edited, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, 
            UserIF.corpAdminUK.dobDB, `+44${UserIF.corpAdminUK.phoneNumber}`);
    }).timeout(5000000);

    it(`[C22153] Corporate Admin: US > UK - US Edit email: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.1 Corporate Admin: US > UK - US Edit email');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22153');
        await userDataInDB.userNotExistsIdentityUK(await emailuser3_1);
        const addressArray = [UserIF.corpAdminUK.address1, UserIF.corpAdminUK.city, 'GB', UserIF.corpAdminUK.postalCode];
        await userDataInDB.userExistsIdentityUK(await emailuser3_1_edited, null, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
            UserIF.corpAdminUK.dobDB, `+44${UserIF.corpAdminUK.phoneNumber}`, null, addressArray);
    });

    it(`[C22154] Corporate Admin: US > UK - US Edit email: US identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.1 Corporate Admin: US > UK - US Edit email');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22154');
        await userDataInDB.userNotExistsIdentityUS(await emailuser3_1);
        await userDataInDB.userExistsIdentityUS(await emailuser3_1_edited, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.dobDB,
            `+44${UserIF.corpAdminUK.phoneNumber}`, UserIF.corpAdminUK.gender, '', UserIF.corpAdminUK.address1, null, null, '',
            UserIF.corpAdminUK.city, null, UserIF.corpAdminUK.postalCode, 826);
    });

    xit(`[C22155] Corporate Admin: US > UK - US Edit email: DynamoDb @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.1 Corporate Admin: US > UK - US Edit email');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22155');
        await userDataInDB.userNotExistInDynamoDB(await emailuser3_1);
        await userDataInDB.userExistsInDynamoDB(await emailuser3_1_edited, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.gender,
            undefined, UserIF.corpAdminUK.dob, UserIF.countryUK, 'GB', UserIF.corpAdminUK.postalCode, undefined, UserIF.corpAdminUK.city,
            UserIF.corpAdminUK.address1, undefined, '  ', undefined, `+44${UserIF.corpAdminUK.phoneNumber}`, `+44${UserIF.corpAdminUK.phoneNumber}`);
    });

    it(`[C22156] Corporate Admin: US > UK - US Edit email: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.1 Corporate Admin: US > UK - US Edit email');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22156');
        await Salesforce.checkThatContactNotExist(await emailuser3_1);
        const contactsData = await Salesforce.getContactsByEmail(await emailuser3_1_edited);
        await Salesforce.checkContactDataInSalesforce(contactsData, await emailuser3_1_edited, salesforceData.standardRecordTypeId, UserIF.corpAdminUK.firstName,
            UserIF.corpAdminUK.lastName, 'GBP', false, true, false);
    });

    it(`[C30458] Corporate Admin: US > UK - US Edit email: Unique Identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.1 Corporate Admin: US > UK - US Edit email');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30455');
        await userDataInDB.userNotExistsUniqueIdentityv2(await emailuser3_1);
        await userDataInDB.userExistsUniqueIdentityv2(await emailuser3_1_edited, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
            `${UserIF.corpAdminUK.firstName} ${UserIF.corpAdminUK.lastName}`, UserIF.corpAdminUK.dobDB,
            `+44${UserIF.corpAdminUK.phoneNumber}`, `+44${UserIF.corpAdminUK.phoneNumber}`, UserIF.corpAdminUK.address1, null,
            UserIF.corpAdminUK.city, '', UserIF.corpAdminUK.postalCode, UserIF.countryUK);
    });

    // ------------ E3.2 UK Cardholder > US - US Edit email --------------------------------- 

    it(`[C21900] UK Cardholder > US - US Edit email: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.2 UK Cardholder > US - US Edit email');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/21900');
        console.log('E3.2 - ', await emailuser3_2);
        console.log('E3.2 - ', await emailuser3_2_edited);
        // Create Carholder UK
        const fileName = await cardMigrationPage.generateBatchFile(await emailuser3_2, process.env.ENV);
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
        // Create Admin in US
        const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
        await createUserPage.createUserFullAPI(await emailuser3_2, token, 'CorporateAdmin', UserIF.corpAdmin1_4.firstName, UserIF.corpAdmin1_4.lastName,
            UserIF.corpAdmin1_4.dob, UserIF.corpAdmin1_4.gender, `+1${UserIF.corpAdmin1_4.phoneNumber}`, UserIF.corpAdmin1_4.street,
            UserIF.corpAdmin1_4.postalCode, UserIF.corpAdmin1_4.city, 'US', UserIF.corpAdmin1_4.state);
        // edit user in US (email)
        const identityUserRefId = await userDataInDB.getUserIdFromAspNetUsersDB(await emailuser3_2);
        await createUserPage.editUserFullAPI(await emailuser3_2_edited, token, UserIF.corpAdminEdited.firstName, UserIF.corpAdminEdited.lastName,
            UserIF.corpAdminEdited.dob, UserIF.corpAdminEdited.gender, `+1${UserIF.corpAdminEdited.phoneNumber}`, UserIF.corpAdminEdited.postalCode,
            'GB', UserIF.corpAdminEdited.state, UserIF.corpAdminEdited.city, UserIF.corpAdminEdited.street, identityUserRefId);
        // check in AspNetUsers
        await userDataInDB.userNotExistsAspNetUsersDB(await emailuser3_2);
        await userDataInDB.userExistsAspNetUsersDB(await emailuser3_2_edited, UserIF.corpAdminEdited.firstName, UserIF.corpAdminEdited.lastName, 
            UserIF.corpAdminEdited.dobDB, `+1${UserIF.corpAdminEdited.phoneNumber}`);
    }).timeout(8000000);

    it(`[C22165] UK Cardholder > US - US Edit email: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.2 UK Cardholder > US - US Edit email');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22165');
        await userDataInDB.userNotExistsIdentityUK(await emailuser3_2);
        const addressArray = [UserIF.corpAdminEdited.street, UserIF.corpAdminEdited.city, 'GB', UserIF.corpAdminEdited.postalCode];
        await userDataInDB.userExistsIdentityUK(await emailuser3_2_edited, null, UserIF.corpAdminEdited.firstName, UserIF.corpAdminEdited.lastName,
            UserIF.corpAdminEdited.dobDB, `+1${UserIF.corpAdminEdited.phoneNumber}`, null, addressArray);
    });

    it(`[C22166] UK Cardholder > US - US Edit email: MSSQL @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.2 UK Cardholder > US - US Edit email');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22166');
        await userDataInDB.userNotExistInMSSQLDB(await emailuser3_2);
        await userDataInDB.userExistInMSSQLDB(await emailuser3_2_edited);
    });

    it(`[C22167] UK Cardholder > US - US Edit email: US identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.2 UK Cardholder > US - US Edit email');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22167');
        await userDataInDB.userNotExistsIdentityUS(await emailuser3_2);
        await userDataInDB.userExistsIdentityUS(await emailuser3_2_edited, UserIF.corpAdminEdited.firstName, UserIF.corpAdminEdited.lastName, UserIF.corpAdminEdited.dobDB,
            `+1${UserIF.corpAdminEdited.phoneNumber}`, UserIF.corpAdminEdited.gender, '', UserIF.corpAdminEdited.street, null, null, UserIF.corpAdminEdited.state, UserIF.corpAdminEdited.city,
            null, UserIF.corpAdminEdited.postalCode, 826);
    });

    xit(`[C22168] UK Cardholder > US - US Edit email: DynamoDb @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.2 UK Cardholder > US - US Edit email');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22168');
        await userDataInDB.userNotExistInDynamoDB(await emailuser3_2);
        await userDataInDB.userExistsInDynamoDB(await emailuser3_2_edited, UserIF.corpAdminEdited.firstName, UserIF.corpAdminEdited.lastName, UserIF.corpAdminEdited.gender,
            undefined, UserIF.corpAdminEdited.dobDynamo, UserIF.countryUK, 'GB', UserIF.corpAdminEdited.postalCode, UserIF.corpAdminEdited.state, UserIF.corpAdminEdited.city,
            UserIF.corpAdminEdited.street, undefined, '  ', undefined, `+1${UserIF.corpAdminEdited.phoneNumber}`, `+1${UserIF.corpAdminEdited.phoneNumber}`);
    });

    it(`[C22169] UK Cardholder > US - US Edit email: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.2 UK Cardholder > US - US Edit email');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22169');
        AllureReporter.addIssue('https://centtrip.atlassian.net/browse/CEN-6908');
        AllureReporter.addIssue('https://centtrip.atlassian.net/browse/CEN-7243');
        AllureReporter.addIssue('https://centtrip.atlassian.net/browse/CEN-6909');
        await Salesforce.checkThatContactNotExist(await emailuser3_2);
        const contactsData = await Salesforce.getContactsByEmail(await emailuser3_2_edited);
        await Salesforce.checkContactDataInSalesforce(contactsData, await emailuser3_2_edited, salesforceData.standardRecordTypeId, UserIF.corpAdminEdited.firstName,
            UserIF.corpAdminEdited.lastName, 'USD', false, true, false);
    });

    it(`[C30462] UK Cardholder > US - US Edit email: Unique Identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.2 UK Cardholder > US - US Edit email');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30462');
        await userDataInDB.userNotExistsUniqueIdentityv2(await emailuser3_2);
        await userDataInDB.userExistsUniqueIdentityv2(await emailuser3_2_edited, UserIF.corpAdminEdited.firstName, UserIF.corpAdminEdited.lastName,
            `${UserIF.corpAdminEdited.firstName} ${UserIF.corpAdminEdited.lastName}`, UserIF.corpAdminEdited.dobDB,
            `+1${UserIF.corpAdminEdited.phoneNumber}`, `+1${UserIF.corpAdminEdited.phoneNumber}`, UserIF.corpAdminEdited.street, null,
            UserIF.corpAdminEdited.city, UserIF.corpAdminEdited.state, UserIF.corpAdminEdited.postalCode, UserIF.countryUK);
    });

    // ------------ E3.3 Corporate Admin: UK > US - UK Edit email under Centtrip Admin --------------------------------- 

    it(`[C24366] Corporate Admin: UK > US - UK Edit email under Centtrip Admin: AspNetUsers  @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.3 Corporate Admin: UK > US - UK Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24366');
        console.log('E3.3 - ', await emailuser3_3);
        console.log('E3.3 - ', await emailuser3_3_edited);
        // Create user in UK
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('corporateAdmin', await emailuser3_3, userDataIF.accountUK, UserIF.corpAdminUK.title, UserIF.corpAdminUK.gender,
            UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.postalCode, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2,
            UserIF.corpAdminUK.city, UserIF.countryUK, UserIF.phoneCodeUK, UserIF.phoneCodeUK, UserIF.corpAdminUK.phoneNumber, UserIF.corpAdminUK.homeNumber,
            UserIF.corpAdminUK.dob);
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        // Create user in US
        const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
        await createUserPage.createUserFullAPI(await emailuser3_3, token, 'CorporateAdmin', UserIF.corpAdminAllFields.firstName,
            UserIF.corpAdminAllFields.lastName, UserIF.corpAdminAllFields.dob, UserIF.corpAdminAllFields.gender, `+1${UserIF.corpAdminAllFields.phoneNumber}`,
            UserIF.corpAdminAllFields.street, UserIF.corpAdminAllFields.postalCode, UserIF.corpAdminAllFields.city, 'US', UserIF.corpAdminAllFields.state);
        // Edit email in UK
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await browser.pause(2000);
        await createUserPageUK.updateAccountEmail(await emailuser3_3, await emailuser3_3_edited);
        await commonPageUK.logoutFromUK();
        await userDataInDB.userNotExistsAspNetUsersDB(await emailuser3_3);
        await userDataInDB.userExistsAspNetUsersDB(await emailuser3_3_edited, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
            UserIF.corpAdminAllFields.dobDB, `+1${UserIF.corpAdminAllFields.phoneNumber}`);
    }).timeout(6000000);

    it(`[C24367] Corporate Admin: UK > US - UK Edit email under Centtrip Admin: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.3 Corporate Admin: UK > US - UK Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24367');
        await userDataInDB.userNotExistsIdentityUK(await emailuser3_3);
        const addressArray = [UserIF.corpAdminAllFields.street, UserIF.corpAdminAllFields.city, 'US', UserIF.corpAdminAllFields.postalCode];
        await userDataInDB.userExistsIdentityUK(await emailuser3_3_edited, null, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
            UserIF.corpAdminAllFields.dobDB, `+1${UserIF.corpAdminAllFields.phoneNumber}`, null, addressArray);
    });

    it(`[C24368] Corporate Admin: UK > US - UK Edit email under Centtrip Admin: US identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.3 Corporate Admin: UK > US - UK Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24368');
        await userDataInDB.userNotExistsIdentityUS(await emailuser3_3);
        await userDataInDB.userExistsIdentityUS(await emailuser3_3_edited, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
            UserIF.corpAdminAllFields.dobDB, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.gender, '', UserIF.corpAdminAllFields.street,
            null, null, UserIF.corpAdminAllFields.state, UserIF.corpAdminAllFields.city, null, UserIF.corpAdminAllFields.postalCode, 840);
    });

    xit(`[C24369] Corporate Admin: UK > US - UK Edit email under Centtrip Admin: DynamoDb @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.3 Corporate Admin: UK > US - UK Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24369');
        await userDataInDB.userNotExistInDynamoDB(await emailuser3_3);
        await userDataInDB.userExistsInDynamoDB(await emailuser3_3_edited, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName, UserIF.corpAdminAllFields.gender,
            undefined, UserIF.corpAdminAllFields.dobDynamo, UserIF.countryUSA, 'US', UserIF.corpAdminAllFields.postalCode, UserIF.corpAdminAllFields.state, UserIF.corpAdminAllFields.city,
            UserIF.corpAdminAllFields.street, undefined, '  ', undefined, `+1${UserIF.corpAdminAllFields.phoneNumber}`, `+1${UserIF.corpAdminAllFields.phoneNumber}`);
    });

    //need to update according CEN-7623
    it(`[C24370] Corporate Admin: UK > US - UK Edit email under Centtrip Admin: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.3 Corporate Admin: UK > US - UK Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24370');
        await Salesforce.checkThatContactNotExist(await emailuser3_3);
        const contactsData = await Salesforce.getContactsByEmail(await emailuser3_3_edited);
        await Salesforce.checkContactDataInSalesforce(contactsData, await emailuser3_3_edited, salesforceData.standardRecordTypeId, UserIF.corpAdminAllFields.firstName,
            UserIF.corpAdminAllFields.lastName, 'USD', false, true, false);
    });

    it(`[C30463] Corporate Admin: UK > US - UK Edit email under Centtrip Admin: Unique identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.3 Corporate Admin: UK > US - UK Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30463');
        await userDataInDB.userNotExistsUniqueIdentityv2(await emailuser3_3);
        await userDataInDB.userExistsUniqueIdentityv2(await emailuser3_3_edited, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
            `${UserIF.corpAdminAllFields.firstName} ${UserIF.corpAdminAllFields.lastName}`, UserIF.corpAdminAllFields.dobDB,
            `+1${UserIF.corpAdminAllFields.phoneNumber}`, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.street, null,
            UserIF.corpAdminAllFields.city, UserIF.corpAdminAllFields.state, UserIF.corpAdminAllFields.postalCode, UserIF.countryUSA);
    });

    // ------------ E3.4 UK Cardholder > US - UK Edit email under Centtrip Admin --------------------------------- 

    it(`[C24371] UK Cardholder > US - UK Edit email under Centtrip Admin: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.4 UK Cardholder > US - UK Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24371');
        console.log('E3.4 - ', await emailuser3_4);
        console.log('E3.4 - ', await emailuser3_4_edited);
        // Create Cardholder UK
        const fileName = await cardMigrationPage.generateBatchFile(await emailuser3_4, process.env.ENV);
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
        await Other.deleteCacheCookiesUK();
        // Create Admin in US
        const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
        await createUserPage.createUserFullAPI(await emailuser3_4, token, 'CorporateAdmin', UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
            UserIF.corpAdminAllFields.dob, UserIF.corpAdminAllFields.gender, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.street,
            UserIF.corpAdminAllFields.postalCode, UserIF.corpAdminAllFields.city, 'US', UserIF.corpAdminAllFields.state);
        // Edit user in UK (email)
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await browser.pause(2000);
        await createUserPageUK.updateAccountEmail(await emailuser3_4, await emailuser3_4_edited);
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        await userDataInDB.userNotExistsAspNetUsersDB(await emailuser3_4);
        await userDataInDB.userExistsAspNetUsersDB(await emailuser3_4_edited, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
            UserIF.corpAdminAllFields.dobDB, `+1${UserIF.corpAdminAllFields.phoneNumber}`);
    }).timeout(8000000);

    it(`[C24372] UK Cardholder > US - UK Edit email under Centtrip Admin: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.4 UK Cardholder > US - UK Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24372');
        await userDataInDB.userNotExistsIdentityUK(await emailuser3_4);
        const addressArray = [UserIF.corpAdminAllFields.street, UserIF.corpAdminAllFields.city, 'US', UserIF.corpAdminAllFields.postalCode];
        await userDataInDB.userExistsIdentityUK(await emailuser3_4_edited, null, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
            UserIF.corpAdminAllFields.dobDB, `+1${UserIF.corpAdminAllFields.phoneNumber}`, null, addressArray);
    });

    it(`[C24373] UK Cardholder > US - UK Edit email under Centtrip Admin: UK MSSQL @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.4 UK Cardholder > US - UK Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24373');
        await userDataInDB.userNotExistInMSSQLDB(await emailuser3_4);
        await userDataInDB.userExistInMSSQLDB(await emailuser3_4_edited);
    });

    it(`[C24374] UK Cardholder > US - UK Edit email under Centtrip Admin: US identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.4 UK Cardholder > US - UK Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24374');
        await userDataInDB.userNotExistsIdentityUS(await emailuser3_4);
        await userDataInDB.userExistsIdentityUS(await emailuser3_4_edited, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
            UserIF.corpAdminAllFields.dobDB, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.gender, '', UserIF.corpAdminAllFields.street,
            null, null, UserIF.corpAdminAllFields.state, UserIF.corpAdminAllFields.city, null, UserIF.corpAdminAllFields.postalCode, 840);
    });

    xit(`[C24375] UK Cardholder > US - UK Edit email under Centtrip Admin: DynamoDb @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.4 UK Cardholder > US - UK Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24375');
        await userDataInDB.userNotExistInDynamoDB(await emailuser3_4);
        await userDataInDB.userExistsInDynamoDB(await emailuser3_4_edited, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName, UserIF.corpAdminAllFields.gender,
            undefined, UserIF.corpAdminAllFields.dobDynamo, UserIF.countryUSA, 'US', UserIF.corpAdminAllFields.postalCode, UserIF.corpAdminAllFields.state, UserIF.corpAdminAllFields.city,
            UserIF.corpAdminAllFields.street, undefined, '  ', undefined, `+1${UserIF.corpAdminAllFields.phoneNumber}`, `+1${UserIF.corpAdminAllFields.phoneNumber}`);
    });

    it(`[C24376] UK Cardholder > US - UK Edit email under Centtrip Admin: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.4 UK Cardholder > US - UK Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/24376');
        await Salesforce.checkThatContactNotExist(await emailuser3_4);
        const contactsData = await Salesforce.getContactsByEmail(await emailuser3_4_edited);
        await Salesforce.checkContactDataInSalesforce(contactsData, await emailuser3_4_edited, salesforceData.standardRecordTypeId, UserIF.corpAdminEdited.firstName,
            UserIF.corpAdminEdited.lastName, 'USD', false, true, false);
    });

    it(`[C30464] UK Cardholder > US - UK Edit email under Centtrip Admin: Unique Identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('E3.4 UK Cardholder > US - UK Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30464');
        await userDataInDB.userNotExistsUniqueIdentityv2(await emailuser3_4);
        await userDataInDB.userExistsUniqueIdentityv2(await emailuser3_4_edited, UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
            `${UserIF.corpAdminAllFields.firstName} ${UserIF.corpAdminAllFields.lastName}`, UserIF.corpAdminAllFields.dobDB,
            `+1${UserIF.corpAdminAllFields.phoneNumber}`, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.street, null,
            UserIF.corpAdminAllFields.city, UserIF.corpAdminAllFields.state, UserIF.corpAdminAllFields.postalCode, UserIF.countryUSA);
    });
});