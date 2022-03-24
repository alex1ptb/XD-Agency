/*
 @OnlyCurrentDoc
*/

//test variable -- id of the spreadsheet

const spreadsheetId = "1tAJVIBvZ69JeM_S2sIZmppr1cnuHOTTMWpAwfjjaZTY";

//this function will handle grabbing the data from the spreadsheet
//and uploading it to BigQuery
function grabSheetInformation(spreadsheetId) {
  if (spreadsheetId == null) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
  } else {
    const ss = SpreadsheetApp.openById(spreadsheetId);
  }
  //the name of the spreadsheet will be the name of the dataset
  const datasetId = ss.getName();
  //the table will be the name of the sheet
  // create an array of the sheets names in the spreadsheet
  const sheets = ss.getSheets();
  const sheetNames = [];
  for (let i = 0; i < sheets.length; i++) {
    sheetNames.push(sheets[i].getName());
  }
  //create an array of the rows in the spreadsheet
  const rows = [];
  for (let i = 0; i < sheets.length; i++) {
    rows.push(sheets[i].getDataRange().getValues());
  }
  //create an array of the headers in the spreadsheet
  const headers = [];
  for (let i = 0; i < sheets.length; i++) {
    headers.push(sheets[i].getDataRange().getValues()[0]);
  }

  //combine the arrays into one array of objects
  const data = [];
  for (let i = 0; i < sheets.length; i++) {
    data.push({
      sheetName: sheetNames[i],
      headers: headers[i],
      rows: rows[i],
    });
  }
  return data;
}

//write the data to bigquery
function writeToBigQuery(data) {
  //the dataset name will be the name of the spreadsheet
  const ssName = SpreadsheetApp.getActiveSpreadsheet().getName();
  //loop through the data and write it to bigquery
  for (let i = 0; i < data.length; i++) {}
  //the name of the tables is data.sheetName
  //the headers are data.headers
  //the rows are data.rows
  //the dataset name is ssName
}
