function updateFooter(sheet) {
  sheet = sheet || SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Test");
  let namedRanges = sheet.getNamedRanges();
  let XD_SubTotalQty = [];
  let XD_SubTotalHours = [];
  let XD_SubTotalSell = [];
  let XD_SubTotalActualHours = [];
  let XD_SubTotalVariance = [];
  let Freelancer_SubTotalQty = [];
  let Freelancer_SubTotalSell = [];
  let Freelancer_SubTotalHours = [];
  let Freelancer_SubTotalCost = [];
  let Freelancer_SubTotalActualHours = [];
  let Freelancer_SubTotalVariance = [];

  namedRanges.forEach(function (namedRange) {
    if (namedRange.getName().includes("XD_SubTotalQty")) {
      XD_SubTotalQty.push(namedRange.getName());
    }
    if (namedRange.getName().includes("XD_SubTotalHours")) {
      XD_SubTotalHours.push(namedRange.getName());
    }
    if (namedRange.getName().includes("XD_SubTotalSell")) {
      XD_SubTotalSell.push(namedRange.getName());
    }
    if (namedRange.getName().includes("XD_SubTotalActualHours")) {
      XD_SubTotalActualHours.push(namedRange.getName());
    }
    if (namedRange.getName().includes("XD_SubTotalVariance")) {
      XD_SubTotalVariance.push(namedRange.getName());
    }
    if (namedRange.getName().includes("Freelancer_SubTotalQty")) {
      Freelancer_SubTotalQty.push(namedRange.getName());
    }
    if (namedRange.getName().includes("Freelancer_SubTotalSell")) {
      Freelancer_SubTotalSell.push(namedRange.getName());
    }
    if (namedRange.getName().includes("Freelancer_SubTotalHours")) {
      Freelancer_SubTotalHours.push(namedRange.getName());
    }
    if (namedRange.getName().includes("Freelancer_SubTotalCost")) {
      Freelancer_SubTotalCost.push(namedRange.getName());
    }
    if (namedRange.getName().includes("Freelancer_SubTotalActualHours")) {
      Freelancer_SubTotalActualHours.push(namedRange.getName());
    }
    if (namedRange.getName().includes("Freelancer_SubTotalVariance")) {
      Freelancer_SubTotalVariance.push(namedRange.getName());
    }
  });

  //join the arrays
  let XD_SubTotalQty_Array = XD_SubTotalQty.join(",");
  let XD_SubTotalHours_Array = XD_SubTotalHours.join(",");
  let XD_SubTotalSell_Array = XD_SubTotalSell.join(",");
  let XD_SubTotalActualHours_Array = XD_SubTotalActualHours.join(",");
  let XD_SubTotalVariance_Array = XD_SubTotalVariance.join(",");
  let Freelancer_SubTotalQty_Array = Freelancer_SubTotalQty.join(",");
  let Freelancer_SubTotalSell_Array = Freelancer_SubTotalSell.join(",");
  let Freelancer_SubTotalHours_Array = Freelancer_SubTotalHours.join(",");
  let Freelancer_SubTotalCost_Array = Freelancer_SubTotalCost.join(",");
  let Freelancer_SubTotalActualHours_Array =
    Freelancer_SubTotalActualHours.join(",");
  let Freelancer_SubTotalVariance_Array = Freelancer_SubTotalVariance.join(",");

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  ss.getRangeByName(`${sheet.getName()}_Footer_XD_TotalStaffHours`).setValue(
    `=SUM(${XD_SubTotalHours_Array})`
  );

  ss.getRangeByName(`${sheet.getName()}_Footer_XD_TotalStaffSell`).setValue(
    `=SUM(${XD_SubTotalSell_Array})`
  );

  ss.getRangeByName(
    `${sheet.getName()}_Footer_XD_TotalStaffActualHours`
  ).setValue(`=SUM(${XD_SubTotalActualHours_Array})`);

  ss.getRangeByName(`${sheet.getName()}_Footer_XD_TotalStaffVariance`).setValue(
    `=SUM(${XD_SubTotalVariance_Array})`
  );

  ss.getRangeByName(
    `${sheet.getName()}_Footer_Freelancer_TotalFreelanceHours`
  ).setValue(`=SUM(${Freelancer_SubTotalHours_Array})`);

  ss.getRangeByName(
    `${sheet.getName()}_Footer_Freelancer_TotalFreelanceSell`
  ).setValue(`=SUM(${Freelancer_SubTotalSell_Array})`);

  ss.getRangeByName(
    `${sheet.getName()}_Footer_Freelancer_TotalFreelanceActualHours`
  ).setValue(`=SUM(${Freelancer_SubTotalActualHours_Array})`);

  ss.getRangeByName(
    `${sheet.getName()}_Footer_Freelancer_TotalFreelanceVariance`
  ).setValue(`=SUM(${Freelancer_SubTotalVariance_Array})`);

  ss.getRangeByName(
    `${sheet.getName()}_Footer_Freelancer_TotalFreelanceMargin`
  ).setValue(
    `=((${sheet.getName()}_Footer_Freelancer_TotalFreelanceSell-SUM(${Freelancer_SubTotalCost_Array}))/${sheet.getName()}_Footer_Freelancer_TotalFreelanceSell)`
  );
}
//when button is clicked, add the value of the button to the current deliverable sheet and refresh the sidebar to remove the clickable li from the sidebar

