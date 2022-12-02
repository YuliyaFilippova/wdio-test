import { RandomGenerator } from "../core/utils/randomGenerator";
import { other } from "./other";
const path = require('path');

export const downloadsExpPath = path.resolve(__dirname, './tmp/').replace(/\\/g, '/');
export const pathToUploadPfsCardCreation = `/src/testData/tmp/`;
export const Password = 'Password1!';

//QA
let userDataIF = {
  CenttripAdminUSA: 'e.halynia@andersenlab.com',
  CenttripAdminiUK: 'auto.centtripadmin.qa@harakirimail.com',
  SuperAdminUK: 'superadminqa02@harakirimail.com',
  resourceId: 'e122f379-b4be-455e-a0d0-54d5dbe0679c', //AMC Networks
  adminFullName: 'Eduard Halynia',
  chAccountUS: {
    corporate: 'Ander Corporate',
    operAccount: 'Minsk'
  },
  chAccountUS2: {
    corporate: 'Omaha',
    operAccount: 'Summit'
  },
  accountUK: 'Corporate AQA DC:19902037',
  accountUSA: 'Aiken',

  corpAdminWithoutAddress: {
    email: 'cusa.clutter.ca@harakirimail.com',
    phoneNumberNew: RandomGenerator.numbers(10) + ''
  },

  corpAdminUK: {
    email: 'corpukadminqa11@harakirimail.com',
    phoneNumberNew: RandomGenerator.numbers(10) + ''
  },

  cardholderUK: {
    email: 'change.mobile@harakirimail.com',
    phoneNumberNew: RandomGenerator.numbers(10) + ''
  },

  corpAdminUSUK: {
    email: 'usa.uk.corp.admin.qa@harakirimail.com',
    phoneNumberNew: RandomGenerator.numbers(10) + ''
  },

  cardholderUSUK: {
    email: 'usa.uk.card.centtrip.qa@harakirimail.com',
    phoneNumberNew: RandomGenerator.numbers(10) + ''
  },

};

//DEV
if (process.env.ENV === 'dev') {
  userDataIF = {
    CenttripAdminUSA: 'megaadmin@harakirimail.com',
    CenttripAdminiUK: 'y.philippova@andersenlab.com',
    SuperAdminUK: 'superadmin05@harakirimail.com',
    resourceId: 'dd16eb6a-49ac-492d-a099-745b091eaa91', //Tesla?
    adminFullName: 'Mega Admin',
    chAccountUS: {
      corporate: 'Udemy',
      operAccount: 'Learning'
    },
    chAccountUS2: {
      corporate: 'Light',
      operAccount: 'Li_standard'
    },
    accountUK: 'Ampersand & Ampersand DC:1000471',
    accountUSA: 'Tesla',
    corpAdminWithoutAddress: {
      email: 'phone_aqa02@harakirimail.com',
      phoneNumberNew: RandomGenerator.numbers(10) + ''
    },
    corpAdminUK: {
      email: 'afex.corpadmin.dev@harakirimail.com',
      phoneNumberNew: RandomGenerator.numbers(10) + ''
    },

    cardholderUK: {
      email: 'corpuser57@harakirimail.com',
      phoneNumberNew: RandomGenerator.numbers(10) + ''
    },
    corpAdminUSUK: {
      email: 'usa.uk.corp.admin.dev@harakirimail.com',
      phoneNumberNew: RandomGenerator.numbers(10) + ''
    },
    cardholderUSUK: {
      email: 'usa.uk.card.centtrip.dev@harakirimail.com',
      phoneNumberNew: RandomGenerator.numbers(10) + ''
    },
  }
};

export default userDataIF;

