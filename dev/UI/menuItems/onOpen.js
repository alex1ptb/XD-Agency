/**
 * @OnlyCurrentDoc
 */

//constant variables for the entire spreadsheet
const projectId = "xd-agency";

////////
//create onOpen function to create a menu ui
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Deliverables")
    .addItem("Create Deliverable", "createNewDeliverableTab")
    .addItem("Add Category to Current Deliverable", "createSidebar")
    .addToUi();
  //I probably need to move the below funciton elsewhere
  getXdaRates();
}
