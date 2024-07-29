// Include the HTML for the form
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Opens a sidebar for user input.
 */
function openSidebar(sidebarFile, title) {
  var htmlOutput =
    HtmlService.createHtmlOutputFromFile(sidebarFile).setTitle(title);
  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}
