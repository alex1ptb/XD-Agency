/**
 * @OnlyCurrentDoc
 */

//constant variables for the entire spreadsheet
const projectId = "xd-agency";
const ss = SpreadsheetApp.getActiveSpreadsheet();

////////
//create onOpen function to create a menu ui
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Deliverables")
    //create deliverable Tab
    .addItem("Create Deliverable", "createNewDeliverableUI")
    //sub menu for deliverable categories
    .addSubMenu(
      ui
        .createMenu("Edit Current Deliverable")
        .addItem(
          "Add Category to Current Deliverable",
          "createDeliverableCategorySidebar"
        )
        .addItem(
          "Add 3rd Party Costs to Current Deliverable",
          "createthirdPartyCostsSidebar"
        )
    )
    .addToUi();
  //I probably need to move the below funciton elsewhere
  getXdaRates();
}
