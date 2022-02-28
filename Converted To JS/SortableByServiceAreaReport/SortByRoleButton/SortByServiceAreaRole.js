/**
 * @OnlyCurrentDoc
 */
function SortByServiceAreaRole() {
  // '
  // ' SortByServiceAreaRole Macro
  // '

  // '

  ss = SpreadsheetApp.getActiveSpreadsheet();
  sheet = ss.getSheetByName("SortableByServiceAreaReport");
  let range = sheet.getRange("A8:P2387");

  range.sort([
    { column: 16, ascending: false },
    { column: 5, ascending: true },
  ]);
}
