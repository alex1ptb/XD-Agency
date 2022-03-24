/**
 * @OnlyCurrentDoc
 */

//I need to change this function to account for if the user changes the name of the deliverable tab

//Function to count the number of deliverables tabs in the spreadsheet
function getCountOfDeliverables() {
  //grab all sheets within the spreadsheet
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheets = ss.getSheets();
  //Count all sheets that start with D# (where # is a number)
  let count = 0;
  for (let i = 0; i < sheets.length; i++) {
    let sheet = sheets[i];
    if (sheet.getName().startsWith("D")) {
      //if sheet ends in number increment count
      if (sheet.getName().match(/\d+$/)) {
        count++;
      }
    }
  }
  console.log(count);
  return count;
}
