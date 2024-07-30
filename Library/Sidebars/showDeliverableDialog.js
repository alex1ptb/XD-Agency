function showCreateDeliverableDialog() {
  const html = HtmlService.createTemplateFromFile(
    "Sidebars/HTML/createDeliverable"
  );
  html.spreadsheetId = SS.getId();
  console.log(`spreadsheetId: ${SS.getId()}`);
  const htmlOutput = html.evaluate().setWidth(450).setHeight(550);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, "Create Deliverable");
}
