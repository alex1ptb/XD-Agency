/**
 * @OnlyCurrentDoc
 */

const ss = SpreadsheetApp.getActiveSpreadsheet();
const projectId = "xd-agency";
const projectID = "xd-agency";

//////////////////////////////////////
function copyAndPaste(copyRange, pasteRange) {
  let sheet = ss.getActiveSheet();
  //get the range and copy to new range. But only get the display values and not the formula values
  let copyRangeValues = sheet.getRange(copyRange).getDisplayValues();
  sheet.getRange(pasteRange).setValues(copyRangeValues);
}
//////////////////////////////////////

//////////////////////////////////////
function sortByColumn(column, order, range) {
  //column is the column number to sort by
  let targetSheet = ss.getActiveSheet();
  let targetRange = targetSheet.getRange(range);
  targetRange.sort({ column, order });
}
//////////////////////////////////////

//////////////////////////////////////
function ResetClientSummaryReport() {
  //Name of the sheet: Client Summary Report
  let sheet = ss.getSheetByName("ClientSummaryReport");
  let range = sheet.getRange("A7:R11225");
  //check if range already sorted
  range.sort({ column: 1, ascending: true });
}
//////////////////////////////////////

//////////////////////////////////////
function SortClientSummaryReport() {
  //sort by column A in ascending order
  //sort on column B in ascending order

  let range = ss.getRangeByName("ClientSummaryReportRange");
  range.sort([
    { column: 1, ascending: true },
    { column: 2, ascending: true },
  ]);
}
//////////////////////////////////////

//////////////////////////////////////
//           FIX ME                //
function DoNotShowInTotalsProposal() {
  //target sheet: Proposal
  let sheet = ss.getSheetByName("Proposal");
  //copy range AA25:AA842
  //paste to itself. copying the display values
  copyAndPaste("AA25:AA842", "AA25:AA842");
  copyAndPaste("AD25:AD222", "E25:E222");
  copyAndPaste("AD241:AD842", "F241:F842");
  //     Range("D13").Select
  //     ActiveCell.FormulaR1C1 = "< ON"
  sheet.getRange("D13").setValue("< ON");
  //     Range("D11").Select
  //     Selection.ClearContents
  sheet.getRange("D11").clearContent();
}
//////////////////////////////////////

//////////////////////////////////////
function ShowInTotalsProposal() {
  //target sheet: Proposal
  let sheet = ss.getSheetByName("Proposal");
  copyAndPaste("AA25:AA222", "E25:E222");
  copyAndPaste("AA241:AA842", "F241:F842");
  //copy the formula back over from AB range to AA range
  sheet.getRange("AB20:AB838").copyTo(sheet.getRange("AA20:AA838"));
  //select D13 and clear contents
  sheet.getRange("D13").clearContent();
  //Select D11 and put "< ON" in the cell
  sheet.getRange("D11").setValue("< ON");
}
//////////////////////////////////////

//////////////////////////////////////
function ResetForNetSuiteData() {
  //column,order,range,sheet
  sortByColumn(1, { ascending: true }, "A18:T11235", "ForNetSuiteData");
}
//////////////////////////////////////

//////////////////////////////////////
function SortForNetSuiteData() {
  //sort by column T descending
  sortByColumn(20, { ascending: false }, "A18:T11235", "ForNetSuiteData");
}
//////////////////////////////////////

//////////////////////////////////////
function ResetSortableByServiceArea() {
  sortByColumn(
    1,
    { ascending: true },
    "A8:P2387",
    "SortableByServiceAreaReport"
  );
}
//////////////////////////////////////

//////////////////////////////////////
function SortByServiceAreaDeliverable() {
  let sheet = ss.getSheetByName("SortableByServiceAreaReport");
  let range = sheet.getRange("A7:P2387");
  range.sort([
    { column: 16, ascending: false },
    { column: 1, ascending: true },
    { column: 2, ascending: true },
    { column: 4, ascending: true },
  ]);
}
//////////////////////////////////////

//////////////////////////////////////
function SortByServiceAreaName() {
  let sheet = ss.getSheetByName("SortableByServiceAreaReport");
  let range = sheet.getRange("A8:P2387");
  range.sort([
    {
      column: 16,
      ascending: false,
    },
    { column: 4, ascending: true },
  ]);
}
//////////////////////////////////////

//////////////////////////////////////
function SortByServiceAreaRole() {
  let sheet = ss.getSheetByName("SortableByServiceAreaReport");
  let range = sheet.getRange("A8:P2387");
  range.sort([
    { column: 16, ascending: false },
    { column: 5, ascending: true },
  ]);
}
//////////////////////////////////////

//////////////////////////////////////
function SortByServiceAreaServiceArea() {
  let sheet = ss.getSheetByName("SortableByServiceAreaReport");
  let range = sheet.getRange("A8:P2387");
  range.sort([
    { column: 16, ascending: false },
    { column: 3, ascending: true },
  ]);
}
//////////////////////////////////////

//////////////////////////////////////
function Reset3rdPartySortableReport() {
  let range = ss.getRangeByName("ThirdPartyReport");
  range.sort([{ column: 1, ascending: true }]);
}
//////////////////////////////////////

//////////////////////////////////////
function SortBy3rdPartyCategory() {
  let range = ss.getRangeByName("ThirdPartyReport");
  range.sort([
    {
      column: 3,
      ascending: true,
    },
  ]);
}
//////////////////////////////////////

//////////////////////////////////////
function SortBy3rdPartyDeliverable() {
  //Sort by column R Descending
  //Sort by column A Ascending
  //Sort by Column B Ascending
  //Sort by Column E Ascending
  let range = ss.getRangeByName("ThirdPartyReport");
  range.sort([
    {
      column: 1,
      ascending: true,
    },
    {
      column: 2,
      ascending: true,
    },
    {
      column: 5,
      ascending: true,
    },
  ]);
}
//////////////////////////////////////

//////////////////////////////////////
function SortBy3rdPartyDescription1() {
  //Sort by column R Descending
  //Sort by column D Ascending
  let range = ss.getRangeByName("ThirdPartyReport");
  range.sort([
    {
      column: 3,
      ascending: true,
    },
  ]);
}
//////////////////////////////////////

//////////////////////////////////////
function SortBy3rdPartyDescription2() {
  //Sort by column R Descending
  //Sort by column E Ascending
  let range = ss.getRangeByName("ThirdPartyReport");
  range.sort([
    {
      column: 4,
      ascending: true,
    },
  ]);
}
//////////////////////////////////////

//////////////////////////////////////
function SortBy3rdPartyVendorName() {
  //Sort by column R Descending
  //Sort by column F Ascending
  let range = ss.getRangeByName("ThirdPartyReport");
  range.sort([
    {
      column: 5,
      ascending: true,
    },
  ]);
}

