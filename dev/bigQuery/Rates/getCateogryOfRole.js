//make a drop down from the list of table names in the dataset
function getCategoryOfRole() {
  let xdaRates = getXdaRates();
  let roles = [];
  //from the tableArray push the tableId to roles array
  xdaRates.forEach((table) => {
    roles.push(table.tableId);
  });
console.log(roles)
console.log('adding validation for roles')
  //now that we have an array of roles we can make a drop down from it
  let buildValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(roles)
    .build();
  //set validation to first empty cell in column A
  let sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ChooseAgent");
  //find the first empty cell in column A
  let lastRow = sheet.getLastRow() + 1;

  //   let cell = sheet.getLastRow() + 1;
  cell = sheet.getRange("A" + lastRow);
  cell.setDataValidation(buildValidation);
  console.log('validation added')
}
