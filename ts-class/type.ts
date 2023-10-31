// basic example

// interface GenderInterface   {
//   gender : string;
// }

// type PersonInterface  = {
//     name : string;
//     age : number;
//     gender : GenderInterface;
// }

// export function greet(person : PersonInterface) {
//     return "His name is " + person.name + " and gender is : " + person.gender.gender;
// }

// console.log(greet({
//   name : 'tanvir',
//   age : 28,
//   gender : {
//     gender : 'Male'
//   }
// }))

// shape example

interface Circle {
  radius: number;
}
interface Square {
  side: number;
}
interface Rectangle {
  side: number;
  height: number;
}

type Shape = Circle | Square | Rectangle;

function renderShape(shape: Shape) {
  console.log('rendered');
}

function calculateArea(shape: Shape) {
  console.log('Calculate area');
}

console.log(renderShape({
radius : 10,
side: 5,
height: 7

}))