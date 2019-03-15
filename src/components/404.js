import React, { Component } from "react"
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from "react-native"
import { Container, Content } from "native-base"
import TITLE from '../components/titleHeader'

export default class Screen404 extends Component {
  static propTypes = {
    title: PropTypes.string
  }

  render() {
    <Container style={{ backgroundColor: "#92C7A9" }}>
      <TITLE title={this.props.title} navigation={this.props.navigation} iconMenu={'close'} />
      <Content padder style={{ backgroundColor: "#f1f2f7" }}>
        <View style={TextStyle.paragraph}>
          <Text style={[TextStyle.line, { textAlign: 'center' }]}>Contenu non disponible</Text>
        </View>
      </Content>
    </Container >
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