/**
 * Adds a custom menu to the active spreadsheet.
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("XDA Menu")
    .addSubMenu(
      ui
        .createMenu("Sidebars")
        .addItem("Cheat Sheet", "Dev_XD_Library.cheatSheetSidebar")
        .addItem("Settings", "Dev_XD_Library.settingsSidebar")
    )
    .addSubMenu(
      ui
        .createMenu("Deliverables")
        .addItem(
          "Create New Deliverable",
          "Dev_XD_Library.showCreateDeliverableDialog"
        )
    )
    .addToUi();
}
