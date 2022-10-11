/**
 * @OnlyCurrentDoc
 */

//lets create the function that makes the object above happen
function getAllNamedRangesOfSpreadsheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  let response = {};
  sheets.forEach(function (sheet) {
    const sheetName = sheet.getName();
    const namedRanges = sheet.getNamedRanges();
    response[sheetName] = {};
    namedRanges.forEach(function (namedRange) {
      //name of the named range
      let name = namedRange.getName();
      let category = name.split("_")[1];
      let target = name.split("_")[name.split("_").length - 1];
      let role = name.split("_")[name.split("_").length - 2];
      //if category doesn't exist, create it
      if (!response[sheetName][category]) {
        response[sheetName][category] = {};
      }
      //if the role doesn't exist inside the category, create it
      if (!response[sheetName][category][role]) {
        response[sheetName][category][role] = {};
      }
      //if the target doesn't exist inside the role, create it
      if (!response[sheetName][category][role][target]) {
        response[sheetName][category][role][target] = {};
      }
      //range values
      try {
        let values = namedRange.getRange().getValues();
        response[sheetName][category][role][target] = values;
      } catch (error) {
        console.log(error);
      }
    });
  });
  return response;
}

////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
//update the spreadsheet properties with the new values
function updateDataPropertieswithAllNamedRanges() {
  let data = getAllNamedRangesOfSpreadsheet();
  let properties = PropertiesService.getScriptProperties();
  properties.setProperty("data", JSON.stringify(data));
}

function getDataProperty() {
  let properties = PropertiesService.getScriptProperties();
  let data = properties.getProperty("data");
  return JSON.parse(data);
}
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
function checkResponse() {
  // /**
  //  * @OnlyCurrentDoc
  //  */
  //get data property
  let data = getDataProperty();
}
//////////////////////////////////////////////////////////////////////////////////////////////
