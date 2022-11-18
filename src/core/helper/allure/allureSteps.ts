import * as _ from 'lodash';
import { config } from '../../../wdio.conf';
import {takeScreenShot} from './reporter';

declare let allure: any;

export async function allureStep(stepDefinition:string, method: any) {
  await allure.createStep(stepDefinition, async () => {
    try {
      await method();
      if (config.params.takeScreenShotFromEachAllureStep) {
        await takeScreenShot();
      }
    } catch (error) {
      await takeScreenShot();
      throw error;
    }
  })();
}