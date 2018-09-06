/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
class Main extends Component<Props> {


  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>this.props.increaseCounter()}><Text>Decrease</Text></TouchableOpacity>
        <Text>{this.props.counter}</Text>
        <TouchableOpacity onPress={()=>this.props.decreaseCounter()  }><Text>Increase</Text></TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch){
  return {
      increaseCounter: () => dispatch({type:'INCREASE_COUNTER'}),
      decreaseCounter: () => dispatch({type:'DECREASE_COUNTER'})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
