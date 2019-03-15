import React, { Component } from "react"
import { ActivityIndicator } from 'react-native'
import { Container, Content } from "native-base"
import { Authentication } from '../services/Authentication'
import TITLE from '../components/titleHeader'

import Connection from '../components/_Connection'
import NaturopathList from '../components/_NaturopathList'


export default class ClubFlora extends Component {
  constructor(props) {
    super(props)
    this.state = {

      isLoading: true,
      isSigned: false
    }
    this.Authentication = Authentication.getInstance()
  }
  componentWillMount() {
    this.Authentication.checkConnection().then(result => {
      if (result == false) {
        // No user is signed in.
        this.setState({ isLoading: false, isSigned: false })
      }

      else {
        console.log("checkConnection: ", result)
        this.setState({ isLoading: false, isSigned: true })
      }
    })
  }
  render() {
    console.log('this.state.isLoading', this.state.isLoading)
    if (!this.state.isLoading) {
      const ConnectionResult = this.state.isSigned ? NaturopathList : Connection
    }
    return (
      <Container style={{ flex: 1, backgroundColor: '#fff', }}>
        <TITLE navigation={this.props.navigation} title={this.props.title} />
        {!this.state.isLoading && <ConnectionResult navigation={this.props.navigation} />}
        {this.state.isLoading && <ActivityIndicator size="large" color='black' />}
      </Container >
    )
  }
}