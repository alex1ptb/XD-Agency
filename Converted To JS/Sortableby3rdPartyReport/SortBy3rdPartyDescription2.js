function SortBy3rdPartyDescription2() {
  //'
  //' SortBy3rdPartyDescription1 Macro
  //'

  //'
  //target sheet: SortableBy3rdPartyReport
  //Sort Range A7:R8844
  //Sort by column R Descending
  //Sort by column E Ascending

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("SortableBy3rdPartyReport");
  var range = sheet.getRange("A7:R8844");
  range.sort([
    {
      column: 18,
      ascending: false,
    },
    {
      column: 5,
      ascending: true,
    },
  ]);
}
