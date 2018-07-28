const convertedArray = [];
let output = '';

const jsonToGeoJson = input => {
  console.log('input', input);
  for (let i = 0; i < input.length; i++) {
    const coords = [input[i].coordLong, input[i].coordLat];
    const convertedObject = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": coords
      },
      "properties": {
        "createdBy": `"${input[i].createdBy}"`,
        "createdDate": `"${input[i].createdDate}"`,
        "status": `"${input[i].status}"`,
        "severity": `"${input[i].severity}"`,
        "descriptionNotes": `"${input[i].descriptionNotes}"`,
        "updated": input[i].updated,
        "updatedUserId": `"${input[i].updatedUserId}"`,
        "updatedDate": `"${input[i].updatedDate}"`
      }
    };
    convertedArray.push(convertedObject);
    console.log(`convertedArray, i is ${i}`, convertedArray);
  }
  output =
  {
    "type": "FeatureCollection",
    "features": convertedArray
  };
  output = JSON.stringify(output);
  output = output.replace(/(\\")/g, "");
  output = JSON.parse(output);
  console.log("OUTPUT HERE: ", output);
  // return output;
};

module.exports = {
  jsonToGeoJson,
};
