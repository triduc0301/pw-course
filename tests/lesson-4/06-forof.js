// 1. Tìm và in ra vị trí phần tử đầu tiên và cuối cùng trong một mảng bằng với giá trị cho trước.
// Ví dụ với mảng [1, 2, 3, 4, 3, 55, 23] và
// giá trị cho trước là 3 thì vị trí cần in ra đầu tiên là 2 và vị trí cuối cùng cần in ra là 4.
let arr = [1, 5, 3, 4, 3, 55, 23];
let a = 3;
for (let num of arr) {
  if (num === 3) {
    console.log(
      "Vị trí phần tử đầu tiên là:",
      arr[num - 2],
      "và cuối cùng là:",
      arr[num]
    );
    break;
  }
}

console.log("======================================");

// 2.Tạo mảng chứa các kí tự nghịch đảo từ một chuỗi đã cho. Ví dụ với chuỗi ”Playwright”
// thì mảng kết quả sẽ là [“t”, “h”, “g”, “i”, “r”, “w”, “y”, “a”, “l”, “P”] => dua vao bai tap for
let str = "Playwright";
//takenote: str có 10 kí tự mà mảng bắt đầu từ [0]
for (let i = str.length - 1; i >= 0; i--) {
  console.log(str[i]);
}
console.log("======================================");

// 3.Lọc ra tất cả các phần tử duy nhất trong một mảng. Ví dụ với mảng [1, 2, 3, 1, 2, 4, 5] thì các phần tử duy nhất (xuất hiện 1 lần) là: [3, 4, 5]
let arrNew = [1, 2, 3, 1, 2, 4, 5];
let uniqueArr = [];
let countNum = {};
for (let item of arrNew) {
  if (countNum[item]) {
    countNum[item] += 1;
  } else {
    countNum[item] = 1;
  }
}

for (let item of arrNew) {
  if (countNum[item] === 1) {
    uniqueArr.push(item);
  }
}
console.log(uniqueArr);
