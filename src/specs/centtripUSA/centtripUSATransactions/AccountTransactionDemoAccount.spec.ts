import allureReporter from '@wdio/allure-reporter';
import { addEpic } from '../../../core/helper/allure/reporter';
import { HttpMethods } from '../../../core/api/rest';
import { apiEndpoints } from '../../../testData/apiEndpoints';
import { RandomGenerator } from '../../../core/utils/randomGenerator';
import { requestBody, requestHeadersToken, requestHeaders2 } from '../../../testData/other';
import { DashboardPage } from '../../../core/pages/centtripUSA/dashboardPage';
import { LoginAPICall } from '../../../core/utils/loginAPICall';
import { Credentials } from '../../../testData/Credentials';
import { URLs } from '../../../urls';
import moment = require('moment');


const { v4: uuidv4 } = require('uuid');
const dashboardPage = new DashboardPage();

describe(`Centtrip USA Demo accounts > Centtrip QA Demo - Demo Account: Account transactions`, () => {
  beforeEach(async () => {
    addEpic('Centtrip QA Demo');
    allureReporter.addFeature('Demo Account: Account transactions');
  });

  it(`[C38147] Transfer +1100 USD from CENTTRIP INTERNAL to Demo Account`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38147');
    const paymentTransactionTag = RandomGenerator.uppperTextAndNumbers(16);
    const randomDepositTransactionId = RandomGenerator.uppperTextAndNumbers(16);
    const randomTransactionId = RandomGenerator.uppperTextAndNumbers(16);
    const accessToken = await LoginAPICall.getAccessTokenForAPI(Credentials.CenttripAdminAPI.Email, Credentials.CenttripAdminAPI.Password);
    const guid = uuidv4();
    const trunsferResult = await HttpMethods.post('api/account/v1/transfers', requestHeadersToken(accessToken),
      requestBody.centtripInternalTransferBody('b5946301-c481-3bbd-2446-f32cad2288bb', '498b9274-ec31-44c7-94e5-7b66192dde95', null, 1100, guid),
      URLs.USAPortalURL);
    expect(trunsferResult.status).toBe(200);
    const transactionTag = await dashboardPage.getExternalIdForCreatedTransaction(moment().format('YYYY-MM-DD'), '');
    const outgoinTransferBody = requestBody.transferSettledNotification(paymentTransactionTag, transactionTag, 'Liable', 'AH3227B2249QNP5CFB3J32LPL',
    'CENTTRIP INTERNAL', -110000, 'BA3227C223222B5FT3PWK3B4D', 'b5946301-c481-3bbd-2446-f32cad2288bb', 'BA32272223222C5GJ6CRJ5MBH');

    const outgoingTransfer = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, outgoinTransferBody, URLs.apiAdyenNotificationUrl);
    expect(outgoingTransfer.status).toBe(200);
    expect(outgoingTransfer.body).toEqual('[accepted]');

    const incamingTransferBody = requestBody.depositSettledNotificationAdyen(randomDepositTransactionId, randomTransactionId, paymentTransactionTag,
      'Sarah Gooding', 'AH3227C223222C5GJ6CRJGQ78', 110000, 'Demo Account', 'BA32272223222C5GJ6CRJ5MBH', '498b9274-ec31-44c7-94e5-7b66192dde95');
    const incomingTransfer = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, incamingTransferBody, URLs.apiAdyenNotificationUrl);
    expect(incomingTransfer.status).toBe(200);
    expect(incomingTransfer.body).toEqual('[accepted]');
  });

  it(`[C38148] Payment -100 USD from Demo Account to Centtrip Inc.`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38148');
    const paymentTransactionTag = RandomGenerator.uppperTextAndNumbers(16);
    const accessToken = await LoginAPICall.getAccessTokenForAPI(Credentials.CenttripAdminAPI.Email, Credentials.CenttripAdminAPI.Password);
    const guid = uuidv4();
    const trunsferResult = await HttpMethods.post('api/account/v1/transfers', requestHeadersToken(accessToken),
      requestBody.centtripInternalTransferBody('498b9274-ec31-44c7-94e5-7b66192dde95', null, '062f8dc0-3bc2-4a35-9784-e257d2685aff', 100, guid), URLs.USAPortalURL);
    expect(trunsferResult.status).toBe(200);
    expect(trunsferResult.body.isSuccess).toBe(true);

    const transactionTag = await dashboardPage.getExternalIdForCreatedTransaction(moment().format('YYYY-MM-DD'), 'NOT');
    const sentOutTransferBody = requestBody.paymentSettledNotification(paymentTransactionTag, transactionTag, 'Sarah Gooding', 'AH3227C223222C5GJ6CRJGQ78',
    -10000, 'Demo Account', 'BA32272223222C5GJ6CRJ5MBH', 'SE322JV223222F5GJ6CRKCB3V');

    const sentOutTransfer = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, sentOutTransferBody, URLs.apiAdyenNotificationUrl);
    expect(sentOutTransfer.status).toBe(200);
    expect(sentOutTransfer.body).toEqual('[accepted]');
  });
});