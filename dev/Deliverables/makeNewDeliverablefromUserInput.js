// //this takes the data from the user for the title and the categories and makes a new sheet inside of the spreadsheet. The name of the spreadsheet will be the title provided by the user. And the starting categories will be pulled from the array provided by the user.
// function makeNewDeliverablefromUserInput(title, categories) {
//   const templateSheet = ss.getSheetByName("Deliverable_Template");
//   // console.log(`Creating sheet named: ${title}`);
//   ss.insertSheet(title);
//   let sheet = ss.getActiveSheet();

//   function logNamedRanges(sheet) {
//     var rangeList = SpreadsheetApp.getActive().getNamedRanges();
//     rangeList.forEach(function (namedRange) {
//       var range = namedRange.getRange();
//       console.log(`range: ${range}`);
//       //if the named range is in the sheet Deliverable_Template, then copy it to the new sheet
//       if (range.getSheet().getName() == "Deliverable_Template") {
//         console.log(namedRange.getName() + ": " + range.getA1Notation());
//         var newRange = sheet.getRange(
//           range.getRow(),
//           range.getColumn(),
//           range.getNumRows(),
//           range.getNumColumns()
//         );
//         // console.log(`Copying ${namedRange.getName()} to ${title}`);

//         //copy the named range to the new sheet
//         range.copyTo(newRange);
//         //replace named rane with new range name
//         let newName = namedRange
//           .getName()
//           .replace("Deliverable_Template", `${title}`);
//         console.log(
//           `Renaming named range: ${namedRange.getName()} to ${newName}`
//         );
//         SpreadsheetApp.getActiveSpreadsheet().setNamedRange(newName, newRange);
//       }
//     });
//   }

//   function copyRangeAndNameRange(range, name) {
//     let namedRange = ss.getRangeByName(range);
//     let newRange = sheet.getRange(
//       namedRange.getRow(),
//       namedRange.getColumn(),
//       namedRange.getNumRows(),
//       namedRange.getNumColumns()
//     );
//     namedRange.copyTo(newRange);
//     SpreadsheetApp.getActiveSpreadsheet().setNamedRange(name, newRange);
//   }
//   copyRangeAndNameRange("Deliverable_Template_Header", `${title}_Header`);

//   //copy all namedRanges from template to new sheet and rename them to the new sheet's name
//   function copyOverNamedRanges(sheet) {
//     for (let i = 0; i < templateSheet.getNamedRanges(); i++) {
//       let namedRange = templateSheet.getNamedRange(i);
//       console.log(`Copying named range: ${namedRange.getName()}`);
//       let newRange = sheet.getRange(
//         namedRange.getRow(),
//         namedRange.getColumn(),
//         namedRange.getNumRows(),
//         namedRange.getNumColumns()
//       );
//       namedRange.copyTo(newRange);
//       //rename the namedRange replacing Deliverable_Template with the new sheet's name
//       let newName = namedRange
//         .getName()
//         .replace("Deliverable_Template", `${title}`);
//       console.log(
//         `Renaming named range: ${namedRange.getName()} to ${newName}`
//       );
//       SpreadsheetApp.getActiveSpreadsheet().setNamedRange(newName, newRange);
//     }
//   }
//   // re-write below into a funciton
//   let copyTitle = templateSheet.getRange("Deliverable_Template_Title_Header");
//   //copy title to sheet at range
//   copyTitle.copyTo(sheet.getRange(copyTitle.getRow(), copyTitle.getColumn()));
//   //grab the range that was copied over
//   let titleRange = sheet.getRange(copyTitle.getRow(), copyTitle.getColumn());
//   //set the title of the sheet
//   titleRange.setValue(title);
//   //update named range
//   ss.setNamedRange(`${title}_Deliverable_Title_Header`, titleRange);

//   //
//   let headerRange = templateSheet.getRange("Deliverable_Template_Header");

//   //set the header range name to {title}_Header
//   SpreadsheetApp.getActiveSpreadsheet().setNamedRange(
//     `${title}_Main_Category_Header`,
//     headerRange
//   );
//   // logNamedRanges(sheet);
//   // copyOverNamedRanges(sheet);

