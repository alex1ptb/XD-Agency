/**
 * @OnlyCurrentDoc
 */

function onOpen() {
  DEV_XD_Library.onOpen();
}

function settingsSidebar() {
  DEV_XD_Library.openSidebar("Siderbars/settings");
}

function getSheetNames() {
  return DEV_XD_Library.getSheetNames();
}

function applyDropdownColors(sheetName, dropdownRange, targetRange) {
  return DEV_XD_Library.applyDropdownColors(
    sheetName,
    dropdownRange,
    targetRange
  );
}

function promptRange() {
  return DEV_XD_Library.promptRange();
}

function getDropdownHeaders() {
  return DEV_XD_Library.getDropdownHeaders();
}

function applyTextColorScale(targetRange, startColor, midColor, endColor) {
  DEV_XD_Library.applyTextColorScale(
    targetRange,
    startColor,
    midColor,
    endColor
  );
}
