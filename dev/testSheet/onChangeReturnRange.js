//when the sheet is changed, check if cell has dropdown menu, if so, copy the row and paste it below the current row
function onEdit(e) {
  //check if the cell has a dropdown menu
  const sheet = SpreadsheetApp.getActiveSheet();
  const activeRange = e.range;
  const oldValue = e.oldValue;
  const row = activeRange.getRow();
  const col = activeRange.getColumn();

  //if the column is the first column, check if the cell has a dropdown menu
  if (col === 1) {
    //if there is a dropdown menu, copy the row and paste it below the current row
    if (e.range.getDataValidations().length > 0) {
      //make sure the previous display value was "Pick a Job Title"
      if (oldValue === "Pick a Job Title") {
        //get named ranges this cell belongs to
        const namedRanges = getNamedRange(e);
        const namedRangesArray = namedRanges.split(",");
        for (let i = 0; i < namedRangesArray.length; i++) {
          //if the named range has main in it then ignore it
          if (namedRangesArray[i].includes("Main")) {
            continue;
          } else {
            rangeName = namedRangesArray[i];
          }
          updateNamedRange(rangeName);
          //set the value of the first cell as "Pick a Job Title"
          sheet.getRange(row + 1, 1).setValue("Pick a Job Title");
          //set the value of column 6 to 0
          sheet.getRange(row + 1, 6).setValue(0);
        }
      }

      //get the sale rate for the job
      getSaleRate(e);
    }
  }
}
