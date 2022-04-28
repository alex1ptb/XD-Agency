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
        for (let i = 0; i < namedRangesArray.length; i++) {
          //if the named range has main in it then ignore it
          if (namedRangesArray[i].includes("Section")) {
            //target 2nd word
            serviceCategory = namedRangesArray[i].split("_")[1];
            continue;
          } else {
            rangeName = namedRangesArray[i];
          }
          console.log(`onChangeReturnRange rangeName: ${rangeName}`);
          updateNamedRange(rangeName);
          //set the value of the first cell as "Pick a Job Title"
          sheet.getRange(row + 1, 1).setValue("Pick a Job Title");
          //set the value of column 6 to 0
          sheet.getRange(row + 1, 6).setValue(0);
        }

        //add the row information to the range ClientSummaryReportRange
        let client = ss.getRangeByName("ClientSummaryReportRange");
        console.log(`client: ${client}`);
        let clientSheet = client.getSheet();
        console.log(`clientSheet: ${clientSheet}`);
        let clientRangeLastRow = client.getLastRow();
        console.log(`clientRangeLastRow: ${clientRangeLastRow}`);
        //insert row after the last row
        clientSheet.insertRowAfter(clientRangeLastRow);
        // clientRange.insertRowAfter(clientRangeLastRow);
        updateNamedRange("ClientSummaryReportRange");
        //update the last row of the named range ClientSummaryReportRange to include the title of the sheet into the first cell
        let clientRange = ss.getRangeByName("ClientSummaryReportRange");
        clientSheet
          .getRange(clientRange.getLastRow(), 1)
          .setValue(sheet.getName());
        clientSheet
          .getRange(clientRange.getLastRow(), 2)

          .setValue(serviceCategory);
      }
      //insert value of 2nd cell to be the category of the job

      //get the sale rate for the job
      getSaleRate(e);
    }
  }
}
