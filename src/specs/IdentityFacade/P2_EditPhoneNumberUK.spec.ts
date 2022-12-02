import { Other } from '../../core/utils/other';
import { commonPageUK } from '../../core/pages/centtripUK/commonUK';
import { signInPage } from '../../core/pages/centtripAppWeb/signInPage';
import { createUserPageUK } from '../../core/pages/centtripUK/createUserUK';
import { Salesforce } from '../../core/pages/externalServices/salesforce';
import { general, UKGeneralElements } from '../../core/pages/locators';
import { Actions } from '../../core/utils/actions';
import AllureReporter from '@wdio/allure-reporter';
import { URLs } from '../../urls';
import { userDataInDB } from '../../core/pages/userDataInDB';
import ping from '../../connections';
import userDataIF, { Password } from '../../testData/usersData';

describe(`Identity Facade >> P2 - Edit phone UK users`, () => {

    before(async () => {
        if (!ping.connection._connectCalled) {
            await ping.connection.connect();
        }
    });

    beforeEach(async () => {
        AllureReporter.addFeature('Edit phone number in My details - UK');
    });

    afterEach(async () => {
        await Other.deleteCacheCookiesUK();
    });

    // ---------- P2.1 UK Corporate Admin - Edit phone -------------------------------

    it(`[C37612] UK Corporate Admin - Edit phone: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('P2.1 UK Corporate Admin - Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37612');
        console.log(await userDataIF.corpAdminUK.email);
        await browser.url(URLs.UKPortalURL);
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await browser.pause(2000);
        await createUserPageUK.switchToAnotherAccount(userDataIF.corpAdminUK.email);
        await (await UKGeneralElements.settingsButton).moveTo();
        await Actions.waitAndClick(await general.linkByName('Modify Card Holder Details'));
        await createUserPageUK.updatePhoneNumberUK(userDataIF.corpAdminUK.phoneNumberNew);
        await commonPageUK.logoutFromUK();
        await userDataInDB.checkPhoneNumberAspNetUsersDB(userDataIF.corpAdminUK.email, `+44${userDataIF.corpAdminUK.phoneNumberNew}`);
    });

    it(`[C37613] UK Corporate Admin - Edit phone: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('P2.1 UK Corporate Admin - Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37613');
        await userDataInDB.checkPhoneNumberIndentityUK(userDataIF.corpAdminUK.email, `+44${userDataIF.corpAdminUK.phoneNumberNew}`);
    });

    xit(`[C37616] UK Corporate Admin - Edit phone: DynamoDB @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('P2.1 UK Corporate Admin - Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37616');
        await userDataInDB.checkPhoneNumberInDynamoDB(userDataIF.corpAdminUK.email, `+44${userDataIF.corpAdminUK.phoneNumberNew}`);
    });

    it(`[C37614] UK Corporate Admin - Edit phone: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('P2.1 UK Corporate Admin - Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37614');
        AllureReporter.addIssue('https://centtrip.atlassian.net/browse/CEN-8018');
        const contactsData = await Salesforce.getContactsByEmail(userDataIF.corpAdminUK.email);
        await Salesforce.checkPhoneNumberInSalesforce(contactsData, userDataIF.corpAdminUK.email, `44${userDataIF.corpAdminUK.phoneNumberNew}`);
    });

    it(`[C37615] UK Corporate Admin - Edit phone: Unique Identity @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('P2.1 UK Corporate Admin - Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37615');
        await userDataInDB.checkPhoneNumberIdentityv2(userDataIF.corpAdminUK.email, `+44${userDataIF.corpAdminUK.phoneNumberNew}`, `+44${userDataIF.corpAdminUK.phoneNumberNew}`);
    });

    // ---------- P2.2 UK Cardholder - Edit phone -------------------------------

    it(`[C37617] UK Cardholder - Edit phone: AspNetUsers @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('P2.2 UK Cardholder - Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37617');
        console.log(await userDataIF.cardholderUK.email);
        await browser.url(URLs.UKPortalURL);
        await signInPage.signInAsRegisteredUserUK(userDataIF.CenttripAdminiUK, Password);
        await browser.pause(2000);
        await createUserPageUK.switchToAnotherAccount(userDataIF.cardholderUK.email);
        await (await UKGeneralElements.settingsButton).moveTo();
        await Actions.waitAndClick(await general.linkByName('Modify Card Holder Details'));
        await createUserPageUK.updatePhoneNumberUK(userDataIF.cardholderUK.phoneNumberNew);
        await commonPageUK.logoutFromUK();
        await userDataInDB.checkPhoneNumberAspNetUsersDB(userDataIF.cardholderUK.email, `+44${userDataIF.cardholderUK.phoneNumberNew}`);
    });

    it(`[C37618] UK Cardholder - Edit phone: UK identity @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('P2.2 UK Cardholder - Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37618');
        await userDataInDB.checkPhoneNumberIndentityUK(userDataIF.cardholderUK.email, `+44${userDataIF.cardholderUK.phoneNumberNew}`);
    });

    xit(`[C37619] UK Cardholder - Edit phone: DynamoDB @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('P2.2 UK Cardholder - Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37619');
        await userDataInDB.checkPhoneNumberInDynamoDB(userDataIF.cardholderUK.email, `+44${userDataIF.cardholderUK.phoneNumberNew}`);
    });

    it(`[C37620] UK Cardholder - Edit phone: SalesForce @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('P2.2 UK Cardholder - Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37621');
        AllureReporter.addIssue('https://centtrip.atlassian.net/browse/CU-3568');
        const contactsData = await Salesforce.getContactsByEmail(userDataIF.cardholderUK.email);
        await Salesforce.checkPhoneNumberInSalesforce(contactsData, userDataIF.cardholderUK.email, `44${userDataIF.cardholderUK.phoneNumberNew}`);
    });

    it(`[C37621] UK Cardholder - Edit phone: Unique Identity @smoke`, async () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('P2.2 UK Cardholder - Edit phone');
        AllureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/37621');
        await userDataInDB.checkPhoneNumberIdentityv2(userDataIF.cardholderUK.email, `+44${userDataIF.cardholderUK.phoneNumberNew}`, `+44${userDataIF.cardholderUK.phoneNumberNew}`);
    });
});
