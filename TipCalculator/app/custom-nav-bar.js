import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

export default (
  <Navigator.NavigationBar 
    routeMapper={{ 
      LeftButton: (route, navigator, index, navState) => { 
        return ( 
          <TouchableHighlight onPress={() => navigator.pop()}><Text>{route.labelLeft}</Text></TouchableHighlight> 
        ); 
      }, 
      RightButton: (route, navigator, index, navState) => {
        return ( 
          <TouchableHighlight onPress={() => route.performRightAction()}><Text>{route.labelRight}</Text></TouchableHighlight> 
        ); 
      }, 
      Title: (route, navigator, index, navState) => { return (<Text>{route.title}</Text>); }, }} 
      style={{backgroundColor: 'gray'}} 
  />
)
