"use strict";
var Arithmetic;
(function (Arithmetic) {
    Arithmetic[Arithmetic["Add"] = 0] = "Add";
    Arithmetic[Arithmetic["Sub"] = 1] = "Sub";
    Arithmetic[Arithmetic["Div"] = 2] = "Div";
    Arithmetic[Arithmetic["Mul"] = 3] = "Mul";
})(Arithmetic || (Arithmetic = {}));
function calculate(a, b, type) {
    console.log(type);
    return Arithmetic.Mul;
}
console.log(calculate(5, 4, Arithmetic.Div));
