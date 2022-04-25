//this takes the data from the user for the title and the categories and makes a new sheet inside of the spreadsheet. The name of the spreadsheet will be the title provided by the user. And the starting categories will be pulled from the array provided by the user.
function makeNewDeliverablefromUserInput(title, categories) {
  let templateSheet = ss.getSheetByName("Deliverable_Template");
  // console.log(`Creating sheet named: ${title}`);
  ss.insertSheet(title);
  let sheet = ss.getActiveSheet();
  //copy header section to sheet
  let copyHeader = templateSheet.getRange("Deliverable_Template_Header");
  copyHeader.copyTo(sheet.getRange(1, 1));
  //grab the range that was copied over
  let headerRange = sheet.getRange(
    copyHeader.getRow(),
    copyHeader.getColumn(),
    copyHeader.getNumRows(),
    copyHeader.getNumColumns()
  );

  let copyTitle = templateSheet.getRange("Deliverable_Name_Template_Header");
  //copy title to sheet at range
  copyTitle.copyTo(sheet.getRange(copyTitle.getRow(), copyTitle.getColumn()));
  //grab the range that was copied over
  let titleRange = sheet.getRange(copyTitle.getRow(), copyTitle.getColumn());
  //set the title of the sheet
  titleRange.setValue(title);
  //update named range
  ss.setNamedRange(`${title}_Deliverable_Title_Header`, titleRange);

  //set the header range name to {title}_Header
  SpreadsheetApp.getActiveSpreadsheet().setNamedRange(
    `${title}_Main_Category_Header`,
    headerRange
  );

  //now add in the categories
  categories.forEach((category) => {
    let lastRow = sheet.getLastRow();
    deliverableLayout(category);
    let newRow = lastRow + 1;
    sheet.getRange(newRow, 1).setValue(category);
    checkForRoleUpdate(category);
  });

  //now to add in the footer
  let copyFooter = templateSheet.getRange(
    "Deliverable_Template_Main_Category_Footer"
  );

  copyFooter.copyTo(sheet.getRange(sheet.getLastRow() + 1, 1));

  //get range of footer section
  let footerRange = sheet.getRange(
    sheet.getLastRow() + 1,
    1,
    copyFooter.getNumRows(),
    copyFooter.getNumColumns()
  );

  //set the footer range name to {title}_Main_Category_Footer
  SpreadsheetApp.getActiveSpreadsheet().setNamedRange(
    `${title}_Main_Category_Footer`,
    footerRange
  );

  //create function to add in Third_Party_Categories
  function addThirdPartyTemplate() {
    let copyThirdPartyHeaderTemplate = templateSheet.getRange(
      "Third_Party_Header_Template"
    );
    copyThirdPartyHeaderTemplate.copyTo(
      sheet.getRange(sheet.getLastRow() + 1, 1)
    );
    let thirdPartyRange = sheet.getRange(
      sheet.getLastRow() + 1,
      1,
      copyThirdPartyHeaderTemplate.getNumRows(),
      copyThirdPartyHeaderTemplate.getNumColumns()
    );
    SpreadsheetApp.getActiveSpreadsheet().setNamedRange(
      `${title}_Third_Party_Categories_Header`,
      thirdPartyRange
    );

    //add in Third_Party_Category_Template
    let copyThirdPartyTemplate = templateSheet.getRange(
      "Third_Party_Category_Template"
    );
    copyThirdPartyTemplate.copyTo(sheet.getRange(sheet.getLastRow() + 1, 1));
    let thirdPartyCategoryRange = sheet.getRange(
      copyThirdPartyTemplate.getRow(),
      copyThirdPartyTemplate.getColumn(),
      copyThirdPartyTemplate.getNumRows(),
      copyThirdPartyTemplate.getNumColumns()
    );
    SpreadsheetApp.getActiveSpreadsheet().setNamedRange(
      `${title}_Third_Party_Categories`,
      thirdPartyCategoryRange
    );

    //add in Third_Party_Footer_Template
    let copyThirdPartyFooterTemplate = templateSheet.getRange(
      "Third_Party_Footer_Template"
    );
    copyThirdPartyFooterTemplate.copyTo(
      sheet.getRange(sheet.getLastRow() + 1, 1)
    );
    let thirdPartyFooterRange = sheet.getRange(
      copyThirdPartyFooterTemplate.getRow(),
      copyThirdPartyFooterTemplate.getColumn(),
      copyThirdPartyFooterTemplate.getNumRows(),
      copyThirdPartyFooterTemplate.getNumColumns()
    );
    SpreadsheetApp.getActiveSpreadsheet().setNamedRange(
      `${title}_Third_Party_Categories_Footer`,
      thirdPartyFooterRange
    );
    //end of add in Third_Party_Categories
  }
  //call the function to add in the Third_Party_Categories
  addThirdPartyTemplate();

  //function to add dropdown for Third_Party_Role_Template

  //run function to add the sheetName to all of the sheets that need it
  // addSheetToProjectInformationSummarySheet(title);
  updateNamedRange("ProjectInformationSummary_Deliverables", title);
  updateNamedRange("PriceByDeliverable_Deliverables", title);
}