//////////////////////////////////////
function DoNotShowInTotalButton() {
  let sheet = ss.getActiveSheet();
  // copy the display values of the
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
//////////////////////////////////////

//////////////////////////////////////
function ShowInTotalButton() {
  let sheet = ss.getActiveSheet();
  //Copy and paste display values from range AA20:AA838 to the range E20:E838
  copyAndPaste("AA20:AA217", "E20:E217");
  //Copy and paste display values from range AD20:AD217 to the range F20:F217
  copyAndPaste("AA236:AA838", "F236:F838");
  //need to copy the formula back over from AB range to AA range
  //this brings the formulas back instead of the display values
  sheet.getRange("AB20:AB838").copyTo(sheet.getRange("AA20:AA838"));
  //clear the contents of the range D6
  sheet.getRange("D8").clearContent();
  //set the value of D6 to < ON
  sheet.getRange("D6").setValue("< ON");
}
//////////////////////////////////////

//////////////////////////////////////
//get the names of payRates from the properties and create a validation list for the dropdown
function EmployeeDataValidation(targetRow, sheet) {
  let payRates = getPayRatesProperties();
  let payRateNames = [];
  for (let i = 0; i < payRates[0].tableData.length; i++) {
    payRateNames.push(payRates[0].tableData[i][0]);
  }
  let buildValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(payRateNames)
    .build();
  let cell = sheet.getRange(targetRow, 2);
  cell.setDataValidation(buildValidation);
}
//////////////////////////////////////

/////////////////////////////////////////////////
// couldnt figure this part out on my own
//stack overflow for the win
//https://stackoverflow.com/questions/71582384/based-on-the-edited-cell-how-do-i-return-the-namedrange-the-cell-belongs-in?noredirect=1#comment126515389_71582384

//get the named range that the edited cell belongs to
//////////////////////////////////////
function GetClosestNamedRange(activeSheetNamedRanges, activeRange) {
  const range = activeRange;
  const r = activeSheetNamedRanges.filter((r) => {
    const temp = r.getRange();
    const startRow = temp.getRow();
    const endRow = startRow + temp.getNumRows();
    const startCol = temp.getColumn();
    const endCol = startCol + temp.getNumColumns();
    return range.rowStart >= startRow &&
      range.rowStart <= endRow &&
      range.columnStart >= startCol &&
      range.columnStart <= endCol
      ? true
      : false;
  });
  if (r.length == 0) return;
  // console.log(r.map((f) => f.getName()).join(","));
  return r.map((f) => f.getName()).join(",");
}
//////////////////////////////////////

//////////////////////////////////////
//This gets the sale rate for the job choosen.
function getSaleRate(
  e,
  activeCategory,
  partition,
  row,
  activeRange,
  sheet,
  jobTitle
) {
  console.log("inside getSaleRate");
  //get the row of the cell that was edited
  const value = activeRange.getValue();

  //if value is not "Pick a Job Title", get the sale rate for the job
  if (value !== "Pick a Job Title") {
    //get the value of the job title
    // console.log(`partition: ${partition}`);
    // const test = sheet.getRange(row, 1).getActive().getName();
    if (partition == "XD" || partition == "Freelancer") {
      // console.log(`inside if`);
      tables = getXdaRates();
      //loop through the tables array and find the tableId that matches the namedRange
      for (let i = 0; i < tables.length; i++) {
        if (tables[i].tableId === activeCategory) {
          //return the tableData
          const tableData = tables[i].tableData;
          //loop through the tableData and find the job title that matches the job title from the cell that was edited
          for (let j = 0; j < tableData.length; j++) {
            if (tableData[j][0] === jobTitle) {
              //return the sale rate
              const saleRate = tableData[j][1];
              console.log(`saleRate: ${saleRate}`);
              //set the value of column 6 to the sale rate
              sheet.getRange(row, 6).setValue(saleRate);
            } //if the value is "Pick a Job Title", the display value of column 6 is 0
            else {
              if (value === "Pick a Job Title") {
                sheet.getRange(row, 6).setValue(0);
              }
            }
          }
        }
      }
    }
  }
  return;
}
//////////////////////////////////////

//////////////////////////////////////
//this function will be used when addCategoryToCurrentDeliverable is called
//it will add in the layout that is currently being used for the deliverable
function deliverableLayout(category, partition) {
  //partition is where the category will be added
  console.log(`deliverableLayout: ${category}`);

  let templateSheet = ss.getSheetByName("Deliverable_Template");
  let sheet = ss.getActiveSheet();
  console.log(`partition: ${partition}`);
  //copy range Main_Category_Template
  let copyRange = templateSheet.getRange(
    `Deliverable_Template_Category_${partition}_Section`
  );
  //copy footerRange
  let footerRange = ss.getRangeByName(
    `${sheet.getName()}_Footer_${partition}_Section`
  );
  // console.log(`footerRange: ${JSON.stringify(footerRange)}`);
  // console.log(`copyRange: ${JSON.stringify(copyRange)}`);
  //////////////////////////////////////////

  //////////////////////////////////////////
  //if footerRange exists, insert rows above the footer equal to the number of rows found in the copyRange
  if (footerRange) {
    console.log(`footerRange exists`);
    //insert the rows above the footer and do not have merged cells
    sheet.insertRowsBefore(footerRange.getRow(), copyRange.getNumRows());
    // //get new footerRange
    footerRange = ss.getRangeByName(
      `${sheet.getName()}_Footer_${partition}_Section`
    );
    //get the first row of the footerRange
    footerRow = footerRange.getRow();
    //get the starting row of the inserted rows
    startRow = footerRow - copyRange.getNumRows();
    // get range from start row plus numRows
    let range = sheet.getRange(
      startRow,
      1,
      copyRange.getNumRows(),
      sheet.getLastColumn()
    );
    //copy the rows from the copyRange to the sheet
    copyRange.copyTo(range);
  } else {
    //if footerRange does not exist, insert rows above the current last row equal to the number of rows found in the copyRange
    startRow = sheet.getLastRow() + 1;
    copyRange.copyTo(sheet.getRange(sheet.getLastRow() + 1, 1));
  } //end of if footerRange
  //////////////////////////////////////////

  //////////////////////////////////////////
  //set the range name to ${sheetName}_{category}_${partition}_Category
  let rangeName = `${sheet.getName()}_${category}_${partition}_Section`;
  //get the range in the sheet to set the name
  let range = sheet.getRange(
    startRow,
    1,
    copyRange.getNumRows(),
    copyRange.getNumColumns()
  );
  ss.setNamedRange(rangeName, range);
  //////////////////////////////////////////

  //////////////////////////////////////////
  //add the category to the first cell of the range
  sheet.getRange(startRow, 1).setValue(category);
  if (partition == "XD") {
    let targetRow = startRow + 2;
    EmployeeDataValidation(targetRow, sheet);
  }
  //////////////////////////////////////////

  //////////////////////////////////////////
  //get range of new named Range
  let pasteRange = ss.getRangeByName(
    `${sheet.getName()}_${category}_${partition}_Section`
  );

  //////////////////////////////////////////
  //the third row of pasteRange should be named {sheetName}_{category}_XD_Roles
  //set variable for 3rd row of new named range
  let thirdRow = pasteRange.getRow() + 2;

  // //set the named range for the roles
  ss.setNamedRange(
    `${sheet.getName()}_${category}_${partition}_Roles`,
    sheet.getRange(thirdRow, 1, 1, pasteRange.getNumColumns())
  );
  //////////////////////////////////////////

  //////////////////////////////////////////
  //update Deliverable_Template_Category_Freelancer_SubTotalQty
  ss.setNamedRange(
    `${sheet.getName()}_${category}_${partition}_SubTotalQty`,
    sheet.getRange(pasteRange.getLastRow(), 3)
  );

  //update Deliverable_Template_XD_SubTotalQty
  ss.setNamedRange(
    `${sheet.getName()}_${category}_XD_SubTotalQty`,
    sheet.getRange(thirdRow + 1, 3)
  );

  //update Deliverable_Template_Category_XD_SubTotalHours
  ss.setNamedRange(
    `${sheet.getName()}_${category}_XD_SubTotalHours`,
    sheet.getRange(thirdRow + 1, 5)
  );

  //update Deliverable_Template_Category_XD_SubTotalSell
  ss.setNamedRange(
    `${sheet.getName()}_${category}_XD_SubTotalSell`,
    sheet.getRange(thirdRow + 1, 7)
  );

  //update Deliverable_Template_Category_XD_SubTotalActualHours
  ss.setNamedRange(
    `${sheet.getName()}_${category}_XD_SubTotalActualHours`,
    sheet.getRange(thirdRow + 1, 16)
  );

  //update Deliverable_Template_Category_XD_SubTotalVariance
  ss.setNamedRange(
    `${sheet.getName()}_${category}_XD_SubTotalVariance`,
    sheet.getRange(thirdRow + 1, 17)
  );

  ss.setNamedRange(
    `${sheet.getName()}_${category}_XD_Freelancer_SubTotalSell`,
    sheet.getRange(thirdRow + 4, 7)
  );

  ss.setNamedRange(
    `${sheet.getName()}_${category}_XD_Freelancer_SubTotalQty`,
    sheet.getRange(thirdRow + 4, 3)
  );

  ss.setNamedRange(
    `${sheet.getName()}_${category}_XD_Freelancer_SubTotalHours`,
    sheet.getRange(thirdRow + 4, 9)
  );
  //////////////////////////////////////////
  //update Deliverable_Template_Category_XD_TotalHours
  //update Deliverable_Template_Category_XD_TotalSell
  //////////////////////////////////////////
  //set the formula for the 3rd column of the first row after named range
  //the 6th row of pasteRange should be named {sheetName}_{category}_Freelancer_Roles
  //////////////////////////////////////////

  //////////////////////////////////////////
  //set variable for 6th row of new named range
  let sixthRow = pasteRange.getRow() + 5;

  //set the named range for the roles
  if (partition == "XD") {
    ss.setNamedRange(
      `${sheet.getName()}_${category}_Freelancer_Roles`,
      sheet.getRange(sixthRow, 1, 1, pasteRange.getNumColumns())
    );
  }
  //////////////////////////////////////////

  //////////////////////////////////////////
  //This deletes the first appearance of the section, ensuring the place holder is removed. This is necessary for when a new Deliverable is created and the user is choosing new categories to add.
  let deleteSection = ss.getRangeByName(
    `${sheet.getName()}_Category_${partition}_Section`
  );
  if (deleteSection != null) {
    ss.deleteRows(deleteSection.getRow(), deleteSection.getNumRows());
  }
  //////////////////////////////////////////

  //////////////////////////////////////////
  //hard code updating specific namedRanges

  //////////////////////////////////////////

  //////////////////////////////////////////
  //finding and replacing text in formulas for the new named range
  findAndReplace(
    "Deliverable_Template_Category_XD_Roles",
    `${sheet.getName()}_${category}_XD_Roles`
  );
  findAndReplace(
    "Deliverable_Template_Category_Freelancer_Roles",
    `${sheet.getName()}_${category}_Freelancer_Roles`
  );
  //////////////////////////////////////////
}
//////////////////////////////////////

//////////////////////////////////////
//when button is clicked, add the value of the button to the current deliverable sheet and refresh the sidebar to remove the clickable li from the sidebar
function addCategoryToCurrentDeliverable(category) {
  console.log(`inside addCategoryToCurrentDeliverable function`);
  //get the current sheet
  let sheet = SpreadsheetApp.getActiveSheet();
  //get the current sheet name
  let sheetName = sheet.getName();
  //copy from A1 to Q8 and append to the end of the sheet
  deliverableLayout(category, "XD");
  console.log(
    `end of deliverableLayout function in addCategoryToCurrentDeliverable`
  );

  //refresh the sidebar
  createDeliverableCategorySidebar();

  //add in pick a job title
  checkForRoleUpdate(category, "XD");
  console.log(
    `end of checkForRoleUpdate function in addCategoryToCurrentDeliverable`
  );
  //refresh the current sheet
  sheet.setName(sheetName);
}
//////////////////////////////////////

//////////////////////////////////////
//function to replace text in the template
function findAndReplace(word, replacement) {
  sheet = SpreadsheetApp.getActiveSheet();
  var textFinder = sheet.createTextFinder(word).matchFormulaText(true);
  //replace text for targeting
  textFinder.replaceAllWith(replacement);
}
//////////////////////////////////////

//////////////////////////////////////
//when button is clicked, add the value of the button to the current deliverable sheet and refresh the sidebar to remove the clickable li from the sidebar
function add3rdPartyToCurrentDeliverable(category) {
  // console.log(`inside add3rdPartyToCurrentDeliverable function`);
  let sheet = ss.getActiveSheet();
  let sheetName = sheet.getName();
  //copy from A1 to Q8 and append to the end of the sheet
  deliverableLayout(category, "ThirdParty");
  //refresh the sidebar
  createthirdPartyCostsSidebar();
  //add in pick a job title
  checkForRoleUpdate(category, "ThirdParty");
  // Deliverable_Template_Category_ThirdParty_Section
  findAndReplace(
    `Deliverable_Template_Category_ThirdParty_Section`,
    `${sheetName}_${category}_ThirdParty_Section`
  );
  findAndReplace(
    `Deliverable_Template_Category_ThirdParty_Role`,
    `${sheetName}_${category}_ThirdParty_Roles`
  );
  //refresh the current sheet
  sheet.setName(sheetName);
  // console.log(`end of add3rdPartyToCurrentDeliverable function`);
}
//////////////////////////////////////

//////////////////////////////////////
//This is the main function when adding a new deliverable sheet
//I haven't changed the name of function to addDeliverable
function testing(title, categories) {
  // console.log(`started creating new deliverable: ${title}`);
  if (ss.getSheetByName(title)) {
    SpreadsheetApp.getUi().alert("Deliverable Name Already Exists");
    return;
  }
  ss.insertSheet(title);
  let sheet = ss.getSheetByName(title);
  ///////////////////////////////////////////
  //copy over entire template to new sheet
  function copyOver(title) {
    let templateSheet = ss
      .getSheetByName("Deliverable_Template")
      .getDataRange();
    let target = ss.getSheetByName(title).getRange(1, 1);
    // console.log(templateSheet.getA1Notation())
    templateSheet.copyTo(target);
  }
  ///////////////////////////////////////////

  ///////////////////////////////////////////
  //copy over named ranges to new sheet
  function NamedRanges(sheet) {
    //get named ranges in active sheet
    var rangeList = SpreadsheetApp.getActive().getNamedRanges();
    rangeList.forEach(function (namedRange) {
      var range = namedRange.getRange();
      if (range.getSheet().getName() != "Deliverable_Template") {
        return; //only want template ranges
      }
      if (range.getSheet().getName() == "Deliverable_Template") {
        newRange = sheet.getRange(
          range.getRow(),
          range.getColumn(),
          range.getNumRows(),
          range.getNumColumns()
        );
        newName = namedRange
          .getName()
          .replace("Deliverable_Template", `${title}`);
        //try catch
        try {
          ss.setNamedRange(newName, newRange);
        } catch (e) {
          console.log(
            `Error renaming named range: ${namedRange.getName()} to ${newName}\n${e}`
          );
        }
      }
    });
  }
  ///////////////////////////////////////////
  copyOver(title); //copy over entire template to new sheet
  NamedRanges(sheet); //copy over named ranges to new sheet
  ss.getRangeByName(`${title}_Title_Header`).setValue(title); //set the title of the new sheet
  //run functions
  categories.forEach((category) => {
    deliverableLayout(category, "XD");
    checkForRoleUpdate(category, "XD");
    checkForRoleUpdate(category, "ThirdParty");
  });
  //////////////////////////////////////
  //////////////////////////////////////
  ///    FIX THIS ///
  findAndReplace(
    "Deliverable_Template_Footer_ThirdParty_TotalActualAmount",
    `${title}_Footer_ThirdParty_TotalActualAmount`
  );
  findAndReplace(
    "Deliverable_Template_Footer_XD_TotalHours",
    `${title}_Footer_XD_TotalHours`
  );
  findAndReplace(
    "Deliverable_Template_Footer_XD_TotalSell",
    `${title}_Footer_XD_TotalSell`
  );
  findAndReplace(
    "Deliverable_Template_Footer_XD_TotalMarginPercentage",
    `${title}_Footer_XD_TotalMarginPercentage`
  );
  findAndReplace(
    "Deliverable_Template_Footer_XD_TotalStaffHours",
    `${title}_Footer_XD_TotalStaffHours`
  );
  findAndReplace(
    "Deliverable_Template_Footer_ThirdParty_DirectBillTotal",
    `${title}_Footer_ThirdParty_DirectBillTotal`
  );
  findAndReplace(
    "Deliverable_Template_Footer_ThirdParty_ExtendedCostTotal",
    `${title}_Footer_ThirdParty_ExtendedCostTotal`
  );
  findAndReplace(
    "Deliverable_Template_Footer_ThirdParty_TotalSell",
    `${title}_Footer_ThirdParty_TotalSell`
  );
  findAndReplace(
    "Deliverable_Template_ThirdParty_CostWithContTotal",
    `${title}_ThirdParty_CostWithContTotal`
  );
  findAndReplace(
    "Deliverable_Template_Footer_Freelancer_TotalFreelanceHours",
    `${title}_Footer_Freelancer_TotalFreelanceHours`
  );
  //////////////////////////////////////
  //////////////////////////////////////
  ///////////////////////////////////////////

  ///////////////////////////////////////////
  //update ProjectInformationSummary and PriceByDeliverable named ranges to include the new sheet
  //ProjectInformationSummary -- Insert Sheet Title when deliverable is created
  //get values of  ProjectInformationSummary_Deliverables and check if the array contains the sheet title
  try {
    let sheetName = "ProjectInformationSummary";
    updateRangeOfDeliverables(title, sheetName);
    console.log("updated ProjectInformationSummary_Deliverables");
  } catch (error) {
    console.log(
      `error with updating ProjectInformationSummary_Deliverables: ${error}`
    );
  }
  try {
    let sheetName = "PriceByDeliverable";
    updateRangeOfDeliverables(title, sheetName);
    console.log("updated PriceByDeliverable_Deliverables");
  } catch (error) {
    console.log(`error with updating PriceByDeliverables: ${error}`);
  }
  //add sheet name to the scriptProperties 'savedSheetNames'
  try {
    //delete propeerty if it exists
    // PropertiesService.getScriptProperties().deleteProperty("savedSheetNames");
    let savedSheetNames =
      PropertiesService.getScriptProperties().getProperty("savedSheetNames");
    if (savedSheetNames == null) {
      //create new array if it doesn't exist and add the sheet name
      PropertiesService.getScriptProperties().setProperty(
        "savedSheetNames",
        title
      );
    } else {
      //add the sheet name to the array
      // console.log(`entered else in setting properties`);
      savedSheetNames = savedSheetNames.split(",");
      // console.log(`savedSheetNames: ${savedSheetNames}`);
      savedSheetNames.push(title);
      // console.log(`savedSheetNames after push: ${savedSheetNames}`);
      PropertiesService.getScriptProperties().setProperty(
        "savedSheetNames",
        JSON.stringify(savedSheetNames)
      );
    }
  } catch (error) {
    console.log(`error with adding sheet name to scriptProperties: ${error}`);
  }
} //end of createDeliverable
//////////////////////////////////////

//////////////////////////////////////
// updateNamedRange("ProjectInformationSummary_Deliverables", title);
function get3rdPartyCategories() {
  // console.log(`getting 3rd party categories from BigQuery`);
  let datasetId = "3rd_Party_Categories";
  // console.log(`projectId is: ${projectId}`);
  let tables = getTableList(projectId, datasetId);
  //for each table query the table and return the data
  let tableArray = [];
  //console.log(tables);
  tables.tables.forEach((table) => {
    const tableName = table.id.split(".")[1];
    //replace colon with .
    let tableId = table.id;
    //using regex replace the : with .
    tableId = tableId.replace(/:/g, ".");
    //query the table for the data wanted
    const tableQuery = BigQuery.Jobs.query(
      {
        query: `SELECT Role FROM \`${projectId}.${datasetId}.${tableName}\`
        order by role`,
        useLegacySql: false,
      },
      projectId
    );
    //create array to hold the data
    let rows = [];
    //push the rows into an array
    tableQuery.rows.forEach((row) => {
      let rowArray = [];
      rowArray.push(row.f[0].v); //role
      rows.push(rowArray);
    });
    //push the table name and data into an array
    tableArray.push({
      tableId: tableName,
      tableData: rows,
    });
    console.log(`tableArray: ${tableArray}`);
  });
  //return each table and its data
  console.log(tableArray);
  return tableArray;
}
//////////////////////////////////////

//////////////////////////////////////
function getCurrentXdaRates(projectID, ratesSelected) {
  if (projectID == undefined) {
    projectID = "xd-agency";
  }
  if (
    ratesSelected == null ||
    ratesSelected == undefined ||
    ratesSelected == "" ||
    ratesSelected == "2022 XDA Standard"
  ) {
    ratesSelected = "xda_2022_standard";
  }

  switch (ratesSelected) {
    case "2019 MBUSA":
      ratesSelected = "old_2019_mbusa";
      break;
    case "2020 Porche":
      ratesSelected = "_2020_porsche";
      break;
    case "2022 MBUSA":
      ratesSelected = "_2022_mbusa";
      break;
    case "2019 Porche":
      ratesSelected = "_2019_porsche";
      break;
    case "2021 Accenture":
      ratesSelected = "_2021_accenture";
      break;
    case "2022 Cisco":
      ratesSelected = "cisco_2022";
      break;
    case "2021 XDA Standard":
      ratesSelected = "xda_2021_standard";
      break;
  }

  let datasetId = "Rates";

  try {
    tables = getTableList(projectID, datasetId);
  } catch (e) {
    console.log(`error with getting tables in current rates: ${e}`);
  }
  //for each table query the table and return the data
  let tableArray = [];
  tables.tables.forEach((table) => {
    console.log(`getting table info for: ${table}`);
    const tableName = table.id.split(".")[1];
    //replace colon with .
    let tableId = table.id;
    //using regex replace the : with .
    tableId = tableId.replace(/:/g, ".");
    //query the table for the data wanted
    const tableQuery = BigQuery.Jobs.query(
      {
        query: `SELECT role, ${ratesSelected} FROM \`${projectID}.${datasetId}.${tableName}\`
        where ${ratesSelected} is not null
        order by role`,
        useLegacySql: false,
      },
      projectID
    );
    //create array to hold the data
    let rows = [];
    //push the rows into an array
    try {
      tableQuery.rows.forEach((row) => {
        let rowArray = [];
        rowArray.push(row.f[0].v); //role
        rowArray.push(row.f[1].v); //xda_2022_standard
        rows.push(rowArray);
      });
    } catch (e) {
      console.log(`error with getting rows in current rates: ${e}`);
    }
    //push the table name and data into an array
    tableArray.push({
      tableId: tableName,
      tableData: rows,
    });
  });
  //return each table and its data
  return tableArray;
}
//////////////////////////////////////

//////////////////////////////////////
function getPayRates() {
  let datasetId = "Employee_Information";
  let tables = getTableList(projectId, "Employee_Information");
  let tableArray = [];

  tables.tables.forEach((table) => {
    const tableName = table.id.split(".")[1];
    //replace colon with .
    let tableId = table.id;
    //using regex replace the : with .
    tableId = tableId.replace(/:/g, ".");
    //query the table for the data wanted
    const tableQuery = BigQuery.Jobs.query(
      {
        query: `SELECT First_Name,Last_Name,Pay FROM \`${projectId}.${datasetId}.${tableName}\`
        `,
        useLegacySql: false,
      },
      projectId
    );
    //create array to hold the data
    let rows = [];
    //push the rows into an array
    tableQuery.rows.forEach((row) => {
      let rowArray = [];
      let name = [];
      let combinedName = row.f[0].v.concat(" ", row.f[1].v);
      name.push(combinedName); //first name
      name.push(row.f[2].v); //pay
      rows.push(name);
    });
    //push the table name and data into an array
    tableArray.push({
      tableId: tableName,
      tableData: rows,
    });
  });
  //return each table and its data
  return tableArray;
}
//////////////////////////////////////

//////////////////////////////////////
//Current concerns, OAuth issue with depreciated API, need to update the scope and see whats going on within the new API call
function getTableList(projectID, data) {
  if (projectID == null) {
    projectID = "xd-agency";
  }
  let datasetId = data;
  //console.log(`datasetId: ${datasetId}`);
  //if data is not defined, use "Rates" as the dataset id
  if (!datasetId) {
    datasetId = "Rates";
  }
  let tables = BigQuery.Tables.list(projectID, datasetId);
  try {
    // console.log(tables);
    return tables;
  } catch (e) {
    return console.log(`Error getting tables: ${e}`);
  }
}
//////////////////////////////////////

//////////////////////////////////////
function updateAll(projectId) {
  const namedRangeSelectedRate =
    SpreadsheetApp.getActiveSpreadsheet().getRangeByName("rate_card_section");
  //delete properties.xdaRates;
  SpreadsheetApp.getActiveSpreadsheet().toast("Updating...");

  PropertiesService.getScriptProperties().setProperty(
    "xdaRates",
    JSON.stringify(
      getCurrentXdaRates(projectId, namedRangeSelectedRate.getValue())
    )
  );
  //delete properties.thirdPartyRoles;
  PropertiesService.getScriptProperties().setProperty(
    "thirdPartyRoles",
    JSON.stringify(get3rdPartyCategories())
  );
  PropertiesService.getScriptProperties().setProperty(
    "payRates",
    JSON.stringify(getPayRates())
  );
}
//////////////////////////////////////

//////////////////////////////////////
function getThirdPartyRoles() {
  //set variable for getScriptProperties
  let scriptProperties = PropertiesService.getScriptProperties();
  //delete properties.xdaRates;
  //check if properties exsits
  if (scriptProperties.getProperty("thirdPartyRoles") == null) {
    console.log(`no properties found. Creating now`);
    //if not create it
    scriptProperties.setProperty(
      "thirdPartyRoles",
      JSON.stringify(get3rdPartyCategories())
    );
  }
  //get the data from the properties
  let thirdPartyRoles = JSON.parse(
    scriptProperties.getProperty("thirdPartyRoles")
  );

  //return the data
  return thirdPartyRoles;
}
//////////////////////////////////////

//////////////////////////////////////
function getXdaRates(ratesSelected) {
  //set variable for getScriptProperties
  let scriptProperties = PropertiesService.getScriptProperties();
  if (scriptProperties.getProperty("xdaRates") == null) {
    console.log(`no properties found. Creating now`);
    scriptProperties.setProperty(
      "xdaRates",
      JSON.stringify(getCurrentXdaRates(ratesSelected))
    );
  }
  //get the data from the properties
  let xdaRates = JSON.parse(scriptProperties.getProperty("xdaRates"));
  //return the data
  return xdaRates;
}
//////////////////////////////////////

//////////////////////////////////////
function getPayRatesProperties() {
  //set variable for getScriptProperties
  let scriptProperties = PropertiesService.getScriptProperties();
  //check if properties exists
  if (scriptProperties.getProperty("PayRates") == null) {
    console.log(`no properties found. Creating now`);
    //if not create it
    scriptProperties.setProperty("PayRates", JSON.stringify(getPayRates()));
  }
  //get the data from the properties
  let payRates = JSON.parse(scriptProperties.getProperty("PayRates"));
  //   console.log(payRates);
  //return the data
  return payRates;
}
//////////////////////////////////////

//////////////////////////////////////
function lookUpPayRate(name) {
  if (
    name === "Choose XD Agent Member" ||
    name === undefined ||
    name === "Insert Freelance Name"
  ) {
    return 0;
  }
  // console.log(`lookUpPayRate: ${name}`);
  //get the data from the properties
  let payRates = getPayRatesProperties();
  //find the payrate by matching the name to the first payrate array value
  let payRate = payRates[0].tableData.filter((payRate) => {
    if (payRate[0] === name) {
      // console.log(`found ${name}`);
      //return the data
      if (payRate[1]) {
        return payRate;
      }
    } else {
      return;
    }
  });
  if (payRate[0] === undefined) {
    return 0;
  } else {
    return payRate[0][1];
  }
}
////////////////////////////////////////////

////////////////////////////////////////////
multiplyPayRate = (payRate, hours) => {
  if (payRate === 0 || hours === 0) {
    return 0;
  }
  if (payRate === undefined || hours === undefined) {
    return 0;
  }
  if (payRate) {
    return payRate * hours;
  }
};
////////////////////////////////////////////

////////////////////////////////////////////
//function to add up every named range that includes "SheetName_parameter_Roles"
function getAllRolesForTargetPartition(targetsection, activeSheetNamedRanges) {
  // console.log(`getTargetSectionRanges: ${targetsection}`);
  const sections = activeSheetNamedRanges.filter((range) => {
    //create new array filtered to only include named ranges that are in the active sheet
    return range.getName().includes(`${targetsection}_Roles`);
  });
  return sections;
}
////////////////////////////////////////////

////////////////////////////////////////////
//function to add up every named range that includes "SheetName_parameter_Roles"

// function getTotalOfAllSections(ss,)

function TotalCost(targetsection, activeSheetNamedRanges, ss, sheetName) {
  // console.log(`TotalCost function started for: ${targetsection}`);
  let totalPayforSection = [];
  let totalStaffSell = [];
  let total3rdPartyExtendedCost = [];
  let total3rdPartyExtendedCostWithCont = [];
  let totalFreelancePay = [];
  let freelanceHours = [];
  let totalStaffHours = [];

  //get the target section ranges filter them into each array
  getAllRolesForTargetPartition(
    targetsection,
    activeSheetNamedRanges,
    ss
  ).filter((range) => {
    // console.log(`running get all roles for ${targetsection}`);
    //////////////////////////////////////////
    //for each range get the data
    try {
      activeRowValues = ss.getRangeByName(range.getName()).getValues();
      // console.log(`activeRowValues found: ${activeRowValues}`);
    } catch (e) {
      console.log(`error with ${range.getName()} activeRowValues. Error: ${e}`);
      return;
    }

    //////////////////////////////////////////
    //get total freelance hours
    if (range.getName().includes("Freelancer_Roles")) {
      // console.log(`freelance found`);
      activeRowValues.map((row) => {
        freelanceHours.push(row[8]); // Total Freelance Hours
        totalFreelancePay.push(row[6]); //Total Sell
        totalPayforSection.push(row[9]); // Total Freelance Cost
      });
    } //end if Freelancer
    //////////////////////////////////////////
    //get total third party hours
    if (range.getName().includes("ThirdParty_Roles")) {
      activeRowValues.map((row) => {
        totalPayforSection.push(row[11]); // Total Freelance Cost
        total3rdPartyExtendedCost.push(row[7]);
        total3rdPartyExtendedCostWithCont.push(row[9]);
      });
    } //end if Freelancer
    //////////////////////////////////////////
    if (range.getName().includes("XD_Roles")) {
      //////////////////////////////////////////
      //if XD
      // console.log(`xd found`);
      let names = [];
      activeRowValues.map((value) => {
        totalStaffSell.push(value[6]); //Total Sell
        totalStaffHours.push(value[4]); //Total Hours
        names.push(value[1]); //Name
      });
      //////////////////////////////////////////
      //Get Pay Rates by name
      for (i = 0; i <= names.length; i++) {
        let rate = lookUpPayRate(names[i]);
        if (rate == undefined) {
          return;
        } else {
          let pay = multiplyPayRate(rate, totalStaffHours[i]);
          if (pay) {
            totalPayforSection.push(pay);
          }
        } //end if
      } //end for loop
      //////////////////////////////////////////
    } //end of else
  }); //end of filter
  //////////////////////////////////////////

  //////////////////////////////////////////
  //update total pay and hours sections
  ////  XDA
  if (totalStaffSell.length > 0) {
    let sSell = totalStaffSell.reduce((a, b) => {
      return a + b;
    });
    // console.log(`sSell: ${sSell}`);
    // Test_Footer_XD_TotalStaffSell
    ss.getRangeByName(`${sheetName}_Footer_XD_TotalStaffSell`).setValue(sSell);
  }
  if (totalStaffHours.length > 0) {
    let tHours = totalStaffHours.reduce((a, b) => {
      return a + b;
    });
    //SheetName_Footer_XD_TotalStaffHours
    ss.getRangeByName(`${sheetName}_Footer_XD_TotalStaffHours`).setValue(
      tHours
    );
  }
  //// Freelancer
  if (totalFreelancePay.length > 0) {
    let fPay = totalFreelancePay.reduce((a, b) => {
      return a + b;
    });
    ss.getRangeByName(
      `${sheetName}_Footer_Freelancer_TotalFreelanceSell`
    ).setValue(fPay);
    // console.log(`fPay: ${fPay}`);
  }
  if (freelanceHours.length > 0) {
    let fHours = freelanceHours.reduce((a, b) => {
      return a + b;
    });
    // SheetName_Footer_Freelancer_TotalFreelanceHours
    ss.getRangeByName(
      `${sheetName}_Footer_Freelancer_TotalFreelanceHours`
    ).setValue(fHours);
  }
  //// XDA Footer
  //total sell - total pay / total sell = margin
  if (totalStaffSell.length > 0 && totalPayforSection.length > 0) {
    let sMargin = (
      (totalStaffSell.reduce((a, b) => {
        return a + b;
      }) -
        totalPayforSection.reduce((a, b) => {
          return a + b;
        })) /
      totalStaffSell.reduce((a, b) => {
        return a + b;
      })
    ).toFixed(2);
    //SheetName_Footer_XD_TotalStaffMargin
    ss.getRangeByName(`${sheetName}_Footer_XD_TotalStaffMargin`)
      .setValue(sMargin)
      .setNumberFormat("0.00%");
  }

  if (totalFreelancePay.length > 0 && totalPayforSection.length > 0) {
    let fMargin = (
      (totalFreelancePay.reduce((a, b) => {
        return a + b;
      }) -
        totalPayforSection.reduce((a, b) => {
          return a + b;
        })) /
      totalFreelancePay.reduce((a, b) => {
        return a + b;
      })
    ).toFixed(2);
    //SheetName_Footer_Freelancer_TotalFreelanceMargin
    ss.getRangeByName(`${sheetName}_Footer_Freelancer_TotalFreelanceMargin`)
      .setValue(fMargin)
      .setNumberFormat("0.00%");
  }

  ////3rd Party
  if (total3rdPartyExtendedCost.length > 0) {
    let t3rdPartyExtendedCost = total3rdPartyExtendedCost.reduce((a, b) => {
      return a + b;
    });
    //SheetName_Footer_ThirdParty_ExtendedCostTotal
    ss.getRangeByName(
      `${sheetName}_Footer_ThirdParty_ExtendedCostTotal`
    ).setValue(t3rdPartyExtendedCost);
  }
  if (total3rdPartyExtendedCostWithCont.length > 0) {
    let t3rdPartyExtendedCostWithCont =
      total3rdPartyExtendedCostWithCont.reduce((a, b) => {
        return a + b;
      });
    //SheetName_ThirdParty_CostWithContTotal
    ss.getRangeByName(`${sheetName}_ThirdParty_CostWithContTotal`).setValue(
      t3rdPartyExtendedCostWithCont
    );
  }

  //////////////////////////////////////////

  if (totalPayforSection.length > 0) {
    return (totalPayforSection = totalPayforSection.reduce((a, b) => a + b));
  } else {
    return 0;
  }
} //end of getTargetSectionRanges
////////////////////////////////////////////
function checkForThirdPartyRoleUpdate(category) {
  let sheet = SpreadsheetApp.getActiveSheet();
  //get the range by name of the ${sheetName}_${category}_Main_Category}
  let range = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(
    `${sheet.getName()}_${category}_Main_Category`
  );

  let xdaRates = getXdaRates();
  //go through xda rates and find the tableId that matches the displayValue then get the data from that table
  let tableData = xdaRates.filter((table) => {
    if (table.tableId == null) {
      return;
    }
    //get display value of first cell of the range
    let displayValue = sheet
      .getRange(range.getRow(), range.getColumn())
      .getDisplayValue();
    //if the display value matches the tableId then return the tableData
    if (table.tableId == displayValue) {
      console.log(`table found that matches displayValue`);
      return table.tableData;
    } else {
      return null;
    }
  });
  if (tableData[0] == null) {
    return "No category role table found at target location";
  }

  if (tableData != null) {
    //put tableData as a dropdown list in the sheet below the last row
    let targetRow = range.getRow() + 2;
    //target the first cell in the range
    //set data validation to the cell
    let roles = [];
    //go through and pull out all job titles and push to array
    for (let i = 0; i < tableData[0].tableData.length; i++) {
      roles.push(tableData[0].tableData[i][0]);
    }
    //create and set the validation
    let buildValidation = SpreadsheetApp.newDataValidation()
      .requireValueInList(roles)
      .build();
    let cell = sheet.getRange(targetRow, 1);
    cell.setDataValidation(buildValidation);

    cell = sheet.getRange(targetRow + 3, 1);
    cell.setDataValidation(buildValidation);
  }
}
function removeDeadReferences() {
  console.log(`removeDeadReferences() is off`);
  return;
  var activeSS = SpreadsheetApp.getActiveSpreadsheet();

  var sheets = activeSS.getSheets();
  var sheet;
  var sheetName;

  var sheetNamedRanges, sheetNamedRange, sheetNamedRangeName;
  var loopRange, loopRangeA1Notation;

  var x, i;
  // minimum sheet count is 1, no need to check for empty array
  for (x in sheets) {
    sheet = sheets[x];
    // for logging
    sheetName = sheet.getName();

    sheetNamedRanges = sheet.getNamedRanges();
    // check for empty array
    if (sheetNamedRanges.length) {
      for (i = 0; i < sheetNamedRanges.length; i++) {
        sheetNamedRange = sheetNamedRanges[i];
        // for logging
        sheetNamedRangeName = sheetNamedRange.getName();

        // v8 engine won't allow you to get range if it is invalid
        try {
          loopRange = sheetNamedRange.getRange();
        } catch (error) {
          Logger.log(error);

          loopRange = null;
        }
        // get A1 notation of referenced cells for testing purposes
        loopRangeA1Notation =
          loopRange != null ? loopRange.getA1Notation() : false;
        // check for bad reference
        // added tests to ensure future compatibility
        // but any of these should suffice
        // comment out ones you don't want to test for
        if (
          loopRangeA1Notation == false ||
          loopRangeA1Notation.slice(0, 1) === "#" ||
          loopRangeA1Notation.slice(-1) === "!" ||
          loopRangeA1Notation.indexOf("REF") > -1
        ) {
          Logger.log(
            "The named range, '" +
              sheetNamedRangeName +
              "', within the Sheet named, '" +
              sheetName +
              "', was removed."
          );
          sheetNamedRange.remove();
        }
      }
    }
  }
}

////////////////////////////////////////////

function updateClientSummaryReport(
  e,
  partition,
  sheetName,
  serviceCategory,
  jobTitle,
  oldValue,
  activeRange
) {
  console.log(`start updateClientSummaryReport function`);

  const targetRange = ss.getRange("ClientSummaryReportRange");
  const section = serviceCategory;
  const currentSheet = e.range.getSheet();
  let name = currentSheet.getRange(e.range.getRow(), 2).getValue();
  const role = currentSheet.getRange(e.range.getRow(), 1).getValue();
  // const row = e.range.getSheet().getRange(e.range.getRow());
  // console.log(`row: ${row}`);
  //if value is "Pick a Job Title" then return
  if (e.value === "Pick a Job Title") {
    return;
  }
  //if value is a number then return

  const reportRange = ss.getRangeByName("ClientSummaryReportRange");
  const reportRangeValues = reportRange.getValues();

  for (let i = 0; i < reportRangeValues.length; i++) {
    //if partition is "XD" or "Freelancer" then check column 2 for match of serviceCategory
    if (partition === "XD" || partition === "Freelancer") {
      // console.log(`partition is XD or Freelancer`);
      //The following checks if the old value existed and overwrites it with the new value
      if (reportRangeValues[i][0] === sheetName) {
        // console.log(`sheetName: ${sheetName}`);
        if (reportRangeValues[i][1] === serviceCategory) {
          // console.log(`found match for serviceCategory: ${serviceCategory}`);
          if (reportRangeValues[i][3] === oldValue) {
            if (reportRangeValues[i][2] === name) {
              console.log(`found match for oldValue at 3: ${oldValue}`);
              ss.getRangeByName("ClientSummaryReportRange")
                .offset(i, 3, 1, 1)
                .setValue(e.value);
              return;
            }
          } else if (reportRangeValues[i][2] === oldValue) {
            if (reportRangeValues[i][3] === role) {
              console.log(`found match for oldValue at 2: ${oldValue}`);
              ss.getRangeByName("ClientSummaryReportRange")
                .offset(i, 2, 1, 1)
                .setValue(e.value);
              return;
            }
          } else {
          } //end if match old value column 2
        } //end if serviceCategory matches column 1
      } //end if partition is XD or Freelancer
      console.log("no match found, creating new row");
    }
    /////////////////////
    //if partition is "ThirdParty" then check column 5 for match of serviceCategory
    if (partition === "ThirdParty") {
      let vendorName = activeRange
        .getSheet()
        .getRange(e.range.getRow(), 3)
        .getValue();
      if (reportRangeValues[i][4] === serviceCategory) {
        // console.log(`service category: ${serviceCategory} found in column 4`);
        //if match, check column 4 for match of jobTitle
        if (reportRangeValues[i][5] === oldValue) {
          console.log(`jobTitle: ${jobTitle} found in column 5`);
          if (reportRangeValues[i][6] === vendorName) {
            ss.getRangeByName("ClientSummaryReportRange")
              .offset(i, 5, 1, 1)
              .setValue(e.value);
            return;
          }
        }
      } //end of if value matches column 5
    } //end of if value matches column 5
  } //end of if value matches column 1
  // } //end for loop
  // } //end checkRangeForMatch function
  // checkRangeForMatch(e);
  updateNamedRange("ClientSummaryReportRange");
  //clear the last row
  ss.getRangeByName("ClientSummaryReportRange")
    .offset(targetRange.getLastRow(), 0, 1, 7)
    .clearContent();

  //update the ClientSummaryReport with the new values
  //target first cell of named range

  //check if the row already exists

  function updateColumn(column, value) {
    targetRange
      .getSheet()
      .getRange(targetRange.getLastRow(), column)
      .setValue(value);
  } //end updateColumn

  if (partition != "ThirdParty") {
    updateColumn(1, sheetName);
    updateColumn(2, section);
    updateColumn(3, name);
    updateColumn(4, role);
  } else if (partition === "ThirdParty") {
    //title
    updateColumn(1, sheetName);
    //role()
    updateColumn(5, section);
    //category
    updateColumn(6, role);
    //3td party description or name
    updateColumn(7, name);
    //3rd party vendor name this is the 3rd column of the e.row
    updateColumn(
      7,
      e.range.getSheet().getRange(e.range.getRow(), 3).getValue()
    );
  } //end if else

  //SortableBy3rdPartyReport -- Insert when 3rd party role is choosen
  //SortableByServiceAreaReport -- Insert when Role is Choosen
  console.log(`end updating ClientSummaryReport`);
  //end updateClientSummaryReport function
} // end updateClientSummaryReport
////////////////////////////////////////////
////////////////////////////////////////////
//update SortableBy3rdPartyReport
function updateSortableBy3rdPartyReport(
  e,
  partition,
  sheetName,
  serviceCategory,
  name,
  jobTitle,
  oldValue
) {
  if (partition !== "ThirdParty") {
    return;
  }
  console.log(`start updateSortableBy3rdPartyReport function`);
  const serviceRange = ss.getRangeByName("SortableByThirdPartyReportRange");
  const serviceValues = serviceRange.getValues();
  // console.log(`service values: ${serviceValues}`);
  for (let i = 0; i < serviceValues.length; i++) {
    //check if sheet name is in the SortableByServiceAreaReport range "ServiceAreaReport"
    if (serviceValues[i][0] === sheetName) {
      // console.log(`sheet name matched`);
      //match has been found now check if service area is the same
      if (serviceValues[i][1] === serviceCategory) {
        if (serviceValues[i][2] === oldValue) {
          console.log(`jobTitle: ${jobTitle} matched`);
          if (serviceValues[i][2] === name) {
            // console.log(`Updating Category: ${serviceCategory} for: ${name}`);
            ss.getRangeByName("ServiceAreaReport")
              .offset(i, 3, 1, 1)
              .setValue(e.value);
            return;
          }
        }
      }
    } //end if matches sheet name
  } // end of for loop if the partition is "XD" or "Freelancer"
  // console.log(`no match found`);
  updateNamedRange("SortableByThirdPartyReportRange");
  //now a new row has been added so we need to put the new values in the new row
  let targetRange = ss.getRange("SortableByThirdPartyReportRange");
  //sheet name
  targetRange
    .getSheet()
    .getRange(targetRange.getLastRow(), 1)
    .setValue(sheetName);
  //service area
  targetRange
    .getSheet()
    .getRange(targetRange.getLastRow(), 2)
    .setValue(serviceCategory);
  //name
  targetRange
    .getSheet()
    .getRange(targetRange.getLastRow(), 3)
    .setValue(jobTitle);
  //role
  targetRange.getSheet().getRange(targetRange.getLastRow(), 4).setValue(name);
}
////////////////////////////////////////////
////////////////////////////////////////////
//
function updateSortableByServiceAreaReport(
  e,
  sheetName,
  partition,
  serviceCategory,
  name,
  jobTitle,
  oldValue
) {
  console.log(`start updateSortableByServiceAreaReport function`);
  //check if partition is "XD" or "Freelancer"
  // partition = namedRangesArray[i].split("_")[2];
  if (partition === "XD" || partition === "Freelancer") {
    // console.log(`partition: ${partition}`);
    //get ServiceAreaReport range
    const serviceRange = ss.getRangeByName("ServiceAreaReport");
    const serviceValues = serviceRange.getValues();
    // console.log(`service values: ${serviceValues}`);
    for (let i = 0; i < serviceValues.length; i++) {
      //check if sheet name is in the SortableByServiceAreaReport range "ServiceAreaReport"
      if (serviceValues[i][0] === sheetName) {
        //match has been found now check if service area is the same
        if (serviceValues[i][1] === serviceCategory) {
          if (serviceValues[i][3] === oldValue) {
            // console.log(`jobTitle: ${jobTitle} matched`);
            if (serviceValues[i][2] === name) {
              // console.log(
              // `Updating Category: ${serviceCategory} for: ${name}`
              // );
              ss.getRangeByName("ServiceAreaReport")
                .offset(i, 3, 1, 1)
                .setValue(e.value);
              return;
            }
          }
          //match found, now check if name is the same
          if (serviceValues[i][2] === oldValue) {
            // console.log(`changing name: ${oldValue} to ${e.value}`);
            //match found, now update the value
            ss.getRangeByName("ServiceAreaReport")
              .offset(i, 2, 1, 1)
              .setValue(e.value);
            return;
          } //end if match
          // } //end if jobTitle matches
        } //end if matches service category
      } //end if matches sheet name
    } // end of for loop if the partition is "XD" or "Freelancer"

    //if we have made it this far then the row does not exist so we need to add it
    updateNamedRange("ServiceAreaReport");
    //now a new row has been added so we need to put the new values in the new row
    let targetRange = ss.getRange("ServiceAreaReport");
    //sheet name
    targetRange
      .getSheet()
      .getRange(targetRange.getLastRow(), 1)
      .setValue(sheetName);
    //service area
    targetRange
      .getSheet()
      .getRange(targetRange.getLastRow(), 2)
      .setValue(serviceCategory);
    //name
    targetRange.getSheet().getRange(targetRange.getLastRow(), 3).setValue(name);
    //role
    targetRange
      .getSheet()
      .getRange(targetRange.getLastRow(), 4)
      .setValue(jobTitle);
  } //end of check if partition is XD or Freelancer
} //end updateSortableByServiceAreaReport
////////////////////////////////////////////

//////////////////////////////////////
//Runs when new deliverable is created
function updateRangeOfDeliverables(deliverableTitle, sheetName) {
  let sheet = SpreadsheetApp.getActiveSpreadsheet();
  let targetSheet = sheet.getSheetByName(sheetName);
  //shift range down by row
  if (sheetName == "ProjectInformationSummary") {
    targetSheet.getRange("B18:O18").insertCells(SpreadsheetApp.Dimension.ROWS);
    //update direct bill area
    targetSheet
      .getRange("T18")
      .insertCells(SpreadsheetApp.Dimension.ROWS)
      .setValue(`=INDIRECT("'"&B18&"'!Q5")`);
    //   targetSheet.getRange("T18").setValue(`=INDIRECT("'"&B!18!&"'!Q5")`);
    //   targetSheet.getRange("T19").copyTo(targetSheet.getRange("T18"));

    //named range that needs to be updated
    let namedRange = "ProjectInformationSummary_Deliverables";
    //get the range of the named range
    let range = sheet.getRangeByName(namedRange);
    //update range of named range to include the new cell above
    let newRange = targetSheet.getRange(
      range.getRow() - 1, //get first row
      range.getColumn(), //get first column
      range.getNumRows() + 1, //get last row + 1
      range.getNumColumns() //get last column
    );
    //set the namedRange to the new range
    sheet.setNamedRange(namedRange, newRange);
    //update first cell of the new row with the deliverable title
    targetSheet
      .getRange(newRange.getRow(), newRange.getColumn())
      .setValue(deliverableTitle);
    //copy up the rest of the cells
    //target range pulling from is "C19:O19"
    //target range pushing to is "C18:O18"

    targetSheet
      .getRange("C19:O19")
      .copyTo(
        targetSheet.getRange(
          targetSheet.getRange("C18:O18").getRow(),
          targetSheet.getRange("C18:O18").getColumn()
        )
      );
  } else if (sheetName == "PriceByDeliverable") {
    //copy first row of range
    updateNamedRange("PriceByDeliverable_Deliverables");
    //update first cell of the new row with the deliverable title
    let range = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(
      "PriceByDeliverable_Deliverables"
    );
    //update first cell of the new row with the deliverable title
    let row = range.getLastRow();
    SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName(sheetName)
      .getRange(row, 2)
      .setValue(deliverableTitle);
  }
}
///////////////////////////////

///////////////////////////////
function updateCategoryInformation(ss, category) {
  let Number = "";
  //switch for category
  switch (category) {
    case "Account":
      Number = 0;
      break;
    //FIX STRATEGY and MARKETING
    case "Strategy":
      Number = 1;
      break;
    case "Measurement":
      Number = 2;
      break;
    case "Digital":
      Number = 3;
      break;
    case "Creative":
      Number = 4;
      break;
    //FIX VIDEO
    case "Video":
      Number = 5;
      break;
    case "Production":
      Number = 6;
      break;
    case "Technical":
      Number = 7;
      break;
    case "Logistics":
      Number = 8;
      break;
    //FIX EXHIBITS
    case "Exhibits":
      Number = 9;
      break;
  }
  if (Number === "") {
    return;
  }

  console.log(`updating category information for ${category}`);
  console.log(`updateBudgetHours: ${Number}`);
  //set arrays for the totals
  let XD_SubTotalSell = [];
  let XD_SubTotalHour = [];
  let Freelance_SubTotalSell = [];
  let Freelance_SubTotalHour = [];

  //get all named ranges and filter out the ones that are not `nameOfASheet_category_XD_SubTotalSell`
  let namedRanges = ss.getNamedRanges();
  let namedRangesToUpdate = namedRanges.filter(
    (namedRange) =>
      namedRange.getName().includes(`${category}_XD_SubTotalSell`) ||
      namedRange.getName().includes(`${category}_XD_SubTotalHour`) ||
      namedRange.getName().includes(`${category}_XD_Freelancer_SubTotalSell`) ||
      namedRange.getName().includes(`${category}_XD_Freelancer_SubTotalHours`)
  );
  // go through each named range and get the totals for the category and push them to the appropriate array
  for (let i = 0; i < namedRangesToUpdate.length; i++) {
    let range = namedRangesToUpdate[i].getRange();
    let total = range.getValue();
    if (
      namedRangesToUpdate[i].getName().includes(`${category}_XD_SubTotalSell`)
    ) {
      XD_SubTotalSell.push(total);
    } else if (
      namedRangesToUpdate[i].getName().includes(`${category}_XD_SubTotalHours`)
    ) {
      XD_SubTotalHour.push(total);
    } else if (
      namedRangesToUpdate[i]
        .getName()
        .includes(`${category}_XD_Freelancer_SubTotalSell`)
    ) {
      Freelance_SubTotalSell.push(total);
    } else if (
      namedRangesToUpdate[i]
        .getName()
        .includes(`${category}_XD_Freelancer_SubTotalHours`)
    ) {
      Freelance_SubTotalHour.push(total);
    }
  } //end of namedRangesToUpdate.forEach
  //check the values of the arrays in the console
  //push the info below the named range "ProjectInformationSummary_BudgetedHours"
  let topRowOfBudgetHours = ss.getRangeByName(
    "ProjectInformationSummary_BudgetedHours"
  );
  //now that we have the row, we need to put the XD_SubTotalSell in the appropriate columns 1 row below the topTargetRow. The column will be updateBudgetHours
  console.log(`XD_SubTotalHour: ${XD_SubTotalHour}`);
  topRowOfBudgetHours
    .offset(1, Number, 1, 1)
    .setValue(XD_SubTotalHour.reduce((a, b) => a + b, 0));

  console.log(`Freelance_SubTotalHour: ${Freelance_SubTotalHour}`);
  topRowOfBudgetHours
    .offset(2, Number, 1, 1)
    .setValue(Freelance_SubTotalHour.reduce((a, b) => a + b, 0));

  //Now to update the section "ProjectInformationSummary_BudgetedSell"
  let columnOfBudgetSell = ss.getRangeByName(
    "ProjectInformationSummary_BudgetedSell"
  );
  columnOfBudgetSell
    .offset(Number, 2, 1, 1)
    .setValue(XD_SubTotalSell.reduce((a, b) => a + b, 0));

  columnOfBudgetSell
    .offset(Number, 1, 1, 1)
    .setValue(Freelance_SubTotalSell.reduce((a, b) => a + b, 0));
  //get the named ranges for the category
}

//update the totals in the named ranges
//Function to update the client summary report
// It will take all named ranges within spreadsheet
function newUpdateClientSummaryReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  //get all named ranges in the spreadsheet
  const namedRanges = ss.getNamedRanges();
  //filter out named ranges that have "Deliverable_Template" in them
  const namedRangesToInput = namedRanges.filter((namedRange) =>
    namedRange.getName().endsWith("Roles")
  );
  let targetRange = ss.getRangeByName("ClientSummaryReportRange");
  //delete all but the last row within the named range
  let targetRangeLastRow = targetRange.getLastRow();
  let startingRow = targetRange.getRow();

  for (let i = targetRangeLastRow; i > startingRow; i--) {
    ss.getSheetByName("ClientSummaryReport").deleteRow(i);
  }

  const valuesToAddToReport = [];

  namedRangesToInput.forEach((range) => {
    if (range !== null) {
      targetRange = targetRange;
      // const ss = SpreadsheetApp.getActiveSpreadsheet();
      const name = range.getName();
      // console.log(`name: ${name}`);
      const splitName = name.split("_");
      const section = splitName[splitName.length - 2];
      //check if 3rd from last is "Category", if so then skip it
      if (splitName[splitName.length - 3] === "Category") {
        return; //this is here to handle the template named ranges
      }
      const sheetName = ss.getRangeByName(name).getSheet().getName();
      const rangeValuesInNamedRange = ss.getRangeByName(name).getValues();
      //go through each row in the named range and if the row has value of "Insert Freelance Name" or "Choose XD Agent Member" then skip it
      for (let i = 0; i < rangeValuesInNamedRange.length; i++) {
        if (
          rangeValuesInNamedRange[i][1] === "Insert Freelance Name" ||
          rangeValuesInNamedRange[i][1] === "Choose XD Agent Member" ||
          rangeValuesInNamedRange[i][0] === "Pick a Job Title"
        ) {
          return;
        } else {
          if (section === "XD" || section === "Freelancer") {
            let rowData = [];

            rowData.push(sheetName);
            rowData.push(splitName[splitName.length - 3]); // service area category
            rowData.push(rangeValuesInNamedRange[i][1]); // employee name
            rowData.push(rangeValuesInNamedRange[i][0]); // role
            rowData.push(""); // 3rd party category
            rowData.push(""); // 3rd party description (or name)
            rowData.push(""); // 3rd party vendor name
            rowData.push(rangeValuesInNamedRange[i][8]); // notes
            rowData.push(rangeValuesInNamedRange[i][6]); // xda fees
            rowData.push(""); //3rd party fees
            rowData.push(""); //total billing
            rowData.push(""); //direct bill
            rowData.push(rangeValuesInNamedRange[i][13]); // xda additional notes for client
            rowData.push(""); //client feedback
            rowData.push(""); //po #
            rowData.push(rangeValuesInNamedRange[i][15]); // actual in NS
            valuesToAddToReport.push(rowData);
          }
          //The following needs to be updated to tailor for the Third Party sections
          if (section === "ThirdParty") {
            let rowData = [];

            rowData.push(sheetName);
            rowData.push(""); // service area category
            rowData.push(""); // employee name
            rowData.push(""); // role
            rowData.push(splitName[splitName.length - 3]); // 3rd party category
            rowData.push(rangeValuesInNamedRange[i][0]); // 3rd party description (or name)
            rowData.push(rangeValuesInNamedRange[i][2]); // 3rd party vendor name
            rowData.push(rangeValuesInNamedRange[i][5]); // notes
            rowData.push(""); // xda fees
            rowData.push(rangeValuesInNamedRange[i][11]); //3rd party fees
            rowData.push(""); //total billing
            rowData.push(rangeValuesInNamedRange[i][13]); //direct bill
            rowData.push(""); // xda additional notes for client
            rowData.push(""); //client feedback
            rowData.push(rangeValuesInNamedRange[i][14]); //po #
            rowData.push(rangeValuesInNamedRange[i][15]); // actual in NS
            valuesToAddToReport.push(rowData);
          }
        }
      }
    }
  });
  //add the values to the report
  ss.getSheetByName("ClientSummaryReport")
    .getRange(
      targetRange.getRow(),
      targetRange.getColumn(),
      valuesToAddToReport.length,
      valuesToAddToReport[0].length
    )
    .setValues(valuesToAddToReport);
  //update the named to include the new rows
  let newRange = ss.getSheetByName("ClientSummaryReport").getRange(
    targetRange.getRow(), //get first row
    targetRange.getColumn(), //get first column
    valuesToAddToReport.length, //get last row + 1
    valuesToAddToReport[0].length //get last column
  );
  //set the namedRange to the new range
  ss.setNamedRange("ClientSummaryReportRange", newRange);

  //set namedRange to have background of white
  ss.getRangeByName("ClientSummaryReportRange").setBackground("white");
  //set border of namedRange to black
  ss.getRangeByName("ClientSummaryReportRange").setBorder(
    true, //top
    true, //left
    true, //bottom
    true, //right
    true, //vertical
    true //horizontal
  );
}
function newUpdateSortableByServiceAreaReport() {
  const sheetName = "SortableByServiceAreaReport";
  const rangeName = "ServiceAreaReport";
  //get all named ranges in the spreadsheet
  const namedRanges = ss.getNamedRanges();
  //filter out named ranges that have "Deliverable_Template" in them
  const namedRangesToInput = namedRanges.filter((namedRange) =>
    namedRange.getName().endsWith("Roles")
  );
  let targetRange = ss.getRangeByName(rangeName);
  //delete all but the last row within the named range
  let targetRangeLastRow = targetRange.getLastRow();
  let startingRow = targetRange.getRow();

  for (let i = targetRangeLastRow; i > startingRow; i--) {
    ss.getSheetByName(sheetName).deleteRow(i);
  }

  const valuesToAddToReport = [];

  namedRangesToInput.forEach((range) => {
    if (range !== null && range !== undefined) {
      targetRange = targetRange;
      const name = range.getName();
      const splitName = name.split("_");
      const section = splitName[splitName.length - 2];
      //check if 3rd from last is "Category", if so then skip it
      if (splitName[splitName.length - 3] === "Category") {
        return; //this is here to handle the template named ranges
      }
      const sheetName = ss.getRangeByName(name).getSheet().getName();
      const rangeValuesInNamedRange = ss.getRangeByName(name).getValues();
      //go through each row in the named range and if the row has value of "Insert Freelance Name" or "Choose XD Agent Member" then skip it
      for (let i = 0; i < rangeValuesInNamedRange.length; i++) {
        if (
          rangeValuesInNamedRange[i][1] === "Insert Freelance Name" ||
          rangeValuesInNamedRange[i][1] === "Choose XD Agent Member" ||
          rangeValuesInNamedRange[i][0] === "Pick a Job Title"
        ) {
          return;
        } else {
          //break into xd or freelancer
          if (section === "XD" || section === "Freelancer") {
            console.log(`section: ${section}`);
            let row = rangeValuesInNamedRange[i];
            let jobRole = row[0];
            let employeeName = row[1];
            let budgetedHours = row[4];
            let notes = row[8];
            let rate = row[5];
            let actualHours = row[15];
            let clientCost = row[6];
            let rowData = [];

            rowData.push(
              sheetName,
              splitName[splitName.length - 3], //service area category
              employeeName,
              jobRole,
              notes,
              budgetedHours,
              clientCost,
              rate,
              actualHours,
              rate * actualHours,
              budgetedHours - actualHours,
              actualHours / budgetedHours,
              rate * (budgetedHours - actualHours),
              row[14]
            ); // employee name
            valuesToAddToReport.push(rowData);
          }
        }
      }
    }
  });

  //add the values to the report
  ss.getSheetByName(sheetName)
    .getRange(
      targetRange.getRow(),
      targetRange.getColumn(),
      valuesToAddToReport.length,
      valuesToAddToReport[0].length
    )
    .setValues(valuesToAddToReport);
  //update the named to include the new rows
  let newRange = ss.getSheetByName(sheetName).getRange(
    targetRange.getRow(), //get first row
    targetRange.getColumn(), //get first column
    valuesToAddToReport.length, //get last row + 1
    valuesToAddToReport[0].length //get last column
  );
  //set the namedRange to the new range
  ss.setNamedRange(rangeName, newRange);

  //set namedRange to have background of white
  ss.getRangeByName(rangeName).setBackground("white");
  //set border of namedRange to black
  ss.getRangeByName(rangeName).setBorder(
    true, //top
    true, //left
    true, //bottom
    true, //right
    true, //vertical
    true //horizontal
  );
}
//////////////////////////////////////

