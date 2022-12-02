import { RandomGenerator } from '../core/utils/randomGenerator';
import * as moment from 'moment';
const { v4: uuidv4 } = require('uuid');

export const other = {
  currentDate: moment.utc().format('DD MMM YYYY'),
  USAPortalDate: moment.utc().add(10, 'days').calendar() + ' ' + moment().format('LT'),
  mailDate: moment().format('MMM DD YYYY'),
  mailDate2: moment().format('MMM DD YYYY') + ' ' + moment().format().substring(11, 14),
  accountDateOfCreation: moment().format('L'),
  termsAndConFull: (moment.utc().format('llll').substring(0, 3)) + (moment.utc().format('llll').substring(4, 11)) + (moment.utc().format('ll').substring(7, 12)) + (' ') +
    (moment.utc().format().substring(11, 16)),
  termsAndConCuted: (moment.utc().format('llll').substring(0, 3)) + (moment.utc().format('llll').substring(4, 11)) + (moment.utc().format('ll').substring(7, 12)) + (' ') +
    (moment.utc().format().substring(11, 15)),
  creationDate: moment,
  USATransactionDate: moment().format('L') + ' ' + moment().format('hh:mm A'),
  exportCardTransactionsReportDate: moment.utc().format('M_D_YYYY hh_mm'),
  tradeDateDB: moment.utc().format('YYYY-M-D'),
  tradeDateMinutes: moment.utc().format('YYYY-M-D') + ' ' + moment().format('HH:mm:ss'),
  reconciliation: moment.utc().format('DD MMMM YYYY'),
  monthForIFChar: moment().format('MMM'),
  psfid: moment().valueOf() - 1655000000000,
  translogdatetime: moment().format("YYYYMMDDHHmmss"),
  translogdatetimeUK: moment().format("DD MM YYYY HH:mm:ss"),
  translogdatetimePFS: moment().format("DD MM YYYY HH:mm:ss"),
  postDate: moment().format("DDMMYY"),
  monthForIFNum: moment().format('MM')
};

export const Passfort = {
  passfortUILogin: 'o.palii@andersenlab.com+qa',
  passfortUIPassword: 'due-carried-outside-lake',
}

export function getUSATransactionDate() {
  const date = moment().format('L') + ' ' + moment().format('hh:mm A');
  return date;
}

export function getUSATransactionDetailsDate() {
  const date = moment().format('L') + ' • ' + moment().format('hh:mm A');
  return date;
}

export function getUSATransactionDashboardDate() {
  const date = moment().format('L') + ' ' + moment().format('HH:mm');
  return date;
}

export function getCardTransactionsReportDate() {
  const date = moment.utc().format('M_D_YYYY hh_mm');
  return date;
}

export function getIndexById(jsonData, id) {
  for (let i = 0; i < jsonData.value.length; i++) if (jsonData.value[i].codeRefId === id) return jsonData.value[i].stateRefId;
}

export function getCodeRefIdByType(jsonData, type: string) {
  for (let i = 0; i < jsonData.value.length; i++) if (jsonData.value[i].type === type) return jsonData.value[i].codeRefId;
}

export function getExternalIdByCode(rowsData, codeRefId: string) {
  for (let i = 0; i < rowsData.length; i++) if (rowsData[i].CodeRefId === codeRefId) return rowsData[i].ExternalId;
}

export function getBalanceAccountById(jsonData, id) {
  for (let i = 0; i < jsonData.balanceAccounts.length; i++) if (jsonData.balanceAccounts[i].reference === id) return jsonData.balanceAccounts[i].id;
}

export function getTransactionRulesAmountByDesc(jsonData, desc: string) {
  for (let i = 0; i < jsonData.transactionRules.length; i++) {
    if (jsonData.transactionRules[i].description === desc) return jsonData.transactionRules[i].ruleRestrictions.totalAmount.value.value;
  };
}

export async function checkAccountsInUserDetails(data: string[], type: string, name: string) {
  function checker(array: string[], key: string, key2: string) {
    for (let i = 0; i < array.length; i++) if (array[i].includes(key) && array[i].includes(key2)) return array[i];
  }
  const result = checker(data, type, name);
  expect(result).not.toBe(undefined);
}

export function getSMSFromMessage(message: string, cutValue: number) {
  const code = message.substring(cutValue, 100);
  return code;
}

export function requestHeadersToken(token: string): object {
  const headersToken = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  return headersToken;
};
export const elementArrays = {
  searchStatus: [
    'All statuses',
    'Awaiting Approval',
    'Denied',
    'Closed',
    'Ready for External KYC',
    'External KYC in progress',
    'External KYC denied',
    'External KYC pending',
    'External KYC approved'
  ],
  Genders: [
    'Male',
    'Female',
    'Unknown'
  ],
  manageCardFields:
    [
      'Select all',
      'Corporate name',
      'Operating Account',
      'Card name',
      'Cardholder Name',
      'Card Number',
      'Expiry date',
      'Shared Balance',
      'Balance',
      'Daily spend limit',
      'Remaining Spend Available',
      'Card status',
      'ATM Access',
      'Lock/Unlock'
    ],
  cardStatusOptions:
    [
      'Active', 'Inactive',
      'Locked', 'Closed',
      'Stolen', 'Lost',
      'Expired'
    ],
  batchCardErrors:
    [
      'CorporateName: The selected Corporate does not match with the Corporate from the file.',
      'EmbossName: EmbossName must be 26 characters or less',
      'EmbossName: Incorrect format: Only latin letters and numbers are allowed for Emboss name',
      'BirthDate: BirthDate is not in the correct format',
      'MobilePhoneNumber: MobilePhoneNumber is not in the correct format',
      'MobilePhoneCode: MobilePhoneCode doesn',
      'SharedBalance: Shared balance is not in the correct format. Enter Yes or No.'
    ]
};

export const invalidData = {
  description301symbols: `301characters301characters301characters301characters301characters301characters301characters301characters301characters301characters301characters30` +
    `1characters301characters301characters301characters301characters301characters301characters301characters301characters301characters301characters301characters30`,
  description300symbols: `301characters301characters301characters301characters301characters301characters301characters301characters301characters301characters301characters30
  1characters301characters301characters301characters301characters301characters301characters301characters301characters301characters301characters301characters3`
};

export const roles = {
  centtripAdmin: 'Centtrip Administrator',
  corpAdmin: 'Corporate Administrator',
  cardholder: 'Cardholder'
};

//QA
let rolesId = {
  centtripAdmin: '6118f60d-b3f0-49f5-9a09-242a6a5e73b3', // Roles.value.code endpoint
  corpAdmin: '423381ba-16a4-403b-b60f-9696bb0a6f47',
  cardholder: '26cad50d-370b-4d15-9afa-b43809870a5e',
  superAdmin: 'b4e306fd-713f-4e2b-b0db-e6c919047736'
};

let resourcesId = {
  corpAdmin: '50c82db2-7818-418a-8574-cac20cac9345', // Ander Corporate - corporateEntityCodeRefId
  //aiken: 'dd16eb6a-49ac-492d-a099-745b091eaa91' // Aiken
};
//DEV
if (process.env.ENV === 'dev') {
  rolesId = {
    centtripAdmin: '6e519dc3-8a6e-42b1-a159-01eacc52c290',
    corpAdmin: '6e519dc3-8a6e-42b1-a159-01eacc52c290',
    cardholder: '9ed5ba40-e50c-4aa5-8f51-59baad8d8426',
    superAdmin: ''
  };
  resourcesId = {
    corpAdmin: '1557528e-41ae-447a-93a4-649f4363afe6'
  };
};

export const testUsers = {
  removeRoleCenttripAdmin: 'removeusertest22092@harakirimail.com',
  removeRoleCorpAdminCorpAccess: 'removeusertest22093@harakirimail.com',
  removeRoleCorpAdminOperAccess: 'removeusertest22094@harakirimail.com',
  removeRoleCardholder: 'removeusertest22095@harakirimail.com',
  userWithoutRoles: 'userwithoutroles22179@harakirimail.com',
  removeRoleMixOne: 'removeusertest22301@harakirimail.com',
  removeRoleMixSecond: 'removeusertest22302@harakirimail.com',
  removeRoleTwoCorpAdminAccess: 'removeusertest22183@harakirimail.com',
  removeRoleTwoCardAccess: 'removeusertest22310@harakirimail.com',
  removeRoleMixEdit: 'removeusertest23038@harakirimail.com',
  clutterCSA: 'csa_clutter_qa@harakirimail.com'
};

export const groupLimitsAccounts = {
  alwaysIncreasedAccount: 'C19739_constant_increased',
  alwaysStandardAccount: 'constant_standard_limits'
};

export const salesforceData = {
  standardRecordTypeId: '012g000000074qIAAQ',
  personalRecordTypeId: '012b0000000YlxKAAS'
};

export const colors = {
  gold: 'rgba(195, 167, 98, 1)',
  red: 'rgba(239, 72, 72, 1)',
  black: 'rgba(65, 70, 72, 1)',
  green: 'rgba(29, 203, 14, 1)',
  borderGold: 'rgb(219, 191, 121)',
  borderGray: 'rgb(233, 236, 237)',
  cardManage: {
    green: 'rgba(37, 199, 23, 1)',
    red: 'rgba(236, 70, 70, 1)',
    black: 'rgba(65, 70, 72, 1)'
  }

};
export const copyrights = {
  appGlobal: `Centtrip Limited is an Electronic Money Institution authorised and regulated by the Financial Conduct Authority (FCA; FRN 900717).` +
    ` Registered in England. Registered No. 08651138. Registered Office: 1 Mark Square, London, England, EC2A 4EG.` +
    ` In Europe, The Centtrip Prepaid Mastercard is issued by PFS Card Services (Ireland) Limited pursuant to a license from Mastercard International Incorporated.` +
    ` PFS Card Services (Ireland) Limited, trading as PCSIL, is authorised and regulated as an issuer of electronic money by the Central Bank of Ireland under registration number` +
    ` C175999. Registered office: Front Office, Scurlockstown Business Park, Trim, Co. Meath, C15 K2R9. Company Registration Number: 590062.` +
    ` In USA, Centtrip is trading as Centtrip, Inc under registration number 3590437. The Centtrip Corporate card is issued by Sutton Bank, Member FDIC,` +
    ` pursuant to a license from Mastercard International, Inc. Funds are FDIC insured up to $250,000.`,
  appUK: `Centtrip Limited is an Electronic Money Institution authorised and regulated by the Financial Conduct Authority (FCA; FRN 900717). Registered in England. Registered No. 08651138. Registered Office: 1 Mark Square, London, England, EC2A 4EG. The Centtrip Prepaid Mastercard is issued by PFS Card Services (Ireland) Limited pursuant to a license from Mastercard International Incorporated. PFS Card Services (Ireland) Limited, trading as PCSIL, is authorised and regulated as an issuer of electronic money by the Central Bank of Ireland under registration number C175999. Registered office: Front Office, Scurlockstown Business Park, Trim, Co. Meath, C15 K2R9. Company Registration Number: 590062.`,
  appUSA: `Centtrip is trading as Centtrip, Inc under registration number 3590437. The Centtrip Corporate card is issued by Sutton Bank, Member FDIC, pursuant to a license from Mastercard International, Inc. Funds are FDIC insured up to $250,000.`
};

