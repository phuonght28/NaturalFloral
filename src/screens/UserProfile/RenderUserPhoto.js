import React, { Component } from "react"
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Image, PixelRatio } from 'react-native'
import { ActionSheet } from "native-base"
import { ImagePicker, Permissions } from 'expo'
import LANGUAGE from '../../constants/LanguageFrench'
//const firebase = require('firebase')
import moment from 'moment'
import * as firebase from 'firebase';
import { Authentication } from '../../services/Authentication'
import Storage from '../../services/Storage'

const { returnToTimestamp, returnToDateTime, HandleErrors } = require('../../services/config')

var BUTTONS = [LANGUAGE.TakePhoto, LANGUAGE.ChoosePhoto, LANGUAGE.Cancel]
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 2;
export default class RenderUserPhoto extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
    this.userProfile = this.props.userProfile
    this.Authentication = Authentication.getInstance()
  }

  componentWillMount() {
    const profilesPhoto = this.props.source
    this.setState({ profilesPhoto, isLoading: false })
  }
  _handleErrors = (type = null, value = null) => {
    const alertModal = { type: type, value: value }
    this.props.containerError(alertModal)
  }
  _onChangePhoto = (buttonData) => {
    if (buttonData === LANGUAGE.ChoosePhoto) {
      this._launchImageLibraryAsync()
    }
    else if (buttonData === LANGUAGE.TakePhoto) {
      this._launchCameraAsync()
    }
    else {
      return
    }
  }
  _launchCameraAsync = async () => {
    Storage.getAsyncPermissions(Permissions.CAMERA).then((resultPermissions) => {
      ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1] })
        .then(result => {
          if (!result.cancelled) {
            this.setState({ isLoading: true }, () => {
              this._uploadImage(result.uri)
            })
          }
        })
        .catch((error) => {
          this.setState({ isLoading: false }, () => {
            this._handleErrors('error', `Launch.CAMERA: ${JSON.stringify(error)}`)
          })
        })
    })
      .catch(error => {
        this.setState({ isLoading: false }, () => {
          this._handleErrors('error', `Permissions.CAMERA: ${JSON.stringify(error)}`)
        })
      })
  }
  _launchImageLibraryAsync = () => {
    Storage.getAsyncPermissions(Permissions.CAMERA_ROLL).then((result) => {
      ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1] })
        .then(result => {
          if (!result.cancelled) {
            this.setState({ isLoading: true }, () => {
              this._uploadImage(result.uri)
            })
          }
        })
        .catch((error) => {
          this.setState({ isLoading: false }, () => {
            this._handleErrors('error', `Launch.CAMERA_ROLL: ${JSON.stringify(error)}`)
          })
        })
    })
      .catch(error => {
        this.setState({ isLoading: false }, () => {
          this._handleErrors('error', `Permissions.CAMERA_ROLL: ${JSON.stringify(error)}`)
        })
      })
  }
  _uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const imageName = returnToTimestamp(moment(new Date()))
    const storageURL = `images/users/${this.props.userProfile.uid}/profile/` + imageName
    var ref = firebase.storage().ref().child(storageURL)
    ref.put(blob)
      .then(() => {
        this._downloadImage(storageURL)
      })
      .catch((error) => {
        this.setState({ isLoading: false }, () => {
          this._handleErrors('error', `_uploadImage: ${JSON.stringify(error)}`)
        })
      })
  }
  _downloadImage = async (storageURL) => {
    const self = this
    var starsRef = firebase.storage().ref().child(storageURL)
    starsRef.getDownloadURL()
      .then((url) => {
        this.Authentication.updateProfilePhoto(url)
          .catch((error) => {
            this.setState({ isLoading: false }, () => {
              this._handleErrors('error', `updateProfilePhoto error: ${JSON.stringify(error)}`)
            })
          })
          .then(() => {
            const profilesPhoto = { uri: url }
            self.setState({ profilesPhoto, isLoading: false })
          })
      })
      .catch((error) => {
        this.setState({ isLoading: false }, () => {
          this._handleErrors('error', `getDownloadURL error: ${JSON.stringify(error)}`)
        })
      })
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          ActionSheet.show(
            {
              options: BUTTONS,
              cancelButtonIndex: CANCEL_INDEX,
              destructiveButtonIndex: DESTRUCTIVE_INDEX,
            },
            buttonIndex => {
              this._onChangePhoto(BUTTONS[buttonIndex])
            }
          )}
      >
        <View style={[styles.avatar, styles.avatarContainer]}>
          {this.state.isLoading ? <ActivityIndicator /> :
            <Image style={styles.avatar} source={this.state.profilesPhoto} />
          }
        </View>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  avatar: {
    borderRadius: 60,
    width: 120,
    height: 120,
    margin: 5,
    borderWidth: 1,
    borderColor: '#9B9B9B',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
})