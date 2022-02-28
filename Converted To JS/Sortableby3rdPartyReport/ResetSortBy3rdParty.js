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
  ss = SpreadsheetApp.getActiveSpreadsheet();
  sheet = ss.getSheetByName("SortableBy3rdPartyReport");
  let range = sheet.getRange("A7:R8844");
  range.sort([{ column: 1, ascending: true }]);
}
