/**
 * @OnlyCurrentDoc
 */
function SortBy3rdPartyDescription1() {
  //'
  //' SortBy3rdPartyDescription1 Macro
  //'

  //'
  //target sheet: SortableBy3rdPartyReport
  //Sort Range A7:R8844
  //Sort by column R Descending
  //Sort by column D Ascending
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