//////////////////////////////////////
function newUpdateSortableBy3rdPartyReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = "SortableBy3rdPartyReport";
  const rangeName = "ThirdPartyReport";
  //get all named ranges in the spreadsheet
  const namedRanges = ss.getNamedRanges();
  // console.log(`namedRanges is ${namedRanges}`);
  //filter out named ranges that have "Deliverable_Template" in them
  const namedRangesToInput = namedRanges.filter((namedRange) =>
    namedRange.getName().endsWith("Roles")
  );
  // console.log(`namedRangesToInput is ${namedRangesToInput}`);
  let targetRange = ss.getRangeByName(rangeName);
  //delete all but the last row within the named range
  let targetRangeLastRow = targetRange.getLastRow();
  let startingRow = targetRange.getRow();
  for (let i = targetRangeLastRow; i > startingRow; i--) {
    ss.getSheetByName(sheetName).deleteRow(i);
  }
  const valuesToAddToReport = [];
  namedRangesToInput.forEach((range) => {
    if (range !== null && range !== undefined) {
      targetRange = targetRange;
      const name = range.getName();
      const splitName = name.split("_");
      const section = splitName[splitName.length - 2];
      //check if 3rd from last is "Category", if so then skip it
      if (splitName[splitName.length - 3] === "Category") {
        return; //this is here to handle the template named ranges
      }
      const sheetName = ss.getRangeByName(name).getSheet().getName();
      const rangeValuesInNamedRange = ss.getRangeByName(name).getValues();
      //go through each row in the named range and if the row has value of "Insert Freelance Name" or "Choose XD Agent Member" then skip it
      for (let i = 0; i < rangeValuesInNamedRange.length; i++) {
        if (
          rangeValuesInNamedRange[i][1] === "Insert Freelance Name" ||
          rangeValuesInNamedRange[i][1] === "Choose XD Agent Member" ||
          rangeValuesInNamedRange[i][0] === "Pick a Job Title"
        ) {
          return;
        } else {
          //break into xd or freelancer
          if (section === "ThirdParty") {
            let row = rangeValuesInNamedRange[i];
            let rowData = [];
            const jobRole = row[0];
            const employeeName = row[1];
            const notes = row[5];
            const vendor = row[2];
            const costWithContingency = row[9];
            const thirdPartyMarkup = row[10];
            const cost = row[11];
            const qty = row[3];
            const rate = row[4];
            const actualCost = row[15];
            const budgetedHours = rate * qty;
            const directBill = row[13];

            rowData.push(
              sheetName,
              splitName[splitName.length - 3],
              jobRole,
              employeeName,
              vendor,
              notes,
              qty,
              costWithContingency,
              thirdPartyMarkup,
              cost,
              actualCost,
              //percent used,
              actualCost / cost,
              //balance cost,
              cost - actualCost,
              //direct bill,
              directBill,
              //po #,
              row[14],
              //actual cost
              actualCost
            );

            valuesToAddToReport.push(rowData);
          }
        }
      }
    }
  });

  //add the values to the report
  ss.getSheetByName(sheetName)
    .getRange(
      targetRange.getRow(),
      targetRange.getColumn(),
      valuesToAddToReport.length,
      valuesToAddToReport[0].length
    )
    .setValues(valuesToAddToReport);
  //update the named to include the new rows
  let newRange = ss.getSheetByName(sheetName).getRange(
    targetRange.getRow(), //get first row
    targetRange.getColumn(), //get first column
    valuesToAddToReport.length, //get last row + 1
    valuesToAddToReport[0].length //get last column
  );
  //set the namedRange to the new range
  ss.setNamedRange(rangeName, newRange);
  //set namedRange to have background of white
  ss.getRangeByName(rangeName).setBackground("white");
  //set border of namedRange to black
  ss.getRangeByName(rangeName).setBorder(
    true, //top
    true, //left
    true, //bottom
    true, //right
    true, //vertical
    true //horizontal
  );

  console.log(valuesToAddToReport);
}
//////////////////////////////////////

