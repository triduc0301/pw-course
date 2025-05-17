// 1. In ra tên và giá trị của mỗi thuộc tính trong một đối tượng. Ví dụ: object student = {“name”: “Alex”, “age”: 10} thì in ra name=Alex age=10
let student = {
  name: "Alex",
  age: 10,
};

for (let info in student) {
  console.log(info, "=", student[info]);
}

console.log("=========================================");

// 2. Tính tổng các giá trị số của các thuộc tính trong một đối tượng.
let student2 = {
  name: "Alex",
  age: 10,
  salary: 20,
};

let sum = 0;
for (let info in student2) {
  if (typeof student2[info] === "number") sum += student2[info];
}
console.log("Tổng values có dạng number trong object trên là:", sum);
console.log("=========================================");

// 3. Tạo một mảng chứa tất cả các tên thuộc tính của một đối tượng. Ví dụ object student={“name”: “Alex”, “age”: 10} thì sẽ tạo ra một mảng [“name”, “age”]
let newArr = [];
for (let info in student) {
  newArr.push(info);
}

console.log(newArr);
