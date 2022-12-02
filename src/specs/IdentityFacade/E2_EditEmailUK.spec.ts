import { Other } from '../../core/utils/other';
import { RandomGenerator } from '../../core/utils/randomGenerator';
import { Salesforce } from '../../core/pages/externalServices/salesforce';
import { signInPageElements, UKCardMigrationPageElements } from '../../core/pages/locators';
import { salesforceData } from '../../testData/other';
import { Actions } from '../../core/utils/actions';
import AllureReporter from '@wdio/allure-reporter';
import { URLs } from '../../urls';
import { createUserPageUK } from '../../core/pages/centtripUK/createUserUK';
import userDataIF, { Password, pathToUploadPfsCardCreation, UserIF } from '../../testData/usersData';
import { commonPageUK } from '../../core/pages/centtripUK/commonUK';
import { userDataInDB } from '../../core/pages/userDataInDB';
import { signInPage } from '../../core/pages/centtripAppWeb/signInPage';
import { cardMigrationPage } from '../../core/pages/centtripUK/cardMigrationPage';
import ping from '../../connections'

describe(`Identity Facade >> E2 - Edit email for UK users`, () => {

    const emailuser2_1 = RandomGenerator.generateRandEmail('_e2.1@harakirimail.com');
    const emailuser2_1_edited = RandomGenerator.generateRandEmail('_e2.1e@harakirimail.com');
    const emailuser2_2 = RandomGenerator.generateRandEmail('_e2.2@harakirimail.com');
    const emailuser2_2_edited = RandomGenerator.generateRandEmail('_e2.2e@harakirimail.com');
    const emailuser2_3 = RandomGenerator.generateRandEmail('_e2.3@harakirimail.com');
    const emailuser2_3_edited = RandomGenerator.generateRandEmail('_e2.3e@harakirimail.com');

    before(async () => {
        if (!ping.connection._connectCalled) {
            await ping.connection.connect();
        }
    });

    beforeEach(async () => {
        AllureReporter.addFeature('Edit email - UK');
    });

    afterEach(async () => {
        await Other.deleteCacheCookiesUK();
    });

    // ---------- E2.1 UK Corporate Admin - Edit email under Centtrip Admin -------------------------------

    it(`[C37770] UK Corporate Admin - Edit email under Centtrip Admin: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E2.1 UK Corporate Admin - Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37770');
        console.log('E2.1 - ', await emailuser2_1);
        console.log('E2.1 - ', await emailuser2_1_edited);
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('corporateAdmin', await emailuser2_1, userDataIF.accountUK, UserIF.corpAdminUK.title, UserIF.corpAdminUK.gender,
            UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.postalCode, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2,
            UserIF.corpAdminUK.city, UserIF.countryUK, UserIF.phoneCodeUK, UserIF.phoneCodeUK, UserIF.corpAdminUK.phoneNumber, UserIF.corpAdminUK.homeNumber,
            UserIF.corpAdminUK.dob);
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.updateAccountEmail(await emailuser2_1, await emailuser2_1_edited);
        await commonPageUK.logoutFromUK();
        await userDataInDB.userNotExistsAspNetUsersDB(await emailuser2_1);
        await userDataInDB.userExistsAspNetUsersDB(await emailuser2_1_edited, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.dobDB,
            `+44${UserIF.corpAdminUK.phoneNumber}`);
    }).timeout(5000000);

    it(`[C37771] UK Corporate Admin - Edit email under Centtrip Admin: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E2.1 UK Corporate Admin - Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37771');
        await userDataInDB.userNotExistsIdentityUK(await emailuser2_1);
        const addressArray = [UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2, UserIF.corpAdminUK.city, UserIF.corpAdminUK.postalCode];
        await userDataInDB.userExistsIdentityUK(await emailuser2_1_edited, null, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.dobDB,
            `+44${UserIF.corpAdminUK.phoneNumber}`, null, addressArray);
    });

    xit(`[C37773] UK Corporate Admin - Edit email under Centtrip Admin: DynamoDb @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E2.1 UK Corporate Admin - Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37773');
        await userDataInDB.userNotExistInDynamoDB(await emailuser2_1);
        await userDataInDB.userExistsInDynamoDB(await emailuser2_1_edited, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.gender, undefined,
            UserIF.corpAdminUK.dob, UserIF.countryUK, 'GB', UserIF.corpAdminUK.postalCode, undefined, UserIF.corpAdminUK.city, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2, '  ', undefined,
            `+44${UserIF.corpAdminUK.homeNumber}`, `+44${UserIF.corpAdminUK.phoneNumber}`);
    });

    it(`[C37774] UK Corporate Admin - Edit email under Centtrip Admin: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E2.1 UK Corporate Admin - Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37774');
        AllureReporter.addIssue('https://centtrip.atlassian.net/browse/CEN-7243');
        AllureReporter.addIssue('https://centtrip.atlassian.net/browse/CEN-6909');
        await Salesforce.checkThatContactNotExist(await emailuser2_1);
        const contactsData = await Salesforce.getContactsByEmail(await emailuser2_1_edited);
        await Salesforce.checkContactDataInSalesforce(contactsData, await emailuser2_1_edited, salesforceData.standardRecordTypeId, UserIF.corpAdminUK.firstName,
            UserIF.corpAdminUK.lastName, 'GBP', false, true, true);
    });

    it(`[C37775] UK Corporate Admin - Edit email under Centtrip Admin: Unique identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E2.1 UK Corporate Admin - Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37775');
        await userDataInDB.userNotExistsUniqueIdentityv2(await emailuser2_1);
        await userDataInDB.userExistsUniqueIdentityv2(await emailuser2_1_edited, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
            `${UserIF.corpAdminUK.firstName} ${UserIF.corpAdminUK.lastName}`, UserIF.corpAdminUK.dobDB,
            `+44${UserIF.corpAdminUK.phoneNumber}`, `+44${UserIF.corpAdminUK.phoneNumber}`, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2,
            UserIF.corpAdminUK.city, null, UserIF.corpAdminUK.postalCode, UserIF.countryUK);
    });

    // ------------- E2.2 UK Cardholder - Edit email under Centtrip Admin -------------------------------

    it(`[C37777] UK Cardholder - Edit email under Centtrip Admin: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E2.2 UK Cardholder - Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37777');
        console.log('E2.2 - ', await emailuser2_2);
        console.log('E2.2 - ', await emailuser2_2_edited);
        const fileName = await cardMigrationPage.generateBatchFile(await emailuser2_2, process.env.ENV);
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
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.updateAccountEmail(await emailuser2_2, await emailuser2_2_edited);
        await commonPageUK.logoutFromUK();
        await userDataInDB.userNotExistsAspNetUsersDB(await emailuser2_2);
        await userDataInDB.userExistsAspNetUsersDB(await emailuser2_2_edited, UserIF.cardholderUK.firstName, UserIF.cardholderUK.lastName,
            UserIF.cardholderUK.dobDB, `+44${UserIF.cardholderUK.phoneNumber}`);
    }).timeout(7000000);

    it(`[C37778] UK Cardholder - Edit email under Centtrip Admin: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E2.2 UK Cardholder - Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37778');
        await userDataInDB.userNotExistsIdentityUK(await emailuser2_2);
        const addressArray = [UserIF.cardholderUK.address1, UserIF.cardholderUK.address2, UserIF.cardholderUK.city, UserIF.cardholderUK.postalCode];
        await userDataInDB.userExistsIdentityUK(await emailuser2_2_edited, null, UserIF.cardholderUK.firstName, UserIF.cardholderUK.lastName,
            UserIF.cardholderUK.dobDB, `+44${UserIF.cardholderUK.phoneNumber}`, null, addressArray);
    });

    it(`[C37779] UK Cardholder - Edit email under Centtrip Admin: UK MSSQL @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E2.2 UK Cardholder - Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37779');
        await userDataInDB.userNotExistInMSSQLDB(await emailuser2_2);
        await userDataInDB.userExistInMSSQLDB(await emailuser2_2_edited);
    });

    xit(`[C37781] UK Cardholder - Edit email under Centtrip Admin: DynamoDb @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E2.2 UK Cardholder - Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37781');
        await userDataInDB.userNotExistInDynamoDB(await emailuser2_2);
        await userDataInDB.userExistsInDynamoDB(await emailuser2_2_edited, UserIF.cardholderUK.firstName, UserIF.cardholderUK.lastName, undefined, undefined,
            UserIF.cardholderUK.dob, undefined, undefined, UserIF.cardholderUK.postalCode, undefined, UserIF.cardholderUK.city,
            UserIF.cardholderUK.address1, UserIF.cardholderUK.address2, '  ', undefined, `+44${UserIF.cardholderUK.phoneNumber}`, `+44${UserIF.cardholderUK.phoneNumber}`);
    });

    it(`[C37782] UK Cardholder - Edit email under Centtrip Admin: SalesForce  @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E2.2 UK Cardholder - Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37782');
        AllureReporter.addIssue('https://centtrip.atlassian.net/browse/CEN-6908');
        await Salesforce.checkThatContactNotExist(await emailuser2_2);
        const contactsData = await Salesforce.getPersonAccountDataByEmail(await emailuser2_2_edited);
        await Salesforce.checkPersonAccountDataInSalesforce(contactsData, await emailuser2_2_edited, salesforceData.personalRecordTypeId, UserIF.cardholderUK.firstNameSF,
            UserIF.cardholderUK.lastNameSF, UserIF.cardholderUK.dobSF, null, `44${UserIF.cardholderUK.phoneNumber}`,
            `${UserIF.cardholderUK.address1SF} ${UserIF.cardholderUK.address2SF}`, UserIF.cardholderUK.citySF,
            UserIF.cardholderUK.postalCode, UserIF.countryUK, false, false);
    });

    it(`[C37773] UK Cardholder - Edit email under Centtrip Admin: Unique identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E2.2 UK Cardholder - Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37783');
        await userDataInDB.userNotExistsUniqueIdentityv2(await emailuser2_2);
        await userDataInDB.userExistsUniqueIdentityv2(await emailuser2_2_edited, UserIF.cardholderUK.firstName, UserIF.cardholderUK.lastName,
            `${UserIF.cardholderUK.firstName} ${UserIF.cardholderUK.lastName}`, UserIF.cardholderUK.dobDB,
            `+44${UserIF.cardholderUK.phoneNumber}`, `+44${UserIF.cardholderUK.phoneNumber}`, UserIF.cardholderUK.address1, UserIF.cardholderUK.address2,
            UserIF.cardholderUK.city, null, UserIF.cardholderUK.postalCode, UserIF.countryUK);
    });

    // ------------- E2.3 UK Corporate Admin > UK Cardholder - Edit email under Centtrip Admin -------------------------------

    it(`[C37812] UK Corporate Admin > UK Cardholder - Edit email under Centtrip Admin: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E2.3 UK Corporate Admin > UK Cardholder - Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37812');
        console.log('E2.3 - ', await emailuser2_3);
        console.log('E2.3 - ', await emailuser2_3_edited);
        // Create Admin UK 
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('superAdmin', await emailuser2_3, userDataIF.accountUK, UserIF.corpAdmin2_6.title, UserIF.corpAdmin2_6.gender,
            UserIF.corpAdmin2_6.firstName, UserIF.corpAdmin2_6.lastName, UserIF.corpAdmin2_6.postalCode, UserIF.corpAdmin2_6.address1, UserIF.corpAdmin2_6.address2, UserIF.corpAdmin2_6.city,
            UserIF.countryUK, UserIF.phoneCodeUK, UserIF.phoneCodeUK, UserIF.corpAdmin2_6.phoneNumber, UserIF.corpAdmin2_6.homeNumber, UserIF.corpAdmin2_6.dob);
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        // Create Cardholder UK 
        const fileName = await cardMigrationPage.generateBatchFile(await emailuser2_3, process.env.ENV);
        await browser.url(URLs.UKPortalURL);
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.openCardMigrationPage();
        await Actions.uploadFile(`${pathToUploadPfsCardCreation}${fileName}.xlsx`, await UKCardMigrationPageElements.chooseButton);
        await browser.pause(2000);
        await Actions.waitAndClick(await UKCardMigrationPageElements.uploadButton);
        await (await UKCardMigrationPageElements.uploadedMessage).waitForDisplayed();
        await cardMigrationPage.batchProccessCheck();
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        // Update Email 
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.updateAccountEmail(await emailuser2_3, await emailuser2_3_edited);
        await commonPageUK.logoutFromUK();
        await userDataInDB.userNotExistsAspNetUsersDB(await emailuser2_3);
        await userDataInDB.userExistsAspNetUsersDB(await emailuser2_3_edited, UserIF.corpAdmin2_6.firstName, UserIF.corpAdmin2_6.lastName,
            UserIF.corpAdmin2_6.dobDB, `+44${UserIF.corpAdmin2_6.phoneNumber}`);
    }).timeout(8000000);

    it(`[C37813] UK Corporate Admin > UK Cardholder - Edit email under Centtrip Admin: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E2.3 UK Corporate Admin > UK Cardholder - Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37813');
        await userDataInDB.userNotExistsIdentityUK(await emailuser2_3);
        const addressArray = [UserIF.corpAdmin2_6.address1, UserIF.corpAdmin2_6.address2, UserIF.corpAdmin2_6.city, UserIF.corpAdmin2_6.postalCode];
        await userDataInDB.userExistsIdentityUK(await emailuser2_3_edited, null, UserIF.corpAdmin2_6.firstName, UserIF.corpAdmin2_6.lastName,
            UserIF.corpAdmin2_6.dobDB, `+44${UserIF.corpAdmin2_6.phoneNumber}`, null, addressArray);
    });

    it(`[C37814] UK Corporate Admin > UK Cardholder - Edit email under Centtrip Admin: UK MSSQL @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E2.3 UK Corporate Admin > UK Cardholder - Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37814');
        await userDataInDB.userNotExistInMSSQLDB(await emailuser2_3);
        await userDataInDB.userExistInMSSQLDB(await emailuser2_3_edited);
    });

    xit(`[C37815] UK Corporate Admin > UK Cardholder - Edit email under Centtrip Admin: DynamoDb @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E2.3 UK Corporate Admin > UK Cardholder - Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37815');
        await userDataInDB.userNotExistInDynamoDB(await emailuser2_3);
        await userDataInDB.userExistsInDynamoDB(await emailuser2_3_edited, UserIF.corpAdmin2_6.firstName, UserIF.corpAdmin2_6.lastName, UserIF.corpAdmin2_6.gender, undefined,
            UserIF.corpAdmin2_6.dob, UserIF.countryUK, 'GB', UserIF.corpAdmin2_6.postalCode, undefined, UserIF.corpAdmin2_6.city,
            UserIF.corpAdmin2_6.address1, UserIF.corpAdmin2_6.address2, '  ', undefined, `+44${UserIF.corpAdmin2_6.phoneNumber}`, `+44${UserIF.corpAdmin2_6.phoneNumber}`);
    });

    it(`[C37816] UK Corporate Admin > UK Cardholder - Edit email under Centtrip Admin: SalesForce  @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E2.3 UK Corporate Admin > UK Cardholder - Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37816');
        AllureReporter.addIssue('https://centtrip.atlassian.net/browse/CEN-6909');
        AllureReporter.addIssue('https://centtrip.atlassian.net/browse/CEN-6908');
        await Salesforce.getContactsByEmailAdminAndCardholder(await emailuser2_3);
        const contactsData = await Salesforce.getPersonAccountDataByEmail(await emailuser2_3_edited);
        await Salesforce.checkPersonAccountDataInSalesforce(contactsData, await emailuser2_3_edited, salesforceData.personalRecordTypeId, UserIF.corpAdmin2_6.firstName,
            UserIF.corpAdmin2_6.lastName, UserIF.corpAdmin2_6.dob, null, `44${UserIF.corpAdmin2_6.phoneNumber}`,
            `${UserIF.corpAdmin2_6.address1} ${UserIF.corpAdmin2_6.address2}`, UserIF.corpAdmin2_6.city,
            UserIF.corpAdmin2_6.postalCode, UserIF.countryUK, false, false);
    });

    it(`[C37817] UK Cardholder - Edit email under Centtrip Admin: Unique identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('E2.2 UK Cardholder - Edit email under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37817');
        AllureReporter.addIssue('https://centtrip.atlassian.net/browse/CEN-7576');
        await userDataInDB.userNotExistsUniqueIdentityv2(await emailuser2_3);
        await userDataInDB.userExistsUniqueIdentityv2(await emailuser2_3_edited, UserIF.corpAdmin2_6.firstName, UserIF.corpAdmin2_6.lastName,
            `${UserIF.corpAdmin2_6.firstName} ${UserIF.corpAdmin2_6.lastName}`, UserIF.corpAdmin2_6.dobDB,
            `+44${UserIF.corpAdmin2_6.phoneNumber}`, `+44${UserIF.corpAdmin2_6.phoneNumber}`, UserIF.corpAdmin2_6.address1, UserIF.corpAdmin2_6.address2,
            UserIF.corpAdmin2_6.city, null, UserIF.corpAdmin2_6.postalCode, UserIF.countryUK);
    });
});