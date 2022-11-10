/**
 * @OnlyCurrentDoc
 */
function SortBy3rdPartyVendorName() {
  //target sheet: SortableBy3rdPartyReport
  //Sort by column F Ascending
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let range = ss.getRangeByName("ThirdPartyReport");
  range.sort([
    {
      column: 5,
      ascending: true,
    },
  ]);
}
