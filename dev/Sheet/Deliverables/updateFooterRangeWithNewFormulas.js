//MAIN FUNCTION
/////////////////////////
function updateFooterRangeWithNewFormulas(
  list,
  targetNamedRangeToUpdateOnActiveSheet
) {
  console.log("Inside updateFooterRangeWithNewFormulas");
  console.log(`list: ${list}`);
  console.log(
    `targetNamedRangeToUpdateOnActiveSheet: ${targetNamedRangeToUpdateOnActiveSheet}`
  );
  console.log(`namedRanges: ${namedRanges}`);
  /////////////////////////
  //FUNCTIONS
  /////////////////////////
  function TakeListAndCreateGlobalEmptyArrays(list) {
    list.forEach((propName) => {
      globalThis[propName] = [];
    });
  }

  function updateEmptyArraysThatIncludesStringInList(list, namedRanges) {
    //if the named range includes a word from the list, push the name of the named range to the array with the same word in the list
    namedRanges.forEach((namedRange) => {
      list.forEach((propName) => {
        if (namedRange.getName().includes(propName)) {
          globalThis[propName].push(namedRange.getName());
        }
      });
    });
  }

  function UpdateFooterRangeWithSumFormulas(targetRanges) {
    targetRanges.forEach((target, i) => {
      ss.getRangeByName(`${sheet.getName()}${target}`).setValue(
        `=SUM(${globalThis[list[i]]})`
      );
    });
  }
  /////////////////////////
  //END FUNCTIONS
  /////////////////////////

  //create empty arrays
  TakeListAndCreateGlobalEmptyArrays(list);
  //update empty arrays with named ranges that include a string in the list
  updateEmptyArraysThatIncludesStringInList(list, namedRanges);
  //update footer range with sum formulas
  UpdateFooterRangeWithSumFormulas(targetNamedRangeToUpdateOnActiveSheet);
}
/////////////////////////
//END MAIN FUNCTION
