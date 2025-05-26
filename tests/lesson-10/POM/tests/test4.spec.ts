import { expect, test } from '@playwright/test';
import { PersonalNote } from '../page/personal-note';

test("Peronal note", async ({ page }) => {
    const personalNote = new PersonalNote(page);
    let titles = [""];
    let contents = [""];
    let numOfNews: number = 10;
    let searchKeyword: string = "Hà";
    await test.step("Go to VNExpress", async () => {
        await personalNote.gotoUrl("https://vnexpress.net/khoa-hoc-cong-nghe");
    })

    await test.step("Get data from VNExpress", async () => {
        titles = await personalNote.getDataFromVN("title");
        contents = await personalNote.getDataFromVN("content");
    })

    await test.step("Go to personal page", async () => {
        await personalNote.gotoPersonalPage();
    })

    await test.step("Fill data", async () => {
        for (let i = 0; i < numOfNews; i++) {
            if (titles[i] && contents[i]) {
                await personalNote.fillData("title", titles[i]);
                await personalNote.fillData("content", contents[i]);
                await personalNote.clickBtn(page.locator("//button[@id='add-note']"));
            }
        }
    })

    await test.step("Search data", async () => {
        await personalNote.searchKeyword(searchKeyword);
    })

    await test.step("Check data", async () => {
        const dataSearchFromTable = await personalNote.getDataSearch();
        for (let i = 0; i < dataSearchFromTable.length; i++) {
            expect((dataSearchFromTable[i].titlesSearch.toLowerCase() || "").includes(searchKeyword.toLowerCase()) || (dataSearchFromTable[i].contentsSearch.toLowerCase() || "").includes(searchKeyword.toLowerCase())).toBe(true);
        }
    })
})  