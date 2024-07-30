function updateDropdownsTest() {
  //   updateDropdowns("Rate_Card_Dropdown", "Rate Card", 0);

  // Good to go on bottom

  updateDropdowns(
    "Deliverable_Xda_Staff_Fees_Template",
    "Default Service Area",
    0
  );
}

function updateDropdowns(namedRangeName, databaseHeader, columnOffset) {
  // Grab the dropdowns from the database
  const databaseSS = SpreadsheetApp.openById(DATABASE_SS_ID);
  let { headers, data } = getSheetData(
    databaseSS.getSheetByName("Dropdowns"),
    2
  );

  // Get the list of values under the specified header
  let dropdownValues = data.map((row) => row[headers.indexOf(databaseHeader)]);

  // Filter out empty values
  dropdownValues = dropdownValues.filter((value) => value);

  console.log(`${databaseHeader} values: ${dropdownValues}`);

  // Get named ranges from the active spreadsheet
  const namedRanges = SpreadsheetApp.getActiveSpreadsheet().getNamedRanges();

  // Filter for the specified named range
  const namedRange = namedRanges.filter(
    (range) => range.getName() === namedRangeName
  );

  if (namedRange.length === 0) {
    throw new Error(`Named range "${namedRangeName}" not found.`);
  }

  // Get the range of the named range
  const range = namedRange[0].getRange();
  // Get the number of rows in the actual range (excluding header row)
  const numRows = range.getNumRows() - 1;

  // Check if the range is a single cell
  const isSingleCell = range.getNumRows() === 1 && range.getNumColumns() === 1;

  // Update the dropdowns under the specified column offset
  const dropdownRange = isSingleCell
    ? range
    : range.offset(1, columnOffset, numRows, 1); // Offset to exclude header row if not a single cell

  dropdownRange.clearContent();
  dropdownRange.clearDataValidations();

  const dropdownRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(dropdownValues, true)
    .build();

  dropdownRange.setDataValidation(dropdownRule);

  // Set the default value to the first value in the list
  if (!isSingleCell) {
    const dropdownValuesArray = dropdownRange.getValues();
    for (let i = 0; i < dropdownValuesArray.length; i++) {
      dropdownValuesArray[i][0] = dropdownValues[0]; // Set the default value
    }
    dropdownRange.setValues(dropdownValuesArray);
  } else {
    dropdownRange.setValue(dropdownValues[0]); // Set the default value for single cell
  }
}
