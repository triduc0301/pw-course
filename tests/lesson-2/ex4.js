const prompt = require('prompt-sync')();

let height = prompt("Nhập vào chiều cao của bạn(cm):");

console.log("Cân nặng lý tưởng của bạn là:", ((height % 100)*9)/10, "Cân nặng tối đa là:", height % 100, "Cân nặng tối thiểu là: ", ((height % 100)*8)/10);
