import React, { Component } from "react"
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native'
import ProduitsStorage from '../../services/produits'
import PlantesStorage from '../../services/plantes'
import ImageStorage from '../../services/images'

export default class PlantesDetail extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() { }

  _viewDetail(qrCode) {
    this.props.navigation.navigate('ProductsDetail', { qrCode })
  }

  render() {
    const plant = PlantesStorage.find((item) => item.img === this.props.navigation.state.params.item)

    return (
      <ScrollView>
        <View style={[TextStyle.paragraph]} key={index}>
          <Text style={[TextStyle.headLine]}>List Result</Text>
          <Text style={[TextStyle.line]} size={'small'}> </Text>
        </View>
      </ScrollView>
    )
  }
}


const TextStyle = StyleSheet.create({
  paragraph: {
    marginBottom: 10
  },
  line: {
    fontFamily: 'Montserrat-LightItalic',
    marginBottom: 5
  },
  headLine: {
    color: "#5E9175",
    fontWeight: '600',
    fontFamily: 'Montserrat-BoldItalic',
    marginBottom: 8
  }
})