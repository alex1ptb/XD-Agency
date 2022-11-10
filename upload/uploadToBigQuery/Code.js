"use strict";

//folder of spreadsheets
/**
 * Creates a menu in the UI.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Sheets to BigQuery")
    .addItem("Upload", "runFromUI")
    .addToUi();
}

/**
 * Function to run from the UI menu.
 *
 * Uploads the sheets defined in the active sheet into BigQuery.
 */
function runFromUI() {
  // Column indices.
  const SHEET_URL = 0;
  const PROJECT_ID = 1;
  const DATASET_ID = 2;
  const TABLE_ID = 3;
  const APPEND = 4;
  const STATUS = 5;

  // Get the data range rows, skipping the header (first) row.
  let sheet = SpreadsheetApp.getActiveSheet();
  let rows = sheet.getDataRange().getValues().slice(1);

  // Run the sheetToBigQuery function for every row and write the status.
  rows.forEach((row, i) => {
    let status = sheetToBigQuery(
      row[SHEET_URL],
      row[PROJECT_ID],
      row[DATASET_ID],
      row[TABLE_ID],
      row[APPEND]
    );
    sheet.getRange(i + 2, STATUS + 1).setValue(status);
  });
}

/**
 * Uploads a single sheet to BigQuery.
 *
 * @param {string} sheetUrl - The Google Sheet Url containing the data to upload.
 * @param {string} projectId - Google Cloud Project ID.
 * @param {string} datasetId - BigQuery Dataset ID.
 * @param {string} tableId - BigQuery Table ID.
 * @param {bool} append - Appends to BigQuery table if true, otherwise replaces the content.
 *
 * @return {string} status - Returns the status of the job.
 */
