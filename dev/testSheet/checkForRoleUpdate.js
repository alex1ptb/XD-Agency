function checkForRoleUpdate(category, partition) {
  console.log(`checkForRoleUpdate`);
  let sheet = SpreadsheetApp.getActiveSheet();
  //get the range by name of the ${sheetName}_${category}_Main_Category}
  let range = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(
    `${sheet.getName()}_${category}_${partition}_Section`
  );

  if (range == null) {
    range = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(
      `${sheet.getName()}_Category_${partition}_Section`
    );
  }

  let rates = "";

  if (partition == "XD") {
    rates = getXdaRates();
  }
  if (partition == "ThirdParty") {
    rates = getThirdPartyRoles();
  }
  //go through rates and find the tableId that matches the displayValue then get the data from that table
  let tableData = rates.filter((table) => {
    if (table.tableId == null) {
      return;
    }
    //get display value of first cell of the range
    let displayValue = sheet
      .getRange(range.getRow(), range.getColumn())
      .getDisplayValue();
    //if the display value matches the tableId then return the tableData
    if (table.tableId == displayValue) {
      console.log(`table found that matches displayValue`);
      return table.tableData;
    } else {
      return null;
    }
  });
  if (tableData[0] == null) {
    return "No category role table found at target location";
  }

  if (tableData != null) {
    //put tableData as a dropdown list in the sheet below the last row
    let targetRow = range.getRow() + 2;
    //target the first cell in the range
    //set data validation to the cell
    let roles = [];
    //go through and pull out all job titles and push to array
    for (let i = 0; i < tableData[0].tableData.length; i++) {
      console.log(
        `tableData[0].tableData[i].jobTitle: ${tableData[0].tableData[i].jobTitle}`
      );
      roles.push(tableData[0].tableData[i][0]);
    }
    //create and set the validation
    let buildValidation = SpreadsheetApp.newDataValidation()
      .requireValueInList(roles)
      .build();
    let cell = sheet.getRange(targetRow, 1);
    cell.setDataValidation(buildValidation);

    if (partition == "XD") {
      cell = sheet.getRange(targetRow + 3, 1);
      cell.setDataValidation(buildValidation);
      console.log(
        `partition is xd,\n targetRow: ${targetRow} \n sheet: ${sheet}`
      );
      EmployeeDataValidation(targetRow, sheet);
    }
  }
}
