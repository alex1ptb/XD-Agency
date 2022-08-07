///////////////////////////////
/*
The best way to go about this would be to pull in the namedRanges.
For each category found in the named ranges, add up the total under their respective named ranges, which would be:     
    sheetName_category_XD_SubTotalSell -- this is the total of the XD category
    sheetName_category_XD_SubTotalHour -- this is the total hours per category for XD sections
    sheetName_category_
Push the totals to an array, and then use the array to update the totals in the named ranges.
I am going to have this run and check on edit. It will use the category of the edited section and find the relevant named ranges that will need to be upated. I don't want this to run for every category when it should only upate the edited category information

variables being pulled in:
ss = Spreadsheet object
category = the category of the section that was edited


*/

///////////////////////////////

function updateCategoryInformation(ss, category) {
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

  console.log(`updating category information for ${category}`);
  console.log(`updateBudgetHours: ${Number}`);
  //set arrays for the totals
  let XD_SubTotalSell = [];
  let XD_SubTotalHour = [];
  let Freelance_SubTotalSell = [];
  let Freelance_SubTotalHour = [];

  //get all named ranges and filter out the ones that are not `nameOfASheet_category_XD_SubTotalSell`
  let namedRanges = ss.getNamedRanges();
  let namedRangesToUpdate = namedRanges.filter(
    (namedRange) =>
      namedRange.getName().includes(`${category}_XD_SubTotalSell`) ||
      namedRange.getName().includes(`${category}_XD_SubTotalHour`) ||
      namedRange.getName().includes(`${category}_XD_Freelancer_SubTotalSell`) ||
      namedRange.getName().includes(`${category}_XD_Freelancer_SubTotalHours`)
  );
  // go through each named range and get the totals for the category and push them to the appropriate array
  for (let i = 0; i < namedRangesToUpdate.length; i++) {
    console.log(`getting info from: ${namedRangesToUpdate[i].getName()}`);
    let range = namedRangesToUpdate[i].getRange();
    let sheetName = range.getSheet().getName();
    // let category = sheetName.split("_")[1];
    let total = range.getValue();
    // console.log(`${category} total: ${total}`);
    if (
      namedRangesToUpdate[i].getName().includes(`${category}_XD_SubTotalSell`)
    ) {
      XD_SubTotalSell.push(total);
    } else if (
      namedRangesToUpdate[i].getName().includes(`${category}_XD_SubTotalHours`)
    ) {
      XD_SubTotalHour.push(total);
    } else if (
      namedRangesToUpdate[i]
        .getName()
        .includes(`${category}_XD_Freelancer_SubTotalSell`)
    ) {
      Freelance_SubTotalSell.push(total);
    } else if (
      namedRangesToUpdate[i]
        .getName()
        .includes(`${category}_XD_Freelancer_SubTotalHours`)
    ) {
      Freelance_SubTotalHour.push(total);
    }
  } //end of namedRangesToUpdate.forEach
  //check the values of the arrays in the console
  //push the info below the named range "ProjectInformationSummary_BudgetedHours"
  let topRowOfBudgetHours = ss.getRangeByName(
    "ProjectInformationSummary_BudgetedHours"
  );
  //now that we have the row, we need to put the XD_SubTotalSell in the appropriate columns 1 row below the topTargetRow. The column will be updateBudgetHours
  console.log(`XD_SubTotalHour: ${XD_SubTotalHour}`);
  topRowOfBudgetHours
    .offset(1, Number, 1, 1)
    .setValue(XD_SubTotalHour.reduce((a, b) => a + b, 0));

  console.log(`Freelance_SubTotalHour: ${Freelance_SubTotalHour}`);
  topRowOfBudgetHours
    .offset(2, Number, 1, 1)
    .setValue(Freelance_SubTotalHour.reduce((a, b) => a + b, 0));

  //Now to update the section "ProjectInformationSummary_BudgetedSell"
  let columnOfBudgetSell = ss.getRangeByName(
    "ProjectInformationSummary_BudgetedSell"
  );
  columnOfBudgetSell
    .offset(Number, 2, 1, 1)
    .setValue(XD_SubTotalSell.reduce((a, b) => a + b, 0));

  columnOfBudgetSell
    .offset(Number, 1, 1, 1)
    .setValue(Freelance_SubTotalSell.reduce((a, b) => a + b, 0));
  // console.log(`Freelance_SubTotalSell: ${Freelance_SubTotalSell}`);
  // console.log(`XD_SubTotalSell: ${XD_SubTotalSell}`);
  //get the named ranges for the category
}

//update the totals in the named ranges
