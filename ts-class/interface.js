"use strict";
function greet(person) {
    return person.orientation + " " + person.gender;
}
// export function greet(person : PersonInterface): string {
//   return "Name is " + person.name + " and age is " + person.age;
// }
// console.log(greet({
//   name : 'Tanvir',
//   age : 21
// }));
// class Person implements PersonInterface {
//   name : string;
//   age : number;
//   address : string;
//   constructor(name: string, age: number,address : string ) {
//       this.name = name;
//       this.age = age;
//       this.address = address;
//   }
//   greet() : string {
//     return "Hi Mr. " + this.name;
//   }
// }
// let personObject = new Person('Tanvir', 25, "Bd");
// console.log(personObject.greet());
console.log(greet({
    name: "Tanvir",
    age: 27,
    gender: "male",
    orientation: "straight",
}));
