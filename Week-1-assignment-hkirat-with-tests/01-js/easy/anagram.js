function isAnagram(str1, str2) {

  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  
  if(str1.length != str2.length) {
    return false;
  }

    var sortedstr1 =  str1.split("").sort();
  
    var sortedstr2 =  str2.split("").sort();
  
  for(var i=0;i<str1.length;i++) {
    if(sortedstr1[i] != sortedstr2[i]) {
      return false;
    }
  }
  
  
    return true;
  
  
}


module.exports = isAnagram;
