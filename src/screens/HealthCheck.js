import React, { Component } from "react"
import { Container, Content, View, Text, Button } from "native-base"
import TITLE from '../components/titleHeader'
export default class HealthCheck extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: "#f1f2f7" }}>
        <TITLE navigation={this.props.navigation} title={this.props.title} />
        <Content padder >
          <View style={{ justifyContent: 'space-between' }}>
            <Text style={{ textAlign: 'center', fontSize: 16, margin: 20 }}>Fonction disponible aux membres uniquement</Text>
            <Button dark bordered style={{ alignSelf: 'center' }} onPress={() => alert("La fonction n'a pas été activée.")} >
              <Text style={{ textAlign: 'center', fontSize: 14, color: 'black' }}> Devenir membre </Text>
            </Button>
          </View>
        </Content>
      </Container >
    )
  }
}