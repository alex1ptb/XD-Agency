// //Need to move this to another folder section. Just for the files that are meant for uploading to BigQuery and not the other files

// /*
//     1) Get spreadsheet
//     2) Each sheet is a table in BigQuery
//     3) Each row is a record in BigQuery
//     4) Upload each sheet to BigQuery as a table and each row as a record in the table
//     5) The dataset is the name of the spreadsheet
//     6) The table is the name of the sheet
//     7) The record is the row of the sheet

// */

// function uploadSpreadsheetToBigQuery() {
//   const projectId = "659831782100";
//   //get each sheet in the spreadsheet
//   const ss = SpreadsheetApp.getActiveSpreadsheet();
//   let datasetId = ss.getName();

//   //make datasetID a valid BigQuery dataset ID
//   datasetId = datasetId.replace(/\s/g, "_");
//   //replace ampersand with "_and_"
//   datasetId = datasetId.replace(/&/g, "_and_");

//   //if datasetId doesn't exist, create it
//   try {
//     BigQuery.Datasets.get(projectId, datasetId);
//     console.log(`dataset ${datasetId} exists`);
//   } catch (err) {
//     BigQuery.Datasets.insert(projectId, datasetId);
//     console.log(`dataset ${datasetId} being created`);
//   }

//   for (let i = 0; i < ss.getNumSheets(); i++) {
//     // Create the table.
//     // Use the name of the sheet as the table name.
//     let tableId = ss.getSheets()[i].getName();
//     //make sure tableId is a valid BigQuery table ID
//     tableId = tableId.replace(/\s/g, "_");
//     //replace ampersand with "_and_"
//     tableId = tableId.replace(/&/g, "_and_");
//     //if tableId starts with a number, add an underscore before it
//     if (tableId.match(/^\d/)) {
//       tableId = "_" + tableId;
//     }
//     //regex to handle slashes and replace them with underscores
//     tableId = tableId.replace(/\//g, "_");

//     let table = {
//       tableReference: {
//         projectId: projectId,
//         datasetId: datasetId,
//         tableId: tableId,
//       },
//       schema: {
//         fields: [{ name: "Role", type: "STRING" }],
//       },
//     };

//     //if table exists, delete it
//     try {
//       BigQuery.Tables.remove(projectId, datasetId, tableId);
//       // BigQuery.Tables.
//     } catch (err) {
//       console.log(`error in removing table: ${err}`);
//       try {
//         table = BigQuery.Tables.insert(table, projectId, datasetId);
//         console.log(`table ${tableId} created`);
//       } catch (err) {
//         console.log(`error in creating table: ${err}`);
//       }
//     }

//     //////BELOW I NEED TO WORK ON

//     //grab the data from the sheet
//     const datafromSheet = ss.getSheets()[i].getDataRange().getValues();

//     // Create the table.
//     let csvFileId = "1tAJVIBvZ69JeM_S2sIZmppr1cnuHOTTMWpAwfjjaZTY";
//     // ss.getSheets()[i].getSheetId
//     // Load CSV data from Drive and convert to the correct format for upload.
//     const file = DriveApp.getFileById(csvFileId);
//     const data = file.getBlob().setContentType("application/octet-stream");

//     // Create the data upload job.
//     let job = {
//       configuration: {
//         load: {
//           destinationTable: {
//             projectId: projectId,
//             datasetId: datasetId,
//             tableId: tableId,
//           },
//           autodetect: true,
//           writeDisposition: "WRITE_TRUNCATE",
//         },
//       },
//     };
//     //upload the data from the sheet to the table in BigQuery

//     // Load the data.
//     try {
//       job = BigQuery.Jobs.insert(job, projectId, data);
//       Logger.log("Job created: %s", job.id);
//     } catch (err) {
//       Logger.log(`error in Job creation: ${err}`);
//     }
//   }
// }
