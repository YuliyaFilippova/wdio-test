import allureReporter from '@wdio/allure-reporter';
import { RandomGenerator } from '../../../core/utils/randomGenerator';
import { requestBody, requestHeaders2, requestHeadersToken } from '../../../testData/other';
import { Credentials } from '../../../testData/Credentials';
import { HttpMethods } from '../../../core/api/rest';
import { apiEndpoints } from '../../../testData/apiEndpoints';
import { LoginAPICall } from '../../../core/utils/loginAPICall';
import { TransactionsPage } from '../../../core/pages/centtripUSA/transactionsPage';
import { URLs } from '../../../urls';

const transactionsPage = new TransactionsPage();

describe(`API > Card transactions`, () => {
    it(`[C36851] Card transaction 01 Auth = Cap | ecommerce | no state @smoke`, async () => {
      allureReporter.addSeverity('critical');
      allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36851');
      const accountCodeRefId = '16e08988-c36c-4cd2-82eb-a905c8e90c5d';
      const randomPaymentIdPending = RandomGenerator.uppperTextAndNumbers(16);
      const randomAuthPending = RandomGenerator.numbers(6);
      const transferBodyPending = requestBody.authorizeTransactionDemo('ecommerce', randomPaymentIdPending, randomAuthPending, 'USD', -3100, 'USD', -3100, 'Amir',
        'AH3227C223222B5FKBMZL8XNG', 'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069', 'New York',
        'USA', 'NB Bookstore', 'NB Bookstore New York USA');
      const authorizeTransactionPending = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, transferBodyPending, URLs.apiAdyenNotificationUrl);
      expect(authorizeTransactionPending.status).toBe(200);
      expect(authorizeTransactionPending.body).toEqual('[accepted]');

      const transactionInfo = await transactionsPage.getTransactionInfoByGroupId(randomPaymentIdPending);
      expect(transactionInfo.AccountCodeRefId).toEqual(accountCodeRefId);
      expect(transactionInfo.JournalType).toEqual('Card');
      expect(transactionInfo.CurrencyCode).toEqual('USD');
      expect(transactionInfo.Amount).toEqual(-31);
      expect(transactionInfo.OriginalCurrencyCode).toEqual('USD');
      expect(transactionInfo.OriginalAmount).toEqual(-31);
      expect(transactionInfo.FxRate).toEqual(1);
      expect(transactionInfo.DeclineCurrencyCode).toEqual(null);
      expect(transactionInfo.DeclineAmount).toEqual(null);
      expect(transactionInfo.Description).toEqual('NB Bookstore New York US');
      expect(transactionInfo.ErrorDescription).toEqual(null);
      expect(transactionInfo.ProcessingType).toEqual('Ecommerce');
      expect(transactionInfo.Mcc).toEqual('5131');
      expect(transactionInfo.MerchantName).toEqual('NB Bookstore');
      expect(transactionInfo.MerchantCity).toEqual('New York');
      expect(transactionInfo.MerchantState).toEqual(null);
      expect(transactionInfo.MerchantCountryCode).toEqual('US');

      const accessToken = await LoginAPICall.getAccessTokenForAPI(Credentials.CenttripAdminNew.Email, Credentials.CenttripAdminAPI.Password);
      const entityCodeRefId = '0e46a962-fd0b-466e-8a5b-346789e8252d';
      const endpoint = `api/card/v1/Entity/${entityCodeRefId}/CardTransactions/Paging`;
      const bodyRequest = requestBody.expensesTransactions('28d3d55d-1122-47e5-a31b-6f2f7cec2436', '2022-11-22');
      const expensesTransactions = await HttpMethods.post(endpoint, requestHeadersToken(accessToken), bodyRequest, URLs.USAPortalURL);

      for( let i = 0; i < expensesTransactions.body.value.data.length; i++) {
        if(expensesTransactions.body.value.data[i].refId === transactionInfo.RefId) {
          expect(expensesTransactions.body.value.data[i].cleared).toEqual('Pending' || 'Cleared' || 'Declined');
        };
      };
  
      const capturedPaymentId = RandomGenerator.uppperTextAndNumbers(16);
      const captureBody = requestBody.capturedTransactionDemo('ecommerce', capturedPaymentId, randomPaymentIdPending, -3100, 'Amir', 'AH3227C223222B5FKBMZL8XNG',
        'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069', 'New York',
        'USA', 'NB Bookstore', 'NB Bookstore New York USA');
      const capturedTransaction = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, captureBody, URLs.apiAdyenNotificationUrl);
      expect(capturedTransaction.status).toBe(200);
      expect(capturedTransaction.body).toEqual('[accepted]');

      const capturedInfo = await transactionsPage.getTransactionInfoByGroupId(randomPaymentIdPending);
      expect(capturedInfo.AccountCodeRefId).toEqual(accountCodeRefId);
      expect(capturedInfo.JournalType).toEqual('Card');
      expect(capturedInfo.CurrencyCode).toEqual('USD');
      expect(capturedInfo.Amount).toEqual(-31);
      expect(capturedInfo.OriginalCurrencyCode).toEqual('USD');
      expect(capturedInfo.OriginalAmount).toEqual(-31);
      expect(capturedInfo.FxRate).toEqual(1);
      expect(capturedInfo.DeclineCurrencyCode).toEqual(null);
      expect(capturedInfo.DeclineAmount).toEqual(null);
      expect(capturedInfo.Description).toEqual('NB Bookstore New York US');
      expect(capturedInfo.ErrorDescription).toEqual(null);
      expect(capturedInfo.ProcessingType).toEqual('Ecommerce');
      expect(capturedInfo.Mcc).toEqual('5131');
      expect(capturedInfo.MerchantName).toEqual('NB Bookstore');
      expect(capturedInfo.MerchantCity).toEqual('New York');
      expect(capturedInfo.MerchantState).toEqual(null);
      expect(capturedInfo.MerchantCountryCode).toEqual('US');

      const accessTokenUp = await LoginAPICall.getAccessTokenForAPI(Credentials.CenttripAdminNew.Email, Credentials.CenttripAdminAPI.Password);
      const entityCodeRefIdUP = '0e46a962-fd0b-466e-8a5b-346789e8252d';
      const endpointUp = `api/card/v1/Entity/${entityCodeRefIdUP}/CardTransactions/Paging`;
      const bodyRequestUp = requestBody.expensesTransactions('28d3d55d-1122-47e5-a31b-6f2f7cec2436', '2022-11-22');
      const expensesTransactionsUP = await HttpMethods.post(endpointUp, requestHeadersToken(accessTokenUp), bodyRequestUp, URLs.USAPortalURL);

      for( let i = 0; i < expensesTransactionsUP.body.value.data.length; i++) {
        if(expensesTransactionsUP.body.value.data[i].refId === capturedInfo.RefId) {
          expect(expensesTransactionsUP.body.value.data[i].cleared).toEqual('Cleared');
        };
      }; 
    });

    it(`[C36852] Card transaction 02 Auth = Exp = Cap | moto @smoke`, async () => {
      allureReporter.addSeverity('critical');
      allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36852');
      const randomPaymentIdPending = RandomGenerator.uppperTextAndNumbers(16);
      const randomAuthPending = RandomGenerator.numbers(6);
      const transferBodyPending = requestBody.authorizeTransactionDemo('moto', randomPaymentIdPending, randomAuthPending, 'USD', -3200, 'USD', -3200, 'Amir',
        'AH3227C223222B5FKBMZL8XNG', 'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069', 'New York',
        'USA', 'NB Bookstore', 'NB Bookstore New York NY US');
      const authorizeTransactionPending = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, transferBodyPending, URLs.apiAdyenNotificationUrl);
      expect(authorizeTransactionPending.status).toBe(200);
      expect(authorizeTransactionPending.body).toEqual('[accepted]');
  
      const expiredBodyTransaction = requestBody.expiredTransactionDemo('moto', randomPaymentIdPending, randomAuthPending, -3200, 'USD', -3200, 3200, 'Amir',
          'AH3227C223222B5FKBMZL8XNG', 'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'Diana Bishop', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069',
          'New York', 'NY', 'USA', 'NB Bookstore', 'NB Bookstore New York NY US');
      const expiredTransaction = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2, expiredBodyTransaction, URLs.apiAdyenNotificationUrl);
      expect(expiredTransaction.status).toBe(200);
      expect(expiredTransaction.body).toEqual('[accepted]');
  
      const capturedPaymentId = RandomGenerator.uppperTextAndNumbers(16);
      const captureBody = requestBody.capturedTransactionDemo('moto', capturedPaymentId, randomPaymentIdPending, -3200, 'Amir', 'AH3227C223222B5FKBMZL8XNG',
        'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069', 'New York',
        'USA', 'NB Bookstore', 'NB Bookstore New York USA');
      const capturedTransaction = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, captureBody, URLs.apiAdyenNotificationUrl);
      expect(capturedTransaction.status).toBe(200);
      expect(capturedTransaction.body).toEqual('[accepted]');
    });

    it(`[C36853] Card transaction 03 AuthFX = Cap + Can + Can, Ref | recurring @smoke`, async () => {
      allureReporter.addSeverity('critical');
      allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36853');
      const randomPaymentIdPending = RandomGenerator.uppperTextAndNumbers(16);
      const randomAuthPending = RandomGenerator.numbers(6);
      const transferBodyPending = requestBody.authorizeTransactionDemo('recurring', randomPaymentIdPending, randomAuthPending, 'USD', -2400, 'USD', -2200, 'Amir',
        'AH3227C223222B5FKBMZL8XNG', 'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069', 'New York',
        'USA', 'NB Bookstore', 'NB Bookstore New York NY US');
      const authorizeTransactionPending = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, transferBodyPending, URLs.apiAdyenNotificationUrl);
      expect(authorizeTransactionPending.status).toBe(200);
      expect(authorizeTransactionPending.body).toEqual('[accepted]');
  
      const capturedPaymentId = RandomGenerator.uppperTextAndNumbers(16);
      const captureBody = requestBody.capturedTransactionDemo('recurring', capturedPaymentId, randomPaymentIdPending, -3100, 'Amir', 'AH3227C223222B5FKBMZL8XNG',
        'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069', 'New York',
        'USA', 'NB Bookstore', 'NB Bookstore New York USA');
      const capturedTransaction = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, captureBody, URLs.apiAdyenNotificationUrl);
      expect(capturedTransaction.status).toBe(200);
      expect(capturedTransaction.body).toEqual('[accepted]');
  
      const cancelledBody = requestBody.cancelledTransactionDemo('recurring', randomPaymentIdPending, randomAuthPending, -800, 'EUR', -750, 800, 'Amir',
          'AH3227C223222B5FKBMZL8XNG', 'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069', 'New York',
          'NY', 'USA', 'NB Bookstore', 'NB Bookstore New York NY US');
      const cancelledTransaction = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, cancelledBody, URLs.apiAdyenNotificationUrl);
      expect(cancelledTransaction.status).toBe(200);
      expect(cancelledTransaction.body).toEqual('[accepted]');
  
      const cancelledBodySecond = requestBody.cancelledTransactionDemo('recurring', randomPaymentIdPending, randomAuthPending, -700, 'EUR', -650, 700, 'Amir',
          'AH3227C223222B5FKBMZL8XNG', 'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069', 'New York',
          'NY', 'USA', 'NB Bookstore', 'NB Bookstore New York NY US');
      const cancelledTransactionSecond = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, cancelledBodySecond, URLs.apiAdyenNotificationUrl);
      expect(cancelledTransactionSecond.status).toBe(200);
      expect(cancelledTransactionSecond.body).toEqual('[accepted]');
  
      const refundedRandomPaymentId = RandomGenerator.uppperTextAndNumbers(16);
      const refundedTransactionBody = requestBody.refundedTransactionDemo('recurring', refundedRandomPaymentId, randomPaymentIdPending, 900, 'EUR', 800, 'Amir', 'AH3227C223222B5FKBMZL8XNG',
          'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS');
      const refundedTransactionRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2, refundedTransactionBody, URLs.apiAdyenNotificationUrl);
      expect(refundedTransactionRequest.status).toBe(200);
      expect(refundedTransactionRequest.body).toEqual('[accepted]');
    });
  
    it(`[C36854] Card transaction 04 AuthFX = Cap + Exp, Can | balanceInquiry @smoke`, async () => {
      allureReporter.addSeverity('critical');
      allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36854');
      const randomPaymentIdPending = RandomGenerator.uppperTextAndNumbers(16);
      const randomAuthPending = RandomGenerator.numbers(6);
      const transferBodyPending = requestBody.authorizeTransactionDemo('balanceInquiry', randomPaymentIdPending, randomAuthPending, 'USD', -1001, 'EUR', -900, 'Amir',
        'AH3227C223222B5FKBMZL8XNG', 'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069', 'New York',
        'USA', 'NB Bookstore', 'NB Bookstore New York NY US');
      const authorizeTransactionPending = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, transferBodyPending, URLs.apiAdyenNotificationUrl);
      expect(authorizeTransactionPending.status).toBe(200);
      expect(authorizeTransactionPending.body).toEqual('[accepted]');
  
      const capturedPaymentId = RandomGenerator.uppperTextAndNumbers(16);
      const captureBody = requestBody.capturedTransactionDemo('balanceInquiry', capturedPaymentId, randomPaymentIdPending, -1000, 'Amir', 'AH3227C223222B5FKBMZL8XNG',
        'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069', 'New York',
        'USA', 'NB Bookstore', 'NB Bookstore New York NY US');
      const capturedTransaction = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, captureBody, URLs.apiAdyenNotificationUrl);
      expect(capturedTransaction.status).toBe(200);
      expect(capturedTransaction.body).toEqual('[accepted]');
  
      const expiredBodyTransaction = requestBody.expiredTransactionDemo('balanceInquiry', randomPaymentIdPending, randomAuthPending, -1, 'EUR', -1, 1, 'Amir',
          'AH3227C223222B5FKBMZL8XNG', 'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'Diana Bishop', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069',
          'New York', 'NY', 'USA', 'NB Bookstore', 'NB Bookstore New York NY US');
      const expiredTransaction = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2, expiredBodyTransaction, URLs.apiAdyenNotificationUrl);
      expect(expiredTransaction.status).toBe(200);
      expect(expiredTransaction.body).toEqual('[accepted]');
  
      const cancelledBodySecond = requestBody.cancelledTransactionDemo('balanceInquiry', randomPaymentIdPending, randomAuthPending, -1, 'EUR', -1, 1, 'Amir',
          'AH3227C223222B5FKBMZL8XNG', 'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069', 'New York',
          'NY', 'USA', 'NB Bookstore', 'NB Bookstore New York NY US');
      const cancelledTransactionSecond = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, cancelledBodySecond, URLs.apiAdyenNotificationUrl);
      expect(cancelledTransactionSecond.status).toBe(200);
      expect(cancelledTransactionSecond.body).toEqual('[accepted]');
    });
  
    it(`[C36855] Card transaction 05 AuthFee = Cap + Can + Exp | pos | amount != mod @smoke`, async () => {
      allureReporter.addSeverity('critical');
      allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36855');
      const randomPaymentIdPending = RandomGenerator.uppperTextAndNumbers(16);
      const randomAuthPending = RandomGenerator.numbers(6);
      const transferBodyPending = requestBody.authorizeTransactionWithFee('pos', randomPaymentIdPending, randomAuthPending, 'USD', -1700, 'USD', -1700, 'USD', -1850,
          -150, 'Amir', 'AH3227C223222B5FKBMZL8XNG', 'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069',
          'New York', 'NY', 'USA', 'NB Bookstore', 'NB Bookstore New York NY US', 'Buy something');
      const authorizeTransactionPending = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, transferBodyPending, URLs.apiAdyenNotificationUrl);
      expect(authorizeTransactionPending.status).toBe(200);
      expect(authorizeTransactionPending.body).toEqual('[accepted]');
  
      const capturedPaymentId = RandomGenerator.uppperTextAndNumbers(16);
      const captureBody = requestBody.capturedTransactionDemo('pos', capturedPaymentId, randomPaymentIdPending, -600, 'Amir', 'AH3227C223222B5FKBMZL8XNG',
        'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069', 'New York',
        'USA', 'NB Bookstore', 'NB Bookstore New York USA');
      const capturedTransaction = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, captureBody, URLs.apiAdyenNotificationUrl);
      expect(capturedTransaction.status).toBe(200);
      expect(capturedTransaction.body).toEqual('[accepted]');
  
      const cancelledBodySecond = requestBody.cancelledTransactionDemo('pos', randomPaymentIdPending, randomAuthPending, -1100, 'USD', -1100, 1100, 'Amir',
          'AH3227C223222B5FKBMZL8XNG', 'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069', 'New York',
          'NY', 'USA', 'NB Bookstore', 'NB Bookstore New York NY US');
      const cancelledTransactionSecond = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, cancelledBodySecond, URLs.apiAdyenNotificationUrl);
      expect(cancelledTransactionSecond.status).toBe(200);
      expect(cancelledTransactionSecond.body).toEqual('[accepted]');
  
      const expiredBodyTransaction = requestBody.expiredTransactionDemo('pos', randomPaymentIdPending, randomAuthPending, -150, 'USD', -150, 150, 'Amir',
          'AH3227C223222B5FKBMZL8XNG', 'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'Diana Bishop', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069',
          'New York', 'NY', 'USA', 'NB Bookstore', 'NB Bookstore New York NY US');
      const expiredTransaction = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2, expiredBodyTransaction, URLs.apiAdyenNotificationUrl);
      expect(expiredTransaction.status).toBe(200);
      expect(expiredTransaction.body).toEqual('[accepted]');
    });
  
    it(`[C36856] Card transaction 06 AuthFX2Fees = Cap = Ref | atmWithdraw @smoke`, async () => {
      allureReporter.addSeverity('critical');
      allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36856');
      const randomPaymentIdPending = RandomGenerator.uppperTextAndNumbers(16);
      const randomAuthPending = RandomGenerator.numbers(6);
      const transferBodyPending = requestBody.authorizeTransactionWithFeeAdjustment('atmWithdraw', randomPaymentIdPending, randomAuthPending, 'USD', -2000, 'EUR', -1900,
          'USD', -2300, -200, -100, 'Amir', 'AH3227C223222B5FKBMZL8XNG', 'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069',
          'New York', 'NY', 'USA', 'NB Bookstore', 'NB Bookstore New York NY US', 'Buy something');
      const authorizeTransactionPending = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, transferBodyPending, URLs.apiAdyenNotificationUrl);
      expect(authorizeTransactionPending.status).toBe(200);
      expect(authorizeTransactionPending.body).toEqual('[accepted]');
  
      const capturedPaymentId = RandomGenerator.uppperTextAndNumbers(16);
      const captureBody = requestBody.capturedTransactionModified('atmWithdraw', capturedPaymentId, randomPaymentIdPending, 'USD', -2300, 'EUR', -1900, 'Amir',
          'AH3227C223222B5FKBMZL8XNG', 'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069', 'New York', 'NY',
          'USA', 'NB Bookstore', 'NB Bookstore New York NY US');
      const capturedTransaction = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, captureBody, URLs.apiAdyenNotificationUrl);
      expect(capturedTransaction.status).toBe(200);
      expect(capturedTransaction.body).toEqual('[accepted]');
  
      const refundedRandomPaymentId = RandomGenerator.uppperTextAndNumbers(16);
      const refundedTransactionBody = requestBody.refundedTransactionDemo('atmWithdraw', refundedRandomPaymentId, randomPaymentIdPending, 2300, 'EUR', 1900, 'Amir', 'AH3227C223222B5FKBMZL8XNG',
          'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS');
      const refundedTransactionRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2, refundedTransactionBody, URLs.apiAdyenNotificationUrl);
      expect(refundedTransactionRequest.status).toBe(200);
      expect(refundedTransactionRequest.body).toEqual('[accepted]');
    });
  
    it(`[C36857] Card transaction 07 Declined | atmWithdraw @smoke`, async () => {
      allureReporter.addSeverity('critical');
      allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36857');
      const refusedRandomPaymentId = RandomGenerator.uppperTextAndNumbers(16);
      const refusedTransactionBody = requestBody.refusedTransactionAdjustmentDemo('atmWithdraw', refusedRandomPaymentId, 'USD', -125500, 'USD', -125500, -125500, 'Amir',
          'AH3227C223222B5FKBMZL8XNG', 'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069',
          'New York', 'NY', 'USA', 'NB Bookstore', 'NB Bookstore New York NY US');
      const refusedTransaction = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2, refusedTransactionBody, URLs.apiAdyenNotificationUrl);
      expect(refusedTransaction.status).toBe(200);
      expect(refusedTransaction.body).toEqual('[accepted]');
    });
  
    it(`[C36858] Card transaction 08 Declined with FX and Fee | ecommerce @smoke`, async () => {
      allureReporter.addSeverity('critical');
      allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36858');
      const accountCodeRefId = '16e08988-c36c-4cd2-82eb-a905c8e90c5d';
      const refusedRandomPaymentId = RandomGenerator.uppperTextAndNumbers(16);
      const refusedTransactionBody = requestBody.refusedTransactionFee('ecommerce', refusedRandomPaymentId, 'USD', -20000, 'EUR', -19000, -20500,
          -500, 'Amir', 'AH3227C223222B5FKBMZL8XNG', 'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', 
          '526567789010069', 'New York', 'NY', 'USA', 'NB Bookstore', 'NB Bookstore New York NY US');
      const refusedTransaction = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2, refusedTransactionBody, URLs.apiAdyenNotificationUrl);
      expect(refusedTransaction.status).toBe(200);
      expect(refusedTransaction.body).toEqual('[accepted]');

      const transactionInfo = await transactionsPage.getTransactionInfoByGroupId(refusedRandomPaymentId);
      expect(transactionInfo.AccountCodeRefId).toEqual(accountCodeRefId);
      expect(transactionInfo.JournalType).toEqual('Card');
      expect(transactionInfo.CurrencyCode).toEqual('USD');
      expect(transactionInfo.Amount).toEqual(0);
      expect(transactionInfo.OriginalCurrencyCode).toEqual('EUR');
      expect(transactionInfo.OriginalAmount).toEqual(-190);
      expect(transactionInfo.FxRate).toEqual(0.92682927);
      expect(transactionInfo.DeclineCurrencyCode).toEqual('USD');
      expect(transactionInfo.DeclineAmount).toEqual(-200);
      expect(transactionInfo.Description).toEqual('NB Bookstore New York NY US');
      expect(transactionInfo.ErrorDescription).toEqual('Incorrect CVC code.');
      expect(transactionInfo.ProcessingType).toEqual('Ecommerce');
      expect(transactionInfo.Mcc).toEqual('5131');
      expect(transactionInfo.MerchantName).toEqual('NB Bookstore');
      expect(transactionInfo.MerchantCity).toEqual('New York');
      expect(transactionInfo.MerchantState).toEqual('NY');
      expect(transactionInfo.MerchantCountryCode).toEqual('US');

      const accessToken = await LoginAPICall.getAccessTokenForAPI(Credentials.CenttripAdminNew.Email, Credentials.CenttripAdminAPI.Password);
      const entityCodeRefId = transactionInfo.RefId;
      const endpoint = `api/card/v1/Entity/${entityCodeRefId}/CardTransactions/Paging`;
      const bodyRequest = requestBody.expensesTransactions('28d3d55d-1122-47e5-a31b-6f2f7cec2436', '2022-11-22T13:45:08.892Z');
      const expensesTransactions = await HttpMethods.post(endpoint, requestHeadersToken(accessToken), bodyRequest, URLs.USAPortalURL);
    });
  });