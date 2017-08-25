function ZipCodeData () {}

ZipCodeData.url = 'https://api.zippopotam.us/us/';

ZipCodeData.get = function(zipCode) {
  //this should modify the response data so that react class should be able to just
  //add the data without doing work in the react class
  return fetch(getZipCodeData.url + zipCode).then(res => res.json())
}

export default ZipCodeData;