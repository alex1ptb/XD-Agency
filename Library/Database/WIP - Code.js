/*
When creating a new spreadsheet, 
We need to grab the information from the database that will be stored in the properties of the spreadsheet itself


Areas:
    - Dropdowns
    - Employee Rates
    - Staff Roles
    - Budget Rate Cards
    - XDA Live Staff Roles
    - Rate Card Information

Each one of these areas will need to be stored within the properties of the spreadsheet

*/

function grabAndStorePropertiesDataFromDatabase() {
  const databaseSS = SpreadsheetApp.openById(DATABASE_SS_ID);

  try {
    const dropdowns = getSheetDataAsObjects(
      databaseSS.getSheetByName("Dropdowns"),
      2
    );
    const employeeRates = getSheetDataAsObjects(
      databaseSS.getSheetByName("Budget Rate Card"),
      2
    );
    const staffRoles = getSheetDataAsObjects(
      databaseSS.getSheetByName("Staff Roles"),
      3
    );
    const budgetRateCards = getSheetDataAsObjects(
      databaseSS.getSheetByName("Rate Card Information"),
      2
    );
    const xdaLiveStaffRoles = getSheetDataAsObjects(
      databaseSS.getSheetByName("2024_XDA Live Staff Roles"),
      1
    );
    const rateCardInformation = getSheetDataAsObjects(
      databaseSS.getSheetByName("Rate Card Information"),
      2
    );

    //   Set the properties of the spreadsheet
    const properties = PropertiesService.getDocumentProperties();
    properties.setProperty("dropdowns", JSON.stringify(dropdowns));
    properties.setProperty("employeeRates", JSON.stringify(employeeRates));
    properties.setProperty("staffRoles", JSON.stringify(staffRoles));
    properties.setProperty("budgetRateCards", JSON.stringify(budgetRateCards));
    properties.setProperty(
      "xdaLiveStaffRoles",
      JSON.stringify(xdaLiveStaffRoles)
    );
    properties.setProperty(
      "rateCardInformation",
      JSON.stringify(rateCardInformation)
    );

    console.log(`properties set...`);

    return;
  } catch (e) {
    console.log(`Error grabbing properties data: ${e.message}`);
    throw e;
  }
}
