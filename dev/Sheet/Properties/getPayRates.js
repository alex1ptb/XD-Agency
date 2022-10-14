////////////////////////////////////////////
//This function returns the emplyee_info table data for the target partition (category)
function getPayRatesProperties() {
  let scriptProperties = PropertiesService.getScriptProperties();
  if (scriptProperties.getProperty("PayRates") == null) {
    scriptProperties.setProperty("PayRates", JSON.stringify(getPayRates()));
  }
  let payRates = JSON.parse(scriptProperties.getProperty("PayRates"));
  return payRates;
}
////////////////////////////////////////////

////////////////////////////////////////////
function lookUpPayRate(name) {
  let start, end;
  start = new Date();

  if (
    name === "Choose XD Agent Member" ||
    name === undefined ||
    name === "Insert Freelance Name"
  ) {
    // console.log(`lookUpPayRate error: ${name}`);
    return 0;
  }
  // console.log(`lookUpPayRate: ${name}`);
  //get the data from the properties
  let payRates = getPayRatesProperties();
  //find the payrate by matching the name to the first payrate array value
  let payRate = payRates[0].tableData.filter((payRate) => {
    if (payRate[0] === name) {
      if (payRate[1]) {
        // console.log(`${name} has a payrate of ${payRate[1]}`);
        return payRate;
      }
    } else {
      return;
    }
  });
  if (payRate[0] === undefined) {
    end = new Date();
    // console.log(
    //   `lookUpPayRate took ${end - start} milliseconds and payrate was undefined`
    // );
    return 0;
  } else {
    end = new Date();
    // console.log(`lookUpPayRate took ${end - start} milliseconds`);
    return payRate[0][1];
  }
}
////////////////////////////////////////////

////////////////////////////////////////////
multiplyPayRate = (payRate, hours) => {
  if (hours == undefined) {
    return 0;
  }
  try {
    return payRate * hours;
  } catch (error) {
    console.log(`multiply Pay Rate error: ${error}`);
  }
};
////////////////////////////////////////////

////////////////////////////////////////////
//function to get all target_Section_Roles. For instance all the roles in the "XD" section. Actually, the more I think about this one, I may need to remove it as it is doing a similar process elsewhere, will need to look into it.
function getAllRolesForTargetPartition(targetsection, activeSheetNamedRanges) {
  const sections = activeSheetNamedRanges.filter((range) => {
    //create new array filtered to only include named ranges that are in the active sheet
    return range.getName().includes(`${targetsection}_Roles`);
  });
  return sections;
}
////////////////////////////////////////////

//new TotalCost as the old one failed horribly
//This will go through the active spreadsheet and get each role and total up the cost for each role
function getTotalCost(targetsection) {
  //targetsection is either "XD","Freelancer", or "ThirdParty"
  console.log(`getTotalCost function for ${targetsection}`);
  let start, end;
  start = new Date();
  let totalCost = 0;
  let activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let sheetName = activeSheet.getName();
  let activeSheetNamedRanges = activeSheet.getNamedRanges();
  //get all the roles for the target section and filter out the template category
  let roles = getAllRolesForTargetPartition(
    targetsection,
    activeSheetNamedRanges
  ).filter((role) => {
    if (!role.getName().includes("Category")) {
      return role;
    }
  }); //filter out the category roles
  let totalForXD = [];
  //check to see if there are any roles in the target section
  roles.forEach((role) => {
    totalStaffSell = [];
    totalStaffHours = [];
    names = [];
    // console.log(`role: ${role.getName()}`);
    //get role values
    let roleValues = role.getRange().getValues();
    // console.log(`roleValues: ${roleValues}`);
    roleValues.map((value) => {
      if (
        value[1] == "Choose XD Agent Member" ||
        value[1] == undefined ||
        value[1] == "Insert Freelance Name"
      ) {
        return;
      }
      totalStaffSell.push(value[6]); //Total Sell
      totalStaffHours.push(value[4]); //Total Hours
      names.push(value[1]); //Name
      rate = lookUpPayRate(value[1]);
      //pay is cost of employee * hours
      pay = multiplyPayRate(rate, value[4]);
      totalForXD.push(pay);
    });
    // console.log(`totalStaffSell: ${totalStaffSell}`);
    // console.log(`totalStaffHours: ${totalStaffHours}`);
    // console.log(`names: ${names}`);
    // console.log(`rate: ${rate}`);
    // console.log(`pay: ${pay}`);
    // console.log(`totalForXD: ${totalForXD}`);
  });
  // console.log(`totalForXD: ${totalForXD}`);
  //update header with xd total cost
  //reduce the array to a single value
  totalCostForHeaderXD = totalForXD.reduce((a, b) => a + b, 0);
  ss.getRangeByName(`${sheetName}_Header_XD_StaffCost`).setValue(
    totalCostForHeaderXD
  );
  let totalSell = ss
    .getRangeByName(`${sheetName}_Footer_XD_TotalStaffSell`)
    .getValue();

  let Margin = ((totalSell - totalForXD) / totalSell).toFixed(2);

  //SheetName_Footer_XD_TotalStaffMargin
  ss.getRangeByName(`${sheetName}_Footer_XD_TotalStaffMargin`)
    .setValue(Margin)
    .setNumberFormat("0.00%");
  end = new Date();
  console.log(`totalSell: ${totalSell}`);
  console.log(`totalforXD: ${totalForXD}`);
  console.log(`getTotalCost took ${end - start} milliseconds`);
  return totalForXD;
}

