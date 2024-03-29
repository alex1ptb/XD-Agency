/**
 * @OnlyCurrentDoc
 */

//constant variables for the entire spreadsheet
const projectId = "xd-agency-367108";

////////
//create onOpen function to create a menu ui
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("Totals")
    .addItem("Show in Totals", "showHiddenInformation")
    .addItem("Do Not Show in Totals", "hideActualInformation")
    .addToUi();
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
}