export const UserIF = {

  limitsNum: 100000,
  phoneCodeUSA: '001 (US)',
  phoneCodeUK: '0044 (GB)',
  countryUK: 'United Kingdom',
  countryUSA: 'United States of America',
  password: 'Password1!',

  corpAdminAllFields: {
    firstName: 'First' + RandomGenerator.lowerCaseText(4),
    lastName: 'Last' + RandomGenerator.lowerCaseText(4),
    email: RandomGenerator.generateRandEmail('_ca_usa1.1@harakirimail.com'),
    gender: 'male',
    city: 'CityUSAA',
    street: 'StreetUSAA',
    postalCode: '10001',
    phoneNumber: '2243359185',
    state: 'California',
    dob: '1994-04-08T00:00:00',
    dobDB: 'Fri Apr 08 1994',
    dobDynamo: '08/04/1994'
  },

  corpAdminOnlyRequiredFields: {
    firstName: 'First' + RandomGenerator.lowerCaseText(4),
    lastName: 'Last' + RandomGenerator.lowerCaseText(4),
    email: RandomGenerator.generateRandEmail('_ca_usa1.2@harakirimail.com'),
    phoneNumber: '2243359185',
    dob: '1994-04-08T00:00:00',
    dobDB: 'Fri Apr 08 1994',
    dobDynamo: '08/04/1994'
  },

  cardholder1_3: {
    firstName: 'First' + RandomGenerator.lowerCaseText(3),
    lastName: 'Last' + RandomGenerator.lowerCaseText(3),
    email: RandomGenerator.generateRandEmail('_ch_usa1.3@harakirimail.com'),
    birthDateDay: '4',
    birthDateMonth: '1',
    birthDateYear: '1994',
    dob: 'Tue Jan 04 1994',
    phoneNumber: '7152606705'
  },

  corpAdmin1_4: {
    firstName: 'FirstUSAA',
    lastName: 'LastUSAA',
    email: RandomGenerator.generateRandEmail('_ca_usa1.4@harakirimail.com'),
    phoneNumber: '7152606705',
    dob: '1981-01-01T00:00:00',
    dobDB: 'Thu Jan 01 1981',
    gender: 'Male',
    street: 'Street',
    city: 'Sacramento',
    state: 'California',
    postalCode: '10012',
  },

  cardholder4: {
    firstName: 'FirstUSAD',
    lastName: 'LastUSAD',
    phoneNumber: '7152606788',
    dob: '1982-02-02T00:00:00',
    dobDB: 'Fri Jan 02 1981',
    birthDateDay: '2',
    birthDateMonth: '1',
    birthDateYear: '1981',
  },

  emailSuperAdmin: RandomGenerator.generateRandEmail('_csa_uk2.1@harakirimail.com'),
  emailCorporateAdmin: RandomGenerator.generateRandEmail('_ca_uk2.2@harakirimail.com'),
  emailCardholder: RandomGenerator.generateRandEmail('_ch_uk2.5@harakirimail.com'),
  emailCorpAdminUSUK: RandomGenerator.generateRandEmail('_ca_usuk@harakirimail.com'),
  emailCardholderUSCorpAdminUK: RandomGenerator.generateRandEmail('_ch_usuk@harakirimail.com'),
  emailCorpAdminUKUSA: RandomGenerator.generateRandEmail('_ca_ukusa@harakirimail.com'),
  emailCorpAdminUKUSARequired: RandomGenerator.generateRandEmail('_ca_ukusarq@harakirimail.com'),
  emailCardholderUKUSA: RandomGenerator.generateRandEmail('_ch_ukusa@harakirimail.com'),
  emailUpdateCorpAdminAll: RandomGenerator.generateRandEmail('_causa_u1.1@harakirimail.com'),
  emailUpdateCorpAdminAll2: RandomGenerator.generateRandEmail('_causa_u1.2@harakirimail.com'),
  emailUpdateCorpAdminRequired: RandomGenerator.generateRandEmail('_causa_u1.3@harakirimail.com'),

  superAdminUK: {
    firstName: 'FirstUKE',
    lastName: 'LastUKE',
    gender: 'Female',
    city: 'CityUKE',
    address1: 'AddLine1UKE',
    address2: 'AddLine2UKE',
    postalCode: '11105',
    phoneNumber: '2099216581',
    homeNumber: '2099216581',
    dob: '25/05/1985',
    dobDB: 'Sat May 25 1985',
    title: 'Mrs.'
  },

  corpAdminUK: {
    firstName: 'FirstUKF',
    lastName: 'LastUKF',
    gender: 'Female',
    city: 'CityUKF',
    address1: 'AddLine1UKF',
    address2: 'AddLine2UKF',
    postalCode: 'DA77 6TG',
    phoneNumber: '7883196637',
    homeNumber: '7883196637',
    dob: '26/06/1986',
    dobDB: 'Thu Jun 26 1986',
    dobAPI: '1986-06-26T00:00:00',
    title: 'Mrs.'
  },

  corpAdminUnderCSA: {
    firstName: 'FirstUKG' + RandomGenerator.lowerCaseText(5),
    lastName: 'LastUKG' + RandomGenerator.lowerCaseText(5),
    email: RandomGenerator.generateRandEmail('_ca_uk2.3@harakirimail.com'),
    city: 'CityUKG',
    address1: 'AddLine1UKG',
    address2: 'AddLine2UKG',
    postalCode: 'DA77 7TG',
    phoneNumber: '7152606705',
    homeNumber: '7152606705',
    dob: `01/${other.monthForIFNum}/2004`,
    dobDB: `${other.monthForIFChar} 01 2004`
  },

  corpAdmin2_6: {
    firstName: 'First05' + RandomGenerator.lowerCaseText(5),
    lastName: 'Last05' + RandomGenerator.lowerCaseText(5),
    email: RandomGenerator.generateRandEmail('_ca_uk2.6@harakirimail.com'),
    title: 'Mrs.',
    gender: 'Male',
    city: 'CityUKG',
    address1: 'AddLine105',
    address2: 'AddLine205',
    postalCode: 'DA77 7TG',
    phoneNumber: '7152401705',
    homeNumber: '7152401705',
    dob: `02/${other.monthForIFNum}/1992`,
    dobDB: `${other.monthForIFChar} 02 1992`
  },

  cardholderUK: {
    firstName: 'CARDUK',
    lastName: 'HOLDERUK',
    firstNameSF: 'CardUK',
    lastNameSF: 'HolderUK',
    gender: 'female',
    city: 'LYMINSTER',
    citySF: 'Lyminster',
    county: 'SOUTH CRESCENT',
    address1: '34 EATON',
    address1SF: '34 Eaton',
    address2: 'SOCON',
    address2SF: 'Socon',
    postalCode: 'BN17 0DB',
    phoneNumber: '7418600415',
    dob: '10/10/1980',
    dobDB: 'Fri Oct 10 1980',
    dobSF: '1980-10-10'
  },

  cardholderUKEdit: {
    firstName: 'CARDUKS',
    lastName: 'HOLDERUKS',
    firstNameSF: 'CardUKS',
    lastNameSF: 'HolderUKS',
    country: 'United States',
    city: 'LYMINSTERS',
    citySF: 'Lyminsters',
    county: 'NORTH CRESCENT',
    address1: '37 EATON',
    address1SF: '37 Eaton',
    address2: 'SOCONS',
    address2SF: 'Socons',
    postalCode: '15238',
    phoneNumber: '2014222730',
    dob: '21/02/2001',
    dobDB: 'Wed Feb 21 2001',
    dobSF: '2001-02-21'
  },

  cardholderUKEdit6: {
    phoneNumber: '7418600237',
    dob: '24/04/2004',
    dobDB: 'Sat Apr 24 2004',
    dobSF: '2004-04-24'
  },

  corpAdminAP: {
    firstName: 'FirstAP' + RandomGenerator.lowerCaseText(4),
    lastName: 'LastAP' + RandomGenerator.lowerCaseText(4),
    gender: 'male',
    city: 'CityUSAA',
    street: 'StreetUSAA',
    postalCode: '10001',
    phoneNumber: '243359185',
    state: 'California',
    dob: 'Fri Apr 08 1994'
  },

  corpAdminEdited: {
    firstName: 'FirstEE' + RandomGenerator.lowerCaseText(5),
    lastName: 'LastEE' + RandomGenerator.lowerCaseText(5),
    phoneNumber: '2873359401',
    city: 'CityUSEE' + RandomGenerator.lowerCaseText(3),
    street: 'StreetUSEE' + RandomGenerator.lowerCaseText(3),
    state: 'California',
    postalCode: '10011',
    dob: '1982-02-14T00:00:00',
    dobDB: 'Sun Feb 14 1982',
    dobDynamo: '14/02/1982',
    gender: 'Female'
  },

  superAdminAct: {
    firstName: 'FirstUKCSA' + RandomGenerator.lowerCaseText(5),
    lastName: 'LastUKCSA' + RandomGenerator.lowerCaseText(5),
    gender: 'Male',
    city: 'CityUKO',
    address1: 'AddLine1UKCSA',
    address2: 'AddLine2UKCSA',
    postalCode: '11115',
    phoneNumber: '7883200468',
    homeNumber: '7883200468',
    dob: '01/01/1981',
    dobDB: 'Wed Jan 01 1981',
    title: 'Mr.'
  },

  corporateAdminAct: {
    firstName: 'FirstUKQCA' + RandomGenerator.lowerCaseText(5),
    lastName: 'LastUKQCA' + RandomGenerator.lowerCaseText(5),
    gender: 'Male',
    city: 'CityUKQ',
    address1: 'AddLine1UKQCA',
    address2: 'AddLine2UKQCA',
    postalCode: '11117',
    phoneNumber: '2027953213',
    homeNumber: '2027953213',
    dob: '02/02/1982',
    dobDB: 'Mon Feb 02 1982',
    title: 'Mr.'
  },
};

