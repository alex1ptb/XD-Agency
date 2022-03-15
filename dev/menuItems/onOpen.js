/**
 * @OnlyCurrentDoc
 */

//constant variables for the entire spreadsheet
const projectId = "xd-agency";

////////
//create onOpen function to create a menu ui
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Create Deliverable")
    .addItem("Create Deliverable", "createNewDeliverableTab")
    .addToUi();
}
