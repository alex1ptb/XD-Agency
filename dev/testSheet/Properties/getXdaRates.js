function getXdaRates() {
  //set variable for getScriptProperties
  let scriptProperties = PropertiesService.getScriptProperties();
  //delete properties.xdaRates;
  scriptProperties.deleteProperty("xdaRates");
  //check if properties exsits
  if (scriptProperties.getProperty("xdaRates") == null) {
    console.log(`no properties found. Creating now`);
    //if not create it
    scriptProperties.setProperty(
      "xdaRates",
      JSON.stringify(getCurrentXdaRates())
    );
  }
  //get the data from the properties
  let xdaRates = JSON.parse(scriptProperties.getProperty("xdaRates"));

  //return the data
  return xdaRates;
}
