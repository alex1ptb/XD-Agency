/**
 * @OnlyCurrentDoc
 */

//constant variables for the entire spreadsheet
const projectId = "xd-agency";
const projectID = "xd-agency";
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
        .addSubMenu(
          ui
            .createMenu("Totals for Current Deliverable")
            .addItem("Show in Totals", "showHiddenInformation")
            .addItem("Do Not Show in Totals", "hideActualInformation")
        )
    )
    .addToUi();
  ui.createMenu("Update")
    .addSubMenu(
      ui
        .createMenu("Update Reports")
        // .addItem("Update All Reports", "updateReports")
        .addItem("Update Client Summary Report", "newUpdateClientSummaryReport")
        .addItem(
          "Update Service Area Report",
          "newUpdateSortableByServiceAreaReport"
        )
        .addItem("Update 3rd Party Report", "newUpdateSortableBy3rdPartyReport")
    )
    // "Update Reports")
    .addSubMenu(
      ui
        .createMenu("Update from Database")
        .addItem("Update Everything", "updateAll")
    )
    .addToUi();
  //I probably need to move the below funciton elsewhere
}
