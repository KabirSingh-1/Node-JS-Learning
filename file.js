const fs = require("fs");
// sync
// fs.writeFileSync("./test.txt", "Hey Kabir")

// async
// fs.writeFile("./test.txt","Hello World Async",(err) => {})

// const result = fs.readFileSync("./Contacts.txt","utf-8");
// console.log(result)

// fs.readFile("./Contacts.txt","utf-8", (err ,result) =>{
//     if(err){
//         console.log("Error", err);
//     }else{
//         console.log(result);
//     }
// })
// async does not return anything 
fs.appendFileSync("./test.txt",`Hey There\n`);

// fs.cpSync("./test.txt","./copy.txt");
// fs.unlinkSync("./copy.txt");
console.log(fs.statSync("./test.txt").isFile());