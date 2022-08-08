/**
 * @OnlyCurrentDoc
 */
function SortBy3rdPartyDeliverable() {
  //Target sheet: SortableBy3rdPartyReport
  //Sort by column A Ascending
  //Sort by Column B Ascending
  //Sort by Column E Ascending

  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let range = ss.getRangeByName("ThirdPartyReport");
  range.sort([
    {
      column: 1,
      ascending: true,
    },
    {
      column: 2,
      ascending: true,
    },
    {
      column: 5,
      ascending: true,
    },
  ]);
}
