import React from 'react';
import { connect } from 'react-redux';
import CityStateList from './../components/CityStateList';

const mapStateToProps = (state) => {
  return {
    location: state.zipcode
  }
}

const CityStateListContainer = connect(mapStateToProps)(CityStateList);

export default CityStateListContainer;