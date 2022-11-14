//when the sheet is changed, check if cell has dropdown menu, if so, copy the row and paste it below the current row
/**
 * @OnlyCurrentDoc
 */
//create onEdit trigger
//create onChange Trigger
//

function onEditTrigger(e) {
  const projectId = "xd-agency-367108";
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activeRange = e.range;
  const sheet = ss.getActiveSheet();
  ////////////////////////////////////////////
  // const dataRange = sheet.getDataRange(); //Added
  const oldValue = e.oldValue;
  const row = activeRange["rowStart"];
  const col = activeRange["columnStart"];
  const lastColumn = sheet.getLastColumn();
  const rowValues = sheet.getRange(row, 1, 1, lastColumn).getValues();
  const jobTitle = rowValues[0][0];
  const namedRanges = sheet.getNamedRanges();
  let info = getRangeSectionsInformation(namedRanges); //get the activeCategory, partition, and rangeName
  let [activeCategory, partition, rangeName] = info;
  const range = ss.getRangeByName(rangeName);

  //get named ranges of active sheet from the data property

  function getRangeSectionsInformation(namedRanges) {
    let activeCategory, partition, rangeName;
    //filter out Category, Footer, Header, and Title
    activeSheetNamedRanges = namedRanges.filter(function (namedRange) {
      if (
        !namedRange.getName().includes("Category") &&
        !namedRange.getName().includes("Footer") &&
        !namedRange.getName().includes("Header") &&
        !namedRange.getName().includes("Title") &&
        !namedRange.getName().includes("Deliverable_Template")
      ) {
        return namedRange;
      }
    });

    const activeSectionRanges = GetClosestNamedRange(
      activeSheetNamedRanges,
      activeRange
    ).split(",");
    for (let i = 0; i < activeSectionRanges.length; i++) {
      //if the named range has Section in it then ignore it
      if (activeSectionRanges[i].includes("Section")) {
        //target 2nd word
        activeCategory = activeSectionRanges[i].split("_")[1];
        partition = activeSectionRanges[i].split("_")[2];
        continue;
      } else {
        rangeName = activeSectionRanges[i];
      }
    }
    end = new Date();
    return [activeCategory, partition, rangeName];
  }
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  //check if on sheet
  if (sheet.getName() == "ProjectInformationSummary") {
    ////////////////////////////////////////////
    if (rangeName == "rate_card_section") {
      //get the value of the cell
      const value = activeRange.getValue();
      // console.log(`value of cell for rate card: ${value}`);
      PropertiesService.getScriptProperties().setProperty(
        "xdaRates",
        JSON.stringify(getCurrentXdaRates(projectId, value))
      );
    }
    return;
  }
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  //if the column is the first column, check if the cell has a dropdown menu
  if (col === 1) {
    console.log("col is 1");
    //make sure the previous display value was "Pick a Job Title"
    if (e.range.getDataValidations().length > 0) {
      if (oldValue === "Pick a Job Title") {
        //add new row below the current row with the same values
        sheet.insertRowAfter(row);
        sheet
          .getRange(row, 1, 1, sheet.getLastColumn())
          .copyTo(sheet.getRange(row + 1, 1, 1, sheet.getLastColumn()));
        sheet.getRange(row + 1, 1).setValue("Pick a Job Title");
        //set the namedRange to the new range
        let newRange = sheet.getRange(
          range.getRow(), //get first row
          range.getColumn(), //get first column
          range.getNumRows() + 1, //get last row + 1
          range.getNumColumns() //get last column
        );
        ss.setNamedRange(rangeName, newRange);
      }
      console.log(`going to getSaleRate`);
      getSaleRate(
        e,
        activeCategory,
        partition,
        row,
        activeRange,
        sheet,
        jobTitle
      );
      //first cell in the row is "Pick a Job Title"
    } else {
      console.log(`else getSaleRate`);
      getSaleRate(
        e,
        activeCategory,
        partition,
        row,
        activeRange,
        sheet,
        jobTitle
      );
    }
    // return;
  }
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  //if the 2nd, 3rd, or 4th column is updated for XD then update the margin for the row
  if (
    // (col === 2 || col === 3 || col === 4) &&
    rangeName.includes("XD")
  ) {
    let start, end;
    start = new Date();
    let name = rowValues[0][1];
    let hours = rowValues[0][4];
    let totalSellofRow = rowValues[0][6];
    if (name === "Choose XD Agent Member") {
      return;
    }
    let payRate = lookUpPayRate(name);
    total = multiplyPayRate(payRate, hours);
    let margin = (totalSellofRow - total) / totalSellofRow;
    sheet.getRange(row, 8).setValue(margin).setNumberFormat("0.00%");
    end = new Date();
    console.log(`margin took ${end - start} milliseconds`);
    // return;
  }
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  updateCategoryInformation(ss, activeCategory);
  updateTotalCostPerCategory(ss, activeCategory);
  return;
} //end onEdit function
