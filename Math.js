// function add(a ,b){
//     return a+b;
// }
// function sub(a ,b){
//     if(a>b){
//         return a-b;
//     }
//     return b-a;
// }
// module.exports = {
//     add,
//     sub,
// }

exports.add = (a, b) => a+b;
exports.sub = (a,b) => {
    if(a>b) return a-b;
    else return b-a;
}

