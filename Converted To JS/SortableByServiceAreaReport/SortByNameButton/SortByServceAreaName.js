/**
 * @OnlyCurrentDoc
 */
function SortByServiceAreaName() {
  // '
  // ' SortByServiceAreaName Macro
  // '

  // '
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("SortableByServiceAreaReport");
  let range = sheet.getRange("A8:P2387");

  range.sort([
    {
      column: 16,
      ascending: false,
    },
    { column: 4, ascending: true },
  ]);
}
