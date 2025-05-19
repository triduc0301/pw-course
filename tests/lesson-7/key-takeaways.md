# Kiến thức lesson 7

## Git

**stashing:**

1. Stash: Lưu công việc vào vùng nhớ tạm.
   - git stash: Lưu lại files tracked vào vùng nhớ tạm.
   - git stash save --all: Lưu tất cả files untrack và tracked
2. Unstash: Lấy các công việc trong vùng nhớ tạm. git stash pop

## JS/Function advance

**Lambda function (Arrow function)**
Sử dụng dấu => thay vì function

Cú pháp:

```
    (para) => {
        //src code
    }
```

**Anonymous functions**

1. Hàm không có tên
2. Thường sử dụng 1 lần hoặc làm đối số truyền vào
3. Cú pháp:

```
    function (para) {
        //src code
    }
```

## DOM

|                   |                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| self              | node hiện tại                                                                                                   |
| parent            | node phía trên trực tiếp của self                                                                               |
| children          | node phía dưới trực tiếp của self                                                                               |
| ancestor          | các node parent -> node gốc cùng hệ của self                                                                    |
| descendant        | các node children của self                                                                                      |
| sibling           | các phần cùng cấp self và cùng parent                                                                           |
| following         | gồm các node bên tay phải(include children của nó) của self <br> Không bao gồm node children trực tiếp của self |
| preceding         | gồm các node bên tay trái(include children của nó) của self <br> Không bao gồm node ancestor trực tiếp của self |
| following-sibling | gồm các node anh em phía sau                                                                                    |
| preceding-sibling | gồm các node anh em phía trước                                                                                  |

## Xpath

|                 |                                                                          |                                       |
| --------------- | ------------------------------------------------------------------------ | ------------------------------------- |
| wildcard: \*    | Lấy all                                                                  |                                       |
| chứa thuộc tính | Lấy element chứa thuộc tính truyền vào                                   | //\*[@thuộc tính]                     |
| and và or       | Lấy element thoả mãn điều kiện <br>                                      | //div[@class='class' and/or @id='id'] |
| innerText       | Lấy text của element                                                     | //h1[text()='text']                   |
| normalize-space | Loại bỏ khoảng trắng đầu cuối                                            | //h1[normalize-space()='text']        |
| contains        | Lấy element chứa para truyền vào                                         | //h1[contains(attribute,'text')]      |
| starts-with     | Tương tự contains nhưng chỉ tìm các element bắt đầu bằng para truyền vào | //h1[starts-with(attribute,'text')]   |
| not             | Tìm các element không thoả mãn                                           | //h1[not(attribute,'text')]           |

## Xpath Axes

Dựa trên mối quan hệ của DOM để lấy path
||||
|-|-|-|
|parent|lấy element dựa theo cha của self|//div[@id='id']/parent::"parent element"|
|child|lấy element dựa theo con của self|//div[@id='id']/child::"child element"|
|ancestor||//div[@id='id']/ancestor::"các node gốc từ cha"|
|descendant||//div[@id='id']/descendant::"các node child của self"|
|following||//div[@id='id']/following::"node bên phải trừ child của self"|
|preceding||//div[@id='id']/preceding::"node bên trái trừ tổ tiên của self"|
|following-sibling||//div[@id='id']/following-sibling::"node anh em phía sau"|
|preceding-sibling||//div[@id='id']/preceding-sibling::"node anh em phía trước"|
