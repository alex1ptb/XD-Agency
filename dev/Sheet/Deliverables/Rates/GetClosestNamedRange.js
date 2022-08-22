// couldnt figure this part out on my own
//stack overflow for the win
//https://stackoverflow.com/questions/71582384/based-on-the-edited-cell-how-do-i-return-the-namedrange-the-cell-belongs-in?noredirect=1#comment126515389_71582384

//get the named range that the edited cell belongs to
function GetClosestNamedRange(activeSheetNamedRanges, activeRange) {
  console.log(`running GetClosestNamedRange`);
  console.log(`active Range: ${JSON.stringify(activeRange)}`);
  if (activeRange == undefined) {
    return;
  }
  // console.log(`parameters: ${activeSheetNamedRanges}, ${activeRange}`);
  let run, stop;
  run = new Date();
  const range = activeRange;
  let rowStart = range.getRow();
  let columnStart = range.getColumn();
  const r = activeSheetNamedRanges.filter((r) => {
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
  stop = new Date();
  console.log(
    `getClosestNamedRange took ${stop.getTime() - run.getTime()} msec`
  );
  return r.map((f) => f.getName()).join(",");
}
