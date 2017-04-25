/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Calculator from './app/calculator'

export default class TipCalculator extends Component {
  render() {
    return (
      <Calculator />
    );
  }
}

AppRegistry.registerComponent('TipCalculator', () => TipCalculator);
