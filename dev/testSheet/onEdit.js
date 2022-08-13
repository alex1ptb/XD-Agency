//when the sheet is changed, check if cell has dropdown menu, if so, copy the row and paste it below the current row
function onEditTrigger(e) {
  let end, start;
  start = new Date();

  const projectID = "xd-agency";
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activeRange = e.range;
  const sheet = ss.getActiveSheet();
  const activeSheetNamedRanges = sheet.getNamedRanges();
  const sheetName = sheet.getName();
  const oldValue = e.oldValue;
  const row = activeRange.getRow();
  const col = activeRange.getColumn();
  const activeSectionRanges = GetClosestNamedRange(
    activeSheetNamedRanges,
    activeRange
  ).split(",");
  //first column in range is jobTitle
  const jobTitle = sheet.getRange(row, 1).getValue();
  //second column is always names of the person for the job
  let name = sheet.getRange(row, 2).getValue();
  if (name == null || name == undefined) {
    name = "";
  }

  ////////////////////////////////////////////
  //creating activeCategory and partition arrays
  //This breaks down the named ranges into activeCategory and partition as well as the active range
  //Current issue is partition is pulled from the section so this info I was confused about and may need to check to see where using "partition" is causing confilcts

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
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  //if the column is the first column, check if the cell has a dropdown menu
  if (col === 1) {
    //make sure the previous display value was "Pick a Job Title"
    if (e.range.getDataValidations().length > 0) {
      if (oldValue === "Pick a Job Title") {
        updateNamedRange(rangeName, ss);
        //set the value of the first cell as "Pick a Job Title"
        sheet.getRange(row + 1, 1).setValue("Pick a Job Title");
        //set the value of column 6 to 0
        sheet.getRange(row + 1, 6).setValue(0);
        //if there is a dropdown menu, copy the row and paste it below the current row
        //check if the cell has a dropdown menu
        // return;
        getSaleRate(
          e,
          activeCategory,
          partition,
          row,
          activeRange,
          sheet,
          jobTitle
        );
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
      // return;
    }
  }
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  //if the 2nd, 3rd, or 4th column is updated for XD then update the margin for the row
  else if ((col === 2 || col === 3 || col === 4) && rangeName.includes("XD")) {
    let payRate = lookUpPayRate(name);
    let hours = sheet.getRange(row, 5).getValue();
    let total = multiplyPayRate(payRate, hours);
    let totalSellofRow = sheet.getRange(row, 7).getValue();
    let margin = (totalSellofRow - total) / totalSellofRow;
    sheet.getRange(row, 8).setValue(margin).setNumberFormat("0.00%");
  }
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  // //update header sections
  // let XDAStaffCost = TotalCost("XD", activeSheetNamedRanges, ss, sheetName); //in getPayRates.js
  // let FreelanceCost = TotalCost(
  //   "Freelancer",
  //   activeSheetNamedRanges,
  //   ss,
  //   sheetName
  // ); //in getPayRates.js
  // try {
  //   sheet.getRange("K5").setValue(XDAStaffCost);
  //   console.log(`XDAStaffCost: ${XDAStaffCost}`);
  //   sheet.getRange("L5").setValue(FreelanceCost);
  //   console.log(`FreelanceCost: ${FreelanceCost}`);
  // } catch (e) {
  //   console.log(`FreelanceCost Error: ${e}`);
  //   console.log(`XDAStaffCost Error: ${e}`);
  // }
  // ////////////////////////////////////////////

  // ////////////////////////////////////////////
  // //update total for ThirdParty cost
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
  // ////////////////////////////////////////////

  // ////////////////////////////////////////////
  // //Update total section in footer for the margin
  // let CostCombined = XDAStaffCost + FreelanceCost;
  // try {
  //   let TotalSell = ss
  //     .getRangeByName(`${sheetName}_Footer_XD_TotalSell`)
  //     .getValue();
  //   ss.getRangeByName(`${sheetName}_Footer_XD_TotalMarginPercentage`).setValue(
  //     ((TotalSell - CostCombined) / TotalSell).toFixed(2) + "%"
  //   );
  // } catch (e) {
  //   console.log(`Total Margin Percentage Error: ${e}`);
  // }

  // updateCategoryInformation(ss, activeCategory);

  //if active range name is rate_card_section, then do this
  if (activeSectionRanges[1] == "rate_card_section") {
    // ScriptApp.
    // console.log(`changing rate card`);
    //get the value of the cell
    const value = activeRange.getValue();
    // console.log(`value of cell for rate card: ${value}`);
    PropertiesService.getScriptProperties().setProperty(
      "xdaRates",
      JSON.stringify(getCurrentXdaRates(projectID, value))
    );
    return;
  }
  //////////////////////////
  console.log(`onEdit end time: ${new Date().getTime()}`);
  end = new Date();
  console.log(`Operation took ${end.getTime() - start.getTime()} msec`);
  return;
} //end onEdit function
