import { commonPageUK } from '../../core/pages/centtripUK/commonUK';
import { salesforceData } from '../../testData/other';
import { RandomGenerator } from '../../core/utils/randomGenerator';
import { signInPage } from '../../core/pages/centtripAppWeb/signInPage';
import { createUserPageUK } from '../../core/pages/centtripUK/createUserUK';
import { cardMigrationPage } from '../../core/pages/centtripUK/cardMigrationPage';
import { Salesforce } from '../../core/pages/externalServices/salesforce';
import { general, signInPageElements, UKCardMigrationPageElements, UKCreateUserPageElements, UKGeneralElements } from '../../core/pages/locators';
import { Actions } from '../../core/utils/actions';
import { Other } from '../../core/utils/other';
import { URLs } from '../../urls';
import AllureReporter from '@wdio/allure-reporter';
import userDataIF, { Password, pathToUploadPfsCardCreation, UserIF } from '../../testData/usersData';
import { userDataInDB } from '../../core/pages/userDataInDB';
import ping from '../../connections';

describe(`Identity Facade >> U2 - Update UK users`, () => {

    const emailsuperAdminUKEdit = RandomGenerator.generateRandEmail('_csa_uk_2.1@harakirimail.com');
    const emailCorpAdminEdit = RandomGenerator.generateRandEmail('_ca_uk_2.2@harakirimail.com');
    const emailCardholderEdit = RandomGenerator.generateRandEmail('_ch_uk_2.3@harakirimail.com');
    const emailCardholderEdit4 = RandomGenerator.generateRandEmail('_ch_uk_2.4@harakirimail.com');
    const emailAdminEdit5 = RandomGenerator.generateRandEmail('_cach_uk_2.5@harakirimail.com');
    const emailCardholderEdit6 = RandomGenerator.generateRandEmail('_cach_uk_2.6@harakirimail.com');

    const superAdminUKEdit = {
        firstName: 'FirstUKO' + RandomGenerator.lowerCaseText(5),
        lastName: 'LastUKO' + RandomGenerator.lowerCaseText(5),
        gender: 'Male',
        city: 'CityUKO',
        address1: 'AddLine1UKO',
        address2: 'AddLine2UKO',
        postalCode: '11115',
        phoneNumber: '7883200468',
        homeNumber: '7883200468',
        dob: '15/02/1995',
        dobDB: 'Wed Feb 15 1995',
        title: 'Mr.',
    };

    const corporateAdminEdit = {
        firstName: 'FirstUKQ' + RandomGenerator.lowerCaseText(5),
        lastName: 'LastUKQ' + RandomGenerator.lowerCaseText(5),
        gender: 'Male',
        city: 'CityUKQ',
        address1: 'AddLine1UKQ',
        address2: 'AddLine2UKQ',
        postalCode: '11117',
        phoneNumber: '2027953213',
        homeNumber: '2027953213',
        dob: '17/02/1997',
        dobDB: 'Mon Feb 17 1997',
        title: 'Mr.',
    };

    before(async () => {
        if (!ping.connection._connectCalled) {
            await ping.connection.connect();
        }
    });

    beforeEach(async () => {
        AllureReporter.addFeature('Update User UK');
    });

    afterEach(async () => {
        await Other.deleteCacheCookiesUK();
    });

    // --------- U2.1 UK Super Admin - Edit UStoUK country ---------------------------------

    it(`[C20820] UK Super Admin - Edit UStoUK country: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.1 UK Super Admin - Edit UStoUK country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/20820');
        console.log('U2.1 - ', await emailsuperAdminUKEdit);
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('superAdmin', await emailsuperAdminUKEdit, userDataIF.accountUK, UserIF.superAdminUK.title, UserIF.superAdminUK.gender,
            UserIF.superAdminUK.firstName, UserIF.superAdminUK.lastName, UserIF.superAdminUK.postalCode, UserIF.superAdminUK.address1, UserIF.superAdminUK.address2,
            UserIF.superAdminUK.city, 'United States', UserIF.phoneCodeUSA, UserIF.phoneCodeUSA, UserIF.superAdminUK.phoneNumber, UserIF.superAdminUK.homeNumber,
            UserIF.superAdminUK.dob);
        await commonPageUK.logoutFromUK();
        await browser.url(URLs.UKPortalURL);
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.updateUserUK(await emailsuperAdminUKEdit, userDataIF.accountUK, superAdminUKEdit.title, superAdminUKEdit.gender,
            superAdminUKEdit.firstName, superAdminUKEdit.lastName, superAdminUKEdit.postalCode, superAdminUKEdit.address1, superAdminUKEdit.address2, superAdminUKEdit.city,
            UserIF.countryUK, UserIF.phoneCodeUK, UserIF.phoneCodeUK, superAdminUKEdit.phoneNumber, superAdminUKEdit.homeNumber, superAdminUKEdit.dob, true);
        await userDataInDB.userExistsAspNetUsersDB(await emailsuperAdminUKEdit, superAdminUKEdit.firstName, superAdminUKEdit.lastName, superAdminUKEdit.dobDB,
            `+44${superAdminUKEdit.phoneNumber}`);
        await commonPageUK.logoutFromUK();
    }).timeout(5000000);

    it(`[C22132] UK Super Admin - Edit UStoUK country: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.1 UK Super Admin - Edit UStoUK country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22132');
        const addressArray = [superAdminUKEdit.address1, superAdminUKEdit.address2, superAdminUKEdit.city, 'GB', superAdminUKEdit.postalCode];
        await userDataInDB.userExistsIdentityUK(await emailsuperAdminUKEdit, null, superAdminUKEdit.firstName, superAdminUKEdit.lastName, superAdminUKEdit.dobDB,
            `+44${superAdminUKEdit.phoneNumber}`, null, addressArray);
    });

    xit(`[C22133] UK Super Admin - Edit UStoUK country: DynamoDb @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.1 UK Super Admin - Edit UStoUK country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22133');
        await userDataInDB.userExistsInDynamoDB(await emailsuperAdminUKEdit, superAdminUKEdit.firstName, superAdminUKEdit.lastName, superAdminUKEdit.gender, '1',
            superAdminUKEdit.dob, UserIF.countryUK, 'GB', superAdminUKEdit.postalCode, undefined, superAdminUKEdit.city, superAdminUKEdit.address1, superAdminUKEdit.address2, '  ', undefined,
            `+44${superAdminUKEdit.homeNumber}`, `+44${superAdminUKEdit.phoneNumber}`);
    });

    it(`[C22134] UK Super Admin - Edit UStoUK country: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.1 UK Super Admin - Edit UStoUK country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22134');
        const contactsData = await Salesforce.getContactsByEmail(await emailsuperAdminUKEdit);
        await Salesforce.checkContactDataInSalesforce(contactsData, await emailsuperAdminUKEdit, salesforceData.standardRecordTypeId, superAdminUKEdit.firstName,
            superAdminUKEdit.lastName, 'GBP', false, true, true);
    });

    it(`[C30451] UK Super Admin - Edit UStoUK country: Unique identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.1 UK Super Admin - Edit UStoUK country');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30451');
        await userDataInDB.userExistsUniqueIdentityv2(await emailsuperAdminUKEdit, superAdminUKEdit.firstName, superAdminUKEdit.lastName,
            `${superAdminUKEdit.firstName} ${superAdminUKEdit.lastName}`, superAdminUKEdit.dobDB,
            `+44${superAdminUKEdit.phoneNumber}`, `+44${superAdminUKEdit.phoneNumber}`, superAdminUKEdit.address1, superAdminUKEdit.address2,
            superAdminUKEdit.city, null, superAdminUKEdit.postalCode, UserIF.countryUK);
    });

    // ------------ U2.2 UK Corporate Admin - Edit UKtoUS country under Centtrip Admin ------------------------------

    it(`[C20824] UK Corporate Admin - Edit UKtoUS country under Centtrip Admin: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.2 UK Corporate Admin - Edit UKtoUS country under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/20824');
        console.log('U2.2 - ', await emailCorpAdminEdit);
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('corporateAdmin', await emailCorpAdminEdit, userDataIF.accountUK, UserIF.corpAdminUK.title,
            UserIF.corpAdminUK.gender, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.postalCode,
            UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2, UserIF.corpAdminUK.city, UserIF.countryUK, UserIF.phoneCodeUK,
            UserIF.phoneCodeUK, UserIF.corpAdminUK.phoneNumber, UserIF.corpAdminUK.homeNumber, UserIF.corpAdminUK.dob);
        await commonPageUK.logoutFromUK();
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.updateUserUK(await emailCorpAdminEdit, userDataIF.accountUK, corporateAdminEdit.title, corporateAdminEdit.gender,
            corporateAdminEdit.firstName, corporateAdminEdit.lastName, corporateAdminEdit.postalCode, corporateAdminEdit.address1, corporateAdminEdit.address2,
            corporateAdminEdit.city, 'United States', UserIF.phoneCodeUSA, UserIF.phoneCodeUSA, corporateAdminEdit.phoneNumber, corporateAdminEdit.homeNumber,
            corporateAdminEdit.dob, true);
        await commonPageUK.logoutFromUK();
        await userDataInDB.userExistsAspNetUsersDB(await emailCorpAdminEdit, corporateAdminEdit.firstName, corporateAdminEdit.lastName, corporateAdminEdit.dobDB,
            `+1${corporateAdminEdit.phoneNumber}`);
    }).timeout(5000000);

    it(`[C22135] UK Corporate Admin - Edit UKtoUS country under Centtrip Admin: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.2 UK Corporate Admin - Edit UKtoUS country under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22135');
        const addressArray = [corporateAdminEdit.address1, corporateAdminEdit.address2, corporateAdminEdit.city, 'US', corporateAdminEdit.postalCode];
        await userDataInDB.userExistsIdentityUK(await emailCorpAdminEdit, null, corporateAdminEdit.firstName, corporateAdminEdit.lastName,
            corporateAdminEdit.dobDB, `+1${corporateAdminEdit.phoneNumber}`, null, addressArray);
    });

    xit(`[C22136] UK Corporate Admin - Edit UKtoUS country under Centtrip Admin: DynamoDb @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.2 UK Corporate Admin - Edit UKtoUS country under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22136');
        await userDataInDB.userExistsInDynamoDB(await emailCorpAdminEdit, corporateAdminEdit.firstName, corporateAdminEdit.lastName, corporateAdminEdit.gender,
            '1', corporateAdminEdit.dob, UserIF.countryUSA, 'US', corporateAdminEdit.postalCode, undefined, corporateAdminEdit.city,
            corporateAdminEdit.address1, corporateAdminEdit.address2, '  ', undefined, `+1${corporateAdminEdit.homeNumber}`, `+1${corporateAdminEdit.phoneNumber}`);
    });

    it(`[C22137] UK Corporate Admin - Edit UKtoUS country under Centtrip Admin: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.2 UK Corporate Admin - Edit UKtoUS country under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22137');
        const contactsData = await Salesforce.getContactsByEmail(await emailCorpAdminEdit);
        await Salesforce.checkContactDataInSalesforce(contactsData, await emailCorpAdminEdit, salesforceData.standardRecordTypeId, corporateAdminEdit.firstName,
            corporateAdminEdit.lastName, 'GBP', false, true, false);
    });

    it(`[C30452] Corporate Admin: Create in UK > Edit in UK: Unique identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.2 UK Corporate Admin - Edit UKtoUS country under Centtrip Admin ');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30452');
        await userDataInDB.userExistsUniqueIdentityv2(await emailCorpAdminEdit, corporateAdminEdit.firstName, corporateAdminEdit.lastName,
            `${corporateAdminEdit.firstName} ${corporateAdminEdit.lastName}`, corporateAdminEdit.dobDB,
            `+1${corporateAdminEdit.phoneNumber}`, `+1${corporateAdminEdit.phoneNumber}`, corporateAdminEdit.address1, corporateAdminEdit.address2,
            corporateAdminEdit.city, null, corporateAdminEdit.postalCode, UserIF.countryUSA);
    });

    // --------------- U2.3 UK Cardholder - Modify under Centtrip Admin ------------------------------

    it(`[C20823] UK Cardholder - Modify under Centtrip Admin: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.3 UK Cardholder - Modify under Centtrip Admin ');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/20823');
        console.log('U2.3 - ', await emailCardholderEdit);
        const fileName = await cardMigrationPage.generateBatchFile(await emailCardholderEdit, process.env.env);
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
        // Modify under Centtrip Admin
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.switchToAnotherAccount(await emailCardholderEdit);
        await (await UKGeneralElements.settingsButton).moveTo();
        await Actions.waitAndClick(await general.linkByName('Modify Card Holder Details'));
        await createUserPageUK.updateCardholderUserUK(await emailCardholderEdit, `+44${UserIF.cardholderUKEdit.phoneNumber}`, UserIF.cardholderUKEdit.dob);
        await userDataInDB.userExistsAspNetUsersDB(await emailCardholderEdit, UserIF.cardholderUK.firstName, UserIF.cardholderUK.lastName,
            UserIF.cardholderUKEdit.dobDB, `+44${UserIF.cardholderUKEdit.phoneNumber}`);
        await commonPageUK.logoutFromUK();
    }).timeout(8000000);

    it(`[C22191] UK Cardholder - Modify under Centtrip Admin: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.3 UK Cardholder - Modify under Centtrip Admin ');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22191');
        const addressArray = [UserIF.cardholderUK.address1, UserIF.cardholderUK.address2, UserIF.cardholderUK.city, 'GB', UserIF.cardholderUK.postalCode];
        await userDataInDB.userExistsIdentityUK(await emailCardholderEdit, null, UserIF.cardholderUK.firstName, UserIF.cardholderUK.lastName,
            UserIF.cardholderUKEdit.dobDB, `+44${UserIF.cardholderUKEdit.phoneNumber}`, null, addressArray);
    });

    xit(`[C22195] UK Cardholder - Modify under Centtrip Admin: DynamoDb @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.3 UK Cardholder - Modify under Centtrip Admin ');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22195');
        await userDataInDB.userExistsInDynamoDB(await emailCardholderEdit, UserIF.cardholderUK.firstName, UserIF.cardholderUK.lastName,
            undefined, undefined, UserIF.cardholderUKEdit.dob, UserIF.countryUK, 'GB', UserIF.cardholderUK.postalCode, undefined,
            UserIF.cardholderUK.city, UserIF.cardholderUK.address1, UserIF.cardholderUK.address2, '  ', undefined,
            `+44${UserIF.cardholderUKEdit.phoneNumber}`, `+44${UserIF.cardholderUKEdit.phoneNumber}`);
    });

    it(`[C22198] UK Cardholder - Modify under Centtrip Admin: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.3 UK Cardholder - Modify under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/22198');
        const contactsData = await Salesforce.getPersonAccountDataByEmail(await emailCardholderEdit);
        await Salesforce.checkPersonAccountDataInSalesforce(contactsData, await emailCardholderEdit, salesforceData.personalRecordTypeId,
            UserIF.cardholderUK.firstName, UserIF.cardholderUK.lastName, UserIF.cardholderUK.dobSF, null,
            `+44${UserIF.cardholderUKEdit.phoneNumber}`, `+44${UserIF.cardholderUK.address1} ${UserIF.cardholderUK.address2}`,
            UserIF.cardholderUK.city, UserIF.cardholderUK.postalCode, UserIF.countryUK, false, false);
    });

    it(`[C30454] UK Cardholder - Modify under Centtrip Admin: Unique identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.3 UK Cardholder - Modify under Centtrip Admin ');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/30454');
        await userDataInDB.userExistsUniqueIdentityv2(await emailCardholderEdit, UserIF.cardholderUK.firstName, UserIF.cardholderUK.lastName,
            `CARDUK HOLDERUK`, UserIF.cardholderUKEdit.dobDB, `+44${UserIF.cardholderUKEdit.phoneNumber}`, `+44${UserIF.cardholderUKEdit.phoneNumber}`,
            UserIF.cardholderUK.address1, UserIF.cardholderUK.address2,
            UserIF.cardholderUK.city, null, UserIF.cardholderUK.postalCode, UserIF.countryUK);
    });

    // --------------- U2.4 UK Cardholder - Edit under Super Admin ------------------------------

    it(`[C37561] UK Cardholder - Edit under Super Admin: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.4 UK Cardholder - Edit under Super Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37561');
        console.log('U2.4 - ', await emailCardholderEdit4);
        const fileName = await cardMigrationPage.generateBatchFile(await emailCardholderEdit4, process.env.env);
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
        //Edit CH user under CSA
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.SuperAdminUK, Password);
        await (await general.elementByText('Last')).scrollIntoView();
        await Actions.waitAndClick(await UKCreateUserPageElements.superAdmin.lastPageOfChs);
        await Actions.waitAndClick(await general.lastEditBtn);
        await (await general.elementByText('CARDHOLDER CARDS')).waitForDisplayed();
        await createUserPageUK.updateCardholderUKUnderCSA(UserIF.cardholderUKEdit.dob, UserIF.phoneCodeUK, UserIF.cardholderUKEdit.phoneNumber);
        await userDataInDB.userExistsAspNetUsersDB(await emailCardholderEdit4, UserIF.cardholderUK.firstName, UserIF.cardholderUK.lastName,
            UserIF.cardholderUKEdit.dobDB, `+44${UserIF.cardholderUKEdit.phoneNumber}`);
    }).timeout(5000000);

    it(`[C37562] UK Cardholder - Edit under Super Admin: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.4 UK Cardholder - Edit under Super Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37562');
        const addressArray = [UserIF.cardholderUK.address1, UserIF.cardholderUK.address2, UserIF.cardholderUK.city, 'GB',
        UserIF.cardholderUK.postalCode];
        await userDataInDB.userExistsIdentityUK(await emailCardholderEdit4, null, UserIF.cardholderUK.firstName, UserIF.cardholderUK.lastName,
            UserIF.cardholderUKEdit.dobDB, `+44${UserIF.cardholderUKEdit.phoneNumber}`, null, addressArray);
    });

    xit(`[C37563] UK Cardholder - Edit under Super Admin: DynamoDb @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.4 UK Cardholder - Edit under Super Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37563');
        await userDataInDB.userExistsInDynamoDB(await emailCardholderEdit4, UserIF.cardholderUK.firstName, UserIF.cardholderUK.lastName,
            undefined, undefined, UserIF.cardholderUKEdit.dob, UserIF.countryUK, 'GB', UserIF.cardholderUK.postalCode, undefined,
            UserIF.cardholderUK.city, UserIF.cardholderUK.address1, UserIF.cardholderUK.address2, '  ', undefined,
            `+44${UserIF.cardholderUKEdit.phoneNumber}`, `+44${UserIF.cardholderUKEdit.phoneNumber}`);
    });

    it(`[C37564] UK Cardholder - Edit under Super Admin: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.4 UK Cardholder - Edit under Super Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37564');
        const contactsData = await Salesforce.getPersonAccountDataByEmail(await emailCardholderEdit4);
        await Salesforce.checkPersonAccountDataInSalesforce(contactsData, await emailCardholderEdit4, salesforceData.personalRecordTypeId,
            UserIF.cardholderUK.firstNameSF, UserIF.cardholderUK.lastNameSF, UserIF.cardholderUKEdit.dobSF, null,
            `44${UserIF.cardholderUKEdit.phoneNumber}`, `${UserIF.cardholderUK.address1SF} ${UserIF.cardholderUK.address2SF}`,
            UserIF.cardholderUK.citySF, UserIF.cardholderUK.postalCode, UserIF.countryUK, false, false);
    });

    it(`[C37565] UK Cardholder - Edit under Super Admin: Unique identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.4 UK Cardholder - Edit under Super Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37565');
        await userDataInDB.userExistsUniqueIdentityv2(await emailCardholderEdit4, UserIF.cardholderUK.firstName, UserIF.cardholderUK.lastName,
            `CARDUK HOLDERUK`, UserIF.cardholderUKEdit.dobDB,
            `+44${UserIF.cardholderUKEdit.phoneNumber}`, `+44${UserIF.cardholderUKEdit.phoneNumber}`, UserIF.cardholderUK.address1, UserIF.cardholderUK.address2,
            UserIF.cardholderUK.city, null, UserIF.cardholderUK.postalCode, UserIF.countryUK);
    });

    // --------------- U2.5 UK Corporate Admin > UK Cardholder - Modify under Centtrip Admin ------------------------------

    it(`[C37794] UK Corporate Admin > UK Cardholder - Modify under Centtrip Admin: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.5 UK Corporate Admin > UK Cardholder - Modify under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37794');
        console.log('U2.5 - ', await emailAdminEdit5);
        // Create UK Admin 
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('corporateAdmin', await emailAdminEdit5, userDataIF.accountUK, UserIF.corpAdminUK.title,
            UserIF.corpAdminUK.gender, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.postalCode,
            UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2, UserIF.corpAdminUK.city, UserIF.countryUK,
            UserIF.phoneCodeUK, UserIF.phoneCodeUK, UserIF.corpAdminUK.phoneNumber, UserIF.corpAdminUK.homeNumber,
            UserIF.corpAdminUK.dob);
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        // Create UK Cardholder
        const fileName = await cardMigrationPage.generateBatchFile(await emailAdminEdit5, process.env.env);
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
        // Modify UK cardholder
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.switchToAnotherAccount(await emailAdminEdit5);
        await (await UKGeneralElements.settingsButton).moveTo();
        await Actions.waitAndClick(await general.linkByName('Modify Card Holder Details'));
        await createUserPageUK.updateCardholderUserUK(await emailAdminEdit5, `+1${UserIF.cardholderUKEdit.phoneNumber}`, UserIF.cardholderUKEdit.dob);
        await userDataInDB.userExistsAspNetUsersDB(await emailAdminEdit5, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
            UserIF.cardholderUKEdit.dobDB, `+1${UserIF.cardholderUKEdit.phoneNumber}`);
        await commonPageUK.logoutFromUK();
    }).timeout(7000000);

    it(`[C37795] UK Corporate Admin > UK Cardholder - Modify under Centtrip Admin: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.5 UK Corporate Admin > UK Cardholder - Modify under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37795');
        const addressArray = [UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2, UserIF.corpAdminUK.city, 'GB',
        UserIF.corpAdminUK.postalCode];
        await userDataInDB.userExistsIdentityUK(await emailAdminEdit5, null, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
            UserIF.cardholderUKEdit.dobDB, `+1${UserIF.cardholderUKEdit.phoneNumber}`, null, addressArray);
    });

    xit(`[C37797] UK Corporate Admin > UK Cardholder - Modify under Centtrip Admin: DynamoDb @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.5 UK Corporate Admin > UK Cardholder - Modify under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37797');
        await userDataInDB.userExistsInDynamoDB(await emailAdminEdit5, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
            UserIF.corpAdminUK.gender, '2', UserIF.cardholderUKEdit.dob, UserIF.countryUK, 'GB', UserIF.corpAdminUK.postalCode, undefined,
            UserIF.corpAdminUK.city, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2, '  ', undefined,
            `+1${UserIF.cardholderUKEdit.phoneNumber}`, `+1${UserIF.cardholderUKEdit.phoneNumber}`);
    });

    it(`[C37798] UK Corporate Admin > UK Cardholder - Modify under Centtrip Admin: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.5 UK Corporate Admin > UK Cardholder - Modify under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37798');
        const contactsData = await Salesforce.getPersonAccountDataByEmail(await emailAdminEdit5);
        await Salesforce.checkPersonAccountDataInSalesforce(contactsData, await emailAdminEdit5, salesforceData.personalRecordTypeId,
            UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.cardholderUK.dobSF, null,
            `1${UserIF.cardholderUKEdit.phoneNumber}`, `${UserIF.corpAdminUK.address1} ${UserIF.corpAdminUK.address2}`,
            UserIF.corpAdminUK.city, UserIF.corpAdminUK.postalCode, UserIF.countryUK, false, false);
    });

    it(`[C37799] UK Corporate Admin > UK Cardholder - Modify under Centtrip Admin: Unique identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.5 UK Corporate Admin > UK Cardholder - Modify under Centtrip Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37799');
        await userDataInDB.userExistsUniqueIdentityv2(await emailAdminEdit5, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
            `CARDUK HOLDERUK`, UserIF.cardholderUKEdit.dobDB,
            `+1${UserIF.cardholderUKEdit.phoneNumber}`, `+1${UserIF.cardholderUKEdit.phoneNumber}`, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2,
            UserIF.corpAdminUK.city, null, UserIF.corpAdminUK.postalCode, UserIF.countryUK);
    });

    // --------------- U2.6 UK Corporate Admin > UK Cardholder - Edit under Super Admin ------------------------------

    it(`[C37800] UK Corporate Admin > UK Cardholder - Edit under Super Admin: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.6 UK Corporate Admin > UK Cardholder - Edit under Super Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37800');
        console.log('U2.6 - ', await emailCardholderEdit6);
        // Create Admin user 
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('corporateAdmin', await emailCardholderEdit6, userDataIF.accountUK, UserIF.corpAdminUK.title,
            UserIF.corpAdminUK.gender, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName, UserIF.corpAdminUK.postalCode,
            UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2, UserIF.corpAdminUK.city, UserIF.countryUK,
            UserIF.phoneCodeUK, UserIF.phoneCodeUK, UserIF.corpAdminUK.phoneNumber, UserIF.corpAdminUK.homeNumber,
            UserIF.corpAdminUK.dob);
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        // Create CH user 
        const fileName = await cardMigrationPage.generateBatchFile(await emailCardholderEdit6, process.env.env);
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
        //Edit CH user under CSA
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.SuperAdminUK, Password);
        await (await general.elementByText('Last')).scrollIntoView();
        await Actions.waitAndClick(await UKCreateUserPageElements.superAdmin.lastPageOfChs);
        await Actions.waitAndClick(await general.lastEditBtn);
        await (await general.elementByText('CARDHOLDER CARDS')).waitForDisplayed();
        await createUserPageUK.updateCardholderUKUnderCSA(UserIF.cardholderUKEdit6.dob, UserIF.phoneCodeUK, UserIF.cardholderUKEdit6.phoneNumber);
        await userDataInDB.userExistsAspNetUsersDB(await emailCardholderEdit6, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
            UserIF.cardholderUKEdit6.dobDB, `+44${UserIF.cardholderUKEdit6.phoneNumber}`);
    }).timeout(7000000);

    it(`[C37801] UK Corporate Admin > UK Cardholder - Edit under Super Admin: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.6 UK Corporate Admin > UK Cardholder - Edit under Super Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/801');
        const addressArray = [UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2, UserIF.corpAdminUK.city, 'GB',
        UserIF.corpAdminUK.postalCode];
        await userDataInDB.userExistsIdentityUK(await emailCardholderEdit6, null, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
            UserIF.cardholderUKEdit6.dobDB, `+44${UserIF.cardholderUKEdit6.phoneNumber}`, null, addressArray);
    });

    xit(`[C37803] UK Corporate Admin > UK Cardholder - Edit under Super Admin: DynamoDb @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.6 UK Corporate Admin > UK Cardholder - Edit under Super Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37803');
        await userDataInDB.userExistsInDynamoDB(await emailCardholderEdit6, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
            undefined, '2', UserIF.cardholderUKEdit6.dob, UserIF.countryUK, 'GB', UserIF.corpAdminUK.postalCode, undefined,
            UserIF.corpAdminUK.city, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2, '  ', undefined,
            `+44${UserIF.cardholderUKEdit6.phoneNumber}`, `+44${UserIF.cardholderUKEdit6.phoneNumber}`);
    });

    it(`[C37804] UK Corporate Admin > UK Cardholder - Edit under Super Admin: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.6 UK Corporate Admin > UK Cardholder - Edit under Super Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37804');
        const contactsData = await Salesforce.getPersonAccountDataByEmail(await emailCardholderEdit6);
        await Salesforce.checkPersonAccountDataInSalesforce(contactsData, await emailCardholderEdit6, salesforceData.personalRecordTypeId,
            UserIF.cardholderUK.firstName, UserIF.cardholderUK.lastName, UserIF.cardholderUKEdit6.dobSF, null,
            `44${UserIF.cardholderUKEdit6.phoneNumber}`, `${UserIF.corpAdminUK.address1} ${UserIF.corpAdminUK.address2}`,
            UserIF.corpAdminUK.city, UserIF.corpAdminUK.postalCode, UserIF.countryUK, false, false);
    });

    it(`[C37805] UK Corporate Admin > UK Cardholder - Edit under Super Admin: Unique identity @smoke`, async () => {
        AllureReporter.addSeverity('normal');
        AllureReporter.addStory('U2.6 UK Corporate Admin > UK Cardholder - Edit under Super Admin');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37805');
        await userDataInDB.userExistsUniqueIdentityv2(await emailCardholderEdit6, UserIF.corpAdminUK.firstName, UserIF.corpAdminUK.lastName,
            `CARDUK HOLDERUK`, UserIF.cardholderUKEdit6.dobDB,
            `+44${UserIF.cardholderUKEdit6.phoneNumber}`, `+44${UserIF.cardholderUKEdit6.phoneNumber}`, UserIF.corpAdminUK.address1, UserIF.corpAdminUK.address2,
            UserIF.corpAdminUK.city, null, UserIF.corpAdminUK.postalCode, UserIF.countryUK);
    });
});
