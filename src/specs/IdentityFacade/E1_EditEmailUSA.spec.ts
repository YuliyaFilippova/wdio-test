import { Other } from '../../core/utils/other';
import { LoginAPICall } from '../../core/utils/loginAPICall';
import { RandomGenerator } from '../../core/utils/randomGenerator';
import { Salesforce } from '../../core/pages/externalServices/salesforce';
import { salesforceData } from '../../testData/other';
import AllureReporter from '@wdio/allure-reporter';
import { createUserPage } from '../../core/pages/centtripUSA/createUser';
import { userDataInDB } from '../../core/pages/userDataInDB';
import userDataIF, { Password, UserIF } from '../../testData/usersData';
import ping from '../../connections'

describe(`Identity Facade >> E1 - Edit email for USA users`, () => {

    const emailuser1_1 = RandomGenerator.generateRandEmail('_e1.1@harakirimail.com');
    const emailuser1_1_edited = RandomGenerator.generateRandEmail('_e1.1e@harakirimail.com');

    const corpAdminAllFields = {
        firstName: 'FirstUSAA' + RandomGenerator.lowerCaseText(3),
        lastName: 'LastUSAA' + RandomGenerator.lowerCaseText(3),
        gender: 'Male',
        city: 'CityUSAA',
        street: 'StreetUSAA',
        postalCode: '10001',
        phoneNumber: '2243359185',
        state: 'California',
        dobDB: 'Tue Jan 01 1980',
        dobAPI: '1980-01-01T00:00:00',
        dob: '01/01/1980'
    };

    before(async () => {
        if (!ping.connectionUSA._connectCalled) {
            await ping.connectionUSA.connect();
        }
    });

    beforeEach(async () => {
        AllureReporter.addFeature('Edit email - USA');
        await Other.deleteCacheCookiesUSA();
    });

    afterEach(async () => {
        await Other.deleteCacheCookiesUSA();
    });

    // ---------- E1.1 US Corporate Admin - Edit email -------------------------------

    it(`[C37756] US Corporate Admin - Edit email: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E1.1 US Corporate Admin - Edit email');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37756');
        console.log('E1.1 - ', await emailuser1_1);
        console.log('E1.1 - ', await emailuser1_1_edited);
        const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
        await createUserPage.createUserFullAPI(await emailuser1_1, token, 'CorporateAdmin', corpAdminAllFields.firstName, corpAdminAllFields.lastName,
            corpAdminAllFields.dobAPI, corpAdminAllFields.gender, `+1${corpAdminAllFields.phoneNumber}`, corpAdminAllFields.street, corpAdminAllFields.postalCode,
            corpAdminAllFields.city, UserIF.countryUSA, corpAdminAllFields.state);
        const identityUserRefId = await userDataInDB.getUserIdFromAspNetUsersDB(await emailuser1_1);
        await createUserPage.editUserFullAPI(await emailuser1_1_edited, token, corpAdminAllFields.firstName, corpAdminAllFields.lastName,
            corpAdminAllFields.dobAPI, corpAdminAllFields.gender, `+1${corpAdminAllFields.phoneNumber}`, corpAdminAllFields.postalCode,
            UserIF.countryUSA, corpAdminAllFields.state, corpAdminAllFields.city, corpAdminAllFields.street, identityUserRefId);
        await userDataInDB.userNotExistsAspNetUsersDB(await emailuser1_1);
        await userDataInDB.userExistsAspNetUsersDB(await emailuser1_1_edited, corpAdminAllFields.firstName, corpAdminAllFields.lastName, corpAdminAllFields.dobDB,
            `+1${corpAdminAllFields.phoneNumber}`);
    });

    it(`[C37758] US Corporate Admin - Edit email: US identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E1.1 US Corporate Admin - Edit email');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37758');
        await userDataInDB.userNotExistsIdentityUS(await emailuser1_1);
        await userDataInDB.userExistsIdentityUS(await emailuser1_1_edited, corpAdminAllFields.firstName, corpAdminAllFields.lastName, corpAdminAllFields.dobDB,
            `+1${corpAdminAllFields.phoneNumber}`, corpAdminAllFields.gender, '', corpAdminAllFields.street, null, null, corpAdminAllFields.state, corpAdminAllFields.city, null,
            corpAdminAllFields.postalCode, 840);
    });

    it(`[C37760] US Corporate Admin - Edit email: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E1.1 US Corporate Admin - Edit email');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37760');
        await Salesforce.checkThatContactNotExist(await emailuser1_1);
        const contactsData = await Salesforce.getContactsByEmail(await emailuser1_1_edited);
        await Salesforce.checkContactDataInSalesforce(contactsData, await emailuser1_1_edited, salesforceData.standardRecordTypeId, corpAdminAllFields.firstName,
            corpAdminAllFields.lastName, 'USD', false, true, false);
    });

    it(`[C37761] US Corporate Admin - Edit email: Unique Identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E1.1 US Corporate Admin - Edit email');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37761');
        await userDataInDB.userNotExistsUniqueIdentityv2(await emailuser1_1);
        await userDataInDB.userExistsUniqueIdentityv2(await emailuser1_1_edited, corpAdminAllFields.firstName, corpAdminAllFields.lastName,
            `${corpAdminAllFields.firstName} ${corpAdminAllFields.lastName}`, corpAdminAllFields.dobDB,
            `+1${corpAdminAllFields.phoneNumber}`, `+1${corpAdminAllFields.phoneNumber}`, corpAdminAllFields.street, null,
            corpAdminAllFields.city, corpAdminAllFields.state, corpAdminAllFields.postalCode, UserIF.countryUSA);
    });

});