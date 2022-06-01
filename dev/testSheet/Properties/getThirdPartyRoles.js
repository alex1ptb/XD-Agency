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
