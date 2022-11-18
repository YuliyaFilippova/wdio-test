export const DBQueries = {
  C6217Query(email:string):string {
    return `SELECT us.Id AS UserId, us.Email, pr.Id AS PrincipalId, tm.TeamCodeId, tp.PolicyCodeId, po.Description
  FROM authentication.AspNetUsers us
  LEFT JOIN authorization.Principal pr ON pr.Value = us.Id
  LEFT JOIN authorization.TeamMemberRequest tm ON tm.PrincipalId = pr.Id
  LEFT JOIN authorization.TeamPolicyRequest tp ON tp.TeamCodeId = tm.TeamCodeId
  LEFT JOIN authorization.PolicyRequest po ON po.CodeId = tp.PolicyCodeId
  WHERE EMAIL = '${email}';`;
  },

  C6369Query(email:string):string {
    return `SELECT us.Id AS UserId, us.Email, pr.Id AS PrincipalId, tm.TeamCodeId, tp.PolicyCodeId, po.Description
  FROM authentication.AspNetUsers us
  LEFT JOIN authorization.Principal pr ON pr.Value = us.Id
  LEFT JOIN authorization.TeamMemberRequest tm ON tm.PrincipalId = pr.Id
  LEFT JOIN authorization.TeamPolicyRequest tp ON tp.TeamCodeId = tm.TeamCodeId
  LEFT JOIN authorization.PolicyRequest po ON po.CodeId = tp.PolicyCodeId
  WHERE EMAIL = '${email}'`;
  },

  getUserPermissionsDataQuery(email:string):string {
    return `SELECT us.Id AS UserId, us.Email, pr.Id AS PrincipalId, tm.TeamCodeId, tp.PolicyCodeId, po.Description
    FROM authentication.AspNetUsers us
    LEFT JOIN authorization.Principal pr ON pr.Value = us.Id
    LEFT JOIN authorization.TeamMemberRequest tm ON tm.PrincipalId = pr.Id
    LEFT JOIN authorization.TeamPolicyRequest tp ON tp.TeamCodeId = tm.TeamCodeId
    LEFT JOIN authorization.PolicyRequest po ON po.CodeId = tp.PolicyCodeId
    WHERE EMAIL = '${email}'`;
  },

  getTermAndCondDateQuery(email:string):string {
    return `SELECT anu.Email,tac.DateTimeLastAccepted FROM authentication.AspNetUsers anu JOIN authentication.TermsAndConditions 
    tac ON tac.UserId = anu.Id WHERE email = '${email}'`;
  },

  C10813Query(name:string):string {
    return `SELECT pr.Id, pr.CompanyName,pr.DateCreation, pr.Status, pr.Flag, tac.DateTimeAccepted FROM application.Profile pr
     JOIN application.TermsAndConditions tac ON tac.ProfileId = pr.Id  WHERE CompanyName='${name}'`;
  },

  getEntityDateQuery(name:string):string {
    return `SELECT FlowStep, fs.IsCompleted, fs.StartDateTime, fs.EndDateTime, pr.Id AS ProfileId, pr.CompanyName
    FROM application.CacheFlowStep fs
    LEFT JOIN application.CacheFlow cf ON fs.CacheEntityId=cf.Id
    LEFT JOIN application.Profile pr ON CAST(pr.ProviderProfileId AS CHAR(36)) = CAST(cf.Value AS CHAR(36))
    WHERE CompanyName = '${name}'`;
  },

  getExternalId(name:string):string {
    return `SELECT cm.ExternalId
      FROM entityhierarchy.CardRequest cr
      JOIN entityhierarchy.CardCode cc ON cc.Id = cr.CodeId 
      JOIN adyen.CardIdMapping cm ON cm.CodeRefId = cc.Value
      WHERE cr.CardHolderName = '${name}'`;
  },

  getCardId(name:string) {
    return `SELECT cc.Value FROM entityhierarchy.CardRequest cr
    JOIN entityhierarchy.CardCode cc ON cc.Id = cr.CodeId WHERE cr.CardHolderName = '${name}'`
  },

  getEntityDetails(id: string): string {
    return `SELECT er.* FROM entityhierarchy.EntityRequest er
    JOIN entityhierarchy.EntityRequestState ers ON ers.RequestId = er.Id
    JOIN entityhierarchy.AccountRequest ar ON ar.EntityCodeId = er.CodeId
    JOIN entityhierarchy.AccountCode ac ON ac.Id = ar.CodeId
    JOIN entityhierarchy.AccountRequestState ars ON ars.RequestId = ar.Id
    WHERE ars.EndDateTime IS NULL AND ers.EndDateTime IS NULL 
    AND ac.Value = '${id}'`;
  },

  getParentEntityByName(name: string) {
    return `SELECT er.* FROM entityhierarchy.EntityRequest er
    JOIN entityhierarchy.EntityRequestState ers ON ers.RequestId = er.Id
    WHERE ers.EndDateTime IS NULL AND er.Name = '${name}';`
  },

  getCorporateDataQuery(name:string):string {
    return `SELECT cc.Value AS CodeRefId, cc.Id AS CodeId, cr.* FROM entityhierarchy.CorporateLegalEntityRequest cr JOIN
     entityhierarchy.CorporateLegalEntityCode cc ON  cc.Id = cr.codeId WHERE LegalName = '${name}'`;
  },

  getTransferInstrumentDataQuery(name:string):string {
    return `SELECT tir.* FROM entityhierarchy.TransferInstrumentRequest tir JOIN entityhierarchy.CorporateLegalEntityRequest cr ON
     tir.CorporateLegalEntityCodeId = cr.CodeId WHERE LegalName =  '${name}'`;
  },

  getIndividualDataQuery(id:string):string {
    return `SELECT ir.* FROM entityhierarchy.IndividualLegalEntityRequest ir JOIN entityhierarchy.IndividualLegalEntityCode ic ON ir.CodeId = ic.Id WHERE ic.Value = '${id}'`;
  },

  getIdentificationDataQuery(id:string):string {
    return `SELECT * FROM entityhierarchy.IndividualLegalEntityIdentificationRequest WHERE IndividualLegalEntityCodeRefId = '${id}'`;
  },

  getAccountHolderDataQuery(id:string):string {
    return `SELECT * FROM adyen.CorporateLegalEntityToAccountHolderMapping WHERE CorporateLegalEntityCodeRefId = '${id}'`;
  },

  C11473_1Query: `SELECT CompanyName, Status, flag, ProviderProfileId, Id FROM application.Profile WHERE Id = (SELECT MAX(Id) FROM application.Profile)`,
  C11473_2Query(num: number):string {
    return `SELECT CompanyName, Status, flag FROM application.Profile WHERE Id = ${num}`;
  },
  C11473_3Query(num: number):string {
    return `SELECT CompanyName, ProviderProfileId, Status, flag FROM application.Profile WHERE Id = ${num}`;
  },
  C11473_4Query(num: number):string {
    return `SELECT pr.CompanyName, pr.Status, pr.Flag, cr.CountryCode FROM application.Profile pr JOIN application.CustomerRequest cr ON cr.ProfileId=pr.Id
    WHERE pr.Id = ${num}`;
  },

  C11613_1Query(name:string):string {
    return `SELECT cle.LegalName AS CorporateName, clec.Value AS CorporateId, clem.ExternalId AS CorporateExternalId,
    cleah.AdyenAccountHolderId
    FROM entityhierarchy.CorporateLegalEntityRequest cle
    LEFT JOIN entityhierarchy.CorporateLegalEntityCode clec ON cle.CodeId = clec.Id
    LEFT JOIN adyen.CorporateLegalEntityIdMapping clem ON clem.RefId = clec.Value
    LEFT JOIN adyen.CorporateLegalEntityToAccountHolderMapping cleah ON cleah.CorporateLegalEntityCodeRefId = clec.Value
    WHERE cle.Id = (SELECT MAX(Id) FROM entityhierarchy.CorporateLegalEntityRequest cler WHERE cler.LegalName ='${name}')`;
  },

  C11613_2Query(name:string):string {
    return `SELECT * FROM application.Profile WHERE CompanyName='${name}'`;
  },
  C8137_USAStatuses_1(name:string):string {
    return `SELECT CompanyName, Flag, ExternalStatus  FROM application.Profile WHERE CompanyName = '${name}'`;
  },
  C9697Query: `SELECT Id FROM entityhierarchy.AccountRequest`,
  C8335(name:string):string {
    return `SELECT ProfileId, DateTimeEnd
    FROM application.ExternalKyc LEFT JOIN application.Profile
    ON application.ExternalKyc.ProfileId = application.Profile.Id
    WHERE CompanyName = '${name}';`;
  },

  getPaymentInstrumentGroupID(cardGroupCodeRefId: string):string {
    return `SELECT ExternalId, CodeRefId FROM adyen.CardGroupIdMapping WHERE CodeRefId = '${cardGroupCodeRefId}';`;
  },

  getPaymentInstrumentID(cardCodeRefId: string):string {
    return `SELECT ExternalId, CodeRefId FROM adyen.CardIdMapping WHERE CodeRefId = '${cardCodeRefId}';`;
  },

  updateFlagInDB(flag:string, id:number):string {
    return `UPDATE application.Profile SET Flag ='${flag}' WHERE  Id = ${id}`;
  },

  updateStatusInDBByName(status:string, flag:string, companyName: string):string {
    return `UPDATE application.Profile SET Status ='${status}', Flag ='${flag}' WHERE CompanyName = '${companyName}';`;
  },

  UKStatuses_Flags: `UPDATE application.Profile SET Flag = CASE
  WHEN Id=1086 THEN 'REQUIRES_DATA'
  WHEN Id=1091 THEN 'NEARING_EXPIRY'
  WHEN Id=2171 THEN 'AUTOMATING'
  WHEN Id=2172 THEN 'RECALCULATING_RISK'
  WHEN Id=2173 THEN 'REQUIRES_RISK_SCORE'
  WHEN Id=2174 THEN 'WAITING_ON_CHECKS'
  ELSE Flag END;`,

  USAStatuses_Flags: `UPDATE application.Profile SET Flag = CASE
  WHEN Id=2231 THEN 'WAITING_ON_ESCALATION'
  WHEN Id=2232 THEN 'RECALCULATING_RISK'
  WHEN Id=2233 THEN 'REQUIRES_RISK_SCORE'
  WHEN Id=2237 THEN 'AUTOMATING'
  WHEN Id=2240 THEN 'REQUIRES_DATA'
  WHEN Id=2241 THEN 'WAITING_ON_CHECKS'
  WHEN Id=2247 THEN 'NEARING_EXPIRY'
  ELSE Flag END;`,

  USAKYCStatuses_External: `UPDATE application.Profile SET ExternalStatus = CASE
  WHEN Id=2253 THEN 'ExternalKYCInProgress'
  WHEN Id=2252 THEN 'AdditionalInfoRequired'
  WHEN Id=2251 THEN 'ExternalKYCApproved'
  WHEN Id=2256 THEN 'ExternalKYCInProgress'
  WHEN Id=2255 THEN 'AdditionalInfoRequired'
  WHEN Id=2254 THEN 'ExternalKYCApproved'
  ELSE ExternalStatus END;`,

  USAKYCStatuses_Flags: `UPDATE application.Profile SET Flag = CASE
  WHEN Id=2253 THEN 'READY_FOR_DECISION'
  WHEN Id=2252 THEN 'READY_FOR_DECISION'
  WHEN Id=2251 THEN 'READY_FOR_DECISION'
  WHEN Id=2256 THEN 'WAITING_ON_COLLECTION_STEPS'
  WHEN Id=2255 THEN 'WAITING_ON_COLLECTION_STEPS'
  WHEN Id=2254 THEN 'WAITING_ON_COLLECTION_STEPS'
  ELSE Flag END;`,

  USAKYCStatuses_Statuses: `UPDATE application.Profile SET Status = CASE
  WHEN Id=2253 THEN 'APPLIED'
  WHEN Id=2252 THEN 'APPLIED'
  WHEN Id=2251 THEN 'APPLIED'
  WHEN Id=2256 THEN 'APPLIED'
  WHEN Id=2255 THEN 'APPLIED'
  WHEN Id=2254 THEN 'APPLIED'
  ELSE Status END;`,

  USAKYCStatuses_After: `UPDATE application.Profile SET Status = CASE
  WHEN Id=2253 THEN 'REJECTED'
  WHEN Id=2252 THEN 'REJECTED'
  WHEN Id=2251 THEN 'REJECTED'
  WHEN Id=2256 THEN 'REJECTED'
  WHEN Id=2255 THEN 'REJECTED'
  WHEN Id=2254 THEN 'REJECTED'
  ELSE Status END;`,

  getUserDataFromAuthenticationDBQuery(email:string):string {
    return `SELECT Email FROM authentication.AspNetUsers WHERE Email = '${email}';`;
  },

  updateUserAuthenticationDB(email:string):string {
    return `UPDATE authentication.AspNetUsers SET TwoFactorEnabled = 0 
    WHERE Email = '${email}';`;
  },

  getUserDataFromIdentityDBQuery(email:string):string {
    return `SELECT Email FROM identity.IdentityRequest WHERE Email = '${email}';`;
  },

  getCorporateLegalEntityDataQuery(name:string):string {
    return `SELECT cr.LegalName AS Name, 
    cr.RegisteredAddressPostalCode AS PostalCodeZipCode, cr.RegisteredAddressBuildingName AS BuildingName, cr.RegisteredAddressBuildingNumber AS BuildingNumber, 
    cr.RegisteredAddressFlatNumber AS FlatNumber, cr.RegisteredAddressStreet AS Street, cr.RegisteredAddressCity AS City, 
    cr.RegisteredAddressState AS State, cr.RegisteredAddressCountryCode AS Country, 
    cr.PhoneType, cr.PhoneCountryCode, cr.PhoneNumber, cr.Email
    FROM entityhierarchy.CorporateLegalEntityRequest cr 
    WHERE cr.Id IN (SELECT MAX(Id) FROM entityhierarchy.CorporateLegalEntityRequest WHERE LegalName = '${name}');`;
  },

  getParentEntityDataQuery(name:string):string {
    return `SELECT er.Name, er.PostalCodeZipCode, er.BuildingName, er.BuildingNumber, er.FlatNumber, er.Street, er.City, er.State, er.Country, er.PhoneType, er.PhoneNumber,
    er.Email, er.Subscription, er.CardStyle, er.CardGroupId
    FROM entityhierarchy.EntityRequest er
    WHERE er.CorporateLegalEntityCodeId IN 
    (SELECT CodeId from entityhierarchy.CorporateLegalEntityRequest WHERE LegalName = '${name}');`;
  },

  getFullCorporateDataQuery(name:string):string {
    return `SELECT cr.LegalName, 
    cr.RegisteredAddressPostalCode AS PostalCode, cr.RegisteredAddressBuildingNumber AS BuildingNumber, 
    cr.RegisteredAddressBuildingName AS BuildingName, cr.RegisteredAddressFlatNumber AS Flat,
    cr.RegisteredAddressStreet AS Street, cr.RegisteredAddressCity AS City, 
    cr.RegisteredAddressState AS State, cr.RegisteredAddressCountryCode AS Country, 
    cr.PhoneType, cr.PhoneCountryCode, cr.PhoneNumber, cr.Email, cc.Value AS LegalID
    FROM entityhierarchy.CorporateLegalEntityRequest cr 
    JOIN entityhierarchy.CorporateLegalEntityCode cc ON cc.Id = cr.CodeId
    WHERE cr.Id IN (SELECT MAX(Id) FROM entityhierarchy.CorporateLegalEntityRequest WHERE LegalName = '${name}');`;
  },
  getChildEntityDataQuery(name:string):string {
    return `SELECT er.Name, er.CardGroupId FROM entityhierarchy.EntityRequest er
    JOIN entityhierarchy.EntityHierarchy eh ON eh.EntityCodeId = er.CodeId
    WHERE eh.ParentEntityCodeId IN (SELECT CodeId FROM entityhierarchy.EntityRequest WHERE Name = '${name}') ORDER BY CardGroupId DESC LIMIT 1`;
  },

  getCardGroupLimitsQuery(name:string):string {
    return `SELECT gr.TypeId, gt.Value, gr.Amount  FROM entityhierarchy.CardGroupTransactionRuleRequest gr 
    LEFT JOIN entityhierarchy.EntityRequest er ON gr.CardGroupCodeId = er.CardGroupId
    LEFT JOIN entityhierarchy.EntityHierarchy eh ON eh.EntityCodeId = er.CodeId
    LEFT JOIN entityhierarchy.CardGroupTransactionRuleType gt ON gr.TypeId = gt.Id
    WHERE eh.ParentEntityCodeId IN (SELECT CodeId FROM entityhierarchy.EntityRequest WHERE Name = '${name}');`;
  },

  getAccountLimit(id: string) {
    return `SELECT cgm.ExternalId AS GroupExternalId, gr.Amount, gt.Value, gim.ExternalId AS RuleExternalId
    FROM entityhierarchy.EntityRequest er
    JOIN entityhierarchy.EntityRequestState ers ON ers.RequestId = er.Id
    JOIN entityhierarchy.AccountRequest ar ON ar.EntityCodeId = er.CodeId
    JOIN entityhierarchy.AccountCode ac ON ac.Id = ar.CodeId
    JOIN entityhierarchy.AccountRequestState ars ON ars.RequestId = ar.Id
    JOIN entityhierarchy.CardGroup cg ON cg.Id = er.CardGroupId
    JOIN adyen.CardGroupIdMapping cgm ON cgm.CodeRefId = cg.CardGroupId
    JOIN entityhierarchy.CardGroupTransactionRuleRequest gr ON gr.CardGroupCodeId = er.CardGroupId
    JOIN entityhierarchy.CardGroupTransactionRuleRequestState gs ON gs.RequestId = gr.Id
    LEFT JOIN entityhierarchy.CardGroupTransactionRuleType gt ON gr.TypeId = gt.Id
    LEFT JOIN entityhierarchy.CardGroupTransactionRuleCode gc ON gc.Id = gr.CodeId
    LEFT JOIN adyen.CardGroupTransactionRuleIdMapping gim ON gim.CodeRefId = gc.RefId
    WHERE ars.EndDateTime IS NULL AND ers.EndDateTime IS NULL AND gs.EndDateTime IS NULL
    AND ac.Value = '${id}'`;
  },

  getLastCardGroupLimitsQuery(name:string):string {
    return `SELECT gr.Id, gr.TypeId, gt.Value, gr.Amount, gr.LimitType, gj.CardGroupId
    FROM entityhierarchy.CardGroupTransactionRuleRequest gr
    LEFT JOIN entityhierarchy.EntityRequest er ON gr.CardGroupCodeId = er.CardGroupId
    LEFT JOIN entityhierarchy.CardGroupTransactionRuleType gt ON gr.TypeId = gt.Id
    LEFT JOIN entityhierarchy.CardGroup gj ON gr.CardGroupCodeId = gj.Id
    WHERE er.Name LIKE '${name}' ORDER BY gr.Id DESC LIMIT 5`;
  },

  getCardGroupLimitCorporate(name:string):string {
    return `SELECT er.CorporateGroupLimitType FROM entityhierarchy.EntityRequest er 
    JOIN entityhierarchy.EntityRequestState es ON es.RequestId = er.Id
    WHERE es.EndDateTime IS NULL AND er.Name = '${name}'`;
  },

  getOperatingAccountDataQuery(name:string):string {
    return `SELECT ar.Name, ar.AccountType FROM entityhierarchy.AccountRequest ar
    JOIN entityhierarchy.AccountLookup al ON al.AccountCodeId = ar.CodeId
    JOIN entityhierarchy.EntityRequest er ON er.CodeId = al.EntityCodeId
    WHERE er.Name = '${name}';`;
  },
  getCardGroupLimitsAccountQuery(name:string):string {
    return `SELECT gr.TypeId, gt.Value, gr.Amount  FROM entityhierarchy.CardGroupTransactionRuleRequest gr 
    LEFT JOIN entityhierarchy.EntityRequest er ON gr.CardGroupCodeId = er.CardGroupId
    LEFT JOIN entityhierarchy.CardGroupTransactionRuleType gt ON gr.TypeId = gt.Id
    WHERE er.Name = '${name}';`;
  },
  getNewAccountDataQuery(name:string):string {
    return `SELECT ar.Name, ar.AccountType FROM entityhierarchy.AccountRequest ar WHERE ar.Name = '${name}';`;
  },

  getAccountDetails(id: string):string {
    return `SELECT ar.Name, ar.AccountType, ar.IsPrimary, ar.IsLiable, ar.ExternalId
    FROM entityhierarchy.AccountRequest ar
    JOIN entityhierarchy.AccountCode ac ON ac.Id = ar.CodeId
    JOIN entityhierarchy.AccountRequestState ars ON ars.RequestId = ar.Id
    WHERE ars.EndDateTime IS NULL
    AND ac.Value = '${id}'`;
  },

  getAccountRefIdFromAccountNameQuery(accountName:string):string {
    return `SELECT ar.Name, ax.Value, al.CorporateLegalEntityCodeId, az.RefId FROM entityhierarchy.AccountRequest ar
    JOIN entityhierarchy.EntityRequest al ON ar.EntityCodeId = al.CodeId
    JOIN entityhierarchy.CorporateLegalEntityCode ax ON al.CorporateLegalEntityCodeId = ax.Id
    JOIN entityhierarchy.AccountCode az ON ar.CodeId = az.Id
    WHERE ar.Name ='${accountName}';`;
  },
  getCorporateRefIdFromNameQuery(corporateName:string):string {
    return `SELECT ar.Name, al.RefId FROM entityhierarchy.EntityRequest ar
    INNER JOIN entityhierarchy.EntityCode al ON ar.CodeId = al.Id
    WHERE ar.Name = '${corporateName}';`;
  },
  getAdyenCardTransactionRuleIdQuery(codeRefId: string):string {
    return `SELECT ExternalId
    FROM adyen.CardTransactionRuleIdMapping
    WHERE CodeRefId = '${codeRefId}';`;
  },
  getAdyenCardTransactionRulesIdQuery(codeRefId1: string, codeRefId2: string, codeRefId3: string, codeRefId4: string,
    codeRefId5: string):string {
    return `SELECT CodeRefId, ExternalId
    FROM adyen.CardTransactionRuleIdMapping
    WHERE CodeRefId IN ('${codeRefId1}', '${codeRefId2}', '${codeRefId3}', '${codeRefId4}', '${codeRefId5}');`;
  },

  getTransactionRulesForOwnCard(name:string):string {
    return `SELECT cr.CardHolderName, ctr.*, ctrm.*
    FROM entityhierarchy.CardRequest cr
    JOIN entityhierarchy.CardTransactionRuleRequest ctr ON ctr.CardCodeId = cr.CodeId
    JOIN entityhierarchy.CardTransactionRuleRequestState ctrs ON ctrs.RequestId = ctr.Id
    JOIN entityhierarchy.CardTransactionRuleCode ctrc ON ctr.CodeId = ctrc.Id
    JOIN adyen.CardTransactionRuleIdMapping ctrm ON ctrm.CodeRefId = ctrc.Value
    WHERE cr.CardHolderName = '${name}' AND ctrs.EndDateTime IS NULL`;
  },

  getCorporateLegalIdByLegalNameQuery(name: string):string {
    return `SELECT MAX(Id)
    FROM entityhierarchy.CorporateLegalEntityRequest
    WHERE LegalName = '${name}';`;
  },
  updateLegalNameInDB(id:number, name: any):string {
    return `UPDATE entityhierarchy.CorporateLegalEntityRequest SET LegalName = ${name} WHERE  Id = ${id}`;
  },
  getNumberOfUsersFromDBQuery: `SELECT COUNT(DISTINCT(CodeId)) FROM identity.IdentityRequest;`,
  getNumberOfCorporatesFromDBQuery: `SELECT DISTINCT er.CodeId, er.Name
  FROM entityhierarchy.EntityHierarchy eh 
  LEFT JOIN entityhierarchy.EntityRequest er
  ON eh.EntityCodeId = er.CodeId
  WHERE eh.ParentEntityCodeId = 0`,

  getAccountsIdFromEntityQuery(id: number):string {
    return `SELECT * FROM entityhierarchy.AccountLookup WHERE EntityCodeId = ${id};`;
  },
  getUserMainDataFromIndentityUS(email: string):string {
    return `SELECT * FROM identity.IdentityRequest WHERE Email = '${email}';`;
  },
  getUserLastDataFromIndentityUS(email: string):string {
    return `SELECT * FROM identity.IdentityRequest WHERE Email = '${email}' ORDER BY Id DESC LIMIT 1;`;
  },
  
  getUserFullDataFromIndentityUS(email: string):string {
    return `SELECT ar.Id, ar.AddressLine2, ar.City, ar.PostCode, ar.CountryNumericCode, az.Gender, az.FirstName, az.LastName,
    az.DateOfBirth, az.ContactPhoneNumber FROM identity.IdentityAddressRequest ar
    JOIN identity.IdentityAddressCode al ON ar.CodeId = al.Id
    JOIN identity.IdentityCode ax ON al.ContextId = ax.Value
    JOIN identity.IdentityRequest az ON ax.Id = az.CodeId
    WHERE ar.Id IN (SELECT MAX(Id) FROM identity.IdentityAddressRequest WHERE az.Email = '${email}') ORDER BY ar.Id DESC LIMIT 1;`;
  },

  getUserDataFromUniqueIdentity2(email: string):string{
    return `SELECT ir.Email, ir.FirstName, ir.LastName, ir.DisplayName, ir.DateOfBirth, ir.MobilePhoneNumber, ir.ContactPhoneNumber,
    ia.AddressLine1, ia.AddressLine2, ia.City, ia.State, ia.PostCode, cc.Name 
    FROM identityv2.IdentityRequest ir
    LEFT JOIN identityv2.IdentityAddressRequest ia ON ir.AddressCodeId = ia.CodeId
    LEFT JOIN identityv2.CountryCode cc ON cc.NumericCode = ia.CountryNumericCode
    LEFT JOIN identityv2.IdentityRequestState irs ON irs.RequestId = ir.Id
    LEFT JOIN identityv2.IdentityAddressRequestState ias ON ias.RequestId = ia.Id
    WHERE Email = '${email}'
    AND irs.EndDateTime IS NULL AND ias.EndDateTime IS NULL;`; 
  },

  getUserDataFromAspNetUsersDB(email: string):string {
    return `SELECT * FROM authentication.AspNetUsers WHERE Email = '${email}';`;
  },

  getUserIdFromAspNetUsersDB(email: string):string {
    return `SELECT id FROM authentication.AspNetUsers WHERE Email = '${email}';`;
  }, 

  getUserDataFromIdentityDB(email: string):string {
    return `SELECT * FROM identity.Users WHERE Email like '${email}';`;
  },

  checkNumberOfParentEntities(legalName: string):string {
    return `SELECT er.Name, er.PostalCodeZipCode, er.BuildingName, er.BuildingNumber, er.FlatNumber, er.Street, er.City, er.State, er.Country,
    er.PhoneType, er.PhoneNumber, er.Email, er.Subscription, er.CardStyle, er.CardGroupId
    FROM entityhierarchy.EntityRequest er
    WHERE er.CardGroupId IS NULL AND  er.CorporateLegalEntityCodeId IN
    (SELECT CodeId from entityhierarchy.CorporateLegalEntityRequest WHERE LegalName = '${legalName}');`;
  },
  getCorporateAccountByIdQuery(id: number):string {
    return `SELECT ar.Name FROM entityhierarchy.AccountLookup al
    JOIN entityhierarchy.AccountRequest ar ON ar.CodeId = al.AccountCodeId
    WHERE al.EntityCodeId = ${id} AND ar.AccountType = 'Operating';`;
  },
  getCorporateAccountByNameQuery(corpName: string):string {
    return `SELECT distinct ar.Name, ar.AccountType FROM entityhierarchy.AccountLookup al 
    JOIN entityhierarchy.AccountRequest ar ON ar.CodeId = al.AccountCodeId 
    JOIN entityhierarchy.EntityRequest er ON er.CodeId = al.EntityCodeId
    WHERE er.Name LIKE '${corpName}' AND ar.AccountType = 'Operating';`;
  },
  getTransactionData(transferDate:string, amount:number):string {
    return `SELECT dr.Amount AS ToAmount, dr.ID, dr.CurrencyCode, dr.Reference, dt.Value,
    dr.SourceAccountName, dr.SourceAccountCodeRefId, ams.ExternalId, ahs.AdyenAccountHolderId,
    pr.TargetAccountName, pr.TargetAccountCodeRefId, amt.ExternalId AS ToExternalId, aht.AdyenAccountHolderId AS ToAdyenAccountHolderId
    
    FROM transaction.PaymentTransactionRequest pr
    JOIN transaction.PaymentTransactionRequestTag pt ON pt.RequestId = pr.Id
    JOIN transaction.DepositTransactionRequestTag dt ON dt.Value = pt.Value
    JOIN transaction.DepositTransactionRequest dr ON dt.RequestId = dr.Id
    
    JOIN adyen.AccountIdMapping ams ON ams.RefId = dr.SourceAccountCodeRefId
    JOIN entityhierarchy.AccountCode acs ON acs.Value = dr.SourceAccountCodeRefId
    JOIN entityhierarchy.AccountLookup als ON als.AccountCodeId = acs.Id
    JOIN entityhierarchy.EntityCode ecs ON ecs.Id = als.EntityCodeId
    JOIN adyen.EntityToAccountHolderMapping ahs ON ahs.CodeRefId = ecs.Value
    
    JOIN adyen.AccountIdMapping amt ON amt.RefId = pr.TargetAccountCodeRefId
    JOIN entityhierarchy.AccountCode act ON act.Value = pr.TargetAccountCodeRefId
    JOIN entityhierarchy.AccountLookup alt ON alt.AccountCodeId = act.Id
    JOIN entityhierarchy.EntityCode ect ON ect.Id = alt.EntityCodeId
    JOIN adyen.EntityToAccountHolderMapping aht ON aht.CodeRefId = ect.Value

    WHERE dr.TradeDate = '${transferDate}' AND dr.Amount = ${amount}
    GROUP BY dr.ID;`;
  },

  getCreatedTransactionData(transferDate:string, targetCode: string):string {
    return `SELECT pt.Value AS ExternalId, pr.Id, pt.StartDateTime, pr.Amount
    FROM transaction.PaymentTransactionRequest pr
    LEFT JOIN transaction.PaymentTransactionRequestTag pt ON pt.RequestId = pr.Id 
    WHERE pr.TargetPayeeCodeRefId IS ${targetCode} NULL AND pr.TradeDate >= '${transferDate}'
    ORDER BY pr.Id DESC`;
  },

  getCreatedTransactionValue(transferDate:string, amount: number):string {
    return `SELECT pr.Id, pr.TargetAccountName, pr.Amount, pt.StartDateTime, pt.Value
    FROM transaction.PaymentTransactionRequest pr
    JOIN transaction.PaymentTransactionRequestTag pt ON pr.id = pt.requestId 
    WHERE pt.StartDateTime >= ${transferDate} AND pr.Amount = ${amount}
    ORDER BY pr.Id DESC`;
  },

  getTransferTransactionTag(id: number):string {
    return `select t2.value from transaction.PaymentTransactionRequest t1
    JOIN transaction.PaymentTransactionRequestTag t2 
    ON t1.id = t2.requestId
    WHERE t2.RequestId = ${id}`;
  },

  getDataOfLastTransaction: `select * from transaction.PaymentTransactionRequest
    order by id DESC limit 1`,

  getCardDataForAdyenQuery(accountRefId: string):string {
    return `SELECT t2.Id, t2.EnabledValue, t1.RefId, t3.ExternalId FROM entityhierarchy.CardTransactionRuleRequest t2
    RIGHT JOIN entityhierarchy.CardTransactionRuleCode t1
    ON t1.Id = t2.codeId
    RIGHT JOIN adyen.CardTransactionRuleIdMapping t3
    ON t1.Value = t3.CodeRefId
    WHERE (t1.RefId LIKE '${accountRefId}')
    AND t2.Id IN (SELECT MAX(Id) FROM entityhierarchy.CardTransactionRuleRequest)`;
  },
  getCardCodeRefIdQuery(cardHolderName: string):string {
    return `SELECT az.Id, az.Value FROM entityhierarchy.CardRequest ar
    INNER JOIN entityhierarchy.CardTransactionRuleRequest al ON ar.CodeId = al.CardCodeId
  INNER JOIN entityhierarchy.CardTransactionRuleCode az ON al.CodeId = az.Id
   WHERE ar.CardHolderName ='${cardHolderName}' ORDER BY az.Id DESC LIMIT 1`;
  },
  getRelatedAccountsQuery(id: number):string {
    return `SELECT ar.Name FROM entityhierarchy.AccountLookup al
    JOIN entityhierarchy.AccountRequest ar ON ar.CodeId = al.AccountCodeId
    WHERE al.EntityCodeId = ${id}`;
  },
  getAdyenCardIdQuery(codeRefId: string):string {
    return `SELECT ExternalId FROM adyen.CardIdMapping WHERE CodeRefId = '${codeRefId}';`;
  },
  getDeliveryAddressQuery(accountName: string):string {
    return `SELECT * FROM entityhierarchy.DeliveryAddressRequest dar WHERE dar.EntityCodeId IN 
    (SELECT CodeId FROM entityhierarchy.EntityRequest er WHERE er.Name = '${accountName}')`;
  },
  getLastDeliveryAddressQuery(accountName: string):string {
    return `SELECT * FROM entityhierarchy.DeliveryAddressRequest dar WHERE dar.EntityCodeId IN 
    (SELECT CodeId FROM entityhierarchy.EntityRequest er WHERE er.Name = '${accountName}') ORDER BY CodeId DESC LIMIT 1`;
  },
  getAddedDeliveryAddressQuery(accountName: string, firstName: string):string {
    return `SELECT * FROM entityhierarchy.DeliveryAddressRequest dar WHERE dar.EntityCodeId IN 
    (SELECT CodeId FROM entityhierarchy.EntityRequest er WHERE er.Name = '${accountName}') 
    AND FirstName = '${firstName}';`;
  },
  getCardTransactionDataByExternalIdQuery(externalId: string):string {
    return `SELECT 
    tj.TransactionId,
    eah.AdyenAccountHolderId,
    aim.ExternalId AS BalanceAccount,
    tt.Value AS Direction,
    tj.ActualState,
    tjd.IsCleared,
    tjd.IsDeclined,
    tjd.IsCancelled,
    tjd.IsFee,
    ctr.ExternalId AS AuthorisationPSPReference,
    trt.Value AS PaymentInstrumentType,
    tjd.CardCodeRefId AS PaymentCardId,
    cim.ExternalId AS PaymentReference,
    tj.DateTime AS AuthorisationDate,
    tjd.OriginalCurrencyCode,
    tjd.OriginalAmount,
    tj.CurrencyCode AS InstructedCurrency,
    tj.Amount AS InstructedAmount,
    tjd.DeclineCurrencyCode,
    tjd.DeclineAmount,
    tjd.AuthorizationCode AS AuthCode,
    ctpt.Value AS ShopperInteraction,
    tjd.MerchantName AS CounterpartyName,
    tjd.MerchantCity AS CounterpartyCity,
    tjd.MerchantCountryCode AS CounterpartyCountry,
    tjd.Mcc,
    tj.Description
    FROM transaction.TradeDateActualJournal tj
    LEFT JOIN adyen.AccountIdMapping aim ON  tj.AccountCodeRefId = aim.RefId
    LEFT JOIN transaction.TradeDateActualCardTransactionDetail tjd ON tj.Id = tjd.JournalId
    LEFT JOIN transaction.TransactionType tt ON tj.TransactionTypeId = tt.Id
    LEFT JOIN adyen.CardIdMapping cim ON cim.CodeRefId = tjd.CardCodeRefId
    LEFT JOIN entityhierarchy.AccountCode ac ON ac.Value = tj.AccountCodeRefId
    LEFT JOIN entityhierarchy.AccountRequest ar ON ar.CodeId = ac.Id
    LEFT JOIN entityhierarchy.EntityCode ec ON ec.Id = ar.EntityCodeId
    LEFT JOIN adyen.EntityToAccountHolderMapping eah ON eah.CodeRefId = ec.Value
    LEFT JOIN transaction.TransactionRequestType trt ON tj.TypeId = trt.Id
    LEFT JOIN transaction.CardTransactionProcessingType ctpt ON tjd.ProcessingTypeId = ctpt.Id
    LEFT JOIN transaction.CardTransactionRequest ctr ON ctr.Id = tj.TransactionId
    WHERE ctr.ExternalId ='${externalId}' AND trt.Value = 'Card'
    ORDER BY tj.TransactionId DESC LIMIT 1`;
  },

  getTransactionRefId(paymentId:string): string {
    return `SELECT tj.RefId FROM transaction.TradeDateActualJournal tj 
    LEFT JOIN transaction.CardTransactionRequest ctr ON ctr.Id = tj.TransactionId
    WHERE ctr.ExternalId = '${paymentId}'`;
  },

  getSelectedAccountTransactionDataByExternalIdQuery(externalId: string):string {
    return `SELECT 
    tj.TransactionId,
    eah.AdyenAccountHolderId,
    aim.ExternalId AS BalanceAccount,
    tt.Value AS Direction,
    tj.ActualState,
    dtt.Value AS AuthorisationPSPReferenceDeposit,
    ptt.Value AS AuthorisationPSPReferencePayment,
    trt.Value AS PaymentInstrumentType,
    tj.DateTime AS AuthorisationDate,
    tj.CurrencyCode AS InstructedCurrency,
    tj.Amount AS InstructedAmount,
    tj.Description
    FROM transaction.TradeDateActualJournal tj
    LEFT JOIN adyen.AccountIdMapping aim ON  tj.AccountCodeRefId = aim.RefId
    LEFT JOIN transaction.TransactionType tt ON tj.TransactionTypeId = tt.Id
    LEFT JOIN entityhierarchy.AccountCode ac ON ac.Value = tj.AccountCodeRefId
    LEFT JOIN entityhierarchy.AccountRequest ar ON ar.CodeId = ac.Id
    LEFT JOIN entityhierarchy.EntityCode ec ON ec.Id = ar.EntityCodeId
    LEFT JOIN adyen.EntityToAccountHolderMapping eah ON eah.CodeRefId = ec.Value
    LEFT JOIN transaction.TransactionRequestType trt ON tj.TypeId = trt.Id
    LEFT JOIN transaction.DepositTransactionRequestTag dtt ON dtt.RequestId = tj.TransactionId
    LEFT JOIN transaction.PaymentTransactionRequestTag ptt ON ptt.RequestId = tj.TransactionId
    WHERE (dtt.Value = '${externalId}' OR ptt.Value = '${externalId}')
    AND (trt.Value = 'Payment' OR trt.Value = 'Deposit')
    ORDER BY AuthorisationDate DESC LIMIT 1`;
  },
  getReconciliationDataQuery(transactionId: string):string {
    return `SELECT * FROM reconciliation.ReconciliationItem  WHERE TransactionId = '${transactionId}'`;
  },
  getListOfAccountsQuery(corporateName: string, type: string):string {
    return `SELECT DISTINCT ar.Name, ar.AccountType 
    FROM entityhierarchy.AccountLookup al 
    JOIN entityhierarchy.AccountRequest ar ON ar.CodeId = al.AccountCodeId 
    JOIN entityhierarchy.EntityRequest er ON er.CodeId = al.EntityCodeId
    WHERE er.Name LIKE '${corporateName}' AND ar.AccountType = '${type}';`;
  },
  getCardDataByEmbossNameQuery(embossName: string):string {
    return `SELECT * FROM entityhierarchy.CardRequest
    WHERE CardHolderName LIKE '${embossName}'`;
  },
  getCardDataByCardNameQuery(cardName: string):string {
    return `SELECT t1.CodeId, t1.CardHolderName, t1.CardStatus, t2.Value, t3.ExternalId FROM entityhierarchy.CardRequest t1
    RIGHT JOIN entityhierarchy.CardCode t2 ON t1.CodeId = t2.Id
    RIGHT JOIN adyen.CardIdMapping t3 ON t2.Value = t3.CodeRefId
    WHERE t1.CardHolderName LIKE '${cardName}'`;
  },
  getUserFromIdentityUS(email: string):string {
    return `SELECT ir.Id, ir.Email, ir.DisplayName, ir.FirstName, ir.LastName, ir.Gender, ir.ContactPhoneNumber, ir.DateOfBirth,
    iar.AddressLine1, iar.AddressLine2, iar.AddressLine3, iar.AddressLine4, iar.City, iar.County, iar.State, iar.PostCode, iar.CountryNumericCode,
    cc.Name, irs.EndDateTime
    FROM identity.IdentityRequest ir 
    LEFT JOIN identity.IdentityCode ic ON ic.Id = ir.CodeId 
    LEFT JOIN identity.IdentityAddressCode iac ON iac.ContextId = ic.Value 
    LEFT JOIN identity.IdentityAddressRequest iar ON iar.CodeId = iac.Id 
    LEFT JOIN identity.CountryCode cc ON cc.NumericCode = iar.CountryNumericCode
    LEFT JOIN identity.IdentityRequestState irs ON irs.RequestId = ir.Id
    LEFT JOIN identity.IdentityAddressRequestState iars ON iars.RequestId = iar.Id 
    WHERE ir.Email like '${email}'AND irs.EndDateTime IS NULL AND iars.EndDateTime IS NULL;`;
  },

  getCardLimitsQuery(cardHolderName: string):string {
    return `SELECT gr.Id, gr.TypeId, gt.Value, gr.AmountValue, gj.RefId
    FROM entityhierarchy.CardTransactionRuleRequest gr
    LEFT JOIN entityhierarchy.CardRequest er ON gr.CardCodeId = er.CodeId
    LEFT JOIN entityhierarchy.CardTransactionRuleType gt ON gr.TypeId = gt.Id
    LEFT JOIN entityhierarchy.CardCode gj ON gr.CardCodeId = gj.Id
    WHERE er.CardHolderName LIKE '${cardHolderName}' ORDER BY gr.Id DESC LIMIT 1`;
  },

  checkThatUserExistInMSSQLDB(email: string):string {
    return `SELECT * FROM RTF.dbo.tblCardHolderIdEmail WHERE Email = '${email}';`;
  },

  getPhoneNumberAspNetUsersDB(email: string):string {
    return `SELECT PhoneNumber FROM authentication.AspNetUsers WHERE Email = '${email}';`;
  },

  getPhoneNumberIdentityv2DB(email: string):string {
    return `SELECT ContactPhoneNumber, MobilePhoneNumber FROM identityv2.IdentityRequest
    WHERE Email = '${email}'
    ORDER BY Id desc limit 1;`;
  },

  getPhoneNumberUSIdentityDB(email: string):string {
    return `SELECT ContactPhoneNumber FROM identity.IdentityRequest
    WHERE Email = '${email}'
    ORDER BY Id DESC LIMIT 1;`;
  },

  getPhoneNumberUKIdentityDB(email: string):string {
    return `SELECT PhoneNumber FROM identity.Users WHERE Email = '${email}';`;
  },

  getAccountsStatistics(entityCode: string): string {
    return `SELECT ar.AccountType, COUNT(*)
      FROM entityhierarchy.AccountRequest ar
      JOIN entityhierarchy.AccountRequestState ars ON ars.RequestId = ar.Id
      JOIN entityhierarchy.AccountLookup al ON al.AccountCodeId = ar.CodeId
      JOIN entityhierarchy.EntityCode ec ON ec.Id = al.EntityCodeId
      WHERE ec.Value = '${entityCode}' AND ars.EndDateTime IS NULL AND ars.ActionId != 3
      GROUP BY ar.AccountType`;
  },

  getCardsStatistics(entityCode: string): string {
    return `SELECT ar.AccountType, COUNT(*)
      FROM entityhierarchy.CardRequest cr
      JOIN entityhierarchy.CardRequestState crs ON crs.RequestId = cr.Id
      JOIN entityhierarchy.AccountRequest ar ON ar.CodeId = cr.AccountCodeId
      JOIN entityhierarchy.AccountRequestState ars ON ars.RequestId = ar.Id
      JOIN entityhierarchy.AccountLookup al ON al.AccountCodeId = ar.CodeId
      JOIN entityhierarchy.EntityCode ec ON ec.Id = al.EntityCodeId
      WHERE ec.Value = '${entityCode}' AND crs.EndDateTime IS NULL AND ars.EndDateTime IS NULL AND cr.CardStatus != 'Closed'
      GROUP BY ar.AccountType;`;
  }
};