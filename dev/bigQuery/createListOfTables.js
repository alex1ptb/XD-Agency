/*
  Goal: Get the names of the tables in the dataset and put them in the drop down on the current deliverable sheet 
  //////
  Current Test sheet: ChooseAgent
  Current Test cell: A1
  Current dataset id: Rates
*/

function createListOfTables() {
  // let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.spreadsheet.getSheetByName("ChooseAgent");
  let cell = sheet.getRange("A1");
  //bigquery proejct id = "xd-agency"
  const projectId = "xd-agency";
  //bigquery dataset id = "xd-agency:Rates"
  const datasetId = "Rates";

  //query bigquery for list of table names from dataset Rates
  // List all tables in the dataset
  const tables = BigQuery.Tables.list(projectId, datasetId);
  let names = [];
  tables.tables.forEach((table) => {
    names.push(table.id.split(".")[1]);
  });

  //put the list of table names as drop down option of roles to choose from
  let buildValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(names)
    .build();
  //set validation to cell A10
  cell.setDataValidation(buildValidation);
}
