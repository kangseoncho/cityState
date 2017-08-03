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
      zipCodeInput: undefined
    };

    this.saveLocation = this.saveLocation.bind(this);
    this.inputZipCode = this.inputZipCode.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  componentDidMount() {
    //load up initial item for the list
    let tempZipCodeList = this.state.zipCodeList;
    let newCityInfo = {};

    fetch(`https://api.zippopotam.us/us/90210`)
      .then(res => res.json())
      .then(cityData => {
        //object with zip, city, and state. Also will house class for indicating selection
        newCityInfo[cityData['post code']] = `${cityData.places[0]['place name']}, ${cityData.places[0]['state abbreviation']}`
        newCityInfo['selected'] = false;
        tempZipCodeList.push(newCityInfo);
        this.setState({ zipCodeList: tempZipCodeList });
      })
  }

  //remember zipcode input
  inputZipCode(e) {
    this.setState({ zipCodeInput: e.target.value });
  }

  //enter new location to the list of city, state if one doesn't already exist
  saveLocation() {
    let tempZipCodeList = this.state.zipCodeList;
    let newCityInfo = {};

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
          //enter new object with zip, city, and state. Also will house class for indicating selection
          newCityInfo[cityData['post code']] = `${cityData.places[0]['place name']}, ${cityData.places[0]['state abbreviation']}`
          tempZipCodeList.push(newCityInfo);
          newCityInfo['selected'] = false;
          this.setState({ zipCodeList: tempZipCodeList });
        }
      })
  }

  //fill input field with zipcode, and bold the selected city, state
  toggleDisplay(cityInfo) {
    this.setState({ zipCodeInput: Object.keys(cityInfo)[0] });

    const tempZipCodeList = this.state.zipCodeList.map((cities, index) => {

      if (Object.keys(cities)[0] === Object.keys(cityInfo)[0]) {
        if (cities['selected'] === true) cities['selected'] = false;
        else cities['selected'] = true;
      }
      else if (Object.keys(cities)[0] !== Object.keys(cityInfo)[0]) {
        cities['selected'] = false;
      }

      return cities;
    })

    this.setState({ zipCodeList: tempZipCodeList })
  }

  render() {

    let style = {
      fontWeight: 'bold'
    }
    let none = {
      fontWeight: 'normal'
    };

    const displayCityState = this.state.zipCodeList.map((cityInfo, index) => {
      return (
        <div key={index} onClick={() => this.toggleDisplay(cityInfo)} style={cityInfo['selected'] ? style : none}>
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
          <input type="text" value={this.state.zipCodeInput} placeholder="zipCode" onChange={this.inputZipCode}></input>
          <button type='submit' onClick={() => this.saveLocation()}> enter zipcode </button>
        </div>
      </div>
    );
  }
}

export default App;