//////////////////////////////////////
function checkForRoleUpdate(category, partition) {
  let sheet = SpreadsheetApp.getActiveSheet();
  //get the range by name of the ${sheetName}_${category}_Main_Category}
  let range = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(
    `${sheet.getName()}_${category}_${partition}_Section`
  );
  if (range == null) {
    return;
  }
  let rates = "";
  if (partition == "XD") {
    rates = getXdaRates();
  }
  if (partition == "ThirdParty") {
    rates = getThirdPartyRoles();
  }
  //go through rates and find the tableId that matches the displayValue (category) then get the data from that table (category)
  let tableData = rates.filter((table) => {
    if (table.tableId == null) {
      return;
    }
    //get display value of first cell of the range
    let displayValue = sheet
      .getRange(range.getRow(), range.getColumn())
      .getDisplayValue();
    //if the display value matches the tableId then return the tableData
    if (table.tableId == displayValue) {
      return table.tableData;
    } else {
      return null;
    }
  });
  if (tableData[0] == null) {
    return "No category role table found at target location";
  }

  if (tableData != null) {
    //put tableData as a dropdown list in the sheet below the last row
    let targetRow = range.getRow() + 2;
    //target the first cell in the range
    //set data validation to the cell
    let roles = [];
    //go through and pull out all job titles and push to array
    for (let i = 0; i < tableData[0].tableData.length; i++) {
      roles.push(tableData[0].tableData[i][0]);
    }
    //create and set the validation
    let buildValidation = SpreadsheetApp.newDataValidation()
      .requireValueInList(roles)
      .build();
    let cell = sheet.getRange(targetRow, 1);
    cell.setDataValidation(buildValidation);

    if (partition == "XD") {
      cell = sheet.getRange(targetRow + 3, 1);
      cell.setDataValidation(buildValidation);
      EmployeeDataValidation(targetRow, sheet);
    }
  }
}
//////////////////////////////////////

