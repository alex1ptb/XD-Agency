function newUpdateSortableBy3rdPartyReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = "SortableBy3rdPartyReport";
  const rangeName = "ThirdPartyReport";
  //get all named ranges in the spreadsheet
  const namedRanges = ss.getNamedRanges();
  // console.log(`namedRanges is ${namedRanges}`);
  //filter out named ranges that have "Deliverable_Template" in them
  const namedRangesToInput = namedRanges.filter((namedRange) =>
    namedRange.getName().endsWith("Roles")
  );
  // console.log(`namedRangesToInput is ${namedRangesToInput}`);
  let targetRange = ss.getRangeByName(rangeName);
  //delete all but the last row within the named range
  let targetRangeLastRow = targetRange.getLastRow();
  let startingRow = targetRange.getRow();

  for (let i = targetRangeLastRow; i > startingRow; i--) {
    ss.getSheetByName(sheetName).deleteRow(i);
  }

  const valuesToAddToReport = [];

  namedRangesToInput.forEach((range) => {
    if (range !== null && range !== undefined) {
      targetRange = targetRange;
      const name = range.getName();
      const splitName = name.split("_");
      const section = splitName[splitName.length - 2];
      //check if 3rd from last is "Category", if so then skip it
      if (splitName[splitName.length - 3] === "Category") {
        return; //this is here to handle the template named ranges
      }
      const sheetName = ss.getRangeByName(name).getSheet().getName();
      const rangeValuesInNamedRange = ss.getRangeByName(name).getValues();
      //go through each row in the named range and if the row has value of "Insert Freelance Name" or "Choose XD Agent Member" then skip it
      for (let i = 0; i < rangeValuesInNamedRange.length; i++) {
        if (
          rangeValuesInNamedRange[i][1] === "Insert Freelance Name" ||
          rangeValuesInNamedRange[i][1] === "Choose XD Agent Member" ||
          rangeValuesInNamedRange[i][0] === "Pick a Job Title"
        ) {
          return;
        } else {
          //break into xd or freelancer
          if (section === "ThirdParty") {
            let row = rangeValuesInNamedRange[i];
            /* rowData setup is as follows:
                deliverable,
                category,
                role,
                employee name,
                vendor,
                notes,
                qty,
                cost with contingency,
                3rd party markup,
                cost,
                actual cost,
                percent used,
                balance cost,
                direct bill,
                po #,
                actual hours
            */
            let rowData = [];
            const jobRole = row[0];
            const employeeName = row[1];
            const notes = row[5];
            const vendor = row[2];
            const costWithContingency = row[9];
            const thirdPartyMarkup = row[10];
            const cost = row[11];
            const qty = row[3];
            const rate = row[4];
            const actualCost = row[15];
            const budgetedHours = rate * qty;
            const directBill = row[13];

            rowData.push(
              sheetName,
              splitName[splitName.length - 3],
              jobRole,
              employeeName,
              vendor,
              notes,
              qty,
              costWithContingency,
              thirdPartyMarkup,
              cost,
              actualCost,
              //percent used,
              actualCost / cost,
              //balance cost,
              cost - actualCost,
              //direct bill,
              directBill,
              //po #,
              row[14],
              //actual cost
              actualCost
            );

            valuesToAddToReport.push(rowData);
          }
        }
      }
    }
  });

  //add the values to the report
  ss.getSheetByName(sheetName)
    .getRange(
      targetRange.getRow(),
      targetRange.getColumn(),
      valuesToAddToReport.length,
      valuesToAddToReport[0].length
    )
    .setValues(valuesToAddToReport);
  //update the named to include the new rows
  let newRange = ss.getSheetByName(sheetName).getRange(
    targetRange.getRow(), //get first row
    targetRange.getColumn(), //get first column
    valuesToAddToReport.length, //get last row + 1
    valuesToAddToReport[0].length //get last column
  );
  //set the namedRange to the new range
  ss.setNamedRange(rangeName, newRange);

  //set namedRange to have background of white
  ss.getRangeByName(rangeName).setBackground("white");
  //set border of namedRange to black
  ss.getRangeByName(rangeName).setBorder(
    true, //top
    true, //left
    true, //bottom
    true, //right
    true, //vertical
    true //horizontal
  );

  console.log(valuesToAddToReport);
}
