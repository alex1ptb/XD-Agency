//guery the dataset for each table
//for each table in the dataset get the contents of the table
//for each row in the table get the contents of the row
//return the contents of the table as an array of objects
//push this array of objects to an array of arrays of the tables in the dataset
//use the table name as the key for the array of arrays

function queryData() {
  //bigquery dataset id = "xd-agency:Rates"
  const datasetId = "Rates";
  //query bigquery for list of table names from dataset Rates
  // List all tables in the dataset
  const tables = BigQuery.Tables.list(projectId, datasetId);
  let names = [];
  tables.tables.forEach((table) => {
    names.push(table.id.split(".")[1]);
  });
  //   return names;

  //for each table in the dataset get the contents of the table
  //for each row in the table get the contents of the row
  //return the contents of the table as an array of objects
  //push this array of objects to an array of arrays of the tables in the dataset
  //use the table name as the key for the array of arrays
  let tableData = {};
  names.forEach((name) => {
    let query = `SELECT * FROM \`${projectId}.${datasetId}.${name}\``;
    let rows = BigQuery.Jobs.query(query);
    let data = [];
    rows.rows.forEach((row) => {
      data.push(row);
    });
    tableData[name] = data;
  });
  return tableData;
}
