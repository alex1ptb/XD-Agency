/**
 * @OnlyCurrentDoc
 */
function SortByServiceAreaServiceArea() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let range = ss.getRangeByName("ServiceAreaReport");
  range.sort([{ column: 3, ascending: true }]);
}
