const convertedArray = [];

const jsonToGeoJson = input => {
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
      },
    };
    convertedArray.push(convertedObject);
  }
  const output =
  {
    "type": "FeatureCollection",
    "features": convertedArray
  };
  let stringy = JSON.stringify(output);
  stringy = stringy.replace(/(\\")/g, "");
  const parsedd = JSON.parse(stringy);
  console.log("OUTPUT HERE: ", output);
  console.log("STRINGYYYY HERE: ", stringy);
  console.log("PARSEDDDDDDDDD HERE: ", parsedd);
  return output;
  // return stringy;
  // return parsedd;
};

module.exports = {
  jsonToGeoJson,
};
