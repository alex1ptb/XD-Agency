////////////////////////////////////////////
function getPayRatesProperties() {
  //set variable for getScriptProperties
  let scriptProperties = PropertiesService.getScriptProperties();
  //check if properties exists
  if (scriptProperties.getProperty("PayRates") == null) {
    console.log(`no properties found. Creating now`);
    //if not create it
    scriptProperties.setProperty("PayRates", JSON.stringify(getPayRates()));
  }
  //get the data from the properties
  let payRates = JSON.parse(scriptProperties.getProperty("PayRates"));
  //   console.log(payRates);
  //return the data
  return payRates;
}
////////////////////////////////////////////

////////////////////////////////////////////
function lookUpPayRate(name) {
  if (name === "Choose XD Agent Member" || name === undefined) {
    return 0;
  }
  console.log(`lookUpPayRate: ${name}`);
  //get the data from the properties
  let payRates = getPayRatesProperties();
  //find the payrate by matching the name to the first payrate array value
  let payRate = payRates[0].tableData.filter((payRate) => {
    if (payRate[0] === name) {
      // console.log(`found ${name}`);
      //return the data
      if (payRate[1]) {
        return payRate;
      }
    } else {
      return;
    }
  });
  if (payRate[0] === undefined) {
    return 0;
  } else {
    return payRate[0][1];
  }
}
////////////////////////////////////////////

////////////////////////////////////////////
multiplyPayRate = (payRate, hours) => {
  console.log(`multiplyPayRate: ${payRate} x ${hours}`);
  if (payRate === undefined || hours === undefined) {
    return 0;
  }
  if (payRate) {
    return payRate * hours;
  }
};
////////////////////////////////////////////

////////////////////////////////////////////
//function to add up every named range that includes "SheetName_parameter_Roles"
function getAllRolesForTargetPartition(targetsection, activeSheetNamedRanges) {
  console.log(`getTargetSectionRanges: ${targetsection}`);
  const sections = activeSheetNamedRanges.filter((range) => {
    //create new array filtered to only include named ranges that are in the active sheet
    return range.getName().includes(targetsection);
  });
  //go through and target the ones that end with "_Roles"
  const rolesInSheet = sections.filter((range) => {
    return range.getName().endsWith("_Roles");
  });
  return rolesInSheet;
}
////////////////////////////////////////////

