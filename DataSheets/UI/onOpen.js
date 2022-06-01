/**
 * @OnlyCurrentDoc
 */

//constant variables for the entire spreadsheet
const projectId = "xd-agency";
const projectNumber = "659831782100";
//test variable -- id of the spreadsheet
// const spreadsheetId = "1tAJVIBvZ69JeM_S2sIZmppr1cnuHOTTMWpAwfjjaZTY";
//constant variables for the codebase
// const ss = getSpreadsheet(spreadsheetId);
// const data = grabSheetInformation(ss);
////////
//create onOpen function to create a menu ui
function onOpen() {
  //grab the spreadsheet
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Upload to BigQuery")
    .addItem("Upload Data to Bigquery", "upload_each_sheet")
    .addToUi();
  //I probably need to move the below funciton elsewhere
}