export const idDataManageLimits = {
  cardGroupCodeRefId: '07520dfe-a07d-4ac9-beed-f2bbc0a7061e',
  accountCodeRefId: '00290ae3-ba95-4c0b-b12b-d9f42a41c450',
  cardGroupCodeRefIdCorp: '97ff87e2-badb-4ee2-ba04-4d40139d6aac',
  accountCodeRefIdCorp: '71f44609-376a-f7ec-a0f7-d25239f37500'
};

// Passfort DEV
// export const requestHeaders = {
//   apikey: '247969c0aecdb6902fd9c965cfc2cdf0818c4d34e539c1af',
//   'Content-Type': 'application/json'
// };

// Passfort QA
export const requestHeaders = {
  apikey: '1bcb8669ecec58ab972ae319ad0f80b8698eddca43dfca07',
  'Content-Type': 'application/json'
};

export const requestHeadersLocalAdyen = {
  'Content-Type': 'application/json'
};

export const requestHeaders2 = {
  Authorization: 'Basic QWR5ZW5Ob3RpZmljYXRpb25zOnhLN2RxVG1lY1l6QjZidHNxN3BS',
  'Content-Type': 'application/json',
  'X-PROCESSING-MODE': 'sync'
};

export const requestHeadersForDemo = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

export const requestHeadersUSAEntities = {
  Authorization: 'Centtrip 64ca20d1-626a-49eb-b6dd-11f39702fa94:Swagger',
  'Content-Type': 'application/json'
};

export const requestHeadersUSATransactions = {
  Authorization: 'Centtrip e25ab78e-061f-48bd-a9cc-2f958291376d:Postman',
  'Content-Type': 'application/json'
};

export const requestHeadersAdyen = {
  Authorization: 'Basic d3NfMzg3OTE5QEJhbGFuY2VQbGF0Zm9ybS5DZW50dHJpcDp6U3t+ZzMzIzdXW11UXm4kaDlZLSZibmRu',
  'Content-Type': 'application/json'
};

export const requestHeadersSalesforce = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Cookie: 'CookieConsentPolicy=0:0; BrowserId=VQb-xP5cEeu63r_jm6pcwQ'
};

export abstract class requestBody {
  public static updateEntity(): string {
    return JSON.stringify({
      codeRefId: 'f36e135a-8d20-475e-acfc-fae7c128b726',
      eTag: uuidv4(),
      operation: {
        flow: 'flow{{random}}',
        task: 'task{{random}}'
      },
      organisationDetails: {
        corporateType: 'listedPublicCompany',
        legalName: 'Centtrip, Inc',
        tradingName: 'TradingUSA',
        taxId: '321456987',
        taxIdAbsenceReason: 'belowTaxThreshold',
        description: null,
        website: null,
        appAddress: null,
        companyRegistration: null,
        email: 'mcvsmvcc@harakirimail.com',
        phone: {
          phoneNumber: '123456789',
          phoneType: 'mobile',
          countryCode: 'US'
        },
        stockData: {
          marketIdentifier: '242343243244332',
          tickerSymbol: 'tsymbol',
          stockNumber: null
        }
      },
      tradingAddress: {
        postalCodeZipCode: '11111',
        country: 'US',
        state: 'NY',
        county: 'JJ',
        town: 'town{{random}}',
        city: 'city1',
        street: 'street1',
        buildingNumber: '12',
        buildingName: 'dfdfdf',
        flatNumber: '233'
      },
      registeredAddress: {
        postalCodeZipCode: '11111',
        country: 'US',
        state: 'NY',
        county: 'JJ',
        town: 'town{{random}}',
        city: 'city1',
        street: 'street1',
        buildingNumber: '12',
        buildingName: 'dfdfdf',
        flatNumber: '233'
      }
    });
  };

  public static requestBodyC11473(taskID: string): string {
    return JSON.stringify({
      forms: [
        {
          task_instance_id: taskID,
          template: { id: '54eebb27-cb36-46dd-98d2-62a32b77533b' },
          task_variant_id: 'b6ea218e-7db6-4ecc-b647-a07d706a5a56'
        }
      ],
      theme: 'cb3ec8e7-991e-4bad-adc1-5e7d8f1c7ca8'
    });
  };

  public static demoCardTransactionUk(aproveCode: string, transDesc: string, termOwner: string, mcc: string,
    termCity: string, termCountry: string, termNameLoc: string, termCurrency: string, traNamt: string,
    begLedGerbal: string, ledGerbal: string, seqNum: string): object {
    return {
      username: 'hVGdig7467VRXOokjokfu39567vg3df56D',
      password: 'hjgvuy787BKHKgkgh7bvgu7e3guyvyu92',
      data: JSON.stringify({
        PFSID: `${moment().valueOf() - 1655000000000}`,
        APPROVALCODE: aproveCode,
        CARDHOLDERID: "400000977557",
        TRANSLOGDATETIME: moment().format("YYYYMMDDHHmmss"),
        TRANSLOGDATETIMEUK: moment().format("DD MM YYYY HH:mm:ss"),
        TRANSLOGDATETIMEPFS: moment().format("DD MM YYYY HH:mm:ss"),
        POSTDATE: moment().format("DDMMYY"),
        TRANSTYPE: "Clear",
        MESSAGETYPE: "0230",
        TRANSDESC: transDesc,
        TERMOWNER: termOwner,
        MCC: mcc,
        TERMCITY: termCity,
        TERMSTATE: "",
        TERMCOUNTRY: termCountry,
        TERMNAMELOC: termNameLoc,
        TERMCURRENCY: termCurrency,
        TRANAMT: traNamt,
        BIN: "53026900",
        BEG_LEDGERBAL: begLedGerbal,
        LEDGERBAL: ledGerbal,
        AMOUNT1: "0000000000.00",
        RESPONDER: "3",
        RESPONSECODE: "000",
        SEQUENCENUM: seqNum
      })
    };
  };

  public static centtripInternalTransferBody(fromAccountId: string, toAccountId: any, toPayeeId: any, amount: number, id: string): string {
    return JSON.stringify({
      fromAccountCodeRefId: fromAccountId,
      toAccountCodeRefId: toAccountId,
      toPayeeCodeRefId: toPayeeId,
      amount: amount,
      currencyCode: 'USD',
      eTag: id
    });
  };

  public static requestBodyRejected(): string {
    return JSON.stringify({
      status: 'REJECTED',
      override_auto_reject: true
    });
  };

  public static requestBodyReverted(): string {
    return JSON.stringify({
      override_auto_reject: true
    });
  };

  public static requestBodyApproved(): string {
    return JSON.stringify({
      status: 'APPROVED',
      override_auto_reject: true
    });
  };

  public static requestBodyCancelled(): string {
    return JSON.stringify({
      status: 'CANCELLED',
      override_auto_reject: true
    });
  };

  public static requestBodyReview(): string {
    return JSON.stringify({
      status: 'IN_REVIEW',
      override_auto_reject: true
    });
  };

