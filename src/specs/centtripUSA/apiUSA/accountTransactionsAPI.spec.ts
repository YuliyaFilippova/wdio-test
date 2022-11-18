import { addTestId, addSeverity } from '../../../core/helper/allure/reporter';
import { connectionUSA } from '../../../wdio.conf';
import { LoginAPICall } from '../../../core/utils/loginAPICall';
import { requestBody, requestHeadersToken, requestHeaders2 } from '../../../testData/other';
import { Credentials } from '../../../testData/Credentials';
import { DashboardPage } from '../../../core/pages/centtripUSA/dashboardPage';
import { apiEndpoints } from '../../../testData/apiEndpoints';
import { RandomGenerator } from '../../../core/utils/randomGenerator';
import { HttpMethods } from '../../../core/api/rest';
import { URLs } from '../../../urls';
import moment = require('moment');

const dashboardPage = new DashboardPage();
const { v4: uuidv4 } = require('uuid');

describe(`API > Card transactions`, () => {
  let accessToken;
  before(async () => {
    if (!connectionUSA._connectCalled) {
      await connectionUSA.connect();
    }
    accessToken = await LoginAPICall.getAccessTokenForAPI(Credentials.CenttripAdminAPI.Email, Credentials.CenttripAdminAPI.Password);
  });
  it(`[C36840] Transfer (account to account): OutgoingTransfer @smoke`, async () => {
    addSeverity('critical');
    addTestId('https://centtrip.testrail.io/index.php?/cases/view/36840');
    const paymentTransactionTag = RandomGenerator.uppperTextAndNumbers(16);
    const randomDepositTransactionId = RandomGenerator.uppperTextAndNumbers(16);
    const randomTransactionId = RandomGenerator.uppperTextAndNumbers(16);
    const guid = uuidv4();
    const trunsferResult = await HttpMethods.post('api/account/v1/transfers', requestHeadersToken(accessToken),
      requestBody.centtripInternalTransferBody('f3f8913a-7918-e961-6d60-39dfe5e762a4', '0f412ec0-de5d-43fc-ee3d-ef215e9f355a', null, 0.01, guid),
      URLs.USAPortalURL);
    expect(trunsferResult.status).toBe(200);
    expect(trunsferResult.body.isSuccess).toBe(true);
    const transactionTag = await dashboardPage.getExternalIdForCreatedTransaction(moment().format('YYYY-MM-DD'), '');

    const outgoinTransferBody = requestBody.transferSettledNotification(paymentTransactionTag, transactionTag, 'Amir wallet', 'AH3227C223222B5FKBMZL8XNG',
      'Snacks and Drinks', -1, 'BA32272223222B5FKBQGK97R3', 'f3f8913a-7918-e961-6d60-39dfe5e762a4', 'BA3227C223222B5FL6C4Z4JRB');

    const outgoingTransfer = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, outgoinTransferBody, URLs.apiAdyenNotificationUrl);
    expect(outgoingTransfer.status).toBe(200);
    expect(outgoingTransfer.body).toEqual('[accepted]');

    const incamingTransferBody = requestBody.depositSettledNotificationAdyen(randomDepositTransactionId, randomTransactionId, paymentTransactionTag,
      'Amir wallet', 'AH3227C223222B5FKBMZL8XNG', 1, 'Twix Mix', 'BA3227C223222B5FL6C4Z4JRB', '0f412ec0-de5d-43fc-ee3d-ef215e9f355a');
    const incomingTransfer = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, incamingTransferBody, URLs.apiAdyenNotificationUrl);
    expect(incomingTransfer.status).toBe(200);
    expect(incomingTransfer.body).toEqual('[accepted]');
  });

  it(`[C36841] Transfer (account to account): TransferSentOut @smoke`, async () => {
    addSeverity('critical');
    addTestId('https://centtrip.testrail.io/index.php?/cases/view/36841');
    const randomDepositTransactionId = RandomGenerator.uppperTextAndNumbers(16);
    const randomTransactionId = RandomGenerator.uppperTextAndNumbers(16);
    const guid = uuidv4();
    const trunsferResult = await HttpMethods.post('api/account/v1/transfers', requestHeadersToken(accessToken),
      requestBody.centtripInternalTransferBody('f3f8913a-7918-e961-6d60-39dfe5e762a4', '0f412ec0-de5d-43fc-ee3d-ef215e9f355a', null, 0.02, guid),
      URLs.USAPortalURL);
    expect(trunsferResult.status).toBe(200);
    expect(trunsferResult.body.isSuccess).toBe(true);
    const transactionTag = await dashboardPage.getExternalIdForCreatedTransaction(moment().format('YYYY-MM-DD'), 'NOT');

    const sentOutTransferBody = requestBody.transferBody(transactionTag, 'Amir wallet', 'AH3227C223222B5FKBMZL8XNG',
      -2, 'Snacks and Drinks', 'BA32272223222B5FKBQGK97R3', 'TransferSentOut');

    const sentOutTransfer = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, sentOutTransferBody, URLs.apiAdyenNotificationUrl);
    expect(sentOutTransfer.status).toBe(200);
    expect(sentOutTransfer.body).toEqual('[accepted]');

    const incomingTransferBody = requestBody.depositSettledNotificationAdyen(randomDepositTransactionId, randomTransactionId, transactionTag,
      'Amir wallet', 'AH3227C223222B5FKBMZL8XNG', 2, 'Twix Mix', 'BA3227C223222B5FL6C4Z4JRB', '0f412ec0-de5d-43fc-ee3d-ef215e9f355a');
    const incomingTransfer = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, incomingTransferBody, URLs.apiAdyenNotificationUrl);
    expect(incomingTransfer.status).toBe(200);
    expect(incomingTransfer.body).toEqual('[accepted]');
  });

  it(`[C36842] Transfer (account to account): TransferConfirmed @smoke`, async () => {
    addSeverity('critical');
    addTestId('https://centtrip.testrail.io/index.php?/cases/view/36842');
    const guid = uuidv4();
    const trunsferResult = await HttpMethods.post('api/account/v1/transfers', requestHeadersToken(accessToken),
      requestBody.centtripInternalTransferBody('f3f8913a-7918-e961-6d60-39dfe5e762a4', '0f412ec0-de5d-43fc-ee3d-ef215e9f355a', null, 0.03, guid),
      URLs.USAPortalURL);
    expect(trunsferResult.status).toBe(200);
    expect(trunsferResult.body.isSuccess).toBe(true);
    const transactionTag = await dashboardPage.getExternalIdForCreatedTransaction(moment().format('YYYY-MM-DD'), 'NOT');

    const confirmedTransferBody = requestBody.transferBody(transactionTag, 'Amir wallet', 'AH3227C223222B5FKBMZL8XNG',
      -3, 'Snacks and Drinks', 'BA32272223222B5FKBQGK97R3', 'TransferConfirmed');

    const confirmedTransfer = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, confirmedTransferBody, URLs.apiAdyenNotificationUrl);
    expect(confirmedTransfer.status).toBe(200);
    expect(confirmedTransfer.body).toEqual('[accepted]');
  });

  it(`[C36845] Transfer (account to account): TransferFailed @smoke`, async () => {
    addSeverity('critical');
    addTestId('https://centtrip.testrail.io/index.php?/cases/view/36845');
    const guid = uuidv4();
    const trunsferResult = await HttpMethods.post('api/account/v1/transfers', requestHeadersToken(accessToken),
      requestBody.centtripInternalTransferBody('f3f8913a-7918-e961-6d60-39dfe5e762a4', '0f412ec0-de5d-43fc-ee3d-ef215e9f355a', null, 0.04, guid),
      URLs.USAPortalURL);
    expect(trunsferResult.status).toBe(200);
    expect(trunsferResult.body.isSuccess).toBe(true);
    const transactionTag = await dashboardPage.getExternalIdForCreatedTransaction(moment().format('YYYY-MM-DD'), 'NOT');

    const failedTransferBody = requestBody.transferBody(transactionTag, 'Amir wallet', 'AH3227C223222B5FKBMZL8XNG',
      -4, 'Snacks and Drinks', 'BA32272223222B5FKBQGK97R3', 'TransferFailed');

    const failedTransfer = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, failedTransferBody, URLs.apiAdyenNotificationUrl);
    expect(failedTransfer.status).toBe(200);
    expect(failedTransfer.body).toEqual('[accepted]');
  });

  it(`[C36846] Payment (account to transfer instrument): TransferSentOut @smoke`, async () => {
    addSeverity('critical');
    addTestId('https://centtrip.testrail.io/index.php?/cases/view/36846');
    const paymentTransactionTag = RandomGenerator.uppperTextAndNumbers(16);
    const guid = uuidv4();
    const trunsferResult = await HttpMethods.post('api/account/v1/transfers', requestHeadersToken(accessToken),
      requestBody.centtripInternalTransferBody('f3f8913a-7918-e961-6d60-39dfe5e762a4', null, '75b437fd-c5a1-43f0-840d-bd9cdbd67695', 0.05, guid),
      URLs.USAPortalURL);
    expect(trunsferResult.status).toBe(200);
    expect(trunsferResult.body.isSuccess).toBe(true);
    const transactionTag = await dashboardPage.getExternalIdForCreatedTransaction(moment().format('YYYY-MM-DD'), 'NOT');
    const sentOutTransferBody = requestBody.paymentSettledNotification(paymentTransactionTag, transactionTag, 'Amir wallet',
      'AH3227C223222B5FKBMZL8XNG', -5, 'Snacks and Drinks', 'BA32272223222B5FKBQGK97R3', 'SE322KH223222D5FKBMZN2X99');

    const sentOutTransfer = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, sentOutTransferBody, URLs.apiAdyenNotificationUrl);
    expect(sentOutTransfer.status).toBe(200);
    expect(sentOutTransfer.body).toEqual('[accepted]');
  });

  it(`[C38754] Deposit (to account): IncomingTransfer @smoke`, async () => {
    addSeverity('critical');
    addTestId('https://centtrip.testrail.io/index.php?/cases/view/38754');
    const paymentTransactionTag = RandomGenerator.uppperTextAndNumbers(16);
    const randomDepositTransactionId = RandomGenerator.uppperTextAndNumbers(16);

    const incomingTransferBody = requestBody.incomingTransferBody(randomDepositTransactionId, paymentTransactionTag, 'Amir wallet', 'AH3227C223222B5FKBMZL8XNG',
      600, 'Twix Mix', 'BA3227C223222B5FL6C4Z4JRB', 'IncomingTransfer');
    const incomingTransfer = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, incomingTransferBody, URLs.apiAdyenNotificationUrl);
    expect(incomingTransfer.status).toBe(200);
    expect(incomingTransfer.body).toEqual('[accepted]');
  });
});