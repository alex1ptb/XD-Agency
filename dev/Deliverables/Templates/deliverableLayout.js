//this function will be used when addCategoryToCurrentDeliverable is called
//it will add in the layout that is currently being used for the deliverable

//for now I am just going to use a copyTo function using range A1 to Q8

function deliverableLayout(category) {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("ChooseAgent");
  let lastRow = sheet.getLastRow();
  //   let lastColumn = sheet.getLastColumn();

  //copy from A1 to Q8 and append to the end of the sheet
  let copyRange = sheet.getRange(1, 1, 8, 16);
  //paste range after last row
  let pasteRange = sheet.getRange(lastRow + 1, 1, 8, 16);
  copyRange.copyTo(pasteRange);
  //get the range of the copyRange and set the name of the range to the category
  let range = sheet.getRange(lastRow + 1, 1, 8, 16);
  //set the name of the range to the category
  SpreadsheetApp.getActive().setNamedRange(category, range);
}
