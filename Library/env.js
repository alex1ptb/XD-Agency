/**
 * @OnlyCurrentDoc
 */

const DEBUG = true;

const sApp = SpreadsheetApp;
const SS = SpreadsheetApp.getActiveSpreadsheet();

// Database
const DATABASE_SS_ID = "1ERxK3ZXiGDTOlt09tQCHDs8r88o0tuRHi5SicWXDUec";

const EXTERNAL = {
  Templates: {
    id: "19wUSKk-nb2fwBP_o2m-NTZMr8V0MariipubkY7psdGE",
    Deliverable: { name: "Deliverable_Template" },
  },
};
const NEW_PROJECTS_FOLDER_ID = "1_EH-yPzMBuTojVVbrfo82VvFod-cuOhR";

const INTERNAL = {
  Budget_Summary: {
    name: "Budget Summary",
    Ranges: {
      Job_Number: "Job_Number",
      Leadership_Approval_Date: "Leadership_Approval_Date",
      Leadership_Approval_Name: "Leadership_Approval_Name",
      Load_InOut_Dates: "Load_InOut_Dates",
      deliverables: "Deliverables_Budget_Summary_Range",
      Client_Experience_Lead: "Client_Experience_Lead",
      Client_Finance_Approval_Date: "Client_Finance_Approval_Date",
      Client_Finance_Approval_Name: "Client_Finance_Approval_Name",
      Client_Name: "Client_Name",
      Deck_Link: "Deck_Link",
      Final_Invoice_Due_Date: "Final_Invoice_Due_Date",
      Netsuite_Project_Name: "Netsuite_Project_Name",
      Production_Lead: "Production_Lead",
      Project_Date: "Project_Date",
      Rate_Card_Dropdown: "Rate_Card_Dropdown",
      Sow_Link: "Sow_Link",
      Third_Party_Contingency_Percentage: "Third_Party_Contingency_Percentage",
      Third_Party_Markup_Percentage: "Third_Party_Markup_Percentage",
    },
  },
  Deliverable: {
    name: "Deliverable_Template",
    Ranges: {
      name: "Deliverable_Name",
      startDate: "Deliverable_Start_Date",
      deliveryDate: "Deliverable_Delivery_Date",
      overview: "Deliverable_Overview_Section_Template",
      budgeted_fees: "Deliverable_Budgeted_Fees",
      // Freelance
      Freelance_Fees_Template: "Deliverable_Freelance_Fees_Template",
      Freelance_Fees_Netsuite_Reconciliation_Template:
        "Deliverable_Freelance_Fees_Netsuite_Reconciliation_Template",
      Freelance_Fees_Working_Budget_Template:
        "Deliverable_Freelance_Fees_Working_Budget_Template",
      Staff_And_Freelance_Travel_And_Expenses_Template:
        "Deliverable_Staff_And_Freelance_Travel_And_Expenses_Template",
      // Third Party
      Third_Party_Template: "Deliverable_Third_Party_Template",
      Third_Party_Fees_Netsuite_Reconciliation_Template:
        "Deliverable_Third_Party_Fees_Netsuite_Reconciliation_Template",
      Third_Party_Working_Budget_Template:
        "Deliverable_Third_Party_Working_Budget_Template",
      Travel_And_Expenses_Fees_Netsuite_Reconciliation_Template:
        "Deliverable_Travel_And_Expenses_Fees_Netsuite_Reconciliation_Template",
      Travel_And_Expenses_Fees_Working_Budget_Template:
        "Deliverable_Travel_And_Expenses_Fees_Working_Budget_Template",
      // Staff
      Xda_Staff_Fees_Template: "Deliverable_Xda_Staff_Fees_Template",
      Xda_Staff_Fees_Netsuite_Reconciliation_Template:
        "Deliverable_Xda_Staff_Fees_Netsuite_Reconciliation_Template",
      Xda_Staff_Fees_Working_Budget_Template:
        "Deliverable_Xda_Staff_Fees_Working_Budget_Template",
    },
  },
  Discount_Summary: {
    name: "Discount Summary",
    Ranges: {
      Discount_Summary_Rate_Percentage: "Discount_Summary_Rate_Percentage",
    },
  },
  Rate_Card_Information: {
    name: "Rate Card Information",
    Ranges: {},
  },
};
