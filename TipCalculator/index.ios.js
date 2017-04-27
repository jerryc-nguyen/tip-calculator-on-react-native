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
  View,
  Navigator,
  Button,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';

import CalculatorPage from './app/screens/calculator'
import SettingsPage from './app/screens/settings'
import AppRoutes from './app/routes'
import CustomNavBar from './app/custom-nav-bar'

export default class TipCalculator extends Component {

  constructor(props) {
    super(props);
    this.state = { sceneTransition: "FloatFromRight" };
  }

  loadSettings() {
    AsyncStorage.getItem("SELECTED_SETTINGS", (error, value) => {
      if (error) {
        return
      }
      let setting = JSON.parse(value);
      this.setState(setting);
    });
  }

  renderScene(route, navigator) {
    switch (route.id) {
      case 'CalculatorPage':
        return <CalculatorPage navigator={navigator} route={route} />
        break;
      case 'SettingsPage':
        return <SettingsPage navigator={navigator} route={route} />
        break;
      default:
    }
  }

  configureScene(route) {
    return Navigator.SceneConfigs[this.state.sceneTransition];
  }

  render() {

    return (
      <Navigator 
        initialRoute={AppRoutes.CalculatorPage} 
        onDidFocus={this.loadSettings.bind(this)}
        renderScene={this.renderScene.bind(this)}
        configureScene={this.configureScene.bind(this)}
        navigationBar={CustomNavBar} 
      />
    );
  }
}

AppRegistry.registerComponent('TipCalculator', () => TipCalculator);
