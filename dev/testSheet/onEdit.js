//when the sheet is changed, check if cell has dropdown menu, if so, copy the row and paste it below the current row
function onEditTrigger(e) {
  console.log(`onEdit start time: ${new Date().getTime()}`);
  const projectID = "xd-agency";
  // removeDeadReferences();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activeRange = e.range;
  const sheet = SpreadsheetApp.getActiveSheet();
  const activeSheetNamedRanges = sheet.getNamedRanges();
  const sheetName = sheet.getName();
  const oldValue = e.oldValue;
  const row = activeRange.getRow();
  const col = activeRange.getColumn();
  const activeSectionRanges = GetClosestNamedRange(
    activeSheetNamedRanges,
    activeRange
  ).split(",");
  console.log(`activeSectionRanges: ${activeSectionRanges}`);
  //first column in range is jobTitle
  const jobTitle = sheet.getRange(row, 1).getValue();
  //second column is always names of the person for the job
  let name = sheet.getRange(row, 2).getValue();
  if (name == null || name == undefined) {
    name = "";
  }

  //putting the following into a function to have it as an installable trigger and have it run only when the named range is matched

  //if active range name is rate_card_section, then do this
  if (activeSectionRanges[1] == "rate_card_section") {
    // ScriptApp.
    console.log(`changing rate card`);
    //get the value of the cell
    const value = activeRange.getValue();
    console.log(`value of cell for rate card: ${value}`);
    PropertiesService.getScriptProperties().setProperty(
      "xdaRates",
      JSON.stringify(getCurrentXdaRates(projectID, value))
    );
    return;
  }

  ////////////////////////////////////////////
  //creating activeCategory and partition arrays
  //This breaks down the named ranges into activeCategory and partition as well as the active range
  //Current issue is partition is pulled from the section so this info I was confused about and may need to check to see where using "partition" is causing confilcts
  for (let i = 0; i < activeSectionRanges.length; i++) {
    //if the named range has Section in it then ignore it
    if (activeSectionRanges[i].includes("Section")) {
      //target 2nd word
      activeCategory = activeSectionRanges[i].split("_")[1];
      // console.log(`onEdit: activeCategory: ${activeCategory}`);
      partition = activeSectionRanges[i].split("_")[2];
      // console.log(`onEdit: partition: ${partition}`);
      continue;
    } else {
      rangeName = activeSectionRanges[i];
      // console.log(`onEdit: rangeName: ${rangeName}`);
    }
  }
  // console.log(`activeCategory: ${activeCategory}`);
  // console.log(`partition: ${partition}`);
  // console.log(`ActiveRangeName: ${rangeName}`);
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  //if the column is the first column, check if the cell has a dropdown menu
  if (col === 1) {
    //if there is a dropdown menu, copy the row and paste it below the current row
    //check if the cell has a dropdown menu
    if (e.range.getDataValidations().length > 0) {
      //make sure the previous display value was "Pick a Job Title"
      if (oldValue === "Pick a Job Title") {
        // console.log(`onEdit -- updating rangeName: ${rangeName}`);
        getSaleRate(
          e,
          activeCategory,
          partition,
          row,
          activeRange,
          sheet,
          jobTitle
        );
        updateNamedRange(rangeName);
        //set the value of the first cell as "Pick a Job Title"
        sheet.getRange(row + 1, 1).setValue("Pick a Job Title");
        //set the value of column 6 to 0
        sheet.getRange(row + 1, 6).setValue(0);
        return;
      }
      //get the sale rate for the job
      console.log(`getting sale rate for job: ${jobTitle}`);
      getSaleRate(
        e,
        activeCategory,
        partition,
        row,
        activeRange,
        sheet,
        jobTitle
      );
      return;
    }
  }
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  //if the 2nd column is updated for XD then update the margin for the row
  if ((col === 2 || col === 3 || col === 4) && rangeName.includes("XD")) {
    console.log(
      `updating margin for the following \njobTitle: ${jobTitle} \nname: ${name} \nrow: ${row} \ncol: ${col}`
    );
    let payRate = lookUpPayRate(name);
    let hours = sheet.getRange(row, 5).getValue();
    let total = multiplyPayRate(payRate, hours);
    let totalSellofRow = sheet.getRange(row, 7).getValue();
    let margin = (totalSellofRow - total) / totalSellofRow;
    sheet.getRange(row, 8).setValue(margin).setNumberFormat("0.00%");
  }
  ////////////////////////////////////////////

  ////////////////////////////////////////////
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

  updateCategoryInformation(ss, activeCategory);

  ////////////////////////////////////////////
  // updateSortableByServiceAreaReport(
  //   e,
  //   sheetName,
  //   oldValue,
  //   partition,
  //   activeCategory
  // );
  // updateClientSummaryReport(
  //   e,
  //   sheetName,
  //   oldValue,
  //   partition,
  //   activeCategory,
  //   activeRange
  // );
  // updateSortableBy3rdPartyReport(
  //   e,
  //   sheetName,
  //   oldValue,
  //   partition,
  //   activeCategory
  // );
  console.log(`onEdit end time: ${new Date().getTime()}`);
  return;
} //end onEdit function
