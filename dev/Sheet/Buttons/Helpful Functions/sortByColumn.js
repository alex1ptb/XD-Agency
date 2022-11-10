/**
 * @OnlyCurrentDoc
 */
function sortByColumn(column, order, range, sheet) {
  //column is the column number to sort by
  let ss = SpreadsheetApp.getActiveSpreadsheet()
  let targetSheet = ss.getActiveSheet()
  let targetRange = targetSheet.getRange(range);
  targetRange.sort({ column, order });
}
