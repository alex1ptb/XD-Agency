function getXdaRates() {
  //set variable for getScriptProperties
  let scriptProperties = PropertiesService.getScriptProperties();
  //check if properties exsits
  if (scriptProperties.getProperty("xdaRates") == null) {
    console.log(`no properties found. Creating now`)
    //if not create it
    scriptProperties.setProperty(
      "xdaRates",
      JSON.stringify(getCurrentXdaRates())
    );
  }
  //get the data from the properties
  let xdaRates = JSON.parse(scriptProperties.getProperty("xdaRates"));
  console.log(`xda rates set`)
  return xdaRates;
}
