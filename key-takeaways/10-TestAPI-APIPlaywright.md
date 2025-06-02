# Kiến thức lesson 11

**API - Application Programming Interface**

Là công cụ trung gian giao tiếp giữa server và client

## Test API

Phát hiện lỗi sớm

**Định dạng API**

- XML(Extensible Markup Language):

1. Cấu trúc giống các thẻ HTML
2. Dùng cho SOAP

- JSON(Javascript Object Notation)

1. Cấu trúc dạng "key": value
2. "key" luôn có kiểu string, value fos thể là các kiểu string, arr, bool, num, obj, null
3. Dùng trong Rest(Representational State Transfer)

**Các loại API**

1. SOAP(Simple object access protocol)
2. RPC(Remote Procedure Call)
3. REST(Representational State Transfer)

**API Component**

- Giao tiếp vs nhau qua HTTP(không có mã hoá)/HTTPS(có mã hoá)
- Request:
  - URL
    - Base URL
    - Endpoint
    - Parameter
      - Đầu tiên: ?
      - Từ thứ 2: &
  - Method:
    - GET: Lấy dữ liệu
    - POST: Tạo mới dữ liệu
    - PUT: update toàn bộ dữ liệu
    - DELETE: xoá dữ liệu
    - PATCH: update 1 phần dữ liệu
    - OPTION: trả về danh sách các phương thức HTTP hỗ trợ endpoint
    - HEAD: giống GET nhưng chỉ trả về header
  - header
  - body
- Response
  - Status code:
    - 1xx: Phản hồi thông tin
      - 101: Switching protocol
    - 2xx: Thành công
      - 200: OK
      - 201: Created
    - 3xx: Chuyển hướng
      - 301, 302: Redirectd
    - 4xx: lỗi liên quan đến người dùng
      - 400: Bad Request
      - 404: Not found
    - 5xx: lỗi hệ thống
      - 500: Internal sever error
      - 502: Bad Gateway
  - header
  - body

**API Playwright**

- Sử dụng reques fixture để gọi API

  - Không cần thao tác qua trình duyệt
  - Gọi API trực tiếp trong code

- Exp

```
import { request, test } from '@playwright/test';

test("demo", async({reques}) => {
    const baseUrl = "url";

    const resp = await request.get(url + endpont&params)
})
```
