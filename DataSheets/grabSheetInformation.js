/*
 @OnlyCurrentDoc
*/

//test variable -- id of the spreadsheet

const spreadsheetId = "1tAJVIBvZ69JeM_S2sIZmppr1cnuHOTTMWpAwfjjaZTY";

//this function will handle grabbing the data from the spreadsheet
//and uploading it to BigQuery
function grabSheetInformation(spreadsheetId) {
  let ss = "";
  if (spreadsheetId == null) {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  } else {
    ss = SpreadsheetApp.openById(spreadsheetId);
  }
  //the name of the spreadsheet will be the name of the dataset
  const datasetId = ss.getName();
  //the table will be the name of the sheet
  const sheets = ss.getSheets();
  // create an array of the sheets names in the spreadsheet
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
      datasetId: datasetId,
      sheetName: sheetNames[i],
      headers: headers[i],
      rows: rows[i],
    });
  }
  Logger.log(data[0]);
  return data;
}

//write the data to bigquery
function writeToBigQuery(data) {
  const datasetId = data[0].datasetId;

  //if dataset doesn't exist, create it
  const dataset = BigQuery.Dataset(datasetId);
  if (!dataset.exists()) {
    dataset.create();
  }

  //create a table for each sheet
  for (let i = 0; i < data.length; i++) {
    const tableId = data[i].sheetName;
    const table = dataset.table(tableId);
    if (!table.exists()) {
      table.create({
        schema: {
          fields: data[i].headers,
        },
      });
    }
    //insert the data into the table
    const rows = data[i].rows;
    for (let j = 1; j < rows.length; j++) {
      table.insert(rows[j]);
    }
  }

  //for each object in the data array create a table in bigquery

  for (let i = 0; i < data.length; i++) {
    const sheetName = data[i].sheetName;
    const data = data[i].rows;

    //
  }
}
