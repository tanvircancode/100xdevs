// type Input = (number | string)[];

// function getFirstElement(arr: Input): number | string {
//   return arr[0];
// }
// const ans1 = getFirstElement([9, 3, 4]);
// const ans2 = getFirstElement(["cow", "dog", "goat"]);

// console.log(ans2);

// ans2.toLowerCase();

//Template T

type User = {
  name: string;
  age: number;
};

function getFirstElement<T>(arr: T[]): T {
  return arr[1];
}

function swapArgs<T, U>(a: T, b: U): [U, T] {
  return [b, a];
}

const ans1 = getFirstElement<number>([9, 3, 4]);
const ans2 = getFirstElement<string>(["cow", "dog", "goat"]);
const ans3 = getFirstElement<User>([
  {
    name: "tanvir",
    age: 27,
  },
  {
    name: "tanjir",
    age: 22,
  },
  {
    name: "sabat",
    age: 14,
  },
]);

// console.log(ans3);
ans2.toLowerCase();

const ans4 = swapArgs(1, "two");
// console.log(ans4);

interface Todo {
  id: number;
  description: string;
  title: string;
  done: boolean;
}

type UpdateTodoInput = Partial<Todo>;

function updateTodo(id: number, newProp: UpdateTodoInput) {
 
}

updateTodo(1, {
  title: "go to gym",
  description: "Everyday at 8 am",
});
