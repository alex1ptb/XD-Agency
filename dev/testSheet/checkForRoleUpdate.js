//I need to break up this whole function to smaller pieces

function checkForRoleUpdate(category) {
  console.log(`inside checkForRoleUpdate function`);
  let sheet = SpreadsheetApp.getActiveSheet();
  //get the range by name of the ${sheetName}_${category}_Main_Category}
  let range = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(
    `${sheet.getName()}_${category}_Main_Category`
  );
  console.log(`range: ${range.getA1Notation()}`);
  //get the first row of the range
  let firstRow = range.getRow();
  //get first column of the range
  let firstColumn = range.getColumn();

  let xdaRates = getXdaRates();
  //go through xda rates and find the tableId that matches the displayValue then get the data from that table
  let tableData = xdaRates.filter((table) => {
    if (table.tableId == null) {
      return;
    }
    //get display value of first cell of the range
    let displayValue = sheet.getRange(firstRow, firstColumn).getDisplayValue();
    //if the display value matches the tableId then return the tableData
    if (table.tableId == displayValue) {
      console.log(`table found that matches displayValue`);
      return table.tableData;
    } else {
      return null;
    }
  });
  if (tableData[0] == null) {
    return "No category role table found at target location";
  }

  // return tableData[0].tableData;
  if (tableData != null) {
    //put tableData as a dropdown list in the sheet below the last row
    //get the last row
    //target row = the first row + 2
    let targetRow = firstRow + 2;
    console.log(`targetRow: ${targetRow}`);
    //target the first cell in the range
    let targetCell = sheet.getRange(targetRow, firstColumn);
    console.log(`targetCell: ${targetCell}`);
    //set the value to "Pick a Job Title"
    targetCell.setValue("Pick a Job Title");
    // //set the value of the cell to "Pick a Job Title"
    // sheet.getRange(targetRow, 1).setValue("Pick a Job Title");
    //set the Freelance to be this as well
    sheet.getRange(targetRow + 3, 1).setValue("Pick a Job Title");
    // sheet.getRange(targetRow + 3, 1).setValue("Pick a Job Title");
    //set data validation to the cell
    let roles = [];
    //go through and pull out all job titles and push to array
    for (let i = 0; i < tableData[0].tableData.length; i++) {
      roles.push(tableData[0].tableData[i][0]);
    }
    //create and set the validation
    let buildValidation = SpreadsheetApp.newDataValidation()
      .requireValueInList(roles)
      .build();
    let cell = sheet.getRange(targetRow, 1);
    cell.setDataValidation(buildValidation);

    cell = sheet.getRange(targetRow + 3, 1);
    cell.setDataValidation(buildValidation);
  }
  console.log(`done with checkForRoleUpdate function`);
}
