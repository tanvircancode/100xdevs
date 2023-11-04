import 'google-apps-script';

function fetchDataFromNYCOpenData() {
   var apiKey = 'YOUR_API_KEY'; // Replace with your NYC Open Data API key
   var datasetUrl = 'https://data.ny.gov/resource/mdbu-nrqn.json?$select=OMONumber,OMOAwardAmount';

   var options = {
     method: 'get', // Explicitly specify the HTTP method as GET
     headers: {
       'X-App-Token': apiKey
     }
   };

   var response = UrlFetchApp.fetch(datasetUrl, options);
   console.log(response)
//    var data = JSON.parse(response.getContentText());

//    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//    sheet.clear(); // Clear the existing data

//    var values = data.map(function (row) {
//      return [row.OMONumber, row.OMOAwardAmount];
//    });

//    sheet.getRange(1, 1, values.length, 2).setValues(values);
}
