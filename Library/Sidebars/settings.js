function settingsSidebar() {
  openSidebar("Sidebars/HTML/settings", "Settings");
}

/**
 * Retrieves the headers from the "dropdowns" sheet.
 * @return {string[]} Array of headers.
 */
function getDropdownHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Dropdowns");
  var headers = sheet.getRange(2, 2, 1, sheet.getLastColumn()).getValues()[0];
  headers = headers.filter((header) => header !== "");
  return headers;
}

/**
 * Applies dropdown validation and colors based on the selected header and target range.
 * @param {string} header The header for the dropdown options.
 * @param {string} targetRange The target range where dropdown and colors should be applied.
 */
function applyDropdownColors(header, targetRange) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Dropdowns");
  var headers = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues()[0];
  var columnIndex = headers.indexOf(header) + 1;

  if (columnIndex == 0) {
    SpreadsheetApp.getUi().alert("Header not found.");
    return;
  }

  var validationRange = sheet.getRange(
    3,
    columnIndex,
    sheet.getLastRow() - 2,
    1
  );
  var validationValues = validationRange.getValues();
  var validationBackgrounds = validationRange.getBackgrounds();
  var validationFontColors = validationRange.getFontColors();

  var targetSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var targetRange = targetSheet.getRange(targetRange);

  var rules = [];

  for (var i = 0; i < validationValues.length; i++) {
    if (validationValues[i][0] !== "") {
      var rule = SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo(validationValues[i][0])
        .setBackground(validationBackgrounds[i][0])
        .setFontColor(validationFontColors[i][0])
        .setRanges([targetRange])
        .build();
      rules.push(rule);
    }
  }

  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(validationRange)
    .build();
  targetRange.setDataValidation(rule);

  var existingRules = targetSheet.getConditionalFormatRules();
  targetSheet.setConditionalFormatRules(existingRules.concat(rules));
}

/**
 * Function to apply text color scale based on the selected range and colors.
 * @param {string} targetRange The target range where text color scale should be applied.
 * @param {string} startColor The start color for the color scale.
 * @param {string} midColor The mid color for the color scale.
 * @param {string} endColor The end color for the color scale.
 */
function applyTextColorScale(targetRange, startColor, midColor, endColor) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getRange(targetRange);
  var values = range.getValues();
  var steps = values.length;

  var colors = generateColorGradient(steps, startColor, midColor, endColor);

  // Flatten the 2D array to a 1D array for sorting and indexing
  var flattenedValues = values.map(function (row) {
    return row[0];
  });

  // Sort the values alphabetically
  var sortedValues = flattenedValues.slice().sort();

  // Apply colors based on sorted position
  for (var i = 0; i < flattenedValues.length; i++) {
    var position = sortedValues.indexOf(flattenedValues[i]);
    if (position !== -1) {
      var backgroundColor = colors[position];
      var textColor = getContrastingTextColor(backgroundColor);
      range
        .getCell(i + 1, 1)
        .setBackground(backgroundColor)
        .setFontColor(textColor);
      console.log(
        `Set background for cell ${range.getCell(
          i + 1,
          1
        )} with color ${backgroundColor} and text color ${textColor}`
      );
    }
  }
}

/**
 * Function to generate a color gradient array.
 * @param {number} steps The number of steps in the gradient.
 * @param {string} startColor The start color in the gradient.
 * @param {string} midColor The mid color in the gradient.
 * @param {string} endColor The end color in the gradient.
 * @return {string[]} An array of color values.
 */
function generateColorGradient(steps, startColor, midColor, endColor) {
  function hexToRgb(hex) {
    var bigint = parseInt(hex.substring(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  }

  function rgbToHex(rgb) {
    return (
      "#" +
      rgb
        .map((x) => {
          var hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  }

  var startRGB = hexToRgb(startColor);
  var midRGB = hexToRgb(midColor);
  var endRGB = hexToRgb(endColor);

  var colorArray = [];

  for (var i = 0; i < steps; i++) {
    var t = i / (steps - 1);
    var r, g, b;

    if (t <= 0.5) {
      // Interpolate between start and mid color
      var factor = t / 0.5;
      r = Math.round((1 - factor) * startRGB[0] + factor * midRGB[0]);
      g = Math.round((1 - factor) * startRGB[1] + factor * midRGB[1]);
      b = Math.round((1 - factor) * startRGB[2] + factor * midRGB[2]);
    } else {
      // Interpolate between mid and end color
      var factor = (t - 0.5) / 0.5;
      r = Math.round((1 - factor) * midRGB[0] + factor * endRGB[0]);
      g = Math.round((1 - factor) * midRGB[1] + factor * endRGB[1]);
      b = Math.round((1 - factor) * midRGB[2] + factor * endRGB[2]);
    }

    colorArray.push(rgbToHex([r, g, b]));
  }

  return colorArray;
}

/**
 * Function to determine the contrasting text color (black or white) based on the background color.
 * @param {string} backgroundColor The background color in hex format.
 * @return {string} The text color in hex format (#000000 or #FFFFFF).
 */
function getContrastingTextColor(backgroundColor) {
  function hexToRgb(hex) {
    var bigint = parseInt(hex.substring(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  }

  var rgb = hexToRgb(backgroundColor);
  var luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;

  // If luminance is greater than 0.5, use black text; otherwise, use white text
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

/**
 * Function to prompt the user to select a range and return the range as A1 notation.
 */
function promptRange() {
  var range = SpreadsheetApp.getActiveSpreadsheet().getActiveRange();
  return range.getA1Notation();
}