  public static requestBodyC11613(accountHolderId: string, entityId: string, status: string): string {
    return JSON.stringify({
      environment: 'test',
      type: 'balancePlatform.accountHolder.updated',
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM',
        date: '2021-01-02T00:00:00+01:00',
        accountHolder: {
          balancePlatform: 'YOUR_BALANCE_PLATFORM',
          description: 'Test Account holder',
          id: accountHolderId,
          legalEntityId: entityId,
          capabilities: {
            atmWithdrawal: {
              requested: true,
              requestedLevel: 'medium',
              requestedSettings: {},
              allowed: true,
              allowedLevel: '',
              allowedSettings: {},
              enabled: false,
              verificationStatus: status,
              errors: [
                {
                  entities: [
                    {
                      type: 'LegalEntity',
                      id: entityId
                    }
                  ],
                  errorCode: '2222',
                  message: 'The Tax ID is not found in public records',
                  subErrors: [],
                  remediatingActions: [
                    {
                      code: '12',
                      message: 'Upload an image which follows the requirements'
                    },
                    {
                      code: '23',
                      message: 'Correct the input data'
                    }
                  ]
                }
              ]
            }
          }
        }
      }
    });
  };

  public static createEntity(randEntity: any, emailAuthorized: string, phoneAuthorized: string, cityCorp: string,
    streetCorp: string, buildNumberCorp: string, corporateId: any, companyName: string): string {
    return JSON.stringify({
      codeRefId: randEntity,
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      contactDetails: {
        email: emailAuthorized,
        phone: {
          phoneNumber: phoneAuthorized,
          phoneType: 'mobile',
          countryCode: 'US'
        },
        address: {
          postalCodeZipCode: '94110',
          country: 'US',
          state: 'NY',
          county: 'RR',
          town: 'Test Town',
          city: cityCorp,
          street: streetCorp,
          buildingNumber: buildNumberCorp,
          buildingName: 'Test Building Name',
          flatNumber: '56'
        }
      },
      description: null,
      corporateLegalEntityCodeRefId: corporateId,
      entityName: `Legal Test| ${companyName}`
    });
  };

  public static createChildEntity(randEntity: any, emailAuthorized: string, phoneAuthorized: string, cityCorp: string,
    streetCorp: string, buildNumberCorp: string, parentId: any, companyName: string): string {
    return JSON.stringify({
      codeRefId: randEntity,
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      contactDetails: {
        email: emailAuthorized,
        phone: {
          phoneNumber: phoneAuthorized,
          phoneType: 'mobile',
          countryCode: 'US'
        },
        address: {
          postalCodeZipCode: '94110',
          country: 'US',
          state: 'NY',
          county: 'RR',
          town: 'Test Town',
          city: cityCorp,
          street: streetCorp,
          buildingNumber: buildNumberCorp,
          buildingName: 'Test Building Name',
          flatNumber: '56'
        }
      },
      description: null,
      parentEntityCodeRefId: parentId,
      entityName: `Department| ${companyName}`
    });
  };

  public static createOperatingAccount(operatingAccountId: any, entityDepartmentId: any, companyName: string): string {
    return JSON.stringify({
      codeRefId: operatingAccountId,
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      accountName: `Account|${companyName}`,
      accountType: 'Operating',
      entityCodeRefId: entityDepartmentId,
      currencies: null,
      description: `description ${RandomGenerator.lowerCaseText(30)}`
    });
  };

  public static maxSingleTransaction(randId: any, cardGroupId: any): string {
    return JSON.stringify({
      codeRefId: randId,
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      cardGroupCodeRefId: cardGroupId,
      type: 'MaximumSingleTransactionAmount',
      amountValue: 75000
    });
  };

  public static maxDailySpend(randId: any, cardGroupId: any): string {
    return JSON.stringify({
      codeRefId: randId,
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      cardGroupCodeRefId: cardGroupId,
      type: 'MaximumDailySpendAmount',
      amountValue: 75000
    });
  };

  public static maxMonthlySpend(randId: any, cardGroupId: any): string {
    return JSON.stringify({
      codeRefId: randId,
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      cardGroupCodeRefId: cardGroupId,
      type: 'MaximumMonthlySpendAmount',
      amountValue: 350000
    });
  };

  public static maxDailySpendAtm(randId: any, cardGroupId: any): string {
    return JSON.stringify({
      codeRefId: randId,
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      cardGroupCodeRefId: cardGroupId,
      type: 'MaximumDailyAtmWithdrawalAmount',
      amountValue: 750
    });
  };

  public static maxMonthlySpendAtm(randId: any, cardGroupId: any): string {
    return JSON.stringify({
      codeRefId: randId,
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      cardGroupCodeRefId: cardGroupId,
      type: 'MaximumMonthlyAtmWithdrawalAmount',
      amountValue: 10000
    });
  };

  public static maxSingleTransactionUpd(randId: any): string {
    return JSON.stringify({
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      stateRefId: randId,
      amountValue: 150000
    });
  };

  public static maxDailySpendUpd(randId: any): string {
    return JSON.stringify({
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      stateRefId: randId,
      amountValue: 150000,
      enabledValue: true
    });
  };

  public static maxMonthlySpendUpd(randId: any): string {
    return JSON.stringify({
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      stateRefId: randId,
      amountValue: 750000,
      enabledValue: true
    });
  };

  public static maxDailySpendAtmUpd(randId: any): string {
    return JSON.stringify({
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      stateRefId: randId,
      amountValue: 3000,
      enabledValue: true
    });
  };

  public static maxMonthlySpendAtmUpd(randId: any): string {
    return JSON.stringify({
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      stateRefId: randId,
      amountValue: 30000,
      enabledValue: true
    });
  };

  public static createCardForOperatingAccount(randId: any, cardGroupCodeId: any, operatingAccountId: any): string {
    return JSON.stringify({
      codeRefId: randId,
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      cardGroupCodeRefId: cardGroupCodeId,
      accountCodeRefId: operatingAccountId,
      description: 'Description',
      status: 'Inactive',
      issuingCountryCode: 'US',
      cardHolderName: `TestEd ${RandomGenerator.lowerCaseText(8)}`,
      authenticationPhoneNumber: null,
      authenticationPhoneType: null,
      name: {
        firstName: `CfirstName${RandomGenerator.lowerCaseText(8)}`,
        lastName: `ClastName${RandomGenerator.lowerCaseText(8)}`
      },
      dateOfBirth: '2001-05-25T00:00:00.000Z',
      personalNumber: null,
      nationalityCountryCode: null,
      phone: {
        phoneNumber: `${RandomGenerator.numbers(8)}9`,
        phoneType: 'Mobile',
        countryCode: 'US'
      },
      configurationProfileId: 'CP3227B2233D995CFB4QS4H56',
      website: null
    });
  };

  public static createCardForOperatingAccountFull(randId: any, cardGroupCodeId: any, operatingAccountId: any,
    cardHolderName: string, firstName: string, lastName: string): string {
    return JSON.stringify({
      codeRefId: randId,
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      cardGroupCodeRefId: cardGroupCodeId,
      accountCodeRefId: operatingAccountId,
      description: 'Description',
      status: 'Inactive',
      issuingCountryCode: 'US',
      cardHolderName: cardHolderName,
      authenticationPhoneNumber: null,
      authenticationPhoneType: null,
      name: {
        firstName: firstName,
        lastName: lastName
      },
      dateOfBirth: '2001-05-25T00:00:00.000Z',
      personalNumber: null,
      nationalityCountryCode: null,
      phone: {
        phoneNumber: `${RandomGenerator.numbers(8)}9`,
        phoneType: 'Mobile',
        countryCode: 'US'
      },
      configurationProfileId: 'CP3227B2233D995CFB4QS4H56',
      website: null
    });
  };

  public static maxSingleTransactionCard(randId: any, operatingCardId: any): string {
    return JSON.stringify({
      codeRefId: randId,
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      cardCodeRefId: operatingCardId,
      type: 'MaximumSingleTransactionAmount',
      amountValue: 75000,
      enabledValue: null
    });
  };

  public static maxDailySpendCard(randId: any, operatingCardId: any): string {
    return JSON.stringify({
      codeRefId: randId,
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      cardCodeRefId: operatingCardId,
      type: 'MaximumDailySpendAmount',
      amountValue: 75000,
      enabledValue: null
    });
  };

  public static maxMonthlySpendCard(randId: any, operatingCardId: any): string {
    return JSON.stringify({
      codeRefId: randId,
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      cardCodeRefId: operatingCardId,
      type: 'MaximumMonthlySpendAmount',
      amountValue: 350000,
      enabledValue: null
    });
  };

  public static maxDailySpendAtmCard(randId: any, operatingCardId: any): string {
    return JSON.stringify({
      codeRefId: randId,
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      cardCodeRefId: operatingCardId,
      type: 'MaximumDailyAtmWithdrawalAmount',
      amountValue: 7500,
      enabledValue: null
    });
  };

  public static maxMonthlySpendAtmCard(randId: any, operatingCardId: any): string {
    return JSON.stringify({
      codeRefId: randId,
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      cardCodeRefId: operatingCardId,
      type: 'MaximumMonthlyAtmWithdrawalAmount',
      amountValue: 10000,
      enabledValue: null
    });
  };

  public static maxSingleTransactionCardUpd(stateRefId: string, codeRefId: string, cardCodeRefId: string): string {
    return JSON.stringify(
      [
        {
          type: 'MaximumSingleTransactionAmount',
          codeRefId: codeRefId,
          stateRefId: stateRefId,
          cardCodeRefId: cardCodeRefId,
          amountValue: 150000,
          eTag: uuidv4(),
          operation: { flow: 'flow', task: 'task' }
        }]
    );
  };

  public static maxDailySpendCardUpd(stateRefId: string, codeRefId: string, cardCodeRefId: string, value: number): string {
    return JSON.stringify(
      [
        {
          type: 'MaximumDailySpendAmount',
          codeRefId: codeRefId,
          stateRefId: stateRefId,
          cardCodeRefId: cardCodeRefId,
          amountValue: value,
          eTag: uuidv4(),
          operation: { flow: 'flow', task: 'task' }
        }]
    );
  };

  public static maxMonthlySpendCardUpd(stateRefId: string, codeRefId: string, cardCodeRefId: string): string {
    return JSON.stringify(
      [
        {
          type: 'MaximumMonthlySpendAmount',
          codeRefId: codeRefId,
          stateRefId: stateRefId,
          cardCodeRefId: cardCodeRefId,
          amountValue: 750000,
          eTag: uuidv4(),
          operation: { flow: 'flow', task: 'task' }
        }]
    );
  };

  public static maxDailySpendAtmCardUpd(stateRefId: string, codeRefId: string, cardCodeRefId: string, value: number): string {
    return JSON.stringify(
      [
        {
          type: 'MaximumDailyAtmWithdrawalAmount',
          codeRefId: codeRefId,
          stateRefId: stateRefId,
          cardCodeRefId: cardCodeRefId,
          amountValue: value,
          eTag: uuidv4(),
          operation: { flow: 'flow', task: 'task' }
        }]
    );
  };

  public static maxMonthlySpendAtmCardUpd(stateRefId: string, codeRefId: string, cardCodeRefId: string): string {
    return JSON.stringify(
      [
        {
          type: 'MaximumMonthlyAtmWithdrawalAmount',
          codeRefId: codeRefId,
          stateRefId: stateRefId,
          cardCodeRefId: cardCodeRefId,
          amountValue: 30000,
          eTag: uuidv4(),
          operation: { flow: 'flow', task: 'task' }
        }]
    );
  };

  public static createCardAccount(cardAccountId: any, entityDepartmentId: any): string {
    return JSON.stringify({
      codeRefId: cardAccountId,
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      accountName: `CardAccount|${RandomGenerator.lowerCaseText(8)}`,
      accountType: 'Card',
      entityCodeRefId: entityDepartmentId,
      currencies: null,
      description: `description ${RandomGenerator.lowerCaseText(30)}`
    });
  };

  public static createExtraAccount(codeRefId: string, entityDepartmentId: string, name: string, type: string, limit: string): string {
    return JSON.stringify({
      accountCodeRefId: codeRefId,
      accountName: name,
      accountType: type,
      cardGroupLimit: limit,
      corporateEntityCodeRefId: entityDepartmentId
    });
  };

  public static createCardForCardAccount(randId: any, cardGroupCodeId: any, cardAccountId: any, cardHolderName: string): string {
    return JSON.stringify({
      codeRefId: randId,
      operation: {
        flow: 'flow flow',
        task: 'task task'
      },
      eTag: uuidv4(),
      cardGroupCodeRefId: cardGroupCodeId,
      accountCodeRefId: cardAccountId,
      description: 'Description',
      status: 'Inactive',
      issuingCountryCode: 'US',
      cardHolderName: cardHolderName,
      authenticationPhoneNumber: null,
      authenticationPhoneType: null,
      address: null,
      name: {
        firstName: `CfirstName${RandomGenerator.lowerCaseText(8)}`,
        lastName: `ClastName${RandomGenerator.lowerCaseText(8)}`
      },
      dateOfBirth: '2000-05-25T00:00:00.000Z',
      personalNumber: null,
      nationalityCountryCode: null,
      phone: {
        phoneNumber: `${RandomGenerator.numbers(8)}9`,
        phoneType: 'Mobile',
        countryCode: 'US'
      },
      configurationProfileId: 'CP3227B2233D995CFB4QS4H56',
      website: null
    });
  };

  public static createPayment(): string {
    return JSON.stringify({
      strict: true,
      validationOnly: false,
      operations: [
        {
          insert: {
            sourceAccountCodeRefId: 'b186682f-8cbb-4adf-b546-db0816096360',
            targetAccountCodeRefId: '3b2b3063-548b-4ebb-9ece-43a31a217c8f',
            targetAccountName: 'To Account',
            targetType: 'Account',
            currencyCode: 'USD',
            tradeDate: moment().format('YYYY-MM-DD'),
            settleDate: moment().format('YYYY-MM-DD'),
            amount: 123.00,
            type: 'FromAccountToAccount',
            eTag: uuidv4(),
            reference: 'Pay salary',
            operation: {
              flow: 'FromAccountToAccount',
              task: 'PaymentTransaction.Create'
            }
          }
        }
      ]
    });
  };

  public static addTagToPayment(paymentTransactionTag: any): string {
    return JSON.stringify({
      strict: true,
      validationOnly: false,
      operations: [
        {
          insert: {
            eTag: uuidv4(),
            action: 'Insert',
            type: 'ProviderId',
            value: paymentTransactionTag,
            text: null,
            message: null,
            operation: {
              flow: 'FromAccountToAccount',
              task: 'PaymentTransactionTag.Create'
            }
          }
        }
      ]
    });
  };

  public static addPaymentToGroup(paymentTransactionId: any): string {
    return JSON.stringify({
      groupRequestType: 'Payment',
      groupId: paymentTransactionId,
      requestType: 'Payment',
      id: paymentTransactionId
    });
  };

  public static createDeposit(): string {
    return JSON.stringify({
      strict: true,
      validationOnly: false,
      operations: [
        {
          insert: {
            sourceAccountCodeRefId: 'b186682f-8cbb-4adf-b546-db0816096360',
            targetAccountCodeRefId: '3b2b3063-548b-4ebb-9ece-43a31a217c8f',
            sourceAccountName: 'From Account',
            currencyCode: 'USD',
            tradeDate: moment().format('YYYY-MM-DD'),
            settleDate: moment().format('YYYY-MM-DD'),
            amount: 123.00,
            type: 'FromAccountToAccount',
            eTag: uuidv4(),
            reference: 'Pay salary',
            sourceType: 'Account',
            operation: {
              flow: 'FromAccountToAccount',
              task: 'DepositTransaction.Create'
            }
          }
        }
      ]
    });
  };

  public static addTagToDeposit(depositTransactionTag: any): string {
    return JSON.stringify({
      strict: true,
      validationOnly: false,
      operations: [
        {
          insert: {
            eTag: uuidv4(),
            action: 'Insert',
            type: 'ProviderId',
            value: depositTransactionTag,
            text: null,
            message: null,
            operation: {
              flow: 'FromAccountToAccount',
              task: 'DepositTransactionTag.Create'
            }
          }
        }
      ]
    });
  };

  public static addDepositToGroup(paymentTransactionId: any, depositTransactionId: any): string {
    return JSON.stringify({
      groupRequestType: 'Payment',
      groupId: paymentTransactionId,
      requestType: 'Deposit',
      id: depositTransactionId
    });
  };

  public static addActionToGroup(paymentTransactionId: any): string {
    return JSON.stringify({
      groupRequestType: 'Payment',
      groupId: paymentTransactionId,
      action: 'Execute',
      eTag: uuidv4()
    });
  };

  public static transferSettledNotification(randomPayment: any, transactionTag: string, fromAccountHolderName: string, fromAccountHolderId: string,
    fromAccountName: string, amount: number, fromAccountAdyenId: string, fromAccountRefId: string, toAccountAdyenId: string): string {
    return JSON.stringify({
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM',
        creationDate: moment(),
        valueDate: moment(),
        id: randomPayment,
        paymentId: transactionTag,
        reference: 'Adjustment',
        amount: {
          currency: 'USD',
          value: amount
        },
        modification: {
          amount: {
            currency: 'USD',
            value: amount
          },
          type: 'OutgoingTransfer'
        },
        originalAmount: {
          currency: 'USD',
          value: amount
        },
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: fromAccountName, //'CENTTRIP INTERNAL'
          id: fromAccountAdyenId,
          reference: fromAccountRefId
        },
        counterparty: {
          balanceAccountId: toAccountAdyenId
        },
        status: 'OutgoingTransfer'
      },
      environment: 'test',
      type: 'balancePlatform.outgoingTransfer.created'
    });
  };

  public static paymentSettledNotification(randomPayment: any, transactionTag: string, fromAccountHolderName: string, fromAccountHolderId: string,
    amount: number, fromAccountName: string, fromAccountAdyenId: string, toAccountAdyenId: string): string {
    return JSON.stringify({
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM',
        creationDate: moment(),
        valueDate: moment(),
        id: randomPayment,
        paymentId: transactionTag,
        status: 'TransferSentOut',
        amount: {
          currency: 'USD',
          value: amount
        },
        originalAmount: {
          currency: 'USD',
          value: amount
        },
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId,
        },
        counterparty: {
          balanceAccountId: toAccountAdyenId
        },
      },
      environment: 'test',
      type: 'balancePlatform.outgoingTransfer.updated'
    });
  };

  public static transferBody(transactionTag: string, fromAccountHolderName: string, fromAccountHolderId: string,
    amount: number, fromAccountName: string, fromAccountAdyenId: string, transferStatus: string): string {
    return JSON.stringify({
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM',
        creationDate: moment(),
        id: transactionTag,
        paymentId: transactionTag,
        amount: {
          currency: 'USD',
          value: amount
        },
        originalAmount: {
          currency: 'USD',
          value: amount
        },
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId,
        },
        status: transferStatus
      },
      environment: 'test',
      type: 'balancePlatform.outgoingTransfer.updated'
    });
  };

  public static incomingTransferBody(depositRandomId: string, depositRandomPaymentId: string, fromAccountHolderName: string,
    fromAccountHolderId: string, amount: number, toAccountName: string, toAccountAdyenId: string, transferStatus: string): string {
    return JSON.stringify({
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM',
        status: 'IncomingTransfer',
        creationDate: moment(),
        id: depositRandomId,
        paymentId: depositRandomPaymentId,
        amount: {
          currency: 'USD',
          value: amount
        },
        originalAmount: {
          currency: 'USD',
          value: amount
        },
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: toAccountName,
          id: toAccountAdyenId,
        },
        counterparty: {
          bankAccount: {
            ownerName: {
              fullName: 'James Potter'
            },
            accountNumber: '100444666'
          }
        },
        referenceForBeneficiary: 'Adjustment'
      },
      environment: 'test',
      type: 'balancePlatform.incomingTransfer.updated'
    });
  };

  public static depositSettledNotificationAdyen(randomDepositTransactionId: string, randomTransactionId: string, randomPaymentTransactionId: string,
    accountHolder: string, accountHolderId: string, amount: number, toAccountName: string, toAccountAdyenId: string, toAccountRefId: string): string {
    return JSON.stringify({
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM',
        creationDate: moment(),
        valueDate: moment(),
        id: randomDepositTransactionId,
        paymentId: randomTransactionId,
        reference: randomPaymentTransactionId,
        accountHolder: {
          description: accountHolder,
          id: accountHolderId
        },
        amount: {
          currency: 'USD',
          value: amount
        },
        modification: {
          amount: {
            currency: 'USD',
            value: amount
          },
          originalAmount: {
            currency: 'USD',
            value: amount
          },
          type: 'IncomingTransfer'
        },
        originalAmount: {
          currency: 'USD',
          value: amount
        },
        balanceAccount: {
          description: toAccountName,
          id: toAccountAdyenId,
          reference: toAccountRefId
        },
        status: 'IncomingTransfer'
      },
      environment: 'test',
      type: 'balancePlatform.incomingTransfer.updated'
    });
  };

  public static removeUserRole(roleId: string, userId: string): string {
    return JSON.stringify(
      {
        policyCode: roleId,
        principal: userId
      }
    );
  };

  public static createUserOnlyRequiredFields(email: string, firstNm: string, lastNm: string, dob: string, phoneNumber: string): string {
    return JSON.stringify(
      [{
        email: email,
        firstName: firstNm,
        lastName: lastNm,
        dateOfBirth: dob,
        gender: null,
        phoneNumber: phoneNumber,
        address: { street: null, postalCodeZipCode: null, city: null, country: null, state: null }
      }]
    );
  };

  public static createUserWithPhoneNumber(email: string, phoneNumber: string): string {
    return JSON.stringify(
      [{
        email: email,
        firstName: RandomGenerator.lowerCaseText(5) + 'Test',
        lastName: RandomGenerator.lowerCaseText(5) + 'User',
        dateOfBirth: '1994-04-08T13:07:03.421Z',
        gender: 'male',
        phoneNumber: phoneNumber,
        address: { street: 'tee', postalCodeZipCode: '10001', city: 'NY', country: 'US', state: 'Alabama' }
      }]
    );
  };

  public static createUserWithCustomName(email: string, firstNm: string, lastNm: string): string {
    return JSON.stringify(
      [{
        email: email,
        firstName: firstNm,
        lastName: lastNm,
        dateOfBirth: '1994-04-08T13:07:03.421Z',
        gender: null,
        phoneNumber: '18482729487',
        address: { street: 'tee', postalCodeZipCode: '10001', city: 'NY', country: 'AF', state: null }
      }]
    );
  };

  public static createUserFull(email: string, firstNm: string, lastNm: string, gender: string, phoneNumber: string, street: string,
    postalCode: string, city: string, country: string, state: any): string {
    return JSON.stringify(
      [{
        email: email,
        firstName: firstNm,
        lastName: lastNm,
        dateOfBirth: '1994-04-08T13:07:03.00',
        gender: gender,
        phoneNumber: phoneNumber,
        address: { street: street, postalCodeZipCode: postalCode, city: city, country: country, state: state }
      }]
    );
  };

  public static createUserIF(email: string, firstNm: string, lastNm: string, dob: string, gender: string, phoneNumber: string, street: string,
    postalCode: string, city: string, country: string, state: any): string {
    return JSON.stringify(
      [{
        email: email,
        firstName: firstNm,
        lastName: lastNm,
        dateOfBirth: dob,
        gender: gender,
        phoneNumber: phoneNumber,
        identityAddressCodeRefId: null,
        identityCodeRefId: '',
        address: { street: street, postalCodeZipCode: postalCode, city: city, country: country, state: state }
      }]
    );
  };

  public static editUserFull(email: string, firstNm: string, lastNm: string, dob: string, gender: string, phoneNumber: string,
    postalCode: string, country: string, state: any,  city: string, street: string, identityCodeRefId: string): string {
    return JSON.stringify(
      {
        email: email,
        firstName: firstNm,
        lastName: lastNm,
        dateOfBirth: dob,
        gender: gender,
        phoneNumber: phoneNumber,
        identityCodeRefId: identityCodeRefId,
        identityAddressCodeRefId: null,
        address: { street: street, postalCodeZipCode: postalCode, city: city, country: country, state: state }
      }
    );
  };

  public static updatePhoneNumber(phoneNumber: string): string {
    console.log('New phone number: ', JSON.stringify({ phoneNumber: phoneNumber }));
    return JSON.stringify(
      {
        phoneNumber: phoneNumber
      }
    );
  };

  public static assignRoleCorporateAdmin(userId: string): string {
    return JSON.stringify(
      {
        principals: [userId],
        policyCode: rolesId.corpAdmin,
        resources: [{ type: 'Entity', value: resourcesId.corpAdmin  }]
      }
    );
  };

  public static assignRoleCardholder(userId: string, cardId: string): string {
    return JSON.stringify(
      {
        principals: [userId],
        policyCode: rolesId.cardholder,
        resources: [{ type: 'Card', value: cardId }]
      }
    );
  };

  public static assignRoleCorporateAdminSelectedCorporate(userId: string, corporateId: string): string {
    return JSON.stringify(
      {
        principals: [userId],
        policyCode: rolesId.corpAdmin,
        resources: [{ type: 'Entity', value: corporateId }]
      }

      // {
      //   "policyCode":"423381ba-16a4-403b-b60f-9696bb0a6f47",
      //   "principals":["d4be2a17-6351-4f2e-8a55-663034ffcb70"],
      //   "resources":[{"value":"7bf283b8-2404-4836-842a-c1af2d431ae5","type":"Entity"}]
      // }
    );
  };

  public static assignRoleCenttripAdmin(userId: string): string {
    return JSON.stringify(
      {
        principals: [userId],
        policyCode: rolesId.centtripAdmin,
        resources: [{ type: 'Service', value: 'Centtrip' }]
      }
    );
  };

  public static salesforceAuthenticate(): object {
    const body = {
      grant_type: 'password',
      client_id: '3MVG9ahGHqp.k2_xQgKzQIDVC_OwEFUBqivWL5iVL3BSIlhWevss.GwaJor1ZHNhBjkW1cWKtmRgOe_wM0FSN',
      client_secret: '4589362652765866844',
      username: 'jim.warner@centtrip.com.testing',
      password: 'London20185wd2adyN5bhjcJALUkv3UPFb'
    };
    return body;
  };

  getAddedDeliveryAddressQuery(accountName: string, firstName: string): string {
    return `SELECT * FROM entityhierarchy.DeliveryAddressRequest dar WHERE dar.EntityCodeId IN 
    (SELECT CodeId FROM entityhierarchy.EntityRequest er WHERE er.Name = '${accountName}') 
    AND FirstName = '${firstName}';`;
  }

  public static completePassfortTask(): string {
    return JSON.stringify({
      state: 'COMPLETED_PASS'
    });
  };

  public static inCompletePassfortTask(): string {
    return JSON.stringify({
      state: 'INCOMPLETE'
    });
  };

  public static authorizeTransaction(creationDate: any, transactionType: string, paymentId: string, randomAuthCode: string, currency: string, amountAdyenMinus: number,
    originalCurrency: string, originalAmountAdyenMinus: number, fromAccountHolderName: string, fromAccountHolderId: string, fromAccountName: string, fromAccountAdyenId: string,
    fromCardAdyenId: string, merchantMCC: string, merchantId: string, merchantCity: string, merchantState: string, merchantCountry: string, merchantName: string, merchantAll: string,
    reference: string): string {
    return JSON.stringify({
      environment: 'test',
      type: 'balancePlatform.payment.created',
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM_ACCOUNT',
        status: 'Authorised',
        creationDate: creationDate,
        processingType: transactionType,
        id: paymentId,
        authCode: randomAuthCode,
        amount: {
          currency: currency,
          value: amountAdyenMinus
        },
        originalAmount: {
          currency: originalCurrency,
          value: originalAmountAdyenMinus
        },
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        },
        paymentInstrument: {
          id: fromCardAdyenId
        },
        merchantData: {
          mcc: merchantMCC,
          merchantId: merchantId,
          nameLocation: {
            city: merchantCity,
            state: merchantState,
            country: merchantCountry,
            name: merchantName,
            rawData: merchantAll
          }
        },
        relayedAuthorisationData: {
          metadata: {
            key1: 'value1',
            key2: 'value2'
          },
          reference: reference
        },
        validationResult: [
          {
            result: 'valid',
            type: 'PaymentInstrumentExpirationCheck'
          },
          {
            result: 'valid',
            type: 'RelayedAuthorisation'
          },
          {
            result: 'valid',
            type: 'CVC2'
          },
          {
            result: 'valid',
            type: 'TransactionRules'
          },
          {
            result: 'valid',
            type: 'ExchangeAmount'
          },
          {
            result: 'valid',
            type: 'Validation'
          },
          {
            result: 'valid',
            type: 'TransactionValidation'
          },
          {
            result: 'valid',
            type: 'Screening'
          },
          {
            result: 'valid',
            type: 'MaxAuthAmount'
          }
        ]
      }
    });
  };

  public static authorizeTransactionDemo(type: string, paymentId: string, randomAuthCode: string, currency: string, amountAdyenMinus: number, originalCurrency: string,
    originalAmountAdyenMinus: number, fromAccountHolderName: string, fromAccountHolderId: string, fromAccountName: string, fromAccountAdyenId: string,
    fromCardAdyenId: string, merchantMCC: string, merchantId: string, merchantCity: string, merchantCountry: string,
    merchantName: string, merchantAll: string, merchantState?: string): string {
    return JSON.stringify({
      environment: 'test',
      type: 'balancePlatform.payment.created',
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM_ACCOUNT',
        status: 'Authorised',
        creationDate: moment(),
        processingType: type,
        id: paymentId,
        authCode: randomAuthCode,
        amount: {
          currency: currency,
          value: amountAdyenMinus
        },
        originalAmount: {
          currency: originalCurrency,
          value: originalAmountAdyenMinus
        },
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        },
        paymentInstrument: {
          id: fromCardAdyenId
        },
        merchantData: {
          mcc: merchantMCC,
          merchantId: merchantId,
          nameLocation: {
            city: merchantCity,
            state: merchantState,
            country: merchantCountry,
            name: merchantName,
            rawData: merchantAll
          }
        },
        validationResult: []
      }
    });
  };

  public static authorizeTransactionWithFee(transactionType: string, paymentId: string, randomAuthCode: string, currency: string, amountAdyenMinus: number,
    originalCurrency: string, originalAmountAdyenMinus: number, modificationCurrency: string, modificationAmountAdyenMinus: number, fee1AdyenMinus: number,
    fromAccountHolderName: string, fromAccountHolderId: string, fromAccountName: string, fromAccountAdyenId: string, fromCardAdyenId: string, merchantMCC: string, merchantId: string,
    merchantCity: string, merchantState: string, merchantCountry: string, merchantName: string, merchantAll: string, reference: string): string {
    return JSON.stringify({
      environment: 'test',
      type: 'balancePlatform.payment.created',
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM_ACCOUNT',
        status: 'Authorised',
        creationDate: moment(),
        processingType: transactionType,
        id: paymentId,
        authCode: randomAuthCode,
        amount: {
          currency: currency,
          value: amountAdyenMinus
        },
        originalAmount: {
          currency: originalCurrency,
          value: originalAmountAdyenMinus
        },
        modification: {
          amount: {
            currency: modificationCurrency,
            value: modificationAmountAdyenMinus
          }
        },
        amountAdjustments: [
          {
            amount: {
              currency: 'USD',
              value: fee1AdyenMinus
            },
            amountAdjustmentType: 'atmMarkup',
            fixedAmount: {
              currency: 'USD',
              value: fee1AdyenMinus
            }
          }
        ],
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        },
        paymentInstrument: {
          id: fromCardAdyenId
        },
        merchantData: {
          mcc: merchantMCC,
          merchantId: merchantId,
          nameLocation: {
            city: merchantCity,
            state: merchantState,
            country: merchantCountry,
            name: merchantName,
            rawData: merchantAll
          }
        },
        relayedAuthorisationData: {
          metadata: {
            key1: 'value1',
            key2: 'value2'
          },
          reference: reference
        },
        validationResult: [
          {
            result: 'valid',
            type: 'PaymentInstrumentExpirationCheck'
          },
          {
            result: 'valid',
            type: 'RelayedAuthorisation'
          },
          {
            result: 'valid',
            type: 'CVC2'
          },
          {
            result: 'valid',
            type: 'TransactionRules'
          },
          {
            result: 'valid',
            type: 'ExchangeAmount'
          },
          {
            result: 'valid',
            type: 'Validation'
          },
          {
            result: 'valid',
            type: 'TransactionValidation'
          },
          {
            result: 'valid',
            type: 'Screening'
          },
          {
            result: 'valid',
            type: 'MaxAuthAmount'
          }
        ]
      }
    });
  };

  public static authorizeTransactionWithFeeAdjustment(transactionType: string, paymentId: string, randomAuthCode: string, currency: string, amountAdyenMinus: number,
    originalCurrency: string, originalAmountAdyenMinus: number, modificationCurrency: string, modificationAmountAdyenMinus: number, fee1AdyenMinus: number, fee2AdyenMinus: number,
    fromAccountHolderName: string, fromAccountHolderId: string, fromAccountName: string, fromAccountAdyenId: string, fromCardAdyenId: string, merchantMCC: string, merchantId: string,
    merchantCity: string, merchantState: string, merchantCountry: string, merchantName: string, merchantAll: string, reference: string): string {
    return JSON.stringify({
      environment: 'test',
      type: 'balancePlatform.payment.created',
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM_ACCOUNT',
        status: 'Authorised',
        creationDate: moment(),
        processingType: transactionType,
        id: paymentId,
        authCode: randomAuthCode,
        amount: {
          currency: currency,
          value: amountAdyenMinus
        },
        originalAmount: {
          currency: originalCurrency,
          value: originalAmountAdyenMinus
        },
        modification: {
          amount: {
            currency: modificationCurrency,
            value: modificationAmountAdyenMinus
          }
        },
        amountAdjustments: [
          {
            amount: {
              currency: 'USD',
              value: fee1AdyenMinus
            },
            amountAdjustmentType: 'atmMarkup',
            fixedAmount: {
              currency: 'USD',
              value: fee1AdyenMinus
            }
          },
          {
            amount: {
              currency: currency,
              value: fee2AdyenMinus
            },
            amountAdjustmentType: 'authHoldReserve',
            basepoints: 3000
          }
        ],
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        },
        paymentInstrument: {
          id: fromCardAdyenId
        },
        merchantData: {
          mcc: merchantMCC,
          merchantId: merchantId,
          nameLocation: {
            city: merchantCity,
            state: merchantState,
            country: merchantCountry,
            name: merchantName,
            rawData: merchantAll
          }
        },
        relayedAuthorisationData: {
          metadata: {
            key1: 'value1',
            key2: 'value2'
          },
          reference: reference
        },
        validationResult: [
          {
            result: 'valid',
            type: 'PaymentInstrumentExpirationCheck'
          },
          {
            result: 'valid',
            type: 'RelayedAuthorisation'
          },
          {
            result: 'valid',
            type: 'CVC2'
          },
          {
            result: 'valid',
            type: 'TransactionRules'
          },
          {
            result: 'valid',
            type: 'ExchangeAmount'
          },
          {
            result: 'valid',
            type: 'Validation'
          },
          {
            result: 'valid',
            type: 'TransactionValidation'
          },
          {
            result: 'valid',
            type: 'Screening'
          },
          {
            result: 'valid',
            type: 'MaxAuthAmount'
          }
        ]
      }
    });
  };

  public static authorizeTransactionWithAdjustmentDemo(paymentId: string, randomAuthCode: string, currency: string, amountAdyenMinus: number, originalCurrency: string,
    originalAmountAdyenMinus: number, modificationCurrency: string, modificationAmountAdyenMinus: number, fee1AdyenMinus: number, fromAccountHolderName: string,
    fromAccountHolderId: string, fromAccountName: string, fromAccountAdyenId: string, fromCardAdyenId: string, merchantMCC: string, merchantId: string,
    merchantCity: string, merchantCountry: string, merchantName: string, merchantAll: string): string {
    return JSON.stringify({
      environment: 'test',
      type: 'balancePlatform.payment.created',
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM_ACCOUNT',
        status: 'Authorised',
        creationDate: moment(),
        processingType: 'pos',
        id: paymentId,
        authCode: randomAuthCode,
        amount: {
          currency: currency,
          value: amountAdyenMinus
        },
        originalAmount: {
          currency: originalCurrency,
          value: originalAmountAdyenMinus
        },
        modification: {
          amount: {
            currency: modificationCurrency,
            value: modificationAmountAdyenMinus
          }
        },
        amountAdjustments: [
          {
            amount: {
              currency: 'USD',
              value: fee1AdyenMinus
            },
            amountAdjustmentType: 'authHoldReserve',
            basepoints: 2793
          }
        ],
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        },
        paymentInstrument: {
          id: fromCardAdyenId
        },
        merchantData: {
          mcc: merchantMCC,
          merchantId: merchantId,
          nameLocation: {
            city: merchantCity,
            country: merchantCountry,
            name: merchantName,
            rawData: merchantAll
          }
        },
        validationResult: []
      }
    });
  };

  public static capturedTransaction(creationDate: any, transactionType: string, randomId: string, paymentId: string, amountAdyenMinus: number, fromAccountHolderName: string,
    fromAccountHolderId: string, fromAccountName: string, fromAccountAdyenId: string, fromCardAdyenId: string, merchantMCC: string, merchantId: string, merchantCity: string,
    merchantState: string, merchantCountry: string, merchantName: string, merchantAll: string): string {
    return JSON.stringify({
      environment: 'test',
      type: 'balancePlatform.outgoingTransfer.created',
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM_ACCOUNT',
        status: 'Captured',
        creationDate: creationDate,
        processingType: transactionType,
        id: randomId,
        paymentId: paymentId,
        amount: {
          currency: 'USD',
          value: amountAdyenMinus
        },
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        },
        paymentInstrument: {
          id: fromCardAdyenId
        },
        merchantData: {
          mcc: merchantMCC,
          merchantId: merchantId,
          nameLocation: {
            city: merchantCity,
            state: merchantState,
            country: merchantCountry,
            name: merchantName,
            rawData: merchantAll
          }
        },
        relayedAuthorisationData: {
          metadata: {
            key1: 'value1',
            key2: 'value2'
          }
        }
      }
    });
  };

  public static capturedTransactionDemo(type: string, randomId: string, paymentId: string, amountAdyenMinus: number, fromAccountHolderName: string,
    fromAccountHolderId: string, fromAccountName: string, fromAccountAdyenId: string, fromCardAdyenId: string, merchantMCC: string, merchantId: string, merchantCity: string,
    merchantCountry: string, merchantName: string, merchantAll: string, merchantState?: string): string {
    return JSON.stringify({
      environment: 'test',
      type: 'balancePlatform.outgoingTransfer.created',
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM_ACCOUNT',
        status: 'Captured',
        creationDate: moment(),
        processingType: type,
        id: randomId,
        paymentId: paymentId,
        amount: {
          currency: 'USD',
          value: amountAdyenMinus
        },
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        },
        paymentInstrument: {
          id: fromCardAdyenId
        },
        merchantData: {
          mcc: merchantMCC,
          merchantId: merchantId,
          nameLocation: {
            city: merchantCity,
            state: merchantState,
            country: merchantCountry,
            name: merchantName,
            rawData: merchantAll
          }
        }
      }
    });
  };

  public static capturedTransactionModified(transactionType: string, randomId: string, paymentId: string, currency: string,
    modificationAmountAdyenMinus: number, originalCurrency: string, originalAmountAdyenMinus: number, fromAccountHolderName: string, fromAccountHolderId: string,
    fromAccountName: string, fromAccountAdyenId: string, fromCardAdyenId: string, merchantMCC: string, merchantId: string, merchantCity: string, merchantState: string,
    merchantCountry: string, merchantName: string, merchantAll: string): string {
    return JSON.stringify({
      environment: 'test',
      type: 'balancePlatform.outgoingTransfer.created',
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM_ACCOUNT',
        status: 'Captured',
        creationDate: moment(),
        processingType: transactionType,
        id: randomId,
        paymentId: paymentId,
        amount: {
          currency: currency,
          value: modificationAmountAdyenMinus
        },
        originalAmount: {
          currency: originalCurrency,
          value: originalAmountAdyenMinus
        },
        modification: {
          amount: {
            currency: currency,
            value: modificationAmountAdyenMinus
          }
        },
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        },
        paymentInstrument: {
          id: fromCardAdyenId
        },
        merchantData: {
          mcc: merchantMCC,
          merchantId: merchantId,
          nameLocation: {
            city: merchantCity,
            state: merchantState,
            country: merchantCountry,
            name: merchantName,
            rawData: merchantAll
          }
        },
        relayedAuthorisationData: {
          metadata: {
            key1: 'value1',
            key2: 'value2'
          }
        }
      }
    });
  };

  public static expiredTransaction(creationDate: any, transactionType: string, paymentId: string, randomAuthCode: string, amountAdyenMinus: number, originalCurrency: string,
    originalAmountAdyenMinus: number, amountAdyen: number, fromAccountHolderName: string, fromAccountHolderId: string, fromAccountName: string, fromAccountAdyenId: string,
    fromCardName: string, fromCardAdyenId: string, merchantMCC: string, merchantId: string, merchantCity: string, merchantState: string, merchantCountry: string, merchantName: string,
    merchantAll: string): string {
    return JSON.stringify({
      environment: 'test',
      type: 'balancePlatform.payment.updated',
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM',
        status: 'Expired',
        creationDate: creationDate,
        processingType: transactionType,
        id: paymentId,
        authCode: randomAuthCode,
        amount: {
          currency: 'USD',
          value: amountAdyenMinus
        },
        originalAmount: {
          currency: originalCurrency,
          value: originalAmountAdyenMinus
        },
        modification: {
          amount: {
            currency: 'USD',
            value: amountAdyen
          }
        },
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        },
        paymentInstrument: {
          description: fromCardName,
          id: fromCardAdyenId
        },
        merchantData: {
          mcc: merchantMCC,
          merchantId: merchantId,
          nameLocation: {
            city: merchantCity,
            state: merchantState,
            country: merchantCountry,
            name: merchantName,
            rawData: merchantAll
          }
        },
        relayedAuthorisationData: {
          metadata: {
            key1: 'value1',
            key2: 'value2'
          }
        },
        transactionRulesResult: {
          allRulesPassed: 'true'
        },
        validationResult: [
          {
            result: 'valid',
            type: 'AccountLookup'
          },
          {
            result: 'valid',
            type: 'PaymentInstrumentExpirationCheck'
          },
          {
            result: 'valid',
            type: 'Screening'
          },
          {
            result: 'valid',
            type: 'TransactionValidation'
          },
          {
            result: 'valid',
            type: 'RelayedAuthorisation'
          },
          {
            result: 'valid',
            type: 'BalanceCheck'
          },
          {
            result: 'valid',
            type: 'CVC2'
          },
          {
            result: 'valid',
            type: 'MaxAuthAmount'
          },
          {
            result: 'valid',
            type: 'TransactionRules'
          }
        ]
      }
    });
  };

  public static expiredTransactionDemo(transactionType: string, paymentId: string, randomAuthCode: string, amountAdyenMinus: number, originalCurrency: string,
    originalAmountAdyenMinus: number, amountAdyen: number, fromAccountHolderName: string, fromAccountHolderId: string, fromAccountName: string, fromAccountAdyenId: string,
    fromCardName: string, fromCardAdyenId: string, merchantMCC: string, merchantId: string, merchantCity: string, merchantState: string, merchantCountry: string, merchantName: string,
    merchantAll: string): string {
    return JSON.stringify({
      environment: 'test',
      type: 'balancePlatform.payment.updated',
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM',
        status: 'Expired',
        creationDate: moment(),
        processingType: transactionType,
        id: paymentId,
        authCode: randomAuthCode,
        amount: {
          currency: 'USD',
          value: amountAdyenMinus
        },
        originalAmount: {
          currency: originalCurrency,
          value: originalAmountAdyenMinus
        },
        modification: {
          amount: {
            currency: 'USD',
            value: amountAdyen
          }
        },
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        },
        paymentInstrument: {
          description: fromCardName,
          id: fromCardAdyenId
        },
        merchantData: {
          mcc: merchantMCC,
          merchantId: merchantId,
          nameLocation: {
            city: merchantCity,
            state: merchantState,
            country: merchantCountry,
            name: merchantName,
            rawData: merchantAll
          }
        },
        relayedAuthorisationData: {
          metadata: {
            key1: 'value1',
            key2: 'value2'
          }
        },
        transactionRulesResult: {
          allRulesPassed: 'true'
        },
        validationResult: []
      }
    });
  };

  public static cancelledTransaction(creationDate: any, transactionType: string, paymentId: string, randomAuthCode: string, differentAmountAdyenMinus: number, originalCurrency: string,
    differentOriginalAmountAdyenMinus: number, differentAmountAdyen: number, fromAccountHolderName: string, fromAccountHolderId: string, fromAccountName: string,
    fromAccountAdyenId: string, fromCardName: string, fromCardAdyenId: string, merchantMCC: string, merchantId: string, merchantCity: string, merchantState: string,
    merchantCountry: string, merchantName: string, merchantAll: string): string {
    return JSON.stringify({
      environment: 'test',
      type: 'balancePlatform.payment.updated',
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM_ACCOUNT',
        status: 'Cancelled',
        creationDate: creationDate,
        processingType: transactionType,
        id: paymentId,
        authCode: randomAuthCode,
        amount: {
          currency: 'USD',
          value: differentAmountAdyenMinus
        },
        originalAmount: {
          currency: originalCurrency,
          value: differentOriginalAmountAdyenMinus
        },
        modification: {
          amount: {
            currency: 'USD',
            value: differentAmountAdyen
          }
        },
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        },
        paymentInstrument: {
          description: fromCardName,
          id: fromCardAdyenId
        },
        merchantData: {
          mcc: merchantMCC,
          merchantId: merchantId,
          nameLocation: {
            city: merchantCity,
            state: merchantState,
            country: merchantCountry,
            name: merchantName,
            rawData: merchantAll
          }
        },
        relayedAuthorisationData: {
          metadata: {
            key1: 'value1',
            key2: 'value2'
          },
          transactionRulesResult: {
            allRulesPassed: 'true'
          }
        },
        validationResult: [
          {
            result: 'valid',
            type: 'AccountLookup'
          },
          {
            result: 'valid',
            type: 'PaymentInstrumentExpirationCheck'
          },
          {
            result: 'valid',
            type: 'Screening'
          },
          {
            result: 'valid',
            type: 'TransactionValidation'
          },
          {
            result: 'valid',
            type: 'RelayedAuthorisation'
          },
          {
            result: 'valid',
            type: 'BalanceCheck'
          },
          {
            result: 'valid',
            type: 'CVC2'
          },
          {
            result: 'valid',
            type: 'MaxAuthAmount'
          },
          {
            result: 'valid',
            type: 'TransactionRules'
          }
        ]
      }
    });
  };

  public static cancelledTransactionDemo(transactionType: string, paymentId: string, randomAuthCode: string, differentAmountAdyenMinus: number, originalCurrency: string,
    differentOriginalAmountAdyenMinus: number, differentAmountAdyen: number, fromAccountHolderName: string, fromAccountHolderId: string, fromAccountName: string,
    fromAccountAdyenId: string, fromCardAdyenId: string, merchantMCC: string, merchantId: string, merchantCity: string, merchantState: string,
    merchantCountry: string, merchantName: string, merchantAll: string): string {
    return JSON.stringify({
      environment: 'test',
      type: 'balancePlatform.payment.updated',
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM_ACCOUNT',
        status: 'Cancelled',
        creationDate: moment(),
        processingType: transactionType,
        id: paymentId,
        authCode: randomAuthCode,
        amount: {
          currency: 'USD',
          value: differentAmountAdyenMinus
        },
        originalAmount: {
          currency: originalCurrency,
          value: differentOriginalAmountAdyenMinus
        },
        modification: {
          amount: {
            currency: 'USD',
            value: differentAmountAdyen
          }
        },
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        },
        paymentInstrument: {
          id: fromCardAdyenId
        },
        merchantData: {
          mcc: merchantMCC,
          merchantId: merchantId,
          nameLocation: {
            city: merchantCity,
            state: merchantState,
            country: merchantCountry,
            name: merchantName,
            rawData: merchantAll
          }
        },
        validationResult: []
      }
    });
  };

  public static refundedTransaction(creationDate: any, transactionType: string, randomId: string, paymentId: string, amountAdyen: number, originalCurrency: string,
    originalAmountAdyen: number, fromAccountHolderName: string, fromAccountHolderId: string, fromAccountName: string, fromAccountAdyenId: string): string {
    return JSON.stringify({
      environment: 'test',
      type: 'balancePlatform.incomingTransfer.updated',
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM_ACCOUNT',
        status: 'Refunded',
        creationDate: creationDate,
        processingType: transactionType,
        id: randomId,
        paymentId: paymentId,
        amount: {
          currency: 'USD',
          value: amountAdyen
        },
        originalAmount: {
          currency: originalCurrency,
          value: originalAmountAdyen
        },
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },

        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        }
      }
    });
  };

  public static refundedTransactionDemo(transactionType: string, randomId: string, paymentId: string, amountAdyen: number, originalCurrency: string,
    originalAmountAdyen: number, fromAccountHolderName: string, fromAccountHolderId: string, fromAccountName: string, fromAccountAdyenId: string, fromCardAdyenId: string): string {
    return JSON.stringify({
      environment: 'test',
      type: 'balancePlatform.incomingTransfer.updated',
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM_ACCOUNT',
        status: 'Refunded',
        creationDate: moment(),
        processingType: transactionType,
        id: randomId,
        paymentId: paymentId,
        amount: {
          currency: 'USD',
          value: amountAdyen
        },
        originalAmount: {
          currency: originalCurrency,
          value: originalAmountAdyen
        },
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },

        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        },
        paymentInstrument: {
          id: fromCardAdyenId
        }
      }
    });
  };

  public static refusedTransaction(creationDate: any, transactionType: string, randomId: string, amountAdyenMinus: number, fromAccountHolderName: string,
    fromAccountHolderId: string, fromAccountName: string, fromAccountAdyenId: string, fromCardName: string, fromCardAdyenId: string, merchantMCC: string,
    merchantId: string, merchantCity: string, merchantState: string, merchantCountry: string, merchantName: string, merchantAll: string): string {
    return JSON.stringify({
      environment: 'test',
      type: 'balancePlatform.payment.created',
      data: {
        balancePlatform: 'ColinRood',
        status: 'Refused',
        creationDate: creationDate,
        processingType: transactionType,
        id: randomId,
        amount: {
          currency: 'USD',
          value: amountAdyenMinus
        },
        originalAmount: {
          currency: 'USD',
          value: amountAdyenMinus
        },
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        },
        paymentInstrument: {
          description: fromCardName,
          id: fromCardAdyenId
        },
        merchantData: {
          mcc: merchantMCC,
          merchantId: merchantId,
          nameLocation: {
            city: merchantCity,
            state: merchantState,
            country: merchantCountry,
            name: merchantName,
            rawData: merchantAll
          }
        },
        transactionRulesResult: {
          allRulesPassed: 'false',
          failedTransactionRules: [
            {
              reason: 'This event exceeds the maximum allowed Amount (USD 1.00) in interval perTransaction',
              transactionRule: {
                description: 'velocity',
                id: 'TR32272223222B5CV5WXQ6W36',
                reference: '100USDPerTx'
              },
              transactionRuleSource: {
                id: fromCardAdyenId,
                type: 'PaymentInstrument'
              }
            },
            {
              reason: 'This event exceeds the maximum allowed Amount (USD 10.00) in interval perTransaction',
              transactionRule: {
                description: 'velocity',
                id: 'TR3227C223222B5CV5WXLBWL5',
                reference: '1000USDPerTx'
              },
              transactionRuleSource: {
                id: fromCardAdyenId,
                type: 'PaymentInstrument'
              }
            }
          ]
        },
        validationResult: [
          {
            result: 'valid',
            type: 'AccountLookup'
          },
          {
            result: 'valid',
            type: 'PaymentInstrumentExpirationCheck'
          },
          {
            result: 'valid',
            type: 'MaxAuthAmount'
          },
          {
            result: 'valid',
            type: 'BalanceCheck'
          },
          {
            result: 'invalid',
            type: 'TransactionRules'
          },
          {
            result: 'valid',
            type: 'CVC2'
          },
          {
            result: 'valid',
            type: 'TransactionValidation'
          },
          {
            result: 'valid',
            type: 'Screening'
          },
          {
            result: 'notApplicable',
            type: 'RelayedAuthorisation'
          }
        ]
      }
    });
  };

  public static refusedDemoTransaction(randomId: string, amountAdyenMinus: number, fromAccountHolderName: string,
    fromAccountHolderId: string, fromAccountName: string, fromAccountAdyenId: string, fromCardAdyenId: string, merchantMCC: string,
    merchantId: string, merchantCity: string, merchantState: string, merchantCountry: string, merchantName: string, merchantAll: string): string {
    return JSON.stringify({
      environment: 'test',
      type: 'balancePlatform.payment.created',
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM_ACCOUNT',
        status: 'Refused',
        creationDate: moment(),
        processingType: "ecommerce",
        id: randomId,
        amount: {
          currency: 'USD',
          value: amountAdyenMinus
        },
        originalAmount: {
          currency: 'GBP',
          value: -1000
        },
        modification: {
          amount: {
            currency: 'USD',
            value: amountAdyenMinus
          }
        },
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        },
        paymentInstrument: {
          id: fromCardAdyenId
        },
        merchantData: {
          mcc: merchantMCC,
          merchantId: merchantId,
          nameLocation: {
            city: merchantCity,
            state: merchantState,
            country: merchantCountry,
            name: merchantName,
            rawData: merchantAll
          }
        },
        validationResult: [
          {
            result: 'valid',
            type: 'CVC2'
          }
        ]
      }
    });
  };

  public static refusedTransactionAdjustment(creationDate: any, transactionType: string, randomId: string, currency: string, amountAdyenMinus: number,
    originalCurrency: string, originalAmountAdyenMinus: number, modificationAmountAdyenMinus: number, fee1AdyenMinus: number, fromAccountHolderName: string,
    fromAccountHolderId: string, fromAccountName: string, fromAccountAdyenId: string, fromCardName: string, fromCardAdyenId: string, merchantMCC: string, merchantId: string,
    merchantCity: string, merchantState: string, merchantCountry: string, merchantName: string, merchantAll: string): string {
    return JSON.stringify({
      environment: 'test',
      type: 'balancePlatform.payment.created',
      data: {
        balancePlatform: 'ColinRood',
        status: 'Refused',
        creationDate: creationDate,
        processingType: transactionType,
        id: randomId,
        amount: {
          currency: currency,
          value: amountAdyenMinus
        },
        originalAmount: {
          currency: originalCurrency,
          value: originalAmountAdyenMinus
        },
        modification: {
          amount: {
            currency: currency,
            value: modificationAmountAdyenMinus
          }
        },
        amountAdjustments: [
          {
            amount: {
              currency: currency,
              value: fee1AdyenMinus
            },
            amountAdjustmentType: 'atmMarkup',
            fixedAmount: {
              currency: currency,
              value: fee1AdyenMinus
            }
          }
        ],
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        },
        paymentInstrument: {
          description: fromCardName,
          id: fromCardAdyenId
        },
        merchantData: {
          mcc: merchantMCC,
          merchantId: merchantId,
          nameLocation: {
            city: merchantCity,
            state: merchantState,
            country: merchantCountry,
            name: merchantName,
            rawData: merchantAll
          }
        },
        transactionRulesResult: {
          allRulesPassed: 'false',
          failedTransactionRules: [
            {
              reason: 'This event exceeds the maximum allowed Amount (USD 1.00) in interval perTransaction',
              transactionRule: {
                description: 'velocity',
                id: 'TR32272223222B5CV5WXQ6W36',
                reference: '100USDPerTx'
              },
              transactionRuleSource: {
                id: fromCardAdyenId,
                type: 'PaymentInstrument'
              }
            },
            {
              reason: 'This event exceeds the maximum allowed Amount (USD 10.00) in interval perTransaction',
              transactionRule: {
                description: 'velocity',
                id: 'TR3227C223222B5CV5WXLBWL5',
                reference: '1000USDPerTx'
              },
              transactionRuleSource: {
                id: fromCardAdyenId,
                type: 'PaymentInstrument'
              }
            }
          ]
        },
        validationResult: [
          {
            result: 'valid',
            type: 'AccountLookup'
          },
          {
            result: 'valid',
            type: 'PaymentInstrumentExpirationCheck'
          },
          {
            result: 'valid',
            type: 'MaxAuthAmount'
          },
          {
            result: 'valid',
            type: 'BalanceCheck'
          },
          {
            result: 'invalid',
            type: 'TransactionRules'
          },
          {
            result: 'valid',
            type: 'CVC2'
          },
          {
            result: 'valid',
            type: 'TransactionValidation'
          },
          {
            result: 'valid',
            type: 'Screening'
          },
          {
            result: 'notApplicable',
            type: 'RelayedAuthorisation'
          }
        ]
      }
    });
  };

  public static refusedTransactionFee(transactionType: string, randomId: string, currency: string, amountAdyenMinus: number,
    originalCurrency: string, originalAmountAdyenMinus: number, modificationAmountAdyenMinus: number, fee1AdyenMinus: number, fromAccountHolderName: string,
    fromAccountHolderId: string, fromAccountName: string, fromAccountAdyenId: string, fromCardAdyenId: string, merchantMCC: string, merchantId: string,
    merchantCity: string, merchantState: string, merchantCountry: string, merchantName: string, merchantAll: string): string {
    return JSON.stringify({
      environment: 'test',
      type: 'balancePlatform.payment.created',
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM_ACCOUNT',
        status: 'Refused',
        creationDate: moment(),
        processingType: transactionType,
        id: randomId,
        amount: {
          currency: currency,
          value: amountAdyenMinus
        },
        originalAmount: {
          currency: originalCurrency,
          value: originalAmountAdyenMinus
        },
        modification: {
          amount: {
            currency: currency,
            value: modificationAmountAdyenMinus
          }
        },
        amountAdjustments: [
          {
            amount: {
              currency: currency,
              value: fee1AdyenMinus
            },
            amountAdjustmentType: 'atmMarkup',
            fixedAmount: {
              currency: currency,
              value: fee1AdyenMinus
            }
          }
        ],
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        },
        paymentInstrument: {
          id: fromCardAdyenId
        },
        merchantData: {
          mcc: merchantMCC,
          merchantId: merchantId,
          nameLocation: {
            city: merchantCity,
            state: merchantState,
            country: merchantCountry,
            name: merchantName,
            rawData: merchantAll
          }
        },
        validationResult: [
          {
            result: 'invalid',
            type: 'CVC2'
          }
        ]
      }
    });
  };

  public static refusedTransactionAdjustmentDemo(transactionType: string, randomId: string, currency: string, amountAdyenMinus: number,
    originalCurrency: string, originalAmountAdyenMinus: number, modificationAmountAdyenMinus: number, fromAccountHolderName: string,
    fromAccountHolderId: string, fromAccountName: string, fromAccountAdyenId: string, fromCardAdyenId: string, merchantMCC: string, merchantId: string,
    merchantCity: string, merchantState: string, merchantCountry: string, merchantName: string, merchantAll: string): string {
    return JSON.stringify({
      environment: 'test',
      type: 'balancePlatform.payment.created',
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM_ACCOUNT',
        status: 'Refused',
        creationDate: moment(),
        processingType: transactionType,
        id: randomId,
        amount: {
          currency: currency,
          value: amountAdyenMinus
        },
        originalAmount: {
          currency: originalCurrency,
          value: originalAmountAdyenMinus
        },
        modification: {
          amount: {
            currency: currency,
            value: modificationAmountAdyenMinus
          }
        },
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        },
        paymentInstrument: {
          id: fromCardAdyenId
        },
        merchantData: {
          mcc: merchantMCC,
          merchantId: merchantId,
          nameLocation: {
            city: merchantCity,
            state: merchantState,
            country: merchantCountry,
            name: merchantName,
            rawData: merchantAll
          }
        },
        transactionRulesResult: {
          allRulesPassed: 'false',
          failedTransactionRules: [
            {
              reason: 'E: Card limit “Maximum Monthly Spending” is exceeded',
              transactionRule: {
                description: 'MaximumMonthlySpendAmount',
                id: 'TR32272223222B5CV5WXQ6W36',
                reference: '100USDPerTx'
              },
              transactionRuleSource: {
                id: fromCardAdyenId,
                type: 'PaymentInstrument'
              }
            }
          ]
        },
        validationResult: [
          {
            result: 'valid',
            type: 'AccountLookup'
          },
          {
            result: 'valid',
            type: 'PaymentInstrumentExpirationCheck'
          },
          {
            result: 'valid',
            type: 'MaxAuthAmount'
          },
          {
            result: 'valid',
            type: 'BalanceCheck'
          },
          {
            result: 'invalid',
            type: 'TransactionRules'
          },
          {
            result: 'valid',
            type: 'CVC2'
          },
          {
            result: 'valid',
            type: 'TransactionValidation'
          },
          {
            result: 'valid',
            type: 'Screening'
          },
          {
            result: 'notApplicable',
            type: 'RelayedAuthorisation'
          }
        ]
      }
    });
  };

  public static addLabel(labelName: string): string {
    return JSON.stringify({
      label: labelName
    }
    );
  };

  public static paymentDeposit(fromAccountHolderName: string, fromAccountHolderId: string, amountAdyen: number, fromAccountName: string,
    fromAccountAdyenId: string, randomId: string, paymentId: string): string {
    return JSON.stringify({
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM',
        creationDate: moment(),
        id: randomId,
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        amount: {
          currency: 'USD',
          value: amountAdyen
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        },
        originalAmount: {
          currency: 'USD',
          value: amountAdyen
        },
        paymentId: paymentId,
        status: 'IncomingTransfer'
      },
      environment: 'test',
      type: 'balancePlatform.incomingTransfer.updated'
    });
  };

  public static createPaymentCustom(fromAccountRefId: string, toAccountRefId: string, toAccountName: string, amount: number): string {
    return JSON.stringify({
      strict: true,
      validationOnly: false,
      operations: [
        {
          insert: {
            sourceAccountCodeRefId: fromAccountRefId,
            targetAccountCodeRefId: toAccountRefId,
            targetAccountName: toAccountName,
            targetType: 'Account',
            currencyCode: 'USD',
            tradeDate: moment().format('YYYY-MM-DD'),
            settleDate: moment().format('YYYY-MM-DD'),
            amount: amount,
            type: 'FromAccountToAccount',
            eTag: uuidv4(),
            reference: null,
            operation: {
              flow: 'FromAccountToAccount',
              task: 'PaymentTransaction.Create'
            }
          }
        }
      ]
    });
  };

  public static createDepositCustom(fromAccountRefId: string, toAccountRefId: string, fromAccountName: string, amount: number): string {
    return JSON.stringify({
      strict: true,
      validationOnly: false,
      operations: [
        {
          insert: {
            sourceAccountCodeRefId: fromAccountRefId,
            targetAccountCodeRefId: toAccountRefId,
            sourceAccountName: fromAccountName,
            currencyCode: 'USD',
            tradeDate: moment().format('YYYY-MM-DD'),
            settleDate: moment().format('YYYY-MM-DD'),
            amount: amount,
            type: 'FromAccountToAccount',
            eTag: uuidv4(),
            reference: 'Pay salary',
            sourceType: 'Account',
            operation: {
              flow: 'FromAccountToAccount',
              task: 'DepositTransaction.Create'
            }
          }
        }
      ]
    });
  };

  public static paymentSettledNotificationCustom(paymentTransactionTag: string, fromAccountHolderName: string, fromAccountHolderId: string,
    amountAdyenMinus: number, fromAccountName: string, fromAccountAdyenId: string): string {
    return JSON.stringify({
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM',
        creationDate: moment(),
        id: paymentTransactionTag,
        accountHolder: {
          description: fromAccountHolderName,
          id: fromAccountHolderId
        },
        amount: {
          currency: 'USD',
          value: amountAdyenMinus
        },
        balanceAccount: {
          description: fromAccountName,
          id: fromAccountAdyenId
        },
        originalAmount: {
          currency: 'USD',
          value: amountAdyenMinus
        },
        paymentId: paymentTransactionTag,
        status: 'OutgoingTransfer'
      },
      environment: 'test',
      type: 'balancePlatform.outgoingTransfer.created'
    });
  };

  public static depositSettledNotificationModified(creationDate: any, depositTransactionTag: string, toAccountHolderName: string, toAccountHolderId: string,
    amountAdyen: number, toAccountName: string, toAccountAdyenId: string, modType: string, status: string): string {
    return JSON.stringify({
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM',
        creationDate: creationDate,
        id: depositTransactionTag,
        accountHolder: {
          description: toAccountHolderName,
          id: toAccountHolderId
        },
        amount: {
          currency: 'USD',
          value: amountAdyen
        },
        balanceAccount: {
          description: toAccountName,
          id: toAccountAdyenId
        },
        originalAmount: {
          currency: 'USD',
          value: amountAdyen
        },
        modification: {
          amount: {
            currency: 'USD',
            value: amountAdyen
          },
          type: modType
        },
        paymentId: depositTransactionTag,
        status: status,
        valueDate: creationDate
      },
      environment: 'test',
      type: 'balancePlatform.outgoingTransfer.updated'
    });
  };

  public static depositSettledNotification(depositTransactionTag: string, randomTransactionTag: string, paymentTransactionTag: string,
    toAccountHolderName: string, toAccountHolderId: string, amountAdyen: number, toAccountName: string, toAccountAdyenId: string, status: string): string {
    return JSON.stringify({
      data: {
        balancePlatform: 'YOUR_BALANCE_PLATFORM',
        creationDate: moment(),
        id: depositTransactionTag,
        paymentId: randomTransactionTag,
        reference: paymentTransactionTag,
        accountHolder: {
          description: toAccountHolderName,
          id: toAccountHolderId
        },
        amount: {
          currency: 'USD',
          value: amountAdyen
        },
        balanceAccount: {
          description: toAccountName,
          id: toAccountAdyenId
        },
        originalAmount: {
          currency: 'USD',
          value: amountAdyen
        },
        status: status,
        valueDate: moment()
      },
      environment: 'test',
      type: 'balancePlatform.incomingTransfer.updated'
    });
  };

  public static updateGroupLimits(limit: string, guid: string): string {
    return JSON.stringify({
      limitType: limit,
      eTag: guid,
      operation: {
        flow: 'grouplimits',
        task: 'update'
      }
    });
  };

  public static checkNumberOF(entityCodeRefId: string, roles: Array<string>): string {
    return JSON.stringify({
      direction: 'Next',
      orderBy: null,
      search: '',
      orderDirection: 'Asc',
      pageSize: 10,
      filters: {
        entityCodeRefIds: [
          entityCodeRefId
        ],
        entityCodeRefIdsOperator: 'In',
        operatingEntityCodeRefIds: [],
        operatingEntityCodeRefIdsOperator: 'In',
        roleNames: roles,
        roleNamesOperator: 'In'
      }
    });
  };

  public static expensesTransactions(cardCodeRefId: string, transactionDateTime: string): string {
    return JSON.stringify({
      pageSize: 5,
      direction: 'Next',
      search: '',
      filters: {
        direction: 'Both',
        cards: [
          cardCodeRefId
        ],
        currency: [
          'USD'
        ],
        hasSharedBalance: null,
        hasLabels: null,
        hasReceipts: null,
        fromDateTime: transactionDateTime,
        toDateTime: transactionDateTime
      }
    });
  };

  public static statementsTransactions(sizeNumber: number, accountCodeRefId: string, transactionDateTime: string, toDateTime?: string): string {
    return JSON.stringify({
      pageSize: sizeNumber,
      direction: 'Next',
      search: '',
      filters: {
        accountRefId: accountCodeRefId,
        fromDateTime: transactionDateTime,
        toDateTime: toDateTime ? toDateTime : transactionDateTime
      }
    });
  };

  public static statementsTransactionsExtended(accountCodeRefId: string, transactionDateTime: string, toDateTime: string,
    separatorByDate: string, directionType: string, separatorById: string, sizeNumber: number,): string {
    return JSON.stringify({
      filters: {
        accountRefId: accountCodeRefId,
        fromDateTime: transactionDateTime,
        toDateTime: toDateTime
      },
      separatorByDateTime: separatorByDate,
      direction: directionType,
      separatorByRefIds: [
        separatorById
      ],
      pageSize: sizeNumber,
      url: '/api/account/v1/Accounts/transactions/paging'
    });
  };
}
