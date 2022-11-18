import allureReporter from '@wdio/allure-reporter';
import { connectionUSA } from '../../../wdio.conf';
import { LoginAPICall } from '../../../core/utils/loginAPICall';
import { Credentials } from '../../../testData/Credentials';
import { requestBody, requestHeadersToken } from '../../../testData/other';
import { HttpMethods } from '../../../core/api/rest';
import { URLs } from '../../../urls';

describe(`API > Dashboard details`, () => {
    let accessToken;
    before(async () => {
    if (!connectionUSA._connectCalled) {
      await connectionUSA.connect();
    }
  });
    it(`[C38715] Expenses table: Captured card transaction @smoke`, async () => {
      allureReporter.addSeverity('critical');
      allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38715');
      accessToken = await LoginAPICall.getAccessTokenForAPI('amir.csa.centtrip.qa@harakirimail.com', Credentials.CenttripAdminAPI.Password);
      const entityCodeRefId = '0e46a962-fd0b-466e-8a5b-346789e8252d';
      const endpoint = `api/card/v1/Entity/${entityCodeRefId}/CardTransactions/Paging`;
      const bodyRequest = requestBody.expensesTransactions('28d3d55d-1122-47e5-a31b-6f2f7cec2436', '2022-09-22T13:45:08.892Z');
      const expensesTransactions = await HttpMethods.post(endpoint, requestHeadersToken(accessToken), bodyRequest, URLs.USAPortalURL);
      console.log(expensesTransactions.body.value.data);
      expect(expensesTransactions.body.value.data[0].sharedBalance).toEqual(false);
      expect(expensesTransactions.body.value.data[0].cardCodeRefId).toEqual('28d3d55d-1122-47e5-a31b-6f2f7cec2436');
      expect(expensesTransactions.body.value.data[0].accountCodeRefId).toEqual('16e08988-c36c-4cd2-82eb-a905c8e90c5d');
      expect(expensesTransactions.body.value.data[0].cardHolderName).toEqual('Diana Bishop');
      expect(expensesTransactions.body.value.data[0].maskedPan).toEqual('555555******8237');
      expect(expensesTransactions.body.value.data[0].dateTime).toEqual('2022-09-22T13:45:08.892Z');
      expect(expensesTransactions.body.value.data[0].refId).toEqual('f22ca8d2-5f1a-4ff7-9620-9c47531bd8e7');
      expect(expensesTransactions.body.value.data[0].currencyCode).toEqual('USD');
      expect(expensesTransactions.body.value.data[0].amount).toEqual(-31);
      expect(expensesTransactions.body.value.data[0].originalAmount.currencyCode).toEqual('USD');
      expect(expensesTransactions.body.value.data[0].originalAmount.value).toEqual(-31);
      expect(expensesTransactions.body.value.data[0].fxRate).toEqual(1);
      expect(expensesTransactions.body.value.data[0].declineAmount.currencyCode).toEqual(null);
      expect(expensesTransactions.body.value.data[0].declineAmount.value).toEqual(0);
      expect(expensesTransactions.body.value.data[0].description).toEqual('NB Bookstore New York US');
      expect(expensesTransactions.body.value.data[0].processingType).toEqual('Ecommerce');
      expect(expensesTransactions.body.value.data[0].authorizationCode).toEqual('87815');
      expect(expensesTransactions.body.value.data[0].merchant.mcc).toEqual('5131');
      expect(expensesTransactions.body.value.data[0].merchant.category).toEqual('Piece Goods, Notions, and Other Dry Goods');
      expect(expensesTransactions.body.value.data[0].merchant.name).toEqual('NB Bookstore');
      expect(expensesTransactions.body.value.data[0].merchant.city).toEqual('New York');
      expect(expensesTransactions.body.value.data[0].merchant.state).toEqual(null);
      expect(expensesTransactions.body.value.data[0].merchant.countryCode).toEqual('US');
    });

    it(`[C38717] Expenses table: Declined card transaction @smoke`, async () => {
      allureReporter.addSeverity('critical');
      allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38715');
      accessToken = await LoginAPICall.getAccessTokenForAPI(Credentials.CenttripAdminNew.Email, Credentials.CenttripAdminAPI.Password);
      const entityCodeRefId = '0e46a962-fd0b-466e-8a5b-346789e8252d';
      const endpoint = `api/card/v1/Entity/${entityCodeRefId}/CardTransactions/Paging`;
      const bodyRequest = requestBody.expensesTransactions('bbf0c3a7-701d-463a-a933-1dabddbdca27', '2022-09-22T10:31:17.842Z');
      const expensesTransactions = await HttpMethods.post(endpoint, requestHeadersToken(accessToken), bodyRequest, URLs.USAPortalURL);
      console.log(expensesTransactions.body.value.data);
      expect(expensesTransactions.body.value.data[0].sharedBalance).toEqual(true);
      expect(expensesTransactions.body.value.data[0].cardCodeRefId).toEqual('bbf0c3a7-701d-463a-a933-1dabddbdca27');
      expect(expensesTransactions.body.value.data[0].accountCodeRefId).toEqual('f3f8913a-7918-e961-6d60-39dfe5e762a4');
      expect(expensesTransactions.body.value.data[0].cardHolderName).toEqual('Olga Nuggets');
      expect(expensesTransactions.body.value.data[0].maskedPan).toEqual('555555******4491');
      expect(expensesTransactions.body.value.data[0].dateTime).toEqual('2022-09-22T10:31:17.842Z');
      expect(expensesTransactions.body.value.data[0].refId).toEqual('1649b79b-c09c-4c8f-8f44-9dddb16445bf');
      expect(expensesTransactions.body.value.data[0].currencyCode).toEqual('USD');
      expect(expensesTransactions.body.value.data[0].amount).toEqual(0);
      expect(expensesTransactions.body.value.data[0].originalAmount.currencyCode).toEqual('EUR');
      expect(expensesTransactions.body.value.data[0].originalAmount.value).toEqual(-190);
      expect(expensesTransactions.body.value.data[0].fxRate).toEqual(0.95);
      expect(expensesTransactions.body.value.data[0].declineAmount.currencyCode).toEqual('USD');
      expect(expensesTransactions.body.value.data[0].declineAmount.value).toEqual(-200);
      expect(expensesTransactions.body.value.data[0].description).toEqual('Denied NB Bookstore New York NY US. Amount: -200.00 USD. Incorrect CVC code.');
      expect(expensesTransactions.body.value.data[0].processingType).toEqual('Ecommerce');
      expect(expensesTransactions.body.value.data[0].authorizationCode).toEqual(null);
      expect(expensesTransactions.body.value.data[0].merchant.mcc).toEqual('5131');
      expect(expensesTransactions.body.value.data[0].merchant.category).toEqual('Piece Goods, Notions, and Other Dry Goods');
      expect(expensesTransactions.body.value.data[0].merchant.name).toEqual('NB Bookstore');
      expect(expensesTransactions.body.value.data[0].merchant.city).toEqual('New York');
      expect(expensesTransactions.body.value.data[0].merchant.state).toEqual('NY');
      expect(expensesTransactions.body.value.data[0].merchant.countryCode).toEqual('US');
    });

    it(`[C38726] Expenses transaction details: Captured card transaction @smoke`, async () => {
      allureReporter.addSeverity('critical');
      allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38726');
      const accessToken = await LoginAPICall.getAccessTokenForAPI(Credentials.AmirCSA.Email, Credentials.AmirCSA.Password);
      const transactionRefId = 'f22ca8d2-5f1a-4ff7-9620-9c47531bd8e7';
      const endpoint = `api/card/v1/CardTransactions/${transactionRefId}/details`;
      const cardTransactoinsDetails = await HttpMethods.get(endpoint, requestHeadersToken(accessToken), URLs.USAPortalURL);
      expect(cardTransactoinsDetails.status).toBe(200);
      console.log(cardTransactoinsDetails);
      expect(cardTransactoinsDetails.body.value.originalAmount.currencyCode).toEqual('USD');
      expect(cardTransactoinsDetails.body.value.originalAmount.value).toEqual(-31);
      expect(cardTransactoinsDetails.body.value.fxRate).toEqual(1);
      expect(cardTransactoinsDetails.body.value.declineAmount.currencyCode).toEqual(null);
      expect(cardTransactoinsDetails.body.value.declineAmount.value).toEqual(0);
      expect(cardTransactoinsDetails.body.value.authorizationCode).toEqual('87815');
      expect(cardTransactoinsDetails.body.value.merchant.mcc).toEqual('5131');
      expect(cardTransactoinsDetails.body.value.merchant.category).toEqual('Piece Goods, Notions, and Other Dry Goods');
      expect(cardTransactoinsDetails.body.value.merchant.name).toEqual('NB Bookstore');
      expect(cardTransactoinsDetails.body.value.merchant.city).toEqual('New York');
      expect(cardTransactoinsDetails.body.value.merchant.state).toEqual(null);
      expect(cardTransactoinsDetails.body.value.merchant.countryCode).toEqual('US');
    });

    it(`[C38727] Expenses transaction details: Declined card transaction @smoke`, async () => {
      allureReporter.addSeverity('critical');
      allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38727');
      const accessToken = await LoginAPICall.getAccessTokenForAPI(Credentials.CenttripAdminNew.Email, Credentials.CenttripAdminNew.Password);
      const transactionRefId = '1649b79b-c09c-4c8f-8f44-9dddb16445bf';
      const endpoint = `api/card/v1/CardTransactions/${transactionRefId}/details`;
      const cardTransactoinsDetails = await HttpMethods.get(endpoint, requestHeadersToken(accessToken), URLs.USAPortalURL);
      expect(cardTransactoinsDetails.status).toBe(200);
      console.log(cardTransactoinsDetails);
      expect(cardTransactoinsDetails.body.value.originalAmount.currencyCode).toEqual('EUR');
      expect(cardTransactoinsDetails.body.value.originalAmount.value).toEqual(-190);
      expect(cardTransactoinsDetails.body.value.fxRate).toEqual(0.95);
      expect(cardTransactoinsDetails.body.value.declineAmount.currencyCode).toEqual('USD');
      expect(cardTransactoinsDetails.body.value.declineAmount.value).toEqual(-200);
      expect(cardTransactoinsDetails.body.value.authorizationCode).toEqual(null);
      expect(cardTransactoinsDetails.body.value.merchant.mcc).toEqual('5131');
      expect(cardTransactoinsDetails.body.value.merchant.category).toEqual('Piece Goods, Notions, and Other Dry Goods');
      expect(cardTransactoinsDetails.body.value.merchant.name).toEqual('NB Bookstore');
      expect(cardTransactoinsDetails.body.value.merchant.city).toEqual('New York');
      expect(cardTransactoinsDetails.body.value.merchant.state).toEqual('NY');
      expect(cardTransactoinsDetails.body.value.merchant.countryCode).toEqual('US');
    });

    it(`[C36868] Labels for card transactions on Expenses @smoke`, async () => {
      allureReporter.addSeverity('critical');
      allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36868');
      const accessToken = await LoginAPICall.getAccessTokenForAPI(Credentials.AmirCSA.Email, Credentials.AmirCSA.Password);
      const transactionRefId = 'f22ca8d2-5f1a-4ff7-9620-9c47531bd8e7';
      const entityCodeRefId = '0e46a962-fd0b-466e-8a5b-346789e8252d';
      const postEndpoint = `api/card/v1/Entity/${entityCodeRefId}/CardTransactions/Paging`;
      const getEndpoint = `api/card/v1/CardTransactions/${transactionRefId}/details`;
      const addLabelEndpoint = `api/card/v1/Entity/${entityCodeRefId}/cardtransactions/${transactionRefId}/labels`;
      const cardRequest = await HttpMethods.get(getEndpoint, requestHeadersToken(accessToken), URLs.USAPortalURL);
      expect(cardRequest.status).toBe(200);
      expect(cardRequest.body.isSuccess).toEqual(true);
      expect(cardRequest.body.value.labels).toEqual([]);

      const bodyRequest = requestBody.expensesTransactions('28d3d55d-1122-47e5-a31b-6f2f7cec2436', '2022-09-22T13:45:08.892Z');
      const expensesTransactions = await HttpMethods.post(postEndpoint, requestHeadersToken(accessToken), bodyRequest, URLs.USAPortalURL);
      expect(expensesTransactions.status).toBe(200);
      expect(expensesTransactions.body.isSuccess).toEqual(true);
      expect(expensesTransactions.body.value.data[0].labels).toEqual([]);
      
      const addLabel = await HttpMethods.post(addLabelEndpoint, requestHeadersToken(accessToken), {"label": "office"}, URLs.USAPortalURL);
      expect(addLabel.status).toBe(200);
      expect(addLabel.body.isSuccess).toEqual(true);

      const cardDetailsRequest = await HttpMethods.get(getEndpoint, requestHeadersToken(accessToken), URLs.USAPortalURL);
      expect(cardDetailsRequest.status).toBe(200);
      expect(cardDetailsRequest.body.isSuccess).toEqual(true);
      expect(cardDetailsRequest.body.value.labels[0].label).toEqual('office');
      const labelRefId = cardDetailsRequest.body.value.labels[0].labelRefId;

      const expensesTransactionsAfter = await HttpMethods.post(postEndpoint, requestHeadersToken(accessToken), bodyRequest, URLs.USAPortalURL);
      expect(expensesTransactionsAfter.status).toBe(200);
      expect(expensesTransactionsAfter.body.isSuccess).toEqual(true);
      expect(expensesTransactionsAfter.body.value.data[0].labels[0].label).toEqual('office');

      const deleteLabels = await HttpMethods.delete(`api/card/v1/Entity/${entityCodeRefId}/cardtransactions/${transactionRefId}/labels/${labelRefId}`,
        requestHeadersToken(accessToken), URLs.USAPortalURL);
      expect(deleteLabels.status).toBe(200);
      expect(deleteLabels.body.isSuccess).toEqual(true);

      const getafterDelete = await HttpMethods.get(getEndpoint, requestHeadersToken(accessToken), URLs.USAPortalURL);
      expect(getafterDelete.status).toBe(200);
      expect(getafterDelete.body.isSuccess).toEqual(true);
      expect(getafterDelete.body.value.labels).toEqual([]);

      const postAfterDelete = await HttpMethods.post(postEndpoint, requestHeadersToken(accessToken), bodyRequest, URLs.USAPortalURL);
      expect(postAfterDelete.status).toBe(200);
      expect(postAfterDelete.body.isSuccess).toEqual(true);
      expect(postAfterDelete.body.value.data[0].labels).toEqual([]);
    });

    it(`[C38746] Notes for card transactions on Expenses @smoke`, async () => {
      allureReporter.addSeverity('critical');
      allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38746');
      const accessToken = await LoginAPICall.getAccessTokenForAPI(Credentials.AmirCSA.Email, Credentials.AmirCSA.Password);
      const transactionRefId = 'f22ca8d2-5f1a-4ff7-9620-9c47531bd8e7';
      const entityCodeRefId = '0e46a962-fd0b-466e-8a5b-346789e8252d';
      const postEndpoint = `api/card/v1/Entity/${entityCodeRefId}/CardTransactions/Paging`;
      const getEndpoint = `api/card/v1/CardTransactions/${transactionRefId}/details`;
      const addNoteEndpoint = `api/card/v1/CardTransactions/${transactionRefId}/notes`;
      const cardRequest = await HttpMethods.get(getEndpoint, requestHeadersToken(accessToken), URLs.USAPortalURL);
      expect(cardRequest.status).toBe(200);
      expect(cardRequest.body.isSuccess).toEqual(true);
      expect(cardRequest.body.value.note).toEqual(null);

      const bodyRequest = requestBody.expensesTransactions('28d3d55d-1122-47e5-a31b-6f2f7cec2436', '2022-09-22T13:45:08.892Z');
      const expensesTransactions = await HttpMethods.post(postEndpoint, requestHeadersToken(accessToken), bodyRequest, URLs.USAPortalURL);
      expect(expensesTransactions.status).toBe(200);
      expect(expensesTransactions.body.isSuccess).toEqual(true);
      expect(expensesTransactions.body.value.data[0].note).toEqual(null);
      
      const addNote = await HttpMethods.post(addNoteEndpoint, requestHeadersToken(accessToken), {'value': 'test'}, URLs.USAPortalURL);
      expect(addNote.status).toBe(200);
      expect(addNote.body.isSuccess).toEqual(true);

      const cardDetailsRequest = await HttpMethods.get(getEndpoint, requestHeadersToken(accessToken), URLs.USAPortalURL);
      expect(cardDetailsRequest.status).toBe(200);
      expect(cardDetailsRequest.body.isSuccess).toEqual(true);
      expect(cardDetailsRequest.body.value.note).toEqual('test');

      const expensesTransactionsAfter = await HttpMethods.post(postEndpoint, requestHeadersToken(accessToken), bodyRequest, URLs.USAPortalURL);
      expect(expensesTransactionsAfter.status).toBe(200);
      expect(expensesTransactionsAfter.body.isSuccess).toEqual(true);
      expect(expensesTransactionsAfter.body.value.data[0].note).toEqual('test');

      const deleteNotes = await HttpMethods.delete(`api/card/v1/CardTransactions/${transactionRefId}/notes?trnRefId=${transactionRefId}`,
        requestHeadersToken(accessToken), URLs.USAPortalURL);
      expect(deleteNotes.status).toBe(200);
      expect(deleteNotes.body.isSuccess).toEqual(true);

      const getafterDelete = await HttpMethods.get(getEndpoint, requestHeadersToken(accessToken), URLs.USAPortalURL);
      expect(getafterDelete.status).toBe(200);
      expect(getafterDelete.body.isSuccess).toEqual(true);
      expect(getafterDelete.body.value.note).toEqual(null);

      const postAfterDelete = await HttpMethods.post(postEndpoint, requestHeadersToken(accessToken), bodyRequest, URLs.USAPortalURL);
      expect(postAfterDelete.status).toBe(200);
      expect(postAfterDelete.body.isSuccess).toEqual(true);
      expect(postAfterDelete.body.value.data[0].note).toEqual(null);
    });
  });