/*
 @OnlyCurrentDoc
*/

//The following functions are used to grab the current information from the spreadhsheet for uploading to bigquery

function getSpreadsheet(spreadsheetId) {
  let ss = "";
  if (spreadsheetId == null) {
    return (ss = SpreadsheetApp.getActiveSpreadsheet());
  } else {
    return (ss = SpreadsheetApp.openById(spreadsheetId));
  }
}

//this function will handle grabbing the data from the spreadsheet
//and uploading it to BigQuery
function grabSheetInformation(ss) {
  //the name of the spreadsheet will be the name of the dataset
  let datasetId = ss.getName();
  // console.log(`datasetId: ${datasetId}`);

  //make datasetID a valid BigQuery dataset ID
  datasetId = datasetId.replace(/\s/g, "_");
  //replace ampersand with "_and_"
  datasetId = datasetId.replace(/&/g, "_and_");

  //if datasetId doesn't exist, create it
  try {
    BigQuery.Datasets.get(projectNumber, datasetId);
    console.log("dataset exists");
  } catch (err) {
    BigQuery.Datasets.insert(projectNumber, datasetId);
    console.log(`dataset doesn't exist. err: ${err} \n creating dataset`);
  }

  //the table will be the name of the sheet
  const sheets = ss.getSheets();
  // create an array of the sheets names in the spreadsheet
  const sheetNames = [];
  let sheetID = "";
  for (let i = 0; i < sheets.length; i++) {
    sheetNames.push(sheets[i].getName());
    sheetID = sheets[i].getSheetId();
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
      sheetID: sheetID,
      datasetId: datasetId,
      sheetName: sheetNames[i],
      headers: headers[i],
      rows: rows[i],
    });
  }
  Logger.log(data[0]);
  return data;
}
