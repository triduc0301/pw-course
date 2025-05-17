import { test } from '@playwright/test';

test('Todo Page', async ({ page }) => {
    await test.step("Go to page", async () => {
        await page.goto("https://material.playwrightvn.com/");
    })

    await test.step("Click to Todo page", async () => {
        await page.locator("//a[text()='Bài học 3: Todo page']").click();
    })

    await test.step("Add info to toto list", async () => {
        for (let i = 1; i <= 100; i++) {
            await page.locator("//input[@id='new-task']").fill(`Todo ${i}`);
            await page.locator("//button[@id='add-task']").click();
        }
    })

    await test.step("Remove odd number", async () => {
        //takenote khi elemebt bị xoá todos đang k đc update lại
        let todos = await page.locator("//ul[@id='task-list']/li");
        page.on('dialog', dialog => dialog.accept());
        for (let i = await page.locator("//ul[@id='task-list']/li").count() - 1; i >= 0; i--) {
            let todo = todos.nth(i);
            let text = await todo.locator("//span").textContent();
            let num = text?.match(/Todo (\d+)/);
            if (num && (num[1])) {
                if (parseInt(num[1]) % 2 != 0) {
                    await todo.locator("//button[text()='Delete']").click();
                }
            }
        }
    })
})