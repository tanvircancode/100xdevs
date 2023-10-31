
enum Arithmetic {
    Add, 
    Sub, 
    Div,  
    Mul
}

function calculate (a: number , b:number , type:Arithmetic) {
    console.log(type);
    return Arithmetic.Mul;
}

console.log(calculate(5,4,Arithmetic.Div));