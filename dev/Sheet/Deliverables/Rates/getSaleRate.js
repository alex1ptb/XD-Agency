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
  //get the row of the cell that was edited
  const value = jobTitle;
  if (value === "Pick a Job Title") {
    sheet.getRange(row, 6).setValue(0);
    return;
  } else {
    if (value !== "Pick a Job Title") {
      //get the value of the job title
      if (partition == "XD" || partition == "Freelancer") {
        // console.log(`inside if`);
        tables = getXdaRates();
        //loop through the tables array and find the tableId that matches the namedRange
        for (let i = 0; i < tables.length; i++) {
          activeCategorySpaced = activeCategory.replace(/[A-Z]/g, " $&").trim();
          if (tables[i].tableId === activeCategorySpaced) {
            //return the tableData
            const tableData = tables[i].tableData;
            //loop through the tableData and find the job title
            for (let j = 0; j < tableData.length; j++) {
              if (tableData[j][0] === jobTitle) {
                //return the sale rate
                const saleRate = tableData[j][1];
                sheet.getRange(row, 6).setValue(saleRate);
              }
            }
          }
        }
      }
    }
  }
  return;
}
