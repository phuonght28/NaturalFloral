import React, { Component } from "react"
import PropTypes from 'prop-types'
import { StyleSheet, Image, View, Text } from 'react-native'
import { Content } from "native-base"
import ImageStorage from '../services/images'
const defaultItem = {
  "id": "3760265300013",
  "qrCode": "3760265300013",
  "nom": "Aloe vera - Mucilage",
  "plante": "Aloe vera barbadensis",
  "describe": "Aide à maintenir la peau saine - Contribue à un fonctionnement normal du système immunitaire",
  "extrait": "Pur jus d’Aloe Vera Bio* 100%. Convient aux Vegans. *100% des ingrédients agricoles sont issus de l’Agriculture Biologique.",
  "composition": "Pur jus d’Aloe vera Bio: 15ml",
  "keyword": [],
  "attention": ""
}
export default class ProductsDetail extends Component {
  static propTypes = {
    item: PropTypes.object
  }
  render() {
    const produit = this.props.productItem
    return (
      <Content padder>
        <View style={[TextStyle.paragraph, { justifyContent: 'center', flexDirection: 'row' }]}>
          <Image source={ImageStorage.getProduitsImages(produit.id)} />
        </View>
        <View style={TextStyle.paragraph}>
          <Text style={[TextStyle.line, TextStyle.headLine]}>{produit.nom}</Text>
          <Text style={[TextStyle.line, { textAlign: 'center' }]}>{produit.plante}</Text>
        </View>
        <View style={TextStyle.paragraph}>
          <Text style={[TextStyle.line, { fontWeight: '600' }]}>Ingrédients</Text>
          <Text style={[TextStyle.line]}>{produit.extrait}</Text>
        </View>
        <View style={TextStyle.paragraph}>
          <Text style={[TextStyle.line, { fontWeight: '600' }]}>Composition</Text>
          <Text style={[TextStyle.line]}>{produit.composition}</Text>
        </View>
        <View style={TextStyle.paragraph}>
          <Text style={[TextStyle.line]}>{produit.describe}</Text>
          <Text style={[TextStyle.line, { color: "#E68772", marginBottom: 5, marginTop: 5 }]}>{produit.attention}</Text>
        </View> 
      </Content>
    )
  }
}

const TextStyle = StyleSheet.create({
  paragraph: {
    marginBottom: 10
  },
  line: {
    marginBottom: 5
  },
  headLine: {
    color: "#92C7A9",
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center'
  }
})