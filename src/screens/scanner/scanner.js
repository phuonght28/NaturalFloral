import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BarCodeScanner, Permissions } from 'expo'
import { Container, Header, Title, Button, Icon, Left, Right, Body } from "native-base"
import Communications from 'react-native-communications'

const sommaire = []
export default class Scanner extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  render() {
    const { hasCameraPermission } = this.state
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <Container>
          <Header style={{ backgroundColor: "#92C7A9" }} >
            <Left style={{ flex: 0.2, zIndex: 9999 }}>
              <Button transparent onPress={() => this.props.navigation.openDrawer()} >
                <Icon style={{ color: "#fff", fontSize: 30 }} name="menu" type="Entypo" />
              </Button>
            </Left>
            <Body>
              <Title style={{ color: "#FFF", fontSize: 20, fontWeight: "700" }}>Scanner</Title>
            </Body>
            <Right style={{ flex: 0.2 }} />
          </Header>
          <Text>Move the camera to match the bar code.</Text>
          <View style={{ flex: 1 }}>
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={StyleSheet.absoluteFill}
            />
          </View>
        </Container>

      )
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    
    sommaire.push({
      score: { data }
    })
    alert(`Bar code with type ${type} and data ${JSON.stringify(sommaire)} has been scanned!`)
    Communications.email(['test.amagumo@gmail.com'],null,null,'My Subject',sommaire)
    console.log('================ sommaire: ',sommaire)
  }
}