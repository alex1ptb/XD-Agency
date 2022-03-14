//if last row is not blank then a role has been chosen

function checkForRoleUpdate() {
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName("ChooseAgent");
  //look at the last row
  let lastRow = sheet.getLastRow();
  //if the last row is has a value then a role has been chos
  if (sheet.getRange(lastRow, 1).getDisplayValue() != "Pick a Category") {
    console.log('it does NOT say pick a category')
    //get XdaRates[displayValue is the table ID] and return the tableData array
    let xdaRates = getXdaRates();
    let tableData = xdaRates.filter(
      (table) => table.tableId == sheet.getRange(lastRow, 1).getDisplayValue()
    )[0].tableData;
    //put tableData as a dropdown list in the sheet below the last row
    //get the last row
    let lastRow = sheet.getLastRow() + 1;
    //set the value of the cell to "Pick a Job Title"
    sheet.getRange(lastRow, 1).setValue("Pick a Job Title");
    //set data validation to the cell
    let buildValidation = SpreadsheetApp.newDataValidation()
      .requireValueInList(tableData)
      .build();
    let cell = sheet.getRange(lastRow, 1);
    cell.setDataValidation(buildValidation);

    //check what the role is
    getCategoryOfRole();
    //put "End of Section" in the last row
  } else {
    console.log("no category choosen")
    return
  }
}
