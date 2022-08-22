/**
 * @OnlyCurrentDoc
 */

//create a function that hides the actual information inside of the properties service of the sheet.
function hideActualInformation() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = SpreadsheetApp.getActiveSheet();
  let sheetName = sheet.getName();
  // Deliverable_Template_Header_Information
  let range = ss.getRangeByName(`${sheetName}_Header_Information`);
  let rangeContents = range.getFormulas();
  let properties = PropertiesService.getScriptProperties();
  properties.setProperty(sheetName, `${JSON.stringify(rangeContents)}`);
  // console.log(info);
  range.clearContent();
}

function showHiddenInformation() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = SpreadsheetApp.getActiveSheet();
  let sheetName = sheet.getName();
  // Deliverable_Template_Header_Information
  let range = ss.getRangeByName(`${sheetName}_Header_Information`);
  let properties = PropertiesService.getScriptProperties();
  let targetInformation = properties.getProperty(sheetName);
  try {
    range.setValues(JSON.parse(targetInformation));
    properties.deleteProperty(sheetName);
  } catch (error) {
    console.log(`error with showing hidden information: ${error}`);
  }
}

function DoNotShowInTotalButton() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getActiveSheet();
  //Copy the display values shown and paste over the formulas that are currently providing the display values
  copyAndPaste("AA20:AA838", "AA20:AA838");
  //copy display values from range AD20:AD217 to the range E20:E217
  copyAndPaste("AD20:AD217", "E20:E217");
  //copy display values from range AE20:AE217 to the range F20:F217
  copyAndPaste("AD236:AD839", "F236:F839");
  //Set "D8" value to on
  sheet.getRange("D8").setValue(" < ON");
  //Clear contents of "D6"
  sheet.getRange("D6").clearContent();
}
