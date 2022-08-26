//Currently this function will return each section values.

/* To do so I will need to go through and get all named ranges with sections in them. 
    Once all sections are gotten, return their values (should be a 2d array).

    Lets see what is returned and go from there

*/

//////////////////////////////////////////////////////////////////////////////////////////////
//Get the values of all named ranges with Roles
function getAllNamedRangesWithRoleValues() {
  //response needs to be an object with the sheetname as the first key, the named range as the second key and the values as the value
  let responses = [];
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.getNamedRanges().forEach(function (namedRange) {
    //ends with Roles
    if (!namedRange.getName().includes("Deliverable_Template")) {
      if (namedRange.getName().endsWith("Roles")) {
        if (!namedRange.getName().includes("Category")) {
          let response = {};
          let sheetName = namedRange.getRange().getSheet().getName();
          //get the sheet name
          response[sheetName] = {};
          response[sheetName][namedRange.getName()] = namedRange
            .getRange()
            .getValues();
          responses.push(response);
        }
      }
    }
  });
  //combine duplicate sheet names into one object with all the values,
  //otherwise there will be more objects with sheet name as the key than there should be.
  let response = {};
  responses.forEach(function (item) {
    for (let key in item) {
      if (response[key]) {
        //if the key already exists, add the values to the existing object
        response[key] = { ...response[key], ...item[key] }; //merge the objects
      } else {
        response[key] = item[key]; //add the object
      }
    }
  });
  console.log(response);
  return response;
}
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
//update the spreadsheet properties with the new values
function updateSpreadsheetDataProperties() {
  let data = getAllNamedRangesWithRoleValues();
  let properties = PropertiesService.getScriptProperties();
  properties.setProperty("data", JSON.stringify(data));
}

function getDataProperty() {
  let properties = PropertiesService.getScriptProperties();
  let data = properties.getProperty("data");
  return JSON.parse(data);
}

//////////////////////////////////////////////////////////////////////////////////////////////
//test function to see if the above function works as expected.
//This function will go into the first object and return the values of the first key.
function testDataResults() {
  let sheetName = "Test";
  let testRole = "Test_Account_XD_Roles";
  let data = getAllNamedRangesWithRoleValues();
  let result = data[sheetName][testRole];
  console.log(result);
}
//////////////////////////////////////////////////////////////////////////////////////////////

function checkResponse() {
  return getAllNamedRangesWithRoleValues();
}
