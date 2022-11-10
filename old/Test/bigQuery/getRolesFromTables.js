//Once a table has been chosen from the drop down, the script will:
//1. Get the table name from the drop down
//2. query the table for the list of roles
//3. put the list of roles in the next cell as a drop down option
//4. set the validation for the next cell to be a drop down option

function getRolesFromTables() {
  //target sheet ChooseAgent
  //target cell A10
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName("ChooseAgent");
  let cell = sheet.getRange("A1");
  //bigquery proejct id = "xd-agency"
  const projectId = "xd-agency";
  //bigquery dataset id = "xd-agency:Rates"
  const datasetId = "Rates";

  //check if a table has been chosen from the drop down
  let tableName = cell.getValue();
  //if the table has been chosen, query the table for the list of roles
  if (tableName != "") {
    //query the table for the list of roles
    //convert the table name to the table id
    let tableId = tableName.replace(/ /g, "_");
    //remove the word services from the table id
    tableId = tableId.replace("services", "");
    //remove any trailing spaces or underscores
    tableId = tableId.replace(/[ _]*$/g, "");

    //get data from the table
    const table = BigQuery.Tables.get(projectId, datasetId, tableId);
    // console.log(`table ${table}`);

    //query the table for all values from role
    const request = {
      query: `SELECT role FROM [${projectId}.${datasetId}.${tableId}]`,
    };
    const result = BigQuery.Jobs.query(request, projectId);
    const rows = result.rows;

    //make array of roles from the query
    let roles = [];
    rows.forEach((row) => {
      //its set in an object and within an array so the format is {"f":[{"v":"TARGET"}]} where target is the role name
      roles.push(row.f[0].v);
    });
    // console.log(`roles ${roles}`);

    //put the list of roles as drop down option of roles to choose from
    let buildValidation = SpreadsheetApp.newDataValidation()
      .requireValueInList(roles)
      .build();
    //set validation to cell A11
    cell.offset(2, 0).setDataValidation(buildValidation);
    cell.offset(5, 0).setDataValidation(buildValidation);
  }
}
