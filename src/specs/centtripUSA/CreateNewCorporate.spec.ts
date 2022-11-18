import allureReporter from '@wdio/allure-reporter';
import { connectionUSA } from '../../wdio.conf';
import {
  applicationServiceMainPageElements, general,
  USAProvisioningPageElements, USAMainPageElements,
  USAAccountsPageElements
} from '../../core/pages/locators';
import { Credentials } from '../../testData/Credentials';
import { SignInPage } from '../../core/pages/centtripAppWeb/signInPage';
import { CreateNewAppPage } from '../../core/pages/centtripAppWeb/createNewAppPage';
import { addEpic } from '../../core/helper/allure/reporter';
import { Actions } from '../../core/utils/actions';
import {Button} from '../../core/controls/button';
import { Other } from '../../core/utils/other';
import { requestBody, requestHeaders2 } from '../../testData/other';
import { AppServicePage } from '../../core/pages/centtripAppWeb/appServicePage';
import { HttpMethods } from '../../core/api/rest';
import { apiEndpoints } from '../../testData/apiEndpoints';
import { CommonPageUSA } from '../../core/pages/centtripUSA/commonUSA';
import { RandomGenerator } from '../../core/utils/randomGenerator';
import moment = require('moment');
import { URLs } from '../../urls';

const signInPage = new SignInPage();
const createNewAppPage = new CreateNewAppPage();
const appServicePage = new AppServicePage();
const commonPageUSA = new CommonPageUSA();

