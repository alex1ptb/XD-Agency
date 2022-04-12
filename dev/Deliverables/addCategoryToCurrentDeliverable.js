//when button is clicked, add the value of the button to the current deliverable sheet and refresh the sidebar to remove the clickable li from the sidebar

function addCategoryToCurrentDeliverable(category) {
  //get the current sheet
  let sheet = SpreadsheetApp.getActiveSheet();
  //get the current sheet name
  let sheetName = sheet.getName();

  //find the last row and add one to it
  let lastRow = sheet.getLastRow();
  if (lastRow == 0) {
    lastRow = 1;
  }
  let newRow = lastRow + 1;

  //copy from A1 to Q8 and append to the end of the sheet
  deliverableLayout(category);

  //add the category to the current sheet
  sheet.getRange(newRow, 1).setValue(category);

  //refresh the sidebar
  createDeliverableCategorySidebar();

  //add in pick a job title
  // checkForRoleUpdate(newRow);

  //refresh the current sheet
  sheet.setName(sheetName);
}
