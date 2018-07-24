const convertedArray = [];

// const conversion = inputObject => {
//   inputObject.map(input => {
//     return convertedArray.push({
//       'type': 'Feature',
//       'geometry': {
//         'type': 'Point',
//         'coordinates': [input.coordLat, input.coordLong]
//       },
//       'properties': {
//         'createdBy': input.createdBy,
//         'createdDate': input.createdDate,
//         'status': input.status,
//         'severity': input.severity,
//         'descriptionNotes': input.descriptionNotes,
//         'updated': input.updated,
//         'updatedUserId': input.updatedUserId,
//         'updatedDate': input.updatedDate
//       },
//     });
//   });
// };

// TO DO ternery to decide where commas are needed
// (ie, not the last object)

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
  return convertedArray;
};

module.exports = {
  jsonToGeoJson,
};
