////////////////////////////////////////////
function getPayRatesProperties() {
  // console.log("getPayRatesProperties");
  //set variable for getScriptProperties
  let scriptProperties = PropertiesService.getScriptProperties();
  //delete properties.xdaRates;
  //check if properties exsits
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
  // console.log(`looking up ${name}`);
  //get the data from the properties
  let payRates = getPayRatesProperties();
  // console.log(`payRates: ${JSON.stringify(payRates)}`);
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
    console.log(`payRate found: ${JSON.stringify(payRate)}`);
    console.log(`payRate: ${payRate[0][1]}`);
    return payRate[0][1];
  }
}
////////////////////////////////////////////

////////////////////////////////////////////
multiplyPayRate = (payRate, hours) => {
  if (payRate === undefined || hours === undefined) {
    // console.log(`payRate or hours is undefined`);
    return 0;
  }
  if (payRate) {
    // console.log(`multiplyPayRate: ${payRate} * ${hours}`);
    return payRate * hours;
  }
};
////////////////////////////////////////////

////////////////////////////////////////////
//function to add up every named range that includes "SheetName_parameter_Roles"
function getTargetSectionRanges(targetsection) {
  const sections = activeSheetNamedRanges().filter((range) => {
    //create new array filtered to only include named ranges that are in the active sheet
    return range.getName().includes(targetsection);
  });
  //go through and target the ones that end with "_Roles"
  const rolesInSheet = sections.filter((range) => {
    return range.getName().endsWith("_Roles");
  });
  // console.log(`rolesInSheet: ${JSON.stringify(rolesInSheet)}`);
  return rolesInSheet;
}
////////////////////////////////////////////

////////////////////////////////////////////
//function to add up every named range that includes "SheetName_parameter_Roles"
function TotalCost(targetsection) {
  const spreadSheetName = SpreadsheetApp.getActiveSheet().getName();
  let totalPayforSection = [];
  let totalStaffSell = [];
  let totalStaffCost = [];
  let totalFreelancePay = [];
  let freelanceHours = [];
  let totalStaffHours = [];

  //get the target section ranges
  getTargetSectionRanges(targetsection).filter((range) => {
    //////////////////////////////////////////
    try {
      values = SpreadsheetApp.getActive()
        .getRangeByName(range.getName())
        .getValues();
    } catch (e) {
      console.log(`error with ${range.getName()} values: ${e}`);
      return;
    }
    //////////////////////////////////////////
    //get total freelance hours
    if (range.getName().includes("Freelancer")) {
      values.map((row) => {
        freelanceHours.push(row[8]); // Total Freelance Hours
        totalFreelancePay.push(row[6]); //Total Sell
        totalPayforSection.push(row[9]); // Total Freelance Cost
      });
      //////////////////////////////////////////
    } //end if Freelancer
    else {
      //////////////////////////////////////////
      //if XD
      let names = [];
      values.map((value) => {
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
            let margin = (
              (totalStaffSell[i] - pay) /
              totalStaffSell[i]
            ).toFixed(2);
            //update range with margin at row[7]
            SpreadsheetApp.getActive()
              .getRangeByName(range.getName())
              //target the row
              .offset(i, 7, 1, 1)
              .setValue(margin);
            console.log(`margin: ${margin}`);
            totalPayforSection.push(pay);
          }
        } //end if
        console.log(`totalStaffSell: ${JSON.stringify(totalStaffSell)}\n
      totalStaffHours: ${JSON.stringify(totalStaffHours)}\n
      names: ${JSON.stringify(names)}\n
      totalPayforSection: ${JSON.stringify(totalPayforSection)}\n
      `);
      } //end for loop
      //////////////////////////////////////////
    } //end of else
  }); //end of filter
  //////////////////////////////////////////

  //////////////////////////////////////////
  //update total pay and hours sections
  // console.log(`totalStaffSell: ${JSON.stringify(totalStaffSell)}`);
  if (totalStaffSell.length > 0) {
    let sSell = totalStaffSell.reduce((a, b) => {
      return a + b;
    });
    // console.log(`sSell: ${sSell}`);
    // Test_Footer_XD_TotalStaffSell
    SpreadsheetApp.getActive()
      .getRangeByName(`${spreadSheetName}_Footer_XD_TotalStaffSell`)
      .setValue(sSell);
  }
  // console.log(`totalFreelancePay: ${JSON.stringify(totalFreelancePay)}`);
  if (totalFreelancePay.length > 0) {
    let fPay = totalFreelancePay.reduce((a, b) => {
      return a + b;
    });
    SpreadsheetApp.getActive()
      .getRangeByName(`${spreadSheetName}_Footer_Freelancer_TotalFreelanceSell`)
      .setValue(fPay);
    // console.log(`fPay: ${fPay}`);
  }
  if (freelanceHours.length > 0) {
    let fHours = freelanceHours.reduce((a, b) => {
      return a + b;
    });
    // SheetName_Footer_Freelancer_TotalFreelanceHours
    SpreadsheetApp.getActive()
      .getRangeByName(
        `${spreadSheetName}_Footer_Freelancer_TotalFreelanceHours`
      )
      .setValue(fHours);
  }
  if (totalStaffHours.length > 0) {
    console.log(`totalStaffHours: ${JSON.stringify(totalStaffHours)}`);
    let tHours = totalStaffHours.reduce((a, b) => {
      return a + b;
    });
    //SheetName_Footer_XD_TotalStaffHours
    SpreadsheetApp.getActive()
      .getRangeByName(`${spreadSheetName}_Footer_XD_TotalStaffHours`)
      .setValue(tHours);
  }

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
    SpreadsheetApp.getActive()
      .getRangeByName(`${spreadSheetName}_Footer_XD_TotalStaffMargin`)
      .setValue(sMargin);
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
    SpreadsheetApp.getActive()
      .getRangeByName(
        `${spreadSheetName}_Footer_Freelancer_TotalFreelanceMargin`
      )
      .setValue(fMargin);
  }

  //////////////////////////////////////////

  if (totalPayforSection.length > 0) {
    return (totalPayforSection = totalPayforSection.reduce((a, b) => a + b));
  } else {
    return 0;
  }
} //end of getTargetSectionRanges
////////////////////////////////////////////
