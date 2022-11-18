import allureReporter from '@wdio/allure-reporter';
import { connectionUSA } from '../../../wdio.conf';
import { LoginAPICall } from '../../../core/utils/loginAPICall';
import { Credentials } from '../../../testData/Credentials';
import { requestHeadersToken } from '../../../testData/other';
import { HttpMethods } from '../../../core/api/rest';
import { URLs } from '../../../urls';

describe(`API > Statements`, () => {
    let accessToken;
    const userEmail = 'autoforupdate.centtrip.qa@harakirimail.com';
    const generalEndpoint = 'api/profile/v1/Profile';
    before(async () => {
        if (!connectionUSA._connectCalled) {
            await connectionUSA.connect();
        }
        accessToken = await LoginAPICall.getAccessTokenForAPI(userEmail, Credentials.AmirCSA.Password);
    });
    it(`[C36870] User data on My details @smoke`, async () => {
        allureReporter.addSeverity('critical');
        allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36870');
        const userAddres = {
            addressLine1: '',
            addressLine2: 'Baker',
            addressLine3: null,
            addressLine4: null,
            city: 'Fortress',
            county: null,
            addressState: 'California',
            postCode: '12333',
            countryCode: 'USA'
        };
        const profileInfo = await HttpMethods.get(generalEndpoint, requestHeadersToken(accessToken), URLs.USAPortalURL);
        expect(profileInfo.status).toBe(200);
        expect(profileInfo.body.isSuccess).toBe(true);
        expect(profileInfo.body.value.email).toEqual(userEmail);
        expect(profileInfo.body.value.firstName).toEqual('FirstCSA');
        expect(profileInfo.body.value.lastName).toEqual('User');
        expect(profileInfo.body.value.dob).toEqual('01-01-1980');
        expect(profileInfo.body.value.address).toEqual(userAddres);
    });

    it(`[C36871] Edit and verify phone number @smoke`, async () => {
        allureReporter.addSeverity('critical');
        allureReporter.addTestId('https://centtrip.testrail.io/index.php?/cases/view/36871');
        const endpoint = 'api/profile/v1/Profile/phone';
        const phoneEndpoint = 'api/profile/v1/Profile/phoneToken';
        const putBody = JSON.stringify({
            phoneNumber: '+12064512559'
        });

        const smsCode = JSON.stringify({
            code: '6635239'
        });
        const editPhone = await HttpMethods.put(endpoint, requestHeadersToken(accessToken), putBody, URLs.USAPortalURL);
        expect(editPhone.status).toBe(200);
        expect(editPhone.body.isSuccess).toBe(true);
        console.log(editPhone);

        const profileInfo = await HttpMethods.get(generalEndpoint, requestHeadersToken(accessToken), URLs.USAPortalURL);
        expect(profileInfo.status).toBe(200);
        expect(profileInfo.body.isSuccess).toBe(true);
        expect(profileInfo.body.value.phoneNumber).toEqual('+12064512559');
        expect(profileInfo.body.value.isPhoneNumberConfirmed).toEqual(false);

        const phoneToken = await HttpMethods.post(phoneEndpoint, requestHeadersToken(accessToken), {}, URLs.USAPortalURL);
        expect(phoneToken.status).toBe(200);
        expect(phoneToken.body.isSuccess).toBe(true);

        const sendVerifyCode = await HttpMethods.post('api/profile/v1/Profile/confirmPhone', requestHeadersToken(accessToken), smsCode, URLs.USAPortalURL);
        expect(sendVerifyCode.status).toBe(200);
        expect(sendVerifyCode.body.isSuccess).toBe(true);
    });
});