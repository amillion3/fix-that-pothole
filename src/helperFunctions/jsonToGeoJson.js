// "sample3": {
//   "createdBy": "d934ks0l0slsksjdancudk37373",
//   "createdDate": "1/1/2018",
//   "coordLat": 36.148399,
//   "coordLong": -86.762028,
//   "status": "Newly Added",
//   "severity": "Low",
//   "descriptionNotes": "On shoulder",
//   "updated": true,
//   "updatedUserId": "d934ks0l0slsksjdl330128",
//   "updatedDate": "01/02/2018"
// }
// -------------------------------
// {
//   "type": "Feature",
//   "geometry": {
//     "type": "Point",
//     "coordinates": [125.6, 10.1]
//   },
//   "properties": {
//     "name": "Dinagat Islands"
//   }
// }

let inputCreatedBy = '';
let inputCreatedDate = '';
let inputCoordLat = '';
let inputCoordLong = '';
let inputStatus = '';
let inputSeverity = '';
let inputDescriptionNotes = '';
let inputUpdated = '';
let inputUpdatedUserId = '';
let inputUpdatedDate = '';

const conversion = () => {
  let convertedObject = {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [inputCoordLat, inputCoordLong]
    },
    'properties': {
      'createdBy': 'd934ks0l0slsksjdancudk37373',
      'createdDate': '1/1/2018',
      'coordLat': 36.148399,
      'coordLong': -86.762028,
      'status': 'Newly Added',
      'severity': 'Low',
      'descriptionNotes': 'On shoulder',
      'updated': true,
      'updatedUserId': 'd934ks0l0slsksjdl330128',
      'updatedDate': '01/02/2018'
    },
  }
};

const readAndStoreValues = inputObject => {
  inputCreatedBy = inputObject.createdBy;
  inputCreatedDate = inputObject.createdDate;
  inputCoordLat = inputObject.coordLat;
  inputCoordLong = inputObject.coordLong;
  inputStatus = inputObject.status;
  inputSeverity = inputObject.severity;
  inputDescriptionNotes = inputObject.descriptionNotes;
  inputUpdated = inputObject.updated;
  inputUpdatedUserId = inputObject.updpatedUserId;
  inputUpdatedDate = inputObject.updatedDate;
  conversion();
};

const jsonToGeoJson = () => {
  readAndStoreValues();
};

export default jsonToGeoJson;
