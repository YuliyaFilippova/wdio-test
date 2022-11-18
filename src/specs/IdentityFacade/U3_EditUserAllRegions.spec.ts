import { createUserPage } from '../../core/pages/centtripUSA/createUser';
import { createUserPageUK } from '../../core/pages/centtripUK/createUserUK';
import { commonPageUK } from '../../core/pages/centtripUK/commonUK';
import { cardMigrationPage } from '../../core/pages/centtripUK/cardMigrationPage';
import { salesforceData } from '../../testData/other';
import { RandomGenerator } from '../../core/utils/randomGenerator';
import { signInPage } from '../../core/pages/centtripAppWeb/signInPage';
import { Salesforce } from '../../core/pages/externalServices/salesforce';
import { general, signInPageElements, UKCardMigrationPageElements, UKCreateUserPageElements, UKGeneralElements } from '../../core/pages/locators';
import { Actions } from '../../core/utils/actions';
import { LoginAPICall } from '../../core/utils/loginAPICall';
import { Other } from '../../core/utils/other';
import { UserIF } from '../../testData/usersData';
import { userDataInDB } from '../../core/pages/userDataInDB';
import AllureReporter from '@wdio/allure-reporter';
import { pathToUploadPfsCardCreation } from '../../testData/usersData';
import { URLs } from '../../urls';
// import { connection, connectionUSA } from '../../wdio.conf';

let CredentialsIF = require('../../credentials2');
[connection, connectionUSA, configMSSQL] = require('../../connections'); 

