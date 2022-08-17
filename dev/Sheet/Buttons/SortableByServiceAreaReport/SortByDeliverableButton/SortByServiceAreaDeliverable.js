/**
 * @OnlyCurrentDoc
 */
function SortByServiceAreaDeliverable() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let range = ss.getRangeByName("ServiceAreaReport");
  range.sort([
    { column: 1, ascending: true },
    { column: 2, ascending: true },
    { column: 4, ascending: true },
  ]);
}
