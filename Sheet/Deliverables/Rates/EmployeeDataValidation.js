//get the names of payRates from the properties and create a validation list for the dropdown
function EmployeeDataValidation(targetRow, sheet) {
  console.log(`EmployeeDataValidation`);
  let payRates = getPayRatesProperties();
  let payRateNames = [];
  for (let i = 0; i < payRates[0].tableData.length; i++) {
    payRateNames.push(payRates[0].tableData[i][0]);
  }
  // console.log(`payRateNames: ${payRateNames}`);
  let buildValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(payRateNames)
    .build();
  let cell = sheet.getRange(targetRow, 2);
  // console.log(`cell: ${cell}`);
  cell.setDataValidation(buildValidation);
  console.log(`EmployeeDataValidation complete`);
}
