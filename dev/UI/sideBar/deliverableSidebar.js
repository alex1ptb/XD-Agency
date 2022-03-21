//create sidebar for deliverable options
//target ChooseAgent sheet

function createSidebar() {
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName("ChooseAgent");

  //create sidebar from
  let sidebar = HtmlService.createHtmlOutputFromFile("html/deliverableSidebar");
  sidebar.setTitle("Deliverable Options");
  sidebar.setWidth(300);
  sidebar.setHeight(300);

  //add sidebar to sheet
  sheet.setSidebar(sidebar.getContent());

  // let li = sidebar.getElementById("categories");

  // //create a list of categories not on sheet by running filterAlreadyChoosenCategories function
  // let categoriesNotOnSheet = filterAlreadyChoosenCategories();

  // //for each category not on sheet, create a list item and append to sidebar
  // for (let i = 0; i < categoriesNotOnSheet.length; i++) {
  //   // let li = sidebar.getElementById("categories");
  //   let category = categoriesNotOnSheet[i];
  //   // let categoryLi = HtmlService.createHtmlOutput("<li>" + category + "</li>");

  //   //add the categories to the sidebar as a clickable list
  //   for (let i = 0; i < categoriesNotOnSheet.length; i++) {
  //     sidebar.addItem(
  //       categoriesNotOnSheet[i],
  //       "addCategoryToCurrentDeliverable('" + categoriesNotOnSheet[i] + "')"
  //     );
  //   }
  // }
}
