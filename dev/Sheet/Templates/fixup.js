// ////////////////////////////////////////
// //if footerRange exists, insert rows above the footer equal to the number of rows found in the copyRange
// if (footerRange) {
//   //insert the rows above the footer and do not have merged cells
//   sheet.insertRowsBefore(footerRange.getRow(), copyRange.getNumRows());
//   // //get new footerRange
//   footerRange = ss.getRangeByName(
//     `${sheet.getName()}_Footer_${partition}_Section`
//   );
//   //get the first row of the footerRange
//   footerRow = footerRange.getRow();
//   //get the starting row of the inserted rows
//   startRow = footerRow - copyRange.getNumRows();
//   // get range from start row plus numRows
//   let range = sheet.getRange(
//     startRow,
//     1,
//     copyRange.getNumRows(),
//     sheet.getLastColumn()
//   );
//   //copy the rows from the copyRange to the sheet
//   copyRange.copyTo(range);
// } //////////////////////////////////////////

// //////////////////////////////////////////
// //set the range name to ${sheetName}_{category}_${partition}_Category
// let rangeName = `${sheet.getName()}_${category}_${partition}_Section`;
// //get the range in the sheet to set the name
// let range = sheet.getRange(
//   startRow,
//   1,
//   copyRange.getNumRows(),
//   copyRange.getNumColumns()
// );
// ss.setNamedRange(rangeName, range);
// //////////////////////////////////////////

// //////////////////////////////////////////
// //add the category to the first cell of the range
// sheet.getRange(startRow, 1).setValue(category);
// if (partition == "XD") {
//   let targetRow = startRow + 2;
//   EmployeeDataValidation(targetRow, sheet);
// }
// //////////////////////////////////////////

// //////////////////////////////////////////
// //get range of new named Range
// let pasteRange = ss.getRangeByName(
//   `${sheet.getName()}_${category}_${partition}_Section`
// );

// //////////////////////////////////////////
// //the third row of pasteRange should be named {sheetName}_{category}_XD_Roles
// //set variable for 3rd row of new named range
// let thirdRow = pasteRange.getRow() + 2;

// // //set the named range for the roles
// ss.setNamedRange(
//   `${sheet.getName()}_${category}_${partition}_Roles`,
//   sheet.getRange(thirdRow, 1, 1, pasteRange.getNumColumns())
// );
// //////////////////////////////////////////
// let listOfXDRanges = ["_XD_SubTotalActualHours","_XD_SubTotalSell","_XD_SubTotalHours","_XD_SubTotalQty","_SubTotalQty"];
// let targetColumnsOfXDRanges = [17,16,7,5,3,3]
// //////////////////////////////////////////
// //update Deliverable_Template_Category_Freelancer_SubTotalQty
// if (partition == "XD") {
//   for( i=0;i< listOfXDRanges.length; i++){
//   ss.setNamedRange(
//     `${sheet.getName()}_${category}_${partition}${listOfXDRanges[i]}`,
//     sheet.getRange(pasteRange.getLastRow(), targetColumnsOfXDRanges[i])
//   );
//   }
// }
//   ss.setNamedRange(
//     `${sheet.getName()}_${category}_${partition}_SubTotalQty`,
//     sheet.getRange(pasteRange.getLastRow(), 3)
//   );

//   //update Deliverable_Template_XD_SubTotalQty
//   ss.setNamedRange(
//     `${sheet.getName()}_${category}_XD_SubTotalQty`,
//     sheet.getRange(thirdRow + 1, 3)
//   );

//   //update Deliverable_Template_Category_XD_SubTotalHours
//   ss.setNamedRange(
//     `${sheet.getName()}_${category}_XD_SubTotalHours`,
//     sheet.getRange(thirdRow + 1, 5)
//   );

//   //update Deliverable_Template_Category_XD_SubTotalSell
//   ss.setNamedRange(
//     `${sheet.getName()}_${category}_XD_SubTotalSell`,
//     sheet.getRange(thirdRow + 1, 7)
//   );

