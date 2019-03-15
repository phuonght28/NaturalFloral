import React, { Component } from "react"
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Image, PixelRatio } from 'react-native'
import { Container, Content, Text, Button, Item, Input, Icon, Label } from "native-base"
import { LinearGradient, ImagePicker, Permissions } from 'expo'
import IMAGES from '../services/images'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Auth } from '../services/Firebase/Auth'
import { Authentication } from '../services/Authentication'

import RenderProfile from './RenderProfile'
import RenderUserPhoto from './RenderUserPhoto'

import { AlertModal } from '../constants/StyledText'

import { InputField } from '../constants/InputField'

import { DatePicker } from '../constants/DatePicker'
import TITLE from './titleHeader'
import { STATUS_BAR_Height } from '../constants/Layout'
const STATUS_BAR_H = STATUS_BAR_Height()
const UnknowIMG = IMAGES.getImages('unknow')

export default class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
    this.Auth = Auth.getInstance()
    this.Authentication = Authentication.getInstance()
  }
  componentWillMount() {

    const { params } = this.props.navigation.state
    
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
  render() {

    const { params } = this.props.navigation.state
    // let title, value
    // if (params == undefined || params == null || !params.type || !params.value) {
    //   this.props.navigation.goBack()
    // }
    // else {
    //   const  title = params.type
    //   const value = params.value

    // } 
    return (
      <Container style={{ backgroundColor: "#92C7A9" }}>
        <TITLE title={params.type} navigation={this.props.navigation} iconMenu={'goBack'} />
        <Content padder style={{ backgroundColor: "#f1f2f7" }}>
          {/* <InputField
            label={title}
            ref={ref => this.email = ref}
            placeholder={value}
            keyboardType="email-address" /> */}
        </Content>
      </Container >
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