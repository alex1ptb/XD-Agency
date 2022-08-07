/**
 * @OnlyCurrentDoc
 */

function SortClientSummaryReport() {
  //sort by column A in ascending order
  //sort on column B in ascending order

  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let range = ss.getRangeByName("ClientSummaryReportRange");
  range.sort([
    { column: 1, ascending: true },
    { column: 2, ascending: true },
  ]);
}
