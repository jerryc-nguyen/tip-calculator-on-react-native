import Utils from '../utils'
import React, { Component } from 'react';
import AppRoutes from '../routes'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Slider,
  Keyboard,
  TouchableWithoutFeedback,
  Navigator,
  Button,
  Picker,
  AsyncStorage
} from 'react-native';

import SegmentedControlTab from 'react-native-segmented-control-tab'

class Settings extends Component {
  constructor(props) {
    super(props);

    this.currenciesOptions = { 
      dong:     { label: "Viet Nam Dong", locale: "vi-VN", option: { style: 'currency', currency: 'd' }},
      usdollar: { label: "US Dollar",     locale: "en-US", option: { style: 'currency', currency: '$' }},
      euro:     { label: "Euro",          locale: "en-US", option: { style: 'currency', currency: '€' }}
    }

    this.currencies = Object.keys(this.currenciesOptions)

    this.selectCurrenciesLabel = this.currencies.map( (item, index) => { 
      return this.currenciesOptions[item].label 
    })

    console.log("this.selectCurrencies", this.selectCurrencies);

    this.state = {
      sceneTransition: "FloatFromRight",
      currency: "dong",
      selectedCurrencyIndex: 0
    }

    this.props.route.performRightAction = () => {
      this.props.navigator.pop();
    }
  }

  goto(page) {
    this.props.navigator.pop(page);
  }

  async getSceneTransition() {
    AsyncStorage.getItem("SCENE_SELECTED", (error, value) => {
      if (error) {
        return
      }
      this.setState({
        sceneTransition : value
      });
    });
  }
  
  async setSelectedSceneTransition(scene) {
    try {
      this.setState({
        sceneTransition : scene
      })

      AsyncStorage.setItem("SCENE_SELECTED", scene);
    } catch(error) {
       console.log("Hmm, something when wrong when set data..." + error);
    }
  }

  componentDidMount() {
    this.getSceneTransition();
  }

  handleTipValuesChanged(values) {
    this.setState({
      defaultTipValues : values
    })
  }

  handleCurrencyChanged(index) {
    this.setState({
      currency : this.currencies[index],
      selectedCurrencyIndex: index
    }, () => { console.log(this.state) })
  }


  renderDefaultTips() {
    return (
      <View>
        <Text style={{fontSize: 20}}>Default tip values: </Text>
        <View>
          <TextInput autoFocus={true} style={{height: 40}} onChangeText={this.handleTipValuesChanged} placeholder="Default tip values"/>
        </View>
      </View>
    )
  }

  renderSelectCurrencies() {
    return (
      <View>
        <Text style={{fontSize: 20}}>Currency: </Text>

        <SegmentedControlTab
          values={ this.selectCurrenciesLabel }
          selectedIndex={ this.state.selectedCurrencyIndex }
          onTabPress={ this.handleCurrencyChanged.bind(this) }
        />
      </View>
    )
  }

  renderSelectScenes() {
    return (
      <View>
        <Text style={{fontSize: 20}}>Scene Transitions: </Text>
        <Picker
          selectedValue={this.state.sceneTransition}
          onValueChange={(scene) => this.setSelectedSceneTransition(scene)}>
          <Picker.Item label="FloatFromRight" value="FloatFromRight" />
          <Picker.Item label="FloatFromLeft" value="FloatFromLeft" />
          <Picker.Item label="FloatFromBottom" value="FloatFromBottom" />
          <Picker.Item label="FloatFromBottomAndroid" value="FloatFromBottomAndroid" />
          <Picker.Item label="SwipeFromLeft" value="SwipeFromLeft" />
          <Picker.Item label="HorizontalSwipeJump" value="HorizontalSwipeJump" />
          <Picker.Item label="HorizontalSwipeJumpFromRight" value="HorizontalSwipeJumpFromRight" />
        </Picker>
      </View>
    )
  }

  render() {
    return(
      <View style={{ marginTop: 60, padding: 10, backgroundColor: "white" }}>        
        {this.renderDefaultTips()}
        {this.renderSelectCurrencies()}
        {this.renderSelectScenes()}
      </View>
    )
  }
}

export default Settings
