import { Page } from "@playwright/test";
import { CommonPage } from "../common/common-page";

export class Register extends CommonPage {
    xpathBtnRegister = "//button[text()='Register']";
    dataForm = {
        username: { xpath: "//input[@id='username']", type: "fill" },
        email: { xpath: "//input[@id='email']", type: "fill" },
        genderMale: { xpath: "//input[@name='gender'][@value='male']", type: "check" },
        genderFemale: { xpath: "//input[@name='gender'][@value='female']", type: "check" },
        hobbieReading: { xpath: "//input[@name='hobbies'][@id='reading']", type: "check" },
        hobbieTraveling: { xpath: "//input[@name='hobbies'][@id='traveling']", type: "check" },
        hobbieCooking: { xpath: "//input[@name='hobbies'][@id='cooking']", type: "check" },
        selectInterests: { xpath: "//select[@id='interests']", type: "select" },
        country: { xpath: "//select[@id='country']", type: "select" },
        dob: { xpath: "//input[@id='dob']", type: "fill" },
        file: { xpath: "//input[@id='profile']", type: "file" },
        bio: { xpath: "//textarea[@id='bio']", type: "fill" },
        rating: { xpath: "//input[@id='rating']", type: "fill" },
        color: { xpath: "//input[@id='favcolor']", type: "fill" },
        newsLetter: { xpath: "//input[@id='newsletter']", type: "check" },
        switch: { xpath: "//label[@class='switch']", type: "click" },
        starRating: { xpath: "//div[@id='starRating']", type: "click" }
    }

    constructor(page: Page) {
        super(page)
    }

    async goToRegister() {
        await this.goHome();
        await this.clickBtn(this.page.locator("//a[text()='Bài học 1: Register Page (có đủ các element)']"));
    }

    async fillData(field: string, value?: string) {
        await this.fillDataForm(this.dataForm, field, value);
    }

    async clickRegister() {
        await this.clickBtn(this.page.locator(this.xpathBtnRegister));
    }

    async getDataTable() {
        let countRow = await this.page.locator("//tbody//tr").count();

        const tableData: {
            cellUsername: string;
            cellEmail: string;
            cellInfo: string;
        }[] = [];

        for (let i = 0; i < countRow; i++) {
            let cellUsername = await this.page.locator("//td[2]").nth(i).innerText();
            let cellEmail = await this.page.locator("//td[3]").nth(i).innerText();
            let cellInfo = await this.page.locator("//td[4]").nth(i).innerText();

            tableData.push({
                cellUsername,
                cellEmail,
                cellInfo
            });
        }
        return tableData;
    }
}


