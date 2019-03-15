import React, { Component } from "react"
import { Platform, StatusBar, NativeModules, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Container, Content, Button, Icon, Segment } from "native-base"
//import Register from "./connect/register"
import Register from "./ClubFlora/connect/signup"
import Login from "./ClubFlora/connect/login"



const { StatusBarManager } = NativeModules
let STATUS_BAR_H = 44

export default class CheckIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentScreen: 'signIn', // can be: 'signUp' or 'signIn' or 'forgot' 
    }
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(response => STATUS_BAR_H = response.height)
    }
    else {
      STATUS_BAR_H = StatusBar.currentHeight + 6
    }
  }
  render() {
    return (
      <Container style={styles.container}>
        <View style={[styles.headerContainer, { paddingTop: STATUS_BAR_H }]} >
          <View style={styles.headerMenu} >
            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
              <Icon style={styles.icon} name={'navicon'} type="EvilIcons" />
            </TouchableOpacity>
          </View>
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
        </View>
        <Content padder>
          {this.state.currentScreen === 'signIn' && <Login navigation={this.props.navigation} />}
          {this.state.currentScreen === 'signUp' && <Register navigation={this.props.navigation} />}
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
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: "#92C7A9",
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: STATUS_BAR_H,
    paddingBottom: 6,
  },
  headerMenu: {
    flex: 0.2,
    alignSelf: "center",
  },
  headerTitle: {
    flex: 0.6,
    alignSelf: "center",
  },
  icon: { color: "#fff", fontSize: 30 }
})

