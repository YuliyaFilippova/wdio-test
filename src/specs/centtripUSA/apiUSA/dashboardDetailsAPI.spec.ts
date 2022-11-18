import allureReporter from '@wdio/allure-reporter';
import { connectionUSA } from '../../../wdio.conf';
import { LoginAPICall } from '../../../core/utils/loginAPICall';
import { Credentials } from '../../../testData/Credentials';
import { requestBody, requestHeadersToken } from '../../../testData/other';
import { HttpMethods } from '../../../core/api/rest';
import { DashboardPage } from '../../../core/pages/centtripUSA/dashboardPage';
import { URLs } from '../../../urls';

const dashboardPage = new DashboardPage();

describe(`API > Dashboard details`, () => {
    let accessToken;
    before(async () => {
    if (!connectionUSA._connectCalled) {
      await connectionUSA.connect();
    }
    accessToken = await LoginAPICall.getAccessTokenForAPI(Credentials.CenttripAdminAPI.Email, Credentials.CenttripAdminAPI.Password);
  });
    it(`[C36862] Corporate details on Master dashboard @smoke`, async () => {
      allureReporter.addSeverity('critical');
      allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36862');
      const corporateId = 'a5b18c28-df6c-486e-9797-78a691005d14';
      const requestEndpoint = `api/account/v1/MasterDashboard/${corporateId}/corporate-details`;

      const getCorporateRequest = await HttpMethods.get(requestEndpoint, requestHeadersToken(accessToken), URLs.USAPortalURL);
      expect(getCorporateRequest.status).toBe(200);
      expect(getCorporateRequest.body.isSuccess).toBe(true);
      expect(getCorporateRequest.body.value.corporateName).toBe('AutoQAForUpdate');
      expect(getCorporateRequest.body.value.primaryAccountName).toBe('QaUpdatePrimary');
      expect(getCorporateRequest.body.value.subscription).toBe('Pro');
      expect(getCorporateRequest.body.value.groupLimitType).toBe('Increased');
      expect(getCorporateRequest.body.value.address.buildingNumber).toBe('1');
      expect(getCorporateRequest.body.value.address.buildingName).toBe(null);
      expect(getCorporateRequest.body.value.address.flatNumber).toBe(null);
      expect(getCorporateRequest.body.value.address.street).toBe('Baker St.');
      expect(getCorporateRequest.body.value.address.postalCodeZipCode).toBe('11111');
      expect(getCorporateRequest.body.value.address.city).toBe('New York');
      expect(getCorporateRequest.body.value.address.country).toBe('US');
      expect(getCorporateRequest.body.value.address.county).toBe(null);
      expect(getCorporateRequest.body.value.address.town).toBe(null);
      expect(getCorporateRequest.body.value.address.state).toBe('NY');
    });

    it(`[C36863] Source of funds on Dashboard, Master dashboard @smoke`, async () => {
        allureReporter.addSeverity('critical');
        allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36863');
        const entityCodeRefId = 'f669ea48-6a91-41bc-ac48-3a7076df3243';
        const requestEndpoint = `api/account/v1/Dashboard/source-of-funds?entityCodeRefId=${entityCodeRefId}`;
  
        const getSourceOfFunds = await HttpMethods.get(requestEndpoint, requestHeadersToken(accessToken), URLs.USAPortalURL);
        expect(getSourceOfFunds.status).toBe(200);
        expect(getSourceOfFunds.body.isSuccess).toBe(true);
        expect(getSourceOfFunds.body.value.usaSourceOfFunds[0].accountType).toBe('Checking');
        expect(getSourceOfFunds.body.value.usaSourceOfFunds[0].routingNumber).toBe('121000358');
        expect(getSourceOfFunds.body.value.usaSourceOfFunds[0].accountName).toBe('UpdateAccount');
        expect(getSourceOfFunds.body.value.usaSourceOfFunds[0].accountNumber).toBe('343432424');
        expect(getSourceOfFunds.body.value.usaSourceOfFunds[0].bankName).toBe('Bank of Amerika');
        expect(getSourceOfFunds.body.value.usaSourceOfFunds[0].bankCountry).toBe('US');
        expect(getSourceOfFunds.body.value.ibanSourceOfFunds).toBe(null);
        expect(getSourceOfFunds.body.value.otherSourceOfFunds).toBe(null);
      });

      it(`[C36864] Statistics on Master dashboard @smoke`, async () => {
        const accessToken = await LoginAPICall.getAccessTokenForAPI('autoforupdate.centtrip.qa@harakirimail.com', Credentials.CenttripAdminAPI.Password);
        allureReporter.addSeverity('critical');
        allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36864');
        const endpoint = 'api/administration/v1/users/search/paging';
        const entityCode = 'a5b18c28-df6c-486e-9797-78a691005d14';
        const statisticsEndpoint = `api/account/v1/MasterDashboard/${entityCode}/statistics`

        const acountStatistics = await dashboardPage.getAccountsStatisticFromDB(entityCode);
        expect(acountStatistics['Card']).toEqual(3);
        expect(acountStatistics['Operating']).toEqual(2);
        const totalOperatingAccounts = acountStatistics['Operating'];
        const totalCardAccounts = acountStatistics['Card']
        const totalAccounts = totalOperatingAccounts + totalCardAccounts;

        const cardStatistics = await dashboardPage.getCardsStatisticFromDB(entityCode);
        expect(cardStatistics['Card']).toEqual(2);
        expect(cardStatistics['Operating']).toEqual(3);
        const totalSharedCards = cardStatistics['Operating'];
        const totalOwnCards = cardStatistics['Card']
        const totalCards = totalSharedCards + totalOwnCards;

        const numberOfUsers = await HttpMethods.post(endpoint, requestHeadersToken(accessToken),
          requestBody.checkNumberOF('a5b18c28-df6c-486e-9797-78a691005d14', []), URLs.USAPortalURL);
        expect(numberOfUsers.status).toBe(200);
        const users = numberOfUsers.body.value.totalCount - 1;

        const numberOfCardholders = await HttpMethods.post(endpoint, requestHeadersToken(accessToken),
          requestBody.checkNumberOF('a5b18c28-df6c-486e-9797-78a691005d14', ['Cardholder']), URLs.USAPortalURL);
        expect(numberOfCardholders.status).toBe(200);
        const cardholders = numberOfCardholders.body.value.totalCount - 1;

        const adminsBody = requestBody.checkNumberOF('a5b18c28-df6c-486e-9797-78a691005d14',
          ['CorporateAdministrator','Corporate Super Administrator','Corporate Admin Read Only']);
        const numberOfAdmins = await HttpMethods.post(endpoint, requestHeadersToken(accessToken), adminsBody, URLs.USAPortalURL);
        expect(numberOfAdmins.status).toBe(200);
        const admins = numberOfAdmins.body.value.totalCount - 1;

        const getSourceOfFunds = await HttpMethods.get(statisticsEndpoint, requestHeadersToken(accessToken), URLs.USAPortalURL);
        expect(getSourceOfFunds.status).toBe(200);
        expect(getSourceOfFunds.body.value.accounts.totalOperatingAccounts).toEqual(totalOperatingAccounts);
        expect(getSourceOfFunds.body.value.accounts.totalCardAccounts).toEqual(totalCardAccounts);
        expect(getSourceOfFunds.body.value.accounts.totalAccounts).toEqual(totalAccounts);
        expect(getSourceOfFunds.body.value.cards.totalSharedCards).toEqual(totalSharedCards);
        expect(getSourceOfFunds.body.value.cards.totalOwnCards).toEqual(totalOwnCards);
        expect(getSourceOfFunds.body.value.cards.totalCards).toEqual(totalCards);
        expect(getSourceOfFunds.body.value.users.totalCardHolders).toEqual(cardholders);
        expect(getSourceOfFunds.body.value.users.totalAdmins).toEqual(admins);
        expect(getSourceOfFunds.body.value.users.totalUsers).toEqual(users);
      });
  });