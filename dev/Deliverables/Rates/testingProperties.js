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
    console.log(`Property Keys: ${JSON.stringify(keys[i])}`);
  }
  return keys;
}

function getXDATable() {
  console.log(`inside function getXDATable`);
  let key = propertyKeys()[1];
  console.log(`key: ${key}`);
  let value = scriptProperties.getProperty(key);
  // console.log(`value: ${value}`);
  //parse value as an array of objects
  let values = JSON.parse(value);
  // console.log(`values: ${values}`);
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
