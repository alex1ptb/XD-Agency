/*
  Getting all tables in the dataset and returning them as an array or object
  Current dataset id: Rates
*/

function getTableList(data) {
  let datasetId = (data = "") ? data : "Rates";
  let tables = BigQuery.Tables.list(projectId, datasetId);
  return tables;
}
