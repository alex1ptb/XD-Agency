/////THINKING
/*
    Lets see. 
    first, we get the xdaRates tableIds 
    filter through the xdaRates tableIds,
    go through column A and if the tableId matches any row in the range of Column A then remove it from the array 
    I could probably use this in multiple areas so may want to make more modular
*/

////Go through tableIDs and remove already choosen tableIDs found on current sheet and return the remaining tableIDs
function filterAlreadyChoosenCategories(rates) {
  if (rates == "XDA") {
    xdaRates = getXdaRates();
  } else if (rates == "3rdParty") {
    xdaRates = getThirdPartyRoles();
  }
  let sheet = SpreadsheetApp.getActiveSheet();
  let lastRow = sheet.getLastRow();
  if (lastRow == 0) {
    lastRow = 1;
  }
  // let xdaRates = getXdaRates();
  let tableIds = [];
  //go through xdaRates and get the tableIds and push to tableIds array
  //I do this itterative because the next section gave me issues
  //with only returning the first match
  for (let i = 1; i <= xdaRates.length; i++) {
    //get the tableId
    let tableId = xdaRates[i - 1].tableId;
    //push to tableIds array
    tableIds.push(tableId);
  }
  //get column A values as an array
  let columnA = sheet.getRange(1, 1, lastRow, 1).getValues();
  //if the value in column A matches any value in tableIds array then remove it from tableIds array
  for (let j = 0; j < tableIds.length; j++) {
    for (let i = 0; i < columnA.length; i++) {
      if (columnA[i] == tableIds[j]) {
        //remove the value from tableIds array
        tableIds.splice(j, 1);
      }
    }
  }
  if (tableIds.length == 0) return "no matches";
  return tableIds;
}

///////FUTURE WORK
/*
    This will check the tables from xdaRates. --variable xdaRates
    it will check the current sheet and see if any values from column A match the tableId from xdaRates. it will push all matched tables to an array --variable matchedTable
    */
