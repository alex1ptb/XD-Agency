//when the sheet is changed, check if cell has dropdown menu, if so, copy the row and paste it below the current row
function onEdit(e) {
  //get named ranges this cell belongs to
  const namedRanges = getNamedRange(e);
  const namedRangesArray = namedRanges.split(",");
  console.log(`onEdit: namedRangesArray: ${namedRangesArray}`);
  const sheet = SpreadsheetApp.getActiveSheet();
  const sheetName = e.range.getSheet().getName();
  const activeRange = e.range;
  const oldValue = e.oldValue;
  const row = activeRange.getRow();
  const col = activeRange.getColumn();
  //first column in range is jobTitle
  const jobTitle = activeRange.getSheet().getRange(row, 1).getValue();
  const name = activeRange.getSheet().getRange(row, 2).getValue();

  for (let i = 0; i < namedRangesArray.length; i++) {
    //if the named range has Section in it then ignore it
    if (namedRangesArray[i].includes("Section")) {
      //target 2nd word
      serviceCategory = namedRangesArray[i].split("_")[1];
      console.log(`onEdit: serviceCategory: ${serviceCategory}`);
      partition = namedRangesArray[i].split("_")[2];
      console.log(`onEdit: partition: ${partition}`);
      continue;
    } else {
      rangeName = namedRangesArray[i];
      console.log(`onEdit: rangeName: ${rangeName}`);
    }
  }

  //if the column is the first column, check if the cell has a dropdown menu
  if (col === 1) {
    //if there is a dropdown menu, copy the row and paste it below the current row
    //check if the cell has a dropdown menu
    if (e.range.getDataValidations().length > 0) {
      //make sure the previous display value was "Pick a Job Title"
      if (oldValue === "Pick a Job Title") {
        // console.log(`onEdit -- updating rangeName: ${rangeName}`);
        updateNamedRange(rangeName);
        //set the value of the first cell as "Pick a Job Title"
        sheet.getRange(row + 1, 1).setValue("Pick a Job Title");
        //set the value of column 6 to 0
        sheet.getRange(row + 1, 6).setValue(0);
      }
    }
  }
  //get the sale rate for the job
  getSaleRate(e);

  //update reports with relevant info
  //ClientSummaryReport -- Insert from when Role is choosen
  //Title,Category,Name,Role,3rd Party Category, 3rd Party Description/Name, 3rd Party Vendor Name,Notes

  function updateClientSummaryReport(e) {
    //if value is "Pick a Job Title" then return
    if (e.value === "Pick a Job Title") {
      return;
    }

    //check report range to see if info already exists
    const reportRange = ss.getRangeByName("ClientSummaryReportRange");
    const reportRangeValues = reportRange.getValues();

    //check the first column and see if it matches sheetName
    for (let i = 0; i < reportRangeValues.length; i++) {
      if (reportRangeValues[i][0] === sheetName) {
        //if partition is "XD" or "Freelancer" then check column 2 for match of serviceCategory
        if (partition === "XD" || partition === "Freelancer") {
          console.log(`partition is ${partition}`);
          if (reportRangeValues[i][1] === serviceCategory) {
            console.log(
              `serviceCategory is ${serviceCategory} and a match has been found`
            );
            //if match, check column 4 for match of jobTitle
            if (reportRangeValues[i][3] === jobTitle) {
              console.log(`jobTitle is ${jobTitle} and a match has been found`);
              if (reportRangeValues[i][3] === oldValue) {
                console.log(
                  `updateClientSummaryReport: oldValue: ${oldValue} matches jobTitle: ${jobTitle} and `
                );
                ss.getRangeByName("ClientSummaryReportRange")
                  .offset(i, 4, 1, 1)
                  .setValue(e.value);
                return;
              }
              //if match, check column C for match of oldValue
              else if (reportRangeValues[i][2] === oldValue) {
                console.log(
                  `updateClientSummaryReport: reportRangeValues[i][2]: ${reportRangeValues[i][2]} matches oldValue: ${oldValue}  `
                );
                //if match, update the row with new value
                ss.getRangeByName("ClientSummaryReportRange")
                  .offset(i, 2, 1, 1)
                  .setValue(e.value);
                console.log(`updateClientSummaryReport: updated row: ${i + 1}`);
                console.log(
                  `updateClientSummaryReport: updated value: ${e.value}`
                );
                return;
              } //end if match old value column 2
            } //end if jobTitle match
          } //end if serviceCategory matches column 1
        } //end if partition is XD or Freelancer
        //if partition is "ThirdParty" then check column 5 for match of serviceCategory
        if (partition === "ThirdParty") {
          if (reportRangeValues[i][5] === serviceCategory) {
            //if match, check column 4 for match of jobTitle
            if (reportRangeValues[i][6] === oldValue) {
              console.log(`updating column 6`);
              ss.getRangeByName("ClientSummaryReportRange")
                .offset(i, 6, 1, 1)
                .setValue(e.value);
              return;
              //if match, check column C for match of oldValue
              // if (reportRangeValues[i][6] === oldValue) {
              //   //if match, update the row with new value
              //   ss.getRangeByName("ClientSummaryReportRange")
              //     .offset(i, 6, 1, 1)
              //     .setValue(e.value);
              //   // reportRange.getRange(i + 1, 3).setValue(e.value);
              //   //end of function
            } else if (reportRangeValues[i][7] === oldValue) {
              console.log(`updating column 7`);
              //if match, update the row with new value
              ss.getRangeByName("ClientSummaryReportRange")
                .offset(i, 7, 1, 1)
                .setValue(e.value);
              // reportRange.getRange(i + 1, 3).setValue(e.value);
              //end of function
              return;
            } //end of if value matches column 7
          } //end of if value matches column 5
        } //end of if value matches column 5
      } //end of if value matches column 1
    } //end for loop
    const targetRange = ss.getRange("ClientSummaryReportRange");
    updateNamedRange("ClientSummaryReportRange");
    //clear the last row
    ss.getRangeByName("ClientSummaryReportRange")
      .offset(targetRange.getLastRow(), 0, 1, 7)
      .clearContent();

    const section = serviceCategory;
    const name = e.range.getSheet().getRange(e.range.getRow(), 2).getValue();
    const role = e.range.getValue();

    //update the ClientSummaryReport with the new values
    console.log(`updating Title: ${sheetName}`);
    //target first cell of named range

    //check if the row already exists

    function updateColumn(column, value) {
      targetRange
        .getSheet()
        .getRange(targetRange.getLastRow(), column)
        .setValue(value);
    } //end updateColumn

    if (partition != "ThirdParty") {
      updateColumn(1, sheetName);
      updateColumn(2, section);
      updateColumn(3, name);
      updateColumn(4, role);
    } else {
      //title
      updateColumn(1, sheetName);
      //role()
      updateColumn(5, section);
      //category
      updateColumn(6, role);
      //3td party description or name
      updateColumn(7, name);
      //3rd party vendor name this is the 3rd column of the e.row
      updateColumn(
        7,
        e.range.getSheet().getRange(e.range.getRow(), 3).getValue()
      );
    } //end if else

    //SortableBy3rdPartyReport -- Insert when 3rd party role is choosen
    //SortableByServiceAreaReport -- Insert when Role is Choosen
    console.log(`updating ClientSummaryReport`);
    //end updateClientSummaryReport function
  } // end updateClientSummaryReport

  updateClientSummaryReport(e);

  function updateSortableByServiceAreaReport(e) {
    //check if partition is "XD" or "Freelancer"
    // partition = namedRangesArray[i].split("_")[2];
    if (partition === "XD" || partition === "Freelancer") {
      //get ServiceAreaReport range
      // ServiceAreaReport
      const serviceRange = ss.getRangeByName("ServiceAreaReport");
      const serviceValues = serviceRange.getValues();
      for (let i = 0; i < serviceValues.length; i++) {
        //check if sheet name is in the SortableByServiceAreaReport range "ServiceAreaReport"
        if (serviceValues[i][0] === sheetName) {
          //match has been found now check if service area is the same
          if (serviceValues[i][1] === serviceCategory) {
            //match found, now check if role is the same
            if (serviceValues[i][3] === jobTitle) {
              //match found, now check if name is the same
              if (serviceValues[i][2] === oldValue) {
                //match found, now update the value
                ss.getRangeByName("ServiceAreaReport")
                  .offset(i, 3, 1, 1)
                  .setValue(e.value);
                return;
              } //end if match
            } //end if jobTitle matches
          } //end if matches service category
        } //end if matches sheet name
      } // end of for loop

      //if we have made it this far then the row does not exist so we need to add it
      updateNamedRange("ServiceAreaReport");
      //now a new row has been added so we need to put the new values in the new row
      let targetRange = ss.getRange("ServiceAreaReport");
      //sheet name
      targetRange
        .getSheet()
        .getRange(targetRange.getLastRow(), 1)
        .setValue(sheetName);
      //service area
      targetRange
        .getSheet()
        .getRange(targetRange.getLastRow(), 2)
        .setValue(serviceCategory);
      //name
      targetRange
        .getSheet()
        .getRange(targetRange.getLastRow(), 3)
        .setValue(name);
      //role
      targetRange
        .getSheet()
        .getRange(targetRange.getLastRow(), 4)
        .setValue(jobTitle);
      // ss.getRangeByName("ServiceAreaReport")
      //   .offset(targetRange.getLastRow(), 4)
      //   .setValue(jobTitle);
    } //end of check if partition is XD or Freelancer
  } //end updateSortableByServiceAreaReport
  updateSortableByServiceAreaReport(e);
} //end onEdit function
