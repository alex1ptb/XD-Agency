//for each sheet run the upload function
// function upload() {
//   const sheet = SpreadsheetApp.getActiveSheet();
//   const project_id = "xd-agency";
//   const data_set_id = SpreadsheetApp.getActiveSpreadsheet().getName();
//   const table_id = sheet.getName();
//   const range = sheet.getDataRange();
//   const writeDisposition = "WRITE_EMPTY";
//   const has_header = true;
//   const schema_bq = {
//     //string Role
//     fields: [{ name: "Role", type: "STRING" }],
//   }; //end schema_bq
//   // "automatic";

function upload_individual_sheet() {
  const project_id = "xd-agency";
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getDataRange();
  const data = range.getValues();
  const data_set_id = SpreadsheetApp.getActiveSpreadsheet().getName();
  const table_id = sheet.getName();
  const writeDisposition = "WRITE_EMPTY";
  const has_header = true;
  // const schema_bq = {
  //   //string Role
  //   // fields: [{ name: "Role", type: "STRING" }],
  // }; //end schema_bq

  upload_to_BigQ(
    range,
    project_id,
    data_set_id,
    table_id,
    writeDisposition,
    has_header
    // schema_bq
  ); //end upload_to_BigQ
}

//make a function to loop through the sheets and upload them to BigQuery
function upload_each_sheet() {
  const sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  for (let i = 0; i < sheets.length; i++) {
    const project_id = "xd-agency";
    const sheet = sheets[i];
    const range = sheet.getDataRange();
    const data = range.getValues();
    const data_set_id = SpreadsheetApp.getActiveSpreadsheet().getName();
    const table_id = sheet.getName();
    const writeDisposition = "WRITE_EMPTY";
    const has_header = true;
    // const schema_bq = {
    //   //string Role
    //   // fields: [{ name: "Role", type: "STRING" }],
    // }; //end schema_bq

    upload_to_BigQ(
      range,
      project_id,
      data_set_id,
      table_id,
      writeDisposition,
      has_header
      // schema_bq
    ); //end upload_to_BigQ
  } //end upload
}

function upload_to_BigQ(
  range,
  projectId,
  datasetId,
  tableId,
  writeDisposition,
  has_header,
  // schema_bq
) {
  //Delete tables then begin
  BigQuery.Tables.remove(projectNumber, datasetId, tableId);
  console.log("uploading to BigQuery");
  if (typeof writeDisposition == "undefined") {
    writeDisposition = "WRITE_EMPTY";
    i;
  }

  if (typeof has_header == "undefined" || has_header == true) {
    console.log("has_header is true");
    has_header = 1;
  } else {
    has_header = 0;
    console.log("has_header is false");
  }

  var data = range.getValues(); //get the data from the sheet
  console.log("data is: " + data);
  console.log(`data length is: ${data.length}`);
  var csvFile = undefined; //create a variable to hold the csv file

  if (data.length > 1) {
    var csv = ""; //create a variable to hold the csv data
    for (var row = 0; row < data.length; row++) {
      //loop through the rows
      for (var col = 0; col < data[row].length; col++) {
        //loop through the columns
        if (data[row][col].toString().indexOf(",") != -1) {
          //if there is a comma in the data cell value (i.e. it is a string) then surround it with double quotes (") and escape any double quotes within the string with another double quote (")
          data[row][col] = '"' + data[row][col] + '"';
        } //end if
      } //end for col
      // join each row's columns
      // add a carriage return to end of each row, except for the last one
      if (row < data.length - 1) {
        csv += data[row].join(",") + "\r\n"; //add carriage return to end of each row
      } else {
        csv += data[row]; //last row
      }
    }
    csvFile = csv;
  }

  //   return csvFile;

  var csv_name = "temp_" + new Date().getTime() + ".csv";
  try {
    DriveApp.createFile(csv_name, csvFile);
    console.log(`file ${csv_name} created`);
  } catch (e) {
    console.log(`error creating file: ${e}`);
  }
  var files = DriveApp.getFilesByName(csv_name);
  console.log(`original files: ${files}`);
  while (files.hasNext()) {
    console.log(`files has Next`);
    //loop through the files
    var file = files.next(); //get the file
    var table = {
      tableReference: {
        projectId: projectId,
        datasetId: datasetId,
        tableId: tableId,
      },
      schema: {
        //string Role
        // fields: [{ name: "Role", type: "STRING" }],
      },
    };
    console.log(`table is: ${table}`);
    try {
      table = BigQuery.Tables.insert(table, projectId, datasetId);
    } catch (e) {
      console.log(e);
    }

    var data = file.getBlob().setContentType("application/octet-stream");

    if (
      typeof schema_bq == "undefined" ||
      schema_bq == false ||
      schema_bq == "automatic"
    ) {
      console.log("schema_bq is undefined");
      // Create the data upload job.
      var job = {
        configuration: {
          load: {
            destinationTable: {
              projectId: projectId,
              datasetId: datasetId,
              tableId: tableId,
            },
            skipLeadingRows: has_header,
            schema: {
              //string Role
              fields: [{ name: "Role", type: "STRING" }],
            },
            autodetect: true,
            writeDisposition: writeDisposition,
          },
        },
      };
    } else {
      // Create the data upload job.
      var job = {
        configuration: {
          load: {
            destinationTable: {
              projectId: projectId,
              datasetId: datasetId,
              tableId: tableId,
            },
            skipLeadingRows: has_header,
            schema: {
              //string Role
              fields: [{ name: "Role", type: "STRING" }],
            },
            writeDisposition: writeDisposition,
          },
        },
      };
    } //end if schema_bq
    try {
      job = BigQuery.Jobs.insert(job, projectId, data);
      console.log("Job Inserted")
    } catch (e) {
      console.log(e);
    }

    file.setTrashed(true); // delete the file
  } //end while
  //toast the user
  var toast = "Data uploaded to BigQuery";
  SpreadsheetApp.getActiveSpreadsheet().toast(toast);
} //end upload_to_BigQ
