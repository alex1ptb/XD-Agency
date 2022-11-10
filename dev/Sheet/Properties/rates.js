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

/////////////////////
function getXdaRates(ratesSelected) {
  //set variable for getScriptProperties
  let scriptProperties = PropertiesService.getScriptProperties();
  //delete properties.xdaRates;
  //check if properties exsits
  if (scriptProperties.getProperty("xdaRates") == null) {
    console.log(`no properties found. Creating now`);
    //if not create it
    scriptProperties.setProperty(
      "xdaRates",
      JSON.stringify(getCurrentXdaRates(ratesSelected))
    );
  }
  //get the data from the properties
  let xdaRates = JSON.parse(scriptProperties.getProperty("xdaRates"));

  //return the data
  return xdaRates;
}
/////////////////////

/////////////////////
function getThirdPartyRoles() {
  //set variable for getScriptProperties
  let scriptProperties = PropertiesService.getScriptProperties();
  //delete properties.xdaRates;
  //check if properties exsits
  if (scriptProperties.getProperty("thirdPartyRoles") == null) {
    console.log(`no properties found. Creating now`);
    //if not create it
    scriptProperties.setProperty(
      "thirdPartyRoles",
      JSON.stringify(get3rdPartyCategories())
    );
  }
  //get the data from the properties
  let thirdPartyRoles = JSON.parse(
    scriptProperties.getProperty("thirdPartyRoles")
  );

  //return the data
  return thirdPartyRoles;
}
/////////////////////
