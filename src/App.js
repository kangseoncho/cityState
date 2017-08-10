import React, { Component } from 'react';

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
      zipCodeList: [],
      zipCodeInput: undefined,
    };

    this.saveLocation = this.saveLocation.bind(this);
    this.inputZipCode = this.inputZipCode.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.fillInputWithZipcode = this.fillInputWithZipcode.bind(this);
    this.updateZipCodeList = this.updateZipCodeList.bind(this);
  }

  componentDidMount() {
    //load up initial item for the list
    fetch('https://api.zippopotam.us/us/90210')
      .then(res => res.json())
      .then(cityData => {
        this.updateZipCodeList(cityData);
      })
  }

  //update list when new item is added
  updateZipCodeList(cityData) {
    let tempZipCodeList = this.state.zipCodeList;
    let newCityInfo = {};
    //object with zip, city, and state. Also will house class for indicating selection
    newCityInfo[cityData['post code']] = `${cityData.places[0]['place name']}, ${cityData.places[0]['state abbreviation']}`
    newCityInfo['selected'] = 'notSelected';
    tempZipCodeList.push(newCityInfo);
    this.setState({ zipCodeList: tempZipCodeList });
  }

  //bold the selected city, state
  toggleDisplay(cityInfo) {
    const tempZipCodeList = this.state.zipCodeList.map((cities, index) => {

      if (Object.keys(cities)[0] === Object.keys(cityInfo)[0]) {
        if (cities['selected'] === 'selected') cities['selected'] = 'notSelected';
        else cities['selected'] = 'selected';
      }
      else {
        cities['selected'] = 'notSelected';
      }

      return cities;
    })

    this.setState({ zipCodeList: tempZipCodeList })
  }

  //remember zipcode input
  inputZipCode(e) {
    this.setState({ zipCodeInput: e.target.value });
  }

  //enter new location to the list of city, state if one doesn't already exist
  saveLocation() {

    fetch(`https://api.zippopotam.us/us/${this.state.zipCodeInput}`)
      .then(res => res.json())
      .then(cityData => {
        let alreadyInList = false;
        //go through the list and see if same entry already exists
        this.state.zipCodeList.map((cities) => {
          if (Object.keys(cities)[0] === cityData['post code']) alreadyInList = true;
        })
        //since no existing entry found, add to list
        if (alreadyInList === false) {
          this.updateZipCodeList(cityData);
          this.toggleDisplay(cityData);
        }
      })
  }

  //input field's value becomes the zipcode from city & state
  fillInputWithZipcode(cityInfo) {
    this.setState({ zipCodeInput: Object.keys(cityInfo)[0] });
  }

  render() {

    const displayCityState = this.state.zipCodeList.map((cityInfo, index) => {
      return (
        <div key={index} onClick={() => { this.toggleDisplay(cityInfo); this.fillInputWithZipcode(cityInfo) }}
          className={cityInfo['selected'] + ' ' + 'location'}>
          {cityInfo[Object.keys(cityInfo)[0]]}
        </div>
      )
    })

    return (
      <div className="App">
        <h2>Find Cities by Zipcode</h2>

        <div id="location">
          {displayCityState}
        </div>

        <div id="formDiv">
          <input type="text" value={this.state.zipCodeInput} placeholder="Zip Code" onChange={this.inputZipCode}></input>
          <button type='submit' onClick={() => this.saveLocation()}> enter zipcode </button>
        </div>
      </div>
    );
  }
}

export default App;