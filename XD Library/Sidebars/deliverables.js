function showCreateDeliverableDialog() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const html = HtmlService.createTemplateFromFile(
    "Sidebars/HTML/createDeliverable"
  );
  html.spreadsheetId = ss.getId();
  console.log(`spreadsheetId: ${ss.getId()}`);
  const htmlOutput = html.evaluate().setWidth(450).setHeight(550);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, "Create Deliverable");
}

function createDeliverable(
  spreadsheetId,
  deliverableName,
  startDate,
  deliveryDate
) {
  if (!deliverableName || !startDate || !deliveryDate) {
    throw new Error("Needed param not passed");
  }

  try {
    const activeSpreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const templateSheetId = CONFIG.Templates.id;
    const templateSpreadsheet = SpreadsheetApp.openById(templateSheetId);
    const templateSheet = templateSpreadsheet.getSheetByName(
      CONFIG.Templates.Deliverable.name
    );
    if (!templateSheet) {
      throw new Error("Template sheet not found");
    }

    // Copy the template sheet to the current spreadsheet
    const newSheet = templateSheet.copyTo(activeSpreadsheet);

    // Rename the new sheet
    newSheet.setName(deliverableName);
    SpreadsheetApp.flush();

    // Log named ranges for debugging
    const namedRanges = newSheet.getNamedRanges();
    namedRanges.forEach((namedRange) => {
      Logger.log(`Named Range: ${namedRange.getName()}`);
    });

    // Update the named ranges with user input
    activeSpreadsheet
      .getRangeByName(`${deliverableName}!Deliverable_Name`)
      .setValue(deliverableName);
    activeSpreadsheet
      .getRangeByName(`${deliverableName}!Deliverable_Start_Date`)
      .setValue(startDate);
    activeSpreadsheet
      .getRangeByName(`${deliverableName}!Deliverable_Delivery_Date`)
      .setValue(deliveryDate);

    Logger.log("Deliverable created successfully");
  } catch (e) {
    Logger.log(`Error creating deliverable: ${e.message}`);
    throw e;
  }
}
