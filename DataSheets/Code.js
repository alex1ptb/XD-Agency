/*
    1) Get spreadsheet
    2) Each sheet is a table in BigQuery
    3) Each row is a record in BigQuery
    4) Upload each sheet to BigQuery as a table and each row as a record in the table 
    5) The dataset is the name of the spreadsheet
    6) The table is the name of the sheet
    7) The record is the row of the sheet

*/

function uploadSpreadsheetToBigQuery() {
  //get each sheet in the spreadsheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  /////////////////////////
  //Data set - break this out into a function
  // const datasetId = ss.getName();

  let datasetId = ss.getName();

  //make datasetID a valid BigQuery dataset ID
  datasetId = datasetId.replace(/\s/g, "_");
  //replace ampersand with "_and_"
  datasetId = datasetId.replace(/&/g, "_and_");

  //if datasetId doesn't exist, create it
  try {
    BigQuery.Datasets.get(projectNumber, datasetId);
  } catch (err) {
    BigQuery.Datasets.insert(projectNumber, datasetId);
  }

  for (let i = 0; i < ss.getNumSheets(); i++) {
    // Create the table.
    // Use the name of the sheet as the table name.
    let tableId = ss.getSheets()[i].getName();
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
    }
    // Create the table.
    Logger.log("Table created: %s", table.id);

    let csvFileId = "1tAJVIBvZ69JeM_S2sIZmppr1cnuHOTTMWpAwfjjaZTY";
    // ss.getSheets()[i].getSheetId
    // Load CSV data from Drive and convert to the correct format for upload.
    const file = DriveApp.getFileById(csvFileId);
    const data = file.getBlob().setContentType("application/octet-stream");
    Logger.log(i);
    // Create the data upload job.
    let job = {
      configuration: {
        load: {
          destinationTable: {
            projectId: projectNumber,
            datasetId: datasetId,
            tableId: tableId,
          },
          autodetect: true,
          writeDisposition: "WRITE_TRUNCATE",
        },
      },
    };
    //upload the data from the sheet to the table in BigQuery

    // Load the data.
    try {
      job = BigQuery.Jobs.insert(job, projectNumber, data);
      Logger.log("Job created: %s", job.id);
    } catch (err) {
      Logger.log(`error: ${err}`);
    }
  }
}
