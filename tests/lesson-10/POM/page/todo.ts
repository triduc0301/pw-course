import { expect, Page } from "@playwright/test";
import { CommonPage } from "../common/common-page";

export class Todo extends CommonPage {
    dataForm = {
        todo: { xpath: "//input[@id='new-task']", type: "fill" }
    }

    constructor(page: Page) {
        super(page)
    }

    async gotoTodoPage() {
        await this.goHome();
        await this.clickBtn(this.page.locator("//a[text()='Bài học 3: Todo page']"));
    }

    async addToDo(field: string, value?: string) {
        await this.fillDataForm(this.dataForm, field, value);
    }

    async removeOddNumber() {
        let todos = await this.page.locator("//ul[@id='task-list']/li").count();

        // for (let i = await this.page.locator("//ul[@id='task-list']/li").count() - 1; i >= 0; i--) {
        //     let todo = todos.nth(i);
        //     let text = await todo.locator("//span").textContent();
        //     let num = text?.match(/Todo (\d+)/);
        //     if (num && (num[1])) {
        //         if (parseInt(num[1]) % 2 != 0) {
        //             await todo.locator("//button[text()='Delete']").click();
        //         }
        //     }
        // }

        for (let i = 1; i <= todos; i++) {
            if (i % 2 !== 0) {
                let a = this.page.locator(`//button[@id='todo-${i}-delete']`);
                await this.page.locator(`//button[@id='todo-${i}-delete']`).click({ force: true });
            }
        }
    }
}
