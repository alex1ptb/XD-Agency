/*
  Getting all tables in the dataset and returning them as an object
  Current dataset id: Rates
*/

function getTableList(data) {
  let datasetId = data;
  //console.log(`datasetId: ${datasetId}`);
  //if data is not defined, use "Rates" as the dataset id
  if (!datasetId) {
    datasetId = "Rates";
  }
  let tables = BigQuery.Tables.list(projectId, datasetId);
  return tables;
}
