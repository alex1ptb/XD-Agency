/**
 * @OnlyCurrentDoc
 */
function ResetClientSummaryReport() {
  //Name of the sheet: Client Summary Report
  //Range to sort: A7:R11225
  //First action to perform: Clear any existing sort
  //Second action to perform: Sort by column A
  //Sort order: Ascending
  //headerRow: 6 (Row 6 is the header row)

  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("ClientSummaryReport");
  let range = sheet.getRange("A7:R11225");
  //check if range already sorted
  range.sort({ column: 1, ascending: true });
}
