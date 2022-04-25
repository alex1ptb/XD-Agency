/* only this document
@
*/

const scriptProperties = PropertiesService.getScriptProperties();

function getScriptProperties() {
  return scriptProperties;
}

function propertyKeys() {
  //log keys
  let keys = scriptProperties.getKeys();
  for (let i = 0; i < keys.length; i++) {
    console.log(keys[i]);
  }
  return keys;
}

function getXDATable() {
  let key = propertyKeys()[1];
  let value = scriptProperties.getProperty(key);

  //parse value as an array of objects
  let values = JSON.parse(value);
  return values;
}

function getProperties() {
  let keys = propertyKeys();
  let properties = {};
  for (let i = 0; i < keys.length; i++) {
    properties[keys[i]] = scriptProperties.getProperty(keys[i]);
  }
  return properties;
}
