getCurrentXdaRates = () => {
  let datasetId = "Rates";
  let tables = getTableList();
  //for each table query the table and return the data
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
        query: `SELECT role,xda_2022_standard FROM \`${projectId}.${datasetId}.${tableName}\`
        where xda_2022_standard is not null
        order by role`,
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
      rowArray.push(row.f[1].v); //xda_2022_standard
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
};
