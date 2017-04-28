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
  LayoutAnimation,
  AsyncStorage,
  Animated
} from 'react-native';

import SegmentedControlTab from 'react-native-segmented-control-tab'

class Calculator extends Component {

  constructor(props) {
    super(props);

    this.currenciesOptions = Utils.currencies;

    this.state = {
      selectedTipIndex: 0,
      billAmount: 0,
      tipAmount: 0,
      percent: 0.1,
      result: 0,
      marginTop: new Animated.Value(100),
      opacity: new Animated.Value(0),
      tipDefaultValues: ["10%", "15%", "20%"],
      selectedCurrency: "dong",
      billAmountMarginTop: new Animated.Value(100),
      billAmountHeight: new Animated.Value(150)
    };

    this.props.route.performRightAction = () => {
      this.goto(AppRoutes.SettingsPage)
    }

    this.props.route.eventHandler.addListener("SELECTED_SETTINGS_CHANGED", () => {
      this.loadSettings();
    })
  }

  loadSettings() {
    AsyncStorage.getItem("SELECTED_SETTINGS", (error, value) => {
      if (error) {
        return
      }
      let settings = JSON.parse(value);
      let tipDefaultValues = settings.tipDefaultValues ? settings.tipDefaultValues.split(" ") : [];
      
      if (tipDefaultValues.length > 0) {
        this.setState({tipDefaultValues: tipDefaultValues});
      }

      if (settings.selectedCurrency) {
        this.setState({selectedCurrency: settings.selectedCurrency});
      }
    });
  }

  goto(page) {
    this.props.navigator.push(page)
  }

  handleTipAmountChanged = (index)=> {
    let percent = parseInt(this.state.tipDefaultValues[index]) / 100;
    let tipAmount = (this.state.billAmount * percent).round(2);
    let result = this.state.billAmount + tipAmount

    this.setState({
      selectedTipIndex: index,
      percent: percent,
      tipAmount: tipAmount,
      result: result
    });
  }

  handleAmountChanged = (value)=> {
    this.loadSettings()

    value = parseInt(value || 0)
    this.setState({ billAmount:  value}, () => {
      this.handleTipAmountChanged(this.state.selectedTipIndex)
    });

    if (value > 0) {
      Animated.timing(
          this.state.opacity,
          {
              toValue: 1,
              duration: 300
          }
      ).start();

      Animated.timing(
          this.state.marginTop,
          {
              toValue: 0,
              duration: 300
          }
      ).start();

      Animated.timing(
          this.state.billAmountMarginTop,
          {
              toValue: 0,
              duration: 300
          }
      ).start();

    } else { 
      Animated.timing(
          this.state.opacity,
          {
              toValue: 0,
              duration: 500
          }
      ).start();

      Animated.timing(
          this.state.marginTop,
          {
              toValue: 100,
              duration: 500
          }
      ).start();

      Animated.timing(
          this.state.billAmountMarginTop,
          {
              toValue: 100,
              duration: 300
          }
      ).start();
    }
  }

  componentWillMount() {
    this.loadSettings();
  }

  render() {
    return (

      <View style={{ marginTop: 60, padding: 10, backgroundColor: "white" }}>

        <TouchableWithoutFeedback onPress={ () => {Keyboard.dismiss()} }>
          <View>

            <Animated.View style={{marginTop: this.state.billAmountMarginTop}}>
              <TextInput autoFocus={true} keyboardType='numeric' style={{height: 80, fontSize: 40}} onChangeText={this.handleAmountChanged} placeholder="Bill amount"/>
            </Animated.View>

            <Animated.View style={{marginTop: this.state.marginTop, opacity: this.state.opacity}}>
              <View>
                <SegmentedControlTab
                  values={ this.state.tipDefaultValues }
                  selectedIndex={ this.state.selectedTipIndex }
                  onTabPress={ this.handleTipAmountChanged }
                />
              </View>

              <View style={{marginTop: 10}}>
                <Text style={{lineHeight: 25}}>Bill amount: { Utils.formatNumber(this.state.billAmount, this.state.selectedCurrency) }</Text>
                <Text style={{lineHeight: 25}}>Tip amount: { Utils.formatNumber(this.state.tipAmount, this.state.selectedCurrency) }</Text>
                <Text style={{lineHeight: 25}}>Percent: { this.state.percent }</Text>
              </View>

              <View style={{marginTop: 20}}>
                <Text style={{fontWeight: "700", fontSize: 20}}>Result: { Utils.formatNumber(this.state.result, this.state.selectedCurrency) }</Text>
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default Calculator
