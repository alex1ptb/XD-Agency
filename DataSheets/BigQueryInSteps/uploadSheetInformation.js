/*
    Take the spreadsheet data and upload it into Bigquery
    1) dataset Id is the name of the 
*/

//write the data to bigquery
//data comes from the spreadsheet in the form of an array of objects
// function uploadSheetInformation(data) {
//   const datasetId = data[0].datasetId;
//   //if dataset doesn't exist, create it
//   const dataset = BigQuery.Dataset(datasetId);
//   if (!dataset.exists()) {
//     console.log(`dataset ${datasetId} does not exist, creating it`);
//     dataset.create();
//   }
//   //create a table for each sheet
//   for (let i = 0; i < data.length; i++) {
//     const tableId = data[i].sheetName;
//     const table = dataset.table(tableId);
//     if (!table.exists()) {
//       console.log(`table ${tableId} does not exist, creating it`);
//       table.create({
//         schema: {
//           fields: data[i].headers,
//         },
//       });
//     }
//     //////////////////////////////
//     // Load CSV data from Drive and convert to the correct format for upload.
//     const file = DriveApp.getFileById(data[i].sheetId);
//     const data = file.getBlob();
//     //  .setContentType("application/octet-stream");
//     // Logger.log(i);
//     // Create the data upload job.
//     let job = {
//       configuration: {
//         load: {
//           destinationTable: {
//             projectId: projectId,
//             datasetId: datasetId,
//             tableId: tableId,
//           },
//           skipLeadingRows: 1,
//         },
//       },
//     };
//     //insert the job into the table
//     try {
//       //if job exists, delete it?
//       BigQuery.Jobs.delete(projectId, datasetId, tableId);
//       // insert the job into the table
//       BigQuery.Jobs.insert(job, projectId, data);
//       Logger.log(
//         "Load job started. Check on the status of it here: " +
//           "https://bigquery.cloud.google.com/jobs/%s",
//         projectId
//       );
//     } catch (err) {
//       Logger.log(err);
//       Logger.log("unable to insert job");
//     }
//     ///i///////////////////////////
//     //insert the data into the table
//     const rows = data[i].rows;
//     for (let j = 1; j < rows.length; j++) {
//       //skip the first row, which is the header
//       if (j === 1) {
//         continue;
//       }
//       table.insert(rows[j]);
//     }
//   }
//   //for each object in the data array create a table in bigquery
//   for (let i = 0; i < data.length; i++) {
//     const sheetName = data[i].sheetName;
//     const data = data[i].rows;
//     //
//   }
// }
