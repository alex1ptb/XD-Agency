/**
 * Creates a new deliverable in a Google Spreadsheet.
 *
 * @param {string} spreadsheetId - The ID of the Google Spreadsheet.
 * @param {string} deliverableName - The name of the deliverable.
 * @param {Date} startDate - The start date of the deliverable.
 * @param {Date} deliveryDate - The delivery date of the deliverable.
 * @throws {Error} If any of the required parameters are missing.
 */
function createDeliverable(
  spreadsheetId,
  deliverableName,
  startDate,
  deliveryDate
) {
  if (!deliverableName) {
    throw new Error("Needed param not passed");
  }

  try {
    const activeSpreadsheet = sApp.openById(spreadsheetId);
    const templateSheetId = EXTERNAL.Templates.id;
    const templateSpreadsheet = sApp.openById(templateSheetId);
    const templateSheet = templateSpreadsheet.getSheetByName(
      EXTERNAL.Templates.Deliverable.name
    );
    if (!templateSheet) {
      throw new Error("Template sheet not found");
    }

    // Copy the template sheet to the current spreadsheet
    const newSheet = templateSheet.copyTo(activeSpreadsheet);

    // Rename the new sheet
    newSheet.setName(deliverableName);

    let nameRange = activeSpreadsheet.getRangeByName(
      `${deliverableName}!Deliverable_Name`
    );
    nameRange.setValue(deliverableName);

    // Create new row in the Budget Summary sheet with the deliverable name
    addDeliverableToBudgetSummary(deliverableName, activeSpreadsheet);

    Logger.log("Deliverable created successfully");
  } catch (e) {
    Logger.log(`Error creating deliverable: ${e.message}`);
    throw e;
  }
  return;
}
