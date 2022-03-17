//if the category drop down has a value from the roles array
//then find the tableId in the xdaRates array that matches the value
//and set the job title drop down to the tableData[0]
//

function setJobTitleDropdown() {
  //first check if the category drop down has a value from the roles array
  let sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ChooseAgent");
  //get last row
  let lastRow = sheet.getLastRow();
  //get the value of the category drop down
  let category = sheet.getRange(lastRow - 2, 1).getValue();
  //get the xdaRates array
  let xdaRates = getXdaRates();
  //loop through xdaRates tableIds and see if the category variable matches any of the tableIds
  for (let i = 0; i < xdaRates.length; i++) {
    if (xdaRates[i].tableId == category) {
      //if it matches then set the job title drop down to the tableData[0]
      sheet.getRange(lastRow + 1, 1).setValue("Pick a Job Title");

      //create data validation for the job title drop down
      let buildValidation = SpreadsheetApp.newDataValidation()
        .requireValueInList(xdaRates[i].tableData)
        .build();
      //set validation to first empty cell in column A
      let cell = sheet.getRange(lastRow + 2, 1);
      cell.setDataValidation(buildValidation);
      //give display value for the drop down
      //Pick a Job Title

      //   sheet.getRange(lastRow + 2, 1).setValue(xdaRates[i].tableData[0]);
      //stop the loop
      break;
    }
  }
}
