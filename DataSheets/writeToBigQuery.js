//write the data to bigquery
function writeToBigQuery(data) {
  const datasetId = data[0].datasetId;

  //if dataset doesn't exist, create it
  const dataset = BigQuery.Dataset(datasetId);
  if (!dataset.exists()) {
    dataset.create();
  }

  //create a table for each sheet
  for (let i = 0; i < data.length; i++) {
    const tableId = data[i].sheetName;
    const table = dataset.table(tableId);
    if (!table.exists()) {
      table.create({
        schema: {
          fields: data[i].headers,
        },
      });
    }
    //insert the data into the table
    const rows = data[i].rows;
    for (let j = 1; j < rows.length; j++) {
      table.insert(rows[j]);
    }
  }

  //for each object in the data array create a table in bigquery

  for (let i = 0; i < data.length; i++) {
    const sheetName = data[i].sheetName;
    const data = data[i].rows;

    //
  }
}
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
  const datasetId = "Role_Prices";
  //file id from Drive
  const csvFileId = "1AUIU4P9OWOqVsiCRERQzLAWbLvG2xiCEpX5BzeWZXqc";

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
          { name: "Role", type: "STRING" },
          { name: "XDA_2022_Standard", type: "INTEGER" },
          { name: "XDA_2021_Standard", type: "INTEGER" },
          { name: "MBUSA_2022", type: "INTEGER" },
          { name: "Porsche_2020", type: "INTEGER" },
          { name: "Porsche_2019", type: "INTEGER" },
          { name: "ACCENTURE_2021", type: "INTEGER" },
          { name: "CISCO_2022", type: "INTEGER" },
          { name: "Old_2019_MBUSA", type: "INTEGER" },
        ],
      },
    };

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

//old code
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
  const datasetId = "Role_Prices";
  //file id from Drive
  const csvFileId = "1AUIU4P9OWOqVsiCRERQzLAWbLvG2xiCEpX5BzeWZXqc";

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
          { name: "Role", type: "STRING" },
          { name: "XDA_2022_Standard", type: "INTEGER" },
          { name: "XDA_2021_Standard", type: "INTEGER" },
          { name: "MBUSA_2022", type: "INTEGER" },
          { name: "Porsche_2020", type: "INTEGER" },
          { name: "Porsche_2019", type: "INTEGER" },
          { name: "ACCENTURE_2021", type: "INTEGER" },
          { name: "CISCO_2022", type: "INTEGER" },
          { name: "Old_2019_MBUSA", type: "INTEGER" },
        ],
      },
    };

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
