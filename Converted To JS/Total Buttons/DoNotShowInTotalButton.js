/**
 * @OnlyCurrentDoc
 */
function DoNotShowInTotalButton() {
  ss = SpreadsheetApp.getActiveSpreadsheet();
  sheet = ss.getActiveSheet();
  // copy the display values of the
  //Copy the display values shown and paste over the formulas that are currently providing the display values
  copyAndPaste("AA20:AA838", "AA20:AA838");
  //copy display values from range AD20:AD217 to the range E20:E217
  copyAndPaste("AD20:AD217", "E20:E217");
  //copy display values from range AE20:AE217 to the range F20:F217
  copyAndPaste("AD236:AD839", "F236:F839");
  //Set "D8" value to on
  sheet.getRange("D8").setValue(" < ON");
  //Clear contents of "D6"
  sheet.getRange("D6").clearContent();
}