//////////////////////////////////////
//when the sheet is changed, check if cell has dropdown menu, if so, copy the row and paste it below the current row
function onEditTrigger(e) {
  console.log(`onEdit start time: ${new Date().getTime()}`);
  const projectID = "xd-agency";
  // removeDeadReferences();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activeRange = e.range;
  const sheet = SpreadsheetApp.getActiveSheet();
  const activeSheetNamedRanges = sheet.getNamedRanges();
  const sheetName = sheet.getName();
  const oldValue = e.oldValue;
  const row = activeRange.getRow();
  const col = activeRange.getColumn();
  const activeSectionRanges = GetClosestNamedRange(
    activeSheetNamedRanges,
    activeRange
  ).split(",");
  console.log(`activeSectionRanges: ${activeSectionRanges}`);
  //first column in range is jobTitle
  const jobTitle = sheet.getRange(row, 1).getValue();
  //second column is always names of the person for the job
  let name = sheet.getRange(row, 2).getValue();
  if (name == null || name == undefined) {
    name = "";
  }

  //putting the following into a function to have it as an installable trigger and have it run only when the named range is matched

  //if active range name is rate_card_section, then do this
  if (activeSectionRanges[1] == "rate_card_section") {
    // ScriptApp.
    console.log(`changing rate card`);
    //get the value of the cell
    const value = activeRange.getValue();
    console.log(`value of cell for rate card: ${value}`);
    PropertiesService.getScriptProperties().setProperty(
      "xdaRates",
      JSON.stringify(getCurrentXdaRates(projectID, value))
    );
    return;
  }

  ////////////////////////////////////////////
  //creating activeCategory and partition arrays
  //This breaks down the named ranges into activeCategory and partition as well as the active range
  //Current issue is partition is pulled from the section so this info I was confused about and may need to check to see where using "partition" is causing confilcts
  for (let i = 0; i < activeSectionRanges.length; i++) {
    //if the named range has Section in it then ignore it
    if (activeSectionRanges[i].includes("Section")) {
      //target 2nd word
      activeCategory = activeSectionRanges[i].split("_")[1];
      // console.log(`onEdit: activeCategory: ${activeCategory}`);
      partition = activeSectionRanges[i].split("_")[2];
      // console.log(`onEdit: partition: ${partition}`);
      continue;
    } else {
      rangeName = activeSectionRanges[i];
      // console.log(`onEdit: rangeName: ${rangeName}`);
    }
  }
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  //if the column is the first column, check if the cell has a dropdown menu
  if (col === 1) {
    //if there is a dropdown menu, copy the row and paste it below the current row
    //check if the cell has a dropdown menu
    if (e.range.getDataValidations().length > 0) {
      //make sure the previous display value was "Pick a Job Title"
      if (oldValue === "Pick a Job Title") {
        // console.log(`onEdit -- updating rangeName: ${rangeName}`);
        getSaleRate(
          e,
          activeCategory,
          partition,
          row,
          activeRange,
          sheet,
          jobTitle
        );
        updateNamedRange(rangeName);
        //set the value of the first cell as "Pick a Job Title"
        sheet.getRange(row + 1, 1).setValue("Pick a Job Title");
        //set the value of column 6 to 0
        sheet.getRange(row + 1, 6).setValue(0);
        // return;
      }
      //get the sale rate for the job
      console.log(`getting sale rate for job: ${jobTitle}`);
      getSaleRate(
        e,
        activeCategory,
        partition,
        row,
        activeRange,
        sheet,
        jobTitle
      );
      // return;
    }
  }
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  //if the 2nd column is updated for XD then update the margin for the row
  if ((col === 2 || col === 3 || col === 4) && rangeName.includes("XD")) {
    console.log(
      `updating margin for the following \njobTitle: ${jobTitle} \nname: ${name} \nrow: ${row} \ncol: ${col}`
    );
    let payRate = lookUpPayRate(name);
    let hours = sheet.getRange(row, 5).getValue();
    let total = multiplyPayRate(payRate, hours);
    let totalSellofRow = sheet.getRange(row, 7).getValue();
    let margin = (totalSellofRow - total) / totalSellofRow;
    sheet.getRange(row, 8).setValue(margin).setNumberFormat("0.00%");
  }
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  //update header sections
  let XDAStaffCost = TotalCost("XD", activeSheetNamedRanges, ss, sheetName); //in getPayRates.js
  let FreelanceCost = TotalCost(
    "Freelancer",
    activeSheetNamedRanges,
    ss,
    sheetName
  ); //in getPayRates.js
  try {
    sheet.getRange("K5").setValue(XDAStaffCost);
    console.log(`XDAStaffCost: ${XDAStaffCost}`);
    sheet.getRange("L5").setValue(FreelanceCost);
    console.log(`FreelanceCost: ${FreelanceCost}`);
  } catch (e) {
    console.log(`FreelanceCost Error: ${e}`);
    console.log(`XDAStaffCost Error: ${e}`);
  }
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  //update total for ThirdParty cost
  try {
    let ThirdPartyCost = TotalCost(
      "ThirdParty",
      activeSheetNamedRanges,
      ss,
      sheetName
    ); //in getPayRates.js
    ss.getRangeByName(`${sheetName}_Footer_ThirdParty_TotalSell`).setValue(
      ThirdPartyCost
    );
  } catch (e) {
    console.log(`ThirdPartyCost Error: ${e}`);
  }
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  //Update total section in footer for the margin
  let CostCombined = XDAStaffCost + FreelanceCost;
  try {
    let TotalSell = ss
      .getRangeByName(`${sheetName}_Footer_XD_TotalSell`)
      .getValue();
    ss.getRangeByName(`${sheetName}_Footer_XD_TotalMarginPercentage`).setValue(
      ((TotalSell - CostCombined) / TotalSell).toFixed(2) + "%"
    );
  } catch (e) {
    console.log(`Total Margin Percentage Error: ${e}`);
  }

  updateCategoryInformation(ss, activeCategory);
  // console.log(`onEdit end time: ${new Date().getTime()}`);
  return;
} //end onEdit function
//////////////////////////////////////

