import React, { Component } from "react"
import { StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Container, Content, Text, Button, Item, Input, Icon, Label, Card, CardItem, Right, CheckBox } from "native-base"
import { styleHeader, Common, LANGUAGE, INPUT_FIELD, ALERT_MODAL } from "../../constants/common"
import Colors from "../../constants/Colors"
import { Auth } from '../../services/Firebase/Auth'
import { Authentication } from '../../services/Authentication'
const { isBlank, isEmpty } = require('../../services/config')
import { DatePicker } from '../../constants/DatePicker'
import { H1, H2, TitleText, DesText } from '../../constants/StyledText'


export default class UpdateSocial extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isUpdating: false,
    }
    this.Auth = Auth.getInstance()
    this.Authentication = Authentication.getInstance()
  }

  handleAlert = (type = null, value = null) => {
    const alertModal = { type: type, value: value }
    this.setState({ alertModal }, () => {
      // setTimeout(() => { this.setState({ alertModal: null }) }, 5000)
    })
  }
  componentWillMount() {
    const { navigation } = this.props
    const userProfile = navigation.getParam('userProfile')
    this.setState({ userProfile, isLoading: false })
  }

  _onSavePress = () => {
    const { userProfile } = this.state
    const sociales = userProfile.sociales
    const facebook = this.facebook.getInputValue() !== '' ? this.facebook.getInputValue() : !isEmpty(sociales['facebook']) ? sociales.facebook : ""
    const youtube = this.youtube.getInputValue() !== '' ? this.youtube.getInputValue() : !isEmpty(sociales.youtube) ? sociales.youtube : ""
    const linkedin = this.linkedin.getInputValue() !== '' ? this.linkedin.getInputValue() : !isEmpty(sociales.linkedin) ? sociales.linkedin : ""
    const instagram = this.instagram.getInputValue() !== '' ? this.instagram.getInputValue() : !isEmpty(sociales.instagram) ? sociales.instagram : ""

    userProfile.sociales['facebook'] = facebook
    userProfile.sociales['youtube'] = youtube
    userProfile.sociales['linkedin'] = linkedin
    userProfile.sociales['instagram'] = instagram

    const docData = { "sociales": userProfile.sociales }
    this.setState({ isLoading: true }, () => {
      return new Promise(() => {
        this.Authentication.updateProfile(docData)
          .catch((error) => {
            this.handleAlert('error', `${error}`)
          })
          .then(() => {
            this.setState({ userProfile, isLoading: false, })
          })
      })
    })
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
  changeFocus = name => () => {
    if (name === 'Email') {
      this.setState({ isEmailCorrect: this.email.getInputValue() === '' })
      this.password.input.focus()
    } else {
      this.setState({ isPasswordCorrect: this.password.getInputValue() === '' })
    }
  }
  changeInputFocus = name => () => {
    if (name === 'Compétence') {
      this.handleAlert('googleInput', `${name}`)
    } else {
      this.handleAlert('error', `${name}`)
    }
  };
  render() {
    const { userProfile, isLoading } = this.state
    const domain = {
      facebook: 'https://www.facebook.com/',
      youtube: 'https://www.youtube.com/channel/',
      linkedin: 'https://www.linkedin.com/in/',
      instagram: 'https://www.instagram.com/'
    }
    // const url = `${domain[item]}${item}`
    return (
      <Container style={{ backgroundColor: "#92C7A9" }}>
        <View style={styleHeader.headerContainer} >
          <View style={[styleHeader.headerIcon, styleHeader.left]}  >
            <TouchableOpacity onPress={() => this.props.navigation.push('ProfileScreen')}>
              <Icon style={styleHeader.icon} name='md-arrow-round-back' type="Ionicons" />
            </TouchableOpacity>
          </View>
          <View style={styleHeader.headerTitle}  >
            <Text style={styleHeader.title}>{LANGUAGE.EditProfile}</Text>
          </View>
        </View>
        <Content padder style={{ backgroundColor: "#f1f2f7" }}>
          {this.state.alertModal &&
            <TouchableOpacity onPress={() => { this.setState({ alertModal: null }) }} >
              <ALERT_MODAL type={this.state.alertModal.type}>{this.state.alertModal.value}</ALERT_MODAL>
            </TouchableOpacity>
          }
          <View>
            <View style={[styles.p, Common.boxShadow]}>
              <INPUT_FIELD
                style={{ flexDirection: 'row' }}
                multiline={true}
                numberOfLines={2}
                blurOnSubmit={true}
                label={domain['facebook']}
                ref={ref => this.facebook = ref}
                value={(!isEmpty(userProfile.sociales) && !isEmpty(userProfile.sociales['facebook'])) ? userProfile.sociales['facebook'] : ''}
              />
              <INPUT_FIELD
                multiline={true}
                numberOfLines={2}
                blurOnSubmit={true}
                label={domain['youtube']}
                ref={ref => this.youtube = ref}
                value={(!isEmpty(userProfile.sociales) && !isEmpty(userProfile.sociales['youtube'])) ? userProfile.sociales['youtube'] : ''}
              />
              <INPUT_FIELD
                multiline={true}
                numberOfLines={2}
                blurOnSubmit={true}
                label={domain['linkedin']}
                ref={ref => this.linkedin = ref}
                value={(!isEmpty(userProfile.sociales) && !isEmpty(userProfile.sociales['linkedin'])) ? userProfile.sociales['linkedin'] : ''}
              />
              <INPUT_FIELD
                multiline={true}
                numberOfLines={2}
                blurOnSubmit={true}
                label={domain['instagram']}
                ref={ref => this.instagram = ref}
                //placeholder={(!isEmpty(userProfile.sociales) && !isEmpty(userProfile.sociales['instagram'])) ? userProfile.sociales['instagram'] : ''}
                value={(!isEmpty(userProfile.sociales) && !isEmpty(userProfile.sociales['instagram'])) ? userProfile.sociales['instagram'] : ''}
              />
            </View>
            <View style={[{ flexDirection: 'row', justifyContent: 'flex-end' }]}>
              <Button small bordered style={Common.button} onPress={() => this._onSavePress()} >
                {this.state.isLoading ? <ActivityIndicator color='fff' /> : <Text style={{ color: '#fff' }}>{LANGUAGE.Save}</Text>}
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}



const TEXTCOLOR = '#575757'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginBottom: 30,
  },
  p: {
    borderRadius: 5,
    backgroundColor: "#F1F6F3",
    padding: 15,
    marginBottom: 15,
  },
  line: {
    // borderBottomColor: Colors.border,
    // borderBottomWidth: 0.5,
    // paddingBottom: 3,
    marginBottom: 10,
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    // alignContent: 'flex-end',
    alignItems: 'flex-end'
  },
  text: {
    fontSize: 18,
    fontFamily: 'HelveticaNeue-Light'
  },
  cardItem: {
    margin: 0,
    padding: 0,
  },
  button: { backgroundColor: '#72B048', borderColor: '#72B048', borderRadius: 10, marginTop: 10, alignSelf: 'center' },
  buttonIcon: {
    flex: 0.1,
    alignItems: 'center',
    backgroundColor: Colors.prime,
    borderRadius: 2, margin: 3,
    height: 24
  },
  icon: { color: '#fff', fontSize: 15, lineHeight: 24 }
})

