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
  AsyncStorage
} from 'react-native';

import CalculatorPage from './app/screens/calculator'
import SettingsPage from './app/screens/settings'

export default class TipCalculator extends Component {

  async getSceneTransition() {
    try{
      let sceneTransitionValue = await AsyncStorage.getItem("SCENE_SELECTED");
      console.log("sceneTransitionValue", sceneTransitionValue);
      // Store value to State
      this.setState({
        sceneTransition : sceneTransitionValue
      });
    }catch(error){
      console.log("Hmm, something when wrong when get data..." + error);
    }
  }

  render() {
    return (
      <Navigator 
        initialRoute={{id: 'CalculatorPage', title: 'Tip Calculator Page'}} 
        onDidFocus={this.getSceneTransition.bind(this)}
        renderScene={(route, navigator) => {
          switch (route.id) {
            case 'CalculatorPage':
              return <CalculatorPage navigator={navigator} />
              break;
            case 'SettingsPage':
              return <SettingsPage navigator={navigator} />
              break;
            default:
          }
        }}
      />
    );
  }
}

AppRegistry.registerComponent('TipCalculator', () => TipCalculator);
