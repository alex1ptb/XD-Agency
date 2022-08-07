//Function to update the client summary report
// It will take all named ranges within spreadsheet
function newUpdateClientSummaryReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  //get all named ranges in the spreadsheet
  const namedRanges = ss.getNamedRanges();
  //filter out named ranges that have "Deliverable_Template" in them
  const namedRangesToInput = namedRanges.filter((namedRange) =>
    namedRange.getName().endsWith("Roles")
  );
  let targetRange = ss.getRangeByName("ClientSummaryReportRange");
  //delete all but the last row within the named range
  let targetRangeLastRow = targetRange.getLastRow();
  let startingRow = targetRange.getRow();

  for (let i = targetRangeLastRow; i > startingRow; i--) {
    ss.getSheetByName("ClientSummaryReport").deleteRow(i);
  }

  const valuesToAddToReport = [];

  namedRangesToInput.forEach((range) => {
    if (range !== null) {
      targetRange = targetRange;
      // const ss = SpreadsheetApp.getActiveSpreadsheet();
      const name = range.getName();
      // console.log(`name: ${name}`);
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
          if (section === "XD" || section === "Freelancer") {
            let rowData = [];

            rowData.push(sheetName);
            rowData.push(splitName[splitName.length - 3]);
            rowData.push(rangeValuesInNamedRange[i][1]);
            rowData.push(rangeValuesInNamedRange[i][0]);
            rowData.push("");
            rowData.push("");
            rowData.push("");
            rowData.push(rangeValuesInNamedRange[i][8]);
            rowData.push(rangeValuesInNamedRange[i][6]);
            rowData.push("");
            rowData.push("");
            rowData.push("");
            rowData.push(rangeValuesInNamedRange[i][13]);
            rowData.push("");
            rowData.push("");
            rowData.push(rangeValuesInNamedRange[i][15]);
            valuesToAddToReport.push(rowData);
          }
          if (section === "ThirdParty") {
            let rowData = [];

            rowData.push(sheetName);
            rowData.push(splitName[splitName.length - 3]);
            rowData.push(rangeValuesInNamedRange[i][1]);
            rowData.push(rangeValuesInNamedRange[i][0]);
            rowData.push("");
            rowData.push("");
            rowData.push("");
            rowData.push(rangeValuesInNamedRange[i][8]);
            rowData.push(rangeValuesInNamedRange[i][6]);
            rowData.push("");
            rowData.push("");
            rowData.push("");
            rowData.push(rangeValuesInNamedRange[i][13]);
            rowData.push("");
            rowData.push("");
            rowData.push(rangeValuesInNamedRange[i][15]);
            valuesToAddToReport.push(rowData);
          }
        }
      }
    }
  });
  //add the values to the report
  ss.getSheetByName("ClientSummaryReport")
    .getRange(
      targetRange.getRow(),
      targetRange.getColumn(),
      valuesToAddToReport.length,
      valuesToAddToReport[0].length
    )
    .setValues(valuesToAddToReport);
  //update the named to include the new rows
  let newRange = ss.getSheetByName("ClientSummaryReport").getRange(
    targetRange.getRow(), //get first row
    targetRange.getColumn(), //get first column
    valuesToAddToReport.length, //get last row + 1
    valuesToAddToReport[0].length //get last column
  );
  //set the namedRange to the new range
  ss.setNamedRange("ClientSummaryReportRange", newRange);

  //set namedRange to have background of white
  ss.getRangeByName("ClientSummaryReportRange").setBackground("white");
  //set border of namedRange to black
  ss.getRangeByName("ClientSummaryReportRange").setBorder(
    true, //top
    true, //left
    true, //bottom
    true, //right
    true, //vertical
    true //horizontal
  );

  console.log(valuesToAddToReport);
}
