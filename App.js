/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Main from './src/main.js';
import TodoApp from './src/TodoApp.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import store from "./src/store";


import Scanner from "./screens/Scanner";
import Settings from "./screens/Settings";
import ThankYou from "./screens/ThankYou";
import Welcome from "./screens/Welcome";
import SettingsField from "./screens/SettingsField";

import {StackNavigator} from 'react-navigation'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

const initialState = {
  counter: 0
}

export default class App extends Component<Props> {

  render() {
    return (
      <Provider store={store}>
          <AppStackNavigator />
      </Provider>
    );
  }
}

const AppStackNavigator = new StackNavigator({
  Welcome: {screen: Welcome},
  Scanner: {screen: Scanner},
  ThankYou: {screen: ThankYou},
  Settings: {screen: Settings},
  SettingsField: {screen: SettingsField}
})

