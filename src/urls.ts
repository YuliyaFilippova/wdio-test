//export const env = 'qa'; //'dev'

export const URLs = {
    rtfUrl: 'https://rtflistener-q001.centtrip.technology', // dev - https://rtflistener-d001.centtrip.technology
    baseUrl: `https://application-${process.env.ENV}.centtrip.com/`,
    authUrl: `https://auth-${process.env.ENV}.centtrip.com`,
    baseUrlUSA: `https://application-${process.env.ENV}.centtrip.com/usa`,
    USAPortalURL: `https://account.${process.env.ENV}-us.centtrip.com/`,
    UKPortalURL: `https://account-${process.env.ENV}.centtrip.com/`,
    ExpensesURL: `https://app-${process.env.ENV}.centtrip.com/expenses`,
    apiPassfortBaseUrl: `https://api.passfort.com`,
    apiAdyenUrl: `https://balanceplatform-api-test.adyen.com`,
    apiEntityHierarchyUrl: `https://entityhierarchy.${process.env.ENV}-us.centtrip.systems:5001`,
    apiTransactionUrl: `https://transaction.${process.env.ENV}-us.centtrip.systems:5002`,
    apiAdyenLocalUrl: `https://adyen.${process.env.ENV}-us.centtrip.systems`,
    apiAdyenNotificationUrl: `https://adyen-notification.${process.env.ENV}-us.centtrip.com`,
    mainMail: 'https://harakirimail.com/',
    recieveSMSUSA: 'https://www.receivesms.co/us-phone-numbers/us/',
    recieveSMSUK: 'https://www.receivesms.co/uk-phone-numbers/gb/'
};
