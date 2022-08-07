function DELETENAMEDRANGES() {
  var namedRanges = SpreadsheetApp.getActive().getNamedRanges();
  //create array of named ranges and their ranges
  var namedRangesArray = [];
  for (var i = 0; i < namedRanges.length; i++) {
    let nameAndRange = [];
    nameAndRange.push(namedRanges[i].getName());
    nameAndRange.push(namedRanges[i].getRange().getA1Notation());
    namedRangesArray.push(nameAndRange);
  }

  //create new sheet and add namedRangesArray to it
  var newSheet = SpreadsheetApp.getActive().insertSheet();
  newSheet
    .getRange(1, 1, namedRangesArray.length, namedRangesArray[0].length)
    .setValues(namedRangesArray);
}
