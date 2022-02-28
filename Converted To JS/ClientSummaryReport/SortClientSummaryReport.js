/**
 * @OnlyCurrentDoc
 */

function SortClientSummaryReport() {
  sortByColumn(
    1,
    { ascending: true },
    "A8:R2387",
    "SortableByServiceAreaReport"
  );

  sortByColumn(1, { ascending: true }, "A7:Q8844", "SortableBy3rdPartyReport");

  //Client Summary Report gets sorted differently
  //Range is A7:R11277
  //This gets sorted by multiple columns in a single sort
  //first sort by column R in descending order
  //then sort by column A in ascending order
  //then sort on column B in ascending order

  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let clientSheet = ss.getSheetByName("ClientSummaryReport");
  range = clientSheet.getRange("A7:R1127");
  range.sort([
    { column: 18, ascending: false },
    { column: 1, ascending: true },
    { column: 2, ascending: true },
  ]);
}
