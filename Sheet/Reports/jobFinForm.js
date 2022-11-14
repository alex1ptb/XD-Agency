function updateJobFinancialForm(category, sheetName) {
  console.log(`inside updateJobFinancialForm function`);
  console.log(`category: ${category} \n sheetName: ${sheetName}`);
  //if category has / in it, replace with _
  let target = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(category);
  let targetFormula = target.getFormula();
  //add sheet named range to formula
  let rangeNameToInsert = `${sheetName}_${category}_ThirdParty_CostWithContSubTotal`;
  //append the range name to the formula
  let newFormula = targetFormula + `+${rangeNameToInsert}`;
  //set the new formula
  SpreadsheetApp.getActiveSpreadsheet()
    .getRangeByName(category)
    .setFormula(newFormula);
}
