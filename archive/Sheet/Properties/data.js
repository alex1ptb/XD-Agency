/**
 * @OnlyCurrentDoc
 */

const properties = PropertiesService.getScriptProperties();

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
  properties.setProperty("data", JSON.stringify(data));
}

function getDataProperty() {
  let data = properties.getProperty("data");
  return JSON.parse(data);
}
//////////////////////////////////////////////////////////////////////////////////////////////

///I should make the following be a check for when looking up the data for calculations
//Maybe it will speed up the process
//when deliverable is created, add it to the deliverable property
function addDeliverableToDataProperty(sheetName, categories) {
  if (properties.getProperty("deliverables")) {
    deliverables = JSON.parse(properties.getProperty("deliverables"));
    //if the sheet name doesn't exist, create it
  } else {
    //object deliverables{sheetName: [categories]}
    deliverables = {};
  }
  //if category doesn't exist, create it
  if (!deliverables[sheetName]) {
    deliverables[sheetName] = {};
    categories.forEach(function (category) {
      deliverables[sheetName][category] = category;
      deliverables[sheetName] = categories;
      properties.setProperty("deliverables", JSON.stringify(deliverables));
    });
  }
  return deliverables;
}

//////////////////////////////////////////////////////////////////////////////////////////////
function checkResponse() {
  // /**
  //  * @OnlyCurrentDoc
  let sheetName = "Test";
  let categories = ["Category1", "Category2"];
  //return addDeliverableToDataProperty(sheetName, categories);
  return deleteAllProperties();
}
//////////////////////////////////////////////////////////////////////////////////////////////
//

//Delete All properties
function deleteAllProperties() {
  try {
    const props = PropertiesService.getScriptProperties();
    const keys = props.getKeys();
    keys.forEach(function (key) {
      props.deleteProperty(key);
    });
  } catch (error) {
    console.log(error);
  }
  return "All properties deleted";
}
