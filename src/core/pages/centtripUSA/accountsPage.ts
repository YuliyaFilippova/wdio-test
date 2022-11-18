import { URLs } from '../../../urls';
import { HttpMethods } from '../../api/rest';
import { apiEndpoints } from '../../../testData/apiEndpoints';
import { requestHeadersAdyen } from '../../../testData/other';

export class AccountsPage {
  async getGroupLimits(amountFromDB: string, expectedAmmount: number): Promise<void> {
    const getTransactionRuleLimitFirstAcc = await HttpMethods.get(apiEndpoints.getTransactionRuleData(amountFromDB),
      requestHeadersAdyen, URLs.apiAdyenUrl);
    expect(getTransactionRuleLimitFirstAcc.status).toBe(200);
    expect(getTransactionRuleLimitFirstAcc.body.transactionRule.ruleRestrictions.totalAmount.value.value).toEqual(expectedAmmount);
  };
}
