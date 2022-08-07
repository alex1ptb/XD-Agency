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
  let range = ss.getRangeByName("ThirdPartyReport");
  range.sort([
    {
      column: 3,
      ascending: true,
    },
  ]);
}
