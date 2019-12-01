import React, { Component } from "react"
import { StyleSheet, View, Image, ImageBackground, Text } from 'react-native'
import { Container } from "native-base"
import TITLE from "../../components/titleHeader"
const FloraNaturaBG = require("../../resources/images/logo-1024pt.png")

const NatwayNonBG = require("../../resources/images/logo-natway.png")
const bandeau = require("../../resources/images/bandeau2.jpg")

export default class ContactUs extends Component {

  render() {
    return (
      <Container>
        <TITLE title={this.props.titleHeader} navigation={this.props.navigation} />
        <ImageBackground source={bandeau} style={{ flex: 1, width: null, height: null, alignItems: 'center' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <View style={{ backgroundColor: 'rgba(255,255,255,0.85)', margin: 10, padding: 10 }}>
              <Image source={FloraNaturaBG} resizeMode="contain" style={{ width: 320, height: 163, alignSelf: 'center' }} />
              <Text style={[TextStyle.line]}>64 ZI EYGRETEAU</Text>
              <Text style={[TextStyle.line, TextStyle.paragraph]}>33230 COUTRAS FRANCE</Text>
              <Text style={[TextStyle.line]}>+33 (0)5 57 49 75 82</Text>
              <Text style={[TextStyle.line, TextStyle.paragraph]}>+33 (0)9 67 89 75 82</Text>
              <Text style={[TextStyle.line, TextStyle.paragraph]}>Contact commercial</Text>
              <Text style={[TextStyle.line]}>Secteur Nord-Est : +33 (0)7 82 55 79 77</Text>
              <Text style={[TextStyle.line]}>Secteur Sud-Est : +33 (0)6 95 47 76 37</Text>
              <Text style={[TextStyle.line]}>Secteur Nord-Ouest : +33 (0)7 69 41 55 15</Text>
              <Text style={[TextStyle.line, TextStyle.paragraph]}>Secteur Sud-Ouest : +33 (0)6 52 80 60 28</Text>
              <Text style={[TextStyle.line, TextStyle.paragraph]}>info@flora-natura.com</Text>
            </View>
          </View>
        </ImageBackground>
      </Container>
    )
  }
}
const TextStyle = StyleSheet.create({
  paragraph: {
    marginBottom: 15
  },
  line: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 5,
    textAlign: 'center'
  },
  headLine: {
    color: "#5E9175",
    fontWeight: '600',
    fontFamily: 'Montserrat-BoldItalic',
    marginBottom: 8,
    textAlign: 'center'
  }
})