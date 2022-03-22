//if last row is not blank then a role has been chosen

//I need to break up this whole function to smaller pieces

function checkForRoleUpdate(newRow) {
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName("ChooseAgent");
  //look at the last row

  const lastRow = sheet.getLastRow();
  console.log(lastRow);
  //if the last row is has a value then a role has been chos
  if (sheet.getRange(newRow, 1).getDisplayValue() != "Pick a Category") {
    //get XdaRates[displayValue is the table ID and return the tableData array
    let xdaRates = getXdaRates();
    // return xdaRates;
    //go through xda rates and find the tableId that matches the displayValue then get the data from that table
    let tableData = xdaRates.filter((table) => {
      if (table.tableId == null) {
        return;
      }
      if (table.tableId == sheet.getRange(newRow, 1).getDisplayValue()) {
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
      let targetRow = newRow + 2;
      let lastRow = sheet.getLastRow() + 1;
      //set the value of the cell to "Pick a Job Title"
      sheet.getRange(targetRow, 1).setValue("Pick a Job Title");
      //set the Freelance to be this as well
      sheet.getRange(targetRow + 3, 1).setValue("Pick a Job Title");
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

      //if a job title has been chosen then set the next cell to the cell
      //pick the next column and set the value to tableData[0].tableData[roleIndex][1]

      //get the roleIndex
      let roleIndex = roles.indexOf(
        sheet.getRange(lastRow, 1).getDisplayValue()
      );
      //set the next cell to the cell
      sheet
        .getRange(lastRow + 1, 1)
        .setValue(tableData[0].tableData[roleIndex][1]);

      //check what the role is
      //put category choice at the bottom again?
      //should probably change this to be a static area as I don't want users to create multiple "Measurement" categories or other categories
      setCategoryRoleDropDown();
      //put "End of Section" in the last row
    }
  } else {
    return console.log("no category choosen");
  }
}
