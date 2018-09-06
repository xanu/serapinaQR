import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {Grid, Col, Row} from 'react-native-easy-grid';
import {Container, Button} from 'native-base';
import SQLite from 'react-native-sqlite-2';
import DialogInput from 'react-native-dialog-input';

class Welcome extends Component {

  static navigationOptions = {
        header: null
    }

  constructor(props) {
    super(props);

    this.state = {
      settings: [],
      isDialogVisible: false
    }

    that = this;
  }

  sendInput=(text)=>{
  
    if(text==this.state.settings.password){
      this.setState({isDialogVisible:false});
      this.props.navigation.navigate("Settings",{camera_type: this.state.settings.camera_type});
    }else{
      Alert.alert("Error","Incorrect Security Password");
    }
  }

  gotoSettings= () =>{

    console.log('go to settings',this.state.settings.password);

    if(this.state.settings.password && this.state.settings.password!=''){
      this.setState({isDialogVisible:true});
    }else{
      this.setState({isDialogVisible:false});
      this.props.navigation.navigate("Settings",{camera_type: this.state.settings.camera_type});
    }
    
  }

  componentDidMount(){
      const db = SQLite.openDatabase('test.db', '1.0', '', 1);
      db.transaction(function (txn) {
          txn.executeSql('DROP TABLE IF EXISTS Settings', []);
          txn.executeSql('CREATE TABLE IF NOT EXISTS Settings(id INTEGER PRIMARY KEY AUTOINCREMENT, password VARCHAR(255) DEFAULT NULL, scan_interval INTEGER DEFAULT "10", API_endpoint LONGTEXT DEFAULT NULL, email VARCHAR(255) DEFAULT NULL, camera_type INTEGER DEFAULT 0, API_key LONGTEXT DEFAULT NULL)', []);
          txn.executeSql('SELECT * FROM `Settings`', [], function (tx, res) {
            
            console.log('res',res,res.rows.length,txn);

            if(res.rows.length==0){
               txn.executeSql('INSERT INTO Settings (password, scan_interval, API_endpoint, email, camera_type, API_key ) VALUES (:password, :scan_interval, :API_endpoint, :email, :camera_type, :API_key)', ['',10,'','',0,'']); 
             
            }
             

          });

          txn.executeSql('SELECT * FROM `Settings`', [], function (tx, res) {
          
            if(res.rows.length>0)
              that.setState({settings: res.rows.item(0)})

              console.log('settings',that.state.settings);

          });

      })
  }

  render() {
    return (
      <Container>
        <Grid>
            <Row size={2}>
              <View style={styles.container}>
                <Text style={{fontSize: 20}}>Welcome to SerapinaQr</Text>
              </View>
            </Row>
            <Row size={1}>
              <View style={styles.container}>
                <Grid>
                  <Col>
                    <Button  onPress={()=>this.props.navigation.navigate("Scanner",{camera_type: this.state.settings.camera_type}) }rounded style={{alignSelf:"center",width:'80%', alignItems:"center", justifyContent: "center", backgroundColor:"#5AB7E5"}}>
                      <Text style={{color:"#fff"}}>Start Scan</Text>
                    </Button>
                  </Col>
                  <Col>
                    <Button onPress={()=>this.gotoSettings() }rounded light style={{alignSelf:"center",width:'80%', alignItems:"center", justifyContent: "center"}}>
                      <Text style={{color:"#666"}}>Settings</Text>
                    </Button>
                  </Col>
                </Grid>
                
                
              </View>
            </Row>
        </Grid>

        <DialogInput isDialogVisible={this.state.isDialogVisible}
            title={"Security"}
            message={"Enter you security password to continue"}
            submitInput={ (inputText) => {this.sendInput(inputText)} }
            closeDialog={ () => {this.setState({isDialogVisible:false})}} />
      </Container>

      
    );
  }
}


export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
