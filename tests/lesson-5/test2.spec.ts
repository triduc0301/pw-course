import { test } from '@playwright/test';

test("Add to cart", async ({ page }) => {
    await test.step("Go to page", async () => {
        await page.goto('https://material.playwrightvn.com/')
    })

    await test.step("Click to Product page", async () => {
        await page.locator("//a[text()='Bài học 2: Product page']").click();
    })

    await test.step("Add each product to cart", async () => {

        await page.locator("//button[@data-product-id='1']").click({ clickCount: 2 });

        await page.locator("//button[@data-product-id='2']").click({ clickCount: 3 });

        await page.locator("//button[@data-product-id='3']").click();
    })
})