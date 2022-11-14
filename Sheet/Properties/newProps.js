/**
 * @OnlyCurrentDoc
 */

//get all data and stucture into object

// SheetName{
//// NamedRanges: {
////// NamedRangeName: {
//////// NamedRangeValues: [NamedRangeValues]
//////// NamedRangeFormulas: [NamedRangeFormulas]
//////// NamedRangeA1Notation: [NamedRangeA1Notation]
////// }
////}
//}

function createGlobalProps() {
  //get all data and stucture into object
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  const props = {};
  sheets.forEach((sheet) => {
    const namedRanges = sheet.getNamedRanges();
    const namedRangeProps = {};
    namedRanges.forEach((namedRange) => {
      try {
        const rName = namedRange.getName();
        const rValues = namedRange.getRange().getValues();
        console.log(rValues);
        const rFormulas = namedRange.getRange().getFormulas();
        const rA1Notation = namedRange.getRange().getA1Notation();
        namedRangeProps[rName] = {
          rangeValues: JSON.stringify(rValues),
          rangeFormulas: JSON.stringify(rFormulas),
          rangeA1Notation: rA1Notation,
        };
      } catch (e) {
        console.log(e);
      }
    });
    //jsonify and set as global property
    props[sheet.getName()] = namedRangeProps;
  });
  //set global properties
  PropertiesService.getScriptProperties().setProperties(props);
  return props;
}
