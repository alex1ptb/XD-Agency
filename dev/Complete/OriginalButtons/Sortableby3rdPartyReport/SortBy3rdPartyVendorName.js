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
  let range = sheet.getRange("A7:R8844");
  range.sort([
    {
      column: 18,
      ascending: false,
    },
    {
      column: 6,
      ascending: true,
    },
  ]);
}
