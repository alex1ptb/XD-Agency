/*
  Getting all tables in the dataset and returning them as an object
  Current dataset id: Rates
*/

//Current concerns, OAuth issue with depreciated API, need to update the scope and see whats going on within the new API call
function getTableList(projectID, data) {
  if (projectID == null) {
    projectID = "xd-agency";
  }
  let datasetId = data;
  //if data is not defined, use "Rates" as the dataset id
  if (!datasetId) {
    datasetId = "Rates";
  }
  let tables = BigQuery.Tables.list(projectID, datasetId);
  try {
    return tables;
  } catch (e) {
    return console.log(`Error getting tables: ${e}`);
  }
}
