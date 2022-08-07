/**
 * @OnlyCurrentDoc
 */
function SortBy3rdPartyVendorName() {
  //'
  //' SortBy3rdPartyVendorName Macro
  //'
  //'
  //target sheet: SortableBy3rdPartyReport
  //Sort Range A7:R8844
  //Sort by column R Descending
  //Sort by column F Ascending
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("SortableBy3rdPartyReport");
  let range = ss.getRangeByName("ThirdPartyReport");
  range.sort([
    {
      column: 5,
      ascending: true,
    },
  ]);
}
