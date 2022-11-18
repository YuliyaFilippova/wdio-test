import allureReporter from '@wdio/allure-reporter';
import { addEpic } from '../../../core/helper/allure/reporter';
import { HttpMethods } from '../../../core/api/rest';
import { apiEndpoints } from '../../../testData/apiEndpoints';
import { Other } from '../../../core/utils/other';
import { Actions } from '../../../core/utils/actions';
import {
  general, USAMainPageElements,
  USAExpensesPageElements
} from '../../../core/pages/locators';
import { RandomGenerator } from '../../../core/utils/randomGenerator';
import { requestBody, requestHeadersToken, requestHeaders2 } from '../../../testData/other';
import { TransactionsPage } from '../../../core/pages/centtripUSA/transactionsPage';
import { SignInPage } from '../../../core/pages/centtripAppWeb/signInPage';
import { LoginAPICall } from '../../../core/utils/loginAPICall';
import { Credentials } from '../../../testData/Credentials';
import { URLs } from '../../../urls';

const signInPage = new SignInPage();
const transactionsPage = new TransactionsPage();

describe(`Centtrip QA Demo > Centtrip QA Demo - Demo Account: Card transactions`, () => {
  before(async () => {
    addEpic('Centtrip QA Demo');
    allureReporter.addFeature('Demo Account: Card transactions');
    await browser.maximizeWindow();
  });

  it(`[C38145] SARAH GOODING: 0 USD (Declined -11.89 USD) to Google (Ecommerce)`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38145');
    const randomPaymentId = RandomGenerator.uppperTextAndNumbers(16);
    const transferBody = requestBody.refusedDemoTransaction(randomPaymentId, -1189, 'Sarah Gooding', 'AH3227C223222C5GJ6CRJGQ78', 'Demo Account',
      'BA32272223222C5GJ6CRJ5MBH', 'PI32272223222C5GJ6DLS5NS6', '7999', '526567789010072', '866-712-7753', 'CA', 'USA', 'Google', 'Google 866-712-7753 CA US');
    const refusedTransfer = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, transferBody, URLs.apiAdyenNotificationUrl);
    expect(refusedTransfer.status).toBe(200);
    expect(refusedTransfer.body).toEqual('[accepted]');
  });

  it(`[C38144] JIM WARNER: -10.94 USD Transaction | -3 USD Transaction | +3 USD Refund | -3 USD Return to UBER (Ecommerce)`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38144');
    const randomPaymentIdPending = RandomGenerator.uppperTextAndNumbers(16);
    const randomAuthPending = RandomGenerator.numbers(6);
    const transferBodyPending = requestBody.authorizeTransactionDemo('ecommerce', randomPaymentIdPending, randomAuthPending, 'USD', -1094, 'USD', -1094, 'Sarah Gooding',
      'AH3227C223222C5GJ6CRJGQ78', 'Demo Account', 'BA32272223222C5GJ6CRJ5MBH', 'PI32272223222C5GJ6DM25NTP', '4121', '526567789010073', 'SAN FRANCISCO',
      'USA', 'UBER * PENDING', 'UBER * PENDING SAN FRANCISCO CA US', 'CA');
    const authorizeTransactionPending = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, transferBodyPending, URLs.apiAdyenNotificationUrl);
    expect(authorizeTransactionPending.status).toBe(200);
    expect(authorizeTransactionPending.body).toEqual('[accepted]');

    const randomPaymentIdTrip = RandomGenerator.uppperTextAndNumbers(16);
    const randomAuthTrip = RandomGenerator.numbers(6);
    const transferBodyTrip = requestBody.authorizeTransactionDemo('ecommerce', randomPaymentIdTrip, randomAuthTrip, 'USD', -300, 'USD', -300, 'Sarah Gooding',
      'AH3227C223222C5GJ6CRJGQ78', 'Demo Account', 'BA32272223222C5GJ6CRJ5MBH', 'PI32272223222C5GJ6DM25NTP', '4121', '526567789010073', 'SAN FRANCISCO',
      'USA', 'UBER *TRIP', 'UBER *TRIP SAN FRANCISCO CA US', 'CA');
    const authorizeTransactionTrip = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, transferBodyTrip, URLs.apiAdyenNotificationUrl);
    expect(authorizeTransactionTrip.status).toBe(200);
    expect(authorizeTransactionTrip.body).toEqual('[accepted]');

    const cancelledBodyTrip = requestBody.cancelledTransactionDemo('ecommerce', randomPaymentIdTrip, randomAuthTrip, -300, 'USD', -300, 300, 'Sarah Gooding',
      'AH3227C223222C5GJ6CRJGQ78', 'Demo Account', 'BA32272223222C5GJ6CRJ5MBH', 'PI32272223222C5GJ6DM25NTP', '4121', '526567789010073', 'SAN FRANCISCO',
      'CA', 'USA', 'UBER *TRIP', 'UBER *TRIP SAN FRANCISCO CA US');
    const cancelledTransactioTrip = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, cancelledBodyTrip, URLs.apiAdyenNotificationUrl);
    expect(cancelledTransactioTrip.status).toBe(200);
    expect(cancelledTransactioTrip.body).toEqual('[accepted]');

    const capturedPaymentId = RandomGenerator.uppperTextAndNumbers(16);
    const captureBody = requestBody.capturedTransactionDemo('ecommerce', capturedPaymentId, randomPaymentIdPending, -1394, 'Sarah Gooding', 'AH3227C223222C5GJ6CRJGQ78',
      'Demo Account', 'BA32272223222C5GJ6CRJ5MBH', 'PI32272223222C5GJ6DM25NTP', '4121', '526567789010073', 'SAN FRANCISCO',
      'USA', 'UBER * PENDING', 'UBER * PENDING SAN FRANCISCO CA US', 'CA',);
    const capturedTransaction = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, captureBody, URLs.apiAdyenNotificationUrl);
    expect(capturedTransaction.status).toBe(200);
    expect(capturedTransaction.body).toEqual('[accepted]');
  });

  it(`[C38143] SARAH GOODING: -150 USD Transaction | -4.19 USD Fee | -0.57 USD Return to YENI (POS)`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38143');
    const authorisedRandomId = RandomGenerator.uppperTextAndNumbers(16);
    const randomCode = RandomGenerator.numbers(6);
    const transactionBody = requestBody.authorizeTransactionWithAdjustmentDemo(authorisedRandomId, randomCode, 'USD', -15000, 'GBP', -12687, 'USD', -15419,
      -419, 'Sarah Gooding', 'AH3227C223222C5GJ6CRJGQ78', 'Demo Account', 'BA32272223222C5GJ6CRJ5MBH', 'PI32272223222C5GJ6DLS5NS6', '5812', '526567789010075',
      'LONDON', 'GBR', 'YENI', 'YENI LONDON GB');
    const authorizeTransaction = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, transactionBody, URLs.apiAdyenNotificationUrl);
    expect(authorizeTransaction.status).toBe(200);
    expect(authorizeTransaction.body).toEqual('[accepted]');

    const capturedRandomPaymentId = RandomGenerator.uppperTextAndNumbers(16);
    const capturedBody = requestBody.capturedTransactionDemo('pos', capturedRandomPaymentId, authorisedRandomId, -15476, 'Sarah Gooding', 'AH3227C223222C5GJ6CRJGQ78',
      'Demo Account', 'BA32272223222C5GJ6CRJ5MBH', 'PI32272223222C5GJ6DLS5NS6', '5812', '526567789010075', 'LONDON', 'GBR', 'YENI', 'YENI LONDON GB');
    const capturedTransaction = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, capturedBody, URLs.apiAdyenNotificationUrl);
    expect(capturedTransaction.status).toBe(200);
    expect(capturedTransaction.body).toEqual('[accepted]');
  });

  it(`[C38142] JIM WARNER: -432.1 USD to REGUS MANAGEMENT GROUP (Recurring)`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38142');
    const authorisedRandomId = RandomGenerator.uppperTextAndNumbers(16);
    const randomCode = RandomGenerator.numbers(6);
    const transactionBody = requestBody.authorizeTransactionDemo('recurring', authorisedRandomId, randomCode, 'USD', -43210, 'USD', -43210, 'Sarah Gooding', 'AH3227C223222C5GJ6CRJGQ78', 'Demo Account',
      'BA32272223222C5GJ6CRJ5MBH', 'PI32272223222C5GJ6DM25NTP', '6513', '526567789010071', '469-2193200', 'USA', 'REGUS MANAGEMENT GROUP', 'REGUS MANAGEMENT GROUP 469-2193200 TX US', 'TX');

    const authorizeTransaction = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, transactionBody, URLs.apiAdyenNotificationUrl);
    expect(authorizeTransaction.status).toBe(200);
    expect(authorizeTransaction.body).toEqual('[accepted]');

    const capturedRandomPaymentId = RandomGenerator.uppperTextAndNumbers(16);
    const capturedBody = requestBody.capturedTransactionDemo('recurring', capturedRandomPaymentId, authorisedRandomId, -43210, 'Sarah Gooding', 'AH3227C223222C5GJ6CRJGQ78', 'Demo Account',
      'BA32272223222C5GJ6CRJ5MBH', 'PI32272223222C5GJ6DM25NTP', '6513', '526567789010071', '469-2193200', 'USA', 'REGUS MANAGEMENT GROUP', 'REGUS MANAGEMENT GROUP 469-2193200 TX US', 'TX');

    const capturedTransaction = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, capturedBody, URLs.apiAdyenNotificationUrl);
    expect(capturedTransaction.status).toBe(200);
    expect(capturedTransaction.body).toEqual('[accepted]');
  });

  it(`[C38141] JIM WARNER: -123.45 USD to REGUS MANAGEMENT GROUP (Recurring)`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38141');
    const authorisedRandomId = RandomGenerator.uppperTextAndNumbers(16);
    const randomCode = RandomGenerator.numbers(6);
    const transactionBody = requestBody.authorizeTransactionDemo('recurring', authorisedRandomId, randomCode, 'USD', -12345, 'USD', -12345, 'Sarah Gooding', 'AH3227C223222C5GJ6CRJGQ78', 'Demo Account',
      'BA32272223222C5GJ6CRJ5MBH', 'PI32272223222C5GJ6DM25NTP', '6513', '526567789010071', '469-2193200', 'USA', 'REGUS MANAGEMENT GROUP', 'REGUS MANAGEMENT GROUP 469-2193200 TX US', 'TX');

    const authorizeTransaction = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, transactionBody, URLs.apiAdyenNotificationUrl);
    expect(authorizeTransaction.status).toBe(200);
    expect(authorizeTransaction.body).toEqual('[accepted]');

    const capturedRandomPaymentId = RandomGenerator.uppperTextAndNumbers(16);
    const capturedBody = requestBody.capturedTransactionDemo('recurring', capturedRandomPaymentId, authorisedRandomId, -12345, 'Sarah Gooding', 'AH3227C223222C5GJ6CRJGQ78', 'Demo Account',
      'BA32272223222C5GJ6CRJ5MBH', 'PI32272223222C5GJ6DM25NTP', '6513', '526567789010071', '469-2193200', 'USA', 'REGUS MANAGEMENT GROUP', 'REGUS MANAGEMENT GROUP 469-2193200 TX US', 'TX');
    const capturedTransaction = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, capturedBody, URLs.apiAdyenNotificationUrl);
    expect(capturedTransaction.status).toBe(200);
    expect(capturedTransaction.body).toEqual('[accepted]');

    const accessToken = await LoginAPICall.getAccessTokenForAPI(Credentials.CenttripAdminAPI.Email, Credentials.CenttripAdminAPI.Password);
    const transactionId = await transactionsPage.getTransactionRefId(authorisedRandomId);
    const endpoint = `api/card/v1/Entity/33324eec-dc36-4f6a-b965-47deb6d7fd94/cardtransactions/${transactionId}/labels`;
    const addLabel = await HttpMethods.post(endpoint, requestHeadersToken(accessToken), { 'label': 'office' }, URLs.USAPortalURL);
    expect(addLabel.status).toBe(200);
    expect(addLabel.body.isSuccess).toEqual(true);

    await browser.url(URLs.USAPortalURL);
    await signInPage.signInAsRegisteredUserUSA(Credentials.CentripDemoUSA.Email, Credentials.CentripDemoUSA.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Expenses'));
    await USAExpensesPageElements.table.nameOfFirstTransaction.waitForDisplayed();
    await Actions.waitAndClick(await general.elementByText(randomCode));
    await USAExpensesPageElements.transactionsDetails.loaderArea.waitForDisplayed();
    await Actions.uploadFile(`/src/testData/files/receipt2.jpg`,await USAExpensesPageElements.transactionsDetails.loaderPath);
    await USAExpensesPageElements.transactionsDetails.recieptImage.waitForDisplayed();
    await Other.deleteCacheCookiesUSA();
  });

  it(`[C38140] SARAH GOODING: -20 USD to INTUIT *QUICKBOOKS (Recurring)`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38140');
    const authorisedRandomId = RandomGenerator.uppperTextAndNumbers(16);
    const randomCode = RandomGenerator.numbers(6);
    const transactionBody = requestBody.authorizeTransactionDemo('recurring', authorisedRandomId, randomCode, 'USD', -2000, 'GBP', -1691, 'Sarah Gooding', 'AH3227C223222C5GJ6CRJGQ78',
      'Demo Account', 'BA32272223222C5GJ6CRJ5MBH', 'PI32272223222C5GJ6DLS5NS6', '5734', '526567789010070', '08081684238', 'GBR', 'INTUIT *QUICKBOOKS', 'INTUIT *QUICKBOOKS 08081684238 GB');

    const authorizeTransaction = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, transactionBody, URLs.apiAdyenNotificationUrl);
    expect(authorizeTransaction.status).toBe(200);
    expect(authorizeTransaction.body).toEqual('[accepted]');

    const capturedRandomPaymentId = RandomGenerator.uppperTextAndNumbers(16);
    const capturedBody = requestBody.capturedTransactionDemo('recurring', capturedRandomPaymentId, authorisedRandomId, -2000, 'Sarah Gooding', 'AH3227C223222C5GJ6CRJGQ78', 'Demo Account',
      'BA32272223222C5GJ6CRJ5MBH', 'PI32272223222C5GJ6DLS5NS6', '5734', '526567789010070', '08081684238', 'GBR', 'INTUIT *QUICKBOOKS', 'INTUIT *QUICKBOOKS 08081684238 GB');

    const capturedTransaction = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, capturedBody, URLs.apiAdyenNotificationUrl);
    expect(capturedTransaction.status).toBe(200);
    expect(capturedTransaction.body).toEqual('[accepted]');
  });

  it(`[C38139] JIM WARNER: -240 USD to VMO*Vimeo PRO (Ecommerce)`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/38139');
    const authorisedRandomId = RandomGenerator.uppperTextAndNumbers(16);
    const randomCode = RandomGenerator.numbers(6);
    const transactionBody = requestBody.authorizeTransactionDemo('ecommerce', authorisedRandomId, randomCode, 'USD', -24000, 'USD', -24000, 'Sarah Gooding', 'AH3227C223222C5GJ6CRJGQ78', 'Demo Account',
      'BA32272223222C5GJ6CRJ5MBH', 'PI32272223222C5GJ6DM25NTP', '8699', '526567789010069', '646-490-1679', 'USA', 'VMO*Vimeo PR', 'VMO*Vimeo PRO 646-490-1679 NY US', 'NY');

    const authorizeTransaction = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, transactionBody, URLs.apiAdyenNotificationUrl);
    expect(authorizeTransaction.status).toBe(200);
    expect(authorizeTransaction.body).toEqual('[accepted]');

    const capturedRandomPaymentId = RandomGenerator.uppperTextAndNumbers(16);
    const capturedBody = requestBody.capturedTransactionDemo('ecommerce', capturedRandomPaymentId, authorisedRandomId, -24000, 'Sarah Gooding', 'AH3227C223222C5GJ6CRJGQ78', 'Demo Account',
      'BA32272223222C5GJ6CRJ5MBH', 'PI32272223222C5GJ6DM25NTP', '8699', '526567789010069', '646-490-1679', 'USA', 'VMO*Vimeo PR', 'VMO*Vimeo PRO 646-490-1679 NY US', 'NY');
    const capturedTransaction = await HttpMethods.post(apiEndpoints.setNotification, requestHeaders2, capturedBody, URLs.apiAdyenNotificationUrl);
    expect(capturedTransaction.status).toBe(200);
    expect(capturedTransaction.body).toEqual('[accepted]');

    const accessToken = await LoginAPICall.getAccessTokenForAPI(Credentials.CenttripAdminAPI.Email, Credentials.CenttripAdminAPI.Password);
    const transactionId = await transactionsPage.getTransactionRefId(authorisedRandomId);
    const endpoint = `api/card/v1/Entity/33324eec-dc36-4f6a-b965-47deb6d7fd94/cardtransactions/${transactionId}/labels`;
    const addLabel = await HttpMethods.post(endpoint, requestHeadersToken(accessToken), { 'label': 'office' }, URLs.USAPortalURL);
    expect(addLabel.status).toBe(200);
    expect(addLabel.body.isSuccess).toEqual(true);

    await browser.url(URLs.USAPortalURL);
    await signInPage.signInAsRegisteredUserUSA(Credentials.CentripDemoUSA.Email, Credentials.CentripDemoUSA.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Expenses'));
    await (await USAExpensesPageElements.table.nameOfFirstTransaction).waitForDisplayed();
    await Actions.waitAndClick(await general.elementByText(randomCode));
    await (await USAExpensesPageElements.transactionsDetails.loaderArea).waitForDisplayed();
    await Actions.uploadFile(`/src/testData/files/receipt1.jpg`,await USAExpensesPageElements.transactionsDetails.loaderPath);
    await (await USAExpensesPageElements.transactionsDetails.recieptImage).waitForDisplayed();
    await Other.deleteCacheCookiesUSA();
  });
});