//   //now to add in the footer
//   let copyFooter = templateSheet.getRange(
//     "Deliverable_Template_Main_Category_Footer"
//   );

//   let newFooterStart = sheet.getLastRow() + 1;

//   copyFooter.copyTo(sheet.getRange(sheet.getLastRow() + 1, 1));

//   //get range of footer section
//   let footerRange = sheet.getRange(
//     newFooterStart,
//     1,
//     copyFooter.getNumRows(),
//     copyFooter.getNumColumns()
//   );

//   //set the footer range name to {title}_Main_Category_Footer
//   SpreadsheetApp.getActiveSpreadsheet().setNamedRange(
//     `${title}_Main_Category_Footer`,
//     footerRange
//   );

//   //create function to add in Third_Party_Categories
//   // function addThirdPartyTemplate() {
//   let copyThirdPartyHeaderTemplate = templateSheet.getRange(
//     "Third_Party_Main_Header_Template"
//   );
//   console.log(copyThirdPartyHeaderTemplate.getA1Notation());

//   let newThirdPartyHeaderStart = sheet.getLastRow() + 1;

//   copyThirdPartyHeaderTemplate.copyTo(
//     sheet.getRange(sheet.getLastRow() + 1, 1)
//   );

//   let thirdPartyRange = sheet.getRange(
//     newThirdPartyHeaderStart,
//     // sheet.getLastRow() + 1,
//     1,
//     copyThirdPartyHeaderTemplate.getNumRows(),
//     copyThirdPartyHeaderTemplate.getNumColumns()
//   );
//   SpreadsheetApp.getActiveSpreadsheet().setNamedRange(
//     `${title}_Third_Party_Main_Categories_Header`,
//     thirdPartyRange
//   );

//   //add in Third_Party_Category_Template
//   let copyThirdPartyTemplate = templateSheet.getRange(
//     "Third_Party_Main_Category_Template"
//   );

//   let newThirdPartyStart = sheet.getLastRow() + 1;

//   copyThirdPartyTemplate.copyTo(sheet.getRange(sheet.getLastRow() + 1, 1));

//   let thirdPartyCategoryRange = sheet.getRange(
//     newThirdPartyStart,
//     // copyThirdPartyTemplate.getRow(),
//     copyThirdPartyTemplate.getColumn(),
//     copyThirdPartyTemplate.getNumRows(),
//     copyThirdPartyTemplate.getNumColumns()
//   );
//   SpreadsheetApp.getActiveSpreadsheet().setNamedRange(
//     `${title}_Third_Party_Categories`,
//     thirdPartyCategoryRange
//   );

//   //add in Third_Party_Footer_Template
//   let copyThirdPartyFooterTemplate = templateSheet.getRange(
//     "Third_Party_Footer_Template"
//   );
//   let newThirdPartyFooterStart = sheet.getLastRow() + 1;
//   copyThirdPartyFooterTemplate.copyTo(
//     sheet.getRange(sheet.getLastRow() + 1, 1)
//   );
//   let thirdPartyFooterRange = sheet.getRange(
//     newThirdPartyFooterStart,
//     // copyThirdPartyFooterTemplate.getRow(),
//     copyThirdPartyFooterTemplate.getColumn(),
//     copyThirdPartyFooterTemplate.getNumRows(),
//     copyThirdPartyFooterTemplate.getNumColumns()
//   );
//   SpreadsheetApp.getActiveSpreadsheet().setNamedRange(
//     `${title}_Third_Party_Categories_Footer`,
//     thirdPartyFooterRange
//   );

//   copyOverNamedRanges(sheet);

//   // now add in the categories
//   categories.forEach((category) => {
//     let lastRow = sheet.getLastRow();
//     deliverableLayout(category, "XD");
//     let newRow = lastRow + 1;
//     sheet.getRange(newRow, 1).setValue(category);
//     checkForRoleUpdate(category);
//   });
//   //end of add in Third_Party_Categories
//   // }
//   //call the function to add in the Third_Party_Categories
//   // addThirdPartyTemplate();

//   //function to add dropdown for Third_Party_Role_Template

//   //run function to add the sheetName to all of the sheets that need it
//   // addSheetToProjectInformationSummarySheet(title);
// }
