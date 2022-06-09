////////////////////////////////////////////
//
function updateSortableByServiceAreaReport(
  e,
  sheetName,
  partition,
  serviceCategory,
  name,
  jobTitle,
  oldValue
) {
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
    targetRange.getSheet().getRange(targetRange.getLastRow(), 3).setValue(name);
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
////////////////////////////////////////////
