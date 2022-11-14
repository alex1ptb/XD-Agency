function get3rdPartyCategories() {
  console.log(`getting 3rd party categories from BigQuery`);
  let datasetId = "3rd_Party_Categories";
  console.log(`projectId is: ${projectId}`);
  let tables = getTableList(projectId, datasetId);
  //for each table query the table and return the data
  let tableArray = [];
  //console.log(tables);

  tables.tables.forEach((table) => {
    const tableName = table.id.split(".")[1];
    //replace colon with .
    let tableId = table.id;
    //using regex replace the : with .
    tableId = tableId.replace(/:/g, ".");
    //query the table for the data wanted
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
