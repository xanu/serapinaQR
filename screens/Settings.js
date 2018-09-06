import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {List, ListItem, Container, Content, Left, Body, Right, Icon, Header, Button} from 'native-base';
import SwitchSelector from 'react-native-switch-selector';
import Entypo from 'react-native-vector-icons/Entypo';
import {Grid, Col, Row} from 'react-native-easy-grid';
import SQLite from 'react-native-sqlite-2';

class Settings extends Component<Props> {


  static navigationOptions = {
        header: null
    }

  constructor(props) {
    super(props);

    this.state = {
      settings: [],
      camera_type: this.props.navigation.state.params.camera_type
    }

    that = this;
  }

  componentDidMount(){
      const db = SQLite.openDatabase('test.db', '1.0', '', 1);
      db.transaction(function (txn) {
         
          txn.executeSql('SELECT * FROM `Settings`', [], function (tx, res) {
          
            if(res.rows.length>0)
              that.setState({settings: res.rows.item(0)})
              console.log('settings',that.state.settings);

          });

      })
  }

  setCameraType = (value) => {

    const db = SQLite.openDatabase('test.db', '1.0', '', 1);
    
    db.transaction(function (txn) {
        txn.executeSql("UPDATE Settings set camera_type = '"+value+"' "); 
        that.setState({camera_type:value});
        Alert.alert("Success","Camera type updated");
     //   console.log("UPDATE Settings set "+that.state.field+" = '"+this.state.value+"' ");
    });

  }

  render() {

    const options = [
      { label: 'front', value: 0 },
      { label: 'back', value: 1 },
    ];

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent style={{width:"100%"}} onPress={() => this.props.navigation.navigate("Welcome")}>
              <Icon name="ios-arrow-back"/>
            </Button>
          </Left>

          <Body>
           
          </Body>

          <Right>
            
          </Right>
        </Header>
        <Content>
          <List>
            <ListItem itemHeader>
              <Text style={{fontWeight:"bold"}}>General</Text>
            </ListItem>
            <ListItem onPress={()=>this.props.navigation.navigate("SettingsField",{field: "password"})}>
              <Body><Text>Security Password</Text></Body>
              <Right><Entypo name="chevron-right" /></Right>
            </ListItem>
            <ListItem onPress={()=>this.props.navigation.navigate("SettingsField",{field: "scan_interval"})}>
              <Body><Text>Scan Time Interval</Text></Body>
              <Right><Entypo name="chevron-right" /></Right>
            </ListItem>
            <ListItem>
              <Grid>
                <Col><Text>Camera Type</Text></Col>
                <Col>
                  <SwitchSelector options={options} initial={this.state.camera_type} onPress={value => this.setCameraType(value)  } />
                </Col>
              </Grid>
            </ListItem>
            <ListItem itemHeader>
              <Text style={{fontWeight:"bold"}}>Integration</Text>
            </ListItem>
            <ListItem onPress={()=>this.props.navigation.navigate("SettingsField",{field: "API_endpoint"})}>
              <Body><Text>Server Endpoint</Text></Body>
              <Right><Entypo name="chevron-right" /></Right>
            </ListItem>
            <ListItem onPress={()=>this.props.navigation.navigate("SettingsField",{field: "API_key"})}>
              <Body><Text>API key</Text></Body>
              <Right><Entypo name="chevron-right" /></Right>
            </ListItem>
           { /* <ListItem onPress={()=>this.props.navigation.navigate("SettingsField",{field: "email"})}>
              <Body><Text>Email to Send</Text></Body>
              <Right><Entypo name="chevron-right" /></Right>
            </ListItem>*/ }
            <ListItem itemHeader>
              <Text style={{fontWeight:"bold"}}>Data Submission</Text>
            </ListItem>
            <ListItem>
              <Text>Submit to Server</Text>
              <Right></Right>
            </ListItem>
            { /*<ListItem>
              <Text>Send to Email</Text>
              <Right></Right>
            </ListItem>*/ }
          </List>
        </Content>
      </Container>
    );
  }
}


export default Settings

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
