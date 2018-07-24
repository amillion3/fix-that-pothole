const convertedArray = [];

const jsonToGeoJson = input => {
  for (let i = 0; i < input.length; i++) {
    const convertedObject = {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [input[i].coordLat, input[i].coordLong]
      },
      'properties': {
        'createdBy': input[i].createdBy,
        'createdDate': input[i].createdDate,
        'status': input[i].status,
        'severity': input[i].severity,
        'descriptionNotes': input[i].descriptionNotes,
        'updated': input[i].updated,
        'updatedUserId': input[i].updatedUserId,
        'updatedDate': input[i].updatedDate
      },
    };
    convertedArray.push(convertedObject);
  }
  // addGeoJsonStructure(convertedArray);
  const output =
  {
    'type': 'FeatureCollection',
    'features': convertedArray
  };
  console.error('jsonToGeoJson.js output:', output);
  return output;
};

module.exports = {
  jsonToGeoJson,
};
