import { test } from '@playwright/test';

test('Personal notes', async ({ page }) => {
    await test.step("Go to page", async () => {
        await page.goto("https://material.playwrightvn.com/");
    })

    await test.step("Click to Todo page", async () => {
        await page.locator("//a[text()='Bài học 4: Personal notes']").click();
    })

    await test.step("Fill Data", async ({ }) => {
        let paperVN = [
            {
                title: 'Quả cầu bêtông 400 tấn lưu trữ năng lượng dưới biển sâu',
                content: 'Dự án này, mang tên StEnSea, được đưa ra từ năm 2011. Theo đó, các nhà khoa học sử dụng áp suất nước sâu để lưu trữ năng lượng từ ngắn hạn đến trung hạn. Bộ Năng lượng Mỹ đã đầu tư 4 triệu USD vào dự án.'
            },
            {
                title: 'Facebook hạn chế hiển thị bài đăng lách luật',
                content: 'Mạng xã hội Facebook sẽ ngăn hành vi đăng tải các bài đăng rác, nội dung dài dòng, trùng lặp, sử dụng quá nhiều hashtag.'
            },
            {
                title: 'Phát hiện mỏ vàng bạc lớn nhất thế giới ở Nam Mỹ',
                content: 'Khu mỏ nằm dọc biên giới Argentina - Chile chứa ước tính 907.000 kg vàng, và 18,6 triệu kg bạc và 13 triệu tấn đồng.'
            },
            {
                title: 'Xu hướng viết code không cần hiểu lập trình',
                content: 'Nhờ AI, người không am hiểu về lập trình vẫn có thể xây dựng phần mềm theo ý muốn và xu hướng này được gọi là Vibe Coding.'
            },
            {
                title: 'Vì sao dấu vân tay giúp giải mã tội phạm?',
                content: 'Do không người nào có dấu vân tay giống hệt nhau nên nó trở thành bằng chứng đặc biệt thuyết phục giúp xác định nghi phạm.'
            }
        ]
        for (let i = 0; i < paperVN.length; i++) {
            await page.locator("//input[@id='note-title']").fill(paperVN[i].title);
            await page.locator("//textarea[@id='note-content']").fill(paperVN[i].content);
            await page.locator("//button[@id='add-note']").click();
        }
    })

    await test.step("Search title", async () => {
        await page.locator("//input[@id='search']").fill("Xu hướng viết code không cần hiểu lập trìn");
    })
})