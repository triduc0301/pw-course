# Kiến thức lesson 10

**Class**

1. extends: class con sẽ thừa hưởng property, method của class cha
2. super:

- Khi class con có constructor, gọi super() trước khi sử dụng this.
- Khi class con ghi đè một method, property (override).

```
class Child extends Parent {
    //property
    ...

    constructor(page: Page) {
        super(page);
    }

    //method
    ...
}
```

**POM**

- Là 1 design pattern
- Tái sử dụng code, tổ chức code, maintain

Core concept:

- Mỗi page là 1 class
- Có property và method riêng

```
playwright-project/
├── tests/
│ ├── example.spec.ts
│ ├── login/
│ │ └── login.spec.ts
│ └── dashboard/
│ └── dashboard.spec.ts
│
├── pages/ # Page Object Models (POM)
│ ├── LoginPage.ts
│ └── DashboardPage.ts
...
└──
```
