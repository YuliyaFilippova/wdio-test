import { Other } from '../../core/utils/other';
import { LoginAPICall } from '../../core/utils/loginAPICall';
import { createUserPage } from '../../core/pages/centtripUSA/createUser';
import { signInPage } from '../../core/pages/centtripAppWeb/signInPage';
import AllureReporter from '@wdio/allure-reporter';
import userDataIF, { Password, pathToUploadPfsCardCreation, UserIF } from '../../testData/usersData';
import { URLs } from '../../urls';
import { RandomGenerator } from '../../core/utils/randomGenerator';
import { signInPageElements, signUpUSAPageElements, UKCardMigrationPageElements } from '../../core/pages/locators';
import { Actions } from '../../core/utils/actions';
import ping from '../../connections'
import { createUserPageUK } from '../../core/pages/centtripUK/createUserUK';
import { commonPageUK } from '../../core/pages/centtripUK/commonUK';
import { mailMainPage } from '../../core/pages/externalServices/mailPage';
import { NewBrowserTab } from '../../core/utils/newBrowserTab';
import { createAccountPage } from '../../core/pages/centtripAppWeb/createAccountPage';
import { cardMigrationPage } from '../../core/pages/centtripUK/cardMigrationPage';

describe(`Identity Facade >> C1 - Create USA users`, () => {

    const email23757 = RandomGenerator.generateRandEmail('_activate23757@harakirimail.com');
    const email23763 = RandomGenerator.generateRandEmail('_activate23763@harakirimail.com');
    const email23758 = RandomGenerator.generateRandEmail('_activate23758@harakirimail.com');
    const email35874 = RandomGenerator.generateRandEmail('_activate35874@harakirimail.com');
    const email37634 = RandomGenerator.generateRandEmail('_activate37634@harakirimail.com');
    const email37635 = RandomGenerator.generateRandEmail('_activate37635@harakirimail.com');
    const email37636 = RandomGenerator.generateRandEmail('_activate37636@harakirimail.com');
    let corpAdminAPemail = '';

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
        await Other.deleteCacheCookiesUK();
    });


    // ----------------- Create user in USA - Create user in UK - Activate ----------------------

    it(`[C23757 Create user in USA - Create user in UK - Activate`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('Create user in USA - Create user in UK - Activate');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/23757');
        console.log('C23757 - ', await email23757);
        // Create user in USA 
        const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
        await createUserPage.createUserFullAPI(await email23757, token, 'CorporateAdmin', UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
            UserIF.corpAdminAllFields.dob, UserIF.corpAdminAllFields.gender, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.street, UserIF.corpAdminAllFields.postalCode,
            UserIF.corpAdminAllFields.city, UserIF.countryUSA, UserIF.corpAdminAllFields.state);
        await Other.deleteCacheCookiesUSA();
        // Create user in UK 
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('corporateAdmin', await email23757, userDataIF.accountUK, UserIF.corporateAdminAct.title,
            UserIF.corporateAdminAct.gender, UserIF.corporateAdminAct.firstName, UserIF.corporateAdminAct.lastName, UserIF.corporateAdminAct.postalCode, UserIF.corporateAdminAct.address1,
            UserIF.corporateAdminAct.address2, UserIF.corporateAdminAct.city, UserIF.countryUK, UserIF.phoneCodeUK, UserIF.phoneCodeUK, UserIF.corporateAdminAct.phoneNumber,
            UserIF.corporateAdminAct.homeNumber, UserIF.corporateAdminAct.dob);
        await commonPageUK.logoutFromUK();
        // Activation
        await mailMainPage.verifyEmailByAPI(await email23757);
        await NewBrowserTab.closeFromTabAndSwitchToTab(0, 1);
        await (await signUpUSAPageElements.createPassword.passField).waitForDisplayed();
        await commonPageUK.setPasswordForNewUser();
        await signInPage.signInAsActivatedUser(await email23757, Password);
    }).timeout(2000000);

    // -------- Create user in USA - Activate - Create user in UK ----------------------

    it(`[C23763] Create user in USA - Activate - Create user in UK`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('Create user in USA - Activate - Create user in UK');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/23763');
        console.log('C23763 - ', await email23763);
        // Create user in USA 
        const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
        await createUserPage.createUserFullAPI(await email23763, token, 'CorporateAdmin', UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
            UserIF.corpAdminAllFields.dob, UserIF.corpAdminAllFields.gender, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.street, UserIF.corpAdminAllFields.postalCode,
            UserIF.corpAdminAllFields.city, UserIF.countryUSA, UserIF.corpAdminAllFields.state);
        await Other.deleteCacheCookiesUSA();
        // Activation
        await mailMainPage.verifyEmailByAPI(await email23763);
        await NewBrowserTab.closeFromTabAndSwitchToTab(0, 1);
        await (await signUpUSAPageElements.createPassword.passField).waitForDisplayed();
        await commonPageUK.setPasswordForNewUser();
        // Create user in UK 
        // await browser.url(URLs.UKPortalURL);
        // await (await signInPageElements.signInWindow).waitForDisplayed();
        // await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        // await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        // await createUserPageUK.createAdminUK('corporateAdmin', await email23763, userDataIF.accountUK, UserIF.corporateAdminAct.title,
        //     UserIF.corporateAdminAct.gender, UserIF.corporateAdminAct.firstName, UserIF.corporateAdminAct.lastName, UserIF.corporateAdminAct.postalCode, UserIF.corporateAdminAct.address1,
        //     UserIF.corporateAdminAct.address2, UserIF.corporateAdminAct.city, UserIF.countryUK, UserIF.phoneCodeUK, UserIF.phoneCodeUK, UserIF.corporateAdminAct.phoneNumber,
        //     UserIF.corporateAdminAct.homeNumber, UserIF.corporateAdminAct.dob);
        // await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsActivatedUser(await email23763, Password);
    }).timeout(2000000);


    // -------- Create user in UK - Create user in USA - Activate ----------------------

    it(`[C23758 Create user in UK - Create user in USA - Activate`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('Create user in UK - Create user in USA - Activate');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/23758');
        console.log('C23758 - ', await email23758);
        // Create user in UK 
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('corporateAdmin', await email23758, userDataIF.accountUK, UserIF.corporateAdminAct.title, UserIF.corporateAdminAct.gender,
            UserIF.corporateAdminAct.firstName, UserIF.corporateAdminAct.lastName, UserIF.corporateAdminAct.postalCode, UserIF.corporateAdminAct.address1, UserIF.corporateAdminAct.address2, UserIF.corporateAdminAct.city,
            UserIF.countryUK, UserIF.phoneCodeUK, UserIF.phoneCodeUK, UserIF.corporateAdminAct.phoneNumber, UserIF.corporateAdminAct.homeNumber, UserIF.corporateAdminAct.dob);
        await commonPageUK.logoutFromUK()
        await Other.deleteCacheCookiesUK();
        // Create user in USA 
        const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
        await createUserPage.createUserFullAPI(await email23758, token, 'CorporateAdmin', UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
            UserIF.corpAdminAllFields.dob, UserIF.corpAdminAllFields.gender, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.street, UserIF.corpAdminAllFields.postalCode,
            UserIF.corpAdminAllFields.city, UserIF.countryUSA, UserIF.corpAdminAllFields.state);
        await Other.deleteCacheCookiesUSA();
        // Activation
        await mailMainPage.verifyEmailByAPI(await email23758);
        await NewBrowserTab.closeFromTabAndSwitchToTab(0, 1);
        await (await signUpUSAPageElements.createPassword.passField).waitForDisplayed();
        await commonPageUK.setPasswordForNewUser();
        await signInPage.signInAsActivatedUser(await email23758, Password);
    }).timeout(2000000);


    // -------- Create user in AP - Create user in USA - Activate ----------------------

    it(`[C23761] Create user in AP - Create user in USA - Activate`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('Create user in AP - Create user in USA - Activate');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/23761');
        // Create user in AP
        await browser.url(URLs.baseUrl);
        corpAdminAPemail = await createAccountPage.registerCustomApplicationUser('FirstAP', 'LastAP', '20', '1994');
        console.log('C23761 - ', corpAdminAPemail);
        // Create user in USA 
        const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
        await createUserPage.createUserFullAPI(corpAdminAPemail, token, 'CorporateAdmin', UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
            UserIF.corpAdminAllFields.dob, UserIF.corpAdminAllFields.gender, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.street, UserIF.corpAdminAllFields.postalCode,
            UserIF.corpAdminAllFields.city, UserIF.countryUSA, UserIF.corpAdminAllFields.state);
        await Other.deleteCacheCookiesUSA();
        // Activate 
        await mailMainPage.verifyEmailByAPI(await corpAdminAPemail);
        await NewBrowserTab.closeFromTabAndSwitchToTab(0, 1);
        await (await signUpUSAPageElements.createPassword.accountIsActivated).waitForDisplayed();
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsActivatedUser(corpAdminAPemail, Password);
    }).timeout(2000000);


    // -------- Create user in AP - Create user in UK - Activate ----------------------

    it(`[C23762] Create user in AP - Create user in UK - Activate`, async () => {
        AllureReporter.addSeverity('trivial');
        AllureReporter.addStory('Create user in AP - Create user in UK - Activate');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/23762');
        // Create user in AP
        await browser.url(URLs.baseUrl);
        corpAdminAPemail = await createAccountPage.registerCustomApplicationUser('FirstAP', 'LastAP', '20', '1994');
        console.log('C23762 - ', corpAdminAPemail);
        // Create user in UK 
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('corporateAdmin', corpAdminAPemail, userDataIF.accountUK, UserIF.corporateAdminAct.title,
            UserIF.corporateAdminAct.gender, UserIF.corporateAdminAct.firstName, UserIF.corporateAdminAct.lastName, UserIF.corporateAdminAct.postalCode, UserIF.corporateAdminAct.address1,
            UserIF.corporateAdminAct.address2, UserIF.corporateAdminAct.city, UserIF.countryUK, UserIF.phoneCodeUK, UserIF.phoneCodeUK, UserIF.corporateAdminAct.phoneNumber,
            UserIF.corporateAdminAct.homeNumber, UserIF.corporateAdminAct.dob);
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        // Activate 
        await mailMainPage.verifyEmailByAPI(corpAdminAPemail);
        await NewBrowserTab.closeFromTabAndSwitchToTab(0, 1);
        await (await signUpUSAPageElements.createPassword.accountIsActivated).waitForDisplayed();
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsActivatedUser(corpAdminAPemail, Password);
    }).timeout(2000000);


    // -------- Create user in UK - Activate - Create user in USA ----------------------

    it(`[C35874] Create user in UK - Activate - Create user in USA`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('Create user in UK - Activate - Create user in USA');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/35874');
        console.log('C35874 - ', await email35874);
        // Create user in UK 
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('corporateAdmin', await email35874, userDataIF.accountUK, UserIF.corporateAdminAct.title,
            UserIF.corporateAdminAct.gender, UserIF.corporateAdminAct.firstName, UserIF.corporateAdminAct.lastName, UserIF.corporateAdminAct.postalCode,
            UserIF.corporateAdminAct.address1, UserIF.corporateAdminAct.address2, UserIF.corporateAdminAct.city, UserIF.countryUK, UserIF.phoneCodeUK,
            UserIF.phoneCodeUK, UserIF.corporateAdminAct.phoneNumber, UserIF.corporateAdminAct.homeNumber, UserIF.corporateAdminAct.dob,
        );
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        // Activation
        await mailMainPage.verifyEmailByAPI(await email35874);
        await NewBrowserTab.closeFromTabAndSwitchToTab(0, 1);
        await (await signUpUSAPageElements.createPassword.passField).waitForDisplayed();
        await commonPageUK.setPasswordForNewUser();
        // Create user in USA 
        const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
        await createUserPage.createUserFullAPI(await email35874, token, 'CorporateAdmin', UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
            UserIF.corpAdminAllFields.dob, UserIF.corpAdminAllFields.gender, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.street, UserIF.corpAdminAllFields.postalCode,
            UserIF.corpAdminAllFields.city, UserIF.countryUSA, UserIF.corpAdminAllFields.state);
        await Other.deleteCacheCookiesUSA();
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsActivatedUser(await email35874, Password);
    }).timeout(2000000);


    // -------- Create user in AP - Activate - Create user in USA ----------------------

    it(`[C35875] Create user in AP - Activate - Create user in USA`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('Create user in AP - Activate - Create user in USA');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/35875');
        // Create user in AP
        await browser.url(URLs.baseUrl);
        corpAdminAPemail = await createAccountPage.registerCustomApplicationUser('FirstAP', 'LastAP', '20', '1994');
        console.log('C35875 - ', corpAdminAPemail);
        // Activate 
        await mailMainPage.verifyEmailByAPI(corpAdminAPemail);
        await NewBrowserTab.closeFromTabAndSwitchToTab(0, 1);
        await (await signUpUSAPageElements.createPassword.accountIsActivated).waitForDisplayed();
        // Create user in USA 
        const token = await LoginAPICall.getAccessTokenForAPI(userDataIF.CenttripAdminUSA, Password);
        await createUserPage.createUserFullAPI(corpAdminAPemail, token, 'CorporateAdmin', UserIF.corpAdminAllFields.firstName, UserIF.corpAdminAllFields.lastName,
            UserIF.corpAdminAllFields.dob, UserIF.corpAdminAllFields.gender, `+1${UserIF.corpAdminAllFields.phoneNumber}`, UserIF.corpAdminAllFields.street, UserIF.corpAdminAllFields.postalCode,
            UserIF.corpAdminAllFields.city, UserIF.countryUSA, UserIF.corpAdminAllFields.state);
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsActivatedUser(corpAdminAPemail, Password);
    }).timeout(2000000);


    // -------- Create user in AP - Activate - Create user in UK ----------------------

    it(`[C35876] Create user in AP - Activate - Create user in UK`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('Create user in AP - Activate - Create user in UK');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/35876');
        // Create user in AP
        await browser.url(URLs.baseUrl);
        corpAdminAPemail = await createAccountPage.registerCustomApplicationUser('FirstAP', 'LastAP', '20', '1994');
        console.log('C35876 - ', corpAdminAPemail);
        // Activate 
        await mailMainPage.verifyEmailByAPI(corpAdminAPemail);
        await NewBrowserTab.closeFromTabAndSwitchToTab(0, 1);
        await (await signUpUSAPageElements.createPassword.accountIsActivated).waitForDisplayed();
        // Create user in UK 
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('corporateAdmin', corpAdminAPemail, userDataIF.accountUK, UserIF.superAdminAct.title,
            UserIF.superAdminAct.gender, UserIF.superAdminAct.firstName, UserIF.superAdminAct.lastName, UserIF.superAdminAct.postalCode,
            UserIF.superAdminAct.address1, UserIF.superAdminAct.address2, UserIF.superAdminAct.city, UserIF.countryUK, UserIF.phoneCodeUK,
            UserIF.phoneCodeUK, UserIF.superAdminAct.phoneNumber, UserIF.superAdminAct.homeNumber, UserIF.superAdminAct.dob);
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsActivatedUser(corpAdminAPemail, Password);
    }).timeout(2000000);


    // -------- Create Corporate Super Admin in UK - Activate ----------------------

    it(`[C37634] Create Corporate Super Admin in UK - Activate`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('Create Corporate Super Admin in UK - Activate');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37634');
        console.log('C37634 - ', await email37634);
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('superAdmin', await email37634, userDataIF.accountUK, UserIF.superAdminAct.title, UserIF.superAdminAct.gender,
            UserIF.superAdminAct.firstName, UserIF.superAdminAct.lastName, UserIF.superAdminAct.postalCode, UserIF.superAdminAct.address1,
            UserIF.superAdminAct.address2, UserIF.superAdminAct.city, UserIF.countryUK, UserIF.phoneCodeUK, UserIF.phoneCodeUK,
            UserIF.superAdminAct.phoneNumber, UserIF.superAdminAct.homeNumber, UserIF.superAdminAct.dob,);
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        await mailMainPage.verifyEmailByAPI(await email37634);
        await NewBrowserTab.closeFromTabAndSwitchToTab(0, 1);
        await (await signUpUSAPageElements.createPassword.passField).waitForDisplayed();
        await commonPageUK.setPasswordForNewUser();
        await signInPage.signInAsActivatedUser(await email37634, Password);
    }).timeout(2000000);


    // -------- Create Corporate Admin in UK - Activate -----------------------------

    it(`[C37635] Create Cardholder in UK - Activate`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('Create Cardholder in UK - Activate');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37635');
        console.log('C37635 - ', await email37635);
        await browser.url(URLs.UKPortalURL);
        await (await signInPageElements.signInWindow).waitForDisplayed();
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await createUserPageUK.openCreateUserPageUnderCentripAdmin();
        await createUserPageUK.createAdminUK('corporateAdmin', await email37635, userDataIF.accountUK, UserIF.corporateAdminAct.title, UserIF.corporateAdminAct.gender,
            UserIF.corporateAdminAct.firstName, UserIF.corporateAdminAct.lastName, UserIF.corporateAdminAct.postalCode, UserIF.corporateAdminAct.address1,
            UserIF.corporateAdminAct.address2, UserIF.corporateAdminAct.city, UserIF.countryUK, UserIF.phoneCodeUK, UserIF.phoneCodeUK,
            UserIF.corporateAdminAct.phoneNumber, UserIF.corporateAdminAct.homeNumber, UserIF.corporateAdminAct.dob);
        await commonPageUK.logoutFromUK();
        await Other.deleteCacheCookiesUK();
        await mailMainPage.verifyEmailByAPI(await email37635);
        await NewBrowserTab.closeFromTabAndSwitchToTab(0, 1);
        await (await signUpUSAPageElements.createPassword.passField).waitForDisplayed();
        await commonPageUK.setPasswordForNewUser();
        await signInPage.signInAsActivatedUser(await email37635, Password);
    }).timeout(2000000);


    // -------- Create Cardholder in UK - Activate ----------------------------------

    it(`[C37636] Create Cardholder in UK - Activate`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('Create Cardholder in UK - Activate');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37636');
        console.log('C37636 - ', await email37636);
        // Create Cardholder UK 
        await Other.deleteCacheCookiesUK();
        const fileName = await cardMigrationPage.generateBatchFile(await email37636, process.env.ENV);
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
        await mailMainPage.verifyEmailByAPI(await email37636);
        await NewBrowserTab.closeFromTabAndSwitchToTab(0, 1);
        await (await signUpUSAPageElements.createPassword.passField).waitForDisplayed();
        await commonPageUK.setPasswordForNewUser();
        await signInPage.signInAsActivatedUser(await email37636, Password);
    }).timeout(5000000);

})