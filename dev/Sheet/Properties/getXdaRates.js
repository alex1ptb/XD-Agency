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
