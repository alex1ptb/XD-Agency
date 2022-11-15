/**
 * @OnlyCurrentDoc
 */

// SheetName{
//// NamedRanges: { \\ SheetName_Category_Partition_Section
////// NamedRangeName: {
//////// NamedRangeValues: [NamedRangeValues]
//////// NamedRangeFormulas: [NamedRangeFormulas]
//////// NamedRangeA1Notation: [NamedRangeA1Notation]
////// }
////}
//}

const globalProps = new Object(;
  SheetName: {
    NamedRanges: {
      NamedRangeName: {
        NamedRangeValues: [NamedRangeValues],
        NamedRangeFormulas: [NamedRangeFormulas],
        NamedRangeA1Notation: [NamedRangeA1Notation],
      },
    },
  },
)
function setGlobalProps(){
  const props = PropertiesService.getScriptProperties();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

}

