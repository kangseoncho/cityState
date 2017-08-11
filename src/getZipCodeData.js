// import React, { Component } from 'react';

const getZipCodeData = (zipCode) => {
  return fetch(`https://api.zippopotam.us/us/${zipCode}`).then(res => res.json())
}

export default getZipCodeData;
