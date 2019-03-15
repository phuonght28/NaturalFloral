import React, { Component } from "react"
import { StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Container, Content, Text, Button, Item, Input, Icon, Label, Card, CardItem, Right, CheckBox } from "native-base"
import { styleHeader, Common, LANGUAGE, INPUT_FIELD, ALERT_MODAL } from "../../constants/common"
import Colors from "../../constants/Colors"
import { Auth } from '../../services/Firebase/Auth'
import { Authentication } from '../../services/Authentication'
const { isBlank, isEmpty } = require('../../services/config')
import { DatePicker } from '../../constants/DatePicker'


export default class UpdateOthers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isUpdating: false,
      chosenDate: new Date(),
    }
    this.setDate = this.setDate.bind(this);

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
    const ville = this.ville.getInputValue() !== '' ? this.ville.getInputValue() : !isEmpty(userProfile.ville) ? userProfile.ville : ""
    const pays = this.pays.getInputValue() !== '' ? this.pays.getInputValue() : !isEmpty(userProfile.pays) ? userProfile.pays : ""
    const postalcode = this.postalcode.getInputValue() !== '' ? this.postalcode.getInputValue() : !isEmpty(userProfile.postalcode) ? userProfile.postalcode : ""

    if (isBlank(ville) || isBlank(postalcode)) {
      this.handleAlert('warning', LANGUAGE.Invalid_value)
    }
    else {
      const docData = {
        "ville": ville,
        "pays": pays,
        "postalcode": postalcode,
      }
      this._updateUserProfile(docData)
    }
  }
  _updateUserProfile = (docData) => {
    this.setState({ isUpdating: true }, () => {
      return new Promise(() => {
        this.Authentication.updateProfile(docData)
          .catch((error) => {
            this.handleAlert('error', `${error}`)
          })
          .then(() => {
            this.setState({ isUpdating: false }, () => {
              this.props.navigation.push('ProfileScreen')
            })
          })
      })
    })
  }

  setDate(newDate) {
    newDate = newDate.toString().substr(4, 12)
    this.setState({ chosenDate: newDate });
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

                {/* <DatePicker
                  defaultDate={new Date(2018, 4, 4)}
                  minimumDate={new Date(1930, 1, 1)}
                  maximumDate={new Date(2000, 12, 31)}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Select date"
                  textStyle={{ color: "green" }}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  onDateChange={this.setDate}
                />
                <INPUT_FIELD
                  label={'Date de naissance'}
                  ref={ref => this.postalcode = ref}
                  placeholder={this.state.chosenDate.toString().substr(4, 12)}
                  keyboardType="numeric"
                /> */}

                <INPUT_FIELD
                  label={'Code postal'}
                  ref={ref => this.postalcode = ref}
                  placeholder={!isEmpty(userProfile.postalcode) ? userProfile.postalcode : ""}
                  keyboardType="numeric"
                />
                <INPUT_FIELD
                  label={'Ville'}
                  ref={ref => this.ville = ref}
                  placeholder={!isEmpty(userProfile.ville) ? userProfile.ville : ""}
                />
                <INPUT_FIELD
                  label={'Pays'}
                  ref={ref => this.pays = ref}
                  placeholder={!isEmpty(userProfile.pays) ? userProfile.pays : ""}
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

