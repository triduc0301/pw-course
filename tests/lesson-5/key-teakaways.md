# Kiến thức lesson 5

## DOM (Document object model)

Mô hình cấu trúc dạng cây của HTML

**Node**

**Selector**
Chọn các phần tử trên web

1. Xpath Selector

- Tuyệt đối: bắt đầu / exp: /html/body/div/...
- Tương đối: bắt đầu //tenthe[@thuoctinh="giatri"] exp: //div[@id="parent"]
- nên dùng tương đối

2. Css Selector
3. Playwright Selector

## Playwright Basic syntax

- Sửa timeout khi run test -> defineConfig

- test: đơn vị khai báo 1 test
- step: khai báo từng step của test (nên đc map 1-1 với testcase để dễ maintain)

- navigate: goto("")
- Click:

1. Sigle click: .click();
2. Double click: .dbclick();
3. Right Click: .click({button: 'right'})
4. Click with dif button: .click({modifiers:['Shift']})

- Input:

1. fill: fill content vào ô input: .fill("content")
2. pressSequentially: gõ từng chữ vào ô input: .pressSequentially("content",{delay:100,})

- Radio/checkbox

1. check giá trị có check hay k
   const bool = .isCheck() ? => trả về true hoặc false
2. Check/uncheck
   .check() check - setCheck(true)
   .setCheck(false)

- Select
  .selectOption({ value: 'value'})
- File: .setInputFiles("path File")
  - Note: nên cho file muốn thêm vào project -> push lên git -> clone lại sẽ có file

## Kiến thức bổ sung

.hover(): hover vào element

text() có thể locator element bằng cách: //div[text()=’This is a text’] -> Tìm thẻ div có text là This is a text

- Trong trường hợp text có khoảng cách VD: div This is a text /div

  Sử dụng: //div[contains(text(), ‘This is a text’)]

- Confirm Dialog
  Nếu dialog hiện ra

page.on('dialog', dialog => dialog.accept()) handler trc trigger
