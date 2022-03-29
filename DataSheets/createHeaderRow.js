//add top row to every sheet in spreadsheet. Name the first column "Role"
function createHeaderRow(spreadsheetId) {
  if (spreadsheetId === undefined) {
    spreadsheetId = "1tAJVIBvZ69JeM_S2sIZmppr1cnuHOTTMWpAwfjjaZTY";
  }
  //get the spreadsheet
  const ss = SpreadsheetApp.openById(spreadsheetId);
  //get the sheets
  const sheets = ss.getSheets();
  //loop through the sheets
  for (let i = 0; i < sheets.length; i++) {
    //insert the header row
    sheets[i].insertRowBefore(1);
    //get the header row
    const headerRow = sheets[i].getRange(1, 1, 1, sheets[i].getLastColumn());
    //target column A
    const headerRowA = headerRow.getRange(1, 1, 1, 1);
    //set the value of column A to "Role"
    headerRowA.setValue("Role");
  }
}
