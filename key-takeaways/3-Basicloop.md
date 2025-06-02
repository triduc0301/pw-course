# Kiến thức lesson 4

## Javascript

**Phạm vi của biến**

var: global, có thể sử dụng trước khi khởi tạo -> undifined

let: scope, trong cặp ngoặc {} -> sử dụng let sẽ dễ control hơn -> k thể sử dụng khi chưa khởi tạo

**Câu lệnh điều kiện**

1. if, else
2. if, elseif, else
3. switch case default

**So sánh**

1. ==, !=: so sánh về mặt giá trị ví dụ 13=='13' không quan trọng data type
2. ===, !==: so sánh tuyệt đối và cả datatype

**Vòng lặp nâng cao**

1. for in
   let items = {
   id: 1,
   id: 2,
   id: 3
   }

- for(let item in items) {console.log(items[item]) => print 1,2,3}

2. forEach

- array.forEach((value, index) {})
- Object.keys(obj).forEach(key => {console.log(key, obj[key])})

3. for of
   for(let value of array) {}

**Break và continue**
Dùng để điều khiển loop

- continue: loop tiếp vòng
- break: thoát loop khi thoả mãn 1 đk
