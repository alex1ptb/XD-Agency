/**
 * Loads a CSV into BigQuery
 */
//similar found here: https://www.youtube.com/watch?v=MonQPFuFKSk&t=79s

function loadCsv() {
  // Replace this value with the project ID listed in the Google
  // Cloud Platform project.
  const projectId = "659831782100";
  // Create a dataset in the BigQuery UI (https://bigquery.cloud.google.com)
  // and enter its ID below.
  //name of datasetId is the name of the spreadsheet
  const datasetId = SpreadsheetApp.getActiveSpreadsheet().getName();
  // const datasetId = "Role_Prices";
  //**** CHANGE THIS TO BE DYNAMIC */
  //file id from Drive
  // const csvFileId = "1AUIU4P9OWOqVsiCRERQzLAWbLvG2xiCEpX5BzeWZXqc";
  let csvFileId = "";

  //get active spreadsheet and do the following for each sheet
  //
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  for (let i = 0; i < ss.getNumSheets(); i++) {
    // Create the table.
    // Use the name of the sheet as the table name.
    let tableId = ss.getSheets()[i].getName();
    let table = {
      tableReference: {
        projectId: projectId,
        datasetId: datasetId,
        tableId: tableId,
      },
      schema: {
        fields: [
          // { name: "Role", type: "STRING" },
          // { name: "XDA_2022_Standard", type: "INTEGER" },
          // { name: "XDA_2021_Standard", type: "INTEGER" },
          // { name: "MBUSA_2022", type: "INTEGER" },
          // { name: "Porsche_2020", type: "INTEGER" },
          // { name: "Porsche_2019", type: "INTEGER" },
          // { name: "ACCENTURE_2021", type: "INTEGER" },
          // { name: "CISCO_2022", type: "INTEGER" },
          // { name: "Old_2019_MBUSA", type: "INTEGER" },
        ],
      }, // end schema
    }; // end table

    try {
      //if table exists, delete it
      BigQuery.Tables.delete(projectId, datasetId, tableId);
      // Create the table.
      table = BigQuery.Tables.insert(table, projectId, datasetId);
      Logger.log("Table created: %s", table.id);
    } catch (err) {
      Logger.log(err);
      Logger.log("unable to create table");
    }

    // Load CSV data from Drive and convert to the correct format for upload.
    const file = DriveApp.getFileById(csvFileId);
    const data = file.getBlob();
    //  .setContentType("application/octet-stream");
    // Logger.log(i);

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
    try {
      //if job exists, delete it?
      BigQuery.Jobs.delete(projectId, datasetId, tableId);
      // insert the job into the table
      BigQuery.Jobs.insert(job, projectId, data);
      Logger.log(
        "Load job started. Check on the status of it here: " +
          "https://bigquery.cloud.google.com/jobs/%s",
        projectId
      );
    } catch (err) {
      Logger.log(err);
      Logger.log("unable to insert job");
    }
  }
}
