# Kiến thức lesson 15

## Quy trình xây dựng framework

1. **Chọn framework automation test.**
   - Chọn dựa trên các tiêu chí:
   - Server hệ thống support
   - Framework (fw) đủ nhanh, learning curve vừa phải cho cả team có thể follow được.
   - Cộng đồng support cho framework active.
   - Có chuyên gia (có thể là dev/ QA) khá giỏi trong ngôn ngữ mà bạn chọn.
2. **Xây dựng framework**
   - Cử 1-2 bạn xây dựng base project, viết các base page, utils functions để giúp việc code nhanh hơn. Tránh việc làm đi làm lại cùng một việc
   - Xây dựng hệ thống conventions, document các workflows lại.
3. **Tiến hành chạy thử trên quy mô nhỏ, sửa đổi fw sao cho cảm thấy khá ưng ý**

Cấu trúc thư mục gợi ý

```
├── README.md
├── constants
├── fixtures
├── node_modules
├── package-lock.json
├── package.json
├── playwright.config.ts
├── pom
├── tests
├── tests-examples
└── utils
```

Trong đó:

- README.md: file tài liệu, chứa cách cài đặt, các conventions, lưu ý và các lỗi thường gặp.
- constants: folder chứa các hằng số thường dùng cho toàn bộ dự án.
- playwright.config.ts: file config theo môi trường
- pom: folder chứa các page object model
- utils: folder chứa các hàm utils dùng cho dự án.
- fixtures: folder chứa các fixture viết sẵn cho dự án.
- .gitignore: file chứa các ignore file

## CI/CD

**CI: Continuous Integration**

- Là quá trình tự động hóa việc gộp code mới từ nhiều lập trình viên vào nhánh chính (main branch) thường xuyên, có thể là nhiều lần trong ngày.
- Mỗi lần có code mới được đẩy lên, hệ thống sẽ tự động build, test, kiểm tra code để phát hiện lỗi sớm.

**CD: Continuous Delivery**

- Sau khi CI hoàn tất, code được tự động build thành bản deploy (hoặc package) và sẵn sàng đưa lên môi trường staging hoặc production. Nhưng bước deploy này vẫn do con người quyết định thực hiện

## CI/CD trong Playwright

- Khi bạn có bộ test Playwright, bạn muốn tự động chạy test mỗi khi có thay đổi code, để đảm bảo app không bị lỗi UI, chức năng.
- CI trong Playwright: Mỗi khi dev push code lên repo (GitHub, GitLab, etc), hệ thống CI (như GitHub Actions, Jenkins, GitLab CI...) sẽ tự động chạy test Playwright.
- CD trong Playwright: Nếu test thành công, có thể tự động deploy app lên môi trường thử nghiệm hoặc production.

**Exp GithubAction**

.github/workflows/playwright.yml

```
name: Playwright Tests **//Tên workflow, hiển thị trên GitHub Actions UI.**

on:  //Xác định sự kiện nào kích hoạt workflow này
  push:
    branches: [ main, master ] //Khi có push vào nhánh main hoặc master.
  pull_request:
    branches: [ main, master ] //Khi có pull_request mở/ cập nhật trên nhánh main hoặc master.

jobs: //Định nghĩa các job (công việc) sẽ chạy trong workflow.
  test:
    timeout-minutes: 60 //Giới hạn thời gian chạy job tối đa 60 phút, nếu quá sẽ tự dừng.
    runs-on: ubuntu-latest // Job sẽ chạy trên máy ảo Linux Ubuntu phiên bản mới nhất.
    steps:
      - uses: actions/checkout@v4 // Checkout (clone) mã nguồn repo hiện tại vào runner để có thể thao tác.

      - uses: actions/setup-node@v4 //Cài đặt Node.js trên runner.
        with:
          node-version: lts/* //Dùng phiên bản Node LTS mới nhất.

      - name: Install dependencies
        run: npm ci //Chạy lệnh npm ci để cài toàn bộ package phụ thuộc theo package-lock.json (đảm bảo cài đúng phiên bản).

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps // để tải các browser cần thiết (Chromium, Firefox, WebKit) cùng các thư viện hệ thống (Linux dependencies).

      - name: Run Playwright tests
        run: npx playwright test //để thực thi toàn bộ test được viết bằng Playwright.

      - uses: actions/upload-artifact@v4 //Tải lên artifact (kết quả test, báo cáo, screenshot) để lưu trữ.
        if: ${{ !cancelled() }} //chỉ chạy nếu job không bị hủy giữa chừng.
        with:
          name: playwright-report //tên gói artifact.
          path: playwright-report/  //đường dẫn thư mục chứa báo cáo Playwright (mặc định).
          retention-days: 30 //giữ artifact 30 ngày trên GitHub.
```

**Exp GitlabCI**

.gitlab-ci.yml

```
stages: //Định nghĩa các giai đoạn (stage) trong pipeline, ở đây chỉ có 1 giai đoạn là test.
  - test

test-playwright: //job trong pipeline, tên job là test-playwright.
  image: mcr.microsoft.com/playwright //Sử dụng Docker image có sẵn của Microsoft chứa sẵn môi trường để chạy Playwright (bao gồm Node.js, browser, dependencies). Giúp chạy test trên môi trường đồng nhất, không phải setup thủ công.
  stage: test
  script:
    - npm ci //cài đặt dependencies đúng theo package-lock.json (cài mới sạch sẽ).
    - npx playwright install --with-deps //cài đặt các trình duyệt Chromium, Firefox, WebKit và các thư viện hệ thống cần thiết.
    - npx playwright test //chạy toàn bộ bộ test Playwright.
  artifacts:
    when: always // luôn lưu artifact dù test pass hay fail.
    paths: //Lưu toàn bộ nội dung trong thư mục playwright-report (thường là report, screenshot, video... do Playwright tạo ra).
      - playwright-report/**
```
