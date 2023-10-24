/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/


function delayInSeconds(seconds) {
    return new Promise((resolve) => {
       if(seconds <= 0) {
         resolve();
       }
      else {
        setTimeout(() => {
          resolve(`Promise resolved after ${seconds} seconds`)
        }, seconds * 1000);
      }
    })
  }
  
  
  delayInSeconds(3)
     .then((result) => {
       console.log(result)
     })
     .catch(() => {
       console.log(`Promise rejected : `, error)
     })