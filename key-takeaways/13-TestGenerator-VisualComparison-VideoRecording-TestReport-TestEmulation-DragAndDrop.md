# Kiến thức lesson 14

## async/await

Xử lý bất đồng bộ

- async: khai báo hàm bất đồng bộ luôn return 1 Promise
- await: Chờ 1 Promise hoàn thành

VD

```
test('async/await', async ({ page }) => {
  await page.goto('url');
  await page.click('button');
});
```

Trong trường hợp này không dùng await, các lệnh sẽ chạy đồng thời không theo thứ tự -> gây lỗi.

## Test generator

- Tự sinh code test khi thao tác với UI
- Record 1 test
  - Sử dụng VSC
    - Record new test
    - Record at cursor
  - Sử dụng terminal
    - npx playwright codegen <url>
- Pick locator

**Trường hợp dùng codegen**
|Trường hợp| Lý do|
|-|-|
|Tạo test nhanh từ giao diện |Giúp tự động rend thay vì viết code|
|Tìm đúng selector|Codegen tự chọn selector|
| test mới|Dùng làm nền, sau đó tối ưu lại|
|Test đơn giản, ít logic|Không cần viết thủ công nếu hành động đơn giản|

**Không nên dùng code gen**
|Trường hợp| Lý do|
|-|-|
|Test phức tạp, nhiều logic|không viết được logic rẽ nhánh, điều kiện|
|Test tái sử dụng|tạo mã lặp lại, không tối ưu|
|Muốn clean code, dễ bảo trì|Mã từ Codegen cần refactor lại nhiều|
|Tương tác với API, database, hoặc xử lý phức tạp|Codegen chỉ ghi lại UI, không hiểu logic ngoài giao diện UI|

## Visual comparison

- Generate screenshot(So sánh screenshot)

```
test("Visual", async({ page }) => {
    await page.goto("url");
    const dashboard = await page.locator('#dashboard');
    await expect(page).toHaveScreenShot('dashboard-screenshot.png')
})
```

VD: muốn ẩn 1 popup(ads) để screenshot bằng màu #000000

```
test("Visual", async({ page }) => {
    await page.goto("url");
    const ads = page.locator("#ads");
    const dashboard = await page.locator('#dashboard');
    await expect(page).toHaveScreenShot('dashboard-screenshot.png', {
        mask: [ads],
        maskColor: '#000000'
    })
})
```

## Video recording

- Record test thành video

Khai báo tại file PW-Config

```
export default definConfig({
    use: {
        video: {
            mode: 'on',
            size: { width: '', height: ''}
        }
    }
})
```

## Test report

Là tài liệu/tập hợp thông tin tổng hợp về kết quả chạy test, bao gồm:

1. Số lượng test case đã chạy, passed, failed.
2. Chi tiết các lỗi, bug gặp phải.
3. Thời gian thực hiện.
4. Môi trường test.
5. Đề xuất hoặc ghi chú bổ sung.

- npx playwright test --trace on
- npx playwright show-report

## Test emulation

Mô phỏng các điều kiện hoặc thiết bị cụ thể để kiểm tra ứng dụng web trong các môi trường khác nhau

1. **Device emulation (Mô phỏng thiết bị di động)**

- Mô phỏng kích thước màn hình, tỷ lệ điểm ảnh (DPR), user agent, touch events,...
- Giúp test responsive UI, giao diện trên điện thoại, tablet.

```
import { devices, test } from '@playwright/test';

test.use({
  ...devices['iPhone X'],
});

test('iPhone X', async ({ page }) => {
  await page.goto('url');
});
```

2. **Geolocation emulation (Mô phỏng vị trí địa lý)**

- Giúp test tính năng định vị, bản đồ, hay nội dung tùy theo vùng miền

```
await context.grantPermissions(['geolocation']);
await context.setGeolocation({ latitude: 10.32, longitude: 106.31 });

const page = await context.newPage();
await page.goto('url');
```

3. **Network conditions emulation (Mô phỏng mạng)**

- Giảm băng thông, tăng độ trễ để test trên mạng chậm, 3G, offline...

```
await context.route('**/*', route => route.continue());
await context.setOffline(true);  // mô phỏng mất mạng

// Giới hạn băng thông và delay
await context.route('**/*', route => route.continue());
await context.setNetworkConditions({
  offline: false,
  downloadThroughput: 500 * 1024 / 8,
  uploadThroughput: 500 * 1024 / 8,
  latency: 100, // ms
});
```

4. **Timezone emulation (Mô phỏng múi giờ)**

- Test ứng dụng hiển thị thời gian đúng theo múi giờ khác nhau.

```
await context.setTimezoneId('Asia/Ho_Chi_Minh');
```

**Khai báo trong file pw-Config**

```
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'iPhone 13 - VN',
      use: {
        ...devices['iPhone 13'],
        timezoneId: 'Asia/Ho_Chi_Minh',
        geolocation: { latitude: 10.762622, longitude: 106.660172 },
        permissions: ['geolocation'],
        // Giới hạn mạng giả lập 3G
        networkConditions: {
          offline: false,
          downloadThroughput: 750 * 1024 / 8,  // ~750kbps
          uploadThroughput: 250 * 1024 / 8,    // ~250kbps
          latency: 100,                        // 100ms delay
        },
      },
    },
    {
      name: 'Desktop Chrome',
      use: {
        browserName: 'chromium',
        timezoneId: 'Europe/London',
      },
    },
  ],
});
```

## Drag and drop

Sử dụng với những webbuilder - wordpress

C1:

- Lấy điểm đầu và điểm cuối
- Sau đó drag and drop

```
test("Drag and drop", async({ paht }) => {
    await page.goto("url");

    const first = "#first";
    const last = "#last";

    await page.dragAndDrop(start, end);
})
```

C2:

```
test("Drag and drop 2", async({ paht }) => {
    await page.goto("url");

    const first = "#first";
    const last = "#last";

    await page.locator(first).hover();
    await page.mouse.down();

    await page.locator(last).hover();
    await page.mouse.up();
    await page.dragAndDrop(start, end);
})
```

## Global setup and teardown

- **Global setup**: Chạy trước khi tất cả các test chạy, chỉ chạy một lần duy nhất.
- **Global teardown**: Chạy sau khi tất cả các test chạy, chỉ chạy một lần duy nhất.

```
import { test as setup } from '@playwright/test';

setup("setup env", async() =>{

})
```

Và thêm vào file Config

```
import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: require.resolve('./global-setup'),
  globalTeardown: require.resolve('./global-teardown'),
});
```
