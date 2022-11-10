/**
 * @OnlyCurrentDoc
 */
function SortByServiceAreaServiceArea() {
  // '
  // ' SortByServiceAreaServiceArea Macro
  // '

  // '
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("SortableByServiceAreaReport");
  let range = sheet.getRange("A8:P2387");

  range.sort([
    { column: 16, ascending: false },
    { column: 3, ascending: true },
  ]);
}
