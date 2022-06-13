//This gets the sale rate for the job choosen.
function getSaleRate(
  e,
  activeCategory,
  partition,
  row,
  activeRange,
  sheet,
  jobTitle
) {
  console.log("inside getSaleRate");
  //get the row of the cell that was edited
  const value = activeRange.getValue();

  //if value is not "Pick a Job Title", get the sale rate for the job
  if (value !== "Pick a Job Title") {
    //get the value of the job title
    // console.log(`partition: ${partition}`);
    // const test = sheet.getRange(row, 1).getActive().getName();
    if (partition == "XD" || partition == "Freelancer") {
      // console.log(`inside if`);
      tables = getXdaRates();
      //loop through the tables array and find the tableId that matches the namedRange
      for (let i = 0; i < tables.length; i++) {
        if (tables[i].tableId === activeCategory) {
          //return the tableData
          const tableData = tables[i].tableData;
          //loop through the tableData and find the job title that matches the job title from the cell that was edited
          for (let j = 0; j < tableData.length; j++) {
            if (tableData[j][0] === jobTitle) {
              //return the sale rate
              const saleRate = tableData[j][1];
              console.log(`saleRate: ${saleRate}`);
              //set the value of column 6 to the sale rate
              sheet.getRange(row, 6).setValue(saleRate);
            } //if the value is "Pick a Job Title", the display value of column 6 is 0
            else {
              if (value === "Pick a Job Title") {
                sheet.getRange(row, 6).setValue(0);
              }
            }
          }
        }
      }
    }
  }
}
