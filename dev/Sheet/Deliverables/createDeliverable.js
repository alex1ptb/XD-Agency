/* have this scoped to this document only
#

#
*/
///////////////////////////////////////////
//This is the main function when adding a new deliverable sheet
//I haven't changed the name of function to addDeliverable
function newDeliverable(title, categories) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  //if title already exists, return alert, else create new sheet
  if (ss.getSheetByName(title)) {
    SpreadsheetApp.getUi().alert("Deliverable Name Already Exists");
    return;
  }
  ss.insertSheet(title);
  const sheet = ss.getSheetByName(title);

  ///////////////////////////////////////////
  //FUNCTIONS
  ///////////////////////////////////////////

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
  function CopyNamedRangesFromDeliverable(sheet) {
    //get named ranges in active sheet
    let rangeList = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName("Deliverable_Template")
      .getNamedRanges();

    rangeList.forEach((namedRange) => {
      let range = namedRange.getRange();
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
        //find and replace text in the new sheet with the new sheet name
        findAndReplace("Deliverable_Template", title);
      } catch (e) {
        console.log(
          `Error renaming range: ${namedRange.getName()} to ${newName}\n${e}`
        );
      }
    }); ///end of forEach
  } //End of CopyNamedRangesFromDeliverable
  ///////////////////////////////////////////

  function runCreateDeliverable(title, ss) {
    // console.log(`categories: ${categories}`);
    copyOver(title); //copy over entire template to new sheet
    CopyNamedRangesFromDeliverable(sheet); //copy over named ranges to new sheet
    findAndReplace("Deliverable_Template", `${title.toString()}`); //find and replace text in the new sheet with the new sheet name
    ss.getRangeByName(`${title}_Title_Header`).setValue(title);
    let sheetName = "ProjectInformationSummary";
    updateRangeOfDeliverables(title, sheetName);
    console.log("updated ProjectInformationSummary_Deliverables");
    sheetName = "PriceByDeliverable";
    updateRangeOfDeliverables(title, sheetName);
    console.log("updated PriceByDeliverable_Deliverables");
    //original loopty loop
    categories.forEach((category) => {
      console.log(`adding ${category} to ${title}`);
      deliverableLayout(category, "XD");
      checkForRoleUpdate(category, "XD");
      checkForRoleUpdate(category, "ThirdParty");
    });
    let grabList = [
      "XD_SubTotalHours",
      "XD_SubTotalSell",
      "XD_SubTotalActualHours",
      "XD_SubTotalVariance",
      "Freelancer_SubTotalHours",
      "Freelancer_SubTotalSell",
      "Freelancer_SubTotalActualHours",
      "Freelancer_SubTotalVariance",
    ];

    //   "_Footer_Freelancer_TotalFreelanceMargin",
    let targetNamedRangeToUpdateOnActiveSheet = [
      "_Footer_XD_TotalStaffHours",
      "_Footer_XD_TotalStaffSell",
      "_Footer_XD_TotalStaffActualHours",
      "_Footer_XD_TotalStaffVariance",
      "_Footer_Freelancer_TotalFreelanceHours",
      "_Footer_Freelancer_TotalFreelanceSell",
      "_Footer_Freelancer_TotalFreelanceActualHours",
      "_Footer_Freelancer_TotalFreelanceVariance",
    ];
    //for main footer
    updateFooterRangeWithNewFormulas(
      grabList,
      targetNamedRangeToUpdateOnActiveSheet
    );
  }
  runCreateDeliverable(title, ss);
} //end of createDeliverable
///////////////////////////////////////////
