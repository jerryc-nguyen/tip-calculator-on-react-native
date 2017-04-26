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

  constructor(props) {
    super(props);
    this.state = { sceneTransition: "FloatFromRight" };
  }

  async getSceneTransition() {
    try{
      let sceneTransitionValue = await AsyncStorage.getItem("SCENE_SELECTED", (error, data) => {
        this.setState({
          sceneTransition : data
        });
      })

      return sceneTransitionValue;
    }catch(error){
      console.log("Hmm, something when wrong when get data..." + error);
    }
  }

  renderScene(route, navigator) {
    switch (route.id) {
      case 'CalculatorPage':
        return <CalculatorPage navigator={navigator} />
        break;
      case 'SettingsPage':
        return <SettingsPage navigator={navigator} />
        break;
      default:
    }
  }

  configureScene(route) {
    if (route.sceneConfig) {
      return route.sceneConfig;
    }

    return Navigator.SceneConfigs[this.state.sceneTransition];
  }

  render() {
    return (
      <Navigator 
        initialRoute={{id: 'CalculatorPage', title: 'Tip Calculator Page'}} 
        onDidFocus={this.getSceneTransition.bind(this)}
        renderScene={this.renderScene.bind(this)}
        configureScene={this.configureScene.bind(this)} 
      />
    );
  }
}

AppRegistry.registerComponent('TipCalculator', () => TipCalculator);
