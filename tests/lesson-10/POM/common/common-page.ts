import { Locator, Page } from '@playwright/test';

export class CommonPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async fillText(locator: Locator, textFill: string) {
        await locator.fill(textFill);
    }

    async selectOption(locator: Locator, option: string) {
        await locator.selectOption({ value: option });
    }

    async uploadFile(locator: Locator, pathFile: string) {
        await locator.setInputFiles(pathFile);
    }

    async clickBtn(locator: Locator, count?: number | 1) {
        await locator.click({ clickCount: count });
    }

    async checkType(locator: Locator) {
        await locator.check();
    }

    async gotoUrl(url: string) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    async goHome() {
        await this.page.goto("https://material.playwrightvn.com/");
    }

    async fillDataForm(dataForm: any, field: string, value?: string) {
        let fieldSwitch = dataForm[field];
        let locator = this.page.locator(fieldSwitch.xpath);

        if (fieldSwitch) {
            switch (fieldSwitch.type) {
                case "fill":
                    await this.fillText(locator, value || '');
                    break;
                case "select":
                    await this.selectOption(locator, value || '');
                    break;
                case "file":
                    await this.uploadFile(locator, value || '');
                    break;
                case "click":
                    await this.clickBtn(locator);
                    break;
                case "check":
                    await this.checkType(locator);
                    break;
                default:
                    console.log("error");
                    break;
            }
        } else {
            console.log(`${fieldSwitch} not regiser in dataForms`);
        }
    }
}