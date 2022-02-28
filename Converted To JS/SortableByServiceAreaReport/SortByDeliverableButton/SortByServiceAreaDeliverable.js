function SortByServiceAreaDeliverable() {
  //
  //  SortByServiceAreaDeliverable Macro
  //

  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("SortableByServiceAreaReport");
  let range = sheet.getRange("A7:P2387");

  range.sort([
    { column: 16, ascending: false },
    { column: 1, ascending: true },
    { column: 2, ascending: true },
    { column: 4, ascending: true },
  ]);
}
