/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */


function sleep(seconds) {

    let done = false;
      return new Promise((resolve) => {
         setTimeout(() => {
           resolve("DONE")
        done = true;
      }, seconds);
  
      })
  } 
  
  sleep(1000)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
      
    })
  var counter = 0;
  for(var i=0;i< 1000000000;i++) {
    counter++;
  }
    console.log(counter)
  
  
  // var counter = 0;
  // for(var i=0;i< 1000000000;i++) {
  //   counter++;
  // }
  