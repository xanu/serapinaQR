import React, {Component} from 'react';
import {Dimensions, Platform, StyleSheet, Text, View, TouchableOpacity, Button, Alert} from 'react-native';
import {Textarea, Container, Content} from "native-base";
import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('test.db', '1.0', '', 1);

class SettingsField extends Component<Props> {

  static navigationOptions = {
      headerRight: ( <Button onPress={()=>that.updateSettings()} title="Save" transparent /> )
  }
  constructor(props) {
    super(props);

    this.state = {
      field: this.props.navigation.state.params.field,
      value: '',
      settings: []
    }

    that = this;

    console.log('state',this.state);
  }

  updateSettings = () => {
     /* db.transaction("UPDATE Settings set",function (txn) {

      });*/
    if(this.state.field=="scan_interval")
    {
        if(isNaN( Number(this.state.value) ) ){
          Alert.alert("Error","Please input a valid integer number");
          return;
        }
          
    }

    
    db.transaction(function (txn) {
        txn.executeSql("UPDATE Settings set "+that.state.field+" = '"+that.state.value+"' "); 
        Alert.alert("Success","Setting updated");
     //   console.log("UPDATE Settings set "+that.state.field+" = '"+this.state.value+"' ");
    });
    

    
  }

  componentDidMount(){

    const db = SQLite.openDatabase('test.db', '1.0', '', 1);
    db.transaction(function (txn) {
        txn.executeSql('SELECT * FROM `Settings`', [], function (tx, res) {
          
          if(res.rows.length>0){
            that.setState({settings: res.rows.item(0)})
            console.log('state',that.state);

            if(that.state.field=="password")
              that.setState({ value:that.state.settings.password });
            else if(that.state.field=="scan_interval")
              that.setState({ value:""+that.state.settings.scan_interval });
            else if(that.state.field=="API_endpoint")
              that.setState({ value:""+that.state.settings.API_endpoint });
            else if(that.state.field=="API_key")
              that.setState({ value:""+that.state.settings.API_key });
            else if(that.state.field=="email")
              that.setState({ value:""+that.state.settings.email });
          }
            


          console.log('res',that.state.settings);

        });

    })

  }

  render() {
    return (
      <Container>
        <Content enableAutomaticScroll>
          <Textarea 
            value={this.state.value}
            onChangeText={(text)=>this.setState({value:text})}
            placeholder="Enter valid values"
            style={{height: Dimensions.get("window").height}}
          />
        </Content>
      </Container>
    );
  }
}


export default SettingsField

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
