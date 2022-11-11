const ratesQuery = `SELECT role, ${ratesSelected} FROM \`${projectId}.${datasetId}.${tableName}\` where ${ratesSelected} is not null
        order by role`;
const thirdPartyDataId = "3rd_Party_Categories";
const thirdPartyQuery = `SELECT string_field_0 FROM \`${projectId}.${datasetId}.${tableName}\`
        order by string_field_0`;
const projectId = "xd-agency-367108";

function


function get3rdPartyCategories() {
  console.log(`getting 3rd party categories from BigQuery`);
  let tables = getTableList(projectId, datasetId);
  //for each table query the table and return the data
  let tableArray = [];
  tables.tables.forEach((table) => {
    const tableName = table.id.split(".")[1];
    let tableId = table.id;
    //using regex replace the : with .
    tableId = tableId.replace(/:/g, ".");
    const tableQuery = BigQuery.Jobs.query(
      {
        query: `SELECT string_field_0 FROM \`${projectId}.${datasetId}.${tableName}\`
        order by string_field_0`,
        useLegacySql: false,
      },
      projectId
    );
    //create array to hold the data
    let rows = [];
    //push the rows into an array
    tableQuery.rows.forEach((row) => {
      let rowArray = [];
      rowArray.push(row.f[0].v); //role
      rows.push(rowArray);
    });
    //push the table name and data into an array
    tableArray.push({
      tableId: tableName,
      tableData: rows,
    });
  });
  //return each table and its data
  return tableArray;
}
//Funciton  end

//Function getCurrentXdaRates start
function getCurrentXdaRates(projectId, ratesSelected) {
  if (
    ratesSelected == null ||
    ratesSelected == undefined ||
    ratesSelected == "" ||
    ratesSelected == "2022 XDA Standard"
  ) {
    ratesSelected = "xda_2022_standard";
  }

  switch (ratesSelected) {
    case "2019 MBUSA":
      ratesSelected = "old_2019_mbusa";
      break;
    case "2020 Porche":
      ratesSelected = "_2020_porsche";
      break;
    case "2022 MBUSA":
      ratesSelected = "_2022_mbusa";
      break;
    case "2019 Porche":
      ratesSelected = "_2019_porsche";
      break;
    case "2021 Accenture":
      ratesSelected = "_2021_accenture";
      break;
    case "2022 Cisco":
      ratesSelected = "cisco_2022";
      break;
    case "2021 XDA Standard":
      ratesSelected = "xda_2021_standard";
      break;
  }

  const datasetId = "Rates";

  try {
    tables = getTableList(projectId, datasetId);
  } catch (e) {
    console.log(`error with getting tables in current rates: ${e}`);
  }
  let tableArray = [];
  tables.tables.forEach((table) => {
    console.log(`getting table info for: ${table}`);
    const tableName = table.id.split(".")[1];
    //replace colon with .
    let tableId = table.id;
    //using regex replace the : with .
    tableId = tableId.replace(/:/g, ".");
    //query the table for the data wanted
    const tableQuery = BigQuery.Jobs.query(
      {
        query: `SELECT role, ${ratesSelected} FROM \`${projectId}.${datasetId}.${tableName}\`
        where ${ratesSelected} is not null
        order by role`,
        useLegacySql: false,
      },
      projectId
    );
    //create array to hold the data
    let rows = [];
    //push the rows into an array
    try {
      tableQuery.rows.forEach((row) => {
        let rowArray = [];
        rowArray.push(row.f[0].v); //role
        rowArray.push(row.f[1].v); //xda_2022_standard
        rows.push(rowArray);
      });
    } catch (e) {
      console.log(`error with getting rows in current rates: ${e}`);
    }
    //push the table name and data into an array
    tableArray.push({
      tableId: tableName,
      tableData: rows,
    });
  });
  //return each table and its data
  return tableArray;
}
//Function getCurrentXdaRates end

//Function getPayRates end
function getPayRates() {
  let datasetId = "Employee_Information";
  let tables = getTableList(projectId, "Employee_Information");
  let tableArray = [];

  tables.tables.forEach((table) => {
    const tableName = table.id.split(".")[1];
    //replace colon with .
    let tableId = table.id;
    //using regex replace the : with .
    tableId = tableId.replace(/:/g, ".");
    //query the table for the data wanted
    const tableQuery = BigQuery.Jobs.query(
      {
        query: `SELECT First_Name,Last_Name,Pay FROM \`${projectId}.${datasetId}.${tableName}\`
        `,
        useLegacySql: false,
      },
      projectId
    );
    //create array to hold the data
    let rows = [];
    //push the rows into an array
    tableQuery.rows.forEach((row) => {
      let name = [];
      let combinedName = row.f[0].v.concat(" ", row.f[1].v);
      name.push(combinedName); //first name
      name.push(row.f[2].v); //pay
      rows.push(name);
    });
    //push the table name and data into an array
    tableArray.push({
      tableId: tableName,
      tableData: rows,
    });
  });
  //return each table and its data
  return tableArray;
}
/*
  Getting all tables in the dataset and returning them as an object
  Current dataset id: Rates
*/

//Current concerns, OAuth issue with depreciated API, need to update the scope and see whats going on within the new API call
function getTableList(projectId, data) {
  if (projectId == null) {
    projectId = "xd-agency-367108";
  }
  let datasetId = data;
  //if data is not defined, use "Rates" as the dataset id
  if (!datasetId) {
    datasetId = "Rates";
  }
  let tables = BigQuery.Tables.list(projectId, datasetId);
  try {
    return tables;
  } catch (e) {
    return console.log(`Error getting tables: ${e}`);
  }
}
//Function getTableList end

//Function updateAll Start
//update the properties of the spreadsheet with the latest data from the BigQuery table
function updateAll(projectId) {
  const namedRangeSelectedRate =
    SpreadsheetApp.getActiveSpreadsheet().getRangeByName("rate_card_section");
  //delete properties.xdaRates;
  SpreadsheetApp.getActiveSpreadsheet().toast("Updating...");

  PropertiesService.getScriptProperties().setProperty(
    "xdaRates",
    JSON.stringify(
      getCurrentXdaRates(projectId, namedRangeSelectedRate.getValue())
    )
  );
  //delete properties.thirdPartyRoles;
  PropertiesService.getScriptProperties().setProperty(
    "thirdPartyRoles",
    JSON.stringify(get3rdPartyCategories())
  );
  PropertiesService.getScriptProperties().setProperty(
    "payRates",
    JSON.stringify(getPayRates())
  );
}
