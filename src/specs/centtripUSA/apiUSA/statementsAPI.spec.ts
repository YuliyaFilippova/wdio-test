import allureReporter from '@wdio/allure-reporter';
import { connectionUSA } from '../../../wdio.conf';
import { LoginAPICall } from '../../../core/utils/loginAPICall';
import { Credentials } from '../../../testData/Credentials';
import { requestBody, requestHeadersToken } from '../../../testData/other';
import { HttpMethods } from '../../../core/api/rest';
import { apiEndpoints } from '../../../testData/apiEndpoints';
import { URLs } from '../../../urls';
import moment = require('moment');

describe(`API > Statements`, () => {
    let accessToken;
    before(async () => {
        if (!connectionUSA._connectCalled) {
            await connectionUSA.connect();
        }
        accessToken = await LoginAPICall.getAccessTokenForAPI(Credentials.AmirCSA.Email, Credentials.AmirCSA.Password);
    });
    it(`[C36869] Statements table: Deposit transaction @smoke`, async () => {
        allureReporter.addSeverity('critical');
        allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36869');
        const transactionDateTime = '2022-09-28T06:11:14.227569Z';
        const bodyRequest = requestBody.statementsTransactions(10, 'f3f8913a-7918-e961-6d60-39dfe5e762a4', transactionDateTime);
        const statementsTransactions = await HttpMethods.post(apiEndpoints.statementsTransaction, requestHeadersToken(accessToken), bodyRequest, URLs.USAPortalURL);
        expect(statementsTransactions.status).toBe(200);
        expect(statementsTransactions.body.isSuccess).toBe(true);
        expect(statementsTransactions.body.value.data[0].transactionDate).toEqual(transactionDateTime);
        expect(statementsTransactions.body.value.data[0].status).toEqual('Cleared');
        expect(statementsTransactions.body.value.data[0].type).toEqual('Deposit');
        expect(statementsTransactions.body.value.data[0].currency).toEqual('USD');
        expect(statementsTransactions.body.value.data[0].amount).toEqual(10);
        expect(statementsTransactions.body.value.data[0].balanceAfter).toEqual(3215.63);
        expect(statementsTransactions.body.value.data[0].details).toEqual('CENTTRIP INTERNAL - Adjustment');
        expect(statementsTransactions.body.value.data[0].isCardTransaction).toEqual(false);
        expect(statementsTransactions.body.value.data[0].cardHolder).toEqual(null);
        expect(statementsTransactions.body.value.data[0].recipient).toEqual(null);
    });

    it(`[C38760] Statements table: Transfer to account transaction @smoke`, async () => {
        allureReporter.addSeverity('critical');
        allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38760');
        const transactionDateTime = '2022-09-28T13:50:58.343171Z';
        const bodyRequest = requestBody.statementsTransactions(10, 'f3f8913a-7918-e961-6d60-39dfe5e762a4', transactionDateTime);
        const statementsTransactions = await HttpMethods.post(apiEndpoints.statementsTransaction, requestHeadersToken(accessToken), bodyRequest, URLs.USAPortalURL);
        expect(statementsTransactions.status).toBe(200);
        expect(statementsTransactions.body.isSuccess).toBe(true);
        expect(statementsTransactions.body.value.data[0].transactionDate).toEqual(transactionDateTime);
        expect(statementsTransactions.body.value.data[0].status).toEqual('Cleared');
        expect(statementsTransactions.body.value.data[0].type).toEqual('Transfer');
        expect(statementsTransactions.body.value.data[0].currency).toEqual('USD');
        expect(statementsTransactions.body.value.data[0].amount).toEqual(-1);
        expect(statementsTransactions.body.value.data[0].balanceAfter).toEqual(3149.63);
        expect(statementsTransactions.body.value.data[0].details).toEqual('Transfer to Twix Mix');
        expect(statementsTransactions.body.value.data[0].isCardTransaction).toEqual(false);
        expect(statementsTransactions.body.value.data[0].cardHolder).toEqual(null);
        expect(statementsTransactions.body.value.data[0].recipient).toEqual('Twix Mix');
    });

    it(`[C38761] Statements table: Transfer from account transaction @smoke`, async () => {
        allureReporter.addSeverity('critical');
        allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38761');
        const transactionDateTime = '2022-09-28T14:01:18.111066Z';
        const bodyRequest = requestBody.statementsTransactions(10, 'f3f8913a-7918-e961-6d60-39dfe5e762a4', transactionDateTime);
        const statementsTransactions = await HttpMethods.post(apiEndpoints.statementsTransaction, requestHeadersToken(accessToken), bodyRequest, URLs.USAPortalURL);
        expect(statementsTransactions.status).toBe(200);
        expect(statementsTransactions.body.isSuccess).toBe(true);
        expect(statementsTransactions.body.value.data[0].transactionDate).toEqual(transactionDateTime);
        expect(statementsTransactions.body.value.data[0].status).toEqual('Cleared');
        expect(statementsTransactions.body.value.data[0].type).toEqual('Transfer');
        expect(statementsTransactions.body.value.data[0].currency).toEqual('USD');
        expect(statementsTransactions.body.value.data[0].amount).toEqual(1);
        expect(statementsTransactions.body.value.data[0].balanceAfter).toEqual(3150.63);
        expect(statementsTransactions.body.value.data[0].details).toEqual('Transfer from Twix Mix');
        expect(statementsTransactions.body.value.data[0].isCardTransaction).toEqual(false);
        expect(statementsTransactions.body.value.data[0].cardHolder).toEqual(null);
        expect(statementsTransactions.body.value.data[0].recipient).toEqual(null);
    });

    it(`[C38762] Statements table: Payment to transfer instrument transaction @smoke`, async () => {
        allureReporter.addSeverity('critical');
        allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38762');
        const transactionDateTime = '2022-09-28T06:38:24.104436Z';
        const bodyRequest = requestBody.statementsTransactions(10, 'f3f8913a-7918-e961-6d60-39dfe5e762a4', transactionDateTime);
        const statementsTransactions = await HttpMethods.post(apiEndpoints.statementsTransaction, requestHeadersToken(accessToken), bodyRequest, URLs.USAPortalURL);
        expect(statementsTransactions.status).toBe(200);
        expect(statementsTransactions.body.isSuccess).toBe(true);
        expect(statementsTransactions.body.value.data[0].transactionDate).toEqual(transactionDateTime);
        expect(statementsTransactions.body.value.data[0].status).toEqual('Pending');
        expect(statementsTransactions.body.value.data[0].type).toEqual('Payment');
        expect(statementsTransactions.body.value.data[0].currency).toEqual('USD');
        expect(statementsTransactions.body.value.data[0].amount).toEqual(-2);
        expect(statementsTransactions.body.value.data[0].balanceAfter).toEqual(3150.63);
        expect(statementsTransactions.body.value.data[0].details).toEqual('Payment to Wallet usd account');
        expect(statementsTransactions.body.value.data[0].isCardTransaction).toEqual(false);
        expect(statementsTransactions.body.value.data[0].cardHolder).toEqual(null);
        expect(statementsTransactions.body.value.data[0].recipient).toEqual('Wallet usd account');
    });

    it(`[C38763] Statements table: Auth card transaction @smoke`, async () => {
        allureReporter.addSeverity('critical');
        allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38763');
        const transactionDateTime = '2022-09-28T06:23:44.739Z';
        const bodyRequest = requestBody.statementsTransactions(10, 'f3f8913a-7918-e961-6d60-39dfe5e762a4', transactionDateTime);
        const statementsTransactions = await HttpMethods.post(apiEndpoints.statementsTransaction, requestHeadersToken(accessToken), bodyRequest, URLs.USAPortalURL);
        expect(statementsTransactions.status).toBe(200);
        expect(statementsTransactions.body.isSuccess).toBe(true);
        expect(statementsTransactions.body.value.data[0].transactionDate).toEqual(transactionDateTime);
        expect(statementsTransactions.body.value.data[0].status).toEqual('Pending');
        expect(statementsTransactions.body.value.data[0].type).toEqual('Moto');
        expect(statementsTransactions.body.value.data[0].currency).toEqual('USD');
        expect(statementsTransactions.body.value.data[0].amount).toEqual(-32);
        expect(statementsTransactions.body.value.data[0].balanceAfter).toEqual(3183.63);
        expect(statementsTransactions.body.value.data[0].details).toEqual('NB Bookstore New York NY US');
        expect(statementsTransactions.body.value.data[0].isCardTransaction).toEqual(true);
        expect(statementsTransactions.body.value.data[0].cardHolder).toEqual('Olga Nuggets');
        expect(statementsTransactions.body.value.data[0].recipient).toEqual(null);
    });

    it(`[C38764] Statements table: Captured card transaction @smoke`, async () => {
        allureReporter.addSeverity('critical');
        allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38764');
        const transactionDateTime = '2022-09-28T06:29:29.828Z';
        const bodyRequest = requestBody.statementsTransactions(10, 'f3f8913a-7918-e961-6d60-39dfe5e762a4', transactionDateTime);
        const statementsTransactions = await HttpMethods.post(apiEndpoints.statementsTransaction, requestHeadersToken(accessToken), bodyRequest, URLs.USAPortalURL);
        expect(statementsTransactions.status).toBe(200);
        expect(statementsTransactions.body.isSuccess).toBe(true);
        expect(statementsTransactions.body.value.data[0].transactionDate).toEqual(transactionDateTime);
        expect(statementsTransactions.body.value.data[0].status).toEqual('Cleared');
        expect(statementsTransactions.body.value.data[0].type).toEqual('Ecommerce');
        expect(statementsTransactions.body.value.data[0].currency).toEqual('USD');
        expect(statementsTransactions.body.value.data[0].amount).toEqual(-31);
        expect(statementsTransactions.body.value.data[0].balanceAfter).toEqual(3152.63);
        expect(statementsTransactions.body.value.data[0].details).toEqual('NB Bookstore New York US');
        expect(statementsTransactions.body.value.data[0].isCardTransaction).toEqual(true);
        expect(statementsTransactions.body.value.data[0].cardHolder).toEqual('Olga Nuggets');
        expect(statementsTransactions.body.value.data[0].recipient).toEqual(null);
    });

    it(`[C38765] Statements table: Declined card transaction @smoke`, async () => {
        allureReporter.addSeverity('critical');
        allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38765');
        const detailsResult = 'Denied NB Bookstore New York NY US. Amount: -1255.00 USD. Card limit \"Maximum monthly spend\" is exceeded.';
        const transactionDateTime = '2022-09-28T06:33:26.361Z';
        const bodyRequest = requestBody.statementsTransactions(10, 'f3f8913a-7918-e961-6d60-39dfe5e762a4', transactionDateTime);
        const statementsTransactions = await HttpMethods.post(apiEndpoints.statementsTransaction, requestHeadersToken(accessToken), bodyRequest, URLs.USAPortalURL);
        expect(statementsTransactions.status).toBe(200);
        expect(statementsTransactions.body.isSuccess).toBe(true);
        expect(statementsTransactions.body.value.data).toEqual([]);
    });

    it(`[C38766] Statements table: Pagination @smoke`, async () => {
        allureReporter.addSeverity('critical');
        allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38766');
        const transactionDateTime = '2022-09-28T00:00:00.000Z';
        const toDateTime = '2022-09-28T23:59:59.999Z';
        const bodyRequest = requestBody.statementsTransactions(5, 'f3f8913a-7918-e961-6d60-39dfe5e762a4', transactionDateTime, toDateTime);
        const statementsTransactions = await HttpMethods.post(apiEndpoints.statementsTransaction, requestHeadersToken(accessToken), bodyRequest, URLs.USAPortalURL);
        expect(statementsTransactions.status).toBe(200);
        expect(statementsTransactions.body.isSuccess).toBe(true);
        const firstSeparatorByDate = statementsTransactions.body.value.next.separatorByDateTime;
        const firstSeparatorByRefIds = statementsTransactions.body.value.next.separatorByRefIds[0];
        expect(statementsTransactions.body.value.data.length).toEqual(5);
        expect(statementsTransactions.body.value.refIdsForReport.length).toEqual(6);
        expect(statementsTransactions.body.value.totalCount).toEqual(6);
        expect(statementsTransactions.body.value.prev).toEqual(null);
        expect(statementsTransactions.body.value.data[0].amount).toEqual(1);
        expect(statementsTransactions.body.value.data[1].amount).toEqual(-1);
        expect(statementsTransactions.body.value.data[2].amount).toEqual(-2);
        expect(statementsTransactions.body.value.data[3].amount).toEqual(-31);
        expect(statementsTransactions.body.value.data[4].amount).toEqual(-32);

        const nextPageBody = requestBody.statementsTransactionsExtended('f3f8913a-7918-e961-6d60-39dfe5e762a4', transactionDateTime,
            toDateTime, firstSeparatorByDate, 'Next', firstSeparatorByRefIds, 5);
        const nextPage = await HttpMethods.post(apiEndpoints.statementsTransaction, requestHeadersToken(accessToken), nextPageBody, URLs.USAPortalURL);
        expect(nextPage.status).toBe(200);
        expect(nextPage.body.isSuccess).toBe(true);
        const secondSeparatorByDate = nextPage.body.value.prev.separatorByDateTime;
        const secondSeparatorByRefIds = nextPage.body.value.prev.separatorByRefIds[0];
        expect(nextPage.body.value.data.length).toEqual(1);
        expect(nextPage.body.value.refIdsForReport.length).toEqual(6);
        expect(nextPage.body.value.totalCount).toEqual(6);
        expect(nextPage.body.value.next).toEqual(null);
        // expect(nextPage.body.value.data[0].amount).toEqual(-32);
        expect(nextPage.body.value.data[0].amount).toEqual(10);

        const prevPageBody = requestBody.statementsTransactionsExtended('f3f8913a-7918-e961-6d60-39dfe5e762a4', transactionDateTime,
            toDateTime, secondSeparatorByDate, 'Prev', secondSeparatorByRefIds, 5);
        const previousPage = await HttpMethods.post(apiEndpoints.statementsTransaction, requestHeadersToken(accessToken), prevPageBody, URLs.USAPortalURL);
        expect(previousPage.status).toBe(200);
        expect(previousPage.body.isSuccess).toBe(true);
        expect(previousPage.body.value.data.length).toEqual(5);
        expect(previousPage.body.value.refIdsForReport.length).toEqual(6);
        expect(previousPage.body.value.totalCount).toEqual(6);
        expect(previousPage.body.value.prev.separatorByDateTime).toEqual(previousPage.body.value.data[0].transactionDate);
        expect(previousPage.body.value.prev.separatorByRefIds[0]).toEqual(previousPage.body.value.data[0].refId);
        expect(previousPage.body.value.next.separatorByDateTime).toEqual(firstSeparatorByDate);
        expect(previousPage.body.value.next.separatorByRefIds[0]).toEqual(firstSeparatorByRefIds);

        expect(previousPage.body.value.data[0].amount).toEqual(1);
        expect(previousPage.body.value.data[1].amount).toEqual(-1);
        expect(previousPage.body.value.data[2].amount).toEqual(-2);
        expect(previousPage.body.value.data[3].amount).toEqual(-31);
        expect(previousPage.body.value.data[4].amount).toEqual(-32);
    });

    it(`[C38768] Statements table: Balances for selected period @smoke`, async () => {
        allureReporter.addSeverity('critical');
        allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38768');
        const transactionDateTime = '2022-09-28T00:00:00.000Z';
        const toDate = '2022-09-28T23:59:59.999Z';
        const bodyRequest = requestBody.statementsTransactions(5, 'f3f8913a-7918-e961-6d60-39dfe5e762a4', transactionDateTime, toDate);
        const statementsTransactions = await HttpMethods.post(apiEndpoints.statementsTransaction, requestHeadersToken(accessToken), bodyRequest, URLs.USAPortalURL);
        expect(statementsTransactions.status).toBe(200);
        expect(statementsTransactions.body.isSuccess).toBe(true);
        expect(statementsTransactions.body.value.transactionsSummary.startBalance).toEqual(3205.63);
        expect(statementsTransactions.body.value.transactionsSummary.endBalance).toEqual(3150.63);
        expect(statementsTransactions.body.value.transactionsSummary.totalCredits).toEqual(11);
        expect(statementsTransactions.body.value.transactionsSummary.totalAccountCredits).toEqual(11);
        expect(statementsTransactions.body.value.transactionsSummary.totalCardCredits).toEqual(0);
        expect(statementsTransactions.body.value.transactionsSummary.totalDebits).toEqual(66);
        expect(statementsTransactions.body.value.transactionsSummary.totalAccountDebits).toEqual(3);
        expect(statementsTransactions.body.value.transactionsSummary.totalCardDebits).toEqual(63);
    });
});