/**
 * Creates an index sheet listing all sheet names and their hyperlinks.
 *
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} SS - The spreadsheet object.
 */
function createIndexSheet(SS) {
  if (!SS) {
    throw new Error("SS param is not passed");
  }
  var indexSheetName = "Index";

  // Check if the index sheet exists
  var indexSheet = SS.getSheetByName(indexSheetName);

  if (!indexSheet) {
    // If not, create one
    indexSheet = SS.insertSheet(indexSheetName, 0);
  } else {
    // If it exists, clear its contents
    indexSheet.clear();
    // SS.moveActiveSheet(0);
  }

  // Create headers
  let headers = ["Tab Name", "Hyperlink"];

  indexSheet.getRange(1, 1).setValues(headers);

  // indexSheet.getRange("A1").setValue("Tab Name");
  // indexSheet.getRange("B1").setValue("Hyperlink");

  var sheets = SS.getSheets();
  var data = [];

  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    var sheetName = sheet.getName();
    var sheetLink =
      '=HYPERLINK("#gid=' + sheet.getSheetId() + '","' + sheetName + '")';
    data.push([sheetName, sheetLink]);
  }

  // Populate the index sheet
  if (data.length > 0) {
    indexSheet.getRange(2, 1, data.length, 2).setValues(data);
  }
}

function createIndexSheetWrapper() {
  var SS = SpreadsheetApp.getActiveSpreadsheet();
  createIndexSheet(SS);
}
