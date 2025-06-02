# Kiến thức lesson 13

## JS

**Object destructuring**

- Giúp trích xuất các giá trị từ Object
- Ngắn gọn, tiện lợi để làm việc vs Object
- Giảm duplication

Exp

```
const myClass = {
    code: "K11",
    course: "Full stack QA",
    class: {
        des: "description"
    }
}

const { code, course, class: { des } } = myClass;

console.log(code);
console.log(des);

```

Trong trường hợp trùng name khi gọi define lại name -> employeeName, jobName

```
const employee = {
    name: "nguyen a",
    age: 20,
    job: {
        name: "IT",
        level: "Junior"
    }
}

const { name: employeeName, age, job: { name: jobName }} = employee

console.log(employeeName);
console.log(jobName);
```

**Multiple property**

- Dùng trong trường hợp bạn muốn destructuring nhiều thuộc tính của object:

```
const user = {
  name: "A",
  age: 20,
  city: "Hanoi"
};

const { name, age, city } = user;

console.log(name);
console.log(age);
console.log(city);

```

**Default value**

- Dùng trong trường hợp bạn muốn đặt giá trị mặc định cho một thuộc tính.

```
const user = {
  name: "A",
  city: "Hanoi"
};

//Thêm thuộc tính age và gán giá trị mặc định là 18
const { name, age = 18 } = user;

console.log(name);
console.log(age);  // 18
```

**Alias**

- Dùng trong trường hợp bạn muốn đặt một cái tên khác cho property

VD: Như ví dụ Trong trường hợp trùng name khi gọi define lại name -> employeeName, jobName

**Deep property**

- Dùng trong trường hợp bạn muốn destructuring các object nằm sâu bên trong một object khác

```
const user = {
  name: "Quan",
  address: {
    city: "Hanoi",
    district: "Cau Giay",
  }
};

const { address: { city, district } } = user;

console.log(city);     // Hanoi
console.log(district); // Cau Giay
```

## Playwright

**Fixture**

- Là concept trong playwright
- dùng để khởi tạo các enviroment khác nhau cho test
- isolate giữa các test
- giúp nhóm test dựa trên ý nghĩa thay vì common setup

_note_

- Trước use: giống beforeEach
- use: chạy code trong test
- sau use: giống afterEach

Exp

```
const test = base.extend({
todoPage: async ({ page }, use) => {
const todoPage = new TodoPage(page);
await todoPage.goto();
await todoPage.addTodo('item1');

        await use(todoPage);

        await todoPage.removeAll()
    }

})
```

**Build in fixture**

| Fixture     | Type              | Des                                                                                      |
| ----------- | ----------------- | ---------------------------------------------------------------------------------------- |
| page        | Page              | Tạo 1 page riêng của test                                                                |
| context     | BrowserContext    | Tạo 1 context riêng cho test<br>Fixture page phía trên cũng cùng context với context này |
| browser     | Browser           | Browser được dùng chung giữa các test để tối ưu hoá tài nguyên                           |
| browserName | string            | Tên browser đang chạy<br>Có thể là chromium, firefox, webkit                             |
| request     | APIRequestContext | Một APIRequestContext instance độc lập                                                   |

**Tạo mới 1 fixture**

- Sử dụng test.extend() để tạo mới 1 test Object

```
import { test, Page } from '@playwright/test';

const testExtend = test.extend<{ dasboard: Page }>({
dasboard: async ({ page }, use) => {
//beforeEach
console.log("Login");

        //use
        await use(page);

        //afterEach
        console.log("Clean up data")
    }

})

export { testExtend };
```

```
import { testExtend } from 'fixture-file-path';

testExtend("Post page", async({ dasboard }) => {
console.log("Create");
})
```

Log:

- Login
- Create
- Clean up data

**note** Đồng bộ tên là test thay vì sử dụng test và testExtend như khai báo ở ví dụ trên sử dụng as đổi tên

```
import { test as base, Page } from '@playwright/test';

const test = base.extend<{ dasboard: Page }>({
dasboard: async ({ page }, use) => {
        //beforeEach
        console.log("Login");

        //use
        await use(page);

        //afterEach
        console.log("Clean up data")
    }
})

export { test };
```

```
import { test } from 'fixture-file-path';

test("Post page", async({ dasboard }) => {
    console.log("Create");
})
```

**Trong trường hợp dùng fixture và có cả các hook khác**

Luồng chạy:

beforeAll -> _beforeEach_ -> **beforeFixture** -> test -> _afterEach_ -> **afterFixture** -> afterAll

**merge fixture**

VD: trong trường hợp có 2 file fixture.ts và fixture1.ts

-> Tạo 1 file index.ts import 2 fixture trên sau đó mergeTests

```
import { test as test1 } from './fixture.ts';
import { test as test2 } from './fixture1.ts';
import { mergeTests } from 'playwright/test';

export const test = mergeTests(test1, test2)
```

```
import import { test } from './index.ts';

//fixture của test1
test("", async({ dasboard }) => {
    console.log("")
})

//fixture của tes2
test("", async({ dasboard1 }) => {
    console.log("")
})
```

**Managing enviroment variables**

Trog trường hợp có 2 môi trường khác nhau như test và dev có data khác nhau

1. Cài đặt thư viện dotenv: npm i dotenv --save
2. Tạo file .env
3. Tạo file data theo biến môi trường
4. import config vào file config của playwright

```
import { config } from 'dotenv'
config()
```

Để không phải if else check lại môi trường trong file test sử dụng fixture config

```
import { test as base } from '@playwright/test';

export class EnvCof {
get(key: string) {
let ketPostFix = "\_PROD";

        if(process.env.ENV === "dev") {
            ketPostFix = "_DEV"
        }

        return process.env[`${key}${ketPostFix}`]
    }

}

const test = base.extend<{ envConf: EnvCof }>({
envConf: async ({}, use) => {
const envConf = new EnvCof();

        await use(envConf);
    }

})

export { test };
```
