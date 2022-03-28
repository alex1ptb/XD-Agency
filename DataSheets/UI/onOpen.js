/**
 * @OnlyCurrentDoc
 */

//constant variables for the entire spreadsheet
const projectId = "xd-agency";

////////
//create onOpen function to create a menu ui
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Upload to BigQuery")
    .addItem("Upload Data to Bigquery", "grabSheetInformation")
    .addToUi();
  //I probably need to move the below funciton elsewhere
}
