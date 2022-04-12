function getNamedRanges() {
  let allNamedRanges = SpreadsheetApp.getActive().getNamedRanges();

  for (i = 0; i < allNamedRanges; i++) {
    Logger.log(
      `Name: ${allNamedRanges[i].getName()} Range: ${allNamedRanges[
        i
      ].getRange()}`
    );
  }
}
