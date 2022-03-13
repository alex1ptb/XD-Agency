/**
 * @OnlyCurrentDoc
 */

function myFunction() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    //add header row to each sheet from array
    var headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn());
    headerRow.setValues([
      [
        { name: "Role", type: "STRING" },
        { name: "XDA 2022 Standard", type: "INTEGER" },
        { name: "XDA 2021 Standard", type: "INTEGER" },
        { name: "2022 MBUSA", type: "INTEGER" },
        { name: "2020 Porsche", type: "INTEGER" },
        { name: "2019 Porsche", type: "INTEGER" },
        { name: "2021 ACCENTURE", type: "INTEGER" },
        { name: "CISCO 2022", type: "INTEGER" },
        { name: "Old 2019 MBUSA", type: "INTEGER" },
      ],
      //turn array into schema for bigquery
    ]);
  }
}
