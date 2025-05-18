// 1. In ra tất cả các phần tử của một mảng. Ví dụ mảng [1, 2, 3] thì in ra 1 2 3
let arr = [2, 1, 4];
arr.forEach((item) => {
  console.log(item);
});

console.log("========================================");

// 2.Tính tổng, tìm giá trị lớn nhất và nhỏ nhất trong một mảng. Ví dụ mảng [1, 2, 3] thì tổng sẽ là 6 (1+2+3) và giá trị lớn nhất là 3
let sum = 0;
let max = arr[0];
let min = arr[0];
arr.forEach((item) => {
  sum += item;
  if (item > max) {
    max = item;
  }
  if (item < min) {
    min = item;
  }
});

console.log("Tổng của mảng là:", sum);
console.log("Giá trị lớn nhất của mảng là:", max);
console.log("Giá trị nhỏ nhất của mảng là:", min);

console.log("========================================");

// 3.Tạo một mảng mới từ một mảng đã cho, trong đó mỗi phần tử được nhân đôi. Ví dụ mảng [1, 2, 3] thì mảng mới sẽ là [2, 4, 6]
let newArr = [];
arr.forEach((item) => {
  newArr.push(item * 2);
});

console.log(newArr);
