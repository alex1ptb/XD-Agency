//when button is clicked, add the value of the button to the current deliverable sheet and refresh the sidebar to remove the clickable li from the sidebar

function add3rdPartyToCurrentDeliverable(category) {
  console.log(`inside add3rdPartyToCurrentDeliverable function`);
  //get the current sheet
  let sheet = SpreadsheetApp.getActiveSheet();
  //get the current sheet name
  let sheetName = sheet.getName();
  //copy from A1 to Q8 and append to the end of the sheet
  deliverableLayout(category, "ThirdParty");
  console.log(
    `end of deliverableLayout function in addCategoryToCurrentDeliverable`
  );

  //refresh the sidebar
  createthirdPartyCostsSidebar();

  //add in pick a job title
  checkForRoleUpdate(category, "ThirdParty");
  console.log(
    `end of checkForRoleUpdate function in addCategoryToCurrentDeliverable`
  );
  //refresh the current sheet
  sheet.setName(sheetName);
}
