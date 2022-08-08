/**
 * @OnlyCurrentDoc
 */
function ResetSortableByServiceArea() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let range = ss.getRangeByName("ServiceAreaReport");
  range.sort([
    {
      column: 1,
      ascending: true,
    },
  ]);
}
