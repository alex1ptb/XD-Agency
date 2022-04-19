//this function will be used when addCategoryToCurrentDeliverable is called
//it will add in the layout that is currently being used for the deliverable

//for now I am just going to use a copyTo function using range A1 to Q8

function deliverableLayout(category) {
  console.log(`inside deliverableLayout fuction`);
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let templateSheet = ss.getSheetByName("Deliverable_Template");
  let sheet = ss.getActiveSheet();

  //copy range Main_Category_Template
  let copyRange = templateSheet.getRange("Main_Category_Template");

  //check if footerRange exists
  let footerRange = ss.getRangeByName(
    `${sheet.getName()}_Main_Category_Footer`
  );

  //if footerRange exists, insert rows above the footer equal to the number of rows found in the copyRange
  if (footerRange) {
    //insert the amount of rows in copyRange above the footer
    let numRows = copyRange.getNumRows();
    //get the first row of the footerRange
    let footerRow = footerRange.getRow();
    console.log(`footerRow: ${footerRow}`);
    //insert the rows above the footer and do not have merged cells
    sheet.insertRowsBefore(footerRow, numRows);
    //get new footerRange
    footerRange = ss.getRangeByName(`${sheet.getName()}_Main_Category_Footer`);
    //get the first row of the footerRange
    footerRow = footerRange.getRow();
    console.log(`footerRow: ${footerRow}`);

    //get the starting row of the inserted rows
    startRow = footerRow - numRows;
    console.log(`startRow: ${startRow}`);
    // get range from start row pluss numrows
    let range = sheet.getRange(startRow, 1, numRows, sheet.getLastColumn());
    console.log(`range: ${range.getA1Notation()}`);

    //copy the rows from the copyRange to the sheet
    copyRange.copyTo(range);
    console.log(`copied rows from copyRange to sheet`);
  } else {
    console.log(`footerRange does not exist`);
    //copy the range starting at the last row
    startRow = sheet.getLastRow() + 1;
    copyRange.copyTo(sheet.getRange(sheet.getLastRow() + 1, 1));
  }
  console.log(`end of if statement in deliverableLayout`);
  console.log(`start row is ${startRow}`);
  //set the range name to ${sheetName}_{category}_Main_Category
  let rangeName = `${sheet.getName()}_${category}_Main_Category`;
  console.log(`rangeName is ${rangeName}`);
  //get the range in the sheet to set the name
  let range = sheet.getRange(
    startRow,
    1,
    copyRange.getNumRows(),
    copyRange.getNumColumns()
  );
  SpreadsheetApp.getActiveSpreadsheet().setNamedRange(rangeName, range);
  console.log(`set named range: ${rangeName} - deliverableLayout`);
  //add the category to the first cell of the range
  sheet.getRange(startRow, 1).setValue(category);

  //get range of new named Range
  let pasteRange = ss.getRangeByName(
    `${sheet.getName()}_${category}_Main_Category`
  );

  //the third row of pasteRange should be named {sheetName}_{category}_XD_Roles
  //set variable for 3rd row of new named range
  let thirdRow = pasteRange.getRow() + 2;

  // //set the named range for the roles
  SpreadsheetApp.getActiveSpreadsheet().setNamedRange(
    `${sheet.getName()}_${category}_XD_Roles`,
    sheet.getRange(thirdRow, 1, 1, pasteRange.getNumColumns())
  );

  //replace text for targeting
  var textFinder = sheet
    .createTextFinder("XD_Agents_Information_Template")
    .matchFormulaText(true);

  //replace text for targeting
  textFinder.replaceAllWith(`${sheet.getName()}_${category}_XD_Roles`);

  //set the formula for the 3rd column of the first row after named range
  //the 6th row of pasteRange should be named {sheetName}_{category}_Freelancer_Roles
  //set variable for 6th row of new named range
  let sixthRow = pasteRange.getRow() + 5;

  //set the named range for the roles
  SpreadsheetApp.getActiveSpreadsheet().setNamedRange(
    `${sheet.getName()}_${category}_Freelancer_Roles`,
    sheet.getRange(sixthRow, 1, 1, pasteRange.getNumColumns())
  );

  //replace text for targeting
  var textFinder = sheet
    .createTextFinder("Freelance_Information_XD_Template")
    .matchFormulaText(true);

  //replace text for targeting
  textFinder.replaceAllWith(`${sheet.getName()}_${category}_Freelancer_Roles`);
  //get the last row of the range

  console.log("deliverableLayout function complete");
}
