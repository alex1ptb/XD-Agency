//if last row is not blank then a role has been chosen

function checkForRole() {
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName("ChooseAgent");
  //look at the last row
  let lastRow = sheet.getLastRow();
  //if the last row is has a value then a role has been chos
  if (sheet.getRange("A" + lastRow).getDisplayValue() != "") {
    return getCategoryOfRole();
  } else {
    return "oh no Skip";
  }
}