//////////////////////////////////////
//create a function to insert row after namedRange
function updateNamedRange(namedRange) {
  const range = ss.getRangeByName(namedRange);
  const sheetName = range.getSheet().getName();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  sheet.insertRowAfter(range.getLastRow());
  //copy the row and paste it below the current row
  sheet
    .getRange(range.getLastRow(), 1, 1, sheet.getLastColumn())
    .copyTo(
      sheet.getRange(range.getLastRow() + 1, 1, 1, sheet.getLastColumn())
    );
  //update named range to include the new row
  let newRange = sheet.getRange(
    range.getRow(), //get first row
    range.getColumn(), //get first column
    range.getNumRows() + 1, //get last row + 1
    range.getNumColumns() //get last column
  );
  //set the namedRange to the new range
  ss.setNamedRange(namedRange, newRange);
}
//////////////////////////////////////
function onChangeTrigger() {
  ScriptApp.newTrigger("onChange")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onChange()
    .create();
}
//////////////////////////////////////

//////////////////////////////////////
function onChange(e) {
  //get the sheets properties that contains the sheet names that have been added to the spreadsheet
  const savedSheetNames =
    PropertiesService.getScriptProperties().getProperty("savedSheetNames");
  console.log(`savedSheetNames: ${savedSheetNames}`);
  console.log(`onChange information: ${JSON.stringify(e)}`);
  console.log(`onChange source information: ${JSON.stringify(e.source)}`);
  console.log(
    `onChange Name of the sheet: ${e.source.getActiveSheet().getName()}`
  );
}
//////////////////////////////////////

