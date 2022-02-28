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
  ss = SpreadsheetApp.getActiveSpreadsheet();
  sheet = ss.getSheetByName("SortableBy3rdPartyReport");
  range = sheet.getRange("A7:R8844");
  range.Sort([
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
