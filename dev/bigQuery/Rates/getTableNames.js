/*
  Getting all tables in the dataset and returning them as an array or object
  Current dataset id: Rates
*/

function getTableNames() {
  //bigquery dataset id = "xd-agency:Rates"
  const datasetId = "Rates";
  //query bigquery for list of table names from dataset Rates
  // List all tables in the dataset
  const tables = BigQuery.Tables.list(projectId, datasetId);
  let names = [];
  tables.tables.forEach((table) => {
    names.push(table.id.split(".")[1]);
  });
  return names;
}
