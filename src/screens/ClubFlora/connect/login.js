import React, { Component } from "react"
import PropTypes from 'prop-types'
import { StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Content, Button, Text, Input, Icon } from "native-base"
import { Auth } from '../../../services/Firebase/Auth'
import { AppNotificaton, IconNotificaton , AlertModal} from '../../../constants/StyledText'
import LANGUAGE from '../../../constants/LanguageFrench'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEmailCorrect: false,
      isPasswordCorrect: false,
      isLogin: null,
    }
    this.Authentication = Auth.getInstance()
  }

  getStarted = () => {
    const email = this.email.getInputValue()
    const password = this.password.getInputValue()

    this.setState({
      isEmailCorrect: email === '',
      isPasswordCorrect: password === '',
    }, () => {
      if (email !== '' && password !== '') {
        this.loginToFireBase(email, password)
      } else {
        console.warn('Fill up all fields')
      }
    })
  }

  changeInputFocus = name => () => {
    if (name === 'Email') {
      this.setState({ isEmailCorrect: this.email.getInputValue() === '' })
      this.password.input.focus()
    } else {
      this.setState({ isPasswordCorrect: this.password.getInputValue() === '' })
    }
  }

  loginToFireBase = (email, password) => {
    this.setState({ isLogin: true })
    this.Authentication.userLogin(email, password)
      .then(user => {
        if (user) this.props.navigation.navigate('UserProfile')
        this.setState({ isLogin: false })
      })
      .catch(error => {
        this.setState({ isLogin: false, error })
        console.log('Login/loginToFireBase', error)
      })
  }

  render() {
    return (
      <View style={[styles.container]}>
        {this.state.error && this.state.error != '' &&
        < AlertModal type='error'>{this.state.error}</AlertModal>
        }
        <InputField
          placeholder={LANGUAGE.Email}
          keyboardType="email-address"
          error={this.state.isEmailCorrect}
          focus={this.changeInputFocus}
          ref={ref => this.email = ref}
          icon="md-mail"
        />
        <InputField
          placeholder={LANGUAGE.Password}
          returnKeyType="done"
          secureTextEntry={true}
          blurOnSubmit={true}
          error={this.state.isPasswordCorrect}
          ref={ref => this.password = ref}
          focus={this.changeInputFocus}
          icon='md-lock'
        />
        <Button block onPress={this.getStarted} style={{ backgroundColor: "#92C6A9", alignSelf: "center", marginTop: 20, marginBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
          {this.state.isLogin ? <ActivityIndicator color={'#FFF'} /> : <Text>{LANGUAGE.Login}</Text>}
        </Button>
        <TouchableOpacity style={{ margin: 10 }} onPress={() => { this.props.navigation.navigate('ForgotPassword') }} activeOpacity={0.6}>
          <Text style={{ color: '#575757' }}>{LANGUAGE.Forgot_Password}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', },
  email: {
    //marginBottom: h(4.5),
  }
})

const TEXTCOLOR = '#575757'
class InputField extends Component {
  static defaultProps = {
    focus: () => { },
    style: {},
    placeholder: '',
    blurOnSubmit: false,
    returnKeyType: 'next',
    error: false,
    keyboardType: null,
    secureTextEntry: false,
    autoCapitalize: "none",
  }

  state = { text: '' }
  getInputValue = () => this.state.text
  render() {
    return (
      <View style={[stylesInputField.input, this.props.error ? stylesInputField.containerError : {}]}>
        <Icon style={[stylesInputField.icon]} name={this.props.icon} type="Ionicons" />
        <Input
          style={stylesInputField.text}
          value={this.state.text}
          selectionColor={TEXTCOLOR}
          autoCapitalize={this.props.autoCapitalize}
          ref={ref => this.input = ref}
          autoCorrect={false}
          underlineColorAndroid='transparent'
          secureTextEntry={this.props.secureTextEntry}
          blurOnSubmit={this.props.blurOnSubmit}
          keyboardType={this.props.keyboardType}
          returnKeyType={this.props.returnKeyType}
          placeholder={this.props.placeholder}
          onSubmitEditing={this.props.focus(this.props.placeholder)}
          placeholderTextColor={TEXTCOLOR}
          onChangeText={(text) => this.setState({ text })}
        />
        {this.props.error && <Icon style={[stylesInputField.icon]} name='md-close' type="Ionicons" />}
      </View>
    )
  }
}
const stylesInputField = StyleSheet.create({
  input: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'rgba(0,0,0,0.5)',
    borderBottomWidth: 0.5,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  icon: {
    color: TEXTCOLOR,
    fontSize: 20,
    lineHeight: 46,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    color: TEXTCOLOR,
    flex: 1,

  },
  containerError: {
    backgroundColor: '#EF9A9A',
    borderWidth: 1,
    borderColor: '#E57373',
  }
})



// export default class Register extends Component {
//   constructor(props) {
//     super(props)
//   }

//   state = { 
//     email: '', 
//     password: '', 
//     error: '', 
//     loading: false 
//   }
//   onLoginPress() {
//     this.setState({ error: '', loading: true })
//     console.log("Ham login")
//     const { email, password } = this.state
//     firebase.auth().signInWithEmailAndPassword(email, password)
//       .then((result) => {
//         console.log('result:',result)
//         this.props.navigation.navigate("PlantesList")
//       })
//       .catch(() => {
//         //Login was not successful, let's create a new account
//       })
//   }


//   render() {
//     return (
//       <Content>
//         <Form>
//           <Item floatingLabel style={styleLogin.input}>
//             <Label style={styleLogin.label}>Email</Label>
//             <Input value={this.state.email} onChangeText={email => this.setState({ email })} />
//           </Item>
//           <Item floatingLabel style={styleLogin.input}>
//             <Label style={styleLogin.label}>Mot de passe</Label>
//             <Input secureTextEntry value={this.state.password} onChangeText={password => this.setState({ password })} />
//           </Item>
//         </Form>
//         <Button block style={{ backgroundColor: "#92C6A9", alignSelf: "center" }} onPress={this.onLoginPress.bind(this)}>
//           <Text>Se connecter</Text>
//         </Button>
//       </Content>
//     )
//   }
// }



const styleLogin = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  viewLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    flex: 1,
    width: 200,
    marginTop: 25,
    marginBottom: 25,

  },
  label: {
    color: "#00a486",
  },
  input: {
    width: '90%',
    height: 50,
    paddingLeft: 25,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 12,
    backgroundColor: '#D8D8D8',
  },
  btnLogin: {
    width: '60%',
    marginTop: 15,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#00a486',
    borderRadius: 5,
  },
  txtButton: {
    color: 'white',
    textAlign: 'center',
  }
})
