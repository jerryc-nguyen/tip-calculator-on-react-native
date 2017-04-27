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
  LayoutAnimation
} from 'react-native';

import SegmentedControlTab from 'react-native-segmented-control-tab'

class Calculator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      billAmount: 0,
      tipAmount: 0,
      percent: 0.1,
      result: 0,
      marginTop: 100,
      opacity: 0
    };

    this.props.route.performRightAction = () => {
      this.goto(AppRoutes.SettingsPage)
    }
  }

  goto(page) {
    this.props.navigator.push(page)
  }

  handleTipAmountChanged = (index)=> {
    let percent = (index + 1) * 10 / 100;
    let tipAmount = (this.state.billAmount * percent).round(2);
    let result = this.state.billAmount + tipAmount

    this.setState({
      selectedIndex: index,
      percent: percent,
      tipAmount: tipAmount,
      result: result
    });
  }

  handleAmountChanged = (value)=> {
    value = parseInt(value || 0)
    this.setState({ billAmount:  value}, () => {
      this.handleTipAmountChanged(this.state.selectedIndex)
    });

    LayoutAnimation.easeInEaseOut();

    if (value > 0) {
      this.setState({marginTop: 0, opacity: 1});
    } else { 
      this.setState({marginTop: 100, opacity: 0});
    }
  }

  render() {
    return (

      <View style={{ marginTop: 60, padding: 10, backgroundColor: "white" }}>

        <TouchableWithoutFeedback onPress={ () => {Keyboard.dismiss()} }>
          <View>

            <View>
              <TextInput autoFocus={true} keyboardType='numeric' style={{height: 40}} onChangeText={this.handleAmountChanged} placeholder="Input your bill amount"/>
            </View>

            <View style={{marginTop: this.state.marginTop, opacity: this.state.opacity}}>
              <View>
                <SegmentedControlTab
                  values={ ['10%', '20%', '30%'] }
                  selectedIndex={ this.state.selectedIndex }
                  onTabPress={ this.handleTipAmountChanged }
                />
              </View>

              <View>
                <Text>Bill amount: { this.state.billAmount }</Text>
                <Text>Tip amount: { this.state.tipAmount }</Text>
                <Text>Percent: { this.state.percent }</Text>
              </View>

              <View>
                <Text>Result: { this.state.result }</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default Calculator
