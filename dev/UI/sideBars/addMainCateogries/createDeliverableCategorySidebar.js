//create sidebar for deliverable options
//target ChooseAgent sheet

function createDeliverableCategorySidebar() {
  // let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // let sheet = spreadsheet.getSheetByName("ChooseAgent");

  //create sidebar from template
  let sidebar = HtmlService.createTemplateFromFile("html/deliverableSidebar");
  //get html from sidebar
  let html = sidebar.evaluate();
  html.setTitle("Category Options");
  html.setWidth(300);
  html.setHeight(300);

  //create list of li elements from the sheet
  let listOfCategories = filterAlreadyChoosenCategories();

  //add categories to sidebar
  for (let i = 0; i < listOfCategories.length; i++) {
    let category = listOfCategories[i];
    //append category to sidebar under li tag
    //when li is clicked, add the value of the button to the current deliverable sheet and refresh the sidebar to remove the clickable li from the sidebar
    html.append(
      `<li class="li_category"><button onclick="google.script.run.addCategoryToCurrentDeliverable('${category}')">${category}</button></li>`
    );
  }

  //show sidebar
  SpreadsheetApp.getUi().showSidebar(html);
}
