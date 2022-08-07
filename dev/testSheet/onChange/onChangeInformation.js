function onChangeTrigger() {
  ScriptApp.newTrigger("onChange")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onChange()
    .create();
}

function onChange(e) {
  //get the sheets properties that contains the sheet names that have been added to the spreadsheet
  const savedSheetNames =
    PropertiesService.getScriptProperties().getProperty("savedSheetNames");
  console.log(`savedSheetNames: ${savedSheetNames}`);
  console.log(`onChange information: ${JSON.stringify(e)}`);
  console.log(`onChange source information: ${JSON.stringify(e.source)}`);
  console.log(
    `onChange Name of the sheet: ${e.source.getActiveSheet().getName()}`
  );
}
