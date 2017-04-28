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

    this.currenciesOptions = Utils.currencies;

    this.currencies = Object.keys(this.currenciesOptions)

    this.selectCurrenciesLabel = this.currencies.map( (item, index) => { 
      return this.currenciesOptions[item].label 
    })

    this.state = {
      sceneTransition: "FloatFromRight",
      selectedCurrency: "dong",
      selectedCurrencyIndex: 0,
      tipDefaultValues: "",
    }

    this.props.route.performRightAction = () => {
      this.saveSettings();
      this.props.navigator.pop();
    }
  }

  goto(page) {
    this.props.navigator.pop(page);
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
  
  saveSettings() {
    try {
      let data = {
        sceneTransition: this.state.sceneTransition,
        selectedCurrency: this.state.selectedCurrency,
        selectedCurrencyIndex: this.state.selectedCurrencyIndex,
        tipDefaultValues: this.state.tipDefaultValues
      }
      AsyncStorage.setItem("SELECTED_SETTINGS", JSON.stringify(data));
    } catch(error) {
       console.log("Hmm, something when wrong when set data..." + error);
    }
  }

  selectedSceneTransition(scene) {
    this.setState({
      sceneTransition : scene
    })
  }

  componentDidMount() {
    this.loadSettings();
  }

  handleTipValuesChanged(values) {
    this.setState({
      tipDefaultValues : values
    })
  }

  handleCurrencyChanged(index) {
    this.setState({
      selectedCurrency : this.currencies[index],
      selectedCurrencyIndex: index
    })
  }

  renderDefaultTips() {
    return (
      <View>
        <Text style={{fontSize: 20}}>Default tip values: </Text>
        <View>
          <TextInput autoFocus={true} style={{height: 40}} onChangeText={this.handleTipValuesChanged.bind(this)} placeholder="Default tip values" value={this.state.tipDefaultValues}/>
        </View>
      </View>
    )
  }

  renderSelectCurrencies() {
    return (
      <View style={{marginTop: 30}}>
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
      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 20}}>Scene Transitions: </Text>
        <Picker
          selectedValue={this.state.sceneTransition}
          onValueChange={this.selectedSceneTransition.bind(this)}>
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
