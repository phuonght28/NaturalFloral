import React, { Component } from "react"
import { StyleSheet, View, Image } from 'react-native'
import { Container, Content, Text, H1 } from "native-base"
import TitleHeader from "../../components/titleHeader"
import PROGRES from '../../services/parsers/progres'

export default class Progress extends Component {
  render() {
    return (
      <Container>
        <TitleHeader title={this.props.titleHeader} navigation={this.props.navigation} />
        <Content padder style={{ backgroundColor: "#FFF" }}>
          {PROGRES.map((item, index) => {
            return (
              <View key={index} style={[TextStyle.paragraph]}>
                {item.title && <Text style={[TextStyle.headLine]}>{item.title}</Text>}
                {item.associated && <Text style={[TextStyle.line]}> {item.associated}</Text>}
              </View>
            )
          })}
        </Content>
      </Container>
    )
  }
}

const TextStyle = StyleSheet.create({
  paragraph: {
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  headLine: {
    color: "#5E9175",
    fontFamily: 'Montserrat-MediumItalic',
    marginBottom: 5,
  },
  line: {
    fontSize: 14,
    fontFamily: 'Montserrat-Light',
    marginBottom: 5,
  },
})