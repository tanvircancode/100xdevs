const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;

var numberOfRequests = 0;

function middleware1 (req, res, next) {
    numberOfRequests += 1;
    console.log("Total number of requests : " + numberOfRequests );
//    res.send("Error is occuring");
    next() ;
}

app.use(middleware1);
app.use(bodyParser.json());



function calculateSum(counter) {
    var sum = 0;
    for(var i=1;i<= counter ; i++) {
        sum += i;
    }
    return sum;
}

function calculateMul(counter) {
    var mul = 1;
    for(var i=1;i<= counter ; i++) {
        mul *= i;
    }
    return mul;
}

function handleSecondRequest(req, res) {
    
        var counter = req.query.counter;
        var calculatedSum = calculateSum(counter);
        var calculatedMul = calculateMul(counter);

        var answerObject = {
            sum : calculatedSum,
            mul : calculatedMul
        }
        res.status(200).send(answerObject);
}

function givePage(req, res) {
 res.status(200).send(`
  <!DOCTYPE html>
 <html>
 <body> 
 
 <h1>My First Heading</h1>
 <p>My first paragraph.</p>
 
 </body>
 </html>
 `)
}

function handleFirstRequest(req, res) {
    
    // var counter = req.query.counter;
    var counter = req.query.counter;
    if(counter<1000000) {
        var totalSum = calculateSum(counter);
        res.send(`Sum is : ${totalSum}`);
    }else {
        res.status(401).send("You have sent very big number ");
    }
    
}

function createUser(req, res) {
    res.send("Hello World")
}

// app.get('/handleSum', handleFirstRequest);
app.get('/handleSum', handleSecondRequest);
app.get('/', givePage);


function started() {
  console.log(`Example app listening on port ${port}`)
}

app.listen(port, started);



// console.log();