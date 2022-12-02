import { Other } from '../../core/utils/other';
import { LoginAPICall } from '../../core/utils/loginAPICall';
import { usersPage } from '../../core/pages/centtripUSA/usersPage';
import { Salesforce } from '../../core/pages/externalServices/salesforce';
import { userDataInDB } from '../../core/pages/userDataInDB';
import AllureReporter from '@wdio/allure-reporter';
import ping from '../../connections'
import userDataIF, { Password } from '../../testData/usersData';

describe(`Identity Facade >> P1 - Edit phone USA users`, () => {

    before(async () => {
        if (!ping.connectionUSA._connectCalled) {
            await ping.connectionUSA.connect();
        }
    });

    beforeEach(async () => {
        AllureReporter.addFeature('Edit phone number in My details - USA');
    });

    afterEach(async () => {
        await Other.deleteCacheCookiesUSA();
    });

    // ---------- P1.1 US Corporate Admin without address - Edit phone -------------------------------

    it(`[C37579] US Corporate Admin without address - Edit phone: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('P1.1 US Corporate Admin without address - Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37579');
        console.log(await userDataIF.corpAdminWithoutAddress.email);
        const access_token = await LoginAPICall.getAccessTokenForAPI(userDataIF.corpAdminWithoutAddress.email, Password);
        await usersPage.updateUserPhoneNumber(access_token, userDataIF.corpAdminWithoutAddress.phoneNumberNew);
        await userDataInDB.checkPhoneNumberAspNetUsersDB(userDataIF.corpAdminWithoutAddress.email, `+1${userDataIF.corpAdminWithoutAddress.phoneNumberNew}`);
    });

    it(`[C37609] US Corporate Admin without address - Edit phone: US identity @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('P1.1 US Corporate Admin without address - Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37609');
        await userDataInDB.checkPhoneNumberIndentityUS(userDataIF.corpAdminWithoutAddress.email, `+1${userDataIF.corpAdminWithoutAddress.phoneNumberNew}`);
    });

    it(`[C37610] US Corporate Admin without address - Edit phone: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('P1.1 US Corporate Admin without address - Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37610');
        const contactsData = await Salesforce.getContactsByEmail(userDataIF.corpAdminWithoutAddress.email);
        await Salesforce.checkPhoneNumberInSalesforce(contactsData, userDataIF.corpAdminWithoutAddress.email, `+1${userDataIF.corpAdminWithoutAddress.phoneNumberNew}`);
    });

    it(`[C37611] US Corporate Admin without address - Edit phone: Unique Identity @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('P1.1 US Corporate Admin without address - Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37611');
        AllureReporter.addIssue('https://centtrip.atlassian.net/browse/CU-3826');
        await userDataInDB.checkPhoneNumberIdentityv2(userDataIF.corpAdminWithoutAddress.email, `+1${userDataIF.corpAdminWithoutAddress.phoneNumberNew}`, `+1${userDataIF.corpAdminWithoutAddress.phoneNumberNew}`);
    });
});
