function DoNotShowInTotalsProposal() {
  // '
  // ' DoNotShowInTotalsProposal Macro
  // '
  // '

  //target sheet: Proposal
  ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Proposal");

  //copy range AA25:AA842
  //paste to itself. copying the display values
  copyAndPaste("AA25:AA842", "AA25:AA842");

  //     copy range AD25:AD222
  //     paste range E25:E222
  copyAndPaste("AD25:AD222", "E25:E222");

  //     copy range AD241:AD842
  //     paste range F241:F842
  copyAndPaste("AD241:AD842", "F241:F842");

  //     Range("D13").Select
  //     ActiveCell.FormulaR1C1 = "< ON"
  sheet.getRange("D13").setValue("< ON");

  //     Range("D11").Select
  //     Selection.ClearContents
  sheet.getRange("D11").clearContent();
}
