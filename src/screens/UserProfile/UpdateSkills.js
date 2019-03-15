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


export default class UpdateSkills extends Component {
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
    const { userProfile, isUpdating } = this.state
    const indexProfile = userProfile.skills[isUpdating.index]

    const skillName = this.skillName.getInputValue() !== '' ? this.skillName.getInputValue() : !isEmpty(indexProfile.skillName) ? indexProfile.skillName : ""
    const description = this.description.getInputValue() !== '' ? this.description.getInputValue() : !isEmpty(indexProfile.description) ? indexProfile.description : ""
    const strength = this.strength.getInputValue() !== '' ? this.strength.getInputValue() : !isEmpty(indexProfile.strength) ? indexProfile.strength : ""

    if (isBlank(skillName)) {
      this.handleAlert('warning', `${LANGUAGE.Invalid_value} La compétence ne peut être nulle`)
    }
    else {
      userProfile.skills[isUpdating.index].skillName = skillName
      userProfile.skills[isUpdating.index].description = description
      userProfile.skills[isUpdating.index].strength = strength
      const docData = userProfile.skills
      this._updateUserProfile(userProfile.skills)
    }
  }

  _onDeletePress = (deleteIndex) => {
    const { userProfile } = this.state
    userProfile.skills.splice(deleteIndex, 1)
    const docData = userProfile.skills
    this._updateUserProfile(userProfile.skills)
  }

  _onAddPress = () => {
    const { userProfile } = this.state
    const skillName = this.skillName.getInputValue()
    const description = this.description.getInputValue()
    const strength = this.strength.getInputValue()
    if (isBlank(skillName)) {
      this.handleAlert('warning', `${LANGUAGE.Invalid_value} La compétence ne peut être nulle`)
    }
    else {
      const newSkill = {
        "skillName": skillName,
        "description": description,
        "strength": strength,
      }
      let docData
      if (!isEmpty(userProfile.skills)) {
        userProfile.skills.push(newSkill)
        docData = userProfile.skills
      }
      else {
        docData = [newSkill]
      }
      this._updateUserProfile(docData)
    }
  }
  _updateUserProfile = (newSkill) => {
    const { userProfile } = this.state
    userProfile.skills = newSkill
    const docData = { "skills": newSkill }
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
              {userProfile.skills && !isEmpty(userProfile.skills) ? userProfile.skills.map((item, index) =>
                <View key={index} style={[styles.line, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
                  <View style={{ flex: 0.9 }}>
                    <TitleText>{item.skillName} {!isEmpty(item.strength) && <DesText>{item.strength}</DesText>}</TitleText>
                    {!isEmpty(item.description) && <DesText>{item.description}</DesText>}
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      let isUpdating = item
                      isUpdating.index = index
                      this.setState({ isUpdating: isUpdating })
                    }}
                    style={{ flex: 0.1, alignContent: 'center', alignItems: 'center', backgroundColor: Colors.prime, borderRadius: 2, margin: 3, height: 24 }}>
                    <Icon name={'edit'} type={'Entypo'} style={[{ color: '#fff', fontSize: 15, lineHeight: 24 }]} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ isUpdating: false, deleteIndex: index }, () => {
                        this._onDeletePress(index)
                      })
                    }}
                    style={{ flex: 0.1, alignContent: 'center', alignItems: 'center', backgroundColor: Colors.prime, borderRadius: 2, margin: 3, height: 24 }}>
                    <Icon name={'cross'} type={'Entypo'} style={[{ color: '#fff', fontSize: 15, lineHeight: 24 }]} />
                  </TouchableOpacity>
                </View>
              ) :
                <H2 icon="md-add" iconType="Ionicons" style={{ alignSelf: 'flex-start', paddingBottom: 3, paddingTop: 3 }}>Ajoutez vos compétences</H2>
              }
            </View>

            <View style={[styles.p, Common.boxShadow]}>
              <INPUT_FIELD
                label={"Compétence"}
                blurOnSubmit={true}
                // focus={this.changeInputFocus}
                ref={ref => this.skillName = ref}
                placeholder={!isEmpty(this.state.isUpdating.skillName) ? this.state.isUpdating.skillName : ""}
              />
              <INPUT_FIELD
                label={"Description"}
                blurOnSubmit={true}
                // focus={this.changeInputFocus}
                ref={ref => this.description = ref}
                placeholder={!isEmpty(this.state.isUpdating.description) ? this.state.isUpdating.description : ""}
                multiline={true}
                numberOfLines={4}
              />
              <INPUT_FIELD
                label={"Force"}
                blurOnSubmit={true}
                // focus={this.changeInputFocus}
                ref={ref => this.strength = ref}
                placeholder={!isEmpty(this.state.isUpdating.strength) ? this.state.isUpdating.strength : ""}
                keyboardType="numeric"
              />
            </View>
            <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
              {this.state.isUpdating ?
                <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
                  <Button small bordered style={Common.button} onPress={() => { this.setState({ isUpdating: false }) }} >
                    <Text style={{ color: '#fff' }}>{LANGUAGE.Add}</Text>
                  </Button>
                  <Button small bordered style={Common.button} onPress={() => this._onSavePress()} >
                    {this.state.isLoading ? <ActivityIndicator color='fff' /> : <Text style={{ color: '#fff' }}>{LANGUAGE.Save}</Text>}
                  </Button>
                </View>
                : <Button small bordered style={Common.button} onPress={() => this._onAddPress()} >
                  {this.state.isLoading ? <ActivityIndicator color='fff' /> : <Text style={{ color: '#fff' }}>{LANGUAGE.Add}</Text>}
                </Button>
              }
              {this.state.isUpdating ?
                <Button small bordered style={Common.button} onPress={() => this.props.navigation.goBack()} >
                  <Text style={{ color: '#fff' }}>{LANGUAGE.Cancel}</Text>
                </Button>
                :
                <Button small bordered style={Common.button} onPress={() => this.setState({ isUpdating: false })} >
                  <Text style={{ color: '#fff' }}>{LANGUAGE.Clear}</Text>
                </Button>
              }
            </View>
            {/* {userProfile.skills && !isEmpty(userProfile.skills) && userProfile.skills.map((item, index) =>
                <View key={index} style={[styles.p, Common.boxShadow]}>
                  <INPUT_FIELD
                    iconRight
                    label={"Compétence"}
                    blurOnSubmit={true}
                    focus={this.changeInputFocus}
                    ref={ref => this.skillName = ref}
                    placeholder={!isEmpty(item.skillName) ? item.skillName : ""}
                  />
                  <INPUT_FIELD
                    label={"Description"}
                    blurOnSubmit={true}
                    focus={this.changeInputFocus}
                    ref={ref => this.description = ref}
                    placeholder={!isEmpty(item.description) ? item.description : ""}
                    multiline={true}
                    numberOfLines={4}
                  />
                  <INPUT_FIELD
                    label={"Force"}
                    blurOnSubmit={true}
                    focus={this.changeInputFocus}
                    ref={ref => this.strength = ref}
                    placeholder={!isEmpty(item.strength) ? item.description : ""}
                    keyboardType="phone-pad"
                  />
                </View>
              )} */}
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
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.5,
    paddingBottom: 3,
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

