import { Page } from "@playwright/test";
import { CommonPage } from "../common/common-page";

export class PersonalNote extends CommonPage {
    xpath = {
        titleVNEpress: "//h3[@class='title-news']/a",
        contentVNEpress: "//p[@class='description']/a"
    }

    dataForm = {
        title: { type: "fill", xpath: "//input[@id='note-title']" },
        content: { type: "fill", xpath: "//textarea[@id='note-content']" },
        search: { type: "fill", xpath: "//input[@id='search']" }
    }

    constructor(page: Page) {
        super(page)
    }

    async gotoPersonalPage() {
        await this.goHome();
        await this.clickBtn(this.page.locator("//a[text()='Bài học 4: Personal notes']"));
    }

    async getDataFromVN(text: string) {
        let res: string[];
        text === 'title' ? res = await this.page.locator(this.xpath.titleVNEpress).allTextContents() : res = await this.page.locator(this.xpath.contentVNEpress).allTextContents();
        return res;
    }

    async fillData(field: string, value?: string) {
        await this.fillDataForm(this.dataForm, field, value);
    }

    async searchKeyword(keywordSearch: string) {
        await this.fillDataForm(this.dataForm, "search", keywordSearch)
    }

    async getDataSearch() {
        let titlesSearch = [""];
        let contentsSearch = [""];

        titlesSearch = await this.page.locator("//ul[@id='notes-list']//strong").allTextContents() || "";
        contentsSearch = await this.page.locator("//ul[@id='notes-list']//p").allTextContents() || "";

        const postNews: {
            titlesSearch: string,
            contentsSearch: string
        }[] = [];

        for (let i = 0; i < titlesSearch.length; i++) {
            postNews.push({
                titlesSearch: titlesSearch[i],
                contentsSearch: contentsSearch[i]
            })
        }

        return postNews;
    }
}