function getCurrentXdaRates(projectID, ratesSelected) {
  if (projectID == undefined) {
    projectID = "xd-agency";
  }
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

  let datasetId = "Rates";

  try {
    tables = getTableList(projectID, datasetId);
  } catch (e) {
    console.log(`error with getting tables in current rates: ${e}`);
  }
  //for each table query the table and return the data
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
        query: `SELECT role, ${ratesSelected} FROM \`${projectID}.${datasetId}.${tableName}\`
        where ${ratesSelected} is not null
        order by role`,
        useLegacySql: false,
      },
      projectID
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