//   //update Deliverable_Template_Category_XD_SubTotalActualHours
//   ss.setNamedRange(
//     `${sheet.getName()}_${category}_XD_SubTotalActualHours`,
//     sheet.getRange(thirdRow + 1, 16)
//   );

//   //update Deliverable_Template_Category_XD_SubTotalVariance
//   ss.setNamedRange(
//     `${sheet.getName()}_${category}_XD_SubTotalVariance`,
//     sheet.getRange(thirdRow + 1, 17)
//   );

//   //////////FREELANCER//////////

// ("17;16;9;10;3;7;")
// ("_Freelancer_SubTotalVariance;_Freelancer_SubTotalActualHours;_Freelancer_SubTotalHours;_Freelancer_SubTotalCost;_Freelancer_SubTotalQty;_Freelancer_SubTotalSell;")
//   ss.setNamedRange(
//     `${sheet.getName()}_${category}_Freelancer_SubTotalSell`,
//     sheet.getRange(thirdRow + 4, 7)
//   );

//   ss.setNamedRange(
//     `${sheet.getName()}_${category}_Freelancer_SubTotalQty`,
//     sheet.getRange(thirdRow + 4, 3)
//   );

//   ss.setNamedRange(
//     `${sheet.getName()}_${category}_Freelancer_SubTotalCost`,
//     sheet.getRange(thirdRow + 4, 10)
//   );
//   ss.setNamedRange(
//     `${sheet.getName()}_${category}_Freelancer_SubTotalHours`,
//     sheet.getRange(thirdRow + 4, 9)
//   );
//   ss.setNamedRange(
//     `${sheet.getName()}_${category}_Freelancer_SubTotalActualHours`,
//     sheet.getRange(thirdRow + 4, 16)
//   );
//   ss.setNamedRange(
//     `${sheet.getName()}_${category}_Freelancer_SubTotalVariance`,
//     sheet.getRange(thirdRow + 4, 17)
//   );
//   //////////////////////////////////////////

//   //////////////////////////////////////////
//   //set variable for 6th row of new named range
//   let sixthRow = pasteRange.getRow() + 5;

//   //set the named range for the roles
//   ss.setNamedRange(
//     `${sheet.getName()}_${category}_Freelancer_Roles`,
//     sheet.getRange(sixthRow, 1, 1, pasteRange.getNumColumns())
//   );
// }

// ("17;16;14;12;10;8;")
// ("_SubTotalVariance;_SubtotalActualAmount;_SubtotalDirectBill;_SubtotalSell;_CostWithContSubTotal;_ExtendedCostSubtotal;")
// if (partition == "ThirdParty") {
//   ss.setNamedRange(
//     `${sheet.getName()}_${category}_${partition}_ExtendedCostSubtotal`,
//     sheet.getRange(pasteRange.getLastRow(), 8)
//   );
//   ss.setNamedRange(
//     `${sheet.getName()}_${category}_${partition}_CostWithContSubTotal`,
//     sheet.getRange(pasteRange.getLastRow(), 10)
//   );
//   ss.setNamedRange(
//     `${sheet.getName()}_${category}_${partition}_SubtotalSell`,
//     sheet.getRange(pasteRange.getLastRow(), 12)
//   );
//   ss.setNamedRange(
//     `${sheet.getName()}_${category}_${partition}_SubtotalDirectBill`,
//     sheet.getRange(pasteRange.getLastRow(), 14)
//   );
//   ss.setNamedRange(
//     `${sheet.getName()}_${category}_${partition}_SubtotalActualAmount`,
//     sheet.getRange(pasteRange.getLastRow(), 16)
//   );
//   ss.setNamedRange(
//     `${sheet.getName()}_${category}_${partition}_SubTotalVariance`,
//     sheet.getRange(pasteRange.getLastRow(), 17)
//   );
// }

// //////////////////////////////////////////
