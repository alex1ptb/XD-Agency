///////////////////////////////////////////
//function to replace text in the template
function findAndReplace(word, replacement) {
  let sheet = SpreadsheetApp.getActiveSheet();
  var textFinder = sheet.createTextFinder(word).matchFormulaText(true);
  //replace text for targeting
  textFinder.replaceAllWith(replacement);
}
///////////////////////////////////////////
