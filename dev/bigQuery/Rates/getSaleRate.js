//This gets the sale rate for the job choosen.
function getSaleRate(e) {
  console.log("inside getSaleRate");
  const namedRange = getNamedRange(e);
  //parse the namedRange to give the first word after the first _ is found
  let words = namedRange.split("_");
  let target = words[1];
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
    const tables = getXDATable();

    //loop through the tables array and find the tableId that matches the namedRange
    for (let i = 0; i < tables.length; i++) {
      if (tables[i].tableId === target) {
        //return the tableData
        const tableData = tables[i].tableData;
        //loop through the tableData and find the job title that matches the job title from the cell that was edited
        for (let j = 0; j < tableData.length; j++) {
          if (tableData[j][0] === jobTitle) {
            //return the sale rate
            const saleRate = tableData[j][1];
            //set the value of column 6 to the sale rate
            sheet.getRange(row, 6).setValue(saleRate);
            console.log(saleRate);
          }
        }
      }
    }

    //I am thinking that I should have this run differently in the future, using callbacks and hash tables of the job titles and their sale rates.

    //if the value is "Pick a Job Title", the display value of column 6 is 0
    if (value === "Pick a Job Title") {
      sheet.getRange(row, 6).setValue(0);
    }

    //check which job title the user selected and search script properties for the sale rate
  }
}