describe(`Identity Facade >> Edit All regions users`, () => {
    const emailallu3_1 = RandomGenerator.generateRandEmail('_u3_1@harakirimail.com');
    const emailallu3_2 = RandomGenerator.generateRandEmail('_u3_2@harakirimail.com');
    const emailallu3_3 = RandomGenerator.generateRandEmail('_u3_3@harakirimail.com');
    const emailallu3_4 = RandomGenerator.generateRandEmail('_u3_4@harakirimail.com');
    const emailallu3_5 = RandomGenerator.generateRandEmail('_u3_5@harakirimail.com');
    const emailallu3_6 = RandomGenerator.generateRandEmail('_u3_6@harakirimail.com');
    const emailallu3_7 = RandomGenerator.generateRandEmail('_u3_7@harakirimail.com');

    const corpAdminUSAAllFields = {
        firstName: 'FirstUSAA' + RandomGenerator.lowerCaseText(5),
        lastName: 'LastUSAA' + RandomGenerator.lowerCaseText(5),
        gender: 'Male',
        city: 'CityUSAA',
        street: 'StreetUSAA',
        postalCode: '10001',
        phoneNumber: '2243359185',
        state: 'California',
        dob: 'Fri Jan 1 1980',
        dobFormat: '01/01/1980',
        dobAPI: '1980-01-01T00:00:00',
    };

    const corpAdminUSA3_2 = {
        firstName: 'FirstUSAH',
        lastName: 'LastUSAH',
        gender: 'Male',
        city: 'CityUSAH',
        street: 'StreetUSAH',
        postalCode: '22208',
        phoneNumber: '7883196637',
        state: 'California',
        dobDB: 'Fri Jan 8 1988',
        dobFormat: '08/01/1988',
        dobAPI: '1988-01-08T00:00:00',
    };

    const corpAdminUSAEditUK = {
        firstName: 'FirstUSAK' + RandomGenerator.lowerCaseText(5),
        lastName: 'LastUSAK' + RandomGenerator.lowerCaseText(5),
        gender: 'Female',
        city: 'CityUSAK',
        street: 'StreetUSAK',
        postalCode: '10011',
        phoneNumber: '7537120834',
        state: 'California',
        dob: 'Wed Feb 11 1981',
        dobAPI: '1981-02-11T00:00:00',
        dobDynamo: '11/02/1981',
    };

    const corpAdminUSAEditUS = {
        firstName: 'FirstUSAR' + RandomGenerator.lowerCaseText(5),
        lastName: 'LastUSAR' + RandomGenerator.lowerCaseText(5),
        gender: 'Female',
        city: 'CityUSAR',
        street: 'StreetUSAR',
        postalCode: '22218',
        phoneNumber: '5042010052',
        state: 'New York',
        dobDB: 'Thu Feb 18 1988',
        dobAPI: '1988-02-18T00:00:00',
        dob: '18/02/1988'
    };

    const corpAdminUSAEditClearAdd = {
        firstName: 'FirstUSAL' + RandomGenerator.lowerCaseText(3),
        lastName: 'LastUSAL' + RandomGenerator.lowerCaseText(3),
        gender: 'Female',
        phoneNumber: RandomGenerator.numbers(10) + '',
        dob: 'Fri Feb 12 1982',
        dobFormat: '12/02/1982',
        dobAPI: '1982-02-12T00:00:00'
    };

    const corpAdminUKEditUK = {
        firstName: 'FirstUKP' + RandomGenerator.lowerCaseText(5),
        lastName: 'LastUKP' + RandomGenerator.lowerCaseText(5),
        gender: 'Male',
        city: 'CityUKP',
        address1: 'AddLine1UKP',
        address2: 'AddLine2UKP',
        postalCode: '11116',
        phoneNumber: '7883196637',
        homeNumber: '7883196637',
        dobDB: 'Feb 16 1996',
        dob: '16/02/1996',
        dobAPI: '1996-02-16T15:00:00',
        title: 'Mr.'
    };

    const corpAdminUKEditUSA = {
        firstName: 'FirstUKQ' + RandomGenerator.lowerCaseText(5),
        lastName: 'LastUKQ' + RandomGenerator.lowerCaseText(5),
        gender: 'Male',
        city: 'CityUKQ',
        address1: 'AddLine1UKQ',
        address2: 'AddLine2UKQ',
        postalCode: '11117',
        phoneNumber: '2027953213',
        homeNumber: '2027953213',
        dobDB: 'Mon Feb 17 1997',
        dob: '17/02/1997',
        title: 'Mr.'
    };

    before(async () => {
        if (!connectionUSA._connectCalled) {
            await connectionUSA.connect();
        }
        if (!connection._connectCalled) {
            await connection.connect();
        }
    });

    beforeEach(async () => {
        AllureReporter.addFeature('Edit All regions user');
    });
    afterEach(async () => {
        await Other.deleteCacheCookiesUK();
        await Other.deleteCacheCookiesUSA();
    });

    // ---------------- U3.1 Corporate Admin: UK > US - US Edit UStoUK country --------------------------------------

    it.only(`[C19602] Corporate Admin: UK > US - US Edit UStoUK country: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.1 Corporate Admin: UK > US - US Edit UStoUK country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/19602');
        console.log('U3.1 - ', await emailallu3_1);
        // create user in UK
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(CredentialsIF.CenttripAdminiUK.Email, CredentialsIF.CenttripAdminiUK.Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('corporateAdmin', await emailallu3_1, UserIF.accountUK, UserIF.corpAdminUK.title, UserIF.corpAdminUK.gender,
            UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.postalCode, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2,
            UserIF.corpAdminUK.city, UserIF.countryUK, UserIF.phoneCodeUK, UserIF.phoneCodeUK, UserIF.corpAdminUK.phoneNumber, UserIF.corpAdminUK.homeNumber,
            UserIF.corpAdminUK.dob);
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        // create user in US
        const token = await LoginAPICall.getAccessTokenForAPI(CredentialsIF.CenttripAdminUSA.Email, CredentialsIF.CenttripAdminUSA.Password);
        await createUserPage.createUserFullAPI(await emailallu3_1, token, 'CorporateAdmin', corpAdminUSAAllFields.firstName,
            corpAdminUSAAllFields.lastName, corpAdminUSAAllFields.dobAPI, corpAdminUSAAllFields.gender, `+1${corpAdminUSAAllFields.phoneNumber}`,
            corpAdminUSAAllFields.street, corpAdminUSAAllFields.postalCode, corpAdminUSAAllFields.city, 'US', corpAdminUSAAllFields.state);
        // edit user in US
        const identityUserRefId = await userDataInDB.getUserIdFromAspNetUsersDB(await emailallu3_1);
        await createUserPage.editUserFullAPI(await emailallu3_1, token, corpAdminUSAEditUK.firstName, corpAdminUSAEditUK.lastName, corpAdminUSAEditUK.dobAPI,
            corpAdminUSAEditUK.gender, `+44${corpAdminUSAEditUK.phoneNumber}`, corpAdminUSAEditUK.postalCode, UserIF.countryUK, null, corpAdminUSAEditUK.city,
            corpAdminUSAEditUK.street, identityUserRefId);
        await userDataInDB.userExistsAspNetUsersDB(await emailallu3_1, corpAdminUSAEditUK.firstName, corpAdminUSAEditUK.lastName, corpAdminUSAEditUK.dob,
            `+44${corpAdminUSAEditUK.phoneNumber}`);
    }).timeout(5000000);

    it(`[C22141] Corporate Admin: UK > US - US Edit UStoUK country: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.1 Corporate Admin: UK > US - US Edit UStoUK country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22141');
        const addressArray = [corpAdminUSAEditUK.street, corpAdminUSAEditUK.city, corpAdminUSAEditUK.postalCode];
        //const addressArray = [corpAdminUSAEditUK.street, corpAdminUSAEditUK.city, 'US', corpAdminUSAEditUK.postalCode];
        await userDataInDB.userExistsIdentityUK(await emailallu3_1, null, corpAdminUSAEditUK.firstName, corpAdminUSAEditUK.lastName,
            corpAdminUSAEditUK.dob, `+44${corpAdminUSAEditUK.phoneNumber}`, null, addressArray);
    });

    it(`[C22142] Corporate Admin: UK > US - US Edit UStoUK country: US identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.1 Corporate Admin: UK > US - US Edit UStoUK country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22142');
        await userDataInDB.userExistsIdentityUS(await emailallu3_1, corpAdminUSAEditUK.firstName, corpAdminUSAEditUK.lastName, corpAdminUSAEditUK.dob,
            `+44${corpAdminUSAEditUK.phoneNumber}`, corpAdminUSAEditUK.gender, '', corpAdminUSAEditUK.street, null, null, null, corpAdminUSAEditUK.city,
            null, corpAdminUSAEditUK.postalCode, 826);
    });

    it(`[C22143] Corporate Admin: UK > US - US Edit UStoUK country: DynamoDb @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.1 Corporate Admin: UK > US - US Edit UStoUK country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22143');
        await userDataInDB.userExistsInDynamoDB(await emailallu3_1, corpAdminUSAEditUK.firstName, corpAdminUSAEditUK.lastName, corpAdminUSAEditUK.gender,
            '2', corpAdminUSAEditUK.dobDynamo, undefined, UserIF.countryUK, corpAdminUSAEditUK.postalCode, undefined, corpAdminUSAEditUK.city,
            corpAdminUSAEditUK.street, undefined, '  ', undefined, `+44${corpAdminUSAEditUK.phoneNumber}`, `+44${corpAdminUSAEditUK.phoneNumber}`);
    });

    it(`[C22144] Corporate Admin: UK > US - US Edit UStoUK country: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.1 Corporate Admin: UK > US - US Edit UStoUK country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22144');
        const contactsData = await Salesforce.getContactsByEmail(await emailallu3_1);
        await Salesforce.checkContactDataInSalesforce(contactsData, await emailallu3_1, salesforceData.standardRecordTypeId, corpAdminUSAEditUK.firstName,
            corpAdminUSAEditUK.lastName, 'USD', false, true, false);
    });

    it(`[C30455] Corporate Admin: UK > US - US Edit UStoUK country: Unique Identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.1 Corporate Admin: UK > US - US Edit UStoUK country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30455');
        await userDataInDB.userExistsUniqueIdentityv2(await emailallu3_1, corpAdminUSAEditUK.firstName, corpAdminUSAEditUK.lastName,
            `${corpAdminUSAEditUK.firstName} ${corpAdminUSAEditUK.lastName}`, corpAdminUSAEditUK.dob,
            `+44${corpAdminUSAEditUK.phoneNumber}`, `+44${corpAdminUSAEditUK.phoneNumber}`, corpAdminUSAEditUK.street, null,
            corpAdminUSAEditUK.city, null, corpAdminUSAEditUK.postalCode, UserIF.countryUK);
    });

    // ---------------- U3.2 Corporate Admin: US > UK - US Edit UKtoUS country -------------------------------    

    it(`[C19616] Corporate Admin: US > UK - US Edit UKtoUS country: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.2 Corporate Admin: US > UK - US Edit UKtoUS country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/19616');
        console.log('U3.2 - ', await emailallu3_2);
        // Create user in US
        const token = await LoginAPICall.getAccessTokenForAPI(CredentialsIF.CenttripAdminUSA.Email, CredentialsIF.CenttripAdminUSA.Password);
        await createUserPage.createUserFullAPI(await emailallu3_2, token, 'CorporateAdmin', corpAdminUSAAllFields.firstName, corpAdminUSAAllFields.lastName,
            corpAdminUSAAllFields.dobAPI, corpAdminUSAAllFields.gender, `+1${corpAdminUSAAllFields.phoneNumber}`, corpAdminUSAAllFields.street, corpAdminUSAAllFields.postalCode,
            corpAdminUSAAllFields.city, 'US', corpAdminUSAAllFields.state);
        await Other.deleteCacheCookiesUSA();
        // Create user in UK
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(CredentialsIF.CenttripAdminiUK.Email, CredentialsIF.CenttripAdminiUK.Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('corporateAdmin', await emailallu3_2, UserIF.accountUK, UserIF.corpAdminUK.title, UserIF.corpAdminUK.gender,
            UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.postalCode, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2,
            UserIF.corpAdminUK.city, UserIF.countryUK, UserIF.phoneCodeUK, UserIF.phoneCodeUK, UserIF.corpAdminUK.phoneNumber, UserIF.corpAdminUK.homeNumber,
            UserIF.corpAdminUK.dob);
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        // edit user in US (country)
        const identityUserRefId = await userDataInDB.getUserIdFromAspNetUsersDB(await emailallu3_2);
        await createUserPage.editUserFullAPI(await emailallu3_2, token, corpAdminUSAEditUS.firstName, corpAdminUSAEditUS.lastName, corpAdminUSAEditUS.dobAPI,
            corpAdminUSAEditUS.gender, `+1${corpAdminUSAEditUS.phoneNumber}`, corpAdminUSAEditUS.postalCode,
            'US', corpAdminUSAEditUS.state, corpAdminUSAEditUS.city, corpAdminUSAEditUS.street, identityUserRefId);
        await userDataInDB.userExistsAspNetUsersDB(await emailallu3_2, corpAdminUSAEditUS.firstName, corpAdminUSAEditUS.lastName, corpAdminUSAEditUS.dobDB,
            `+1${corpAdminUSAEditUS.phoneNumber}`);
    }).timeout(5000000);

    it(`[C22145] Corporate Admin: US > UK - US Edit UKtoUS country: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.2 Corporate Admin: US > UK - US Edit UKtoUS country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22145');
        const addressArray = [corpAdminUSAEditUS.street, corpAdminUSAEditUS.city, 'US', corpAdminUSAEditUS.postalCode];
        await userDataInDB.userExistsIdentityUK(await emailallu3_2, null, corpAdminUSAEditUS.firstName, corpAdminUSAEditUS.lastName,
            corpAdminUSAEditUS.dobDB, `+1${corpAdminUSAEditUS.phoneNumber}`, null, addressArray);
    });

    it(`[C22146] Corporate Admin: US > UK - US Edit UKtoUS country: US identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.2 Corporate Admin: US > UK - US Edit UKtoUS country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22146');
        await userDataInDB.userExistsIdentityUS(await emailallu3_2, corpAdminUSAEditUS.firstName, corpAdminUSAEditUS.lastName, corpAdminUSAEditUS.dobDB,
            `+1${corpAdminUSAEditUS.phoneNumber}`, corpAdminUSAEditUS.gender, '', corpAdminUSAEditUS.street, null, null, corpAdminUSAEditUS.state, corpAdminUSAEditUS.city,
            null, corpAdminUSAEditUS.postalCode, 840);
    });

    it(`[C22082] Corporate Admin: US > UK - US Edit UKtoUS country: DynamoDb @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.2 Corporate Admin: US > UK - US Edit UKtoUS country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22082');
        await userDataInDB.userExistsInDynamoDB(await emailallu3_2, corpAdminUSAEditUS.firstName, corpAdminUSAEditUS.lastName, corpAdminUSAEditUS.gender,
            '2', corpAdminUSAEditUS.dob, UserIF.countryUSA, 'US', corpAdminUSAEditUS.postalCode, corpAdminUSAEditUS.state, corpAdminUSAEditUS.city,
            corpAdminUSAEditUS.street, undefined, '  ', undefined, `+1${corpAdminUSAEditUS.phoneNumber}`, `+1${corpAdminUSAEditUS.phoneNumber}`);
    });

    it(`[C22148] Corporate Admin: US > UK - US Edit UKtoUS country: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.2 Corporate Admin: US > UK - US Edit UKtoUS country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22148');
        const contactsData = await Salesforce.getContactsByEmail(await emailallu3_2);
        await Salesforce.checkContactDataInSalesforce(contactsData, await emailallu3_2, salesforceData.standardRecordTypeId, corpAdminUSAEditUS.firstName,
            corpAdminUSAEditUS.lastName, 'GBP', false, true, false);
    });

    it(`[C30456] Corporate Admin: US > UK - US Edit UKtoUS country: Unique identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.2 Corporate Admin: US > UK - US Edit UKtoUS country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30456');
        await userDataInDB.userExistsUniqueIdentityv2(await emailallu3_2, corpAdminUSAEditUS.firstName, corpAdminUSAEditUS.lastName,
            `${corpAdminUSAEditUS.firstName} ${corpAdminUSAEditUS.lastName}`, corpAdminUSAEditUS.dobDB,
            `+1${corpAdminUSAEditUS.phoneNumber}`, `+1${corpAdminUSAEditUS.phoneNumber}`, corpAdminUSAEditUS.street, null,
            corpAdminUSAEditUS.city, corpAdminUSAEditUS.state, corpAdminUSAEditUS.postalCode, UserIF.countryUSA);
    });

    // ------------ U3.3 Corporate Admin: US > UK - US Remove address --------------------------------- 

    it(`[C21901] Corporate Admin: US > UK - US Remove address: AspNetUsers`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.3 Corporate Admin: US > UK - US Remove address');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/21901');
        console.log('U3.3 - ', await emailallu3_3);
        const token = await LoginAPICall.getAccessTokenForAPI(CredentialsIF.CenttripAdminUSA.Email, CredentialsIF.CenttripAdminUSA.Password);
        await createUserPage.createUserFullAPI(await emailallu3_3, token, 'CorporateAdmin', corpAdminUSAAllFields.firstName, corpAdminUSAAllFields.lastName,
            corpAdminUSAAllFields.dobAPI, corpAdminUSAAllFields.gender, corpAdminUSAAllFields.phoneNumber, corpAdminUSAAllFields.street, corpAdminUSAAllFields.postalCode,
            corpAdminUSAAllFields.city, 'US', corpAdminUSAAllFields.state);
        await Other.deleteCacheCookiesUSA();
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(CredentialsIF.CenttripAdminiUK.Email, CredentialsIF.CenttripAdminiUK.Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('corporateAdmin', await emailallu3_3, UserIF.accountUK, UserIF.corpAdminUK.title, UserIF.corpAdminUK.gender,
            UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.postalCode, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2,
            UserIF.corpAdminUK.city, 'United States', UserIF.phoneCodeUSA, UserIF.phoneCodeUSA, UserIF.corpAdminUK.phoneNumber, UserIF.corpAdminUK.homeNumber,
            UserIF.corpAdminUK.dob);
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        //Remove address in USA
        const identityUserRefId = await userDataInDB.getUserIdFromAspNetUsersDB(await emailallu3_3);
        await createUserPage.editUserFullAPI(await emailallu3_3, token, corpAdminUSAEditClearAdd.firstName, corpAdminUSAEditClearAdd.lastName,
            corpAdminUSAEditClearAdd.dobAPI, corpAdminUSAEditClearAdd.gender, `+44${corpAdminUSAEditClearAdd.phoneNumber}`, '', '', null, '', '', identityUserRefId);
        await userDataInDB.userExistsAspNetUsersDB(await emailallu3_3, corpAdminUSAEditClearAdd.firstName, corpAdminUSAEditClearAdd.lastName,
            corpAdminUSAEditClearAdd.dob, `+44${corpAdminUSAEditClearAdd.phoneNumber}`);
    }).timeout(5000000);

    it(`[C22149] Corporate Admin: US > UK - US Remove address: UK identity`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.3 Corporate Admin: US > UK - US Remove address');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22149');
        const addressArray = ['', '', '', ''];
        await userDataInDB.userExistsIdentityUK(await emailallu3_3, null, corpAdminUSAEditClearAdd.firstName, corpAdminUSAEditClearAdd.lastName,
            corpAdminUSAEditClearAdd.dob, `+44${corpAdminUSAEditClearAdd.phoneNumber}`, null, addressArray, true);
    });

    it(`[C22150] Corporate Admin: US > UK - US Remove address: US identity`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.3 Corporate Admin: US > UK - US Remove address');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22150');
        await userDataInDB.userExistsIdentityUS(await emailallu3_3, corpAdminUSAEditClearAdd.firstName, corpAdminUSAEditClearAdd.lastName, corpAdminUSAEditClearAdd.dob,
            `+44${corpAdminUSAEditClearAdd.phoneNumber}`, corpAdminUSAEditClearAdd.gender, '', `${UserIF.corpAdminUK.address1} ${UserIF.corpAdminUK.address2}`,
            null, null, null, UserIF.corpAdminUK.city, null, UserIF.corpAdminUK.postalCode, 840);
    });

    it(`[C22151] Corporate Admin: US > UK - US Remove address: DynamoDb`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.3 Corporate Admin: US > UK - US Remove address');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22151');
        await userDataInDB.userExistsInDynamoDB(await emailallu3_3, corpAdminUSAEditClearAdd.firstName, corpAdminUSAEditClearAdd.lastName,
            corpAdminUSAEditClearAdd.gender, '2', corpAdminUSAEditClearAdd.dobFormat, undefined, undefined, undefined, undefined, undefined,
            undefined, undefined, '  ', undefined, `+44${corpAdminUSAEditClearAdd.phoneNumber}`, `+44${corpAdminUSAEditClearAdd.phoneNumber}`);
    });

    it(`[C22152] Corporate Admin: US > UK - US Remove address: SalesForce`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.3 Corporate Admin: US > UK - US Remove address');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22152');
        const contactsData = await Salesforce.getContactsByEmail(await emailallu3_3);
        await Salesforce.checkContactDataInSalesforce(contactsData, await emailallu3_3, salesforceData.standardRecordTypeId, corpAdminUSAEditClearAdd.firstName,
            corpAdminUSAEditClearAdd.lastName, 'GBP', false, true, false);
    });

    it(`[C30459] Corporate Admin: US > UK - US Remove address: Unique identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.3 Corporate Admin: US > UK - US Remove address');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30459');
        await userDataInDB.userExistsUniqueIdentityv2(await emailallu3_3, corpAdminUSAEditClearAdd.firstName, corpAdminUSAEditClearAdd.lastName,
            `${corpAdminUSAEditClearAdd.firstName} ${corpAdminUSAEditClearAdd.lastName}`, corpAdminUSAEditClearAdd.dob,
            `+44${corpAdminUSAEditClearAdd.phoneNumber}`, `+44${corpAdminUSAEditClearAdd.phoneNumber}`, null, null,
            null, null, null, null);
    });

    // ------------ U3.4 Corporate Admin: UK > US - UK Edit UStoUK country --------------------------------- 

    it(`[C21899] Corporate Admin: UK > US - UK Edit UStoUK country: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.4 Corporate Admin: UK > US - UK Edit UStoUK country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/21899');
        console.log('U3.4 - ', await emailallu3_4);
        // Create Admin in UK
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(CredentialsIF.CenttripAdminiUK.Email, CredentialsIF.CenttripAdminiUK.Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('corporateAdmin', await emailallu3_4, UserIF.accountUK, UserIF.corpAdminUK.title, UserIF.corpAdminUK.gender,
            UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.postalCode, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2,
            UserIF.corpAdminUK.city, UserIF.countryUK, UserIF.phoneCodeUK, UserIF.phoneCodeUK, UserIF.corpAdminUK.phoneNumber, UserIF.corpAdminUK.homeNumber,
            UserIF.corpAdminUK.dob);
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        // Create Admin in USA
        const token = await LoginAPICall.getAccessTokenForAPI(CredentialsIF.CenttripAdminUSA.Email, CredentialsIF.CenttripAdminUSA.Password);
        await createUserPage.createUserFullAPI(await emailallu3_4, token, 'CorporateAdmin', corpAdminUSAAllFields.firstName, corpAdminUSAAllFields.lastName,
            corpAdminUSAAllFields.dobAPI, corpAdminUSAAllFields.gender, corpAdminUSAAllFields.phoneNumber, corpAdminUSAAllFields.street, corpAdminUSAAllFields.postalCode,
            corpAdminUSAAllFields.city, 'US', corpAdminUSAAllFields.state);
        // Edit Admin in UK
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(CredentialsIF.CenttripAdminiUK.Email, CredentialsIF.CenttripAdminiUK.Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.updateUserUK(await emailallu3_4, UserIF.accountUK, corpAdminUKEditUK.title, corpAdminUKEditUK.gender,
            corpAdminUKEditUK.firstName, corpAdminUKEditUK.lastName, corpAdminUKEditUK.postalCode, corpAdminUKEditUK.address1, corpAdminUKEditUK.address2,
            corpAdminUKEditUK.city, UserIF.countryUK, UserIF.phoneCodeUK, UserIF.phoneCodeUK, corpAdminUKEditUK.phoneNumber, corpAdminUKEditUK.homeNumber,
            corpAdminUKEditUK.dobAPI, true);
        await userDataInDB.userExistsAspNetUsersDB(await emailallu3_4, corpAdminUKEditUK.firstName, corpAdminUKEditUK.lastName, corpAdminUKEditUK.dobDB,
            `+44${corpAdminUKEditUK.phoneNumber}`);
        await commonPageUK.logoutFromUK();
    }).timeout(5000000);

    it(`[C22157] Corporate Admin: UK > US - UK Edit UStoUK country: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.4 Corporate Admin: UK > US - UK Edit UStoUK country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22157');
        const addressArray = [corpAdminUKEditUK.address1, corpAdminUKEditUK.address2, corpAdminUKEditUK.city, 'GB', corpAdminUKEditUK.postalCode];
        await userDataInDB.userExistsIdentityUK(await emailallu3_4, null, corpAdminUKEditUK.firstName, corpAdminUKEditUK.lastName,
            corpAdminUKEditUK.dobDB, `+44${corpAdminUKEditUK.phoneNumber}`, null, addressArray);
    });

    it(`[C22158] Corporate Admin: UK > US - UK Edit UStoUK country: US identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.4 Corporate Admin: UK > US - UK Edit UStoUK country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22158');
        await userDataInDB.userExistsIdentityUS(await emailallu3_4, corpAdminUKEditUK.firstName, corpAdminUKEditUK.lastName, corpAdminUKEditUK.dobDB,
            `+44${corpAdminUKEditUK.phoneNumber}`, corpAdminUKEditUK.gender, '', `${corpAdminUKEditUK.address1} ${corpAdminUKEditUK.address2}`, null, null, null,
            corpAdminUKEditUK.city, null, corpAdminUKEditUK.postalCode, 826);
    });

    it(`[C22143] Corporate Admin: UK > US - US Edit UStoUK country: DynamoDb @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.4 Corporate Admin: UK > US - UK Edit UStoUK country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22143');
        await userDataInDB.userExistsInDynamoDB(await emailallu3_4, corpAdminUKEditUK.firstName, corpAdminUKEditUK.lastName, corpAdminUKEditUK.gender,
            '1', corpAdminUKEditUK.dob, UserIF.countryUK, 'GB', corpAdminUKEditUK.postalCode, undefined, corpAdminUKEditUK.city,
            corpAdminUKEditUK.address1, corpAdminUKEditUK.address2, '  ', undefined, `+44${corpAdminUKEditUK.phoneNumber}`, `+44${corpAdminUKEditUK.phoneNumber}`);
    });

    it(`[C22160] Corporate Admin: UK > US - UK Edit UStoUK country: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.4 Corporate Admin: UK > US - UK Edit UStoUK country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22160');
        const contactsData = await Salesforce.getContactsByEmail(await emailallu3_4);
        await Salesforce.checkContactDataInSalesforce(contactsData, await emailallu3_4, salesforceData.standardRecordTypeId, corpAdminUKEditUK.firstName,
            corpAdminUKEditUK.lastName, 'GBP', false, true, false);
    });

    it(`[C30459] Corporate Admin: UK > US - UK Edit UStoUK country: Unique identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.4 Corporate Admin: UK > US - UK Edit UStoUK country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30459');
        await userDataInDB.userExistsUniqueIdentityv2(await emailallu3_4, corpAdminUKEditUK.firstName, corpAdminUKEditUK.lastName,
            `${corpAdminUKEditUK.firstName} ${corpAdminUKEditUK.lastName}`, corpAdminUKEditUK.dobDB,
            `+44${corpAdminUKEditUK.phoneNumber}`, `+44${corpAdminUKEditUK.phoneNumber}`, corpAdminUKEditUK.address1, corpAdminUKEditUK.address2,
            corpAdminUKEditUK.city, null, corpAdminUKEditUK.postalCode, UserIF.countryUK);
    });

    // ------------ U3.5 Corporate Admin: US > UK - UK Edit UKtoUS country --------------------------------- 

    it(`[C19612] Corporate Admin: US > UK - UK Edit UKtoUS country: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.5 Corporate Admin: US > UK - UK Edit UKtoUS country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/19612');
        console.log('U3.5 - ', await emailallu3_5);
        // Create Admin US
        const token = await LoginAPICall.getAccessTokenForAPI(CredentialsIF.CenttripAdminUSA.Email, CredentialsIF.CenttripAdminUSA.Password);
        await createUserPage.createUserFullAPI(await emailallu3_5, token, 'CorporateAdmin', corpAdminUSAAllFields.firstName, corpAdminUSAAllFields.lastName,
            corpAdminUSAAllFields.dobAPI, corpAdminUSAAllFields.gender, corpAdminUSAAllFields.phoneNumber, corpAdminUSAAllFields.street, corpAdminUSAAllFields.postalCode, corpAdminUSAAllFields.city, 'US',
            corpAdminUSAAllFields.state);
        await Other.deleteCacheCookiesUSA();
        // Create Admin UK
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(CredentialsIF.CenttripAdminiUK.Email, CredentialsIF.CenttripAdminiUK.Password);
        await browser.pause(2000);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('corporateAdmin', await emailallu3_5, UserIF.accountUK, UserIF.corpAdminUK.title, UserIF.corpAdminUK.gender,
            UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.postalCode, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2,
            UserIF.corpAdminUK.city, UserIF.countryUK, UserIF.phoneCodeUK, UserIF.phoneCodeUK, UserIF.corpAdminUK.phoneNumber, UserIF.corpAdminUK.homeNumber,
            UserIF.corpAdminUK.dob);
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        // Edit country in UK
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(CredentialsIF.CenttripAdminiUK.Email, CredentialsIF.CenttripAdminiUK.Password);
        await browser.pause(2000);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.updateUserUK(await emailallu3_5, UserIF.accountUK, corpAdminUKEditUSA.title, corpAdminUKEditUSA.gender,
            corpAdminUKEditUSA.firstName, corpAdminUKEditUSA.lastName, corpAdminUKEditUSA.postalCode, corpAdminUKEditUSA.address1, corpAdminUKEditUSA.address2,
            corpAdminUKEditUSA.city, 'United States', UserIF.phoneCodeUSA, UserIF.phoneCodeUSA, corpAdminUKEditUSA.phoneNumber, corpAdminUKEditUSA.homeNumber,
            corpAdminUKEditUSA.dob, true);
        await userDataInDB.userExistsAspNetUsersDB(await emailallu3_5, corpAdminUKEditUSA.firstName, corpAdminUKEditUSA.lastName, corpAdminUKEditUSA.dobDB,
            `+1${corpAdminUKEditUSA.phoneNumber}`);
        await commonPageUK.logoutFromUK();
    }).timeout(5000000);

    it(`[C22161] Corporate Admin: US > UK - UK Edit UKtoUS country: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.5 Corporate Admin: US > UK - UK Edit UKtoUS country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22161');
        const addressArray = [corpAdminUKEditUSA.address1, corpAdminUKEditUSA.address2, corpAdminUKEditUSA.city, 'US', corpAdminUKEditUSA.postalCode];
        await userDataInDB.userExistsIdentityUK(await emailallu3_5, null, corpAdminUKEditUSA.firstName, corpAdminUKEditUSA.lastName,
            corpAdminUKEditUSA.dobDB, `+1${corpAdminUKEditUSA.phoneNumber}`, null, addressArray);
    });

    it(`[C22162] Corporate Admin: US > UK - UK Edit UKtoUS country: US identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.5 Corporate Admin: US > UK - UK Edit UKtoUS country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22162');
        await userDataInDB.userExistsIdentityUS(await emailallu3_5, corpAdminUKEditUSA.firstName, corpAdminUKEditUSA.lastName, corpAdminUKEditUSA.dobDB,
            `+1${corpAdminUKEditUSA.phoneNumber}`, corpAdminUKEditUSA.gender, '', `${corpAdminUKEditUSA.address1} ${corpAdminUKEditUSA.address2}`, null,
            null, null, corpAdminUKEditUSA.city, null, corpAdminUKEditUSA.postalCode, 840);
    });

    it(`[C22163] Corporate Admin: US > UK - UK Edit UKtoUS country: DynamoDb @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.5 Corporate Admin: US > UK - UK Edit UKtoUS country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22163');
        await userDataInDB.userExistsInDynamoDB(await emailallu3_5, corpAdminUKEditUSA.firstName, corpAdminUKEditUSA.lastName, corpAdminUKEditUSA.gender,
            '1', corpAdminUKEditUSA.dob, UserIF.countryUSA, 'US', corpAdminUKEditUSA.postalCode, undefined, corpAdminUKEditUSA.city,
            corpAdminUKEditUSA.address1, corpAdminUKEditUSA.address2, '  ', undefined, `+1${corpAdminUKEditUSA.phoneNumber}`, `+1${corpAdminUKEditUSA.phoneNumber}`);
    });

    it(`[C22164] Corporate Admin: US > UK - UK Edit UKtoUS country: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.5 Corporate Admin: US > UK - UK Edit UKtoUS country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22164');
        const contactsData = await Salesforce.getContactsByEmail(await emailallu3_5);
        await Salesforce.checkContactDataInSalesforce(contactsData, await emailallu3_5, salesforceData.standardRecordTypeId, corpAdminUKEditUSA.firstName,
            corpAdminUKEditUSA.lastName, 'GBP', false, true, false);
    });

    it(`[C30460] Corporate Admin: US > UK - UK Edit UKtoUS country: Unique identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.5 Corporate Admin: US > UK - UK Edit UKtoUS country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30460');
        await userDataInDB.userExistsUniqueIdentityv2(await emailallu3_5, corpAdminUKEditUSA.firstName, corpAdminUKEditUSA.lastName,
            `${corpAdminUKEditUSA.firstName} ${corpAdminUKEditUSA.lastName}`, corpAdminUKEditUSA.dobDB,
            `+1${corpAdminUKEditUSA.phoneNumber}`, `+1${corpAdminUKEditUSA.phoneNumber}`, corpAdminUKEditUSA.address1, corpAdminUKEditUSA.address2,
            corpAdminUKEditUSA.city, null, corpAdminUKEditUSA.postalCode, UserIF.countryUSA);
    });
    // ------------ U3.6 UK Cardholder > US - UK Modify under Centtrip Admin --------------------------------- 

    it(`[C21898] UK Cardholder > US - UK Modify under Centtrip Admin: AspNetUsers`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.6 UK Cardholder > US - UK Modify under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/21898');
        console.log('U3.6 - ', await emailallu3_6);
        // Create Carholder UK
        const fileName = await cardMigrationPage.generateBatchFile(await emailallu3_6, process.env.ENV);
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(CredentialsIF.CenttripAdminiUK.Email, CredentialsIF.CenttripAdminiUK.Password);
        await createUserPageUK.openCardMigrationPage();
        await Actions.uploadFile(`${pathToUploadPfsCardCreation}${fileName}.xlsx`, await UKCardMigrationPageElements.chooseButton);
        await browser.pause(2000);
        await Actions.waitAndClick(await UKCardMigrationPageElements.uploadButton);
        await (await UKCardMigrationPageElements.uploadedMessage).waitForDisplayed();
        const cardHolderData = await cardMigrationPage.batchProccessCheck();
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        // Create Admin in US
        const token = await LoginAPICall.getAccessTokenForAPI(CredentialsIF.CenttripAdminUSA.Email, CredentialsIF.CenttripAdminUSA.Password);
        await createUserPage.createUserFullAPI(await emailallu3_6, token, 'CorporateAdmin', corpAdminUSAAllFields.firstName, corpAdminUSAAllFields.lastName,
            corpAdminUSAAllFields.dobAPI, corpAdminUSAAllFields.gender, corpAdminUSAAllFields.phoneNumber, corpAdminUSAAllFields.street, corpAdminUSAAllFields.postalCode,
            corpAdminUSAAllFields.city, 'US', corpAdminUSAAllFields.state);
        await Other.deleteCacheCookiesUSA();
        // Modify Cardholder under Centtrip Admin
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(CredentialsIF.CenttripAdminiUK.Email, CredentialsIF.CenttripAdminiUK.Password);
        await createUserPageUK.switchToAnotherAccount(await emailallu3_6);
        await (await UKGeneralElements.settingsButton).moveTo();
        await Actions.waitAndClick(await general.linkByName('Modify Card Holder Details'));
        await createUserPageUK.updateCardholderUserUK(await emailallu3_6, `+1${UserIF.cardholderUKEdit.phoneNumber}`, UserIF.cardholderUKEdit.dob);
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        await userDataInDB.userExistsAspNetUsersDB(await emailallu3_6, corpAdminUSAAllFields.firstName, corpAdminUSAAllFields.lastName,
            UserIF.cardholderUKEdit.dobDB, `+1${UserIF.cardholderUKEdit.phoneNumber}`);
    }).timeout(7000000);

    it(`[C23750] UK Cardholder > US - UK Modify under Centtrip Admin: UK identity`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.6 UK Cardholder > US - UK Modify under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/23750');
        const addressArray = [corpAdminUSAAllFields.street, corpAdminUSAAllFields.city, 'US', corpAdminUSAAllFields.postalCode];
        await userDataInDB.userExistsIdentityUK(await emailallu3_6, null, corpAdminUSAAllFields.firstName, corpAdminUSAAllFields.lastName,
            UserIF.cardholderUKEdit.dobDB, `+1${UserIF.cardholderUKEdit.phoneNumber}`, null, addressArray);
    });

    it(`[C22193] UK Cardholder > US - UK Modify under Centtrip Admin: US identity`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.6 UK Cardholder > US - UK Modify under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22193');
        await userDataInDB.userExistsIdentityUS(await emailallu3_6, corpAdminUSAAllFields.firstName, corpAdminUSAAllFields.lastName,
            UserIF.cardholderUKEdit.dobDB, `+1${UserIF.cardholderUKEdit.phoneNumber}`, 'Male', '',
            corpAdminUSAAllFields.street, null, null, corpAdminUSAAllFields.state, corpAdminUSAAllFields.city, null,
            corpAdminUSAAllFields.postalCode, 840);
    });

    it(`[C22196] UK Cardholder > US - UK Modify under Centtrip Admin: DynamoDb`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.6 UK Cardholder > US - UK Modify under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22196');
        await userDataInDB.userExistsInDynamoDB(await emailallu3_6, corpAdminUSAAllFields.firstName, corpAdminUSAAllFields.lastName, corpAdminUSAAllFields.gender,
            undefined, UserIF.cardholderUKEdit.dob, UserIF.countryUSA, 'US', corpAdminUSAAllFields.postalCode, corpAdminUSAAllFields.state, corpAdminUSAAllFields.city,
            corpAdminUSAAllFields.street, undefined, '  ', undefined, `+1${UserIF.cardholderUKEdit.phoneNumber}`,
            `+1${UserIF.cardholderUKEdit.phoneNumber}`);
    });

    it(`[C22192] UK Cardholder > US - UK Modify under Centtrip Admin: SalesForce`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.6 UK Cardholder > US - UK Modify under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22192');
        const contactsData = await Salesforce.getContactsByEmail(await emailallu3_6);
        await Salesforce.checkContactDataInSalesforce(contactsData, await emailallu3_6, salesforceData.standardRecordTypeId, corpAdminUSAAllFields.firstName,
            corpAdminUSAAllFields.lastName, 'GBP', true, true, false);
        const personAccountData = await Salesforce.getPersonAccountDataByEmail(await emailallu3_6);
        await Salesforce.checkPersonAccountDataInSalesforce(personAccountData, await emailallu3_6, salesforceData.personalRecordTypeId,
            corpAdminUSAAllFields.firstName, corpAdminUSAAllFields.lastName, UserIF.cardholderUKEdit.dobSF, null,
            `1${UserIF.cardholderUKEdit.phoneNumber}`, corpAdminUSAAllFields.street,
            corpAdminUSAAllFields.city, corpAdminUSAAllFields.postalCode, UserIF.countryUSA, true, true);
    });

    it(`[C30460] UK Cardholder > US - UK Modify under Centtrip Admin: Unique identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.6 UK Cardholder > US - UK Modify under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30460');
        await userDataInDB.userExistsUniqueIdentityv2(await emailallu3_6, corpAdminUSAAllFields.firstName, corpAdminUSAAllFields.lastName,
            `${corpAdminUSAAllFields.firstName} ${corpAdminUSAAllFields.lastName}`, UserIF.cardholderUKEdit.dobDB,
            `+1${UserIF.cardholderUKEdit.phoneNumber}`, `+1${UserIF.cardholderUKEdit.phoneNumber}`, corpAdminUSAAllFields.street, '',
            corpAdminUSAAllFields.city, corpAdminUSAAllFields.state, corpAdminUSAAllFields.postalCode, UserIF.countryUSA);
    });

    // ------------ U3.7 UK Cardholder > US - UK Edit under Super Admin ------------------------------- 

    it(`[C37573] UK Cardholder > US - UK Edit under Super Admin: AspNetUsers`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.7 UK Cardholder > US - UK Edit under Super Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37573');
        console.log('U3.7 - ', await emailallu3_7);
        // Create Carholder UK
        const fileName = await cardMigrationPage.generateBatchFile(await emailallu3_7, process.env.ENV);
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(CredentialsIF.CenttripAdminiUK.Email, CredentialsIF.CenttripAdminiUK.Password);
        await createUserPageUK.openCardMigrationPage();
        await Actions.uploadFile(`${pathToUploadPfsCardCreation}${fileName}.xlsx`, await UKCardMigrationPageElements.chooseButton);
        await browser.pause(2000);
        await Actions.waitAndClick(await UKCardMigrationPageElements.uploadButton);
        await (await UKCardMigrationPageElements.uploadedMessage).waitForDisplayed();
        const cardHolderData = await cardMigrationPage.batchProccessCheck();
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        // Create Admin in US
        const token = await LoginAPICall.getAccessTokenForAPI(CredentialsIF.CenttripAdminUSA.Email, CredentialsIF.CenttripAdminUSA.Password);
        await createUserPage.createUserFullAPI(await emailallu3_7, token, 'CorporateAdmin', corpAdminUSAAllFields.firstName, corpAdminUSAAllFields.lastName,
            corpAdminUSAAllFields.gender, corpAdminUSAAllFields.dobAPI, corpAdminUSAAllFields.phoneNumber, corpAdminUSAAllFields.street, corpAdminUSAAllFields.postalCode,
            corpAdminUSAAllFields.city, 'US', corpAdminUSAAllFields.state);
        await Other.deleteCacheCookiesUSA();
        // Modify Cardholder under Super Admin
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(CredentialsIF.SuperAdminUK.Email, CredentialsIF.SuperAdminUK.Password);
        await (await general.elementByText('Last')).scrollIntoView();
        await Actions.waitAndClick(await UKCreateUserPageElements.superAdmin.lastPageOfChs);
        await Actions.waitAndClick(await general.lastEditBtn);
        await (await general.elementByText('CARDHOLDER CARDS')).waitForDisplayed();
        await browser.pause(1000);
        await createUserPageUK.updateCardholderUKUnderCSA(UserIF.cardholderUKEdit6.dob, UserIF.phoneCodeUK, UserIF.cardholderUKEdit6.phoneNumber);
        await userDataInDB.userExistsAspNetUsersDB(await emailallu3_7, corpAdminUSAAllFields.firstName, corpAdminUSAAllFields.lastName,
            UserIF.cardholderUKEdit6.dobDB, `+44${UserIF.cardholderUKEdit6.phoneNumber}`);
    }).timeout(7000000);

    it(`[C37574] UK Cardholder > US - UK Edit under Super Admin: UK identity`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.7 UK Cardholder > US - UK Edit under Super Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37574');
        const addressArray = [corpAdminUSAAllFields.street, corpAdminUSAAllFields.city, 'US', corpAdminUSAAllFields.postalCode];
        await userDataInDB.userExistsIdentityUK(await emailallu3_7, null, corpAdminUSAAllFields.firstName, corpAdminUSAAllFields.lastName,
            UserIF.cardholderUKEdit6.dobDB, `+44${UserIF.cardholderUKEdit6.phoneNumber}`, null, addressArray);
    });

    it(`[C37575] UK Cardholder > US - UK Edit under Super Admin: US identity`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.7 UK Cardholder > US - UK Edit under Super Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37575');
        await userDataInDB.userExistsIdentityUS(await emailallu3_7, corpAdminUSAAllFields.firstName, corpAdminUSAAllFields.lastName,
            UserIF.cardholderUKEdit6.dobDB, `+44${UserIF.cardholderUKEdit6.phoneNumber}`, null, '',
            corpAdminUSAAllFields.street, null, null, null, corpAdminUSAAllFields.city, null,
            corpAdminUSAAllFields.postalCode, 840);
    });

    it(`[C37576] UK Cardholder > US - UK Edit under Super Admin: DynamoDb`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.7 UK Cardholder > US - UK Edit under Super Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37576');
        await userDataInDB.userExistsInDynamoDB(await emailallu3_7, corpAdminUSAAllFields.firstName, corpAdminUSAAllFields.lastName, undefined,
            undefined, UserIF.cardholderUKEdit6.dob, UserIF.countryUSA, 'US', corpAdminUSAAllFields.postalCode, undefined, corpAdminUSAAllFields.city,
            corpAdminUSAAllFields.street, undefined, '  ', undefined, `+44${UserIF.cardholderUKEdit6.phoneNumber}`,
            `+44${UserIF.cardholderUKEdit6.phoneNumber}`);
    });

    it(`[C37577] UK Cardholder > US - UK Edit under Super Admin: SalesForce`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.7 UK Cardholder > US - UK Edit under Super Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37577');
        const contactsData = await Salesforce.getContactsByEmail(await emailallu3_7);
        await Salesforce.checkContactDataInSalesforce(contactsData, await emailallu3_7, salesforceData.standardRecordTypeId, UserIF.cardholderUKEdit.firstName,
            UserIF.cardholderUKEdit.lastName, 'GBP', true, true, false);
        const personAccountData = await Salesforce.getPersonAccountDataByEmail(await emailallu3_7);
        await Salesforce.checkPersonAccountDataInSalesforce(personAccountData, await emailallu3_7, salesforceData.personalRecordTypeId,
            corpAdminUSAAllFields.firstName, corpAdminUSAAllFields.lastName, UserIF.cardholderUKEdit6.dobSF, null,
            `44${UserIF.cardholderUKEdit6.phoneNumber}`, corpAdminUSAAllFields.street,
            corpAdminUSAAllFields.city, corpAdminUSAAllFields.postalCode, 'United State of America', false, false);
    });

    it(`[C37578] UK Cardholder > US - UK Edit under Super Admin: Unique identity @smoke`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('U3.7 UK Cardholder > US - UK Edit under Super Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37578');
        await userDataInDB.userExistsUniqueIdentityv2(await emailallu3_7, corpAdminUSAAllFields.firstName, corpAdminUSAAllFields.lastName,
            `${corpAdminUSAAllFields.firstName} ${corpAdminUSAAllFields.lastName}`, UserIF.cardholderUKEdit6.dobDB,
            `+44${UserIF.cardholderUKEdit6.phoneNumber}`, `+44${UserIF.cardholderUKEdit6.phoneNumber}`, corpAdminUSAAllFields.street, null,
            corpAdminUSAAllFields.city, corpAdminUSAAllFields.state, corpAdminUSAAllFields.postalCode, UserIF.countryUSA);
    });
});
