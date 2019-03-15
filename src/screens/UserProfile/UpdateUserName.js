import React, { Component } from "react"
import { StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Container, Content, Text, Button, Item, Input, Icon, Label, Card, CardItem, Right, CheckBox } from "native-base"
import { styleHeader, Common, LANGUAGE, INPUT_FIELD, ALERT_MODAL } from "../../constants/common"
import Colors from "../../constants/Colors"
import { Auth } from '../../services/Firebase/Auth'
import { Authentication } from '../../services/Authentication'
const { isBlank, isEmpty } = require('../../services/config')


export default class UpdateUserName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isUpdating: false,

      isUsernameCorrect: false,
      isFirstnameCorrect: false,
      isLastnameCorrect: false,
      showUsername: false
    }

    this.Auth = Auth.getInstance()
    this.Authentication = Authentication.getInstance()
  }

  handleAlert = (type = null, value = null) => {
    const alertModal = { type: type, value: value }

    this.setState({ alertModal }, () => {
      setTimeout(() => { this.setState({ alertModal: null }) }, 5000)
    })
  }
  componentWillMount() {
    const { navigation } = this.props
    const userProfile = navigation.getParam('userProfile')
    this.setState({ userProfile, isLoading: false, showUsername: userProfile.showUsername })
  }

  _onSavePress = () => {
    const { userProfile, showUsername } = this.state
    const username = this.username.getInputValue() === '' ? userProfile.username : this.username.getInputValue()
    const firstname = this.firstname.getInputValue() === '' ? userProfile.firstname : this.firstname.getInputValue()
    const lastname = this.lastname.getInputValue() === '' ? userProfile.lastname : this.lastname.getInputValue()

    if (isBlank(username) || isBlank(username) || isBlank(username)) {
      this.handleAlert('warning', LANGUAGE.Invalid_value)
    }
    else {
      let displayName = username
      if (!showUsername) {
        if (firstname === '' && lastname == '') {
          this.handleAlert('warning', `Prénom et nom ne peuvent pas être vides`)
        }
        else {
          displayName = lastname + " " + firstname
        }
      }
      const docData = {
        "username": username,
        "firstname": firstname,
        "lastname": lastname,
        "showUsername": showUsername,
        "displayName": displayName
      }
      this._updateUserProfile(docData)
    }
  }
  _updateUserProfile = (docData) => {
    this.setState({ isUpdating: true }, () => {
      return new Promise(() => {
        this.Authentication.updateUserName(docData)
          .catch((error) => {
            this.setState({ isUpdating: false }, () => {
              this.handleAlert('error', LANGUAGE.EditProfile + `${JSON.stringify(error)}`)
            })
          })
          .then(() => {
            this.setState({ isUpdating: false }, () => {
              this.props.navigation.push('ProfileScreen')
            })
          })
      })
    })

  }
  changeInputFocus = name => () => {
    switch (name) {
      case 'Pseudo':
        this.setState({ isUsernameCorrect: isBlank(this.username.getInputValue()) })
        //this.firstname.input.focus()
        break
      case 'Prénom':
        this.setState({ isFirstnameCorrect: isBlank(this.firstname.getInputValue()) })
        //this.lastname.input.focus()
        break
      default:
        this.setState({ isLastnameCorrect: isBlank(this.lastname.getInputValue()) })
    }
  }
  render() {
    const { userProfile, isLoading } = this.state
    return (
      <Container style={{ backgroundColor: "#92C7A9" }}>
        <View style={styleHeader.headerContainer} >
          <View style={[styleHeader.headerIcon, styleHeader.left]}  >
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
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
          {!isLoading &&
            <View>
              <View style={styles.p}>
                <INPUT_FIELD
                  label={'Pseudo'}
                  autoCapitalize="words"
                  placeholder={userProfile.username}
                  ref={ref => this.username = ref}
                />
                <INPUT_FIELD
                  label={'Prénom'}
                  autoCapitalize="words"
                  placeholder={userProfile.firstname}
                  ref={ref => this.firstname = ref}
                />
                <INPUT_FIELD
                  label={'Nom'}
                  autoCapitalize="words"
                  placeholder={userProfile.lastname}
                  ref={ref => this.lastname = ref}
                />
                <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', marginBottom: 15, marginRight: 15 }}
                  onPress={() => this.setState({ showUsername: !this.state.showUsername })}>
                  <CheckBox color="#1AAC8F" checked={this.state.showUsername}
                    onPress={() => this.setState({ showUsername: !this.state.showUsername })} />
                  <Text style={{ color: TEXTCOLOR, marginLeft: 10, paddingLeft: 10, fontSize: 14 }}>
                    Afficher seulement mon pseudo (vos prénom et nom ne seront pas affichés)</Text>
                </TouchableOpacity>
              </View>
              <Button small bordered style={Common.button} onPress={() => this._onSavePress()} >
                <Text style={{ color: '#fff' }}>{LANGUAGE.Save}</Text>
              </Button>
            </View>
          }
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
    // borderColor: Colors.border,
    //borderWidth: 0.2,
    borderRadius: 5,
    backgroundColor: "#F1F6F3",
    padding: 15,
    marginBottom: 15,
  },
  line: {
    marginBottom: 10,
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

})

