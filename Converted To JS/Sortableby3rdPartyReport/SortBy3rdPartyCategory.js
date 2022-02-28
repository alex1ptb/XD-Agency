/**
 * @OnlyCurrentDoc
 */
function SortBy3rdPartyCategory() {
  // '
  // ' SortBy3rdPartyCategory Macro
  // '

  // '
  //Sort by column R Descending
  //Sort by column C Ascending
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("SortableBy3rdPartyReport");
  let range = sheet.getRange("A7:R8844");
  range.sort([
    {
      column: 18,
      ascending: false,
    },
    {
      column: 3,
      ascending: true,
    },
  ]);
}
