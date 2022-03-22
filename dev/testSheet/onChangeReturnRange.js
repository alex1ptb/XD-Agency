// create function that gives back the range of the edited sheet
function onChangeReturnRange(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  console.log(sheet.getName());
  const activeRange = e.range;
  console.log(sheet.activeRange);
  SpreadsheetApp.getUi().alert(activeRange);
  return activeRange;
}

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
        SpreadsheetApp.getUi().alert(oldValue);
        //copy the row and paste it below the current row

        // sheet.copyRowTo(row, row + 1);
        //copy the row and paste it below the current row
        //insert row below the current row
        sheet.insertRowAfter(row);

        const copiedRow = sheet
          .getRange(row, 1, 1, sheet.getLastColumn())
          .copyTo(sheet.getRange(row + 1, 1, 1, sheet.getLastColumn()));

        copiedRow;

        //set the value of the first cell as "Pick a Job Title"
        sheet.getRange(row + 1, 1).setValue("Pick a Job Title");
      }
    }
  }
}
