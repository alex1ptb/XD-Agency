//this function will be used when addCategoryToCurrentDeliverable is called
//it will add in the layout that is currently being used for the deliverable

//partition is where the category will be added
function deliverableLayout(category, partition) {
  console.log(
    `inside deliverableLayout with category: ${category} and partition: ${partition}`
  );
  //if category has spaces, remove them
  category = category.replace(/\s/g, "");
  const templateSheet = ss.getSheetByName("Deliverable_Template");
  const sheet = ss.getActiveSheet();
  const copyRange = templateSheet.getRange(
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
  let categoryValue = category.split(/(?=[A-Z])/).join(" ");
  sheet.getRange(startRow, 1).setValue(categoryValue);

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
  if (partition == "XD") {
    ss.setNamedRange(
      `${sheet.getName()}_${category}_${partition}_SubTotalQty`,
      sheet.getRange(pasteRange.getLastRow(), 3)
    );
    setNamedRangesThatEndInList(partition);
    let sixthRow = pasteRange.getRow() + 5;
    ss.setNamedRange(
      `${sheet.getName()}_${category}_Freelancer_Roles`,
      sheet.getRange(sixthRow, 1, 1, pasteRange.getNumColumns())
    );
  }
  if (partition == "ThirdParty") {
    setNamedRangesThatEndInList(partition);
  }
  //////////////////////////////////////////

  //////////////////////////////////////////
  function setNamedRangesThatEndInList(partition) {
    xdList = [
      "_XD_SubTotalQty",
      "_XD_SubTotalQty",
      "_XD_SubTotalHours",
      "_XD_SubTotalSell",
      "_XD_SubTotalActualHours",
      "_XD_SubTotalVariance",
      "_Freelancer_SubTotalSell",
      "_Freelancer_SubTotalQty",
      "_Freelancer_SubTotalCost",
      "_Freelancer_SubTotalHours",
      "_Freelancer_SubTotalActualHours",
      "_Freelancer_SubTotalVariance",
    ];
    //_Freelancer_Roles    -- extra may want to put in list
    xdNumbers = [3, 3, 5, 7, 16, 17, 7, 3, 10, 9, 16, 17];
    thirdPartyList = [
      "_ThirdParty_Roles",
      "_ThirdParty_SubTotalQty",
      "_ThirdParty_SubTotalHours",
      "_ThirdParty_SubTotalSell",
      "_ThirdParty_SubTotalActualHours",
      "_ThirdParty_SubTotalVariance",
    ];
    thirdPartyNumbers = [3, 3, 5, 7, 16, 17];

    if (partition == "XD") {
      list = xdList;
      numbers = xdNumbers;
      rowDefault = thirdRow + 1;
      nameRange = `${sheet.getName()}_${category}`;
    } else if (partition == "ThirdParty") {
      list = thirdPartyList;
      numbers = thirdPartyNumbers;
      rowDefault = pasteRange.getLastRow();
      nameRange = `${sheet.getName()}_${category}_${partition}`;
    }
    try {
      for (let i = 0; i < list.length; i++) {
        //if list name contains Freelancer, set the row to thirdRow+4
        if (list[i].includes("Freelancer")) {
          rowDefault = thirdRow + 4;
        }

        console.log(
          `list: ${list[i]} numbers: ${numbers[i]} rowDefault: ${rowDefault} nameRange: ${nameRange}`
        );
        ss.setNamedRange(
          `${nameRange}${list[i]}`,
          sheet.getRange(rowDefault, numbers[i])
        );
      }
    } catch (e) {
      console.log(e);
    }
  }
  //End of setNamedRangesThatEndInList
  //////////////////////////////////////////

  //////////////////////////////////////////
  //This deletes the first appearance of the section, ensuring the place holder is removed.
  //This is necessary for when a new Deliverable is created and the user is choosing new categories to add.
  let deleteSection = ss.getRangeByName(
    `${sheet.getName()}_Category_${partition}_Section`
  );
  if (deleteSection != null) {
    ss.deleteRows(deleteSection.getRow(), deleteSection.getNumRows());
  }
  findAndReplace(
    "Deliverable_Template_Category",
    `${sheet.getName()}_${category}`
  );
  console.log("end of deliverable Layout function");
}
