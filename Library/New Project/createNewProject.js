/*
    This file is used to create a spreadsheet from a template.
    
    // Start with dialog box to get the name of the new spreadsheet
    // Ask how many deliverables are needed
    // When they input a number of deliverables, create an input list for each deliverable so they can name each deliverable



    It will create a new spreadsheet and copy all the sheets from the template to the new spreadsheet.
    It will then set the properties of the new spreadsheet to store the data from the database spreadsheet.


*/

function createNewProjectFlow() {
  return createNewProjectDialog();
}

function createNewProject(
  clientName,
  projectName,
  deliverableCount,
  deliverableNames
) {
  console.log("createNewProject...");
  console.log(`projectName: ${projectName}
  deliverableCount: ${deliverableCount}
  deliverableNames: ${deliverableNames} 
    `);
  const templateId = EXTERNAL.Templates.id;
  const templateFile = DriveApp.getFileById(templateId);
  // Specify the shared drive folder ID
  const sharedDriveFolder = DriveApp.getFolderById(NEW_PROJECTS_FOLDER_ID);
  // Check if the client folder exists, if not create it
  let clientFolder;
  const folders = sharedDriveFolder.getFoldersByName(clientName);
  if (folders.hasNext()) {
    clientFolder = folders.next();
  } else {
    clientFolder = sharedDriveFolder.createFolder(clientName);
  }

  const newFile = templateFile.makeCopy(projectName, clientFolder);
  const newSS = SpreadsheetApp.openById(newFile.getId());

  newSS.getRangeByName("Client_Name").setValue(clientName);

  // Loop and create deliverable sheets
  for (let i = 0; i < deliverableCount; i++) {
    console.log(`creating deliverable ${i + 1}... ${deliverableNames[i]}`);
    createDeliverable(newSS.getId(), deliverableNames[i]);
  }

  console.log("Deliverables created...");

  console.log(`returning newFile.getId(): ${newFile.getId()}`);

  return newFile.getId();
}

function setNewSpreadsheetProperties(
  projectName,
  deliverableCount,
  deliverableNames,
  templateId,
  spreadsheetId
) {
  const properties = PropertiesService.getDocumentProperties();
  properties.setProperty("projectName", projectName);
  properties.setProperty("deliverableCount", deliverableCount);
  properties.setProperty("deliverableNames", JSON.stringify(deliverableNames));
  properties.setProperty("templateId", templateId);
  properties.setProperty("spreadsheetId", spreadsheetId);

  Logger.log(`Properties set in new spreadsheet...`);
}
