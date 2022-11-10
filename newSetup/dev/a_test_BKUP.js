//this is to copy over entire spreadsheet to new spreadsheet

function createNewSpreadsheet() {
  //original spreadsheet
  const id = "1wVqkbGMfKdJUPsZysMB2MhTIOpe9s9tdvOvWdB0rCi4";
  const ss = SpreadsheetApp.openById(id);
  const sheets = ss.getSheets();
  //new spreadsheet id
  const newId = "1BjQ3InxHv7G5A2DvqZeVbZvWbH7FhzJXekALV1me-Qw";
  const newSs = SpreadsheetApp.openById(newId);

  //copy over all sheets from original spreadsheet to new spreadsheet
  sheets.forEach((sheet) => {
    //old sheet
    const sheetName = sheet.getName();
    //if sheet exits in new spreadsheet, delete it
    if (newSs.getSheetByName(sheetName)) {
      newSs.deleteSheet(newSs.getSheetByName(sheetName));
    }
    newSs.insertSheet(sheetName);
    const dR = sheet.getDataRange();
    const Values = dR.getValues();
    const rD = [1, 1, Values.length, Values[0].length];
    const Range = sheet.getRange(...rD);
    const Colors = Range.getBackgrounds();
    const Formatting = Range.getTextStyles();
    const FontColors = Range.getFontColors();
    const FontFamilies = Range.getFontFamilies();
    const OldSheetNamedRanges = sheet.getNamedRanges();
    const Formulas = sheet.getDataRange().getFormulas();
    const Merged = sheet
      .getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns())
      .getMergedRanges();

    //newSheet

    const newS = newSs.getSheetByName(sheetName);
    const nsRange = newS.getRange(...rD);

    newS.deleteColumns(
      Values[0].length + 1,
      newS.getMaxColumns() - Values[0].length
    );
    newS.deleteRows(Values.length + 1, newS.getMaxRows() - Values.length);

    //combine formulas and values
    //if formula array has null value, replace with value from sheetData
    const combined = Formulas.map((formula, index) => {
      return formula.map((f, i) => {
        if (f == "") {
          return Values[index][i];
        }
        return f;
      });
    });
    nsRange.setBackgrounds(Colors);
    nsRange.setTextStyles(Formatting);
    nsRange.setFontColors(FontColors);
    nsRange.setFontFamilies(FontFamilies);
    nsRange.setValues(combined);
    Merged.forEach((range) => {
  let rowOffset = range.getRow() - 1;
  let colOffset = range.getColumn() - 1;
  for (var i = 0; i < Merged.length; i++) {
    row = Merged[i].getRow() + rowOffset;
    col = Merged[i].getColumn() + colOffset;
    rows = Merged[i].getNumRows();
    cols = Merged[i].getNumColumns();
    newS.getRange(row, col, rows, cols).merge();
  }
});
    OldSheetNamedRanges.forEach((namedRange) => {
      const range = namedRange.getRange();
      const newRange = newS.getRange(
        range.getRow(),
        range.getColumn(),
        range.getNumRows(),
        range.getNumColumns()
      );
      const newName = namedRange.getName().replace(sheetName, `${sheetName}`);
      try {
        newSs.setNamedRange(newName, newRange);
      } catch (e) {
        console.log(
          `Error renaming range: ${namedRange.getName()} to ${newName}\n${e}`
        );
      }
    });
  });
}


