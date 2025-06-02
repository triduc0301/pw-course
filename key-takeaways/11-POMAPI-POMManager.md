# Kiến thức lesson 12

## POM API

Mục tiêu:

- File test gọn gàng
- Không chứa các setup (baseURL, url của các api)

Cách tổ chức POM:

- Có thuộc tính: request, baseURL
- define các endpoint giống như các Xpath

Exp

```
import { APIRequestContext } from '@playwright/test';

export class ConduitPage {
    request: APIRequestContext;
    baseURL: string

    constructor(request: APIRequestContext, baseURL: string) {
        this.request = request;
        this.baseURL = baseURL;
    }

    //method
    ...
}
```

## POM Style

**POM manager**

- Quản lý nhiều page object
- Các page object có thể được tạo và truy cập từ một nơi duy nhất
- Các page object độc lập với nhau
- Các page chỉ được tạo khi cần thiết
- Chứa các func gọi class khác

Exp

```
export class POMManager {
    page: page

    constructor(page: Page) {
        this.page = page;
    }

    getLoginPage(){
        return new LoginPage();
    }
}
```

**Return POM from another POM**

- Các method của 1 page object trả về page object khác

## Kiến thức bổ sung

**expect().toBeInstanceOf()**

Để kiểm tra một đối tượng có thuộc kiểu của một class hay không, ta dùng expect().toBeInstanceOf():

```
const myPage = await basePage.gotoPage("Product page");
expect(myPage).toBeInstanceOf(ProductPage);
```

**ép kiểu**
Khi một hàm trả về nhiều kiểu giá trị, ta có thể “ép kiểu” (hay còn gọi là type casting) tới một kiểu giá trị mong muốn.

Việc này giúp cụ thể kiểu giá trị của Object, giúp code dễ dàng hơn.

Để thực hiện ép kiểu, ta dùng cú pháp:

```
object as Class
```

Ví dụ:

```
const myPage = await basePage.gotoPage("Product page");
productPage = myPage as ProductPage;
```
