import { Page } from "@playwright/test";
import { CommonPage } from "../common/common-page";

export class ProductCart extends CommonPage {

    xpath = {
        btnAddtoCart1: "//button[@data-product-id='1']",
        btnAddtoCart2: "//button[@data-product-id='2']",
        btnAddtoCart3: "//button[@data-product-id='3']",
    }

    constructor(page: Page) {
        super(page);
    }

    async gotoProductCart() {
        await this.goHome();
        await this.clickBtn(this.page.locator("//a[text()='Bài học 2: Product page']"));
    }

    async clickAddProduct() {
        await this.clickBtn(this.page.locator(this.xpath.btnAddtoCart1), 2);
        await this.clickBtn(this.page.locator(this.xpath.btnAddtoCart2), 3);
        await this.clickBtn(this.page.locator(this.xpath.btnAddtoCart3));
    }


    async getDataTable() {
        let countRow = await this.page.locator("//tbody[@id='cart-items']/tr").count();
        let rows = this.page.locator("//tbody[@id='cart-items']/tr");

        const tableData: {
            name: string;
            price: string;
            quantity: string;
            total: string;
        }[] = [];

        for (let i = 0; i < countRow; i++) {
            let cells = rows.nth(i).locator("td");

            let name = await cells.nth(0).textContent() || "";
            let price = await cells.nth(1).textContent() || "";
            let quantity = await cells.nth(2).textContent() || "";
            let total = await cells.nth(3).textContent() || "";

            tableData.push({
                name,
                price,
                quantity,
                total
            })
        }
        return tableData;
    }

    async checkTotalMoney() {
        let countRow = await this.page.locator("//tbody[@id='cart-items']/tr").count();
        let rows = this.page.locator("//tbody[@id='cart-items']/tr");
        let sum = 0;

        for (let i = 0; i < countRow; i++) {
            let cells = rows.nth(i).locator("td");
            let totalText = await cells.nth(3).textContent();
            let totalValue = parseFloat((totalText || "").replace(/[^0-9.]/g, ""));
            sum += totalValue;
        }

        let totalMoney = await this.page.locator("//td[@class='total-price']").textContent()
        return sum === parseFloat((totalMoney || "").replace(/[^0-9.]/g, ""));
    }
}