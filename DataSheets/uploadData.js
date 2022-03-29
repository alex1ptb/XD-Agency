function uploadData() {
  //data has already checked if dataset id exists and has created if not
  //noew we check if table exists and create if not

  //loop through the data array
  for (let i = 0; i < data.length; i++) {
    //create the table
    let tableId = data[i].sheetName;
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
    //create the table
    let table = {
      tableReference: {
        projectId: projectNumber,
        datasetId: datasetId,
        tableId: tableId,
      },
      schema: {
        fields: [{ name: "Role", type: "STRING" }],
      },
    };
    //if table exists, delete it
    try {
      BigQuery.Tables.remove(projectNumber, datasetId, tableId);
      // BigQuery.Tables.
    } catch (err) {
      Logger.log(`error: ${err}`);
      table = BigQuery.Tables.insert(table, projectNumber, datasetId);
      //create the table
    }
  }
}
