/**
 * Adds a new row to the "Copy_of_Deliverable_Template" sheet if the last row in the range "Deliverable_Xda_Staff_Fees_Template" contains specific values.
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} SS - The spreadsheet object.
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e - The onEdit event object.
 */
function addRowIfConditionMet(SS, e) {
  const SHEET_NAME =
    CONFIG.TemplatesSpreadsheet.Sheets.Copy_of_Deliverable_Template.sheetName;
  const RANGE_NAME = "Deliverable_Xda_Staff_Fees_Template";

  let { headers, data } = getDataFromRange(RANGE_NAME, SS);
  let range = SS.getRangeByName(RANGE_NAME);

  let values = data;

  try {
    console.log("Function addRowIfConditionMet triggered.");

    const serviceAreaIndex = headers.indexOf("Service Area");
    const jobTitleIndex = headers.indexOf("Job Title / XDA Role");

    if (serviceAreaIndex === -1 || jobTitleIndex === -1) {
      throw new Error("a target header is not found.");
    }

    const lastRowIndex = values.length - 1;
    const lastRow = values[lastRowIndex];
    console.log(`Last row values: ${lastRow}`);

    const condition1 = lastRow[serviceAreaIndex] === "Select Service Area";
    const condition2 = lastRow[jobTitleIndex] === "Select XDA Role";
    console.log(
      `Condition 1 (Select Service Area): ${condition1}, Condition 2 (Select XDA Role): ${condition2}`
    );

    // Check if the event object 'e' and its properties are defined
    if (!e || !e.range) {
      console.log("Edit event range is undefined. Skipping further checks.");
      return;
    }
    //----------------------------------------------------------------------------------------
    // // Edited Data passed from spreadsheet
    const editedRange = e.range;
    const editedRow = editedRange.getRow();
    const editedColumn = editedRange.getColumn();
    const editedValue = e.value;
    // //End edited data

    //-----------------------------------------
    console.log(
      `Edited cell at row: ${editedRow}, column: ${editedColumn}, new value: ${editedValue}`
    );

    // if (editedRow !== range.getRow() + lastRowIndex) {
    //   console.log("Edited row is not the last row of the named range. No action taken.");
    //   return;
    // }

    // if (condition1 && condition2) {
    const lastRowIndexInSheet = range.getRow() + lastRowIndex + 1;
    console.log(`Inserting new row after row index: ${lastRowIndexInSheet}`);

    let sheet = range.getSheet();
    let mergedData = range.getMergedRanges();
    let lastRowOfRange = range.getLastRow();

    let targetRange = sheet.getRange(
      lastRowOfRange,
      2,
      1,
      range.getNumColumns()
    );

    let oneRowMerged = targetRange.getMergedRanges();

    oneRowMerged.forEach((merge) => {
      console.log(`merge: ${JSON.stringify(merge, null, 2)}`);
    });

    sheet.insertRowAfter(lastRowIndexInSheet);

    mergedData.forEach((rangeObj) => {
      console.warn(`rangeObj: ${JSON.stringify(rangeObj, null, 2)}`);
      if (rangeObj.getRow() == range.getRow() + 1) {
        const a1Notation = rangeObj.getA1Notation();
        const newA1Notation = a1Notation.replace(
          /\d+$/,
          (match) => parseInt(match) + 1
        );
        sheet.getRange(newA1Notation).merge();
        console.log(`Merged range in new row: ${newA1Notation}`);
      }
    });
    // }
    // mergedData.forEach(rangeObj=>{
    //   const newA1Notation = rangeObj.getA1Notation().replace(/\d+$/, match => parseInt(match) + 1);
    //    sheet.getRange(rangeObj.getA1Notation()).merge()
    //      console.log(`Merged range in new row: ${newA1Notation}`);
    // })

    const originalRowRange = sheet.getRange(
      lastRowIndexInSheet,
      1,
      1,
      sheet.getLastColumn()
    );
    const newRowRange = sheet.getRange(
      lastRowIndexInSheet + 1,
      1,
      1,
      sheet.getLastColumn()
    );

    // Copy values, formulas, and data validations
    newRowRange.setValues(originalRowRange.getValues());
    console.log("Copied values to the new row.");

    const originalFormulas = originalRowRange.getFormulas();
    const originalDataValidations = originalRowRange.getDataValidations();

    for (let col = 0; col < sheet.getLastColumn(); col++) {
      const newCell = newRowRange.getCell(1, col + 1);
      if (originalFormulas[0][col]) {
        newCell.setFormula(originalFormulas[0][col]);
      }
      if (originalDataValidations[0][col]) {
        newCell.setDataValidation(originalDataValidations[0][col]);
      }
    }
    console.log("Copied formulas and data validations to the new row.");

    // Handle merged cells in the entire row
    const mergedRanges = sheet.getMergedRanges();
    mergedRanges.forEach((mergedRange) => {
      if (mergedRange.getRow() === lastRowIndexInSheet) {
        const startColumn = mergedRange.getColumn();
        const width = mergedRange.getWidth();
        const newMergedRange = sheet.getRange(
          lastRowIndexInSheet + 1,
          startColumn,
          1,
          width
        );
        newMergedRange.merge();
        console.log(
          `Merged cells in new row from column ${startColumn} for ${width} columns.`
        );
      }
    });

    newRowRange.getCell(1, editedColumn).setValue(editedValue);
    console.log("Set the edited value in the new row.");

    const newRange = sheet.getRange(
      range.getRow(),
      range.getColumn(),
      range.getNumRows() + 1,
      range.getNumColumns()
    );

    sApp.setNamedRange(RANGE_NAME, newRange);
    console.log("Updated the named range to include the new row.");
    // } else {
    //   console.log("Conditions not met. No row added.");
    // }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}
