# Kiến thức lesson 6

## Git

- git clone: clone project về máy local (src code, commit, branch) ex: git clone \<url>

| Git                                            | Git hub           |
| ---------------------------------------------- | ----------------- |
| Working Directory -> Stagging -> Repository -> | Remote repository |

- git branch: chia branch giúp mỗi người quản lý code riêng của mình mà không bị ảnh hưởng trực tiếp vào nhánh chính

- git push: Đưa code ở Repository đã được commit lên branch mình muốn
- git pull: Pull code mới nhất trên Remote Repository về Working directory, trong trường hợp code trên branch thay đổi cần phải pull code mới về sau đó resolve conflict và push code mới -> tránh conflict code
- merge request: gộp nhánh
- reviewer: request người review code

- convention: quy tắc
  \<type>/\<short-description>

1. feat: tính năng mới
2. fix: sửa lỗi
3. conf: đổi cấu hình
4. chore: thay đổi nhỏ, xoá file, đổi tên file,..

## Javascript Utils functions

Các hàm tiện tích có sẵn

**String Utils**

| Name          | Description                                                         | Exp                                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| trim()        | Cắt khoảng trắng đầu cuối của chuỗi                                 | trim(" abc") => abc                                                                                                                                                         |
| toLowerCase() | Chuyển thành viết thường                                            |                                                                                                                                                                             |
| toUpperCase() | Chuyển thành viết hoá                                               |
| includes()    | Check chuỗi có chứa value truyền vào không? -> return true or false |
| replace()     | Thay thế chuỗi                                                      | str.replace("chuỗi muốn thay", "chuỗi thay thế")                                                                                                                            |
| split()       | Cắt chuỗi -> các mảng[string] dựa trên giá trị truyền vào           |                                                                                                                                                                             |
| substring()   | Trả về 1 phần của chuỗi                                             | 1. Truyền 2 tham số: str.substring("index start", "index end") <br> 2. Truyền 1 tham số: str.substring("index start") sẽ lấy index từ tham số truyền vào cho đến cuối chuỗi |
| indexOf()     | Trả về vị trí đầu tiên xuất hiện của chuỗi truyền vào               | VD: Hello world! <br> str.indexOf("Hello") => return ra index đầu tiên của chuỗi Hello là 0 <br> - note: nếu k tìm được return -1                                           |

**Array Utils**

| Name   | Description                                                                                             | Exp                                                                                                                                                                                                                                         |
| ------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| map    | Trả ra 1 mảng mới dựa theo mảng mình truyền vào                                                         | nums = [1,2,3] <br> nums.map(num => num\*2) <br> Trả ra arr mới [2,4,6]                                                                                                                                                                     |
| filter | Trả ra 1 mảng mới thoả mãn điều kiện                                                                    | nums = [1,2,3] <br> nums.filter(num => num%2==0) <br> Trả ra arr mới [2,4]                                                                                                                                                                  |
| find   | Trả về phần tử đầu tiên trong mảng thoả mãn điều kiện                                                   | nums = [1,2,3] <br> nums.find(num => num%2==0) <br> Trả ra phần tử đầu tiên trong mảng thoả mãn điều kiện là 2 <br> - note: Trong trường hợp không find được trả ra undifined                                                               |
| reduce | Loop qua 1 mảng và trả về 1 giá trị duy nhất                                                            | nums = [1,2,3] <br> nums.reduce((total-"giá trị trả về", num-"phần tử của mảng")=> total +num,"giá trị khởi tạo"), <br> Trả ra 10                                                                                                           |
| some   | Kiểm tra mảng có phần tử nào thoả mãn điều kiện truyền vào không -> return boolean                      |                                                                                                                                                                                                                                             |
| every  | tương tự some những sẽ check tất cả phần tủ phải thoả mãn điều kiện -> return boolean                   |                                                                                                                                                                                                                                             |
| push   | Thêm phần tử vào mảng                                                                                   | -note:<br> 1. push sẽ thêm phần tử vào cuối mảng <br> 2. unshift: thêm phần tử vào đầu mảng <br> 3. Thêm phần tử vào giữa mảng: xác định index(vị trí muốn thêm) tách mảng thành 2 băng slice sau đó thêm phần tử vào index và nối lại mảng |
| shift  | Xoá phần tử đầu tiên của mảng <br> Trả về phần tử vừa xoá <br> Thay đổi mảng cũ(đã loại bỏ phần tử đầu) | nums = [1,2,3] <br> nums.shift() <br> Trả về phần tử mới xoá: 1 <br> Update lại mảng [2,3]                                                                                                                                                  |
| sort   | 1. Sắp xếp các phần tử trong mảng <br> 2. Mặc định: sắp xếp theo chuỗi <br> 3. Thay đổi mảng            | 1. number.sort((a,b) => a-b): Sắp xếp dạng số tăng dần <br> 2. Sắp xếp giảm dần ngược lại                                                                                                                                                   |

**Class**

Tạo đối tượng kế thừa

Khai báo kiểu dữ liệu

trong class có hàm constructor() - hàm khởi tạo

Exp:

```
class Student {
//Thuộc tính
name: string;
city: string;
age: number;

    //Hàm khởi tạo
    constructor(name: string, city: string, age: number) {
        this.name = name;
        this.city = city;
        this.age = age;
    }

    //Method
    showInfo() {
        console.log("Name:", this.name, ", city:", this.city);
    }

    //Truyền tham số
    saySomething(message: string) {
        console.log(this.name, "say: ", message)
    }
}

let studen = new Student("ducbt", "hanoi", 3)
studen.showInfo();
studen.saySomething("hi mn");
```

- run file.ts: npx ts-node file_name
