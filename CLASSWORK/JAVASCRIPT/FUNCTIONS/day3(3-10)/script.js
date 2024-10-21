// type conversion or coercion


//integer
console.log("20" + 5); //205 ==> String concatenation string randum onnich verum + avilla (+/they contannate)
console.log("20"- 5); //15 ==>  the string act like integer 
console.log("20" * 5) //100 the string act like integer 
console.log("20" /5)// 4 the string act like integer 

//Boolean
console.log(true +1) // true=1 coverted to 1 and they + o/p is 2
console.log(false +2)// false=0 o/p=2
console.log(Number("42"))//42 converted to strig
console.log(Number("Heloo"))// NaN real stringine number akn pattullla


console.log(typeof String(123)) //"123"
console.log(String(true)) // true

console.log(Boolean(0))//flase 
console.log(Boolean(''))//false ==>empty also false
console.log(Boolean('hello'))//true
console.log(Boolean(3))// true


console.log(parseInt("15.99")) //15 only cut the decimal point
console.log(parseFloat("15.99")) //15.99 they take the decimal point