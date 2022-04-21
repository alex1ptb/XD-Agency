//this takes the data from the user for the title and the categories and makes a new sheet inside of the spreadsheet. The name of the spreadsheet will be the title provided by the user. And the starting categories will be pulled from the array provided by the user.
function makeNewDeliverablefromUserInput(title, categories) {
  let templateSheet = ss.getSheetByName("Deliverable_Template");
  console.log(`inside server creating sheet named: ${title}`);
  ss.insertSheet(title);
  let sheet = ss.getActiveSheet();
  //copy header section to sheet
  let copyHeader = templateSheet.getRange("Deliverable_Template_Header");
  copyHeader.copyTo(sheet.getRange(1, 1));
  //grab the range that was copied over
  let headerRange = sheet.getRange(
    1,
    1,
    sheet.getLastRow(),
    sheet.getLastColumn()
  );

  //set the header range name to {title}_Header
  SpreadsheetApp.getActiveSpreadsheet().setNamedRange(
    `${title}_Main_Category_Header`,
    headerRange
  );

  //now add in the categories
  categories.forEach((category) => {
    let lastRow = sheet.getLastRow();
    deliverableLayout(category);
    let newRow = lastRow + 1;
    sheet.getRange(newRow, 1).setValue(category);
    checkForRoleUpdate(category);
  });

  //now to add in the footer
  let copyFooter = templateSheet.getRange(
    "Deliverable_Template_Main_Category_Footer"
  );

  copyFooter.copyTo(sheet.getRange(sheet.getLastRow() + 1, 1));

  //get range of footer section
  let footerRange = sheet.getRange(
    sheet.getLastRow() + 1,
    1,
    copyFooter.getNumRows(),
    copyFooter.getNumColumns()
  );

  //set the footer range name to {title}_Main_Category_Footer
  SpreadsheetApp.getActiveSpreadsheet().setNamedRange(
    `${title}_Main_Category_Footer`,
    footerRange
  );

  //run function to add the sheetName to all of the sheets that need it
  // addSheetToProjectInformationSummarySheet(title);
  updateNamedRange("ProjectInformationSummary_Deliverables", title);
  updateNamedRange("PriceByDeliverable_Deliverables", title);
}
