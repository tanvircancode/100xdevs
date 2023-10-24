const fs = require('fs');


function clean(data) {
    var arr = data.split(" ");
    var answerArr = [];
    for(var i=0;i<arr.length;i++) {
     if(arr[i].length !== 0) {
       answerArr.push(arr[i]);
     }
  }
  console.error(answerArr);
  const asnwerString = answerArr.join(' ');
  console.error(asnwerString);
  return asnwerString;
  
}

function writeFile(data) {
  
        fs.writeFile('file.txt',data, 'utf8', (err) => {
    if(err) {
    console.error(err);
    return;
  }
    
  })
  
}

function fileRead(err, data) {
   if(err) {
    console.error(err);
    return;
  }
 var cleanedData = clean(data);
  writeFile(cleanedData);

}

fs.readFile('file.txt','utf8', fileRead)

