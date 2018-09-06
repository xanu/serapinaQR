import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Container, Content, Button} from 'native-base';
import {Grid, Col, Row} from 'react-native-easy-grid';
import SQLite from 'react-native-sqlite-2';

class ThankYou extends Component<Props> {

   static navigationOptions = {
        header: null
    }

  constructor(props) {
    super(props);

    this.state = {
      settings: [],
      isNewScanDisabled: true,
      camera_type: this.props.navigation.state.params.camera_type
    }

    that = this;
  }

  componentDidMount(){

    const db = SQLite.openDatabase('test.db', '1.0', '', 1);

    db.transaction(function (txn) {

      var now = new Date();

      console.log("saving data");
      console.log('txn',txn);
      txn.executeSql('CREATE TABLE IF NOT EXISTS DailyTimeRecords(id INTEGER PRIMARY KEY AUTOINCREMENT, referenceNumber text NOT NULL, datetime REAL)', []);
      txn.executeSql('INSERT INTO DailyTimeRecords (referenceNumber, datetime ) VALUES (:referenceNumber, :datetime )', ['12345',new Date(now).toISOString()]);
      
      /*txn.executeSql('SELECT * FROM `DailyTimeRecords`', [], function (tx, res) {
        for (let i = 0; i < res.rows.length; ++i) {
          console.log('item:', res.rows.item(i));
        }
      });*/

      txn.executeSql('SELECT * FROM `Settings`', [], function (tx, res) {
          
          if(res.rows.length>0)
            that.setState({settings: res.rows.item(0)})

            console.log('settings',that.state.settings.scan_interval);

            setTimeout(function(){
              that.setState({isNewScanDisabled:false});
            },Number( that.state.settings.scan_interval ) * 1000);

        });

    })

  }

  render() {
    return (
      <Container>
        <Grid>
          <Row size={2}>
            <View style={styles.container}>
              <Text style={{fontSize: 30}}>Thank You</Text>
              <Text>Your time has been recorded</Text>
          </View>
          </Row>
          <Row size={1}>
            <Grid style={{marginTop:15}}>
              <Col>
               { this.state.isNewScanDisabled==true && 
                <Button disabled light onPress={()=>this.props.navigation.navigate("Scanner") }rounded style={{alignSelf:"center",width:'80%', alignItems:"center", justifyContent: "center"}}>
                      <Text style={{color:"#666"}}>Please wait..</Text>
                </Button>
               }

               { this.state.isNewScanDisabled==false && 
                <Button onPress={()=>this.props.navigation.navigate("Scanner",{camera_type:this.state.camera_type}) }rounded style={{alignSelf:"center",width:'80%', alignItems:"center", justifyContent: "center", backgroundColor:"#5AB7E5"}}>
                      <Text style={{color:"#fff"}}>New Scan</Text>
                </Button>
               }
              </Col>
              <Col>
              
                <Button  onPress={()=>this.props.navigation.navigate("Welcome") }rounded light style={{alignSelf:"center",width:'80%', alignItems:"center", justifyContent: "center"}}>
                    <Text style={{color:"#666"}}>Exit</Text>
                </Button>
              </Col>
            </Grid>
          </Row>
        </Grid>
          
        
      </Container>
    );
  }
}


export default ThankYou

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