describe('Provisioning > Create new corporate', () => {
  const randEmail = `director.${moment().format("DD.MM.HH.mm.ss.")}qa@harakirimail.com`;
  const adminEmail = `firstcsa.${moment().format("DD.MM.HH.mm.ss.")}qa@harakirimail.com`;
  console.log(randEmail);
  console.log(adminEmail);
  let companyName: string;
  let externalId: string;
  let accountHolderId: string;
  let accountName: string;
  let dateOfCreation: string;

  before(async () => {
    if (!connectionUSA._connectCalled) {
      await connectionUSA.connect();
    }
  });

  beforeEach(async () => {
    addEpic('Provisioning');
    allureReporter.addFeature('Create new corporate');
  });

  afterEach(async () => {
    await Other.deleteCacheCookiesUSA();
  });

  it('[C36519] Create and approve new USA application', async () => {
    allureReporter.addSeverity('blocker');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36519');
    const taxNum = RandomGenerator.numbers(9);
    const postCode = '14425';
    const houseNumber = '1190';
    const street = 'Clyde Dr';
    const city = 'Farmington';
    const phoneNumber = '2176502010';

    await browser.url(URLs.baseUrl);
    await signInPage.signInAsRegisteredUser(Credentials.createNewCorpCredentials.Email, Credentials.createNewCorpCredentials.Password,
      applicationServiceMainPageElements.general.appSection);
    companyName = await createNewAppPage.contAppFirstStepUSA('USA', 'Autotest', 'C-Corporation (private)', houseNumber, street,
      city, postCode, taxNum, 'TradingUSA', adminEmail);
    await createNewAppPage.createAppSecondStepUSA('Jack Bell', '1111111111', 'Checking', 'Bank of America', '121000358');
    await createNewAppPage.createAppThirdStepUSA('Jack', 'Bell', 'USA', 'Gasport', '7914', 'Chestnut Ridge Rd', '14067', '11', '11', '1980', 'USA');
    await createNewAppPage.createAppAddStepUSA('Director', '123456789', randEmail, phoneNumber, 'Mobile', 'US', 1, '242343243244332', 'ticker');
    await createNewAppPage.confirmUSAApp(Credentials.createNewCorpCredentials.Email, Credentials.createNewCorpCredentials.Password);
    await appServicePage.signOut();
    await browser.url(URLs.baseUrl);
    await signInPage.signInAsRegisteredUser(Credentials.CenttripAdministratorCredentials.Email, Credentials.CenttripAdministratorCredentials.Password,
      applicationServiceMainPageElements.general.appSection);
    await appServicePage.switchToTabAndSearch('USA', companyName);
    await createNewAppPage.waitAndClickOnStartKYCButton();
    await Actions.waitAndClick(await general.linkByName('UK'));
    await appServicePage.switchToTabAndSearch('USA', companyName);
    const status = await applicationServiceMainPageElements.listOfAppsUSA.statusOfLastCompany.getText();
    expect(status).toContain('KYC In progress');
    await Other.deleteCacheCookies();
    await browser.url(URLs.authUrl);
    await Other.deleteCacheCookies();
    const adyenData = await commonPageUSA.getCorporateAdyenIdFromDB(companyName);
    externalId = adyenData[0];
    accountHolderId = adyenData[1];
    const CustomerRequest = await HttpMethods.post(apiEndpoints.adyenNotifications, requestHeaders2, requestBody.requestBodyC11613(accountHolderId, externalId, 'valid'),
      URLs.apiAdyenNotificationUrl);
    expect(CustomerRequest.status).toBe(200);

    await browser.url(URLs.baseUrl);
    await signInPage.signInAsRegisteredUser(Credentials.CenttripAdministratorCredentials.Email, Credentials.CenttripAdministratorCredentials.Password,
      applicationServiceMainPageElements.general.appSection);
    await appServicePage.switchToTabAndSearch('USA', companyName);
    const updatedStatus = await applicationServiceMainPageElements.listOfAppsUSA.statusOfLastCompany.getText();
    expect(updatedStatus).toContain('Approved');
    await appServicePage.signOut();
    await Other.deleteCacheCookies();
    await browser.url(URLs.authUrl);
    await Other.deleteCacheCookies();
  }).timeout(350000);

  it('[C9415] Step 1 is prepopulated on "Create Corporate" page @smoke', async () => {
    allureReporter.addStory('Step 1 CORPORATE INFORMATION');
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/9415');
    await browser.url(URLs.USAPortalURL);
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdminAPI.Email, Credentials.CenttripAdminAPI.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Provisioning'));
    await (await USAMainPageElements.columnHeader('KYC Approved Date')).waitForDisplayed();
    await commonPageUSA.pasteCompanyNameAndClickOnTheCreateButton(companyName, await USAProvisioningPageElements.createCorporateButton);
    await (await USAProvisioningPageElements.createCorporate.corporateData).waitForDisplayed();
    const corporateName = await USAProvisioningPageElements.createCorporate.corporateName.getText();
    const postalCode = await USAProvisioningPageElements.createCorporate.postCode.getText();
    const street = await USAProvisioningPageElements.createCorporate.street.getText();
    const city = await USAProvisioningPageElements.createCorporate.city.getText();
    const state = await USAProvisioningPageElements.createCorporate.state.getText();
    const country = await USAProvisioningPageElements.createCorporate.country.getText();
    const phoneType = await USAProvisioningPageElements.createCorporate.phoneType.getText();
    const phoneNumber = await USAProvisioningPageElements.createCorporate.phoneNumber.getText();
    const email = await USAProvisioningPageElements.createCorporate.email.getText();

    await commonPageUSA.checkFullCorporateDataInEHDB(companyName, corporateName, postalCode, street, city, state, country, phoneType,
      phoneNumber, email);
  });

  it('[C9416] Create new Corporate @smoke', async () => {
    allureReporter.addSeverity('blocker');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/9416');
    await browser.url(URLs.USAPortalURL);
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdminAPI.Email, Credentials.CenttripAdminAPI.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Provisioning'));
    await (USAMainPageElements.columnHeader('KYC Approved Date')).waitForDisplayed();
    expect(await (await USAProvisioningPageElements.statusOfLastCorporate).getText()).toEqual('N/A');
    await (await USAProvisioningPageElements.createCorporateButton).waitForDisplayed();
    await Actions.waitAndClick(await USAProvisioningPageElements.createCorporateButton);
    await (await USAProvisioningPageElements.createCorporate.corporateData).waitForDisplayed();
    await Actions.waitAndClick(await USAProvisioningPageElements.createCorporate.nextStepButton);
    await (await USAProvisioningPageElements.createCorporate.selectSubField).waitForDisplayed();
    try {
      await Button.clickOnOptionFromDropdown(await USAProvisioningPageElements.createCorporate.selectSubField,
        await general.selectOption('Starter'));
    } catch  {
      // await JsScripts.scrollUp();
      await Button.clickOnOptionFromDropdown(await USAProvisioningPageElements.createCorporate.selectSubField,
        await general.selectOption('Starter'));
    };
    await Button.clickOnOptionFromDropdown(await USAProvisioningPageElements.createCorporate.cardStyleField,
      await general.selectOption('Default'));
    await Button.clickOnOptionFromDropdown(await USAProvisioningPageElements.createCorporate.selectLimitsField,
      await general.selectOption('Standard'));
    await Actions.waitAndClick(await USAProvisioningPageElements.createCorporate.createButton);
    await Actions.waitAndClick(await USAProvisioningPageElements.createCorporate.finishButton);
    await browser.pause(10000);
    await (await USAProvisioningPageElements.createCsaButton).waitForDisplayed();
  });

  it('[C12420] Check created corporate in db @smoke', async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/12420');
    const corporateData = await appServicePage.checkCreatedParentEntity(companyName);
    console.log(corporateData);
    expect(corporateData.Name).toEqual(companyName);
    expect(corporateData.PostalCodeZipCode).toEqual('14425');
    expect(corporateData.BuildingNumber).toEqual('1190');
    expect(corporateData.BuildingName).toEqual(null);
    expect(corporateData.FlatNumber).toEqual(null);
    expect(corporateData.Street).toEqual('Clyde Dr');
    expect(corporateData.City).toEqual('Farmington');
    expect(corporateData.State).toEqual('NY');
    expect(corporateData.Country).toEqual('US');
    expect(corporateData.PhoneType).toEqual('mobile');
    expect(corporateData.PhoneCountryCode).toEqual('US');
    expect(corporateData.PhoneNumber).toEqual('2176502010');
    expect(corporateData.Email).toEqual(randEmail);
    expect(corporateData.Subscription).toEqual('Starter');
    expect(corporateData.CardStyle).toEqual('Default');
    expect(corporateData.CorporateGroupLimitType).toEqual('Standard');
  });

  it('[C34887] Step 1 is prepopulated on "Create corporate super admin" page @smoke', async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/34887');
    await browser.url(URLs.USAPortalURL);
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdminAPI.Email, Credentials.CenttripAdminAPI.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Provisioning'));
    await (await USAMainPageElements.columnHeader('KYC Approved Date')).waitForDisplayed();
    await Actions.waitAndClick(await USAProvisioningPageElements.createCsaButton);
    await (await USAProvisioningPageElements.createCsa.supperAdminInfo).waitForDisplayed();
    await browser.pause(1000);
    expect(await (await USAProvisioningPageElements.createCsa.email).getAttribute('value')).toEqual(adminEmail);
    expect(await (await USAProvisioningPageElements.createCsa.firstName).getAttribute('value')).toEqual('FirstCSA');
    expect(await (await USAProvisioningPageElements.createCsa.lastName).getAttribute('value')).toEqual('User');
    const month = await (await USAProvisioningPageElements.createCsa.monthOfBirth).getText();
    const day = await (await USAProvisioningPageElements.createCsa.dayOfBirth).getText();
    const year = await (await USAProvisioningPageElements.createCsa.yearOfBirth).getAttribute('value');
    expect(month + ' ' + day + ' ' + year).toEqual('November 11 1980');
  });

  it('[C34885] Create first CSA for the new corporate @smoke', async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/34885');
    await browser.url(URLs.USAPortalURL);
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdminAPI.Email, Credentials.CenttripAdminAPI.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Provisioning'));
    await (await USAMainPageElements.columnHeader('KYC Approved Date')).waitForDisplayed();
    await Actions.waitAndClick(await USAProvisioningPageElements.createCsaButton);
    await (await USAProvisioningPageElements.createCsa.supperAdminInfo).waitForDisplayed();
    await browser.pause(1000);
    await Actions.waitAndClick(await USAProvisioningPageElements.createCorporate.createButton);
    await Actions.waitAndClick(await USAProvisioningPageElements.createCorporate.finishButton);
    await (await USAProvisioningPageElements.createAccountButton).waitForDisplayed();
  });

  it('[C12417] Create primary account for the new corporate @smoke', async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/12417');
    accountName = `Account ${moment().format('DD.MM.HH:mm')}`;
    dateOfCreation = moment().format('MM/DD/YYYY');
    await browser.url(URLs.USAPortalURL);
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdminAPI.Email, Credentials.CenttripAdminAPI.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Provisioning'));
    await (await USAMainPageElements.columnHeader('KYC Approved Date')).waitForDisplayed();
    await Actions.waitAndClick(await USAProvisioningPageElements.createAccountButton);
    await (await USAProvisioningPageElements.createAccount.accountData).waitForDisplayed();
    await browser.pause(500);
    await (await USAProvisioningPageElements.createAccount.accountNameFieldInput).addValue(accountName);
    await Actions.waitAndClick(await USAProvisioningPageElements.createAccount.createButton);
    await Actions.waitAndClick(await USAProvisioningPageElements.createCorporate.finishButton);
    await (await USAProvisioningPageElements.searchField).waitForDisplayed();
    try {
      await (await USAProvisioningPageElements.searchField).addValue(accountName);
    } catch {
      // await JsScripts.scrollUp();
      await (await USAProvisioningPageElements.searchField).addValue(accountName);
    }
    await (await general.divByName('No results found')).waitForDisplayed();
  });

  it('[C36572] Details of new primary account in Accounts table and details @smoke', async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36572');
    await browser.url(URLs.USAPortalURL);
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdminAPI.Email, Credentials.CenttripAdminAPI.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Account List'));
    await (await USAMainPageElements.columnHeader('Account name')).waitForDisplayed();
    await (await USAAccountsPageElements.searchField).addValue(accountName);
    expect(await (await USAAccountsPageElements.accountNameOfLastAccount).getText()).toContain('PRIMARY');
    expect(await (await USAAccountsPageElements.accountNameOfLastAccount).getText()).toContain(accountName);
    expect(await (await USAAccountsPageElements.dateOfLastAccount).getText()).toEqual(`${moment().format('MM/DD/YYYY')}`);
    expect(await (await USAAccountsPageElements.accountTypeOfLastAccount).getText()).toEqual('Operating');
    expect(await(await USAAccountsPageElements.accountStatusOfLastAccount).getText()).toEqual('Active');
    expect(await (await USAAccountsPageElements.accountBalanceOfLastAccount).getText()).toEqual('0.00');

    await Actions.waitAndClick(await USAAccountsPageElements.lastAccount);
    await (await USAAccountsPageElements.accountDetails.accountStatus).waitForDisplayed();
    expect(await USAAccountsPageElements.accountDetails.corporateName.getText()).toContain(companyName);
    expect(await USAAccountsPageElements.accountDetails.accountName.getText()).toContain(accountName);
    expect(await USAAccountsPageElements.accountDetails.accountStatus.getText()).toEqual('Active');
    expect(await USAAccountsPageElements.accountDetails.dateCreation.getText()).toEqual(`${moment().format('MM/DD/YYYY')}`);
    expect(await USAAccountsPageElements.accountDetails.accountDescription.getText()).toEqual(accountName);
    expect(await USAAccountsPageElements.accountDetails.accountId.getText()).toContain('BA');
    expect(await USAAccountsPageElements.accountDetails.accountType.getText()).toEqual('Operating');
  });

  it('[C36577] Limits of new primary account in Accounts details @smoke', async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36577');
    await browser.url(URLs.USAPortalURL);
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdminAPI.Email, Credentials.CenttripAdminAPI.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Account List'));
    await (await USAMainPageElements.columnHeader('Account name')).waitForDisplayed();
    await (await USAAccountsPageElements.searchField).addValue(accountName);
    await browser.pause(500);
    await Actions.waitAndClick(await USAAccountsPageElements.lastAccount);
    await (await USAAccountsPageElements.accountDetails.limits.maxDailySpend).waitForDisplayed();
    expect(await USAAccountsPageElements.accountDetails.limits.maxDailySpend.getText()).toContain('150,000');
    expect(await USAAccountsPageElements.accountDetails.limits.maxMonthlySpend.getText()).toContain('750,000');
    expect(await USAAccountsPageElements.accountDetails.limits.maxSingleTransc.getText()).toContain('150,000');
    expect(await USAAccountsPageElements.accountDetails.limits.maxDailyAtmSpend.getText()).toContain('3,000');
    expect(await USAAccountsPageElements.accountDetails.limits.maxMonthlyAtmSpend.getText()).toContain('30,000');
  });

  it('[C36578] Default delivery address of new primary account in Accounts details @smoke', async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36578');
    await browser.url(URLs.USAPortalURL);
    await signInPage.signInAsRegisteredUserUSA(Credentials.CenttripAdminAPI.Email, Credentials.CenttripAdminAPI.Password);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Account List'));
    await (await USAMainPageElements.columnHeader('Account name')).waitForDisplayed();
    await (await USAAccountsPageElements.searchField).addValue(accountName);
    await browser.pause(500);
    await Actions.waitAndClick(await USAAccountsPageElements.lastAccount);
    await (await USAAccountsPageElements.accountDetails.deliveryAddress.contactName).waitForDisplayed();

    expect(await (await USAAccountsPageElements.accountDetails.deliveryAddress.contactName).getText()).toEqual('Portal User');
    expect(await (await USAAccountsPageElements.accountDetails.deliveryAddress.corporateName).getText()).toEqual(companyName);
    expect(await (await USAAccountsPageElements.accountDetails.deliveryAddress.country).getText()).toEqual('US');
    expect(await (await USAAccountsPageElements.accountDetails.deliveryAddress.state).getText()).toEqual('NY');
    expect(await (await USAAccountsPageElements.accountDetails.deliveryAddress.city).getText()).toEqual('Farmington');
    expect(await (await USAAccountsPageElements.accountDetails.deliveryAddress.street).getText()).toEqual('Clyde Dr');
    expect(await (await USAAccountsPageElements.accountDetails.deliveryAddress.houseNumber).getText()).toEqual('1190');
    expect(await (await USAAccountsPageElements.accountDetails.deliveryAddress.postalCode).getText()).toEqual('14425');
  });
});