////////////////////////////////////////////
//function to add up every named range that includes "SheetName_parameter_Roles"
function TotalCost(targetsection, activeSheetNamedRanges, ss, sheetName) {
  console.log(`TotalCost function started for: ${targetsection}`);
  let totalPayforSection = [];
  let totalStaffSell = [];
  let total3rdPartyExtendedCost = [];
  let total3rdPartyExtendedCostWithCont = [];
  let totalFreelancePay = [];
  let freelanceHours = [];
  let totalStaffHours = [];

  //get the target section ranges filter them into each array
  getAllRolesForTargetPartition(
    targetsection,
    activeSheetNamedRanges,
    ss
  ).filter((range) => {
    //////////////////////////////////////////
    //for each range get the data
    try {
      activeRowValues = ss.getRangeByName(range.getName()).getValues();
      console.log(`activeRowValues found: ${activeRowValues}`);
    } catch (e) {
      console.log(`error with ${range.getName()} activeRowValues. Error: ${e}`);
      return;
    }

    //////////////////////////////////////////
    //get total freelance hours
    if (range.getName().includes("Freelancer")) {
      console.log(`freelance found`);
      activeRowValues.map((row) => {
        freelanceHours.push(row[8]); // Total Freelance Hours
        totalFreelancePay.push(row[6]); //Total Sell
        totalPayforSection.push(row[9]); // Total Freelance Cost
      });
    } //end if Freelancer
    //////////////////////////////////////////
    //get total third party hours
    if (range.getName().includes("ThirdParty")) {
      activeRowValues.map((row) => {
        totalPayforSection.push(row[11]); // Total Freelance Cost
        total3rdPartyExtendedCost.push(row[7]);
        total3rdPartyExtendedCostWithCont.push(row[9]);
      });
    } //end if Freelancer
    //////////////////////////////////////////
    else {
      //////////////////////////////////////////
      //if XD
      let names = [];
      activeRowValues.map((value) => {
        totalStaffSell.push(value[6]); //Total Sell
        totalStaffHours.push(value[4]); //Total Hours
        names.push(value[1]); //Name
      });
      //////////////////////////////////////////
      //Get Pay Rates by name
      for (i = 0; i <= names.length; i++) {
        let rate = lookUpPayRate(names[i]);
        if (rate == undefined) {
          return;
        } else {
          let pay = multiplyPayRate(rate, totalStaffHours[i]);
          if (pay) {
            totalPayforSection.push(pay);
          }
        } //end if
      } //end for loop
      //////////////////////////////////////////
    } //end of else
  }); //end of filter
  //////////////////////////////////////////

  //////////////////////////////////////////
  //update total pay and hours sections
  ////  XDA
  if (totalStaffSell.length > 0) {
    let sSell = totalStaffSell.reduce((a, b) => {
      return a + b;
    });
    // console.log(`sSell: ${sSell}`);
    // Test_Footer_XD_TotalStaffSell
    ss.getRangeByName(`${sheetName}_Footer_XD_TotalStaffSell`).setValue(sSell);
  }
  if (totalStaffHours.length > 0) {
    let tHours = totalStaffHours.reduce((a, b) => {
      return a + b;
    });
    //SheetName_Footer_XD_TotalStaffHours
    ss.getRangeByName(`${sheetName}_Footer_XD_TotalStaffHours`).setValue(
      tHours
    );
  }
  //// Freelancer
  if (totalFreelancePay.length > 0) {
    let fPay = totalFreelancePay.reduce((a, b) => {
      return a + b;
    });
    ss.getRangeByName(
      `${sheetName}_Footer_Freelancer_TotalFreelanceSell`
    ).setValue(fPay);
    // console.log(`fPay: ${fPay}`);
  }
  if (freelanceHours.length > 0) {
    let fHours = freelanceHours.reduce((a, b) => {
      return a + b;
    });
    // SheetName_Footer_Freelancer_TotalFreelanceHours
    ss.getRangeByName(
      `${sheetName}_Footer_Freelancer_TotalFreelanceHours`
    ).setValue(fHours);
  }
  //// XDA Footer
  //total sell - total pay / total sell = margin
  if (totalStaffSell.length > 0 && totalPayforSection.length > 0) {
    let sMargin = (
      (totalStaffSell.reduce((a, b) => {
        return a + b;
      }) -
        totalPayforSection.reduce((a, b) => {
          return a + b;
        })) /
      totalStaffSell.reduce((a, b) => {
        return a + b;
      })
    ).toFixed(2);
    //SheetName_Footer_XD_TotalStaffMargin
    ss.getRangeByName(`${sheetName}_Footer_XD_TotalStaffMargin`).setValue(
      sMargin
    );
  }

  if (totalFreelancePay.length > 0 && totalPayforSection.length > 0) {
    let fMargin = (
      (totalFreelancePay.reduce((a, b) => {
        return a + b;
      }) -
        totalPayforSection.reduce((a, b) => {
          return a + b;
        })) /
      totalFreelancePay.reduce((a, b) => {
        return a + b;
      })
    ).toFixed(2);
    //SheetName_Footer_Freelancer_TotalFreelanceMargin
    ss.getRangeByName(
      `${sheetName}_Footer_Freelancer_TotalFreelanceMargin`
    ).setValue(fMargin);
  }

  ////3rd Party
  if (total3rdPartyExtendedCost.length > 0) {
    let t3rdPartyExtendedCost = total3rdPartyExtendedCost.reduce((a, b) => {
      return a + b;
    });
    //SheetName_Footer_ThirdParty_ExtendedCostTotal
    ss.getRangeByName(
      `${sheetName}_Footer_ThirdParty_ExtendedCostTotal`
    ).setValue(t3rdPartyExtendedCost);
  }
  if (total3rdPartyExtendedCostWithCont.length > 0) {
    let t3rdPartyExtendedCostWithCont =
      total3rdPartyExtendedCostWithCont.reduce((a, b) => {
        return a + b;
      });
    //SheetName_ThirdParty_CostWithContTotal
    ss.getRangeByName(`${sheetName}_ThirdParty_CostWithContTotal`).setValue(
      t3rdPartyExtendedCostWithCont
    );
  }

  //////////////////////////////////////////

  if (totalPayforSection.length > 0) {
    return (totalPayforSection = totalPayforSection.reduce((a, b) => a + b));
  } else {
    return 0;
  }
} //end of getTargetSectionRanges
////////////////////////////////////////////
