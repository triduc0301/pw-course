import { test, expect } from '@playwright/test';
import { Register } from '../page/register';

test("Fill data to register", async ({ page }) => {
    let username = "ducbt";
    let email = `${username}@gmail.com`;
    let filePath = "tests/student-submissions/10-ducbt/lesson-10/POM/img/854033242929cb15cd206e07b3981d58.jpg";
    let user1 = {
        username: username,
        email: email,
        info: [
            "Gender: male",
            "Hobbies: reading",
            "Country: canada",
            "Date of Birth: 1999-01-03",
            "Biography: hihi",
            "Rating: 9",
            "Favorite Color: #000000",
            "Newsletter: Yes",
            "Enable Feature: Yes",
            "Star Rating: 2.5⭐"
        ]
    }

    const register = new Register(page);

    await test.step("Go to Url", async () => {
        await register.goToRegister();
    })

    await test.step("Fill data to form", async () => {
        await register.fillData("username", username);
        await register.fillData("email", email);
        await register.fillData("genderMale", "male");
        await register.fillData("hobbieReading");
        await register.fillData("country", "canada");
        await register.fillData("dob", "1999-01-03");
        await register.fillData("file", filePath);
        await register.fillData("bio", "hihi");
        await register.fillData("rating", "9");
        await register.fillData("color", "#000000");
        await register.fillData("newsLetter");
        await register.fillData("switch");
        await register.fillData("starRating");
    })

    await test.step("Click to register", async () => {
        await register.clickRegister();
    })

    await test.step("Ckech data in table", async () => {
        const dataFromTable = await register.getDataTable();

        for (let row of dataFromTable) {
            expect(row.cellUsername).toBe(user1.username);
            expect(row.cellEmail).toBe(user1.email);

            for (let info of user1.info) {
                expect(row.cellInfo).toContain(info);
            }
        }
    })

    await test.step("Clear data", async () => {
        page.on('dialog', async dialog => {
            await dialog.accept();
        })
        await register.clickBtn(page.locator("//td[@class='actions']/button[text()='Delete']"));
    })
})