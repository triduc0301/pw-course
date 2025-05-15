// 1.Tính tổng từ 1 đến 100.
let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum += i;
}
console.log(sum);

// 2. In bảng cửu chương từ 2 đến 9.
for (let i = 2; i <= 9; i++) {
  console.log("Bảng", i, ":");
  for (let j = 1; j <= 10; j++) {
    console.log(i, "x", j, "=", i * j);
  }
}

// 3. Tạo một mảng chứa các số lẻ từ 1 đến 99.
let arrNum = [];
for (let i = 1; i <= 99; i++) {
  if (i % 2 !== 0) arrNum.push(i);
}

console.log(arrNum);

// 4. In ra 10 email dựa trên tên người dùng và số thứ tự (ví dụ: user1@example.com, user2@example.com, ..., user10@example.com).
for (let i = 1; i <= 10; i++) {
  console.log("user" + i + "@example.com");
}

// 5.Tính tổng doanh thu của 12 tháng trong năm dựa trên mảng doanh thu đã cho và
// in ra tổng doanh thu. Biết cấu trúc object của mảng doanh thu như sau:
// {“month”: 2, “total”: 100}
let money = [
  {
    month: 1,
    total: 10,
  },
  {
    month: 2,
    total: 10,
  },
  {
    month: 3,
    total: 10,
  },
  {
    month: 4,
    total: 10,
  },
  {
    month: 5,
    total: 60,
  },
  {
    month: 6,
    total: 70,
  },
  {
    month: 7,
    total: 10,
  },
  {
    month: 8,
    total: 10,
  },
  {
    month: 9,
    total: 10,
  },
  {
    month: 10,
    total: 10,
  },
  {
    month: 11,
    total: 10,
  },
  {
    month: 12,
    total: 10,
  },
];

let sumMoney = 0;
for (let i = 0; i < money.length; i++) {
  sumMoney += money[i].total;
}

console.log(sumMoney);
