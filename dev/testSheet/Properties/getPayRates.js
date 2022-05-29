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
    return payRate[0][1];
  }
}
////////////////////////////////////////////

////////////////////////////////////////////
multiplyPayRate = (payRate, hours) => {
  if (payRate === undefined || hours === undefined) {
    console.log(`payRate or hours is undefined`);
    return 0;
  }
  if (payRate) {
    console.log(`multiplyPayRate: ${payRate} * ${hours}`);
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
  return rolesInSheet;
}
////////////////////////////////////////////

////////////////////////////////////////////
//function to add up every named range that includes "SheetName_parameter_Roles"
function TotalCost(targetsection) {
  let totalPayforSection = [];
  getTargetSectionRanges(targetsection).filter((range) => {
    let values = SpreadsheetApp.getActive()
      .getRangeByName(range.getName())
      .getValues();
    //If it is Freelancer then target the 10th column to push to totalPayForSection array
    if (range.getName().includes("Freelancer")) {
      values.forEach((row) => {
        totalPayforSection.push(row[9]);
      });
    } else {
      //if XD
      let hourPerRow = values.map((value) => value[4]);
      let names = values.map((value) => value[1]);
      for (i = 0; i <= names.length; i++) {
        let rate = lookUpPayRate(names[i]);
        if (rate == undefined) {
          return;
        } else {
          let pay = multiplyPayRate(rate, hourPerRow[i]);
          if (pay) {
            totalPayforSection.push(pay);
          }
        }
      }
    }
  });
  if (totalPayforSection.length > 0) {
    return (totalPayforSection = totalPayforSection.reduce((a, b) => a + b));
  } else {
    return 0;
  }
} //end of getTargetSectionRanges
////////////////////////////////////////////
