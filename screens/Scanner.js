import React, {Component} from 'react';
import {Dimensions,Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Container, Content, Button, Header, Left, Body, Right, Icon} from 'native-base';
import {Grid, Col, Row} from 'react-native-easy-grid';
import QRCodeScanner from 'react-native-qrcode-scanner';
import SQLite from 'react-native-sqlite-2';

let timer = null;
class Scanner extends Component<Props> {

  static navigationOptions = {
        header: null
    }

  constructor(props) {
    super(props);

    this.state = {
      settings: [],
      camera_type: this.props.navigation.state.params.camera_type,
      clock: ''
    }

    that = this;
  }

  onSuccess(e) {
    clearTimeout(timer);
    this.props.navigation.navigate("ThankYou",{qrData: e.data,camera_type: this.state.camera_type})
  }

  _requestCameraPermission = (permission) => {
    Permissions.request(permission).then(response => {
      this.setState({ cameraPermission: response })
    })
  }

  componentDidMount(){
    this.date_time();
  }

     date_time = () => 
    {
            date = new Date;
            year = date.getFullYear();
            month = date.getMonth();
            months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December');
            d = date.getDate();
            day = date.getDay();
            days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
            h = date.getHours();
            if(h<10)
            {
                    h = "0"+h;
            }
            m = date.getMinutes();
            if(m<10)
            {
                    m = "0"+m;
            }
            s = date.getSeconds();
            if(s<10)
            {
                    s = "0"+s;
            }
            result = ''+days[day]+' '+months[month]+' '+d+' '+year+' '+h+':'+m+':'+s;
            this.setState({clock: result});

            timer = setTimeout(function(){
              that.date_time();
            },1000);
           

            return true;
    }


  render() {


    return (
      <Container>
        <Header style={{marginBottom:0}}>
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

          <QRCodeScanner
            ref={(node)=>{ this.scanner = node }}
            onRead={this.onSuccess.bind(this)}
            topContent={
              <Text style={styles.instructions}>
                Place your QR code in front of the camera
              </Text>
            }

            cameraStyle={
              {height: Dimensions.get("window").height-(Dimensions.get("window").height*0.45)}
            }

            bottomContent={
              <Grid style={{marginTop:15}}>
                <Col>
                  <Text style={{alignSelf:"center",fontSize: 20,textAlign:"center",padding: 10}}>{this.state.clock}</Text>
                </Col>
              </Grid>

            }

            showMarker={false}
            cameraType={this.state.camera_type==0?'front':'back'}
          />

        </Content>
      </Container>
    );
  }
}


export default Scanner

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
    marginBottom: 10,
    marginTop: 40

  },
});
