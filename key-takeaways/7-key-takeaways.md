# Kiến thức lesson 8

## Playwright

**test.describe:**

1. tập hợp các test cases
2. Nhóm các test lại -> dễ quản lý

```
test.describe('name_suite', async() => {
    test('test1', async ({page}) => {

    });

    test('test2', async ({page}) => {

    });
    ...
})
```

**Hook**

Các thời điểm chạy test

Các thời điểm chạy suite

|            |                                                 |     |
| ---------- | ----------------------------------------------- | --- |
| beforeAll  | run 1 lần<br>Chạy đầu tiên trong khối describe  |     |
| afterAll   | run 1 lần<br>Chạy cuối cùng trong khối describe |     |
| beforeEach | run đầu với mỗi each test trong khối describe   |     |
| afterEach  | run sau với mỗi each test trong khối describe   |     |

## Playwright assertion

**Assertion**

1. Kiểm tra logic hoặc dữ liệu không phụ thuộc vào trạng thái của giao diện (UI)
2. Không có cơ chế tự động chờ (auto-wait)
3. Chủ yếu dùng để kiểm tra các biến, giá trị số, chuỗi,... sau khi thao tác xong

| Assertion                | Describe                                               |
| ------------------------ | ------------------------------------------------------ |
| expect().toBe()          | Kiểm tra phần tử đã được gắn vào DOM                   |
| expect().toEqual();      | Kiểm tra giá trị bằng nhau (so sánh object/arr)        |
| expect().toContain();    | Kiểm tra 1 phần tử có trong arr hoặc str               |
| expect().toBeTruthy();   | Kiểm tra giá trị có truthy (!null, !false, !undifined) |
| expect().toBeFalsy();    | Kiểm tra giá trị có falsy (null, false, undifined, 0)  |
| expect.toBeGreaterThan() | Kiểm tra giá trị lớn hơn                               |
| expect.toBeLessThan()    | Kiểm tra giá trị nhỏ hơn                               |

**Web-First Assertion**

1. Tự động chờ (auto-wait) cho đến khi điều kiện mong muốn thỏa mãn hoặc timeout
2. Kiểm thử giao diện web, =phần tử DOM có thể chưa sẵn sàng ngay lập tức

| First Assertion                             | Describe                                                                                  |
| ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| await expect(elem).toBeAttached();          | Kiểm tra phần tử đã được gắn vào DOM                                                      |
| await expect(elem).toBeChecked();           | Kiểm tra phần tử đã được check. <br>Thường dùng cho checkbox, radio button.               |
| await expect(elem).toBeEditable();          | Kiểm tra phần tử có thể sửa được. <br>Thường dùng cho ô input                             |
| await expect(elem).toBeEmpty();             | Kiểm tra phần tử rỗng <br> Thường dùng cho các phần tử warning, error                     |
| await expect(elem).toBeEnabled();           | Kiểm tra phần tử có được enable haykhông<br> Thường dùng cho button hoặc input            |
| await expect(elem).toBeFocused();           | Kiểm tra phần tử có được focus hay không<br> Thường dùng cho input                        |
| await expect(elem).toBeHidden();            | Kiểm tra phần tử có bị ẩn khỏi trang web hay không <br>Thường dùng cho các text thông báo |
| await expect(elem).toBeInViewport();        | Kiểm tra phần tử có nằm trong viewport hay không                                          |
| await expect(elem).toBeVisible();           | Kiểm tra phần tử có hiển thị hay không                                                    |
| await expect(elem).toContainText("abc");    | Kiểm tra phần tử có chứa text 'abc' hay không                                             |
| await expect(elem).toHaveAttribute("href"); | Kiểm tra phần tử có thuộc tính 'href' không                                               |
| await expect(elem).toHaveClass("class");    | Kiểm tra phần tử có class 'class' không                                                   |
| await expect(elem).toHaveId("id")           | Kiểm tra phần tử có id hay không                                                          |
| await expect(elem).toHaveText('');          | Kiểm tra phần tử có text hay không                                                        |
| await expect(elem).toHaveValue('')          | Kiểm tra input có chứa giá trị hay không                                                  |
| await expect(elem).toHaveValues([])         | Kiểm tra select có select các option hay không                                            |
