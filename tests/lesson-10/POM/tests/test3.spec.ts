import { expect, test } from '@playwright/test';
import { Todo } from '../page/todo';

test("Todo Page", async ({ page }) => {
    const todoPage = new Todo(page);
    const todos: number = 100;
    const todoCheckViewport: number = 90;
    const todoCheckExits: number = 21
    page.on('dialog', async dialog => {
        await dialog.accept();
    })

    await test.step("Goto page", async () => {
        await todoPage.gotoTodoPage()
    })

    await test.step("add 100 todos", async () => {
        for (let i = 1; i <= todos; i++) {
            await todoPage.addToDo("todo", `Todo ${i}`);
            await todoPage.clickBtn(page.locator("//button[@id='add-task']"));
        }
    })

    await test.step("Remove odd", async () => {
        await todoPage.removeOddNumber()
    })

    await test.step("Check Todo in viewport", async () => {
        await expect(page.locator(`//li//span[text()='Todo ${todoCheckViewport}']`)).toBeInViewport();
    })

    await test.step("Check Todo exits", async () => {
        await expect(page.locator(`//li//span[text()='Todo ${todoCheckExits}']`)).not.toBeAttached();
    })
})