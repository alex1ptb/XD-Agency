/**
 * @OnlyCurrentDoc
 */
function SortByServiceAreaRole() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let range = ss.getRangeByName("ServiceAreaReport");
  range.sort([{ column: 5, ascending: true }]);
}
