/**
 * @OnlyCurrentDoc
 */
function SortByServiceAreaName() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let range = ss.getRangeByName("ServiceAreaReport");
  range.sort([{ column: 4, ascending: true }]);
}
