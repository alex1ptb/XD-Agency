/**
 * @OnlyCurrentDoc
 */
function SortBy3rdPartyDeliverable() {
  //'
  //' SortBy3rdPartyDeliverable Macro
  //'

  //'
  //Target sheet: SortableBy3rdPartyReport
  //Sort Range A7:R8844
  //Sort by column R Descending
  //Sort by column A Ascending
  //Sort by Column B Ascending
  //Sort by Column E Ascending

  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("SortableBy3rdPartyReport");
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
