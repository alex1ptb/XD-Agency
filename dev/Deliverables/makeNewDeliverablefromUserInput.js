//this takes the data from the user for the title and the categories and makes a new sheet inside of the spreadsheet. The name of the spreadsheet will be the title provided by the user. And the starting categories will be pulled from the array provided by the user.
function makeNewDeliverablefromUserInput(title, categories) {
  console.log(`inside makeNewDeliverable`);
  console.log(`title: ${title}`);
  console.log(`categories: ${categories}`);
  let templateSheet = ss.getSheetByName("Deliverable_Template");
  console.log(`inside server creating sheet named: ${title}`);
  ss.insertSheet(title);
  let sheet = ss.getActiveSheet();
  //now to pull template sections from templateSheet and input them into the new sheet
  //first grab the header template
  //copy header section to sheet
  let copyRange = templateSheet.getRange("Deliverable_Template_Header");
  copyRange.copyTo(sheet.getRange(1, 1));
  // *****I NEED TO ADD IN HAVING THIS BE A NAMED RANGE

  //now add in the categories

  categories.forEach((category) => {
    let lastRow = sheet.getLastRow();
    deliverableLayout(category);
    let newRow = lastRow + 1;
    sheet.getRange(newRow, 1).setValue(category);
    checkForRoleUpdate(newRow);
  });
}
