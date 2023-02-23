function newUpdateSortableByServiceAreaReport() {
  console.log("newUpdateSortableByServiceAreaReport");
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = "SortableByServiceAreaReport";
  const rangeName = "ServiceAreaReport";
  const namedRanges = ss.getNamedRanges();
  const namedRangesToInput = namedRanges.filter((namedRange) => {
    if (!namedRange.getName().includes("Deliverable_Template")) {
      namedRange.getName().endsWith("Roles");
    }
  });
  let targetRange = ss.getRangeByName(rangeName);
  //delete all but the last row within the named range
  let targetRangeLastRow = targetRange.getLastRow();
  let startingRow = targetRange.getRow();
  for (let i = targetRangeLastRow; i > startingRow; i--) {
    ss.getSheetByName(sheetName).deleteRow(i);
  }
  console.log("targetRangeLastRow: deleted");
  const valuesToAddToReport = [];

  console.log(`starting forEach loop`);
  namedRangesToInput.forEach((range) => {
    console.log(`range: ${range.getName()}`);
    if (range == null || range == undefined) {
      console.log("range is null or undefined");
    } else if (range !== null && range !== undefined) {
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
          console.log("skipping row" + i);
          return;
        } else {
          //break into xd or freelancer
          if (section === "XD" || section === "Freelancer") {
            console.log(`section: ${section}`);
            let row = rangeValuesInNamedRange[i];
            let jobRole = row[0];
            let employeeName = row[1];
            let budgetedHours = row[4];
            let notes = row[8];
            let rate = row[5];
            let actualHours = row[15];
            let clientCost = row[6];
            let rowData = [];

            rowData.push(sheetName);
            rowData.push(splitName[splitName.length - 3]); // service area category

            rowData.push(
              employeeName,
              jobRole,
              notes,
              budgetedHours,
              clientCost,
              rate,
              actualHours
            ); // employee name
            // rate * actual hours
            rowData.push(rate * actualHours);

            //balance hours = budgeted hours - actual hours
            rowData.push(budgetedHours - actualHours);

            //percent used = actual hours / budgeted hours
            rowData.push(actualHours / budgetedHours);

            //balance cost = budgeted cost - actual cost
            rowData.push(rate * (budgetedHours - actualHours));

            //po number
            rowData.push(row[14]);
            //po number
            valuesToAddToReport.push(rowData);
            console.log(`rowData: ${rowData}`);
            console.log(`valuesToAddToReport: ${valuesToAddToReport}`);
          }
        }
      }
    }
  });

  //add the values to the report
  try {
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
  } catch (e) {
    console.log(e);
  }
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
