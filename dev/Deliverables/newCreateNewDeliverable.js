// let sheet = ss.getSheetByName("Test");
// let title = "Test";
function testing(title, categories) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.insertSheet(title);

  let sheet = ss.getSheetByName(title);

  //copy over entire template to new sheet
  function copyOver(title) {
    let templateSheet = ss
      .getSheetByName("Deliverable_Template")
      .getDataRange();
    let target = ss.getSheetByName(title).getRange(1, 1);
    // console.log(templateSheet.getA1Notation())
    templateSheet.copyTo(target);
  }

  //copy over named ranges to new sheet
  function NamedRanges(sheet) {
    //get all named ranges then filter for the ones that are in the template sheet
    var rangeList = SpreadsheetApp.getActive().getNamedRanges();
    rangeList.forEach(function (namedRange) {
      var range = namedRange.getRange();
      //if the named range is in the sheet Deliverable_Template, then copy it to the new sheet
      if (range.getSheet().getName() == "Deliverable_Template") {
        newRange = sheet.getRange(
          range.getRow(),
          range.getColumn(),
          range.getNumRows(),
          range.getNumColumns()
        );
        //replace named rane with new range name
        newName = namedRange
          .getName()
          .replace("Deliverable_Template", `${title}`);
        console.log(
          `Renaming named range: ${namedRange.getName()} to ${newName}`
        );
        ss.setNamedRange(newName, newRange);
        // SpreadsheetApp.getActiveSpreadsheet().setNamedRange(newName, newRange);
      }
    });
  }

  copyOver(title);
  NamedRanges(sheet);

  categories.forEach((category) => {
    let lastRow = sheet.getLastRow();
    deliverableLayout(category, "XD");
    let newRow = lastRow + 1;
    sheet.getRange(newRow, 1).setValue(category);
    checkForRoleUpdate(category, "XD");
    checkForRoleUpdate(category, "ThirdParty");
  });

  updateNamedRange("ProjectInformationSummary_Deliverables", title);
  updateNamedRange("PriceByDeliverable_Deliverables", title);
}
