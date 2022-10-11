//update total cost of each category
//LABOR COST PER CATEGORY
//cost of employee * hours totaled for each category
//cost of freelancer * hours totaled for each category

//named range column is category name
//named range is JobFinancialForm_LaborCostByServiceArea

//offset by 1 to get the first column which is the Staff cost
//offset by 2 to get the second column which is the Freelancer cost

function updateTotalCostPerCategory(ss, category) {
  console.log("IM IN updateTotalCostPerCategory");
  let Number = "";
  //switch for category
  switch (category) {
    case "Account":
      Number = 0;
      break;
    //FIX STRATEGY and MARKETING
    case "Strategy":
      Number = 1;
      break;
    case "Measurement":
      Number = 2;
      break;
    case "Digital":
      Number = 3;
      break;
    case "Creative":
      Number = 4;
      break;
    //FIX VIDEO
    case "Video":
      Number = 5;
      break;
    case "Production":
      Number = 6;
      break;
    case "Technical":
      Number = 7;
      break;
    case "Logistics":
      Number = 8;
      break;
    //FIX EXHIBITS
    case "Exhibits":
      Number = 9;
      break;
  }
  if (Number === "") {
    return;
  }

  //get roles that have matching category. The named range will end in `_Roles`
  let XDRangesToUpdate = ss
    .getNamedRanges()
    .filter((namedRange) =>
      namedRange.getName().includes(`${category}_XD_Roles`)
    );
  let Freelance_RangesToUpdate = ss
    .getNamedRanges()
    .filter((namedRange) =>
      namedRange.getName().includes(`${category}_Freelancer_SubTotalCost`)
    );

  //set arrays for the totals
  let XD_SubTotalSell = [];
  let Freelance_SubTotalSell = [];
  let padCost = [];

  // go through each named range and get the totals for the category and push them to the appropriate array
  for (let i = 0; i < XDRangesToUpdate.length; i++) {
    // console.log(`getting info from: ${namedRangesToUpdate[i].getName()}`);
    let range = XDRangesToUpdate[i].getRange();
    let values = range.getValues();
    //cost of employee * total hours
    console.log("values", values);
    //name is in column 1
    let name = values[0][1];
    if (values[0] === "Pick a Job Title") {
      return;
    }
    console.log("name", name);
    let employeePay = lookUpPayRate(name);
    console.log(`employeePay: ${employeePay}`);
    //total hours is 4th in values array
    let totalHours = values[0][4];
    console.log(`totalHours: ${totalHours}`);
    let totalCost = employeePay * totalHours;
    let padCostofRow = values[0][12];
    XD_SubTotalSell.push(totalCost);
    let totalPad = padCostofRow * totalHours;
    padCost.push(totalPad);
  } //end of namedRangesToUpdate.forEach

  //Freelance
  //just add up all the values in the range
  for (let i = 0; i < Freelance_RangesToUpdate.length; i++) {
    let range = Freelance_RangesToUpdate[i].getRange();
    let total = range.getValue();
    let padCostofRow = values[0][12];
    let totalPad = padCostofRow * totalHours;
    padCost.push(totalPad);
    Freelance_SubTotalSell.push(total);
  }
  let columnOfBudgetSell = ss.getRangeByName(
    "JobFinancialForm_LaborCostByServiceArea"
  );

  console.log("XD_SubTotalSell", XD_SubTotalSell);
  console.log("Freelance_SubTotalSell", Freelance_SubTotalSell);

  columnOfBudgetSell
    .offset(Number, 1, 1, 1)
    .setValue(XD_SubTotalSell.reduce((a, b) => a + b, 0));

  columnOfBudgetSell
    .offset(Number, 2, 1, 1)
    .setValue(Freelance_SubTotalSell.reduce((a, b) => a + b, 0));
}
