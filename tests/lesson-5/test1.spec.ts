import { test } from '@playwright/test';

test("Register Form", async ({ page }) => {
    await test.step("Go to page", async () => {
        await page.goto("https://material.playwrightvn.com/");
    })

    await test.step("Click to Register page", async () => {
        await page.locator("//a[text()='Bài học 1: Register Page (có đủ các element)']").click();
    })

    await test.step("Fill input", async () => {
        await page.locator("//input[@id='username']").fill("ducbt");
        await page.locator("//input[@id='email']").fill("ducbt@gmail.com");
        await page.locator("//input[@name='gender'][@value='male']").check()
        await page.locator("//input[@name='hobbies'][@id='traveling']").check();
        await page.locator("//select[@id='interests']").selectOption({ value: "sports" });
        await page.locator("//select[@id='country']").selectOption({ value: "canada" });
        await page.locator("//input[@id='dob']").fill('1999-01-03');
        await page.locator("//input[@id='profile']").setInputFiles("tests/lesson-5/img/afda0f6fd04736923505d667d57a7d22_t.jpeg");
        await page.locator("//textarea[@id='bio']").fill("hi mn");
        await page.locator("//input[@id='rating']").fill("8");
        await page.locator("//input[@id='favcolor']").fill("#000000");
        await page.locator("//input[@id='newsletter']").check();
        await page.locator("//label[@class='switch']").click();
        await page.locator("//div[@id='starRating']").click();
    })


    await test.step("Click Register", async () => {
        await page.locator("//button[text()='Register']").click();
    })
})