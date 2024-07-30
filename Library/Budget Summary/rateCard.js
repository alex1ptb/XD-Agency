/**
 * When rate card dropdown has been changed,
 * Grab the value
 * go to database and grab the rate card information
 * look in row 4 for the grabbed value
 * return row 3 where column matches the grabbed value
 */

function rateCardChangedWrapper(e) {
  try {
    let rateCardValue = rateCardChanged(e);
    setNewRateDiscount(rateCardValue);
  } catch (e) {
    console.error(`Error in rateCardChangedWrapper: ${e.message}`);
    throw e;
  }
}

function rateCardChanged(e) {
  if (DEBUG && !e) {
    e = {
      value: SS.getRangeByName(
        INTERNAL.Budget_Summary.Ranges.Rate_Card_Dropdown
      ).getValue(),
    };
  }
  let rateCard = e.value;
  let databaseSS = SpreadsheetApp.openById(DATABASE_SS_ID);
  let rateCardSheet = databaseSS.getSheetByName(
    INTERNAL.Rate_Card_Information.name
  );
  let rateCardValues = rateCardSheet
    .getRange(4, 1, 1, rateCardSheet.getLastColumn())
    .getValues()[0];
  let rateCardIndex = rateCardValues.indexOf(rateCard);

  // Grab the value above the rate card
  let rateCardValue = rateCardSheet.getRange(3, rateCardIndex + 1).getValue();
  return rateCardValue;
}

function setNewRateDiscount(rateCardValue) {
  SS.getRangeByName(
    INTERNAL.Discount_Summary.Ranges.Discount_Summary_Rate_Percentage
  ).setValue(rateCardValue);
}
