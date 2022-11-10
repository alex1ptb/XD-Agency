function uploadData() {
  const datasetId = data[0].datasetId;
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
    // console.log(`tableId after regex handling: ${tableId}`);

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
    // console.log(`table: ${table}`);
    // console.log(`inserting table or deleting if it exists`);

    //if table exists, delete it
    try {
      //if table exists, delete it
      BigQuery.Tables.remove(projectNumber, datasetId, tableId);
      // Create the table.
      table = BigQuery.Tables.insert(table, projectNumber, datasetId);
      Logger.log("Table created: %s", table.id);
    } catch (err) {
      Logger.log(err);
      Logger.log("unable to create table");
    }

    // Create the data upload job.
    let job = {
      configuration: {
        load: {
          destinationTable: {
            projectId: projectId,
            datasetId: datasetId,
            tableId: tableId,
          },
          skipLeadingRows: 1,
        },
      },
    };

    //sheet id
    let sheetId = data[i].sheetID;
    //convert the sheet to a csv
    let file = DriveApp.getFileById(sheetId);
    let blob = file.getBlob();

    try {
      BigQuery.Jobs.insert(job, projectNumber, blob);
    } catch (error) {
      Logger.log(error);
      console.log(`looks like uploading the job created an error`);
    }
  } //end of loop
}
