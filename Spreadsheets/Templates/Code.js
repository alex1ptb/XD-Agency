/**
 * @OnlyCurrentDoc
 */

const SS = SpreadsheetApp.getActiveSpreadsheet();
const sApp = SpreadsheetApp;

function onOpen() {
  Dev_XD_Library.onOpen();
}

function createDeliverable(
  spreadsheetId,
  deliverableName,
  startDate,
  deliveryDate
) {
  Dev_XD_Library.createDeliverable(
    spreadsheetId,
    deliverableName,
    startDate,
    deliveryDate
  );
}

function createNewProject(
  clientName,
  projectName,
  deliverableCount,
  deliverableNames
) {
  Dev_XD_Library.createNewProject(
    clientName,
    projectName,
    deliverableCount,
    deliverableNames
  );
}
