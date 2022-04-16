/**
 * @OnlyCurrentDoc
 */

// THIS ENTIRE THING NEEDS TO BE REFACTORED AND REWRITTEN

//target sheet D1 and create a new tab with the number incremented by 1
//copy the contents of sheet D1 to the new tab

function createNewDeliverableTab() {
  var ui = SpreadsheetApp.getUi();
  //Found a tutorial I can follow
  //https://yagisanatode.com/2018/06/10/google-apps-script-getting-input-data-from-a-dialog-box-in-google-sheets/
  //grab the named ranges from "Deliverable_Template" and add them to a new tab

  //first create a UI that asks the user what main categories should be included
  //lets get the html of the dialog box
  let html = HtmlService.createHtmlOutputFromFile("html/newDeliverableUI")
    .setWidth(550)
    .setHeight(400);

  //append form html
  html.append(`<form id="newDeliverableForm">
      <label for="deliverableName">Deliverable Name:</label>
      <input type="text" name="deliverableName" id="deliverableName" />
      <br />`);

  let xdaRates = getXdaRates();
  let tableIds = [];
  //go through xdaRates and get the tableIds and push to tableIds array
  //I do this itterative because the next section gave me issues
  //with only returning the first match
  for (let i = 1; i <= xdaRates.length; i++) {
    //get the tableId
    let tableId = xdaRates[i - 1].tableId;
    //push to tableIds array
    tableIds.push(tableId);
  }

  //add categories to sidebar
  for (let i = 0; i < tableIds.length; i++) {
    let category = tableIds[i];
    //append categories to the form
    html.append(
      `<input type="checkbox" class="checkbox_category" id="${category}">
      <label for="${category}">${category}</label><br>`
    );
  }
  //append ending of form
  html.append(`</form>`);

  //dont know what this part is doing currently
  var dialog = ui.showModalDialog(
    html,
    "Input the Name of deliverable and choose starting categories"
  );

  //show dialog box to user
  dialog;
}
