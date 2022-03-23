//function to return name range of the currently selected row
function getNamedRange(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const activeRange = e.range;
  const namedRange = sheet.getNamedRange(activeRange.getA1Notation());
  //alert named range
  SpreadsheetApp.getUi().alert(namedRange);
  return namedRange;
}

function getNamedRanges() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const namedRanges = sheet.getNamedRanges();
  return namedRanges;
}

//This gets the sale rate for the job choosen.

function getSaleRate(e) {
  const namedRanges = getNamedRanges();

  // getNamedRange(e);
  const sheet = SpreadsheetApp.getActiveSheet();
  const activeRange = e.range;

  //get the row of the cell that was edited
  const row = activeRange.getRow();
  const value = activeRange.getValue();

  //see what namedRanged the row is in

  //if value is not "Pick a Job Title", get the sale rate for the job
  if (value !== "Pick a Job Title") {
    //get the value of the job title
    const jobTitle = sheet.getRange(row, 1).getValue();
    // const test = sheet.getRange(row, 1).getActive().getName();
    // Logger.log(`test: ${test}`);
    const tables = getXDATable();

    //loop through the tables array and find the tableData that matches the jobTitle

    //I am thinking that I should have this run differently in the future, using callbacks and hash tables of the job titles and their sale rates.

    //if the value is "Pick a Job Title", the display value of column 6 is 0
    if (value === "Pick a Job Title") {
      sheet.getRange(row, 6).setValue(0);
    }

    //check which job title the user selected and search script properties for the sale rate
  }
}
