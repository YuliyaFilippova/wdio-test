import { commonPageUK } from '../../core/pages/centtripUK/commonUK';
import { createUserPageUK } from '../../core/pages/centtripUK/createUserUK';
import { cardMigrationPage } from '../../core/pages/centtripUK/cardMigrationPage';
import { salesforceData } from '../../testData/other';
import { signInPage } from '../../core/pages/centtripAppWeb/signInPage';
import { Salesforce } from '../../core/pages/externalServices/salesforce';
import { signInPageElements, UKCardMigrationPageElements } from '../../core/pages/locators';
import { Other } from '../../core/utils/other';
import { userDataInDB } from '../../core/pages/userDataInDB';
import { CredentialsIF, pathToUploadPfsCardCreation, UserIF } from '../../testData/usersData';
import AllureReporter from '@wdio/allure-reporter';
import { env, URLs } from '../../urls';
import { Actions } from '../../core/utils/actions';
import { connection, connectionUSA } from '../../wdio.conf';

describe(`Identity Facade >> Create UK users`, () => {

    before(async () => {
        if (!connectionUSA._connectCalled) {
            await connectionUSA.connect();
        }
        if (!connection._connectCalled) {
            await connection.connect();
        }
    });

    beforeEach(async () => {
        AllureReporter.addFeature('Create User UK');
    });

    afterEach(async () => {
        await Other.deleteCacheCookiesUK();
    })

    // ----------- C2.1 UK Super Admin with US country ------------------------------

    // it(`[C20775] UK Super Admin with US country: AspNetUsers @smoke`, async () => {
    //     AllureReporter.addSeverity('minor');
    //     AllureReporter.addStory('C2.1 UK Super Admin with US country');
    //     AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/20775');
    //     console.log('C2.1 - ', await UserIF.emailSuperAdmin);
    //     await browser.url(URLs.UKPortalURL);
    //     await (await signInPageElements.signInWindow).waitForDisplayed();
    //     await signInPage.signInAsRegisteredUserUK(CredentialsIF.CenttripAdminiUK.Email, CredentialsIF.CenttripAdminiUK.Password);
    //     await createUserPageUK.openCreateUserPageUnderCentripAdmin();
    //     await createUserPageUK.createAdminUK('superAdmin', await UserIF.emailSuperAdmin, UserIF.accountUK, UserIF.superAdminUK.title,
    //         UserIF.superAdminUK.gender, UserIF.superAdminUK.firstName, UserIF.superAdminUK.lastName, UserIF.superAdminUK.postalCode,
    //         UserIF.superAdminUK.address1, UserIF.superAdminUK.address2, UserIF.superAdminUK.city, 'United States', UserIF.phoneCodeUSA,
    //         UserIF.phoneCodeUSA, UserIF.superAdminUK.phoneNumber, UserIF.superAdminUK.homeNumber, UserIF.superAdminUK.dob);
    //     await commonPageUK.logoutFromUK();
    //     await userDataInDB.userExistsAspNetUsersDB(await UserIF.emailSuperAdmin, UserIF.superAdminUK.firstName, UserIF.superAdminUK.lastName, UserIF.superAdminUK.dobDB,
    //         `+1${UserIF.superAdminUK.phoneNumber}`);
    // });

    // it(`[C22070] UK Super Admin with US country: UK identity @smoke`, async () => {
    //     AllureReporter.addSeverity('minor');
    //     AllureReporter.addStory('C2.1 UK Super Admin with US country');
    //     AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22070');
    //     const addressArray = [UserIF.superAdminUK.address1, UserIF.superAdminUK.address2, UserIF.superAdminUK.city, 'US', UserIF.superAdminUK.postalCode];
    //     await userDataInDB.userExistsIdentityUK(await UserIF.emailSuperAdmin, null, UserIF.superAdminUK.firstName, UserIF.superAdminUK.lastName, UserIF.superAdminUK.dobDB,
    //         `+1${UserIF.superAdminUK.phoneNumber}`, null, addressArray);
    // });

    // it(`[C22071] UK Super Admin with US country: DynamoDb @smoke`, async () => {
    //     AllureReporter.addSeverity('minor');
    //     AllureReporter.addStory('C2.1 UK Super Admin with US country');
    //     AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22071');
    //     await userDataInDB.userExistsInDynamoDB(await UserIF.emailSuperAdmin, UserIF.superAdminUK.firstName, UserIF.superAdminUK.lastName, UserIF.superAdminUK.gender,
    //         '2', UserIF.superAdminUK.dob, 'United States', 'US', UserIF.superAdminUK.postalCode, undefined, UserIF.superAdminUK.city, UserIF.superAdminUK.address1,
    //         UserIF.superAdminUK.address2, undefined, undefined, `+1${UserIF.superAdminUK.homeNumber}`, `+1${UserIF.superAdminUK.phoneNumber}`);
    // }); // SELECT * FROM Centtrip.dbo.tblEndUserTitles


    // it(`[C22072] UK Super Admin with US country: SalesForce @smoke`, async () => {
    //     AllureReporter.addSeverity('minor');
    //     AllureReporter.addStory('C2.1 UK Super Admin with US country');
    //     AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22072');
    //     const contactsData = await Salesforce.getContactsByEmail(await UserIF.emailSuperAdmin);
    //     await Salesforce.checkContactDataInSalesforce(contactsData, await UserIF.emailSuperAdmin, salesforceData.standardRecordTypeId, UserIF.superAdminUK.firstName,
    //         UserIF.superAdminUK.lastName, 'GBP', false, true, true);
    // });

    // it(`[C30436] UK Super Admin with US country: Unique Identity @smoke`, async () => {
    //     AllureReporter.addSeverity('minor');
    //     AllureReporter.addStory('C2.1 UK Super Admin with US country');
    //     AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30436');
    //     await userDataInDB.userExistsUniqueIdentityv2(await UserIF.emailSuperAdmin, UserIF.superAdminUK.firstName, UserIF.superAdminUK.lastName,
    //         `${UserIF.superAdminUK.firstName} ${UserIF.superAdminUK.lastName}`, UserIF.superAdminUK.dobDB,
    //         `+1${UserIF.superAdminUK.phoneNumber}`, `+1${UserIF.superAdminUK.phoneNumber}`, UserIF.superAdminUK.address1, UserIF.superAdminUK.address2,
    //         UserIF.superAdminUK.city, null, UserIF.superAdminUK.postalCode, UserIF.countryUSA);
    // });

    // ---------- C2.2 UK Corporate Admin under Centtrip Admin ------------------

    // it(`[C22073] UK Corporate Admin under Centtrip Admin: AspNetUsers @smoke`, async () => {
    //     AllureReporter.addSeverity('normal');
    //     AllureReporter.addStory('C2.2 UK Corporate Admin under Centtrip Admin');
    //     AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22073');
    //     console.log('C2.2 - ', await UserIF.emailCorporateAdmin);
    //     await browser.url(URLs.UKPortalURL);
    //     await (await signInPageElements.signInWindow).waitForDisplayed();
    //     await signInPage.signInAsRegisteredUserUK(CredentialsIF.CenttripAdminiUK.Email, CredentialsIF.CenttripAdminiUK.Password);
    //     await createUserPageUK.openCreateUserPageUnderCentripAdmin();
    //     await createUserPageUK.createAdminUK('corporateAdmin', await UserIF.emailCorporateAdmin, UserIF.accountUK, UserIF.corpAdminUK.title,
    //         UserIF.corpAdminUK.gender, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.postalCode,
    //         UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2, UserIF.corpAdminUK.city, 'United Kingdom',
    //         UserIF.phoneCodeUK, UserIF.phoneCodeUK, UserIF.corpAdminUK.phoneNumber, UserIF.corpAdminUK.homeNumber,
    //         UserIF.corpAdminUK.dob);
    //     await commonPageUK.logoutFromUK();
    //     await userDataInDB.userExistsAspNetUsersDB(await UserIF.emailCorporateAdmin, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
    //         UserIF.corpAdminUK.dobDB, `+44${UserIF.corpAdminUK.phoneNumber}`);
    // });

    // it(`[C22074] UK Corporate Admin under Centtrip Admin: UK identity @smoke`, async () => {
    //     AllureReporter.addSeverity('normal');
    //     AllureReporter.addStory('02 Corporate Admin under Centtrip Admin');
    //     AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22074');
    //     const addressArray = [UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2, UserIF.corpAdminUK.city, 'GB',
    //     UserIF.corpAdminUK.postalCode];
    //     await userDataInDB.userExistsIdentityUK(await UserIF.emailCorporateAdmin, null, UserIF.corpAdminUK.firstName,
    //         UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.dobDB, `+44${UserIF.corpAdminUK.phoneNumber}`,
    //         null, addressArray);
    // });

    // it(`[C22075] UK Corporate Admin under Centtrip Admin: DynamoDb @smoke`, async () => {
    //     AllureReporter.addSeverity('normal');
    //     AllureReporter.addStory('02 Corporate Admin under Centtrip Admin');
    //     AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22075');
    //     await userDataInDB.userExistsInDynamoDB(await UserIF.emailCorporateAdmin, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
    //         UserIF.corpAdminUK.gender, '2', UserIF.corpAdminUK.dob, 'United Kingdom', 'GB',
    //         UserIF.corpAdminUK.postalCode, undefined, UserIF.corpAdminUK.city, UserIF.corpAdminUK.address1,
    //         UserIF.corpAdminUK.address2, undefined, undefined, `+44${UserIF.corpAdminUK.homeNumber}`, `+44${UserIF.corpAdminUK.phoneNumber}`);
    // });

    // it(`[C22076] UK Corporate Admin under Centtrip Admin: SalesForce @smoke`, async () => {
    //     AllureReporter.addSeverity('normal');
    //     AllureReporter.addStory('02 Corporate Admin under Centtrip Admin');
    //     AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22076');
    //     const contactsData = await Salesforce.getContactsByEmail(await UserIF.emailCorporateAdmin);
    //     await Salesforce.checkContactDataInSalesforce(contactsData, await UserIF.emailCorporateAdmin, salesforceData.standardRecordTypeId, UserIF.corpAdminUK.firstName,
    //         UserIF.corpAdminUK.lastName, 'GBP', false, true, false);
    // });

    // it(`[C30437] UK Corporate Admin under Centtrip Admin: Unique identity @smoke`, async () => {
    //     AllureReporter.addSeverity('normal');
    //     AllureReporter.addStory('02 Corporate Admin under Centtrip Admin');
    //     AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30437');
    //     await userDataInDB.userExistsUniqueIdentityv2(await UserIF.emailCorporateAdmin, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
    //         `${UserIF.corpAdminUK.firstName} ${UserIF.corpAdminUK.lastName}`, UserIF.corpAdminUK.dobDB,
    //         `+44${UserIF.corpAdminUK.phoneNumber}`, `+44${UserIF.corpAdminUK.phoneNumber}`, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2,
    //         UserIF.corpAdminUK.city, null, UserIF.corpAdminUK.postalCode, "United Kingdom");
    // });

    // ------------ C2.3 UK Corporate Admin under Super Admin ----------------------

    // it(`[C20826] Create Corporate Admin in UK under Super Admin: AspNetUsers @smoke`, async () => {
    //     AllureReporter.addSeverity('normal');
    //     AllureReporter.addStory('C2.3 UK Corporate Admin under Super Admin');
    //     AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/20826');
    //     console.log('C2.3 - ', await UserIF.corpAdminUnderCSA.email);
    //     await browser.url(URLs.UKPortalURL);
    //     await (await signInPageElements.signInWindow).waitForDisplayed();
    //     await signInPage.signInAsRegisteredUserUK(CredentialsIF.SuperAdminUK.Email, CredentialsIF.SuperAdminUK.Password);
    //     await createUserPageUK.openCreateUserPageUnderSuperAdmin(await UserIF.corpAdminUnderCSA.email);
    //     await createUserPageUK.createAdminUKUnderSA(UserIF.corpAdminUnderCSA.firstName, UserIF.corpAdminUnderCSA.lastName, UserIF.corpAdminUnderCSA.postalCode,
    //         UserIF.corpAdminUnderCSA.address1, UserIF.corpAdminUnderCSA.address2, UserIF.corpAdminUnderCSA.city, UserIF.countryUK,
    //         UserIF.corpAdminUnderCSA.phoneNumber, UserIF.corpAdminUnderCSA.homeNumber);
    //     await userDataInDB.userExistsAspNetUsersDB(await UserIF.corpAdminUnderCSA.email, UserIF.corpAdminUnderCSA.firstName, UserIF.corpAdminUnderCSA.lastName, UserIF.corpAdminUnderCSA.dobDB,
    //         `+44${UserIF.corpAdminUnderCSA.phoneNumber}`);
    //     await commonPageUK.logoutFromUK();
    // });

    // it(`[C22077] Create Corporate Admin in UK under Super Admin: UK identity @smoke`, async () => {
    //     AllureReporter.addSeverity('normal');
    //     AllureReporter.addStory('C2.3 UK Corporate Admin under Super Admin');
    //     AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22077');
    //     const addressArray = [UserIF.corpAdminUnderCSA.address1, UserIF.corpAdminUnderCSA.address2, UserIF.corpAdminUnderCSA.city, 'GB', UserIF.corpAdminUnderCSA.postalCode];
    //     await userDataInDB.userExistsIdentityUK(await UserIF.corpAdminUnderCSA.email, null, UserIF.corpAdminUnderCSA.firstName, UserIF.corpAdminUnderCSA.lastName, UserIF.corpAdminUnderCSA.dobDB,
    //         `+44${UserIF.corpAdminUnderCSA.phoneNumber}`, null, addressArray);
    // });

    // it(`[C22078] Create Corporate Admin in UK under Super Admin: DynamoDb @smoke`, async () => {
    //     AllureReporter.addSeverity('normal');
    //     AllureReporter.addStory('C2.3 UK Corporate Admin under Super Admin');
    //     AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22078');
    //     await userDataInDB.userExistsInDynamoDB(await UserIF.corpAdminUnderCSA.email, UserIF.corpAdminUnderCSA.firstName, UserIF.corpAdminUnderCSA.lastName, undefined, undefined,
    //         UserIF.corpAdminUnderCSA.dob, 'United Kingdom', 'GB', UserIF.corpAdminUnderCSA.postalCode, undefined, UserIF.corpAdminUnderCSA.city, UserIF.corpAdminUnderCSA.address1, UserIF.corpAdminUnderCSA.address2,
    //         undefined, undefined, `+44${UserIF.corpAdminUnderCSA.homeNumber}`, `+44${UserIF.corpAdminUnderCSA.phoneNumber}`);
    // });

    // it(`[C22076] Create Corporate Admin in UK under Centtrip Admin: SalesForce @smoke`, async () => {
    //     AllureReporter.addSeverity('normal');
    //     AllureReporter.addStory('C2.3 UK Corporate Admin under Super Admin');
    //     AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22076');
    //     const contactsData = await Salesforce.getContactsByEmail(await UserIF.corpAdminUnderCSA.email);
    //     await Salesforce.checkContactDataInSalesforce(contactsData, await UserIF.corpAdminUnderCSA.email, salesforceData.standardRecordTypeId, UserIF.corpAdminUnderCSA.firstName,
    //         UserIF.corpAdminUnderCSA.lastName, 'GBP', false, true, false);
    // });

    // it(`[C30438] Create Corporate Admin in UK under Super Admin: Unique identity @smoke`, async () => {
    //     AllureReporter.addSeverity('normal');
    //     AllureReporter.addStory('C2.3 UK Corporate Admin under Super Admin');
    //     AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30438');
    //     await userDataInDB.userExistsUniqueIdentityv2(await UserIF.corpAdminUnderCSA.email, UserIF.corpAdminUnderCSA.firstName, UserIF.corpAdminUnderCSA.lastName,
    //         `${UserIF.corpAdminUnderCSA.firstName} ${UserIF.corpAdminUnderCSA.lastName}`, UserIF.corpAdminUnderCSA.dobDB,
    //         `+44${UserIF.corpAdminUnderCSA.phoneNumber}`, `+44${UserIF.corpAdminUnderCSA.phoneNumber}`, UserIF.corpAdminUnderCSA.address1, UserIF.corpAdminUnderCSA.address2,
    //         UserIF.corpAdminUnderCSA.city, null, UserIF.corpAdminUnderCSA.postalCode, UserIF.countryUK);
    // });

    // ------------- C2.5 UK Cardholder -------------------------------

    it(`[C20780] UK Cardholder: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('C2.5 UK Cardholder');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/20780');
        console.log('C2.5 - ', await UserIF.emailCardholder);
        const fileName = await cardMigrationPage.generateBatchFile(await UserIF.emailCardholder, env);
        await Other.deleteCacheCookiesUK();
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(CredentialsIF.CenttripAdminiUK.Email, CredentialsIF.CenttripAdminiUK.Password);
        await createUserPageUK.openCardMigrationPage();
        await Actions.uploadFile(`${pathToUploadPfsCardCreation}${fileName}.xlsx`, await UKCardMigrationPageElements.chooseButton);
        await browser.pause(2000);
        await Actions.waitAndClick(await UKCardMigrationPageElements.uploadButton);
        await (await UKCardMigrationPageElements.uploadedMessage).waitForDisplayed();
        await cardMigrationPage.batchProccessCheck();
        await userDataInDB.userExistsAspNetUsersDB(await UserIF.emailCardholder, UserIF.cardholderUK.firstName, UserIF.cardholderUK.lastName,
            UserIF.cardholderUK.dobDB, `+44${UserIF.cardholderUK.phoneNumber}`);
        await commonPageUK.logoutFromUK();
    }).timeout(500000);

    it(`[C22116] UK Cardholder: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('C2.5 UK Cardholder');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22116');
        const addressArray = [UserIF.cardholderUK.address1, UserIF.cardholderUK.address2, UserIF.cardholderUK.city, 'GB',
        UserIF.cardholderUK.postalCode];
        await userDataInDB.userExistsIdentityUK(await UserIF.emailCardholder, null, UserIF.cardholderUK.firstName, UserIF.cardholderUK.lastName,
            UserIF.cardholderUK.dobDB, `+44${UserIF.cardholderUK.phoneNumber}`, null, addressArray);
    });

    it(`[C22131] UK Cardholder: UK MSSQL @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('C2.5 UK Cardholder');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22131');
        await userDataInDB.userExistInMSSQLDB(await UserIF.emailCardholder);
    });

    it(`[C22117] UK Cardholder: DynamoDb @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('C2.5 UK Cardholder');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22117');
        await userDataInDB.userExistsInDynamoDB(await UserIF.emailCardholder, UserIF.cardholderUK.firstName, UserIF.cardholderUK.lastName, undefined, undefined,
            UserIF.cardholderUK.dob, undefined, 'GB', UserIF.cardholderUK.postalCode, undefined, UserIF.cardholderUK.city,
            UserIF.cardholderUK.address1, UserIF.cardholderUK.address2, undefined, undefined, undefined, `44${UserIF.cardholderUK.phoneNumber}`);
    });

    it(`[C22118] UK Cardholder: SalesForce  @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('C2.5 UK Cardholder');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22118');
        const contactsData = await Salesforce.getPersonAccountDataByEmail(await UserIF.emailCardholder);
        await Salesforce.checkPersonAccountDataInSalesforce(contactsData, await UserIF.emailCardholder, salesforceData.personalRecordTypeId,
            UserIF.cardholderUK.firstNameSF, UserIF.cardholderUK.lastNameSF, UserIF.cardholderUK.dobSF, null, `44${UserIF.cardholderUK.phoneNumber}`,
            `${UserIF.cardholderUK.address1SF} ${UserIF.cardholderUK.address2SF}`, UserIF.cardholderUK.citySF,
            UserIF.cardholderUK.postalCode, UserIF.countryUK, false, false);
    });

    it(`[C30440] UK Cardholder: Unique identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('C2.5 UK Cardholder');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30440');
        await userDataInDB.userExistsUniqueIdentityv2(await UserIF.emailCardholder, UserIF.cardholderUK.firstName, UserIF.cardholderUK.lastName,
            `${UserIF.cardholderUK.firstName} ${UserIF.cardholderUK.lastName}`, UserIF.cardholderUK.dobDB,
            `+44${UserIF.cardholderUK.phoneNumber}`, `+44${UserIF.cardholderUK.phoneNumber}`, UserIF.cardholderUK.address1, UserIF.cardholderUK.address2,
            UserIF.cardholderUK.city, null, UserIF.cardholderUK.postalCode, UserIF.countryUK);
    });

    // ------------- C2.6 UK Corporate Admin > UK Cardholder -------------------------------

    it(`[C37784] UK Corporate Admin > UK Cardholder: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('C2.6 UK Corporate Admin > UK Cardholder');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37784');
        // Create Admin UK 
        console.log('C2.6 - ', await UserIF.corpAdmin2_6.email);
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(CredentialsIF.CenttripAdminiUK.Email, CredentialsIF.CenttripAdminiUK.Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('corporateAdmin', await UserIF.corpAdmin2_6.email, UserIF.accountUK, UserIF.corpAdmin2_6.title,
            UserIF.corpAdmin2_6.gender, UserIF.corpAdmin2_6.firstName, UserIF.corpAdmin2_6.lastName, UserIF.corpAdmin2_6.postalCode, UserIF.corpAdmin2_6.address1,
            UserIF.corpAdmin2_6.address2, UserIF.corpAdmin2_6.city, UserIF.countryUK, UserIF.phoneCodeUK, UserIF.phoneCodeUK, UserIF.corpAdmin2_6.phoneNumber,
            UserIF.corpAdmin2_6.homeNumber, UserIF.corpAdmin2_6.dob);
        await commonPageUK.logoutFromUK();
        // Create Cardholder UK 
        const fileName = await cardMigrationPage.generateBatchFile(await UserIF.corpAdmin2_6.email, env);
        await browser.url(URLs.UKPortalURL);
        await signInPage.signInAsRegisteredUserUK(CredentialsIF.CenttripAdminiUK.Email, CredentialsIF.CenttripAdminiUK.Password);
        await createUserPageUK.openCardMigrationPage();
        await Actions.uploadFile(`${pathToUploadPfsCardCreation}${fileName}.xlsx`, await UKCardMigrationPageElements.chooseButton);
        await browser.pause(2000);
        await Actions.waitAndClick(await UKCardMigrationPageElements.uploadButton);
        await (await UKCardMigrationPageElements.uploadedMessage).waitForDisplayed();
        await cardMigrationPage.batchProccessCheck();
        await userDataInDB.userExistsAspNetUsersDB(await UserIF.corpAdmin2_6.email, UserIF.corpAdmin2_6.firstName, UserIF.corpAdmin2_6.lastName,
            UserIF.corpAdmin2_6.dobDB, `+44${UserIF.corpAdmin2_6.phoneNumber}`);
        await commonPageUK.logoutFromUK();
    }).timeout(700000);

    it(`[C37785] UK Corporate Admin > UK Cardholder: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('C2.6 UK Corporate Admin > UK Cardholder');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37785');
        const addressArray = [UserIF.corpAdmin2_6.address1, UserIF.corpAdmin2_6.address2, UserIF.corpAdmin2_6.city, 'GB',
        UserIF.corpAdmin2_6.postalCode];
        await userDataInDB.userExistsIdentityUK(await UserIF.corpAdmin2_6.email, null, UserIF.corpAdmin2_6.firstName, UserIF.corpAdmin2_6.lastName,
            UserIF.corpAdmin2_6.dobDB, `+44${UserIF.corpAdmin2_6.phoneNumber}`, null, addressArray);
    });

    it(`[C37786] UK Corporate Admin > UK Cardholder: UK MSSQL @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('C2.6 UK Corporate Admin > UK Cardholder');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37786');
        await userDataInDB.userExistInMSSQLDB(await UserIF.corpAdmin2_6.email);
    });

    it(`[C37787] UK Corporate Admin > UK Cardholder: DynamoDb @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('C2.6 UK Corporate Admin > UK Cardholder');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37787');
        await userDataInDB.userExistsInDynamoDB(await UserIF.corpAdmin2_6.email, UserIF.corpAdmin2_6.firstName, UserIF.corpAdmin2_6.lastName, UserIF.corpAdmin2_6.gender, '2',
            UserIF.corpAdmin2_6.dob, 'United Kingdom', 'GB', UserIF.corpAdmin2_6.postalCode, undefined, UserIF.corpAdmin2_6.city,
            UserIF.corpAdmin2_6.address1, UserIF.corpAdmin2_6.address2, undefined, undefined, `+44${UserIF.corpAdmin2_6.phoneNumber}`, `+44${UserIF.corpAdmin2_6.phoneNumber}`);
    });

    it(`[C37788] UK Corporate Admin > UK Cardholder: SalesForce  @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('C2.6 UK Corporate Admin > UK Cardholder');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37788');
        const contactsData = await Salesforce.getPersonAccountDataByEmail(await UserIF.corpAdmin2_6.email);
        await Salesforce.checkContactArrayInSalesforce(contactsData[0], await UserIF.corpAdmin2_6.email, salesforceData.personalRecordTypeId, UserIF.corpAdmin2_6.firstName,
            UserIF.corpAdmin2_6.lastName, 'GBP', true, true, false);
    });

    it(`[C37789] UK Corporate Admin > UK Cardholder: Unique identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('C2.6 UK Corporate Admin > UK Cardholder');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37789');
        await userDataInDB.userExistsUniqueIdentityv2(await UserIF.corpAdmin2_6.email, UserIF.corpAdmin2_6.firstName, UserIF.corpAdmin2_6.lastName,
            `${UserIF.corpAdmin2_6.firstName} ${UserIF.corpAdmin2_6.lastName}`, UserIF.corpAdmin2_6.dobDB,
            `+44${UserIF.corpAdmin2_6.phoneNumber}`, `+44${UserIF.corpAdmin2_6.phoneNumber}`, UserIF.corpAdmin2_6.address1, UserIF.corpAdmin2_6.address2,
            UserIF.corpAdmin2_6.city, null, UserIF.corpAdmin2_6.postalCode, UserIF.countryUK);
    });
});