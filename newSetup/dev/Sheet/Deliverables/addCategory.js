/////////////////////////
//Variables
const ss = SpreadsheetApp.getActiveSpreadsheet();
const sheet = ss.getActiveSheet() || ss.getSheetByName("Test");
const sheetName = sheet.getName();
let namedRanges = sheet.getNamedRanges();
/////////////////////////

/////////////////////////
//when button is clicked, add the value of the button to the current deliverable sheet and refresh the sidebar to remove the clickable li from the sidebar
function addCategoryToCurrentDeliverable(category) {
  console.log(`inside addCategoryToCurrentDeliverable function`);
  console.log(`category: ${category}`);
  //if category has space in it, replace with _
  category = category.replace(/\s/g, "");

  // console.log(`inside addCategoryToCurrentDeliverable function`);
  deliverableLayout(category, "XD");
  //sidebar
  createDeliverableCategorySidebar();
  //add in pick a job title
  checkForRoleUpdate(category, "XD");
  //get named ranges of the current sheet
  findAndReplace(
    `Deliverable_Template_Category`,
    `${sheet.getName()}_${category}`
  );
  //   "XD_SubTotalQty",
  //   "Freelancer_SubTotalQty",
  //   "Freelancer_SubTotalCost",
  let grabList = [
    "XD_SubTotalHours",
    "XD_SubTotalSell",
    "XD_SubTotalActualHours",
    "XD_SubTotalVariance",
    "Freelancer_SubTotalHours",
    "Freelancer_SubTotalSell",
    "Freelancer_SubTotalActualHours",
    "Freelancer_SubTotalVariance",
  ];

  //   "_Footer_Freelancer_TotalFreelanceMargin",
  let targetNamedRangeToUpdateOnActiveSheet = [
    "_Footer_XD_TotalStaffHours",
    "_Footer_XD_TotalStaffSell",
    "_Footer_XD_TotalStaffActualHours",
    "_Footer_XD_TotalStaffVariance",
    "_Footer_Freelancer_TotalFreelanceHours",
    "_Footer_Freelancer_TotalFreelanceSell",
    "_Footer_Freelancer_TotalFreelanceActualHours",
    "_Footer_Freelancer_TotalFreelanceVariance",
  ];
  //for main footer
  updateFooterRangeWithNewFormulas(
    grabList,
    targetNamedRangeToUpdateOnActiveSheet
  );
  //refresh the current sheet
  // updateFooter(sheet);
  // updateJobFinancialForm(category, sheetName);
  sheet.setName(sheetName);
}

//when button is clicked, add the value of the button to the current deliverable sheet and refresh the sidebar to remove the clickable li from the sidebar
function add3rdPartyToCurrentDeliverable(category) {
  //if category has space in it, replace with _
  category = category.replace(/\s/g, "");
  deliverableLayout(category, "ThirdParty");
  createthirdPartyCostsSidebar();
  //add in pick a job title
  checkForRoleUpdate(category, "ThirdParty");
  findAndReplace(
    `Deliverable_Template_Category`,
    `${sheet.getName()}_${category}`
  );
  /////////////////////////
  //Footer ranges
  let thirdPartyList = [
    "ThirdParty_ExtendedCostSubtotal",
    "ThirdParty_CostWithContSubTotal",
    "ThirdParty_SubtotalSell",
    "ThirdParty_SubtotalDirectBill",
    "ThirdParty_SubtotalActualAmount",
    "ThirdParty_SubTotalVariance",
  ];

  let targetNamedRangeToUpdateOnActiveSheet = [
    "_Footer_ThirdParty_ExtendedCostTotal",
    "_Footer_ThirdParty_CostWithContTotal",
    "_Footer_ThirdParty_TotalSell",
    "_Footer_ThirdParty_DirectBillTotal",
    "_Footer_ThirdParty_TotalActualAmount",
    "_Footer_ThirdParty_TotalVariance",
  ];
  updateFooterRangeWithNewFormulas(
    thirdPartyList,
    targetNamedRangeToUpdateOnActiveSheet
  );
  /////////////////////////
  //refresh the current sheet
  updateJobFinancialForm(category, sheetName);
  sheet.setName(sheetName);
  console.log(`end of add3rdPartyToCurrentDeliverable function`);
}

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
