/**
 * @OnlyCurrentDoc
 */
function copyAndPaste(copyRange, pasteRange) {
  ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getActiveSheet();

  //get the range and copy to new range. But only get the display values and not the formula values
  let copyRangeValues = sheet.getRange(copyRange).getDisplayValues();

  sheet.getRange(pasteRange).setValues(copyRangeValues);
}
