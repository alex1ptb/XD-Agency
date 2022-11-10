/**
 * @OnlyCurrentDoc
 */
function Reset3rdPartySortableReport() {
  //target sheet: SortableBy3rdPartyReport
  //Sort by column A in ascending order

  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let range = ss.getRangeByName("ThirdPartyReport");
  range.sort([{ column: 1, ascending: true }]);
}
