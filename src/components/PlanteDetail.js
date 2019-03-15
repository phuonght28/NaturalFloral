import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import { Icon } from 'native-base'
import AssociatedProducts from './AssociatedProducts'

export default class PlantesDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { plante } = this.props
    return (
      <View style={{ padding: 20 }} >
        {plante.favori == true && <Icon style={{ color: "#F78B32" }} name='star' type="FontAwesome" />}
        <View style={TextStyle.paragraph}>
          <Text style={[TextStyle.paragraph]}><Text style={[{ fontWeight: '600' }]}>Nom latin : </Text>{plante.nom_latin}</Text>
          <Text style={[TextStyle.paragraph]}><Text style={[{ fontWeight: '600' }]}>Nom commun : </Text>{plante.nom_commun}</Text>
          <Text style={[TextStyle.paragraph]}><Text style={[{ fontWeight: '600' }]}>Famille : </Text>{plante.famille}</Text>
          <Text style={[TextStyle.paragraph]}><Text style={[{ fontWeight: '600' }]}>Drogue : </Text>{plante.drogue}</Text>
        </View>
        <View style={TextStyle.paragraph}>
          <Text style={[TextStyle.line, { fontWeight: '600', color: "#85cdb4" }]}>Description botanique</Text>
          <Text style={[TextStyle.line]}>{plante.description_botanique}</Text>
        </View>
        <View style={TextStyle.paragraph}>
          <Text style={[TextStyle.line, { fontWeight: '600', color: "#85cdb4" }]}>Principaux constituants</Text>
          <Text style={[TextStyle.line]}>{plante.principaux_constituants}</Text>
        </View>
        <View style={TextStyle.paragraph}>
          <Text style={[TextStyle.line, { fontWeight: '600', color: "#85cdb4" }]}>Principaux effets</Text>
          <Text style={[TextStyle.line]}>{plante.principaux_effets}</Text>
        </View>
        <View style={TextStyle.paragraph}>
          <Text style={[TextStyle.line, { fontWeight: '600', color: "#85cdb4" }]}>Précautions d’emploi</Text>
          <Text style={[TextStyle.line]}>{plante.precautions_demploi}</Text>
        </View>
        <View style={TextStyle.paragraph}>
          <Text style={[TextStyle.line, { fontWeight: '600', color: "#85cdb4" }]}>Indication</Text>
          <Text style={[TextStyle.line]}>{plante.indication}</Text>
        </View>
        <View style={TextStyle.paragraph}>
          <Text style={[TextStyle.line, { fontWeight: '600', color: "#85cdb4" }]}>Indication externe</Text>
          <Text style={[TextStyle.line]}>{plante.external_indication}</Text>
        </View>
        <View style={TextStyle.paragraph}>
          <Text style={[TextStyle.line, { fontWeight: '600', color: "#85cdb4" }]}>Propriétés externes</Text>
          <Text style={[TextStyle.line]}>{plante.external_properties}</Text>
        </View>
        <View style={TextStyle.paragraph}>
          <Text style={[TextStyle.line, { fontWeight: '600', color: "#85cdb4" }]}>Précautions</Text>
          <Text style={[TextStyle.line]}>{plante.precautions}</Text>
        </View>
        <View style={TextStyle.paragraph}>
          <Text style={[TextStyle.line, { fontWeight: '600', color: "#85cdb4" }]}>Propriétés</Text>
          <Text style={[TextStyle.line]}>{plante.proprietes}</Text>
        </View>
        <View style={[TextStyle.paragraph, { paddingBottom: 80 }]}>
          <Text style={[TextStyle.paragraph, { fontWeight: '600', color: "#85cdb4" }]}>Produits associés</Text>
          <AssociatedProducts navigation={this.props.navigation} produits_associes={plante.produits_associes} />
        </View>
      </View>
    )
  }
}
const TextStyle = StyleSheet.create({
  paragraph: {
    marginBottom: 8
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