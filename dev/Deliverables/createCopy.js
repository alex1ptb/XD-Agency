/**
 * @OnlyCurrentDoc
 */

// THIS ENTIRE THING NEEDS TO BE REFACTORED AND REWRITTEN

//target sheet D1 and create a new tab with the number incremented by 1
//copy the contents of sheet D1 to the new tab

function createNewDeliverableTab() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("D1");
  let newSheet = ss.insertSheet();

  //use getCountOfDeliverables to get the number of deliverables
  let count = getCountOfDeliverables();
  //set the name of the new sheet to D# where # is the count + 1
  newSheet.setName("D" + (count + 1));
  //copy the contents of sheet D1 to the new tab
  newSheet
    .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
    .setValues(
      sheet
        .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
        .getValues()
    );
  //copy the background color of sheet D1 to the new tab
  newSheet
    .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
    .setBackgrounds(
      sheet
        .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
        .getBackgrounds()
    );
  //copy the font color of sheet D1 to the new tab
  newSheet
    .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
    .setFontColors(
      sheet
        .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
        .getFontColors()
    );
  //copy the font size of sheet D1 to the new tab
  newSheet
    .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
    .setFontSizes(
      sheet
        .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
        .getFontSizes()
    );
  //copy the font style of sheet D1 to the new tab
  newSheet
    .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
    .setFontStyles(
      sheet
        .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
        .getFontStyles()
    );
  //copy the font weight of sheet D1 to the new tab
  newSheet
    .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
    .setFontWeights(
      sheet
        .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
        .getFontWeights()
    );
  //copy the borders of sheet D1 to the new tab
  newSheet
    .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
    .setBorders(
      sheet
        .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
        .getBorders()
    );
}
