//this function will be used when addCategoryToCurrentDeliverable is called
//it will add in the layout that is currently being used for the deliverable

//partition is where the category will be added
function deliverableLayout(category, partition) {
  // let ss = SpreadsheetApp.getActiveSpreadsheet();
  // let sheet = ss.getActiveSheet();
  let templateSheet = ss.getSheetByName("Deliverable_Template");
  let copyRange = templateSheet.getRange(
    `Deliverable_Template_Category_${partition}_Section`
  );
  //copy footerRange
  let footerRange = ss.getRangeByName(
    `${sheet.getName()}_Footer_${partition}_Section`
  );
  //////////////////////////////////////////

  //////////////////////////////////////////
  //if footerRange exists, insert rows above the footer equal to the number of rows found in the copyRange
  if (footerRange) {
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
  } //////////////////////////////////////////

  //////////////////////////////////////////
  //get the range in the sheet to set the name
  let range = sheet.getRange(
    startRow,
    1,
    copyRange.getNumRows(),
    copyRange.getNumColumns()
  );
  let rangeName = `${sheet.getName()}_${category}_${partition}_Section`;
  ss.setNamedRange(rangeName, range);
  //add the category to the first cell of the range
  sheet.getRange(startRow, 1).setValue(category);

  if (partition == "XD") {
    let targetRow = startRow + 2;
    EmployeeDataValidation(targetRow, sheet);
  }
  //get range of new named Range
  let pasteRange = ss.getRangeByName(rangeName);
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
  if (partition == "XD") {
    let updatelist = [
      "_SubTotalQty",
      "_XD_SubTotalQty",
      "_XD_SubTotalHours",
      "_XD_SubTotalSell",
      "_XD_SubTotalActualHours",
      "_XD_SubTotalVariance",
      "_Freelancer_SubTotalSell",
      "_Freelancer_SubTotalQty",
      "_Freelancer_SubTotalCost",
      "_Freelancer_SubTotalHours",
      "_Freelancer_SubTotalVariance",
      "_Freelancer_SubTotalActualHours",
    ];

    let targetColumns = [3, 3, 5, 7, 16, 17, 7, 3, 10, 9, 16, 17];
    //for the rows, XD is thirdrow + 1, freelancer is thirdrow + 4
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
      `${sheet.getName()}_${category}_Freelancer_SubTotalSell`,
      sheet.getRange(thirdRow + 4, 7)
    );

    ss.setNamedRange(
      `${sheet.getName()}_${category}_Freelancer_SubTotalQty`,
      sheet.getRange(thirdRow + 4, 3)
    );

    ss.setNamedRange(
      `${sheet.getName()}_${category}_Freelancer_SubTotalCost`,
      sheet.getRange(thirdRow + 4, 10)
    );
    ss.setNamedRange(
      `${sheet.getName()}_${category}_Freelancer_SubTotalHours`,
      sheet.getRange(thirdRow + 4, 9)
    );
    ss.setNamedRange(
      `${sheet.getName()}_${category}_Freelancer_SubTotalActualHours`,
      sheet.getRange(thirdRow + 4, 16)
    );
    ss.setNamedRange(
      `${sheet.getName()}_${category}_Freelancer_SubTotalVariance`,
      sheet.getRange(thirdRow + 4, 17)
    );
    //////////////////////////////////////////

    //////////////////////////////////////////
    //set variable for 6th row of new named range
    let sixthRow = pasteRange.getRow() + 5;

    //set the named range for the roles
    ss.setNamedRange(
      `${sheet.getName()}_${category}_Freelancer_Roles`,
      sheet.getRange(sixthRow, 1, 1, pasteRange.getNumColumns())
    );
  }

  if (partition == "ThirdParty") {
    let thirdPartyList = [
      "_ExtendedCostSubtotal",
      "_CostWithContSubTotal",
      "_SubtotalSell",
      "_SubtotalDirectBill",
      "_SubtotalActualAmount",
      "_SubTotalVariance",
    ];
    ss.setNamedRange(
      `${sheet.getName()}_${category}_${partition}_ExtendedCostSubtotal`,
      sheet.getRange(pasteRange.getLastRow(), 8)
    );
    ss.setNamedRange(
      `${sheet.getName()}_${category}_${partition}_CostWithContSubTotal`,
      sheet.getRange(pasteRange.getLastRow(), 10)
    );
    ss.setNamedRange(
      `${sheet.getName()}_${category}_${partition}_SubtotalSell`,
      sheet.getRange(pasteRange.getLastRow(), 12)
    );
    ss.setNamedRange(
      `${sheet.getName()}_${category}_${partition}_SubtotalDirectBill`,
      sheet.getRange(pasteRange.getLastRow(), 14)
    );
    ss.setNamedRange(
      `${sheet.getName()}_${category}_${partition}_SubtotalActualAmount`,
      sheet.getRange(pasteRange.getLastRow(), 16)
    );
    ss.setNamedRange(
      `${sheet.getName()}_${category}_${partition}_SubTotalVariance`,
      sheet.getRange(pasteRange.getLastRow(), 17)
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
  //finding and replacing text in formulas for the new named range
  findAndReplace(
    "Deliverable_Template_Category",
    `${sheet.getName()}_${category}`
  );
  //////////////////////////////////////////
}