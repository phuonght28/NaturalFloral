import React, { Component } from "react"
import { StyleSheet, View } from 'react-native'
import { Container, Content, Text } from "native-base"
import TitleHeader from "../../components/titleHeader"
import TypicalStorage from '../../services/parsers/typicalProfiles'
//import ProfilsTypes from '../../services/parsers/profilstypes'
export default class ProfilsTypes extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Container style={{ backgroundColor: "#92C7A9" }}>
        <TitleHeader title={this.props.titleHeader} navigation={this.props.navigation} />
        <Content padder style={{ backgroundColor: "#f1f2f7" }}>
          {TypicalStorage.map((object, index) => {
            const associees = object.associated

            return (
              <View key={index} style={[TextStyle.paragraph]}>
                <Text style={[TextStyle.headLine]}>{object.object}:</Text>
                {associees.map((item) => {
                  return (
                    <Text key={item.plantes} size={'small'} style={[TextStyle.line]}>
                      <Text size={'small'} style={{fontWeight: '600'}}> - {item.plantes}: </Text>
                      {item.descript}
                    </Text>
                  )
                })
                }
              </View>
            )
          })
          }
        </Content>
      </Container >
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