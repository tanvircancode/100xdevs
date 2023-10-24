/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

function calculateTotalSpentByCategory(transactions) {

  const categoryTotalMap = {};
  
  for(var i = 0; i < transactions.length;i++) {
     var transaction = transactions[i];

    if(!categoryTotalMap[transaction.category]) {
      categoryTotalMap[transaction.category] = transaction.price;
    }
    else {
      categoryTotalMap[transaction.category] += transaction.price;
    }
  }
    console.log(categoryTotalMap);
    // console.log(Object.keys(categoryTotalMap));
    const keys = Object.keys(categoryTotalMap);
   const answer = [];
   for(var i = 0; i < keys.length; i ++) {
      answer.push({category : keys[i], totalSpent : categoryTotalMap[keys[i]]});
      // console.log(categoryTotalMap[keys[i]])
   }
      console.log(answer)
  
  

    return answer;
}

module.exports = calculateTotalSpentByCategory;
