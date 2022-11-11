/**
 * @OnlyCurrentDoc
 */
//create a function that hides the actual information inside of the properties service of the sheet.

//create function that takes: rangeName, {column, order} where column and order can have multiple values

function ResetSortRange(sortOptions) {
  //get named ranges from the sheet
  let namedRanges = sheet.getNamedRanges();
  let range = ss.getRangeByName(namedRanges[0].getName());
  if (sortOptions == null) {
    range.sort({ column: 1, ascending: true });
  } else {
    range.sort(sortOptions);
  }
}

function SortClientSummaryReport() {
  let range = ss.getRangeByName("ClientSummaryReportRange");
  range.sort([
    { column: 1, ascending: true },
    { column: 2, ascending: true },
  ]);
}

function SortByServiceAreaDeliverable() {
  let range = ss.getRangeByName("ServiceAreaReport");
  range.sort([
    { column: 1, ascending: true },
    { column: 2, ascending: true },
    { column: 4, ascending: true },
  ]);
}

function SortByServiceAreaName() {
  let range = ss.getRangeByName("ServiceAreaReport");
  range.sort([{ column: 4, ascending: true }]);
}

function SortByServiceAreaRole() {
  let range = ss.getRangeByName("ServiceAreaReport");
  range.sort([{ column: 5, ascending: true }]);
}

function SortByServiceAreaServiceArea() {
  let range = ss.getRangeByName("ServiceAreaReport");
  range.sort([{ column: 3, ascending: true }]);
}

function SortBy3rdPartyCategory() {
  //Sort by column C Ascending
  let range = ss.getRangeByName("ThirdPartyReport");
  range.sort([{ column: 3, ascending: true }]);
}

function SortBy3rdPartyDeliverable() {
  //Sort by column A Ascending >> Sort by Column B Ascending >> Sort by Column E Ascending
  let range = ss.getRangeByName("ThirdPartyReport");
  range.sort([
    { column: 1, ascending: true },
    { column: 2, ascending: true },
    { column: 5, ascending: true },
  ]);
}

function SortBy3rdPartyDescription1() {
  //Sort by column D Ascending
  let range = ss.getRangeByName("ThirdPartyReport");
  range.sort([{ column: 3, ascending: true }]);
}

function SortBy3rdPartyDescription2() {
  //Sort by column E Ascending
  let range = ss.getRangeByName("ThirdPartyReport");
  range.sort([{ column: 4, ascending: true }]);
}

function SortBy3rdPartyVendorName() {
  //Sort by column F Ascending
  let range = ss.getRangeByName("ThirdPartyReport");
  range.sort([{ column: 5, ascending: true }]);
}

// ********   UPDATED HIDE and SHOW INFORMATION *//
function hideActualInformation(ss) {
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
// ********* END  HIDE and SHOW INFORMATION ********* //

/* ********   PROPOSAL */

function copyAndPaste(copyRange, pasteRange) {
  //get the range and copy to new range. But only get the display values and not the formula values
  let copyRangeValues = sheet.getRange(copyRange).getDisplayValues();
  sheet.getRange(pasteRange).setValues(copyRangeValues);
}

function DoNotShowInTotalsProposal() {
  //target sheet: Proposal
  let sheet = ss.getSheetByName("Proposal");
  //copy range AA25:AA842
  //paste to itself. copying the display values
  copyAndPaste("AA25:AA842", "AA25:AA842");
  // copy range AD25:AD222 >> paste range E25:E222
  copyAndPaste("AD25:AD222", "E25:E222");
  // copy range AD241:AD842 >> paste range F241:F842
  copyAndPaste("AD241:AD842", "F241:F842");
  // Range("D13").Select >> ActiveCell.FormulaR1C1 = "< ON"
  sheet.getRange("D13").setValue("< ON");
  // Range("D11").Select >> Selection.ClearContents
  sheet.getRange("D11").clearContent();
}

function ShowInTotalsProposal() {
  //'
  //' ShowInTotalsProposal Macro
  //'
  //target sheet: Proposal
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Proposal");
  //copy range AA25:AA222 >> paste range E25:E222
  copyAndPaste("AA25:AA222", "E25:E222");
  //copy range AA241:AA842 >> paste range F241:F842
  copyAndPaste("AA241:AA842", "F241:F842");
  //copy range AB25:AB842 >> paste range AA25:AA842
  //copy the formula back over from AB range to AA range
  sheet.getRange("AB20:AB838").copyTo(sheet.getRange("AA20:AA838"));
  //select D13 and clear contents
  sheet.getRange("D13").clearContent();
  //Select D11 and put "< ON" in the cell
  sheet.getRange("D11").setValue("< ON");
}
// ********* END PROPOSAL

/* ********   NetSuit */

function sortByColumn(column, order, range) {
  //column is the column number to sort by
  let targetRange = targetSheet.getRange(range);
  targetRange.sort({ column, order });
}

function ResetForNetSuiteData() {
  //column,order,range,sheet
  sortByColumn(1, { ascending: true }, "A18:T11235", "ForNetSuiteData");
}

function SortForNetSuiteData() {
  //column,order,range,sheet
  //sort by column T descending
  sortByColumn(20, { ascending: false }, "A18:T11235", "ForNetSuiteData");
}
// ********* END NetSuit
