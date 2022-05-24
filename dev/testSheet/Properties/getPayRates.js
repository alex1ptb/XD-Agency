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

function lookUpPayRate(name) {
  // if (name === "Choose XD Agent Memeber")
  if (name !== "Choose XD Agent Memeber" && name !== "") {
    // console.log(`looking up ${name}`);
    //get the data from the properties
    let payRates = getPayRatesProperties();
    // console.log(`payRates: ${JSON.stringify(payRates)}`);
    //find the payrate by matching the name to the first payrate array value
    let payRate = payRates[0].tableData.filter((payRate) => {
      if (payRate[0] === name) {
        // console.log(`found ${name}`);
        //return the data
        return payRate;
      } else {
        return;
      }
    });
    if (payRate) {
      return payRate[0][1];
    }
  }
}

multiplyPayRate = (payRate, hours) => {
  if (payRate) {
    // console.log(`multiplyPayRate: ${payRate} * ${hours}`);
    return payRate * hours;
  }
};
