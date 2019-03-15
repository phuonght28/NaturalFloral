import React, { Component } from "react"
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Image, PixelRatio } from 'react-native'
import { Container, Content, Text, Button, Item, Input, Icon, Label } from "native-base"
import { LinearGradient, ImagePicker, Permissions } from 'expo'
import IMAGES from '../services/images'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Auth } from '../services/Firebase/Auth'
import { Authentication } from '../services/Authentication'

import RenderProfile from './UserProfile/RenderProfile'
import RenderUserPhoto from './UserProfile/RenderUserPhoto'

import { AlertModal } from '../constants/StyledText'


import { DatePicker } from '../constants/DatePicker'
import { InputField } from '../constants/InputField'
import { STATUS_BAR_Height } from '../constants/Layout'
const STATUS_BAR_H = STATUS_BAR_Height()
const UnknowIMG = IMAGES.getImages('unknow')

export default class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasCameraPermission: null,
      avatarSource: null,
      image: null,
      isSigned: false,
    }
    this.Auth = Auth.getInstance()
    this.Authentication = Authentication.getInstance()
  }
  async componentWillMount() {
    //const { params } = this.props.navigation.state
    // let userFirebase
    // if (params == undefined || params == null || !params.userFirebase) {
    //   const currentUser = await this.Auth.CURRENT_USER()
    //   userFirebase = currentUser.userFirebase
    // }
    // else {
    //   userFirebase = this.props.navigation.state.params.userFirebase
    // }
    this._getUserProfile()
  }
  _containerError = (value) => {
    const alertModal = value
    this.setState({ alertModal }, () => {
      setTimeout(() => { this.setState({ alertModal: null }) }, 5000)
    })
  }

  _getUserProfile = async () => {
    const userFirebase = await this.Auth.getCurrentUser()
    if (userFirebase) {
      return new Promise(() => {
        this.Auth.getUserProfile(userFirebase)
          .then(userProfile => {
            this.setState({ userProfile, isSigned: true })
          })
      })
    } else {
      this.props.navigation.navigate('Connection')
    }

  }

  _updateUserProfile = (docData) => {
    const { userProfile } = this.state
    return new Promise(() => {
      this.Auth.updateUserProfile(userProfile, docData)
        .catch((error) => {
          this.setState({ error: error })
        })
        .then(() => {
          this.setState({ success: 'Profile successfully updated' }, () => {
            this._getUserProfile()
          })
        })
    })
  }
  _updateEmail = (email) => {
    return new Promise(() => {
      this.Authentication.updateEmail(email)
        .catch((error) => {
          this.setState({ isLoading: false }, () => {
            this._handleErrors('error', `updateEmail error: ${JSON.stringify(error)}`)
          })
        })
        .then(() => {
          this._handleErrors('success', `updateEmail success`)
          this._getUserProfile()
        })
    })
  }
  _disconnect = () => {
    return new Promise(() => {
      this.Auth.disconnect().then(() => {
        this.props.navigation.navigate('Connection')
      })
    })
  }

  render() {
    let userProfile = {
      "birthday": {
        "nanoseconds": 0,
        "seconds": 0,
      },
      "isNaturopath": false,
      "showUsername": true,
      "conditions": true,
      "displayName": "",
      "email": "",
      "firstname": null,
      "lastname": null,
      "phoneNumber": null,
      "photoURL": UnknowIMG,
      "postalcode": null,
      "uid": "",
      "username": "",
    }
    //userProfile.birthday = moment.unix(userProfile.birthday.seconds).format("D/M/YYYY")
    if (this.state.userProfile) {
      userProfile = this.state.userProfile
      userProfile.photoURL = userProfile.photoURL ? { uri: userProfile.photoURL } : UnknowIMG
      //console.log('userProfile.birthday:', userProfile.photoURL)
      //userProfile.birthday = userProfile.birthday != null ? moment.unix(userProfile.birthday.seconds).format("D/M/YYYY") : null
    }
    return (
      <Content style={styles.container} >
        <View style={styles.header}>
          <LinearGradient style={styles.gradient} colors={['#D1E2D6', '#92C7A9']}>
            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
              <View style={styles.headerMenu}>
                <Icon style={styles.headerIcon} name="navicon" type="EvilIcons" />
              </View>
            </TouchableOpacity>
            <View style={styles.headerTitle}>
              <View style={styles.line}>
                {!this.state.isSigned ?
                  <ActivityIndicator size={'large'} color={'#92C7A9'} /> :
                  <RenderUserPhoto source={userProfile.photoURL} userProfile={userProfile}
                    containerError={(error) => { this._containerError(error) }} />
                }
              </View>
              <View>
                <Text style={styles.displayName}>{userProfile.displayName}</Text>
                {userProfile.isNaturopath && <Text style={styles.displayName}>Je suis naturopathe</Text>}
              </View>
            </View>
          </LinearGradient>
        </View>
        <View style={styles.content}>
          {this.state.alertModal &&
            <TouchableOpacity onPress={() => { this.setState({ alertModal: null }) }} >
              < AlertModal type={this.state.alertModal.type}>{this.state.alertModal.value}</AlertModal>
            </TouchableOpacity>
          }
          {!this.state.isSigned ?
            <ActivityIndicator size={'large'} color={'#92C7A9'} /> :
            <RenderProfile
              {...this.props}
              updateFunction={(profilesNew) => { this._updateUserProfile(profilesNew) }}
              containerError={(error) => { this._containerError(error) }}
              userProfile={userProfile} />
          }
        </View>
      </Content>
    )
  }
}


const TEXTCOLOR = '#575757'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1E2D6',
  },
  content: {
    // paddingLeft: 20,
    // paddingRight: 20,
    // paddingTop: 10,
    backgroundColor: '#D1E2D6',
  },
  header: {
    //height: 250,
    flexDirection: 'row',
    backgroundColor: "#92C7A9",
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: STATUS_BAR_H,
    paddingBottom: 8,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,

  },
  headerMenu: {
    flex: 0.1,
  },
  headerTitle: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerIcon: {
    color: '#fff',
    fontSize: 30,
  },
  textTitle: {
    marginRight: 10,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    fontFamily: 'HelveticaNeue-Light'
  },
  text: {
    fontSize: 18,
    fontFamily: 'HelveticaNeue-Light'
  },
  line: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  displayName: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    fontFamily: 'HelveticaNeue-Light'
  },
  avatar: {
    borderRadius: 60,
    width: 120,
    height: 120,
    margin: 5,
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderColor: '#FFF',
    borderWidth: 3 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: { backgroundColor: '#72B048', borderColor: '#72B048', borderRadius: 10, marginTop: 10, alignSelf: 'center' },

  containerError: {
    backgroundColor: '#EF9A9A',
    borderWidth: 1,
    borderColor: '#E57373',
  },
  containerSuccess: {
    backgroundColor: '#5cb85c',
    borderWidth: 1,
    borderColor: '#2b8339',

  }
})