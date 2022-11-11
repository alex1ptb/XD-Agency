/**
 * @OnlyCurrentDoc
 */

// Main create new deliverable function that is called from the menu
function createNewDeliverableUI() {
  var ui = SpreadsheetApp.getUi();
  const html = HtmlService.createHtmlOutputFromFile("html/newDeliverableUI")
    .setWidth(550)
    .setHeight(400);
  html.append(`<form id="newDeliverableForm">
      <label for="deliverableName">Deliverable Name:</label>
      <input type="text" name="deliverableName" id="deliverableName" />
      <br />`);
  const xdaRates = getXdaRates();
  let tableIds = [];
  //go through xdaRates and get the tableIds and push to tableIds array
  for (let i = 1; i <= xdaRates.length; i++) {
    let tableId = xdaRates[i - 1].tableId;
    tableIds.push(tableId);
  }
  for (let i = 0; i < tableIds.length; i++) {
    let category = tableIds[i];
    html.append(
      `<input type="checkbox" class="checkbox_category" id="${category}">
      <label for="${category}">${category}</label><br>`
    );
  }
  html.append(`</form>`);
  ui.showModalDialog(
    html,
    "Input the Name of deliverable and choose starting categories"
  );
}
//End main create new deliverable function

/////////SIDEBARS////////////
function createCategorySidebar(template, title, section, func) {
  //create sidebar from template
  // let sidebar = HtmlService.createTemplateFromFile("html/deliverableSidebar");
  let sidebar = HtmlService.createTemplateFromFile(`html/${template}`);
  const html = sidebar.evaluate();
  html.setTitle(title); // "Category Options" or "3rd Party Category Options"
  html.setWidth(300);
  html.setHeight(300);
  let listOfCategories = filterAlreadyChoosenCategories(section); //XDA or 3rdParty
  for (let i = 0; i < listOfCategories.length; i++) {
    let category = listOfCategories[i];
    html.append(
      `<li class="li_category">
        <button onclick="google.script.run.${func}('${category}')">${category}</button>
      </li>`
    );
  }
  SpreadsheetApp.getUi().showSidebar(html);
}

function createDeliverableCategorySidebar() {
  createCategorySidebar(
    "deliverableSidebar",
    "Category Options",
    "XDA",
    "addCategoryToCurrentDeliverable"
  );
}

// sidebar for 3rd party categories
function createthirdPartyCostsSidebar() {
  createCategorySidebar(
    "thirdPartyCategoriesSidebar",
    "3rd Party Category Options",
    "3rdParty",
    "add3rdPartyToCurrentDeliverable"
  );
}

////Go through tableIDs and remove already choosen tableIDs found on current sheet and return the remaining tableIDs
function filterAlreadyChoosenCategories(rates) {
  console.log(`filtering already choosen categories`);
  if (rates == "XDA") {
    Rates = getXdaRates();
  } else if (rates == "3rdParty") {
    Rates = getThirdPartyRoles();
  }
  let sheet = SpreadsheetApp.getActiveSheet();
  let lastRow = sheet.getLastRow();
  if (lastRow == 0) {
    lastRow = 1;
  }
  let tableIds = [];
  //go through xdaRates and get the tableIds and push to tableIds array
  //I do this itterative because the next section gave me issues
  //with only returning the first match
  for (let i = 1; i <= Rates.length; i++) {
    //get the tableId
    let tableId = Rates[i - 1].tableId;
    //push to tableIds array
    tableIds.push(tableId);
  }
  let columnA = sheet.getRange(1, 1, lastRow, 1).getValues();
  //if the value in column A matches any value in tableIds array then remove it from tableIds array
  if (tableIds.length == 0) return "no matches";
  for (let j = 0; j < tableIds.length; j++) {
    for (let i = 0; i < columnA.length; i++) {
      if (columnA[i] == tableIds[j]) {
        console.log(`removing ${tableIds[j]} from tableIds array`);
        tableIds.splice(j, 1);
      }
    }
  }
  return tableIds;
}
