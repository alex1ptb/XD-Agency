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
  //refresh the current sheet
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
  findAndReplace(
    `Deliverable_Template_Category_ThirdParty_Section`,
    `${sheetName}_${category}_ThirdParty_Section`
  );
  findAndReplace(
    `Deliverable_Template_Category_ThirdParty_Role`,
    `${sheetName}_${category}_ThirdParty_Roles`
  );
  // Deliverable_Template_Category_ThirdParty_Section
  //refresh the current sheet
  sheet.setName(sheetName);
  console.log(`end of add3rdPartyToCurrentDeliverable function`);
}
