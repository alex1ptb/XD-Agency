function onChangeTrigger() {
  ScriptApp.newTrigger("onChange")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onChange()
    .create();
}

function onChange(e) {
  let activeSheetNamedRanges = e.source.getNamedRanges();
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getActiveSheet();
  let sheetName = sheet.getName();
  let activeRange = e.range;
  //update header sections
  let XDAStaffCost = TotalCost("XD", activeSheetNamedRanges, ss, sheetName); //in getPayRates.js
  let FreelanceCost = TotalCost(
    "Freelancer",
    activeSheetNamedRanges,
    ss,
    sheetName
  ); //in getPayRates.js
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
  try {
    let ThirdPartyCost = TotalCost(
      "ThirdParty",
      activeSheetNamedRanges,
      ss,
      sheetName
    ); //in getPayRates.js
    ss.getRangeByName(`${sheetName}_Footer_ThirdParty_TotalSell`).setValue(
      ThirdPartyCost
    );
  } catch (e) {
    console.log(`ThirdPartyCost Error: ${e}`);
  }
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  //Update total section in footer for the margin
  let CostCombined = XDAStaffCost + FreelanceCost;
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

  const activeSectionRanges = GetClosestNamedRange(
    activeSheetNamedRanges,
    activeRange
  ).split(",");

  for (let i = 0; i < activeSectionRanges.length; i++) {
    let start, end;
    start = new Date();
    //if the named range has Section in it then ignore it
    if (activeSectionRanges[i].includes("Section")) {
      //target 2nd word
      activeCategory = activeSectionRanges[i].split("_")[1];
      partition = activeSectionRanges[i].split("_")[2];
      continue;
    } else {
      rangeName = activeSectionRanges[i];
    }
    end = new Date();
    console.log(
      `time to get activeCategory, partition and rangeName: ${
        end.getTime() - start.getTime()
      }`
    );
  }

  updateCategoryInformation(ss, activeCategory);

  //get the sheets properties that contains the sheet names that have been added to the spreadsheet
  // const savedSheetNames =
  //   PropertiesService.getScriptProperties().getProperty("savedSheetNames");
  // console.log(`savedSheetNames: ${savedSheetNames}`);
  // console.log(`onChange information: ${JSON.stringify(e)}`);
  // console.log(`onChange source information: ${JSON.stringify(e.source)}`);
  // console.log(
  //   `onChange Name of the sheet: ${e.source.getActiveSheet().getName()}`
  // );
}
