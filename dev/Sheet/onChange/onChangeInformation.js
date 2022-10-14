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
  //run function to update total freelance cost on jobFinancialForm
  updateTotalPadHours();
  updateTotalFreelanceCostOnJobFinancialForm();
  //update header sections
  console.log(`continuing to TotalCost section`);
  console.log(`using NEW total cost function for Xd`);
  // getTotalCost("XD");
  let XDAStaffCost = getTotalCost("XD");
  //TotalCost("XD", activeSheetNamedRanges, ss, sheetName); //in getPayRates.js
  console.log(`results of XDA Staff Cost: ${XDAStaffCost}`);
  console.log(`now to test for freelancer cost`);
  // let FreelanceCost = getTotalCost("Freelancer");
  let FreelanceCost = TotalCost(
    "Freelancer",
    activeSheetNamedRanges,
    ss,
    sheetName
  ); //in getPayRates.js
  console.log(`results of Freelance Cost: ${FreelanceCost}`);

  try {
    // sheet.getRange("K5").setValue(XDAStaffCost);
    // console.log(`XDAStaffCost: ${XDAStaffCost}`);
    sheet.getRange("L5").setValue(FreelanceCost);
    // console.log(`FreelanceCost: ${FreelanceCost}`);
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
  XDAStaffCost = XDAStaffCost.reduce((a, b) => a + b, 0);

  let XDATotalSell = ss
    .getRangeByName(`${sheetName}_Footer_XD_TotalStaffSell`)
    .getValue();
  let XDAMargin = (XDATotalSell - XDAStaffCost) / XDATotalSell;
  ss.getRangeByName(`${sheetName}_Footer_XD_TotalStaffMargin`).setValue(
    XDAMargin
  );

  let CostCombined = XDAStaffCost + FreelanceCost;
  console.log(`CostCombined: ${CostCombined}`);
  try {
    let TotalSell = ss
      .getRangeByName(`${sheetName}_Footer_XD_TotalSell`)
      .getValue();
    ss.getRangeByName(`${sheetName}_Footer_XD_TotalMarginPercentage`).setValue(
      (TotalSell - CostCombined) / TotalSell
    );
  } catch (e) {
    console.log(`Total Margin Percentage Error: ${e}`);
  }

  console.log(`onChange done`);
}
