/**
 * @OnlyCurrentDoc
 */
function copyAndPaste(copyRange, pasteRange) {
  //get the range and copy to new range. But only get the display values and not the formula values
  let copyRangeValues = sheet.getRange(copyRange).getDisplayValues();
  pasteRange.setValues(copyRangeValues);
}
