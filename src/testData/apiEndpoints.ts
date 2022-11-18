export const apiEndpoints = {
  passfortApi: {
    getProductApp(profileId: string, appId: string):string {
      return `/4.0/profiles/${profileId}/applications/${appId}`;
    },
    getProfileData(id: string):string {
      return `/4.0/profiles/${id}`;
    },
    getTasksStatuses(profileId: string):string {
      return `/4.0/profiles/${profileId}/tasks`;
    },
    completeTask(profileId: string, taskId: string):string {
      return `/4.0/profiles/${profileId}/tasks/${taskId}`;
    }
  },
  C11234_1(id: string):string {
    return `/v1/CorporateLegalEntities/${id}`;
  },
  C11234_2(id: string):string {
    return `/bcl/v1/accountHolders/${id}`;
  },
  C11473_1(id: string):string {
    return `/4.0/forms/profile/${id}/customer_request`;
  },
  C11473_4(profileId: string, appId: string):string {
    return `/4.0/profiles/${profileId}/applications/${appId}/revert_decision`;
  },

  demoAccountCardtransaction: '/listener.ashx',
  adyenNotifications: '/v1/notifications',
  createEntity: '/v1/Entities',
  createOperatingAccount: '/v1/Accounts',
  getEntityCardGroup(id: string):string {
    return `/v1/Entities/${id}`;
  },
  getGroupRules(id: string):string {
    return `/v1/CardGroupTransactionRules?CardGroupCodeRefId=${id}`;
  },
  setTransactionRule: '/v1/CardGroupTransactionRules',
  updateTransactionRule(id: string):string {
    return `/v1/CardGroupTransactionRules/${id}`;
  },
  updateCardTransactionRule(id: string):string {
    return `/v1/CardTransactionRules/${id}`;
  },
  createCardForOperatingAccount: '/v1/Cards',
  updateStatusOfCardToSelectStatus(cardId: string, status: string):string {
    return `/v1/Cards/${cardId}/status/${status}`;
  },
  getCardsLimits(cardId: string):string {
    return `/v1/CardTransactionRules?CardCodeRefId=${cardId}`;
  },
  setCardTransactionRule: '/v1/CardTransactionRules',
  getOperatingAccount(id: string):string {
    return `/v1/Accounts/${id}`;
  },
  getOperatingCards(id: string):string {
    return `/v1/Cards/${id}`;
  },
  getRelationsOfOperatingCards(id: string):string {
    return `/v1/Cards/cardentityhierarchy/${id}`;
  },
  getLegalEntity(id: string):string {
    return `/bcl/v1/legalEntities/${id}`;
  },
  getTransferInstruments(id: string):string {
    return `/bcl/v1/transferInstruments/${id}`;
  },
  getAccountHolder(id: string):string {
    return `/bcl/v1/accountHolders/${id}`;
  },
  getAccountHolderBalanceAccounts(id: string):string {
    return `/bcl/v1/accountHolders/${id}/balanceAccounts`;
  },
  getBalanceAccountId(id: string):string {
    return `/bcl/v1/balanceAccounts/${id}`;
  },
  getPaymentInstrument(id: string):string {
    return `/bcl/v2/paymentInstruments/${id}`;
  },
  getPaymentInstrumentTransactionRules(id: string):string {
    return `/bcl/v1/paymentInstruments/${id}/transactionRules`;
  },
  getTransactionRuleData(id: string):string {
    return `/bcl/v2/transactionRules/${id}`;
  },
  getPaymentInstrumentGroup(id: string):string {
    return `/bcl/v1/paymentInstrumentGroups/${id}`;
  },
  getPaymentInstrumentGroupTransactionRules(id: string):string {
    return `/bcl/v2/paymentInstrumentGroups/${id}/transactionRules`;
  },
  createPayment: '/v1/paymentTransactions',
  addTagToPayment(paymentTransactionId: string):string {
    return `/v1/paymentTransactions/${paymentTransactionId}/tags`;
  },
  addPaymentToGroup: '/v1/transactionGroup',
  createDeposit: '/v1/depositTransactions',
  addTagToDeposit(depositTransactionId: string):string {
    return `/v1/depositTransactions/${depositTransactionId}/tags`;
  },
  addDepositToGroup: '/v1/transactionGroup',
  applyActionToGroup: '/v1/transactionGroup/applyAction',
  setNotification: '/v1/notifications/',
  sourceAccountJournals(fromAccountRefId: string):string {
    return `/v1/tradeJournals?accountCodeRefId=${fromAccountRefId}&currencyCode=USD`;
  },
  destinationAccountJournals(toAccountRefId: string):string {
    return `/v1/tradeJournals?accountCodeRefId=${toAccountRefId}&currencyCode=USD`;
  },
  
  createUser: 'api/administration/v1/Users/createUser',
  editUser: 'api/administration/v1/Users/updateUser',
  updatePhoneNumber: 'api/profile/v1/Profile/phone',
  createAccount: 'api/administration/v1/accounts',

  getAccountDetails(id: string): string {
    return `api/administration/v1/Accounts/${id}`;
  },
  accountDetails: 'api/administration/v1/accounts/paging',
  assignRole: 'api/administration/v1/users/assignUserRole',

  salesforceApi: {

    authenticate: '/services/oauth2/token',
    getAccountsByCenttripPlatformId(centtripPlatformId: string):string {
      return `/services/data/v39.0/query/?q=SELECT a.Id, a.RecordTypeId,a.Salutation, a.FirstName, a.LastName, a.Name, a.PersonEmail, a.Cardholder_ID_CHID__c,\
      a.Distributor_Code__c, a.Account_Status__c, a.CreatedDate, a.Date_of_Birth__c, a.BillingStreet, a.BillingCity, a.BillingState, a.BillingPostalCode, a.BillingCountryCode,\
      a.Phone, a.PersonMobilePhone, a.Centtrip_Platform_ID__c, a.ParentId,a.ParentCenttripPlatformID__c,a.Company_Number__c, a.Is_Sub_Account__c,\
      a.Sum_of_Wallet_to_Card_Transfers__c,a.Total_Card_Spend_Calc__c FROM Account a WHERE a.Centtrip_Platform_ID__c IN ('${centtripPlatformId}')`;
    },
    getAccountsByCompanyName(companyName: string):string {
      return `/services/data/v39.0/query/?q=SELECT a.Id, a.RecordTypeId,a.Salutation, a.FirstName, a.LastName, a.Name, a.PersonEmail, a.Cardholder_ID_CHID__c,\
      a.Distributor_Code__c, a.Account_Status__c, a.CreatedDate, a.Date_of_Birth__c, a.BillingStreet, a.BillingCity, a.BillingState, a.BillingPostalCode, a.BillingCountryCode,\
      a.Phone, a.PersonMobilePhone, a.Centtrip_Platform_ID__c, a.ParentId,a.ParentCenttripPlatformID__c,a.Company_Number__c, a.Is_Sub_Account__c,\
      a.Sum_of_Wallet_to_Card_Transfers__c,a.Total_Card_Spend_Calc__c FROM Account a WHERE a.Name IN ('${companyName}')`;
    },
    getContactsByEmail(email: string):string {
      return `/services/data/v39.0/query/?q=SELECT c.Id, c.RecordTypeId, c.AccountId, c.Email, c.Name, c.FirstName, c.LastName, c.Phone, c.MobilePhone, c.Is_Cardholder__c, c.Corporate_Admin_User__c,\
      c.Corporate_Super_Admin__c, c.CurrencyIsoCode FROM Contact c WHERE c.Email IN ('${email}')`;
    },

    getContactsById(accountId: string):string {
      return `/services/data/v39.0/query/?q=SELECT c.Id, c.RecordTypeId, c.AccountId, c.Email, c.FirstName, c.LastName,c.Is_Cardholder__c, c.Corporate_Admin_User__c,\
      c.Corporate_Super_Admin__c, c.CurrencyIsoCode FROM Contact c WHERE c.Id IN ('${accountId}')`;
    },
    getContactsByEmailAndName(email: string, name: string):string {
      return `/services/data/v39.0/query/?q=SELECT c.Id, c.RecordTypeId, c.AccountId, c.Email, c.Name, c.FirstName, c.LastName,c.Is_Cardholder__c, c.Corporate_Admin_User__c,\
      c.Corporate_Super_Admin__c, c.CurrencyIsoCode FROM Contact c WHERE c.Email IN ('${email}') and c.Name IN ('${name}')`;
    },
    getAccountContactRelationshipsByAccountId(acccountId: string):string {
      return `/services/data/v39.0/query/?q=SELECT acr.Id, acr.AccountId, acr.ContactId FROM AccountContactRelation acr WHERE acr.accountId IN ('${acccountId}')`;
    },
    getPersonAccountDataByEmail(email: string):string {
      return `/services/data/v39.0/query/?q=SELECT c.RecordTypeId, c.Name, c.PersonEmail, c.Date_of_Birth__c, Sex__c, c.PersonMobilePhone, c.BillingAddress, c.Is_Cardholder__pc,\
      c.Corporate_Admin_User__pc FROM Account c WHERE c.PersonEmail IN ('${email}')`;
    }, 
    getCashMovementData(amount:string, count:number):string {
      return `/services/data/v39.0/query/?q=SELECT cm.Account__c, cm.Name, cm.Status__c, cm.Contract_Start_Date__c, cm.Value_Date__c, cm.CreatedById, cm.Payment_Type__c, 
      cm.Selected_Currency__c, cm.Amount__c, cm.Reference__c FROM Cash_Movement__c cm WHERE cm.Amount__c = ${amount} ORDER BY cm.Name DESC LIMIT ${count}`;
    }, 
    
    getDealsData(amountFrom:string, amountTo:string):string {
      return `/services/data/v39.0/query/?q=SELECT d.Account__c, d.Name, d.PFS_Ref__c, d.Sell_Currency__c, d.Sell_Amount__c, d.Rate__c,  d.Buy_Amount__c, d.Buy_Currency__c, 
      d.Deal_Status__c, d.Payment_From__c, d.Payment_To__c, d.Payment_Fee_Amount__c, d.Load_Card_Fee_Amount__c, d.Load_Fee_Amount__c, d.X2_0_Load_Fee_Amount__c, 
      d.FX__c, d.FX_Fee__c, d.FX_Fee_Amount__c FROM Deal__c d WHERE d.Sell_Amount__c=${amountFrom} AND d.Buy_Amount__c=${amountTo} ORDER BY d.Name DESC LIMIT 1`;
    }, 

    getBrokerDealsData(amountFrom:string, amountTo:string):string {
      return `/services/data/v39.0/query/?q=SELECT bd.Account__c, bd.Name, bd.Broker_Deal_Ref__c, bd.Sell_Currency__c, bd.Sell_Amount__c, bd.Rate__c,  
      bd.Buy_Amount__c, bd.Buy_Currency__c, bd.Payment_From__c, bd.Payment_To__c, bd.Status__c  FROM Broker_Deal__c bd 
      WHERE bd.Sell_Amount__c=${amountFrom} AND bd.Buy_Amount__c=${amountTo} ORDER BY bd.Name DESC LIMIT 1`;
    }, 
  },
  addLabel(enitityId: string, transacId: string):string {
    return `api/card/v1/Entity/${enitityId}/cardtransactions/${transacId}/labels`;
  },
  cardInfo(cardRefId: string):string {
    return `api/card/v1/Cards/${cardRefId}/detailsinfo`;
  },
  updateGroupLimits(cardGroupRefId: string):string {
    return `api/administration/v1/CardGroup/${cardGroupRefId}`;
  },
  removeUserRole: 'api/administration/v1/Users/removeUserRole',
  statementsTransaction: 'api/account/v1/Accounts/transactions/paging'
};