function addCategoryToCurrentDeliverable(category) {
  // console.log(`inside addCategoryToCurrentDeliverable function`);
  //get the current sheet
  let sheet = SpreadsheetApp.getActiveSheet();
  //get the current sheet name
  let sheetName = sheet.getName();
  //copy from A1 to Q8 and append to the end of the sheet
  deliverableLayout(category, "XD");
  //refresh the sidebar
  createDeliverableCategorySidebar();
  //add in pick a job title
  checkForRoleUpdate(category, "XD");
  //get named ranges of the current sheet
  findAndReplace(`Deliverable_Template_Category`, `${sheetName}_${category}`);
  //refresh the current sheet
  updateFooter(sheet);
  sheet.setName(sheetName);
}

//when button is clicked, add the value of the button to the current deliverable sheet and refresh the sidebar to remove the clickable li from the sidebar
function add3rdPartyToCurrentDeliverable(category) {
  // console.log(`inside add3rdPartyToCurrentDeliverable function`);
  //get the current sheet
  let sheet = SpreadsheetApp.getActiveSheet();
  //get the current sheet name
  let sheetName = sheet.getName();
  //copy from A1 to Q8 and append to the end of the sheet
  deliverableLayout(category, "ThirdParty");
  //refresh the sidebar
  createthirdPartyCostsSidebar();
  //add in pick a job title
  checkForRoleUpdate(category, "ThirdParty");
  // Deliverable_Template_Category_ThirdParty_Section
  findAndReplace(`Deliverable_Template_Category`, `${sheetName}_${category}`);
  // Deliverable_Template_Category_ThirdParty_Section
  //refresh the current sheet
  update3rdPartyFooter(sheet);
  sheet.setName(sheetName);
  console.log(`end of add3rdPartyToCurrentDeliverable function`);
}

///WORK ON UPDATING FOOTER OF 3RD PARTY SECTION
function update3rdPartyFooter(sheet) {
  let ThirdParty_ExtendedCostSubtotal = [];
  let ThirdParty_CostWithContSubTotal = [];
  let ThirdParty_SubtotalSell = [];
  let ThirdParty_SubtotalDirectBill = [];
  let ThirdParty_SubtotalActualAmount = [];
  let ThirdParty_SubTotalVariance = [];

  /* Target areas
  Deliverable_Template_Footer_ThirdParty_ExtendedCostTotal
  Deliverable_Template_ThirdParty_CostWithContTotal
  Deliverable_Template_Footer_ThirdParty_TotalSell
  Deliverable_Template_Footer_ThirdParty_DirectBillTotal
  Deliverable_Template_Footer_ThirdParty_TotalActualAmount
  Deliverable_Template_Footer_ThirdParty_TotalVariance
  */

  sheet.getNamedRanges().forEach((namedRange) => {
    if (namedRange.getName().includes("ThirdParty_ExtendedCostSubtotal")) {
      ThirdParty_ExtendedCostSubtotal.push(namedRange.getName());
    }
    if (namedRange.getName().includes("ThirdParty_CostWithContSubTotal")) {
      ThirdParty_CostWithContSubTotal.push(namedRange.getName());
    }
    if (namedRange.getName().includes("ThirdParty_SubtotalSell")) {
      ThirdParty_SubtotalSell.push(namedRange.getName());
    }
    if (namedRange.getName().includes("ThirdParty_SubtotalDirectBill")) {
      ThirdParty_SubtotalDirectBill.push(namedRange.getName());
    }
    if (namedRange.getName().includes("ThirdParty_SubtotalActualAmount")) {
      ThirdParty_SubtotalActualAmount.push(namedRange.getName());
    }
    if (namedRange.getName().includes("ThirdParty_SubTotalVariance")) {
      ThirdParty_SubTotalVariance.push(namedRange.getName());
    }
  });

  let ThirdParty_ExtendedCostSubtotal_Array =
    ThirdParty_ExtendedCostSubtotal.join(",");
  let ThirdParty_CostWithContSubTotal_Array =
    ThirdParty_CostWithContSubTotal.join(",");
  let ThirdParty_SubtotalSell_Array = ThirdParty_SubtotalSell.join(",");
  let ThirdParty_SubtotalDirectBill_Array =
    ThirdParty_SubtotalDirectBill.join(",");
  let ThirdParty_SubtotalActualAmount_Array =
    ThirdParty_SubtotalActualAmount.join(",");
  let ThirdParty_SubTotalVariance_Array = ThirdParty_SubTotalVariance.join(",");

  ss.getRangeByName(
    `${sheet.getName()}_Footer_ThirdParty_ExtendedCostTotal`
  ).setValue(`=SUM(${ThirdParty_ExtendedCostSubtotal_Array})`);
  ss.getRangeByName(
    `${sheet.getName()}_Footer_ThirdParty_CostWithContTotal`
  ).setValue(`=SUM(${ThirdParty_CostWithContSubTotal_Array})`);
  ss.getRangeByName(`${sheet.getName()}_Footer_ThirdParty_TotalSell`).setValue(
    `=SUM(${ThirdParty_SubtotalSell_Array})`
  );
  ss.getRangeByName(
    `${sheet.getName()}_Footer_ThirdParty_DirectBillTotal`
  ).setValue(`=SUM(${ThirdParty_SubtotalDirectBill_Array})`);
  ss.getRangeByName(
    `${sheet.getName()}_Footer_ThirdParty_TotalActualAmount`
  ).setValue(`=SUM(${ThirdParty_SubtotalActualAmount_Array})`);
  ss.getRangeByName(
    `${sheet.getName()}_Footer_ThirdParty_TotalVariance`
  ).setValue(`=SUM(${ThirdParty_SubTotalVariance_Array})`);
}
