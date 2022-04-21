//any time a new sheet is created, we need to get the sheetName and add it to the namedRange ProjectInformationSummary_Deliverables
//we are going to make this a funciton

//create a function to insert row after namedRange
function updateNamedRange(namedRange, title) {
  console.log(`inside updateNamedRange`);
  const range = ss.getRangeByName(namedRange);
  const sheetName = range.getSheet().getName();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  sheet.insertRowAfter(range.getLastRow());
  //copy the row and paste it below the current row
  sheet
    .getRange(range.getLastRow(), 1, 1, sheet.getLastColumn())
    .copyTo(
      sheet.getRange(range.getLastRow() + 1, 1, 1, sheet.getLastColumn())
    );
  //update named range to include the new row
  let newRange = sheet.getRange(
    range.getRow(), //get first row
    range.getColumn(), //get first column
    range.getNumRows() + 1, //get last row + 1
    range.getNumColumns() //get last column
  );
  //set the namedRange to the new range
  ss.setNamedRange(namedRange, newRange);

  //if namedRange is ProjectInformationSummary_Deliverables, then add the title to the new row
  if (namedRange === "ProjectInformationSummary_Deliverables") {
    sheet.getRange(newRange.getLastRow(), newRange.getColumn()).setValue(title);
  }
  if (namedRange === "PriceByDeliverable_Deliverables") {
    sheet.getRange(newRange.getLastRow(), newRange.getColumn()).setValue(title);
  }
}

//

//create an array of all the sheets in the spreadsheet
function getAllSheets() {
  const sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  return sheets;
}

//create a function to add a new sheet to the spreadsheet
function addNewSheet(title) {
  //get the active spreadsheet
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  //create a new sheet
  const newSheet = spreadsheet.insertSheet(title);
  //return the new sheet
  return newSheet;
}

//

// function addSheetToProjectInformationSummarySheet(title) {
//   console.log(`inside addSheetToProjectInformationSummarySheet`);
//   //get the ProjectInformationSummary namedRange
//   let namedRange = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(
//     "ProjectInformationSummary_Deliverables"
//   );
//   console.log(`range: ${namedRange.getA1Notation()}`);
//   //get the range of the namedRange
//   let range = namedRange;
//   //insert a row at the end of the range
//   range.insertRowAfter(range.getLastRow());
//   //update named range to include the new row
//   let newRange = range.getRange(
//     range.getRow(), //get first row
//     range.getColumn(), //get first column
//     range.getLastRow() + 1, //get last row + 1
//     range.getLastColumn() //get last column
//   );
//   //set the namedRange to the new range
//   SpreadsheetApp.getActiveSpreadsheet().setNamedRange(
//     "ProjectInformationSummary_Deliverables",
//     newRange
//   );
//   //add the title to the new row
//   newRange.getCell(newRange.getLastRow(), 1).setValue(title);
//   console.log(`finished addSheetToProjectInformationSummarySheet`);
// }
