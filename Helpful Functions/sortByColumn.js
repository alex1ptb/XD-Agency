/**
 * @OnlyCurrentDoc
 */
function sortByColumn(column, order, range, sheet) {
  //column is the column number to sort by
  let range = sheet.getRange(range);
  range.sort({ column, order });
}
