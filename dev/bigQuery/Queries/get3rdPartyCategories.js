function get3rdPartyCategories() {
  let datasetId = "3rd_Party_Categories";
  let tables = getTableList(datasetId);
  //for each table query the table and return the data
  let tableArray = [];
  //console.log(tables);

  tables.tables.forEach((table) => {
    const tableName = table.id.split(".")[1];
    //replace colon with .
    let tableId = table.id;
    //console.log(`tableName: ${tableName}`);
    //console.log(`tableId: ${tableId}`);
    //using regex replace the : with .
    tableId = tableId.replace(/:/g, ".");
    //query the table for the data wanted
    const tableQuery = BigQuery.Jobs.query(
      {
        query: `SELECT Role FROM \`${projectId}.${datasetId}.${tableName}\`
        order by role`,
        useLegacySql: false,
      },
      projectId
    );
    // console.log(tableQuery)
    //create array to hold the data
    let rows = [];
    //push the rows into an array
    tableQuery.rows.forEach((row) => {
      let rowArray = [];
      rowArray.push(row.f[0].v); //role
      // console.log( `tableQuery Row value: ${row}`)
      // rowArray.push(row.f[1].v); //xda_2022_standard
      rows.push(rowArray);
      // console.log(`rows: ${rows}`)
    });
    //push the table name and data into an array
    tableArray.push({
      tableId: tableName,
      tableData: rows,
    })
    console.log(`tableArray: ${tableArray}`);
  });
  //return each table and its data
  console.log(tableArray)
  return tableArray;
};
