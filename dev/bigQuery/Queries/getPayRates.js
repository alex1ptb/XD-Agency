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
      let rowArray = [];
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
