import React, { Component } from "react"
import PropTypes from 'prop-types'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Container, Content, Button, Text, Input, Icon } from "native-base"
import { Auth } from '../../../services/Firebase/Auth'
import LANGUAGE from '../../../constants/LanguageFrench'
import { InputField } from '../../../constants/InputField'
import { AlertModal } from '../../../constants/StyledText'

import TITLE from '../../../components/titleHeader'

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEmailCorrect: false,
      isLogin: null,
    }
    this.Authentication = Auth.getInstance()
  }

  getStarted = () => {
    const email = this.email.getInputValue()
    this.setState({
      isEmailCorrect: email === ''
    }, () => {
      if (email !== '') {
        this.loginToFireBase(email)
      } else {
        console.warn('Fill up all fields')
      }
    })
  }

  loginToFireBase = (email) => {
    this.setState({ isLogin: true })
    this.Authentication.sendEmailWithPassword(email)
      .then(() => {
        this.setState({ isLogin: false, success: LANGUAGE.Request_Sent }, () => {
          setTimeout(() => {
            this.setState({ success: null }, () => { this.props.navigation.goBack() })

          }, 3000)
        })
      })
      .catch(error => {
        this.setState({ isLogin: false, error }, () => {
          setTimeout(() => { this.setState({ error: null }) }, 3000)
        })
      })
  }
  render() {
    return (
      <Container style={{ backgroundColor: '#D1E2D6', flex: 1 }} >
        <TITLE navigation={this.props.navigation} title={this.props.title} iconMenu="goBack" />
        <View style={{ padding: 20 }}>
          {this.state.error && this.state.error != '' &&
            < AlertModal type='error'>{this.state.error}</AlertModal>
          }
          {this.state.success && this.state.success != '' &&
            < AlertModal type='success'>{this.state.success}</AlertModal>
          }
          <InputField
            placeholder={LANGUAGE.Email}
            keyboardType="email-address"
            error={this.state.isEmailCorrect}
            ref={ref => this.email = ref}
            icon="md-mail"
          />
          <Button block onPress={this.getStarted} style={{ backgroundColor: "#92C6A9", alignSelf: "center", marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
            {this.state.isLogin ? <ActivityIndicator color={'#FFF'} /> : <Text>{LANGUAGE.Send}</Text>}
          </Button>
        </View>
      </Container >
    )
  }
}