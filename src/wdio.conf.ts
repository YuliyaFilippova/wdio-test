import AllureReporter from '@wdio/allure-reporter';
import type { Options } from '@wdio/types';

const testrailUtil = require('wdio-wdiov5testrail-reporter/lib');

if (!process.env.ENV || !['qa', 'dev'].includes(process.env.ENV)) {
    console.log('Please use the following format: ENV=qa|dev')
    process.exit()
}

if (!process.env.SUITEID || !['182', '364'].includes(process.env.SUITEID)) {
    console.log('Please use the following format: SUITEID=182|364')
    process.exit()
}

if (!process.env.RUNID) {
    console.log('Please use the following format: RUNID=""|TestrailRunId')
    process.exit()
}

export const config: Options.Testrunner = {

    autoCompileOpts: {
        autoCompile: true,

        tsNodeOpts: {
            transpileOnly: true,
            project: 'src/tsconfig.json'
        }
    },

    specs: [
        './src/specs/**/SignOut.spec.ts'
    ],

    suites: {
        usa: ['src/specs/centtripUSA/*.spec.ts'],
        iFacade: [
            'src/specs/IdentityFacade/C1*.spec.ts'
        ],
    },

    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--headless',
                //'--start-maximized',
                '--window-size=1920,1080',
                '--disable-extensions',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--ignore-certificate-errors',
                '--no-sandbox'
            ]
        },
        acceptInsecureCerts: true
    }],

    logLevel: 'error',
    bail: 0,
    waitforTimeout: 30000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        [
            'chromedriver', {
                logFileName: 'wdio-chromedriver.log', // default
                outputDir: 'driver-logs', // overwrites the config.outputDir
                args: ['--silent']
            }
        ],
    ],
    framework: 'mocha',
    reporters: [
        ['spec', {
            addConsoleLogs: true,
            showPreface: false,
        }],
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            afterStep: async function (step, scenario, { error, duration, passed }, context) {
                if (error) {
                    await browser.takeScreenshot();
                }
            }
        }], 
        ['wdiov5testrail', {
            outputDir: './',
            domain: 'centtrip.testrail.io',
            username: 'y.philippova@andersenlab.com',
            password: 'TestRail2@',
            projectId: 2,
            suiteId: process.env.SUITEID, 
            runId: process.env.RUNID
          }],
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    beforeSession: function (config, capabilities, specs) {
        testrailUtil.startup();
    },

    onComplete: function (exitCode, conf, capabilities, results) {
        testrailUtil.cleanup(conf); // This method returns the run id used
    },

    after: () => {
        AllureReporter.addEnvironment('Environment', process.env.ENV);
        AllureReporter.addEnvironment('Platform', process.platform);
    },
};
