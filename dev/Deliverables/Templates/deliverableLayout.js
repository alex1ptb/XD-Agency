//this function will be used when addCategoryToCurrentDeliverable is called
//it will add in the layout that is currently being used for the deliverable

//for now I am just going to use a copyTo function using range A1 to Q8

function deliverableLayout(category) {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let templateSheet = ss.getSheetByName("Deliverable_Template");
  let sheet = ss.getActiveSheet();
  let lastRow = sheet.getLastRow();
  console.log(`lastRow: ${lastRow}`);
  if (lastRow == 0) {
    lastRow = 1;
  }
  console.log(`lastRow after check: ${lastRow}`);

  //copy from A1 to Q8 and append to the end of the sheet
  let copyRange = templateSheet.getRange("Main_Category_Template");
  //paste range after last row
  let pasteRange = sheet.getRange(lastRow + 1, 1, 8, 16);
  //copy the range to the new range on the active sheet
  copyRange.copyTo(pasteRange);

  //give the new range a name
  SpreadsheetApp.getActiveSpreadsheet().setNamedRange(category, pasteRange);
}
