import allureReporter from '@wdio/allure-reporter';
import {addEpic} from '../../core/helper/allure/reporter';
import {Actions} from '../../core/utils/actions';
import {general, USAMainPageElements, USARolesPageElements} from '../../core/pages/locators';
import {Other} from '../../core/utils/other';
import {LoginAPICall} from '../../core/utils/loginAPICall';
import {CreateUserPage} from '../../core/pages/centtripUSA/createUser';
import {RandomGenerator} from '../../core/utils/randomGenerator';
import { URLs } from '../../urls';

const createUserPage = new CreateUserPage();

describe(`Role > Role details`, () => {
  beforeEach(async () => {
    addEpic('Roles');
    allureReporter.addFeature('Role details');
    await browser.url(URLs.USAPortalURL);
  });
  afterEach(async () => {
    await Other.deleteCacheCookiesUSA();
  });

  it(`[C9523] User details on Role details @smoke`, async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/9523');
    const token = await LoginAPICall.getToken();
    const randName = RandomGenerator.lowerCaseText(8);
    const randEmail = RandomGenerator.generateRandEmail('11auto@harakirimail.com');
    await createUserPage.createUserFullAPI(await randEmail, token, 'CorporateAdmin', randName, 'Autotest',
    '1994-04-08T13:07:03.00', 'male', '323232322', 'street1', '21001', 'city1', 'AF', null);
    await Actions.waitAndClick(await USAMainPageElements.navigationMenu('Roles'));
    await (await USAMainPageElements.columnHeader('Role Name')).waitForDisplayed();
    await Actions.waitAndClick(await USARolesPageElements.roleByName('Corporate Administrator'));

    await (await USARolesPageElements.roleDetails.searchInRoleDetails).waitForDisplayed();
    await (await USARolesPageElements.roleDetails.searchInRoleDetails).addValue(await randEmail);
    await (await general.divByName(await randEmail)).waitForDisplayed();
    await (await general.divByName(randName + '  Autotest')).waitForDisplayed();
  });
});
