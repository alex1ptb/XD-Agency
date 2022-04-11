//This function will do the following
// Grab all sheets that are not in the template of the normal spreadsheet
// Currently I am just going to hard-code the names of the tabs on the template sheet until I can come back and refactor this code
// I need to add, in order of being found, (the extra tabs) in the named range of "Sell by Deliverable - Deliverable Name"

function addEachDeliverableTab() {
  //current tab names to skip when searching for extra tabs:
  let arrayOfTemplateTabs = [
    "ProjectInformationSummary",
    "SvcAreaJobTitleSellRateTable",
    "DirBill",
    "ClientSummaryReport",
    "SortableByServiceAreaReport",
    "SortableBy3rdPartyReport",
    "GO!ServicesRolesRates",
    "StaffCostRateTable",
    "3rdPartyCategories",
  ];
  //I will also need to ignore any hidden tabs
}
