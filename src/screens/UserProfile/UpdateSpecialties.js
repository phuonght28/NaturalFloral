import React, { Component } from "react"
import { StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Container, Content, Text, Button, Item, Input, Icon, Label, Card, CardItem, Right, CheckBox } from "native-base"
import { styleHeader, Common, LANGUAGE, INPUT_FIELD, ALERT_MODAL, NEWSPECIALTIES } from "../../constants/common"
import Colors from "../../constants/Colors"
import { Auth } from '../../services/Firebase/Auth'
import { Authentication } from '../../services/Authentication'
const { isBlank, isEmpty } = require('../../services/config')
import { DatePicker } from '../../constants/DatePicker'
import { H1, H2, TitleText, DesText } from '../../constants/StyledText'

import PLANTES from '../../services/parsers/plantes'
import SPECIALTIES from '../../services/parsers/specialties'
// const SPECIALTIES = require('../../services/parsers/specialties')
// const SPECIALTIES = [
//   "French", "Naturopathie",
//   "Ostéopathie", "Chiropraxie",
//   "Hypnose", "Massage",
//   "Medecine traditionnelle Chinoise",
//   "Shiatsu", "Reflexologie",
//   "Psychothérapies", "Sophrologie",
//   "Yoga", "Méditation",
//   "Aromathérapie", "Phytothérapie",
//   "Ayurveda", "Acupuncture",
//   "Qi Gong", "Nutrition"
// ]
const _UserProfile = {
  "birthday": null,
  "conditions": true,
  "displayName": "PhuongAmagumo",
  "email": "phuong.huynh@amagumolabs.com",
  "expoPushTokenAsync": "ExponentPushToken[XoN-DVO6CSh4oS-LrwwApV]",
  "firstname": null,
  "isNaturopath": true,
  "lastname": null,
  "phoneNumber": null,
  "photoURL": "https://firebasestorage.googleapis.com/v0/b/my-test-4ef11.appspot.com/o/images%2Fusers%2Fx2Z949IXlDMRI6frLlGMg3W8owr2%2Fprofile%2F1540961588000?alt=media&token=40eac7bf-b7e6-4dd0-9e69-d1fd37dc2266",
  "postalcode": null,
  "showUsername": true,
  "skills": [
    {
      "description": "description of nution",
      "index": 0,
      "skillName": "Nutrition",
      "strength": "",
    },
    {
      "description": "",
      "index": 1,
      "skillName": "Massage",
      "strength": "",
    },
  ],

  "sociales": {
    "facebook": "groups/285092744860966",
    "instagram": "cumeohtp",
    "linkedin": "phuong-huynh-thuy-36a821163",
    "youtube": "UCFpoXlAf5ozUHtO3EWVvOnw",
  },

  "uid": "x2Z949IXlDMRI6frLlGMg3W8owr2",
  "username": "PhuongAmagumo",
}

export default class UpdateSpecialties extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isUpdating: false,
      userProfile: null
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

    const userSpecialties = !isEmpty(userProfile.specialties) ? userProfile.specialties : []
    this.setState({ userProfile, userSpecialties, isLoading: false })
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
  _onDeletePress = (deleteSpecialties) => {
    const { userSpecialties } = this.state
    const element = userSpecialties.find((item) => item === deleteSpecialties)
    userSpecialties.splice(userSpecialties.indexOf(element), 1)
    this._updateUserProfile(userSpecialties)
    // this.setState({ userSpecialties })
  }
  _onAddItemPress = (addSpecialties) => {
    const { userSpecialties } = this.state
    userSpecialties.push(addSpecialties)
    this._updateUserProfile(userSpecialties)
    // this.setState({ userSpecialties })
  }
  _updateUserProfile = (newSpecialties) => {
    const userSpecialties = newSpecialties
    const docData = { "specialties": newSpecialties }
    this.setState({ isLoading: true }, () => {
      return new Promise(() => {
        this.Authentication.updateProfile(docData)
          .catch((error) => {
            this.handleAlert('error', `${error}`)
          })
          .then(() => {
            this.setState({ userProfile, userSpecialties, isLoading: false, })
          })
      })
    })
  }
  // _removeExitSpecialties = () => {
  //   const { userSpecialties } = this.state
  // }
  render() {
    const { userSpecialties } = this.state
    const _listSPECIALTIES = SPECIALTIES
    console.log(SPECIALTIES.length)
    _listSPECIALTIES.forEach((listItem) => {
      listItem.show = true
      if (!isEmpty(userSpecialties)) {
        userSpecialties.forEach((userItem) => {
          if (listItem.specialties === userItem) {
            listItem.show = false
          }
        })
      }
    })
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
            <View style={[styles.p, Common.boxShadow, { flexDirection: 'row', flexWrap: 'wrap' }]}>
              {!isEmpty(userSpecialties) ? userSpecialties.map((item, index) =>
                <View key={index} style={styles.skillTag}>
                  <TitleText>{item}</TitleText>
                  <TouchableOpacity style={styles.buttonIcon} onPress={() => { this._onDeletePress(item) }}>
                    <Icon name={'cross'} type={'Entypo'} style={styles.icon} />
                  </TouchableOpacity>
                </View>
              ) :
                <TitleText>Ajouter des spécialités</TitleText>
              }
            </View>
            <View style={[styles.p, Common.boxShadow, { flexDirection: 'row', flexWrap: 'wrap' }]}>
              {_listSPECIALTIES.map((item, index) => {
                if (item.show) {
                  return (
                    <TouchableOpacity key={index} style={[styles.skillTag, { backgroundColor: '#FFF' }]}
                      onPress={() => { this._onAddItemPress(item.specialties) }}>
                      <TitleText>{item.specialties}</TitleText>
                    </TouchableOpacity>
                  )
                }
                else {
                  <TitleText> </TitleText>
                }
              }
              )}
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
    // alignItems: 'flex-end'
  },
  text: {
    lineHeight: 24,
    color: Colors.text,
    fontFamily: 'HelveticaNeue-Light',
    fontSize: 14,
  },
  cardItem: {
    margin: 0,
    padding: 0,
  },
  button: { backgroundColor: '#72B048', borderColor: '#72B048', borderRadius: 10, marginTop: 10, alignSelf: 'center' },
  buttonIcon: {
    alignItems: 'center',
    backgroundColor: Colors.prime,
    borderRadius: 2,
    marginLeft: 6,
    width: 20,
    height: 20,
    // alignContent: 'center',
  },
  icon: { color: '#fff', fontSize: 16, lineHeight: 20 },
  skillTag: {
    backgroundColor: '#D9EDDF',
    borderRadius: 2,
    padding: 3,
    paddingLeft: 6,
    paddingRight: 6,
    marginRight: 6,
    marginRight: 6,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