////////////////////////////////////////////
//function to add up every named range that includes "SheetName_parameter_Roles"
/////Currently not used, it did update areas I now need to work on though
function TotalCost(targetsection, activeSheetNamedRanges, ss, sheetName) {
  console.log(`OLD TotalCost function started for: ${targetsection}`);

  let allRoles = getAllRolesForTargetPartition(
    targetsection,
    activeSheetNamedRanges,
    ss
  );

  let filtration = [];
  let filtered = allRoles.filter((range) => {
    // console.log(`filtered: ${range.getName()}`);
    try {
      activeRowValues = ss.getRangeByName(range.getName()).getValues();
      // console.log(`activeRowValues: ${activeRowValues}`);
      activeRowValues.forEach((row) => {
        if (row[0] !== "Pick a Job Title") {
          if (
            [row[1]] !== "Choose XD Agent Member" ||
            [row[1]] !== "Insert Freelance Name" ||
            [row[1]] !== ""
          ) {
            filtration.push(row);
          }
        }
      });
      return filtration;
    } catch (error) {
      console.log(`TotalCost error for: ${error}`);
    }
  });
  // console.log(`filtration: ${filtration}`);
  let totalPayforSection = [];
  let totalStaffSell = [];
  let total3rdPartyExtendedCost = [];
  let total3rdPartyExtendedCostWithCont = [];
  let totalFreelancePay = [];
  let freelanceHours = [];
  let totalStaffHours = [];
  try {
    allRoles.forEach((range) => {
      let activeRowValues = ss.getRangeByName(range.getName()).getValues();
      let names = [];
      if (targetsection === "Freelancer") {
        if (range.getName().includes("Freelancer_Roles")) {
          activeRowValues.map((row) => {
            freelanceHours.push(row[8]); // Total Freelance Hours
            totalFreelancePay.push(row[6]); //Total Sell
            totalPayforSection.push(row[9]); // Total Freelance Cost
          });
          // console.log(
          //   `pushed the following: \n freelanceHours: ${freelanceHours} \n totalFreelancePay: ${totalFreelancePay} \n totalPayforSection: ${totalPayforSection}`
          // );
        }
      } else if (targetsection === "XD") {
        //get XD Roles
        if (range.getName().includes("XD_Roles")) {
          // console.log(`XD_Roles: ${range.getName()}`);
          // console.log(`inside target role area with issue`);
          // console.log(`${targetsection}_Roles: ${activeRowValues.length}`);
          activeRowValues.map((value) => {
            totalStaffSell.push(value[6]); //Total Sell
            totalStaffHours.push(value[4]); //Total Hours
            names.push(value[1]); //Name
          });
          // console.log(
          //   `pushed the following: \n totalStaffSell: ${totalStaffSell} \n totalStaffHours: ${totalStaffHours} \n names: ${names}`
          // );

          //Get Pay Rates by name
          for (i = 0; i <= names.length; i++) {
            if (
              names[i] == "Choose XD Agent Member" ||
              names[i] == "Insert Freelance Name"
            ) {
              totalPayforSection.push(0);
              return;
            }
            let rate = lookUpPayRate(names[i]);
            if (rate == undefined) {
              // console.log(`rate is undefined for ${names[i]}`);
              rate = 0;
            }
            // console.log(
            //   `info before multiply: \n name:${names[i]} \n rate: ${rate} \n Total Staff hours: ${totalStaffHours[i]} \n itteration: ${i}`
            // );

            let pay = multiplyPayRate(rate, totalStaffHours[i]);
            // console.log(
            //   `pay for ${names[i]} is ${pay} with the current hours of ${totalStaffHours[i]}`
            // );
            totalPayforSection.push(pay);
          }
        }
        //get total third party hours
        if (range.getName().includes("ThirdParty_Roles")) {
          activeRowValues.map((row) => {
            totalPayforSection.push(row[11]); // Total Freelance Cost
            total3rdPartyExtendedCost.push(row[7]);
            total3rdPartyExtendedCostWithCont.push(row[9]);
          });
          console.log(
            `pushed the following: \n total3rdPartyExtendedCost: ${total3rdPartyExtendedCost} \n total3rdPartyExtendedCostWithCont: ${total3rdPartyExtendedCostWithCont} \n totalPayforSection: ${totalPayforSection}`
          );
        }
        // console.log(`totalPayforSection: ${totalPayforSection}`);
      }
    });
  } catch (err) {
    console.log(`TotalCost error: ${err}`);
  }
  //////////////////////////////////////////

  //////////////////////////////////////////
  //// XDA Footer
  //total sell - total pay / total sell = margin
  if (totalStaffSell.length > 0 && totalPayforSection.length > 0) {
    let tStaffSell = totalStaffSell.reduce((a, b) => {
      return a + b;
    });
    let tPayforSection = totalPayforSection.reduce((a, b) => {
      return a + b;
    });
    let sMargin = ((tStaffSell - tPayforSection) / tStaffSell).toFixed(2);
    try {
      SheetName_Footer_XD_TotalStaffMargin;
      ss.getRangeByName(`${sheetName}_Footer_XD_TotalStaffMargin`)
        .setValue(sMargin)
        .setNumberFormat("0.00%");
    } catch (err) {
      console.log(`Footer_XD_TotalStaffMargin error: ${err}`);
    }
  }
  //////////////////////////////////////////

  // ////3rd Party
  // if (total3rdPartyExtendedCost.length > 0) {
  //   let t3rdPartyExtendedCost = total3rdPartyExtendedCost.reduce((a, b) => {
  //     return a + b;
  //   });
  //   //SheetName_Footer_ThirdParty_ExtendedCostTotal
  //   ss.getRangeByName(
  //     `${sheetName}_Footer_ThirdParty_ExtendedCostTotal`
  //   ).setValue(t3rdPartyExtendedCost);
  // }
  // if (total3rdPartyExtendedCostWithCont.length > 0) {
  //   let t3rdPartyExtendedCostWithCont =
  //     total3rdPartyExtendedCostWithCont.reduce((a, b) => {
  //       return a + b;
  //     });
  //   //SheetName_ThirdParty_CostWithContTotal
  //   ss.getRangeByName(`${sheetName}_ThirdParty_CostWithContTotal`).setValue(
  //     t3rdPartyExtendedCostWithCont
  //   );
  // }
  // //////////////////////////////////////

  //////////////////////////////////////////
  if (totalPayforSection.length > 0) {
    console.log(`totalPayforSection: ${totalPayforSection}`);
    console.log(`end of Total Cost function`);
    return (totalPayforSection = totalPayforSection.reduce((a, b) => a + b));
  } else {
    console.log(`end of Total Cost function`);
    return 0;
  }
} //end of TotalCost
////////////////////////////////////////////
