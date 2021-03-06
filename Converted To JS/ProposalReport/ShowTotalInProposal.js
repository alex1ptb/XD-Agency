function ShowInTotalsProposal() {
  //'
  //' ShowInTotalsProposal Macro
  //'
  //target sheet: Proposal
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Proposal");
  //copy range AA25:AA222
  //paste range E25:E222
  copyAndPaste("AA25:AA222", "E25:E222");

  //copy range AA241:AA842
  //paste range F241:F842
  copyAndPaste("AA241:AA842", "F241:F842");

  //copy range AB25:AB842
  //paste range AA25:AA842
  //copy the formula back over from AB range to AA range
  sheet.getRange("AB20:AB838").copyTo(sheet.getRange("AA20:AA838"));

  //select D13 and clear contents
  sheet.getRange("D13").clearContent();

  //Select D11 and put "< ON" in the cell
  sheet.getRange("D11").setValue("< ON");
}
