"use strict";
// basic example
function renderShape(shape) {
    console.log('rendered');
}
function calculateArea(shape) {
    console.log('Calculate area');
}
console.log(renderShape({
    radius: 10,
    side: 5,
    height: 7
}));
