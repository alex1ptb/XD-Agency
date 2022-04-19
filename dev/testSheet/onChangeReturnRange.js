//when the sheet is changed, check if cell has dropdown menu, if so, copy the row and paste it below the current row
function onEdit(e) {
  //check if the cell has a dropdown menu
  const sheet = SpreadsheetApp.getActiveSheet();
  const activeRange = e.range;
  const oldValue = e.oldValue;

  //get the row of the cell that was edited
  const row = activeRange.getRow();
  const col = activeRange.getColumn();

  //if the column is the first column, check if the cell has a dropdown menu
  if (col === 1) {
    //if there is a dropdown menu, copy the row and paste it below the current row
    if (e.range.getDataValidations().length > 0) {
      //make sure the previous display value was "Pick a Job Title"
      //alert oldValue;
      if (oldValue === "Pick a Job Title") {
        //get the namedRange of currently selected row

        //insert row below the current row
        sheet.insertRowAfter(row);

        //copy the row and paste it below the current row
        const copiedRow = sheet
          .getRange(row, 1, 1, sheet.getLastColumn())
          .copyTo(sheet.getRange(row + 1, 1, 1, sheet.getLastColumn()));

        copiedRow;

        //set the value of the first cell as "Pick a Job Title"
        sheet.getRange(row + 1, 1).setValue("Pick a Job Title");

        //set the value of column 6 to 0
        sheet.getRange(row + 1, 6).setValue(0);

        //see if row is apart of a named range
        //if it is, set the name of the new row to the same name
        //get named ranges this cell belongs to
        const namedRanges = getNamedRange(e);
        //split named ranges into array of named ranges, the split is a comma
        const namedRangesArray = namedRanges.split(",");
        //loop through the named ranges
        for (let i = 0; i < namedRangesArray.length; i++) {
          //if the named range has main in it then ignore it
          if (namedRangesArray[i].includes("Main")) {
            continue;
          } else {
            rangeName = namedRangesArray[i];
          }
          //add the new row to the second named range
          console.log(`namedRanges: ${namedRanges}`);
          console.log(`rangeName: ${rangeName}`);
          //get the range of the named range
          let range =
            SpreadsheetApp.getActiveSpreadsheet().getRangeByName(rangeName);
          console.log(`range: ${range.getA1Notation()}`);
          //let new range add the new row
          let newRange = sheet.getRange(
            range.getRow(),
            1,
            range.getNumRows() + 1,
            range.getNumColumns()
          );

          SpreadsheetApp.getActiveSpreadsheet().setNamedRange(
            rangeName,
            newRange
          );
          console.log(range);
        }
      }
      //get the sale rate for the job
      getSaleRate(e);
    }
  }
}
