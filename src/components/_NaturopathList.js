import React, { Component } from "react"
import { StyleSheet, View, Text } from 'react-native'
import { Container, Content, Button, Segment } from "native-base"


export default class NaturopathList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentScreen: 'signIn', // can be: 'signUp' or 'signIn' or 'forgot' 
    }
  }
  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.headerTitle} >
          <Segment style={styles.headerSegment} >
            <Button first
              style={[styles.headerSegmentButton, { backgroundColor: this.state.currentScreen === 'signIn' ? "#fff" : undefined, borderColor: "#fff", }]}
              active={this.state.currentScreen === 'signIn' ? true : false} onPress={() => this.setState({ currentScreen: 'signIn' })} >
              <Text style={{ color: this.state.currentScreen === 'signIn' ? "#92C7A9" : "#FFF" }}>Se connecter</Text>
            </Button>
            <Button last
              style={[styles.headerSegmentButton, { backgroundColor: this.state.currentScreen === 'signUp' ? "#fff" : undefined, borderColor: "#fff", }]}
              active={this.state.currentScreen === 'signUp' ? true : false} onPress={() => this.setState({ currentScreen: 'signUp' })}>
              <Text style={{ color: this.state.currentScreen === 'signUp' ? "#92C7A9" : "#FFF" }}>S'inscrire</Text>
            </Button>
          </Segment>
        </View>
        <Content padder>
          {this.state.currentScreen === 'signIn' && <Text style={{ color: this.state.currentScreen === 'signIn' ? "#92C7A9" : "#FFF" }}>Se connecter</Text>}
          {this.state.currentScreen === 'signUp' && <Text style={{ color: this.state.currentScreen === 'signUp' ? "#92C7A9" : "#FFF" }}>S'inscrire</Text>}
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerSegment: {
    backgroundColor: "#92C7A9"
  },
  headerSegmentButton: {
    padding: 10
  },
  headerTitle: {
    flex: 0.6,
    alignSelf: "center",
  }
})

