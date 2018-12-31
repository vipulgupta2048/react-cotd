"use strict"
var y = 20
  function sayHello(){
  var x = ["a", 12, 2 , "cc", [1,2,3], 8.98, x+x ]
  while (y>10) {
    if (x[1]==y){
      console.log("A number has has arrived " +y)
      y = y - 1
      continue
    }
    console.log("Written")
    y = y-1
  }
}


// console.log(typeof x[0])

// Odd and Even through conditional operator ?
// var x = 5
// var result = (x % 2 == 0)  ? "even" : "odd"
// console.log(result)

// Hoisting - Using variables before even their declaration
// for (var x =0; x<5; x++) {
//   console.log("" +x)
// }
// console.log("The number will be 5 : " +x)

// var bro = 10
// console.log("You said Hello in function " +bro) {
//   let bro = 100
//   console.log("set value is "+bro)
// }

// {
//   let bro = 10;
//   document.write(bro); {
//     let bro = 100;
//     document.write(bro)
//   }
// }
