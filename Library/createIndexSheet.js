/**
 * Creates an index sheet listing all sheet names and their hyperlinks.
 *
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} SS - The spreadsheet object.
 */
function createIndexSheet() {
  var indexSheetName = "Index";

  // Check if the index sheet exists
  var indexSheet = SS.getSheetByName(indexSheetName);

  if (!indexSheet) {
    // If not, create one
    indexSheet = SS.insertSheet(indexSheetName, 0);
  } else {
    // If it exists, clear its contents
    indexSheet.clear();
    // SS.moveActiveSheet(0);
  }

  // Create headers
  let headers = ["Tab Name", "Hyperlink"];
  indexSheet.getRange(1, 1, 1, 2).setValues([headers]);

  var sheets = SS.getSheets();
  var data = [];

  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    var sheetName = sheet.getName();
    var sheetLink =
      '=HYPERLINK("#gid=' + sheet.getSheetId() + '","' + sheetName + '")';
    data.push([sheetName, sheetLink]);
  }

  // Populate the index sheet
  if (data.length > 0) {
    indexSheet.getRange(2, 1, data.length, 2).setValues(data);
  }
}

/**
 * Updates the sheet order based on the new position of the rows in the "Index" sheet.
 *
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} sApp - The spreadsheet object.
 */
function updateTabsBasedOnIndexRowOrder() {
  if (!sApp) {
    throw new Error("Spreadsheet object (sApp) is not passed");
  }

  const indexSheetName = "Index";

  // Check if the index sheet exists
  const indexSheet = SS.getSheetByName(indexSheetName);
  if (!indexSheet) {
    throw new Error("Index sheet does not exist");
  }

  // Get the current index data excluding headers
  const lastRow = indexSheet.getLastRow();
  let indexData = [];
  if (lastRow > 1) {
    indexData = indexSheet.getRange(2, 1, lastRow - 1, 2).getValues(); // Assuming Hyperlink column is the second column
  }

  // Extract the desired new sheet order from the index sheet based on the 'gid' in the Hyperlink
  const newSheetOrder = indexData
    .map((row, rowIndex) => {
      const cell = indexSheet.getRange(rowIndex + 2, 2).getRichTextValue();
      if (cell) {
        const hyperlink = cell.getLinkUrl();
        if (hyperlink) {
          const gidMatch = hyperlink.match(/gid=(\d+)/);
          return gidMatch ? parseInt(gidMatch[1], 10) : null;
        }
      }
      return null;
    })
    .filter((gid) => gid !== null);
  Logger.log("New sheet order GIDs: " + newSheetOrder.join(", "));

  // Get all sheets and their GIDs
  const allSheets = SS.getSheets();
  const allSheetInfo = allSheets.map((sheet) => ({
    name: sheet.getName(),
    gid: sheet.getSheetId(),
  }));

  Logger.log(
    "All sheet GIDs: " + allSheetInfo.map((info) => info.gid).join(", ")
  );

  let found = false;

  // Reorder sheets based on the new order specified in the index sheet
  newSheetOrder.forEach((gid, index) => {
    const sheetInfo = allSheetInfo.find((info) => info.gid === gid);
    if (sheetInfo) {
      console.warn("FOUND A MATCH");
      const sheet = SS.getSheetByName(sheetInfo.name);
      if (sheet) {
        SS.setActiveSheet(sheet);
        SS.moveActiveSheet(index + 1);
      }
    }
  });
  // set the active sheet to the first sheet
  SS.setActiveSheet(allSheets[0]);
  if (found) {
    Logger.log("Sheet order has been updated based on the new row order.");
  }
}
