import allureReporter from '@wdio/allure-reporter';
import { RandomGenerator } from '../../../core/utils/randomGenerator';
import { requestBody, requestHeaders2 } from '../../../testData/other';
import { HttpMethods } from '../../../core/api/rest';
import { apiEndpoints } from '../../../testData/apiEndpoints';
import { URLs } from '../../../urls';

describe(`API > Card transactions`, () => {
    it(`[C36851] Card transaction 01 Auth = Cap | ecommerce | no state @smoke`, async () => {
      allureReporter.addSeverity('critical');
      allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36851');
      const randomPaymentIdPending = RandomGenerator.uppperTextAndNumbers(16);
      const randomAuthPending = RandomGenerator.numbers(6);
      const transferBodyPending = requestBody.authorizeTransactionDemo('ecommerce', randomPaymentIdPending, randomAuthPending, 'USD', -3100, 'USD', -3100, 'Amir',
        'AH3227C223222B5FKBMZL8XNG', 'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069', 'New York',
        'USA', 'NB Bookstore', 'NB Bookstore New York USA');
      const authorizeTransactionPending = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, transferBodyPending, URLs.apiAdyenNotificationUrl);
      expect(authorizeTransactionPending.status).toBe(200);
      expect(authorizeTransactionPending.body).toEqual('[accepted]');
  
      const capturedPaymentId = RandomGenerator.uppperTextAndNumbers(16);
      const captureBody = requestBody.capturedTransactionDemo('ecommerce', capturedPaymentId, randomPaymentIdPending, -3100, 'Amir', 'AH3227C223222B5FKBMZL8XNG',
        'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', '526567789010069', 'New York',
        'USA', 'NB Bookstore', 'NB Bookstore New York USA');
      const capturedTransaction = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, captureBody, URLs.apiAdyenNotificationUrl);
      expect(capturedTransaction.status).toBe(200);
      expect(capturedTransaction.body).toEqual('[accepted]');
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
      const refusedRandomPaymentId = RandomGenerator.uppperTextAndNumbers(16);
      const refusedTransactionBody = requestBody.refusedTransactionFee('ecommerce', refusedRandomPaymentId, 'USD', -20000, 'EUR', -19000, -20500,
          -500, 'Amir', 'AH3227C223222B5FKBMZL8XNG', 'Diana Bishop', 'BA3227C223222B5FKCC2R8Z95', 'PI3227C223222B5FKCC2R8ZBS', '5131', 
          '526567789010069', 'New York', 'NY', 'USA', 'NB Bookstore', 'NB Bookstore New York NY US');
      const refusedTransaction = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2, refusedTransactionBody, URLs.apiAdyenNotificationUrl);
      expect(refusedTransaction.status).toBe(200);
      expect(refusedTransaction.body).toEqual('[accepted]');
    });
  });