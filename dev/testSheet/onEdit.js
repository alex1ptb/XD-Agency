//when the sheet is changed, check if cell has dropdown menu, if so, copy the row and paste it below the current row
function onEdit(e) {
  //check if the cell has a dropdown menu
  const sheet = SpreadsheetApp.getActiveSheet();
  const activeRange = e.range;
  const oldValue = e.oldValue;
  const row = activeRange.getRow();
  const col = activeRange.getColumn();

  //if the column is the first column, check if the cell has a dropdown menu
  if (col === 1) {
    //if there is a dropdown menu, copy the row and paste it below the current row
    if (e.range.getDataValidations().length > 0) {
      //make sure the previous display value was "Pick a Job Title"
      if (oldValue === "Pick a Job Title") {
        //get named ranges this cell belongs to
        const namedRanges = getNamedRange(e);
        const namedRangesArray = namedRanges.split(",");
        // console.log(`onEdit: namedRangesArray: ${namedRangesArray}`);
        for (let i = 0; i < namedRangesArray.length; i++) {
          //if the named range has Section in it then ignore it
          if (namedRangesArray[i].includes("Section")) {
            //target 2nd word
            serviceCategory = namedRangesArray[i].split("_")[1];
            // console.log(`onEdit: serviceCategory: ${serviceCategory}`);
            continue;
          } else {
            rangeName = namedRangesArray[i];
          }
          // console.log(`onEdit -- updating rangeName: ${rangeName}`);
          updateNamedRange(rangeName);
          //set the value of the first cell as "Pick a Job Title"
          sheet.getRange(row + 1, 1).setValue("Pick a Job Title");
          //set the value of column 6 to 0
          sheet.getRange(row + 1, 6).setValue(0);
        }
      }
      //get the sale rate for the job
      getSaleRate(e);
      //update reports with relevant info
      //ClientSummaryReport -- Insert from when Role is choosen
      //Title,Category,Name,Role,3rd Party Category, 3rd Party Description/Name, 3rd Party Vendor Name,Notes
      function updateClientSummaryReport(e) {
        updateNamedRange("ClientSummaryReportRange");

        const sheetName = e.range.getSheet().getName();
        const section = serviceCategory;
        const name = e.range
          .getSheet()
          .getRange(e.range.getRow(), 2)
          .getValue();
        const role = e.range.getValue();

        //update the ClientSummaryReport with the new values
        console.log(`updating Title: ${sheetName}`);
        //target first cell of named range
        const targetRange = ss.getRange("ClientSummaryReportRange");
        //update the first column of the last row to sheetname
        targetRange
          .getSheet()
          .getRange(targetRange.getLastRow(), 1)
          .setValue(sheetName);

        //update first column to the sheet name
        // targetRange.getCell(1, 1).setValue(sheetName);
        // const titleRange = targetRange
        //   .getCell(targetRange.getLastRow(), 1)
        //   .setValue(sheetName);

        // titleRange;
      }

      console.log(`updating ClientSummaryReport`);
      updateClientSummaryReport(e);

      //SortableBy3rdPartyReport -- Insert when 3rd party role is choosen
      //SortableByServiceAreaReport -- Insert when Role is Choosen
    }
  }
}
