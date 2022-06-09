////////////////////////////////////////////
//update SortableBy3rdPartyReport
function updateSortableBy3rdPartyReport(
  e,
  partition,
  sheetName,
  serviceCategory,
  name,
  jobTitle,
  oldValue
) {
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
////////////////////////////////////////////
