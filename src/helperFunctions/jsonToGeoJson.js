const convertedArray = [];

const jsonToGeoJson = input => {
  for (let i = 0; i < input.length; i++) {
    const abc = input[i].createdBy;

    // preserve newlines, etc - use valid JSON
    abc = abc.replace(/\\n/g, "\\n")
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, "\\&")
      .replace(/\\r/g, "\\r")
      .replace(/\\t/g, "\\t")
      .replace(/\\b/g, "\\b")
      .replace(/\\f/g, "\\f");
    // remove non-printable and other non-valid JSON chars
    s = s.replace(/[\u0000-\u0019]+/g,"");
    var o = JSON.parse(s)

    const convertedObject = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": '"[' + input[i].coordLat + ',' + input[i].coordLong + ']"'
      },
      "properties": {
        "createdBy": '"' + abc + '"',
        "createdDate": `"${input[i].createdDate}"`,
        "status": `"${input[i].status}"`,
        "severity": `"${input[i].severity}"`,
        "descriptionNotes": `"${input[i].descriptionNotes}"`,
        "updated": `"${input[i].updated}"`,
        "updatedUserId": `"${input[i].updatedUserId}"`,
        "updatedDate": `"${input[i].updatedDate}"`
      },
    };
    convertedArray.push(convertedObject);
  }
  let output =
  {
    "type": "FeatureCollection",
    "features": convertedArray
  };
  console.log("OUTPUT HERE: ", output);
  return output;
};

module.exports = {
  jsonToGeoJson,
};
