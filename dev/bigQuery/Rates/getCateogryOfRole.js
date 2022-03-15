// //make a drop down from the list of table names in the dataset
// function getCategoryOfRole() {
//   let xdaRates = getXdaRates();
//   //from the tableArray push the tableId to roles array
//   xdaRates.forEach((table) => {
//     roles.push(table.tableId);
//     titles.push(table.tableData[0]);
//   });
//   //now that we have an array of roles we can make a drop down from it
//   let buildValidation = SpreadsheetApp.newDataValidation()
//     .requireValueInList(roles)
//     .build();
//   //set validation to first empty cell in column A
//   let sheet =
//     SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ChooseAgent");
//   //find the first empty cell in column A
//   let lastRow = sheet.getLastRow() + 1;
//   sheet.getRange(lastRow, 1).setValue("Pick a Category");
//   cell = sheet.getRange(lastRow, 1);
//   cell.setDataValidation(buildValidation);
//   //give display value for the drop down
//   //Pick a Category
//   // next cell down add "Pick a Job Title"
//   //next cell down add dropdown of roles.

//   console.log("validation added");
// }
