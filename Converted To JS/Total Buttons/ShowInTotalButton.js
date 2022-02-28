/**
 * @OnlyCurrentDoc
 */

function ShowInTotalButton() {
  ss = SpreadsheetApp.getActiveSpreadsheet();
  sheet = ss.getActiveSheet();
  //Copy and paste display values from range AA20:AA838 to the range E20:E838
  copyAndPaste("AA20:AA217", "E20:E217");
  //Copy and paste display values from range AD20:AD217 to the range F20:F217
  copyAndPaste("AA236:AA838", "F236:F838");
  //need to copy the formula back over from AB range to AA range
  //this brings the formulas back instead of the display values
  sheet.getRange("AB20:AB838").copyTo(sheet.getRange("AA20:AA838"));
  //clear the contents of the range D6
  sheet.getRange("D8").clearContent();
  //set the value of D6 to < ON
  sheet.getRange("D6").setValue("< ON");
}
