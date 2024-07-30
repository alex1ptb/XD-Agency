/**
 * Adds a deliverable to the budget summary sheet.
 * @function addDeliverableToBudgetSummary
 */
function addDeliverableToBudgetSummary(deliverableName) {
  console.log(`running addDeliverableToBudgetSummary...`);
  if (DEBUG && !deliverableName) {
    console.log(`running addDeliverableToBudgetSummary in debug mode`);
    deliverableName = "TEST DELIVERABLE";
  }

  if (!deliverableName) {
    throw new Error("Deliverable name not provided");
  }
  let sheet = SS.getSheetByName(INTERNAL.Budget_Summary.name);
  let range = SS.getRangeByName(INTERNAL.Budget_Summary.Ranges.deliverables);

  let lastRow = range.getLastRow();

  sheet.insertRowAfter(lastRow);

  let copyRange = sheet.getRange(
    lastRow,
    range.getColumn(),
    1,
    range.getNumColumns()
  );
  copyRange.copyTo(sheet.getRange(lastRow + 1, range.getColumn()));

  let updatedRange = sheet.getRange(
    range.getRow(),
    range.getColumn(),
    range.getNumRows() + 1,
    range.getNumColumns()
  );

  // Use the correct row index for the newly inserted row
  sheet.getRange(lastRow + 1, range.getColumn()).setValue(deliverableName);

  SS.setNamedRange(INTERNAL.Budget_Summary.Ranges.deliverables, updatedRange);
  console.log(`Deliverable added to Budget Summary`);
}
