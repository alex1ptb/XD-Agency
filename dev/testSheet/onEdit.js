//when the sheet is changed, check if cell has dropdown menu, if so, copy the row and paste it below the current row
function onEdit(e) {
  removeDeadReferences();
  // console.log(`e: ${JSON.stringify(e)}`);
  if (!isNaN(e.value)) {
    console.log(`value is a number`);
    return;
  }
  // console.log(`onEdit: ${e.value} -- value`);
  //get all named ranges this cell belongs to
  activeSheetNamedRanges = () =>
    SpreadsheetApp.getActiveSpreadsheet()
      .getNamedRanges()
      .filter((range) => range.getName().startsWith(sheet.getName()));
  const eNamedRangesArray = getNamedRange(e).split(",");
  const sheet = SpreadsheetApp.getActiveSheet();
  const sheetName = e.range.getSheet().getName();
  const activeRange = e.range;
  const oldValue = e.oldValue;
  const row = activeRange.getRow();
  const col = activeRange.getColumn();
  //first column in range is jobTitle
  const jobTitle = activeRange.getSheet().getRange(row, 1).getValue();
  //second column is always names of the person for the job
  let name = activeRange.getSheet().getRange(row, 2).getValue();
  if (name == null || name == undefined) {
    name = "";
  }

  ////////////////////////////////////////////
  let XDAStaffCost = TotalCost("XD");
  console.log(`XDAStaffCost: ${XDAStaffCost}`);
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  //creating serviceCateogry and partition arrays
  for (let i = 0; i < eNamedRangesArray.length; i++) {
    //if the named range has Section in it then ignore it
    if (eNamedRangesArray[i].includes("Section")) {
      //target 2nd word
      serviceCategory = eNamedRangesArray[i].split("_")[1];
      // console.log(`onEdit: serviceCategory: ${serviceCategory}`);
      partition = eNamedRangesArray[i].split("_")[2];
      // console.log(`onEdit: partition: ${partition}`);
      continue;
    } else {
      rangeName = eNamedRangesArray[i];
      // console.log(`onEdit: rangeName: ${rangeName}`);
    }
  }
  ////////////////////////////////////////////

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
        return;
      }
      //get the sale rate for the job
      console.log(`getting sale rate for job: ${jobTitle}`);
      getSaleRate(e);
      return;
    }
  }

  function updateClientSummaryReport() {
    console.log(`start updateClientSummaryReport function`);
    //if value is "Pick a Job Title" then return
    if (e.value === "Pick a Job Title") {
      return;
    }
    //if value is a number then return

    const reportRange = ss.getRangeByName("ClientSummaryReportRange");
    const reportRangeValues = reportRange.getValues();

    for (let i = 0; i < reportRangeValues.length; i++) {
      //if partition is "XD" or "Freelancer" then check column 2 for match of serviceCategory
      if (partition === "XD" || partition === "Freelancer") {
        // console.log(`partition is XD or Freelancer`);
        if (reportRangeValues[i][0] === sheetName) {
          if (reportRangeValues[i][1] === serviceCategory) {
            if (reportRangeValues[i][3] === oldValue) {
              ss.getRangeByName("ClientSummaryReportRange")
                .offset(i, 3, 1, 1)
                .setValue(e.value);
              return;
            }
            if (reportRangeValues[i][2] === oldValue) {
              ss.getRangeByName("ClientSummaryReportRange")
                .offset(i, 2, 1, 1)
                .setValue(e.value);
              return;
            } //end if match old value column 2
            // } //end if jobTitle match
          } //end if serviceCategory matches column 1
        } //end if partition is XD or Freelancer
      }
      /////////////////////
      //if partition is "ThirdParty" then check column 5 for match of serviceCategory
      if (partition === "ThirdParty") {
        let vendorName = activeRange.getSheet().getRange(row, 3).getValue();
        if (reportRangeValues[i][4] === serviceCategory) {
          // console.log(`service category: ${serviceCategory} found in column 4`);
          //if match, check column 4 for match of jobTitle
          if (reportRangeValues[i][5] === oldValue) {
            console.log(`jobTitle: ${jobTitle} found in column 5`);
            if (reportRangeValues[i][6] === vendorName) {
              ss.getRangeByName("ClientSummaryReportRange")
                .offset(i, 5, 1, 1)
                .setValue(e.value);
              return;
            }
          }
        } //end of if value matches column 5
      } //end of if value matches column 5
    } //end of if value matches column 1
    // } //end for loop
    // } //end checkRangeForMatch function
    // checkRangeForMatch(e);
    const targetRange = ss.getRange("ClientSummaryReportRange");
    updateNamedRange("ClientSummaryReportRange");
    //clear the last row
    ss.getRangeByName("ClientSummaryReportRange")
      .offset(targetRange.getLastRow(), 0, 1, 7)
      .clearContent();

    const section = serviceCategory;
    // let name = e.range.getSheet().getRange(e.range.getRow(), 2).getValue();
    const role = e.range.getValue();

    //update the ClientSummaryReport with the new values
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
    console.log(`end updating ClientSummaryReport`);
    //end updateClientSummaryReport function
  } // end updateClientSummaryReport

  updateClientSummaryReport(e);

  function updateSortableByServiceAreaReport(e) {
    console.log(`start updateSortableByServiceAreaReport function`);
    //check if partition is "XD" or "Freelancer"
    // partition = namedRangesArray[i].split("_")[2];
    if (partition === "XD" || partition === "Freelancer") {
      // console.log(`partition: ${partition}`);
      //get ServiceAreaReport range
      const serviceRange = ss.getRangeByName("ServiceAreaReport");
      const serviceValues = serviceRange.getValues();
      // console.log(`service values: ${serviceValues}`);
      for (let i = 0; i < serviceValues.length; i++) {
        //check if sheet name is in the SortableByServiceAreaReport range "ServiceAreaReport"
        if (serviceValues[i][0] === sheetName) {
          //match has been found now check if service area is the same
          if (serviceValues[i][1] === serviceCategory) {
            if (serviceValues[i][3] === oldValue) {
              // console.log(`jobTitle: ${jobTitle} matched`);
              if (serviceValues[i][2] === name) {
                // console.log(
                // `Updating Category: ${serviceCategory} for: ${name}`
                // );
                ss.getRangeByName("ServiceAreaReport")
                  .offset(i, 3, 1, 1)
                  .setValue(e.value);
                return;
              }
            }
            //match found, now check if name is the same
            if (serviceValues[i][2] === oldValue) {
              // console.log(`changing name: ${oldValue} to ${e.value}`);
              //match found, now update the value
              ss.getRangeByName("ServiceAreaReport")
                .offset(i, 2, 1, 1)
                .setValue(e.value);
              return;
            } //end if match
            // } //end if jobTitle matches
          } //end if matches service category
        } //end if matches sheet name
      } // end of for loop if the partition is "XD" or "Freelancer"

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

  //update SortableBy3rdPartyReport
  function updateSortableBy3rdPartyReport(e) {
    if (partition !== "ThirdParty") {
      return;
    }
    console.log(`start updateSortableBy3rdPartyReport function`);
    const serviceRange = ss.getRangeByName("SortableByThirdPartyReportRange");
    const serviceValues = serviceRange.getValues();
    // console.log(`service values: ${serviceValues}`);
    for (let i = 0; i < serviceValues.length; i++) {
      //check if sheet name is in the SortableByServiceAreaReport range "ServiceAreaReport"
      if (serviceValues[i][0] === sheetName) {
        // console.log(`sheet name matched`);
        //match has been found now check if service area is the same
        if (serviceValues[i][1] === serviceCategory) {
          if (serviceValues[i][2] === oldValue) {
            console.log(`jobTitle: ${jobTitle} matched`);
            if (serviceValues[i][2] === name) {
              // console.log(`Updating Category: ${serviceCategory} for: ${name}`);
              ss.getRangeByName("ServiceAreaReport")
                .offset(i, 3, 1, 1)
                .setValue(e.value);
              return;
            }
          }
        }
      } //end if matches sheet name
    } // end of for loop if the partition is "XD" or "Freelancer"
    // console.log(`no match found`);
    updateNamedRange("SortableByThirdPartyReportRange");
    //now a new row has been added so we need to put the new values in the new row
    let targetRange = ss.getRange("SortableByThirdPartyReportRange");
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
      .setValue(jobTitle);
    //role
    targetRange.getSheet().getRange(targetRange.getLastRow(), 4).setValue(name);
  }
  updateSortableBy3rdPartyReport(e);
} //end onEdit function
