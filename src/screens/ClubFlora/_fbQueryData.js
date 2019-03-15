import React, { Component } from "react"
import TITLE from '../../components/titleHeader'

import { StyleSheet, View, TouchableOpacity, Image, TextInput, Animated } from 'react-native'
import { Container, Content, Button, Input, Body, Form, Text, Item, Label, ListItem, CheckBox, Header, Icon, Left, Right } from "native-base"
import { InputField } from '../../constants/InputField'
import moment from 'moment';

const firebase = require('firebase')
require('firebase/firestore')
import { FirebaseAction } from './_firebaseAction'

const WQ8pEDSIxPUUCwoWwv5nd8ITerx1 = {
  "birthday": {
    "nanoseconds": 0,
    "seconds": 651517200,
  },
  "conditions": true,
  "firstname": "phuong",
  "isNaturopath": false,
  "lastname": "huynh",
}
export default class UpdateProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isNameCorrect: false,
      isNaturopath: false,
      isUpdating: false,
    }

    this.firebaseAction = FirebaseAction.getInstance()
  }
  componentWillUnmount() {
    this.authSubscription()
  }
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((userFirebase) => {
      if (userFirebase) {
        this.firebaseAction.getCollection()
          .then((data) => {
            console.log('==============', data)
          })
          .catch(error => {
            console.log(error.message)
          })
      }
    })
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#D1E2D6' }}>
        <TITLE navigation={this.props.navigation} title={'Update Profile'} />
        <Animated.View style={styles.container}>
          <InputField
            placeholder="Pseudo"
            autoCapitalize="words"
            error={this.state.isNameCorrect}
            style={styles.input}
            focus={this.changeInputFocus}
            ref={ref => this.name = ref}
            icon="ios-contact"
          />
          <TouchableOpacity activeOpacity={0.7} style={[styles.input, { paddingTop: 10, paddingBottom: 10, marginLeft: 15, }]} onPress={() => this.setState({ isNaturopath: !this.state.isNaturopath })}>
            <CheckBox color="#1AAC8F" checked={this.state.isNaturopath} onPress={() => this.setState({ isNaturopath: !this.state.isNaturopath })} />
            <Text style={{ color: TEXTCOLOR, marginLeft: 10, paddingLeft: 10 }}>Je suis naturopathe</Text>
          </TouchableOpacity>
          <Button block onPress={this.createUserAccount} style={{ backgroundColor: "#92C6A9", alignSelf: "center", marginTop: 20 }}>
            <Text>Mise à jour</Text>
          </Button>
        </Animated.View>
      </Container>
    )
  }
}

const TEXTCOLOR = '#575757'
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    flexDirection: 'row',
    borderBottomColor: 'rgba(0,0,0,0.5)',
    borderBottomWidth: 0.5,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    height: 40,
  },
})