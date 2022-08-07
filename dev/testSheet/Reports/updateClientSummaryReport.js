// updateClientSummaryReport(
//   e,
//   partition,
//   sheetName,
//  serviceCategory,
//  jobTitle,
//   oldValue,
//   activeRange
// );

////////////////////////////////////////////

function updateClientSummaryReport(
  e,
  partition,
  sheetName,
  serviceCategory,
  jobTitle,
  oldValue,
  activeRange
) {
  console.log(`start updateClientSummaryReport function`);

  const targetRange = ss.getRange("ClientSummaryReportRange");
  const section = serviceCategory;
  const currentSheet = e.range.getSheet();
  let name = currentSheet.getRange(e.range.getRow(), 2).getValue();
  const role = currentSheet.getRange(e.range.getRow(), 1).getValue();
  // const row = e.range.getSheet().getRange(e.range.getRow());
  // console.log(`row: ${row}`);
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
      //The following checks if the old value existed and overwrites it with the new value
      if (reportRangeValues[i][0] === sheetName) {
        // console.log(`sheetName: ${sheetName}`);
        if (reportRangeValues[i][1] === serviceCategory) {
          // console.log(`found match for serviceCategory: ${serviceCategory}`);
          if (reportRangeValues[i][3] === oldValue) {
            if (reportRangeValues[i][2] === name) {
              console.log(`found match for oldValue at 3: ${oldValue}`);
              ss.getRangeByName("ClientSummaryReportRange")
                .offset(i, 3, 1, 1)
                .setValue(e.value);
              return;
            }
          } else if (reportRangeValues[i][2] === oldValue) {
            if (reportRangeValues[i][3] === role) {
              console.log(`found match for oldValue at 2: ${oldValue}`);
              ss.getRangeByName("ClientSummaryReportRange")
                .offset(i, 2, 1, 1)
                .setValue(e.value);
              return;
            }
          } else {
          } //end if match old value column 2
        } //end if serviceCategory matches column 1
      } //end if partition is XD or Freelancer
      console.log("no match found, creating new row");
    }
    /////////////////////
    //if partition is "ThirdParty" then check column 5 for match of serviceCategory
    if (partition === "ThirdParty") {
      let vendorName = activeRange
        .getSheet()
        .getRange(e.range.getRow(), 3)
        .getValue();
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
  updateNamedRange("ClientSummaryReportRange");
  //clear the last row
  ss.getRangeByName("ClientSummaryReportRange")
    .offset(targetRange.getLastRow(), 0, 1, 7)
    .clearContent();

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
  } else if (partition === "ThirdParty") {
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
////////////////////////////////////////////
