import React, { Component } from 'react';
import ZipCodeData from './zipCodeData.js';
import View from './view.jsx';

/**
 * Make an App that has an
 * - input field
 * - button
 * - list of city, states
 * user should be able to enter a zipcode into the field
 * and press the button to save the city and state to the list.
 *
 * Bonus:
 * - Selecting an item in the list should fill the input with
 * the zip code that was used to look up the city and state
 * - when a list item is selected it should appear selected
 * - if the user enters a new zip code while an item is selected
 * and hits the button, the record should be updated (if valid input)
 * - User should be able to deselect selected item
 *
 */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCodeList: [
        { 90701: "Artesia, CA", "selected": 'none' }
      ],
      zipCodeInput: undefined
    };

    this.addZipCodeToList = this.addZipCodeToList.bind(this);
    this.changeDataForZipCodeList = this.changeDataForZipCodeList.bind(this);
    this.checkDuplicateZipCode = this.checkDuplicateZipCode.bind(this);
    this.updateZipCodeInput = this.updateZipCodeInput.bind(this);
    this.highlightCityState = this.highlightCityState.bind(this);
    this.removeCityState = this.removeCityState.bind(this);
  }

  updateZipCodeInput(event) {
    this.setState({zipCodeInput: event.target.value});
  }

  //modify the data retrieved from API call into what will be in state
  changeDataForZipCodeList(data) {
    let zipCode = {}
    let cityState = `${data.places[0]['place name']}, ${data.places[0]['state abbreviation']}`;
    zipCode[data['post code']] = cityState;
    zipCode['selected'] = 'selected';

    this.highlightCityState(data['post code']);

    return zipCode;
  }

  //check if the zip code input already exists
  checkDuplicateZipCode(changedData) {
    let doesZipCodeExist = false;

    this.state.zipCodeList.map((zipCodeItem) => {
      if (Object.keys(zipCodeItem)[0] === Object.keys(changedData)[0]) {
        doesZipCodeExist = true;
      }
      return zipCodeItem;
    })

    if(doesZipCodeExist === false) return changedData;
    if(doesZipCodeExist === true) return undefined;
  }

  //add the newly created object for zipCodeList into the zipCodeList state
  addZipCodeToList(zipCode) {
    getZipCodeData.get(zipCode)
      .then(res => {
        return this.changeDataForZipCodeList(res);
      })
      .then(changedData => {
        const tempZipCodeList = this.state.zipCodeList;
        const filteredZipCode = this.checkDuplicateZipCode(changedData);

        if(filteredZipCode !== undefined) tempZipCodeList.push(filteredZipCode);

        this.setState({zipCodeList: tempZipCodeList});
      })
  }

  //highlight city, state on click
  highlightCityState(zipCode) {
    let tempZipCodeList = this.state.zipCodeList;

    tempZipCodeList = tempZipCodeList.map((zipCodeItem, index) => {
      if(Object.keys(zipCodeItem)[0] !== zipCode) {
        zipCodeItem[Object.keys(zipCodeItem)[1]] = 'none';
      } else if(Object.keys(zipCodeItem)[0] === zipCode) {
        zipCodeItem[Object.keys(zipCodeItem)[1]] = 'selected';
      }
      return zipCodeItem;
    })

    this.setState({ zipCodeList: tempZipCodeList, zipCodeInput: zipCode })
  }

  removeCityState(zipCode) {
    let tempZipCodeList = this.state.zipCodeList;

    tempZipCodeList = tempZipCodeList.filter((zipCodeItem) => {
      return Object.keys(zipCodeItem)[0] !== zipCode;
    })

    this.setState({ zipCodeList:tempZipCodeList })
  }

  render() {

    return (
      <div>
        <View
          zipCodeList={this.state.zipCodeList}
          addZipCodeToList={this.addZipCodeToList}
          zipCodeInput={this.state.zipCodeInput}
          updateZipCodeInput={this.updateZipCodeInput}
          highlightCityState={this.highlightCityState}
          removeCityState={this.removeCityState}
        />
      </div>
    );
  }
}

export default App;