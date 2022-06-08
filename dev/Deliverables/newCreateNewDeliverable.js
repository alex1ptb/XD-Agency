// let sheet = ss.getSheetByName("Test");
// let title = "Test";

///////////////////////////////////////////
//This is the main function when adding a new deliverable sheet
function testing(title, categories) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  //if title already exists, return alert, else create new sheet
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
    //get all named ranges then filter for the ones that are in the template sheet
    var rangeList = SpreadsheetApp.getActive().getNamedRanges();
    rangeList.forEach(
      function (namedRange) {
        var range = namedRange.getRange();
        //if the named range is in the sheet Deliverable_Template, then copy it to the new sheet
        if (range.getSheet().getName() == "Deliverable_Template") {
          newRange = sheet.getRange(
            range.getRow(),
            range.getColumn(),
            range.getNumRows(),
            range.getNumColumns()
          );
          //replace named range with new range name
          newName = namedRange
            .getName()
            .replace("Deliverable_Template", `${title}`);
          //try catch
          try {
            ss.setNamedRange(newName, newRange);
          } catch (e) {
            console.log(
              `Error renaming named range: ${namedRange.getName()} to ${newName}`
            );
            console.log(e);
          }
        } //end of if
      } //end of forEach
    ); //end of rangeList
  } //end of NamedRanges
  ///////////////////////////////////////////

  copyOver(title);

  ///////////////////////////////////////////
  NamedRanges(sheet);
  //update ProjectInformationSummary and PriceByDeliverable named ranges to include the new sheet
  //ProjectInformationSummary -- Insert Sheet Title when deliverable is created
  updateNamedRange("ProjectInformationSummary_Deliverables");
  //get last row of named range and add title to the new row
  let updateRange = ss.getRangeByName("ProjectInformationSummary_Deliverables");
  updateRange.getSheet().getRange(updateRange.getLastRow(), 2).setValue(title);
  //PriceByDeliverable -- Insert Sheet Title when deliverable is created
  updateNamedRange("PriceByDeliverable_Deliverables");
  //get last row of named range and add title to the new row
  updateRange = ss.getRangeByName("PriceByDeliverable_Deliverables");
  updateRange.getSheet().getRange(updateRange.getLastRow(), 2).setValue(title);

  categories.forEach((category) => {
    deliverableLayout(category, "XD");
    checkForRoleUpdate(category, "XD");
    checkForRoleUpdate(category, "ThirdParty");
  });

  ///////////////////////////////////////////

  ///////////////////////////////////////////
  //find and replace
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
    "Deliverable_Template_Footer_Freelancer_TotalFreelanceHours",
    `${title}_Footer_Freelancer_TotalFreelanceHours`
  );
  ///////////////////////////////////////////

  ///////////////////////////////////////////
  // updateNamedRange("ProjectInformationSummary_Deliverables", title);
  // updateNamedRange("PriceByDeliverable_Deliverables", title);
}
