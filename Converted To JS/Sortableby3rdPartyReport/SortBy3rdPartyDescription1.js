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
  let range = sheet.getRange("A7:R8844");
  range.sort([
    {
      column: 18,
      ascending: false,
    },
    {
      column: 4,
      ascending: true,
    },
  ]);
}
