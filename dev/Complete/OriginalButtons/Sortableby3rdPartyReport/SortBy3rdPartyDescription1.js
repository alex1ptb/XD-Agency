/**
 * @OnlyCurrentDoc
 */
function SortBy3rdPartyDescription1() {
  //target sheet: SortableBy3rdPartyReport
  //Sort by column D Ascending
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let range = ss.getRangeByName("ThirdPartyReport");
  range.sort([
    {
      column: 3,
      ascending: true,
    },
  ]);
}
