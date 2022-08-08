/**
 * @OnlyCurrentDoc
 */
function SortBy3rdPartyCategory() {
  //Sort by column C Ascending
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let range = ss.getRangeByName("ThirdPartyReport");
  range.sort([
    {
      column: 3,
      ascending: true,
    },
  ]);
}
