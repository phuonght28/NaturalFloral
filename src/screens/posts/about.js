import React, { Component } from "react"
import { StyleSheet, View, Image } from 'react-native'
import { Container, Content, Text, H1 } from "native-base"
import TITLE from "../../components/titleHeader"

const NatwayBG = require("../../resources/images/logo-natway-bg.jpg")
export default class About extends Component {

  render() {
    return (
      <Container>
        <TITLE title={this.props.titleHeader} navigation={this.props.navigation} />
        <Content padder style={{ backgroundColor: "#FFF" }}>
          <Image source={NatwayBG} resizeMode="contain" style={{ flex: 1, height: 163, alignSelf: 'center' }} />
          <View style={{ padding: 10 }}>
            <Text style={[TextStyle.headLine]}>Les compléments alimentaires Flora Natura sont les seuls labellisés {'\n'} Nature et Progrès.</Text>
            <Text style={[TextStyle.line]}>Nous fabriquons et conditionnons réellement tous nos extraits dans notre Laboratoire de Nouvelle Aquitaine, et avons établi des partenariats de qualité avec les producteurs de plantes avec qui nous sommes en relations étroites.</Text>
            <Text style={[TextStyle.line]}>L’origine de chaque plante est inscrite sur chacune de nos boites, ce qui traduit une traçabilité des plus transparentes. Nous avons mis en place une méthode d’extraction et pasteurisation efficace et respectueuse des actifs de la plante, pour en extraire le meilleur sans en altérer la qualité.</Text>
            <Text style={[TextStyle.line]}>Nos synergies de la ruche associent sous forme d’extraits fluides aqueux, le meilleur de la ruche et des plantes ,sans additifs ni conservateurs.</Text>
            <Text style={[TextStyle.line]}>La gelée royale Flora Natura est garantie d’origine française : conditionnée fraiche, ses propriétés et son efficacité sont optimales.</Text>
          </View>
        </Content>
      </Container>
    )
  }
}

const TextStyle = StyleSheet.create({
  paragraph: {
    marginBottom: 10
  },
  line: {
    fontSize: 14,
    fontFamily: 'Montserrat-Light',
    marginBottom: 8,
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