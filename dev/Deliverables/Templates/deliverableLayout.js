//this function will be used when addCategoryToCurrentDeliverable is called
//it will add in the layout that is currently being used for the deliverable

//partition is where the category will be added
function deliverableLayout(category, partition) {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let templateSheet = ss.getSheetByName("Deliverable_Template");
  let sheet = ss.getActiveSheet();
  console.log(`partition: ${partition}`);
  //copy range Main_Category_Template
  let copyRange = templateSheet.getRange(
    `Deliverable_Template_Category_${partition}_Section`
  );

  // //see if there are named ranges inside the copy range
  //   let namedRanges = copyRange.getNamedRanges();
  //   if (namedRanges.length > 0) {
  //     //loop through the named ranges and replace the name with the category name
  //     namedRanges.forEach((namedRange) => {
  //       let range = namedRange.getRange();
  //       let newName = namedRange
  //         .getName()
  //         .replace("Deliverable_Template", `${title}`)
  //         .replace("Category", `${category}`);
  //         ;
  //       console.log(`Renaming named range: ${namedRange.getName()} to ${newName}`);
  //       ss.setNamedRange(newName, range);
  //     });

  //check if footerRange exists
  let footerRange = ss.getRangeByName(
    `${sheet.getName()}_Footer_${partition}_Section`
  );

  //if footerRange exists, insert rows above the footer equal to the number of rows found in the copyRange
  if (footerRange) {
    //insert the amount of rows in copyRange above the footer
    let numRows = copyRange.getNumRows();
    //get the first row of the footerRange
    let footerRow = footerRange.getRow();
    //insert the rows above the footer and do not have merged cells
    sheet.insertRowsBefore(footerRow, numRows);
    //get new footerRange
    footerRange = ss.getRangeByName(
      `${sheet.getName()}_Footer_${partition}_Section`
    );
    //get the first row of the footerRange
    footerRow = footerRange.getRow();
    //get the starting row of the inserted rows
    startRow = footerRow - numRows;
    // get range from start row pluss numrows
    let range = sheet.getRange(startRow, 1, numRows, sheet.getLastColumn());
    //copy the rows from the copyRange to the sheet
    copyRange.copyTo(range);
  } else {
    //copy the range starting at the last row
    startRow = sheet.getLastRow() + 1;
    copyRange.copyTo(sheet.getRange(sheet.getLastRow() + 1, 1));
  }
  //set the range name to ${sheetName}_{category}_Main_Category
  let rangeName = `${sheet.getName()}_${category}_${partition}_Section`;
  //get the range in the sheet to set the name
  let range = sheet.getRange(
    startRow,
    1,
    copyRange.getNumRows(),
    copyRange.getNumColumns()
  );
  SpreadsheetApp.getActiveSpreadsheet().setNamedRange(rangeName, range);
  //add the category to the first cell of the range
  sheet.getRange(startRow, 1).setValue(category);

  //get range of new named Range
  let pasteRange = ss.getRangeByName(
    `${sheet.getName()}_${category}_${partition}_Section`
  );

  //the third row of pasteRange should be named {sheetName}_{category}_XD_Roles
  //set variable for 3rd row of new named range
  let thirdRow = pasteRange.getRow() + 2;

  // //set the named range for the roles
  SpreadsheetApp.getActiveSpreadsheet().setNamedRange(
    `${sheet.getName()}_${category}_${partition}_Roles`,
    sheet.getRange(thirdRow, 1, 1, pasteRange.getNumColumns())
  );

  //replace text for targeting
  var textFinder = sheet
    .createTextFinder("XD_Agents_Information_Template")
    .matchFormulaText(true);

  //replace text for targeting
  textFinder.replaceAllWith(
    `${sheet.getName()}_${category}_${partition}_Roles`
  );

  //set the formula for the 3rd column of the first row after named range
  //the 6th row of pasteRange should be named {sheetName}_{category}_Freelancer_Roles
  //set variable for 6th row of new named range
  let sixthRow = pasteRange.getRow() + 5;

  //set the named range for the roles
  if (partition == "XD") {
    SpreadsheetApp.getActiveSpreadsheet().setNamedRange(
      `${sheet.getName()}_${category}_Freelancer_Roles`,
      sheet.getRange(sixthRow, 1, 1, pasteRange.getNumColumns())
    );
  }
  //replace text for targeting
  var textFinder = sheet
    .createTextFinder("Freelance_Information_XD_Template")
    .matchFormulaText(true);

  //replace text for targeting
  textFinder.replaceAllWith(`${sheet.getName()}_${category}_Freelancer_Roles`);
  //get the last row of the range
  let deleteSection = ss.getRangeByName(
    `${sheet.getName()}_Category_${partition}_Section`
  );
  if (deleteSection != null) {
    ss.deleteRows(deleteSection.getRow(), deleteSection.getNumRows());
  }
}
