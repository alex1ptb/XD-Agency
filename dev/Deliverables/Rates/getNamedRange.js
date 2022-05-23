//couldnt figure this part out on my own
//stack overflow for the win
//https://stackoverflow.com/questions/71582384/based-on-the-edited-cell-how-do-i-return-the-namedrange-the-cell-belongs-in?noredirect=1#comment126515389_71582384

//get the named range that the edited cell belongs to
function getNamedRange(e) {
  if (!e) {
    //return all named ranges of the active sheet
    return console.log(SpreadsheetApp.getActiveSpreadsheet().getNamedRanges());
    // SpreadsheetApp.getActiveSpreadsheet()
    //   .getActiveSheet()
    //   .getNamedRanges();
  }
  const range = e.range;
  const sheet = SpreadsheetApp.getActiveSheet();
  const r = sheet.getNamedRanges().filter((r) => {
    const temp = r.getRange();
    const startRow = temp.getRow();
    const endRow = startRow + temp.getNumRows();
    const startCol = temp.getColumn();
    const endCol = startCol + temp.getNumColumns();
    return range.rowStart >= startRow &&
      range.rowStart <= endRow &&
      range.columnStart >= startCol &&
      range.columnStart <= endCol
      ? true
      : false;
  });
  if (r.length == 0) return;
  // console.log(r.map((f) => f.getName()).join(","));
  return r.map((f) => f.getName()).join(",");
}
