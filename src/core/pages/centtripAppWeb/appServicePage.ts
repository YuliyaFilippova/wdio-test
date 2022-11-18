import { applicationServiceMainPageElements, general } from '../../../core/pages/locators';
import {Actions} from '../../utils/actions';
import AllureReporter from '@wdio/allure-reporter';
import { connectionUSA } from '../../../wdio.conf';
import { DBQueries } from '../../../testData/DBQueries';
import { URLs } from '../../../urls';


export class AppServicePage {
  async checkEntitiesDetailsInDB(codeRefId: string): Promise<any> {
    const entetiesdetails = [];
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getEntityDetails(codeRefId), function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          Object.keys(rows).forEach(function (keyItem) {
            const row = rows[keyItem];
            const name = row.Name;
            const groupdId = row.CardGroupId;
            entetiesdetails.push(name, groupdId);
            resolve(entetiesdetails);
          });
        }
      });
    });
  };

  async signOut(): Promise<void> {
    AllureReporter.startStep('Sign Out from current account');
      await Actions.waitAndClick(await applicationServiceMainPageElements.general.signOutButton);
      await browser.url(URLs.baseUrl);
      AllureReporter.endStep();
  };

  async switchToTabAndSearch(tab: string, searchQuery: string): Promise<void> {
    AllureReporter.startStep(`Switch to ${tab} tab and search app which  contain ${searchQuery} query`);
      await Actions.waitAndClick(await general.linkByName(tab));
      await (await applicationServiceMainPageElements.other.searchInput).waitForDisplayed();
      await (await applicationServiceMainPageElements.other.searchInput).addValue(searchQuery);
      await Actions.waitAndClick(await applicationServiceMainPageElements.functionality.searchButton);
      AllureReporter.endStep();
  };

  checkCreatedParentEntity(name): Promise<any> {
    return new Promise((resolve, reject) => {
      connectionUSA.query(DBQueries.getParentEntityByName(name), function(err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          Object.keys(rows).forEach(function(keyItem) {
            const row = rows[keyItem];
            resolve(row);
          });
        }
      });
    });
  };
}
