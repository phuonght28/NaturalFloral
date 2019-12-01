import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BarCodeScanner, Permissions } from 'expo'
import { Container, Content, Button } from "native-base"
import TITLE from '../components/titleHeader'
import PRODUITS from '../parsers/produits'
import IMAGES from '../services/images'

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
  _handleBarCodeRead = ({ data }) => {
    const produit = PRODUITS.find((item) => item.id == data)
    if (produit) {
      produit.img = IMAGES.getProduitsImages(produit.id)
      this.props.navigation.navigate('ProductsDetail', produit)
    }
    else {
      alert('Produit non trouvé.')
    }
  }
  render() {
    const { hasCameraPermission } = this.state
    if (hasCameraPermission === null) {
      return (
        <Container style={{ backgroundColor: "#92C7A9" }}>
          <TITLE title={this.props.titleHeader} navigation={this.props.navigation} iconMenu={'close'} />
          <Content padder style={{ backgroundColor: "#f1f2f7" }}>
            <Text>Demande de permission de caméra</Text>
          </Content>
        </Container >
      )
    }
    else if (hasCameraPermission === false) {
      return (
        <Container style={{ backgroundColor: "#92C7A9" }}>
          <TitleHeader title={this.props.titleHeader} navigation={this.props.navigation} iconMenu={'close'} />
          <Content padder style={{ backgroundColor: "#f1f2f7" }}>
            <Text>Pas d'accès à la caméra</Text>
            <Button onPress={() => this.props.navigation.goBack()}>Retour</Button>
          </Content>
        </Container >
      )
    }
    else {
      return (
        <Container>
          <View style={{ flex: 1 }}>
            <BarCodeScanner
              type={this.state.cameraDirection}
              onBarCodeRead={this._handleBarCodeRead}
              style={StyleSheet.absoluteFill}
            >
              <View style={styles.layerTop}>
                <Text style={{ color: "#FFF", fontSize: 22, lineHeight: 30 }}>Scan QR Code</Text>
              </View>
              <View style={styles.layerCenter}>
                <View style={styles.layerLeft} />
                <View style={[styles.focused]}>
                  <View style={{ height: 1, backgroundColor: 'white', borderBottomColor: 'red', borderBottomWidth: 1 }} />
                  <View style={[styles.corner, styles.cornerTopRight]} />
                  <View style={[styles.corner, styles.cornerTopLeft]} />
                  <View style={[styles.corner, styles.borderBottomLeft]} />
                  <View style={[styles.corner, styles.borderBottomRight]} />
                </View>
                <View style={styles.layerRight} />
              </View>
              <View style={styles.layerBottom}>
                <Button transparent onPress={() => this.props.navigation.goBack()} style={{ alignSelf: 'center' }}>
                  <Text style={{ color: "#FFF", fontSize: 16, lineHeight: 30 }}>Retour</Text>
                </Button>
              </View>
            </BarCodeScanner>
          </View>
        </Container>
      )
    }
  }
}
const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  layerTop: {
    flex: 1,
    backgroundColor: opacity,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  layerCenter: {
    flex: 2,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 2,
    backgroundColor: opacity
  },
  focused: {
    flex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative'
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: 'white'
  },
  cornerTopLeft: {
    left: 0,
    top: 0,
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderTopLeftRadius: 10
  },
  cornerTopRight: {
    right: 0,
    top: 0,
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderTopRightRadius: 10
  },
  borderBottomLeft: {
    left: 0,
    bottom: 0,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderBottomLeftRadius: 10
  },
  borderBottomRight: {
    right: 0,
    bottom: 0,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderBottomRightRadius: 10
  },
  layerRight: {
    flex: 2,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 1,
    backgroundColor: opacity,
    alignItems: 'center',
    justifyContent: 'center'
  },
});