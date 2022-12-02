import { Other } from '../../core/utils/other';
import { commonPageUK } from '../../core/pages/centtripUK/commonUK';
import { signInPage } from '../../core/pages/centtripAppWeb/signInPage';
import { createUserPageUK } from '../../core/pages/centtripUK/createUserUK';
import { LoginAPICall } from '../../core/utils/loginAPICall';
import { usersPage } from '../../core/pages/centtripUSA/usersPage';
import { Salesforce } from '../../core/pages/externalServices/salesforce';
import { general, UKGeneralElements } from '../../core/pages/locators';
import { Actions } from '../../core/utils/actions';
import { userDataInDB } from '../../core/pages/userDataInDB';
import AllureReporter from '@wdio/allure-reporter';
import { URLs } from '../../urls';
import ping from '../../connections';
import userDataIF, { Password } from '../../testData/usersData';

describe(`Identity Facade >> P3 - Edit phone All Regions users`, () => {

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
        await Other.deleteCacheCookiesUK();
    });

    afterEach(async () => {
        await Other.deleteCacheCookiesUK();
    });

    // ----------  P3.1 US-UK Corporate Admin - UK Edit phone -------------------------------

    it(`[C37622] US-UK Corporate Admin - UK Edit phone: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory(' P3.1 US-UK Corporate Admin - UK Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37622');
        console.log(userDataIF.corpAdminUSUK.email);
        console.log(`+44${userDataIF.corpAdminUSUK.phoneNumberNew}`);
        await browser.url(URLs.UKPortalURL);
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await browser.pause(2000);
        await createUserPageUK.switchToAnotherAccount(userDataIF.corpAdminUSUK.email);
        await (await UKGeneralElements.settingsButton).moveTo();
        await Actions.waitAndClick(await general.linkByName('Modify Card Holder Details'));
        await createUserPageUK.updatePhoneNumberUK(userDataIF.corpAdminUSUK.phoneNumberNew);
        await commonPageUK.logoutFromUK();
        await userDataInDB.checkPhoneNumberAspNetUsersDB(userDataIF.corpAdminUSUK.email, `+44${userDataIF.corpAdminUSUK.phoneNumberNew}`);
    });

    it(`[C37627] US-UK Corporate Admin - UK Edit phone: US identity @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory(' P3.1 US-UK Corporate Admin - UK Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37627');
        AllureReporter.addIssue('https://centtrip.atlassian.net/browse/CU-3865');
        await userDataInDB.checkPhoneNumberIndentityUS(userDataIF.corpAdminUSUK.email, `+44${userDataIF.corpAdminUSUK.phoneNumberNew}`);
    });

    it(`[C37623] US-UK Corporate Admin - UK Edit phone: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory(' P3.1 US-UK Corporate Admin - UK Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37623');
        await userDataInDB.checkPhoneNumberIndentityUK(userDataIF.corpAdminUSUK.email, `+44${userDataIF.corpAdminUSUK.phoneNumberNew}`);
    });

    xit(`[C37624] US-UK Corporate Admin - UK Edit phone: DynamoDB @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory(' P3.1 US-UK Corporate Admin - UK Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37624');
        await userDataInDB.checkPhoneNumberInDynamoDB(userDataIF.corpAdminUSUK.email, `+44${userDataIF.corpAdminUSUK.phoneNumberNew}`);
    });

    it(`[C37625] US-UK Corporate Admin - UK Edit phone: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory(' P3.1 US-UK Corporate Admin - UK Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37625');
        AllureReporter.addIssue('https://centtrip.atlassian.net/browse/CU-3568');
        AllureReporter.addIssue('https://centtrip.atlassian.net/browse/CEN-8018');
        const contactsData = await Salesforce.getContactsByEmail(userDataIF.corpAdminUSUK.email);
        await Salesforce.checkPhoneNumberInSalesforce(contactsData, userDataIF.corpAdminUSUK.email, `44${userDataIF.corpAdminUSUK.phoneNumberNew}`);
    });

    it(`[C37626] US-UK Corporate Admin - UK Edit phone: Unique Identity @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory(' P3.1 US-UK Corporate Admin - UK Edit phone');
        AllureReporter.addIssue('https://centtrip.atlassian.net/browse/CU-3826');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37626');
        await userDataInDB.checkPhoneNumberIdentityv2(userDataIF.corpAdminUSUK.email, `+44${userDataIF.corpAdminUSUK.phoneNumberNew}`, `+44${userDataIF.corpAdminUSUK.phoneNumberNew}`);
    });

    // ----------  P3.2 US-UK Cardholder - US Edit phone -------------------------------

    it(`[C37628] US-UK Cardholder - US Edit phone: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('P3.2 US-UK Cardholder - US Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37628');
        console.log(await userDataIF.cardholderUSUK.email);
        const access_token = await LoginAPICall.getAccessTokenForAPI(userDataIF.cardholderUSUK.email, Password);
        await usersPage.updateUserPhoneNumber(access_token, userDataIF.cardholderUSUK.phoneNumberNew);
        await userDataInDB.checkPhoneNumberAspNetUsersDB(userDataIF.cardholderUSUK.email, `+1${userDataIF.cardholderUSUK.phoneNumberNew}`);
    });

    it(`[C37629] US-UK Cardholder - US Edit phone: US identity @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('P3.2 US-UK Cardholder - US Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37629');
        await userDataInDB.checkPhoneNumberIndentityUK(userDataIF.cardholderUSUK.email, `+1${userDataIF.cardholderUSUK.phoneNumberNew}`);
    });

    it(`[C37632] US-UK Cardholder - US Edit phone: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('P3.2 US-UK Cardholder - US Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37632');
        await userDataInDB.checkPhoneNumberIndentityUK(userDataIF.cardholderUSUK.email, `+1${userDataIF.cardholderUSUK.phoneNumberNew}`);
    });

    xit(`[C37633] US-UK Cardholder - US Edit phone: DynamoDB @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('P3.2 US-UK Cardholder - US Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37633');
        await userDataInDB.checkPhoneNumberInDynamoDB(userDataIF.cardholderUSUK.email, `+1${userDataIF.cardholderUSUK.phoneNumberNew}`);
    });

    // error until - https://centtrip.atlassian.net/browse/CU-3568 won't be fixed 
    it(`[C37630] US-UK Cardholder - US Edit phone: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('P3.2 US-UK Cardholder - US Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37630');
        const contactsData = await Salesforce.getContactsByEmail(userDataIF.cardholderUSUK.email);
        await Salesforce.checkPhoneNumberInSalesforce(contactsData, userDataIF.cardholderUSUK.email, `1${userDataIF.cardholderUSUK.phoneNumberNew}`);
    });

    it(`[C37631] US-UK Cardholder - US Edit phone: Unique Identity @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('P3.2 US-UK Cardholder - US Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37631');
        await userDataInDB.checkPhoneNumberIdentityv2(userDataIF.cardholderUSUK.email, `+1${userDataIF.cardholderUSUK.phoneNumberNew}`, `+1${userDataIF.cardholderUSUK.phoneNumberNew}`);
    });
});
