import React, { Component } from 'react';
import Header from './../components/Header';
import CityStateListContainer from './CityStateListContainer';
import ZipcodeInput from './../components/ZipcodeInput';

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
  render() {
    return (
      <div>
        <Header />
        <br /><br />
        <CityStateListContainer />
        <ZipcodeInput />
      </div>
    )
  }
}

export default App;