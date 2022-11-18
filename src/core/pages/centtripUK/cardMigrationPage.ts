import { RandomGenerator } from '../../utils/randomGenerator';
import { UKCardMigrationPageElements } from '../locators';
import AllureReporter from '@wdio/allure-reporter';
import { downloadsExpPath } from '../../../testData/usersData';
import * as XLSX from 'xlsx';

export class CardMigrationPage {

    async generateBatchFile(email: string, env: string): Promise<string> {
        const fileName = 'cardholder' + RandomGenerator.numbers(5);
        AllureReporter.startStep(`Generate file for ${email} Cardholder account`);
        const path = require('path');
        const absolutePath = path.resolve(process.cwd() + '/src/testData/files').replace(/\\/g, '/');
        const workbook = XLSX.readFile(`${absolutePath}/PfsCardCreation_${env}.xlsx`);
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        worksheet.E2.v = email;
        XLSX.writeFile(workbook, `${downloadsExpPath}/${fileName}.xlsx`);
        AllureReporter.endStep();
        return fileName;
    };

    async batchProccessCheck(): Promise<Array<string>> {
        const cardHolderData = [];
        AllureReporter.startStep('Wait 5 minutes and check batch proccess');
        await browser.pause(160000);
        await browser.refresh();
        await browser.pause(160000);
        await browser.refresh();
        await (await UKCardMigrationPageElements.cardHolderId).waitForDisplayed();
        const cardHolderId = await UKCardMigrationPageElements.cardHolderId.getText();
        const salesForceId = await UKCardMigrationPageElements.salesForceId.getText();
        const status = await UKCardMigrationPageElements.status.getText();
        expect(cardHolderId).not.toEqual('');
        expect(salesForceId).not.toEqual('');
        expect(status).toEqual('MigrationQueued');
        cardHolderData.push(cardHolderId, salesForceId);
        AllureReporter.endStep();
        return cardHolderData;
    };
};

export const cardMigrationPage = new CardMigrationPage();
