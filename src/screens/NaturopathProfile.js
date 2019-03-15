import React, { Component } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Linking } from 'react-native';
import { Container, Content, Icon, Text, Label, Button } from "native-base";
import { Common, styleHeader, styleUserPhoto, LANGUAGE } from "../constants/common";
import { STATUS_BAR_Height } from '../constants/Layout';
import Colors from '../constants/Colors'
import IMAGES from '../services/images';
const { isBlank, isEmpty } = require('../services/config')

import { InputField, OutputField } from '../constants/InputField'


export default class NaturopathProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      isFetching: false
    }
  }

  componentWillMount() {
    const { params } = this.props.navigation.state
    if (params == undefined || params == null || !params.user) {
      this.props.navigation.goBack()
    }
    else {
      this.setState({ isFetching: true, user: params.user }, () => {
        this.setState({ isFetching: false })
      })
    }
  }
  _onContactPress = () => {
    const user = this.state.user
    const routeName = this.props.navigation.state.routeName
    const item = { 'user': user, 'routeName': routeName }
    this.props.navigation.navigate('GroupChannel', item)
  }
  render() {
    let user = {
      "birthday": {
        "nanoseconds": 0,
        "seconds": 651831600,
      },
      "conditions": true,
      "connectionStatus": "",
      "displayName": "",
      "email": "",
      "expoPushTokenAsync": "",
      "firstname": "",
      "isNaturopath": true,
      "lastSeenAt": 1542250696506,
      "lastname": "",
      "nickname": "",
      "pays": "",
      "phoneNumber": "",
      "photoURL": "",
      "postalcode": "7000",
      "profileUrl": "",
      "showUsername": true,
      "skills": [],
      "uid": "",
      "userId": "",
      "username": "",
      "ville": "",
    }
    const { params } = this.props.navigation.state
    user = params.user
    const userSkills = user.skills
    return (
      <Container style={{ backgroundColor: "#92C7A9" }}>
        <View style={styleHeader.headerContainer} >
          <View style={[styleHeader.headerIcon, styleHeader.left]}  >
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon style={styleHeader.icon} name='chevron-left' type="Entypo" />
            </TouchableOpacity>
          </View>
          <View style={styleHeader.headerTitle}  >
            <Text style={styleHeader.title}>Info</Text>
          </View>
        </View>
        <Content padder style={{ backgroundColor: "#f1f2f7" }}>
          <View style={[Common.boxShadow, { backgroundColor: "#fff", flex: 1, borderRadius: 5, padding: 10 }]}>
            <View style={[{ flexDirection: 'row', marginBottom: 10 }]}>
              <View style={[styleUserPhoto.contain, { marginRight: 10 }]}>
                <Image style={[styleUserPhoto.avatar, { width: 90, height: 90, borderRadius: 45, }]} source={{ uri: user.profileUrl }} />
              </View>
              <View style={[{ flexDirection: 'column', flex: 1 }]}>

                <View style={[styles.line, { alignItems: 'flex-end', flex: 1 }]}>
                  <Label style={[styles.displayName, { color: Colors.H2, fontSize: 13, flex: 0.3 }]}>{LANGUAGE.Username}:</Label>
                  <Text style={[styles.displayName, { flex: 0.7 }]}>{user.username}</Text>
                </View>
                <View style={[styles.line, { alignItems: 'flex-end', flex: 1 }]}>
                  <Label style={[styles.displayName, { color: Colors.H2, fontSize: 13, flex: 0.3 }]}>{LANGUAGE.Last}:</Label>
                  <Text style={[styles.displayName, { flex: 0.7 }]}>{user.lastname}</Text>
                </View>
                <View style={[styles.line, { alignItems: 'flex-end', flex: 1 }]}>
                  <Label style={[styles.displayName, { color: Colors.H2, fontSize: 13, flex: 0.3 }]}>{LANGUAGE.First}:</Label>
                  <Text style={[styles.displayName, { flex: 0.7 }]}>{user.firstname}</Text>
                </View>
                {(!isEmpty(user.pays) || !isEmpty(user.ville) || !isEmpty(user.postalcode)) &&
                  <View style={[styles.line, { flexWrap: 'wrap' }]}>
                    {!isEmpty(user.postalcode) &&
                      <View style={{ marginRight: 5, flexDirection: 'row' }}>
                        <Icon style={styles.text} name={'location-pin'} type="Entypo" />
                        <Text style={styles.text}>{user.postalcode}</Text>
                      </View>
                    }
                    {!isEmpty(user.ville) && <Text style={[styles.text, { paddingRight: 5 }]}>{user.ville}</Text>}
                    {(!isEmpty(user.ville) && !isEmpty(user.pays)) && <Text style={[styles.text, { paddingRight: 5 }]}>-</Text>}
                    {!isEmpty(user.pays) && <Text style={styles.text}>{user.pays}</Text>}
                  </View>
                }
              </View>
            </View>
            {!isEmpty(user.specialties) &&
              <View style={[styles.line, { flexWrap: 'wrap' }]}>
                {user.specialties.map((item, index) => <View key={index} style={styles.skillTag}><Text style={styles.text}>{item}</Text></View>)}
              </View>
            }
            <View style={[{ marginBottom: 10 }]}>
              <OutputField label={LANGUAGE.Email} data={user.email} />
              <OutputField label={LANGUAGE.Telephone} data={user.phoneNumber} />
            </View>
            <View style={[styles.line, { justifyContent: 'space-around' }]}>
              {['facebook', 'youtube', 'linkedin', 'instagram'].map((item, index) => {
                if (!isEmpty(user.sociales) && !isEmpty(user.sociales[item])) {
                  return (
                    <TouchableOpacity key={index} onPress={() => Linking.openURL(`${LANGUAGE.domain[item]}${user.sociales[item]}`)}>
                      <Icon style={[styles.socialIcon, { color: Colors[item] }]} key={index} name={`${item}-with-circle`} type='Entypo' />
                    </TouchableOpacity>
                  )
                }
                else return <Icon style={[styles.socialIcon, { color: 'grey' }]} key={index} name={`${item}-with-circle`} type='Entypo' />

              })}
            </View>
            <View style={[styles.line, { justifyContent: 'space-around' }]}>
              <Button small bordered style={Common.button} onPress={() => this._onContactPress()} >
                <Text style={{ color: '#fff' }}>Contacter</Text>
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
  line: {
    flexDirection: 'row',
    marginBottom: 3
  },
  text: {
    lineHeight: 21,
    color: Colors.text,
    fontFamily: 'HelveticaNeue-Light',
    fontSize: 14,
  },
  displayName: {
    color: '#203B62',
    fontSize: 18,
    fontWeight: "400",
    fontFamily: 'HelveticaNeue-Light'
  },
  skillTag: {
    backgroundColor: '#D9EDDF',
    borderRadius: 2,
    padding: 3,
    paddingLeft: 6,
    paddingRight: 6,
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4
  },
  socialIcon: { fontSize: 55, padding: 5, paddingLeft: 8, paddingRight: 8 },
})