//////////////////////////////////////
function DELETENAMEDRANGES() {
  var namedRanges = SpreadsheetApp.getActive().getNamedRanges();
  //create array of named ranges and their ranges
  var namedRangesArray = [];
  for (var i = 0; i < namedRanges.length; i++) {
    let nameAndRange = [];
    nameAndRange.push(namedRanges[i].getName());
    nameAndRange.push(namedRanges[i].getRange().getA1Notation());
    namedRangesArray.push(nameAndRange);
  }
  //create new sheet and add namedRangesArray to it
  var newSheet = SpreadsheetApp.getActive().insertSheet();
  newSheet
    .getRange(1, 1, namedRangesArray.length, namedRangesArray[0].length)
    .setValues(namedRangesArray);
}
//////////////////////////////////////

//////////////////////////////////////
//create onOpen function to create a menu ui
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Deliverables")
    //create deliverable Tab
    .addItem("Create Deliverable", "createNewDeliverableUI")
    //sub menu for deliverable categories
    .addSubMenu(
      ui
        .createMenu("Edit Current Deliverable")
        .addItem(
          "Add Category to Current Deliverable",
          "createDeliverableCategorySidebar"
        )
        .addItem(
          "Add 3rd Party Costs to Current Deliverable",
          "createthirdPartyCostsSidebar"
        )
    )
    .addToUi();
  ui.createMenu("Update")
    .addSubMenu(
      ui
        .createMenu("Update Reports")
        // .addItem("Update All Reports", "updateReports")
        .addItem("Update Client Summary Report", "newUpdateClientSummaryReport")
        .addItem(
          "Update Service Area Report",
          "newUpdateSortableByServiceAreaReport"
        )
        .addItem("Update 3rd Party Report", "newUpdateSortableBy3rdPartyReport")
    )
    // "Update Reports")
    .addSubMenu(
      ui
        .createMenu("Update from Database")
        .addItem("Update Everything", "updateAll")
    )
    .addToUi();
}
//////////////////////////////////////

