/**
 * @OnlyCurrentDoc
 */
function Reset3rdPartySortableReport() {
  //'
  //' Reset3rdPartySortableReport Macro
  //'
  //target sheet: SortableBy3rdPartyReport
  //target range: A7:A8844
  //Sort by column A in ascending order

  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let range = ss.getRangeByName("ThirdPartyReport");
  range.sort([{ column: 1, ascending: true }]);
}
