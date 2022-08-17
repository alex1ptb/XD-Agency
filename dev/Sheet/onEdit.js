//when the sheet is changed, check if cell has dropdown menu, if so, copy the row and paste it below the current row
function onEditTrigger(e) {
  let end, start;
  console.log(
    `all information pertaining to the edited cell: ${JSON.stringify(e)}`
  );
  start = new Date();
  const projectID = "xd-agency";
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activeRange = e.range;
  console.log();
  const sheet = ss.getActiveSheet();
  const sheetName = sheet.getName();
  const oldValue = e.oldValue;
  const row = activeRange.getRow();
  const col = activeRange.getColumn();
  end = new Date();
  console.log(`active ranges took: ${end.getTime() - start.getTime()} msec`);
  //first column in range is jobTitle
  const jobTitle = sheet.getRange(row, 1).getValue();
  //second column is always names of the person for the job
  let name = sheet.getRange(row, 2).getValue();
  if (name == null || name == undefined) {
    name = "";
  }
  end = new Date();

  function getRangeSectionsInformation() {
    let start, end, activeCategory, partition, rangeName;
    start = new Date();
    const activeSheetNamedRanges = sheet.getNamedRanges();
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
    console.log(
      `getRangeSectionsInformation took ${end.getTime() - start.getTime()} msec`
    );

    return [activeCategory, partition, rangeName];
  }

  ////////////////////////////////////////////
  //creating activeCategory and partition arrays
  //This breaks down the named ranges into activeCategory and partition as well as the active range
  //Current issue is partition is pulled from the section so this info I was confused about and may need to check to see where using "partition" is causing confilcts

  ////////////////////////////////////////////

  ////////////////////////////////////////////
  //if the column is the first column, check if the cell has a dropdown menu
  if (col === 1) {
    //make sure the previous display value was "Pick a Job Title"
    if (e.range.getDataValidations().length > 0) {
      if (oldValue === "Pick a Job Title") {
        //insert new row after the current row
        sheet.insertRowAfter(row);
        //copy the row and paste it below the current row
        sheet
          .getRange(row, 1, 1, sheet.getLastColumn())
          .copyTo(sheet.getRange(row + 1, 1, 1, sheet.getLastColumn()));
        //set the value of the first cell as "Pick a Job Title"
        sheet.getRange(row + 1, 1).setValue("Pick a Job Title");
        //set the value of column 6 to 0
        sheet.getRange(row + 1, 6).setValue(0);
        let info = getRangeSectionsInformation();
        // console.log(`info: ${JSON.stringify(info)}`);
        let [activeCategory, partition, rangeName] = info;
        let run, stop;
        run = new Date();
        getSaleRate(
          e,
          activeCategory,
          partition,
          row,
          activeRange,
          sheet,
          jobTitle
        );
        stop = new Date();
        console.log(`getSaleRate took ${stop.getTime() - run.getTime()} msec`);

        //update the named range to include the new row
        //range name is the target range to update
        //sheet name is the sheet to update
        const range = ss.getRangeByName(rangeName);
        // const sheetName = range.getSheet().getName();
        // const sheet = ss.getSheetByName(sheetName);
        //copy the row and paste it below the current row
        let newRange = sheet.getRange(
          range.getRow(), //get first row
          range.getColumn(), //get first column
          range.getNumRows() + 1, //get last row + 1
          range.getNumColumns() //get last column
        );
        //set the namedRange to the new range
        ss.setNamedRange(rangeName, newRange);
        return;
      }
      //get the sale rate for the job
      else {
        console.log(`updating sale rate to match new job title: ${jobTitle}`);
        getSaleRate(
          e,
          activeCategory,
          partition,
          row,
          activeRange,
          sheet,
          jobTitle
        );
        return;
      }
    }
    return;
  }
  console.log(`passed the first if statement`);
  ////////////////////////////////////////////

  let info = getRangeSectionsInformation();
  let [activeCategory, partition, rangeName] = info;

  ////////////////////////////////////////////
  //if the 2nd, 3rd, or 4th column is updated for XD then update the margin for the row
  if ((col === 2 || col === 3 || col === 4) && rangeName.includes("XD")) {
    let payRate = lookUpPayRate(name);
    let hours = sheet.getRange(row, 5).getValue();
    let total = multiplyPayRate(payRate, hours);
    let totalSellofRow = sheet.getRange(row, 7).getValue();
    let margin = (totalSellofRow - total) / totalSellofRow;
    sheet.getRange(row, 8).setValue(margin).setNumberFormat("0.00%");
    return;
  }
  ////////////////////////////////////////////
  ////////////////////////////////////////////
  let activeSectionRanges = GetClosestNamedRange(
    sheet.getNamedRanges(),
    activeRange
  ).split(",");
  //if active range name is rate_card_section, then do this
  if (activeSectionRanges[1] == "rate_card_section") {
    // ScriptApp.
    // console.log(`changing rate card`);
    //get the value of the cell
    const value = activeRange.getValue();
    // console.log(`value of cell for rate card: ${value}`);
    PropertiesService.getScriptProperties().setProperty(
      "xdaRates",
      JSON.stringify(getCurrentXdaRates(projectID, value))
    );
    return;
  }
  //////////////////////////
  end = new Date();
  console.log(`onEdit Operation took ${end.getTime() - start.getTime()} msec`);
  return;
} //end onEdit function
