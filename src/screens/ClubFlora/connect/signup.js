import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { w, h, totalSize } from './api/Dimensions'
import { StyleSheet, View, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import { Container, Content, Button, Input, Body, Form, Text, Item, Label, ListItem, CheckBox, Header, Icon, Left, Right } from "native-base"
import { InputField, AlertModal } from '../../../constants/InputField'
import { Auth } from '../../../services/Firebase/Auth'

export default class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isNameCorrect: false,
      isNaturopath: false,
      isConditions: false,
      isEmailCorrect: false,
      isPasswordCorrect: false,
      isRepeatCorrect: false,
      isCreatingAccount: false,
    }
    this.Authentication = Auth.getInstance()
  }
  createUserAccount = () => {
    const name = this.name.getInputValue()
    const email = this.email.getInputValue()
    const password = this.password.getInputValue()
    const repeat = this.repeat.getInputValue()
    const isNaturopath = this.state.isNaturopath
    const isConditions = this.state.isConditions
    
    this.setState({
      isNameCorrect: name === '',
      isEmailCorrect: email === '',
      isPasswordCorrect: password === '',
      isRepeatCorrect: repeat === '' || repeat !== password,
    }, () => {
      if (name !== '' && email !== '' && password !== '' && (repeat !== '' && repeat === password)) {
        this._createFireBaseAccount(name, email, password, isNaturopath, isConditions)
        console.warn('Fill up all fields correctly')
      }
    })
  }

  _createFireBaseAccount = (name, email, password, isNaturopath, isConditions) => {
    this.setState({ isCreatingAccount: true })
    this.Authentication.createFirebaseAccount(name, email, password, isNaturopath, isConditions)
      .then(user => {
        if (user) this.props.navigation.navigate('UserProfile')
        this.setState({ isCreatingAccount: false })
      })
      .catch(error => {
        this.setState({ isCreatingAccount: false, error })
        console.log('_createFireBaseAccount', error)
        //errorAlert()
      })
  }

  changeInputFocus = name => () => {
    switch (name) {
      case 'Pseudo':
        this.setState({ isNameCorrect: this.name.getInputValue() === '' })
        this.email.input.focus()
        break
      case 'Email':
        this.setState({ isEmailCorrect: this.email.getInputValue() === '' })
        this.password.input.focus()
        break
      case 'Password':
        this.setState({
          isPasswordCorrect: this.password.getInputValue() === '',
          isRepeatCorrect: (this.repeat.getInputValue() !== ''
            && this.repeat.getInputValue() !== this.password.getInputValue())
        })
        this.repeat.input.focus()
        break
      default:
        this.setState({
          isRepeatCorrect: (this.repeat.getInputValue() === ''
            || this.repeat.getInputValue() !== this.password.getInputValue())
        })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.error && this.state.error != '' &&
          < AlertModal type='error'>{this.state.error}</AlertModal>
        }
        <InputField
          placeholder="Pseudo"
          autoCapitalize="words"
          error={this.state.isNameCorrect}
          style={styles.input}
          focus={this.changeInputFocus}
          ref={ref => this.name = ref}
          icon="ios-contact"
        />
        <InputField
          placeholder="Email"
          keyboardType="email-address"
          error={this.state.isEmailCorrect}
          style={styles.input}
          focus={this.changeInputFocus}
          ref={ref => this.email = ref}
          icon="md-mail"
        />
        <InputField
          placeholder="Mot de passe"
          error={this.state.isPasswordCorrect}
          style={styles.input}
          focus={this.changeInputFocus}
          ref={ref => this.password = ref}
          secureTextEntry={true}
          icon='md-lock'
        />
        <InputField
          placeholder="Re-confirmer le mot de passe"
          error={this.state.isRepeatCorrect}
          style={styles.input}
          secureTextEntry={true}
          returnKeyType="done"
          blurOnSubmit={true}
          focus={this.changeInputFocus}
          ref={ref => this.repeat = ref}
          icon='md-lock'
        />
        <TouchableOpacity activeOpacity={0.7} style={[styles.inputField, { paddingTop: 10, paddingBottom: 10, marginLeft: 15, }]} onPress={() => this.setState({ isNaturopath: !this.state.isNaturopath })}>
          <CheckBox color="#1AAC8F" checked={this.state.isNaturopath} onPress={() => this.setState({ isNaturopath: !this.state.isNaturopath })} />
          <Text style={{ color: TEXTCOLOR, marginLeft: 10, paddingLeft: 10 }}>Je suis naturopathe</Text>
        </TouchableOpacity>
        <View activeOpacity={0.7} style={[styles.inputField, { paddingTop: 10, paddingBottom: 10, marginLeft: 15, }]}>
          <CheckBox color="#1AAC8F" checked={this.state.isConditions} onPress={() => this.setState({ isConditions: !this.state.isConditions })} />
          <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('LegalNotice')}>
            <Text style={{ color: TEXTCOLOR, marginLeft: 10, paddingLeft: 10 }}>J'accepte les <Text style={{ color: '#0645AD' }}>Termes et Conditions</Text></Text>
          </TouchableOpacity>
        </View>
        <Button block onPress={this.createUserAccount} style={{ backgroundColor: "#92C6A9", alignSelf: "center", marginTop: 20 }}>
          <Text>S'inscrire</Text>
        </Button>
        {/* <TouchableOpacity onPress={this.props.change('login')} style={styles.touchable}>
          <Text style={styles.signIn}>{'<'} Sign In</Text>
        </TouchableOpacity> */}
      </View>
    )
  }
}

Register.propTypes = {
  //change: PropTypes.func.isRequired,
}


const TEXTCOLOR = '#575757'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  create: {
    fontSize: totalSize(2.4),
    marginTop: h(7),
    marginBottom: h(4),
    fontWeight: '700',
  },
  signIn: {
    fontSize: totalSize(2),
    fontWeight: '700',
  },
  touchable: {
    alignSelf: 'flex-start',
    marginLeft: w(8),
    marginTop: h(4),
  },
  input: {
    marginVertical: h(2),
  },
  inputField: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'rgba(0,0,0,0.5)',
    borderBottomWidth: 0.5,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
  },
})