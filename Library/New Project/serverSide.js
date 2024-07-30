function createNewProjectDialog() {
  const htmlOutput = HtmlService.createHtmlOutputFromFile(
    "New Project/HTML/createNewDialog"
  )
    .setWidth(500)
    .setHeight(650);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, "Create New Project");
}
function getDeliverableInputs(count) {
  let html = '<form id="deliverableForm">';
  for (let i = 1; i <= count; i++) {
    html += `<label for="deliverable${i}">Deliverable ${i}:</label>
             <input type="text" id="deliverable${i}" name="deliverable${i}" required><br><br>`;
  }
  html +=
    '<input type="submit" value="Create Project" onclick="google.script.run.withSuccessHandler(onSuccess).createNewProject(document.getElementById(\'projectName\').value, document.getElementById(\'deliverableCount\').value, getDeliverableNames()); return false;"></form>';
  return HtmlService.createHtmlOutput(html).getContent();
}

function onSuccess(newSpreadsheetId) {
  const ui = SpreadsheetApp.getUi();
  ui.alert("New project created with ID: " + newSpreadsheetId);
}