function sheetToBigQuery(sheetUrl, projectId, datasetId, tableId, append) {
  try {
    createDatasetIfDoesntExist(projectId, datasetId);
  } catch (e) {
    return `${e}: Please verify your "Project ID" exists and you have permission to edit BigQuery`;
  }

  let sheet;
  try {
    sheet = openSheetByUrl(sheetUrl);
  } catch (e) {
    return `${e}: Please verify the "Sheet URL" is pasted correctly`;
  }

  // Get the values from the sheet's data range as a matrix of values.
  let rows = sheet.getDataRange().getValues();

  // Normalize the headers (first row) to valid BigQuery column names.
  // https://cloud.google.com/bigquery/docs/schemas#column_names
  rows[0] = rows[0].map((header) => {
    header = header.toLowerCase().replace(/[^\w]+/g, "_");
    if (header.match(/^\d/)) header = "_" + header;
    return header;
  });

  // Create the BigQuery load job config. For more information, see:
  // https://developers.google.com/apps-script/advanced/bigquery
  let loadJob = {
    configuration: {
      load: {
        destinationTable: {
          projectId: projectId,
          datasetId: datasetId,
          tableId: tableId,
        },
        autodetect: true, // Infer schema from contents.
        writeDisposition: append ? "WRITE_APPEND" : "WRITE_TRUNCATE",
      },
    },
  };

  // BigQuery load jobs can only load files, so we need to transform our
  // rows (matrix of values) into a blob (file contents as string).
  // For convenience, we convert the rows into a CSV data string.
  // https://cloud.google.com/bigquery/docs/loading-data-local
  let csvRows = rows.map((values) =>
    // We use JSON.stringify() to add "quotes to strings",
    // but leave numbers and booleans without quotes.
    // If a string itself contains quotes ("), JSON escapes them with
    // a backslash as \" but the CSV format expects them to be
    // escaped as "", so we replace all the \" with "".
    values.map((value) => JSON.stringify(value).replace(/\\"/g, '""'))
  );
  let csvData = csvRows.map((values) => values.join(",")).join("\n");
  let blob = Utilities.newBlob(csvData, "application/octet-stream");

  // Run the BigQuery load job.
  try {
    BigQuery.Jobs.insert(loadJob, projectId, blob);
  } catch (e) {
    return e;
  }

  Logger.log(
    "Load job started. Click here to check your jobs: " +
      `https://console.cloud.google.com/bigquery?project=${projectId}&page=jobs`
  );

  // The status of a successful run contains the timestamp.
  return `Last run: ${new Date()}`;
}

/**
 * Creates a dataset if it doesn't exist, otherwise does nothing.
 *
 * @param {string} projectId - Google Cloud Project ID.
 * @param {string} datasetId - BigQuery Dataset ID.
 */
function createDatasetIfDoesntExist(projectId, datasetId) {
  try {
    BigQuery.Datasets.get(projectId, datasetId);
  } catch (err) {
    let dataset = {
      datasetReference: {
        projectId: projectId,
        datasetId: datasetId,
      },
    };
    BigQuery.Datasets.insert(dataset, projectId);
    Logger.log(`Created dataset: ${projectId}:${datasetId}`);
  }
}

/**
 * Opens the spreadsheet sheet (tab) with the given URL.
 *
 * @param {string} sheetUrl - Google Sheet Url.
 *
 * @returns {Sheet} - The sheet corresponding to the URL.
 *
 * @throws Throws an error if the sheet doesn't exist.
 */
function openSheetByUrl(sheetUrl) {
  // Extract the sheet (tab) ID from the Url.
  let sheetIdMatch = sheetUrl.match(/gid=(\d+)/);
  let sheetId = sheetIdMatch ? sheetIdMatch[1] : null;

  // From the open spreadsheet, get the sheet (tab) that matches the sheetId.
  let spreadsheet = SpreadsheetApp.openByUrl(sheetUrl);
  let sheet = spreadsheet
    .getSheets()
    .filter((sheet) => sheet.getSheetId() == sheetId)[0];
  if (!sheet) throw "Sheet tab ID does not exist";

  return sheet;
}

//function to grab every spreadsheet id in the folder and return it as an array
function getSpreadsheetIds() {
  const folderID = "1riR-xe63c1Bu-Xo-dyjRxnbG3CMDpEk7";
  var folder = DriveApp.getFolderById(folderID);
  var files = folder.getFiles();
  var spreadsheetIds = [];
  while (files.hasNext()) {
    var file = files.next();
    spreadsheetIds.push(file.getId());
  }
  console.log(spreadsheetIds);
  return spreadsheetIds;
}

//function go through spreadsheet and grab the following information:
// spreadsheet name, -- DatasetID
// sheet name, -- TableID
// sheet url, -- SheetURL
// project id -- ProjectID  (this is the same for all spreadsheets)
function getSpreadsheetInfo() {
  let spreadsheetIds = getSpreadsheetIds();
  const projectID = "xd-agency-367108";
  let spreadsheetInfo = [];
  for (let i = 0; i < spreadsheetIds.length; i++) {
    let spreadsheet = SpreadsheetApp.openById(spreadsheetIds[i]);
    let id = spreadsheetIds[i];
    let spreadsheetName = spreadsheet.getName();
    let sheets = spreadsheet.getSheets();
    for (let j = 0; j < sheets.length; j++) {
      let sheetName = sheets[j].getName();
      let sheetId = sheets[j].getSheetId();
      spreadsheetInfo.push({
        spreadsheetName,
        id,
        sheetName,
        sheetId,
        projectID,
      });
    }
  }
  console.log(spreadsheetInfo);
  return spreadsheetInfo;
}

//function to take the spreadsheet info and push to sheet to be used by the script
function pushSpreadsheetInfoToSheet() {
  let spreadsheetInfo = getSpreadsheetInfo();
  let sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("sheetsToUpload");
  sheet.clear();
  //row 1 is the header with Sheet URL, Project ID, Dataset ID, Table ID, Append?, Status
  sheet.appendRow([
    "Sheet URL",
    "Project ID",
    "Dataset ID",
    "Table ID",
    "Append?",
    "Status",
  ]);

  //sheet url is https://docs.google.com/spreadsheets/d/{info.id}/edit#gid={info.sheetId}
  //project id is info.projectID
  //dataset id is info.spreadsheetName
  //table id is info.sheetName
  //append is false
  //status is blank

  for (let i = 0; i < spreadsheetInfo.length; i++) {
    let info = spreadsheetInfo[i];
    let sheetUrl = `https://docs.google.com/spreadsheets/d/${info.id}/edit#gid=${info.sheetId}`;
    let projectId = info.projectID;
    let datasetId = info.spreadsheetName;
    let tableId = info.sheetName;
    let append = false;
    let status = "";
    sheet.appendRow([sheetUrl, projectId, datasetId, tableId, append, status]);
  }
}
