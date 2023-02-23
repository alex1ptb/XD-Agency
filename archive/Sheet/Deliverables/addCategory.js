/////////////////////////
//Variables
const ss = SpreadsheetApp.getActiveSpreadsheet();
const sheet = ss.getActiveSheet() || ss.getSheetByName("Test");
const sheetName = sheet.getName();
let namedRanges = sheet.getNamedRanges();
/////////////////////////

//INFO NEEDED
/////////////////////////
//RANGES
//Footer ranges
const thirdPartyInfo = [
  //third party targets
  [
    "ThirdParty_ExtendedCostSubtotal",
    "ThirdParty_CostWithContSubTotal",
    "ThirdParty_SubtotalSell",
    "ThirdParty_SubtotalDirectBill",
    "ThirdParty_SubtotalActualAmount",
    "ThirdParty_SubTotalVariance",
  ],
  //footer target
  [
    "_Footer_ThirdParty_ExtendedCostTotal",
    "_Footer_ThirdParty_CostWithContTotal",
    "_Footer_ThirdParty_TotalSell",
    "_Footer_ThirdParty_DirectBillTotal",
    "_Footer_ThirdParty_TotalActualAmount",
    "_Footer_ThirdParty_TotalVariance",
  ],
];

//XD ranges
const xdInfo = [
  //let grabList =
  [
    "XD_SubTotalHours",
    "XD_SubTotalSell",
    "XD_SubTotalActualHours",
    "XD_SubTotalVariance",
    "Freelancer_SubTotalHours",
    "Freelancer_SubTotalSell",
    "Freelancer_SubTotalActualHours",
    "Freelancer_SubTotalVariance",
  ],
  //   "_Footer_Freelancer_TotalFreelanceMargin",
  //let targetNamedRangeToUpdateOnActiveSheet =
  [
    "_Footer_XD_TotalStaffHours",
    "_Footer_XD_TotalStaffSell",
    "_Footer_XD_TotalStaffActualHours",
    "_Footer_XD_TotalStaffVariance",
    "_Footer_Freelancer_TotalFreelanceHours",
    "_Footer_Freelancer_TotalFreelanceSell",
    "_Footer_Freelancer_TotalFreelanceActualHours",
    "_Footer_Freelancer_TotalFreelanceVariance",
  ],
  //extras
  //   "XD_SubTotalQty",
  //   "Freelancer_SubTotalQty",
  //   "Freelancer_SubTotalCost",
];
/////////////////////////

//FUNCTIONS
/////////////////////////
//Function newAddCategory
function newAddCategory(category, section, list) {
  category = category.replace(/\s/g, "");
  deliverableLayout(category, section);
  //either
  if (section == "XD") {
    createDeliverableCategorySidebar();
  } else if (section == "ThirdParty") {
    createthirdPartyCostsSidebar();
  }
  checkForRoleUpdate(category, section);
  findAndReplace(
    `Deliverable_Template_Category`,
    `${sheet.getName()}_${category}`
  );
  updateFooterRangeWithNewFormulas(list[0], list[1]);
  sheet.setName(sheetName);
}

//function addXDToCurrentDeliverable
function addCategoryToCurrentDeliverable(category) {
  newAddCategory(category, "XD", xdInfo);
}

//function addThirdPartyToCurrentDeliverable
function add3rdPartyToCurrentDeliverable(category) {
  newAddCategory(category, "ThirdParty", thirdPartyInfo);
}
/////////////////////////

//add addDeliverableToDataProperty
/////////////////////////
