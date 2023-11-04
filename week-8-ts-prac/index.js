"use strict";
// type Input = (number | string)[];
function getFirstElement(arr) {
    return arr[1];
}
function swapArgs(a, b) {
    return [b, a];
}
const ans1 = getFirstElement([9, 3, 4]);
const ans2 = getFirstElement(["cow", "dog", "goat"]);
const ans3 = getFirstElement([
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
const ans4 = swapArgs('5', "two");
console.log(ans4);
ans2.toLowerCase();
