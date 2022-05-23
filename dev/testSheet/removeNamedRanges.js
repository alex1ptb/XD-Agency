function removeDeadReferences() {
  var activeSS = SpreadsheetApp.getActiveSpreadsheet();

  var sheets = activeSS.getSheets();
  var sheet;
  var sheetName;

  var sheetNamedRanges, sheetNamedRange, sheetNamedRangeName;
  var loopRange, loopRangeA1Notation;

  var x, i;
  // minimum sheet count is 1, no need to check for empty array
  for (x in sheets) {
    sheet = sheets[x];
    // for logging
    sheetName = sheet.getName();

    sheetNamedRanges = sheet.getNamedRanges();
    // check for empty array
    if (sheetNamedRanges.length) {
      for (i = 0; i < sheetNamedRanges.length; i++) {
        sheetNamedRange = sheetNamedRanges[i];
        // for logging
        sheetNamedRangeName = sheetNamedRange.getName();

        // v8 engine won't allow you to get range if it is invalid
        try {
          loopRange = sheetNamedRange.getRange();
        } catch (error) {
          Logger.log(error);

          loopRange = null;
        }
        // get A1 notation of referenced cells for testing purposes
        loopRangeA1Notation =
          loopRange != null ? loopRange.getA1Notation() : false;
        // check for bad reference
        // added tests to ensure future compatibility
        // but any of these should suffice
        // comment out ones you don't want to test for
        if (
          loopRangeA1Notation == false ||
          loopRangeA1Notation.slice(0, 1) === "#" ||
          loopRangeA1Notation.slice(-1) === "!" ||
          loopRangeA1Notation.indexOf("REF") > -1
        ) {
          Logger.log(
            "The named range, '" +
              sheetNamedRangeName +
              "', within the Sheet named, '" +
              sheetName +
              "', was removed."
          );
          sheetNamedRange.remove();
        }
      }
    }
  }
}