//////////////////////////////////////
function createthirdPartyCostsSidebar() {
  //create sidebar from template
  let sidebar = HtmlService.createTemplateFromFile(
    "html/thirdPartyCategoriesSidebar"
  );
  //get html from sidebar
  let html = sidebar.evaluate();
  html.setTitle("3rd Party Category Options");
  html.setWidth(300);
  html.setHeight(300);

  //create list of li elements from the sheet
  let listOfCategories = filter3rdPartyCategories();

  //add categories to sidebar
  for (let i = 0; i < listOfCategories.length; i++) {
    let category = listOfCategories[i];
    //append category to sidebar under li tag
    //when li is clicked, add the value of the button to the current deliverable sheet and refresh the sidebar to remove the clickable li from the sidebar
    html.append(
      `<li class="li_category"><button onclick="google.script.run.add3rdPartyToCurrentDeliverable('${category}')">${category}</button></li>`
    );
  }
  //show sidebar
  SpreadsheetApp.getUi().showSidebar(html);
}
//////////////////////////////////////

//////////////////////////////////////
////Go through tableIDs and remove already choosen tableIDs found on current sheet and return the remaining tableIDs
function filter3rdPartyCategories() {
  let sheet = SpreadsheetApp.getActiveSheet();
  let lastRow = sheet.getLastRow();
  if (lastRow == 0) {
    lastRow = 1;
  }
  let xdaRates = getThirdPartyRoles();
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
//////////////////////////////////////

//////////////////////////////////////
function createDeliverableCategorySidebar() {
  //create sidebar from template
  let sidebar = HtmlService.createTemplateFromFile("html/deliverableSidebar");
  //get html from sidebar
  let html = sidebar.evaluate();
  html.setTitle("Category Options");
  html.setWidth(300);
  html.setHeight(300);
  //create list of li elements from the sheet
  let listOfCategories = filterAlreadyChoosenCategories();
  //add categories to sidebar
  for (let i = 0; i < listOfCategories.length; i++) {
    let category = listOfCategories[i];
    //append category to sidebar under li tag
    //when li is clicked, add the value of the button to the current deliverable sheet and refresh the sidebar to remove the clickable li from the sidebar
    html.append(
      `<li class="li_category"><button onclick="google.script.run.addCategoryToCurrentDeliverable('${category}')">${category}</button></li>`
    );
  }
  //show sidebar
  SpreadsheetApp.getUi().showSidebar(html);
}
//////////////////////////////////////

//////////////////////////////////////
function createNewDeliverableUI() {
  var ui = SpreadsheetApp.getUi();
  //Found a tutorial I can follow
  //https://yagisanatode.com/2018/06/10/google-apps-script-getting-input-data-from-a-dialog-box-in-google-sheets/
  //grab the named ranges from "Deliverable_Template" and add them to a new tab

  //first create a UI that asks the user what main categories should be included
  //lets get the html of the dialog box
  let html = HtmlService.createHtmlOutputFromFile("html/newDeliverableUI")
    .setWidth(550)
    .setHeight(400);

  //append form html
  html.append(`<form id="newDeliverableForm">
      <label for="deliverableName">Deliverable Name:</label>
      <input type="text" name="deliverableName" id="deliverableName" />
      <br />`);

  let xdaRates = getXdaRates();
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

  //add categories to sidebar
  for (let i = 0; i < tableIds.length; i++) {
    let category = tableIds[i];
    //append categories to the form
    html.append(
      `<input type="checkbox" class="checkbox_category" id="${category}">
      <label for="${category}">${category}</label><br>`
    );
  }
  //append ending of form
  html.append(`</form>`);

  var dialog = ui.showModalDialog(
    html,
    "Input the Name of deliverable and choose starting categories"
  );

  //show dialog box to user
  dialog;
}
//////////////////////////////////////

//////////////////////////////////////
////Go through tableIDs and remove already choosen tableIDs found on current sheet and return the remaining tableIDs
function filterAlreadyChoosenCategories() {
  let sheet = SpreadsheetApp.getActiveSheet();
  let lastRow = sheet.getLastRow();
  if (lastRow == 0) {
    lastRow = 1;
  }
  let xdaRates = getXdaRates();
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
//////////////////////////////////////
