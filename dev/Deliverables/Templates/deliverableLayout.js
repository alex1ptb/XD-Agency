//this function will be used when addCategoryToCurrentDeliverable is called
//it will add in the layout that is currently being used for the deliverable

//for now I am just going to use a copyTo function using range A1 to Q8

function deliverableLayout(category) {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let templateSheet = ss.getSheetByName("ChooseCategoryTemplate");
  let sheet = ss.getActiveSheet();
  let lastRow = sheet.getLastRow();
  if (lastRow == 0) {
    lastRow = 1;
  }
  //   let lastColumn = sheet.getLastColumn();
  let firstRow = [
    "",
    "QTY",
    "Total",
    "HRS",
    "Total",
    "HRS",
    "Sell Rate",
    "Total Sell",
    "Margin",
    "NOTES:",
    "Enter Pad Hours",
    "Notes for Rod",
    "PO#",
    "ENTER ACTUAL HOURS",
    "VARIANCE",
  ];

  //copy from A1 to Q8 and append to the end of the sheet
  let copyRange = templateSheet.getRange(1, 1, 8, 16);
  //paste range after last row
  let pasteRange = sheet.getRange(lastRow + 1, 1, 8, 16);
  copyRange.copyTo(pasteRange);
  //get the range of the copyRange and set the name of the range to the category
  let range = sheet.getRange(lastRow + 1, 1, 8, 16);
  //set the name of the range to the category
  SpreadsheetApp.getActive().setNamedRange(category, range);
}
