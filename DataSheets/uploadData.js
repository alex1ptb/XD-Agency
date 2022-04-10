function uploadData() {
  //data has already checked if dataset id exists and has created if not
  //now we check if table exists and create if not

  //loop through the data array
  for (let i = 0; i < data.length; i++) {
    //create the table using the sheet name
    let tableId = data[i].sheetName;

    // *****REGEX****
    //make sure tableId is a valid BigQuery table ID
    tableId = tableId.replace(/\s/g, "_");
    //replace ampersand with "_and_"
    tableId = tableId.replace(/&/g, "_and_");
    //if tableId starts with a number, add an underscore before it
    if (tableId.match(/^\d/)) {
      tableId = "_" + tableId;
    }
    //regex to handle slashes and replace them with underscores
    tableId = tableId.replace(/\//g, "_");
    // ****END REGEX****
    console.log(`tableId after regex handling: ${tableId}`);

    //create the table
    let table = {
      tableReference: {
        projectId: projectNumber,
        datasetId: data[i].datasetId,
        tableId: tableId,
      },
      schema: {
        //need to change this to be header names from the spreadsheet
        fields: [{ name: "Role", type: "STRING" }],
      },
    };
    console.log(`table: ${table}`);
    console.log(`inserting table or deleting if it exists`);
    //if table exists, delete it
    try {
      BigQuery.Tables.remove(projectNumber, data[i].datasetId, tableId);
      console.log(`table ${tableId} deleted`);
    } catch (err) {
      Logger.log(`error: ${err}`);
    }
    try {
      table = BigQuery.Tables.insert(table, projectNumber, data[i].datasetId);
      console.log(`table ${tableId} created`);
    } catch {
      console.log(`table ${tableId} already exists. error ${err}`);
    }
  }
}
