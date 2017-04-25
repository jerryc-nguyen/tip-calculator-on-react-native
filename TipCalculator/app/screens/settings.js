import Utils from '../utils'
import React, { Component } from 'react';
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

class Settings extends Component {
  constructor(props) {
    super(props);
    
    console.log("constructor init!");

    this.state = {
      sceneTransition: "FloatFromRight"
    }
  }

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
  
  async setSelectedSceneTransition(scene) {
    try {
      await AsyncStorage.setItem('SCENE_SELECTED', scene);

      this.setState({
        sceneTransition : scene
      })

    } catch(error) {
       console.log("Hmm, something when wrong when set data..." + error);
    }
  }

  componentDidMount() {
    this.getSceneTransition();
  }

  render() {
    return(
      <View style={{ marginTop: 50,padding: 10, backgroundColor: "white" }}>
        <Button
          style={{width: 10, flex: 0.1}}
          title="Go Back"
          onPress={() => this.props.navigator.pop({id:"CalculatorPage"})}
        />

        <View>
          <Text style={{fontSize: 25}}>Scene Transitions</Text>
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
      </View>
    )
  }
}

export default Settings