//Once a new deliverable is created, this function is run, it adds the deliverable title to the range "ProjectInformationSummary_Deliverables"

//the current issues I am having is the fact that to the side of this range is other information that makes just adding in a row and updating not so simple. I need to add just a partial row somehow without affecting the section to the right of the deliverabe information ranges.

//maybe use appendRow to the end of the range and then update the cells? -- This didn't work

//ended up with inserting cells and shifting the rows down to make room for the new row.

function updateRangeOfDeliverables(deliverableTitle) {
  let sheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheetName = "ProjectInformationSummary";
  let targetSheet = sheet.getSheetByName(sheetName);
  //shift range down by row
  targetSheet.getRange("B18:O18").insertCells(SpreadsheetApp.Dimension.ROWS);
  //named range that needs to be updated
  let namedRange = "ProjectInformationSummary_Deliverables";
  //get the range of the named range
  let range = sheet.getRangeByName(namedRange);
  //update range of named range to include the new cell above
  let newRange = targetSheet.getRange(
    range.getRow() - 1, //get first row
    range.getColumn(), //get first column
    range.getNumRows() + 1, //get last row + 1
    range.getNumColumns() //get last column
  );
  //set the namedRange to the new range
  sheet.setNamedRange(namedRange, newRange);
  //update first cell of the new row with the deliverable title
  targetSheet
    .getRange(newRange.getRow(), newRange.getColumn())
    .setValue(deliverableTitle);
  //copy up the rest of the cells
  //target range pulling from is "C19:O19"
  //target range pushing to is "C18:O18"

  targetSheet
    .getRange("C19:O19")
    .copyTo(
      targetSheet.getRange(
        targetSheet.getRange("C18:O18").getRow(),
        targetSheet.getRange("C18:O18").getColumn()
      )
    );
}
