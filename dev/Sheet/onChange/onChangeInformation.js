function onChangeTrigger() {
  ScriptApp.newTrigger("onChange")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onChange()
    .create();
}

function onChange(e) {
  /**
   * @OnlyCurrentDoc
   */

  // let activeSheetNamedRanges = e.source.getNamedRanges();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getActiveSheet();
  let activeSheetNamedRanges = sheet.getNamedRanges();
  let sheetName = sheet.getName();
  let activeRange = sheet.getActiveRange();
  // let activeRange = e.range;
  console.log(`runing onchange for ${JSON.stringify(e)}`);
  console.log(`continuing to TotalCost section`);
  //run function to update total freelance cost on jobFinancialForm
  updateTotalPadHours();
  updateTotalFreelanceCostOnJobFinancialForm();
  //update header sections
  getTotalCost("XD");

  return;
  let XDAStaffCost = TotalCost("XD", activeSheetNamedRanges, ss, sheetName); //in getPayRates.js
  console.log(`results of XDA Staff Cost: ${XDAStaffCost}`);
  let FreelanceCost = TotalCost(
    "Freelancer",
    activeSheetNamedRanges,
    ss,
    sheetName
  ); //in getPayRates.js
  console.log(`results of Freelance Cost: ${FreelanceCost}`);

  try {
    sheet.getRange("K5").setValue(XDAStaffCost);
    console.log(`XDAStaffCost: ${XDAStaffCost}`);
    sheet.getRange("L5").setValue(FreelanceCost);
    console.log(`FreelanceCost: ${FreelanceCost}`);
  } catch (e) {
    console.log(`FreelanceCost Error: ${e}`);
    console.log(`XDAStaffCost Error: ${e}`);
  }
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  //update total for ThirdParty cost
  // try {
  //   let ThirdPartyCost = TotalCost(
  //     "ThirdParty",
  //     activeSheetNamedRanges,
  //     ss,
  //     sheetName
  //   ); //in getPayRates.js
  //   ss.getRangeByName(`${sheetName}_Footer_ThirdParty_TotalSell`).setValue(
  //     ThirdPartyCost
  //   );
  // } catch (e) {
  //   console.log(`ThirdPartyCost Error: ${e}`);
  // }
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  //Update total section in footer for the margin
  let CostCombined = XDAStaffCost + FreelanceCost;
  console.log(`CostCombined: ${CostCombined}`);
  try {
    let TotalSell = ss
      .getRangeByName(`${sheetName}_Footer_XD_TotalSell`)
      .getValue();
    ss.getRangeByName(`${sheetName}_Footer_XD_TotalMarginPercentage`).setValue(
      ((TotalSell - CostCombined) / TotalSell).toFixed(2) + "%"
    );
  } catch (e) {
    console.log(`Total Margin Percentage Error: ${e}`);
  }

  console.log(`onChange done`);
}
