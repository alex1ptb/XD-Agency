//when the sheet is changed, check if cell has dropdown menu, if so, copy the row and paste it below the current row
function onEdit(e) {
  // removeDeadReferences();
  // console.log(`e: ${JSON.stringify(e)}`);
  // console.log(`onEdit: ${e.value} -- value`);
  //get all named ranges this cell belongs to
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activeRange = e.range;
  const sheet = SpreadsheetApp.getActiveSheet();
  console.log(`first edit on sheet: ${sheet.getName()}`);
  const activeSheetNamedRanges = sheet.getNamedRanges();
  const sheetName = sheet.getName();
  const oldValue = e.oldValue;
  const row = activeRange.getRow();
  const col = activeRange.getColumn();
  //*************
  ////////
  /////// */
  const activeSectionRanges = GetClosestNamedRange(
    activeSheetNamedRanges,
    activeRange
  ).split(",");
  console.log(`eNamedRangesArray: ${activeSectionRanges}`);
  //first column in range is jobTitle
  const jobTitle = sheet.getRange(row, 1).getValue();
  //second column is always names of the person for the job
  let name = sheet.getRange(row, 2).getValue();
  if (name == null || name == undefined) {
    name = "";
  }

  ////////////////////////////////////////////
  //creating serviceCategory and partition arrays
  for (let i = 0; i < activeSectionRanges.length; i++) {
    //if the named range has Section in it then ignore it
    if (activeSectionRanges[i].includes("Section")) {
      //target 2nd word
      serviceCategory = activeSectionRanges[i].split("_")[1];
      // console.log(`onEdit: serviceCategory: ${serviceCategory}`);
      partition = activeSectionRanges[i].split("_")[2];
      // console.log(`onEdit: partition: ${partition}`);
      continue;
    } else {
      rangeName = activeSectionRanges[i];
      // console.log(`onEdit: rangeName: ${rangeName}`);
    }
  }
  console.log(`serviceCategory: ${serviceCategory}`);
  console.log(`partition: ${partition}`);
  console.log(`ActiveRangeName: ${rangeName}`);
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
        getSaleRate(e);
        updateNamedRange(rangeName);
        //set the value of the first cell as "Pick a Job Title"
        sheet.getRange(row + 1, 1).setValue("Pick a Job Title");
        //set the value of column 6 to 0
        sheet.getRange(row + 1, 6).setValue(0);
        return;
      }
      //get the sale rate for the job
      console.log(`getting sale rate for job: ${jobTitle}`);
      getSaleRate(e);
      return;
    }
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
  } catch (e) {
    console.log(`XDAStaffCost Error: ${e}`);
  }
  try {
    FreelanceCost = TotalCost(
      "Freelancer",
      activeSheetNamedRanges,
      ss,
      sheetName
    ); //in getPayRates.js
    console.log(`FreelanceCost: ${FreelanceCost}`);
    sheet.getRange("L5").setValue(FreelanceCost);
  } catch (e) {
    console.log(`FreelanceCost Error: ${e}`);
  }
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  //Update total section in footer for the margin
  let CostCombined = XDAStaffCost + FreelanceCost;
  let TotalSell = ss
    .getRangeByName(`${sheetName}_Footer_XD_TotalSell`)
    .getValue();
  ss.getRangeByName(`${sheetName}_Footer_XD_TotalMarginPercentage`).setValue(
    (TotalSell - CostCombined) / TotalSell
  );
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
    console.log(
      `ThirdPartyCost: ${ThirdPartyCost} has been added to the footer`
    );
  } catch (e) {
    console.log(`ThirdPartyCost Error: ${e}`);
  }
  ////////////////////////////////////////////

  updateSortableByServiceAreaReport(
    e,
    sheetName,
    oldValue,
    partition,
    serviceCategory
  );
  updateClientSummaryReport(
    e,
    sheetName,
    oldValue,
    partition,
    serviceCategory,
    activeRange
  );
  updateSortableBy3rdPartyReport(
    e,
    sheetName,
    oldValue,
    partition,
    serviceCategory
  );
} //end onEdit function
