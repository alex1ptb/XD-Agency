// create function that gives back the range of the edited sheet

function onChangeReturnRange(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  console.log(sheet.getName());
  return sheet.getName();
  const activeRange = e.range;
  console.log(sheet.activeRange);
  activeRange.setNote("This is a note" + new Date());
  alert(activeRange.getA1Notation());
  return activeRange;
}
