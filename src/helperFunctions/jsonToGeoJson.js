// let inputCreatedBy = '';
// let inputCreatedDate = '';
// let inputCoordLat = '';
// let inputCoordLong = '';
// let inputStatus = '';
// let inputSeverity = '';
// let inputDescriptionNotes = '';
// let inputUpdated = '';
// let inputUpdatedUserId = '';
// let inputUpdatedDate = '';

const jsonToGeoJson = input => {
  return {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [input.coordLat, input.coordLong]
    },
    'properties': {
      'createdBy': input.createdBy,
      'createdDate': input.createdDate,
      'status': input.status,
      'severity': input.severity,
      'descriptionNotes': input.descriptionNotes,
      'updated': input.updated,
      'updatedUserId': input.updatedUserId,
      'updatedDate': input.updatedDate
    },
};

// const conversionProcess = () => {
//   const convertedObject = {
//     'type': 'Feature',
//     'geometry': {
//       'type': 'Point',
//       'coordinates': [inputCoordLat, inputCoordLong]
//     },
//     'properties': {
//       'createdBy': inputCreatedBy,
//       'createdDate': inputCreatedDate,
//       'coordLat': inputCoordLat,
//       'coordLong': inputCoordLong,
//       'status': inputStatus,
//       'severity': inputSeverity,
//       'descriptionNotes': inputDescriptionNotes,
//       'updated': inputUpdated,
//       'updatedUserId': inputUpdatedUserId,
//       'updatedDate': inputUpdatedDate
//     }
//   };
//   return convertedObject;
// };

// const readAndStoreValues = inputObject => {
//   inputCreatedBy = inputObject.createdBy;
//   inputCreatedDate = inputObject.createdDate;
//   inputCoordLat = inputObject.coordLat;
//   inputCoordLong = inputObject.coordLong;
//   inputStatus = inputObject.status;
//   inputSeverity = inputObject.severity;
//   inputDescriptionNotes = inputObject.descriptionNotes;
//   inputUpdated = inputObject.updated;
//   inputUpdatedUserId = inputObject.updpatedUserId;
//   inputUpdatedDate = inputObject.updatedDate;
//   conversionProcess();
// };

// const jsonToGeoJson = () => {
//   return readAndStoreValues();
// };

export default jsonToGeoJson;
