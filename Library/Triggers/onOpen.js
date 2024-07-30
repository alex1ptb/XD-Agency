/**
 * Adds a custom menu to the active spreadsheet.
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("XDA Menu")

    //SIDEBARS
    .addSubMenu(
      ui
        .createMenu("Sidebars")
        .addItem("Cheat Sheet", "Dev_XD_Library.cheatSheetSidebar")
        .addItem("Settings", "Dev_XD_Library.settingsSidebar")
    )

    // DELIVERABLES
    .addSubMenu(
      ui
        .createMenu("Deliverables")
        .addItem(
          "Create New Deliverable",
          "Dev_XD_Library.showCreateDeliverableDialog"
        )
    )
    .addSeparator()

    //INDEX OPTIONS
    .addSubMenu(
      ui
        .createMenu("Index Options")
        .addItem("Create Index Sheet", "Dev_XD_Library.createIndexSheet")
        .addItem("Update Tabs", "Dev_XD_Library.updateTabsBasedOnIndexRowOrder")
    )
    .addToUi();

  ui.createMenu("Dev")
    .addItem("Create New Project", "Dev_XD_Library.createNewProjectFlow")
    .addSubMenu(
      // DELIVERABLES
      ui
        .createMenu("Deliverables")
        .addItem(
          "Create New Deliverable",
          "Dev_XD_Library.showCreateDeliverableDialog"
        )
        .addItem(
          "Add new Deliverable to Budget Summary",
          "Dev_XD_Library.addDeliverableToBudgetSummary"
        )
        .addItem(
          "Update basic Information in Deliverable Sheet",
          "Dev_XD_Library.setBasicInformationIntoDeliverableSheet"
        )
    )
    // PROPERTIES
    .addSubMenu(
      ui
        .createMenu("Properties")
        .addItem("WIP - Test Properties", "Dev_XD_Library.testProperties")
    )
    // New menu for database options
    .addSubMenu(
      ui
        .createMenu("Database")
        .addItem(
          "Test - Update Dropdowns",
          "Dev_XD_Library.updateDropdownsTest"
        )
        .addItem("Rate Card Change", "Dev_XD_Library.rateCardChangedWrapper")
    )
    .addSeparator()
    .addItem("Create Index Sheet", "Dev_XD_Library.createIndexSheet")
    .addToUi();
}
