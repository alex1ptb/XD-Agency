//update the properties of the spreadsheet with the latest data from the BigQuery table
function updateAll(projectId) {
  addTriggers()
  const namedRangeSelectedRate =
    SpreadsheetApp.getActiveSpreadsheet().getRangeByName("rate_card_section");
  //delete properties.xdaRates;
  SpreadsheetApp.getActiveSpreadsheet().toast("Updating...");

  PropertiesService.getScriptProperties().setProperty(
    "xdaRates",
    JSON.stringify(
      getCurrentXdaRates(projectId, namedRangeSelectedRate.getValue())
    )
  );
  //delete properties.thirdPartyRoles;
  PropertiesService.getScriptProperties().setProperty(
    "thirdPartyRoles",
    JSON.stringify(get3rdPartyCategories())
  );
  PropertiesService.getScriptProperties().setProperty(
    "payRates",
    JSON.stringify(getPayRates())
  );
}
