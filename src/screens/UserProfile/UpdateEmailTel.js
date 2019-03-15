import React, { Component } from "react"
import { StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Container, Content, Text, Button, Item, Input, Icon, Label, Card, CardItem, Right, CheckBox } from "native-base"
import { styleHeader, Common, LANGUAGE, INPUT_FIELD, ALERT_MODAL } from "../../constants/common"
import Colors from "../../constants/Colors"
import { Auth } from '../../services/Firebase/Auth'
import { Authentication } from '../../services/Authentication'
const { isBlank, isEmpty } = require('../../services/config')


export default class UpdateEmailTel extends Component {
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
    const { userProfile, showUsername } = this.state
    const email = this.email.getInputValue() === '' ? userProfile.email : this.email.getInputValue()
    const phoneNumber = this.phoneNumber.getInputValue() === '' ? userProfile.phoneNumber : this.phoneNumber.getInputValue()

    if (isBlank(email) || isBlank(phoneNumber)) {
      this.handleAlert('warning', LANGUAGE.Invalid_value)
    }
    else {
      const docData = {
        "email": email,
        "phoneNumber": phoneNumber,
      }
      this._updateUserProfile(docData)
    }

  }
  _updateUserProfile = (docData) => {
    this.setState({ isUpdating: true }, () => {
      return new Promise(() => {
        this.Authentication.updateEmailTel(docData)
          .catch((error) => {
            console.log(error.code)
             if (error.code === "auth/requires-recent-login") {
              // console.log(error.code)
              // this.props.navigation.navigate('Connection')
              this.handleAlert('warning', `${error}`)
            }
            else this.handleAlert('error', `${error}`)
          })
          .then(() => {
            this.setState({ isUpdating: false }, () => {
              this.props.navigation.push('ProfileScreen')
            })
          })
      })
    })

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
                  label={LANGUAGE.Email}
                  ref={ref => this.email = ref}
                  placeholder={userProfile.email}
                  keyboardType="email-address"
                />
                <INPUT_FIELD
                  label={LANGUAGE.Telephone}
                  ref={ref => this.phoneNumber = ref}
                  placeholder={userProfile.phoneNumber}
                  keyboardType="phone-pad"
                />
              </View>
              {this.state.isUpdating ? <ActivityIndicator /> :
                <Button small bordered style={Common.button} onPress={() => this._onSavePress()} >
                  <Text style={{ color: '#fff' }}>{LANGUAGE.Save}</Text>
                </Button>
              }
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
    backgroundColor: Colors.bgWhite,
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

