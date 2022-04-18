//this takes the data from the user for the title and the categories and makes a new sheet inside of the spreadsheet. The name of the spreadsheet will be the title provided by the user. And the starting categories will be pulled from the array provided by the user.
function makeNewDeliverablefromUserInput(title, categories) {
  let templateSheet = ss.getSheetByName("Deliverable_Template");
  console.log(`inside server creating sheet named: ${title}`);
  ss.insertSheet(title);
  let sheet = ss.getActiveSheet();
  //now to pull template sections from templateSheet and input them into the new sheet
  //first grab the header template
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
  console.log(`headerRange: ${headerRange}`);

  //now add in the categories
  categories.forEach((category) => {
    console.log(`adding category: ${category}`);
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
  console.log(`copyFooter: ${copyFooter}`);
  //get number of rows in the template footer
  let footerRows = copyFooter.getNumRows();
  let footerCols = copyFooter.getNumColumns();

  //set variable for start of footer section
  let footerStart = sheet.getLastRow() + 1;

  copyFooter.copyTo(sheet.getRange(footerStart, 1));

  //get range of footer section
  let footerRange = sheet.getRange(footerStart, 1, footerRows, footerCols);

  //set the footer range name to {title}_Main_Category_Footer
  SpreadsheetApp.getActiveSpreadsheet().setNamedRange(
    `${title}_Main_Category_Footer`,
    footerRange
  );
}
