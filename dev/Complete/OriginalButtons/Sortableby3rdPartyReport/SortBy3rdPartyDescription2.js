/**
 * @OnlyCurrentDoc
 */
function SortBy3rdPartyDescription2() {
  //target sheet: SortableBy3rdPartyReport
  //Sort by column E Ascending
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let range = ss.getRangeByName("ThirdPartyReport");
  range.sort([
    {
      column: 4,
      ascending: true,
    },
  ]);
}
