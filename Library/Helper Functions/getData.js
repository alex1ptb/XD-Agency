// Utility function to retrieve headers and data from a sheet
function getSheetData(sheet, startRow = 1) {
  const headers = sheet
    .getRange(startRow, 1, 1, sheet.getLastColumn())
    .getValues()[0];
  const data = sheet
    .getRange(
      startRow + 1,
      1,
      sheet.getLastRow() - startRow,
      sheet.getLastColumn()
    )
    .getValues();
  return { headers, data };
}

/**
 * Converts sheet data into an array of objects with headers as keys.
 * @param {Object} sheet - The Google Sheets object.
 * @param {number} [startRow=1] - The starting row number for the data extraction.
 * @returns {Array<Object>} Array of objects with headers as keys.
 */
function getSheetDataAsObjects(sheet, startRow = 1) {
  const { headers, data } = getSheetData(sheet, startRow);
  return data.map((row) => {
    let rowObject = {};
    headers.forEach((header, index) => {
      rowObject[header] = row[index];
    });
    return rowObject;
  });
}

/**
 * Converts sheet data into an array of objects with headers as keys.
 * @param {Object} sheet - The Google Sheets object.
 * @param {number} [startRow=1] - The starting row number for the data extraction.
 * @returns {Array<Object>} Array of objects with headers as keys.
 */
function getRangeDataAsObjects(rangeName, SS, startRow = 1) {
  const { headers, data } = getDataFromRange(rangeName, SS, startRow);
  return data.map((row) => {
    let rowObject = {};
    headers.forEach((header, index) => {
      rowObject[header] = row[index];
    });
    return rowObject;
  });
}

/**
 * Retrieves data from a specified range in a spreadsheet.
 * @param {string} rangeName - The name of the range to retrieve data from.
 * @param {Spreadsheet} SS - The spreadsheet object to retrieve data from.
 * @returns {Object} An object containing the headers and data from the specified range.
 */
function getDataFromRange(rangeName, SS) {
  let values = SS.getRangeByName(rangeName).getValues();
  // Destructure the data array
  let [headers, ...data] = values;
  return { headers, data };
}