export const transactionSettings = {
  types: {
    ecommerce: 'ecommerce',
    moto: 'moto',
    recurring: 'recurring',
    balanceInquiry: 'balanceInquiry',
    pos: 'pos',
    atmWithdraw: 'atmWithdraw'
  },

  olgaNuggets: {
    fromAccountName: 'Olga Nuggets',
    fromAccountAdyenId: 'BA32272223222B5FKBQGK97R3',
    fromAccountHolderName: 'Amir',
    fromAccountHolderId: 'AH3227C223222B5FKBMZL8XNG',
    fromCardAdyenId: 'PI32272223222B5FL3TZH9WVS',
    fromCardName: 'Olga Nuggets',

    merchantMCC: '5131',
    merchantId: '526567789010069',
    merchantCity: 'New York',
    merchantState: 'NY',
    merchantCountry: 'USA',
    merchantName: 'NB Bookstore',
    merchantAll: 'NB Bookstore New York USA',
    reference: 'Buy something'
  },

  dianaBishop: {
    fromAccountName: 'Diana Bishop',
    fromAccountAdyenId: 'BA3227C223222B5FKCC2R8Z95',
    fromAccountHolderName: 'Amir',
    fromAccountHolderId: 'AH3227C223222B5FKBMZL8XNG',
    fromCardAdyenId: 'PI3227C223222B5FKCC2R8ZBS',
    fromCardName: 'Diana Bishop',

    merchantMCC: '5131',
    merchantId: '526567789010069',
    merchantCity: 'New York',
    merchantState: 'NY',
    merchantCountry: 'USA',
    merchantName: 'NB Bookstore',
    merchantAll: 'NB Bookstore New York USA',
    reference: 'Buy something'
  },

  iuliusCaesar: {
    fromAccountName: 'Iulius Caesar',
    fromAccountAdyenId: 'BA3227C223222B5F4DHB58ZGM',
    fromAccountHolderName: 'Clutter',
    fromAccountHolderId: 'AH3227C223222B5F4DFS98ZCW',
    fromCardAdyenId: 'PI3227C223222B5F5JHF37Q8W',
    fromCardName: 'Iulius Caesar',

    merchantMCC: '5131',
    merchantId: '526567789010069',
    merchantCity: 'New York',
    merchantState: 'NY',
    merchantCountry: 'USA',
    merchantName: 'NB Bookstore',
    merchantAll: 'NB Bookstore New York USA',
    reference: 'Buy something'
  },

  fridaKalo: {
    fromAccountName: 'Frida Kalo',
    fromAccountAdyenId: 'BA3227C223222B5F58T3R75JL',
    fromAccountHolderName: 'Clutter',
    fromAccountHolderId: 'AH3227C223222B5F4DFS98ZCW',
    fromCardAdyenId: 'PI32272223222B5F58T3W9MT8',
    fromCardName: 'Frida Kalo',

    merchantMCC: '5131',
    merchantId: '526567789010069',
    merchantCity: 'New York',
    merchantState: 'NY',
    merchantCountry: 'USA',
    merchantName: 'NB Bookstore',
    merchantAll: 'NB Bookstore New York USA',
    reference: 'Buy something'
  },

  iogannBach: {
    fromAccountName: 'Iogann Bach',
    fromAccountAdyenId: 'BA3227C223222B5F4K3T5F5VW',
    fromAccountHolderName: 'Clutter',
    fromAccountHolderId: 'AH3227C223222B5F4DFS98ZCW',
    fromCardAdyenId: 'PI32272223222B5F4K3T975V7',
    fromCardName: 'Iogann Bach',

    merchantMCC: '5131',
    merchantId: '526567789010069',
    merchantCity: 'New York',
    merchantState: 'NY',
    merchantCountry: 'USA',
    merchantName: 'NB Bookstore',
    merchantAll: 'NB Bookstore New York USA',
    reference: 'Buy something'
  }
};

export const RegistrationInput = {
  defaultUser: {
    firstName: 'Olga',
    lastName: 'Nolga',
    dobField: '1',
    yobField: '1980',
    emailField: 'test@test.com',
    passField: 'Password1!',
    confirmPassField: 'Password1!',
    randFirstName: RandomGenerator.lowerCaseText(5) + 'Test',
    randLastName: RandomGenerator.lowerCaseText(5) + 'User',
    randEmail: RandomGenerator.lowerCaseText(8) + '@harakirimail.com'
  },
  invalidData: {
    dateField: '-+ */!eEеЕ@a\t&%',
    passField: 'Password111!',
    name50symbols: 'Aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeef',
    email256symbols: `aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeeaaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeeaaaaaaaaaabbbbbbbbbbccc
cccccccddddddddddeeeeeeeeeeaaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeeaaaaaaaaaabbbbbbbbbbccccccccccddddddd7815@harakirimail.com`,
    emailInvalidSymbols: RandomGenerator.lowerCaseText(8) + `/*$@harakirimail.com`,
    emailInvalidFormat: 'example.com',
    phoneNumber21symbols: '123456789012345678901'
  },
  invalidFirstNames: [
    'Abc.abc',
    'Abc*abc'
  ]
};