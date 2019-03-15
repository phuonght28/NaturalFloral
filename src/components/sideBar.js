import React, { Component } from "react"
import { StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native"
import { View, Text, List, ListItem, Icon } from "native-base"
import moment from 'moment'
import ROUTE from '../services/parsers/route'
import { Auth } from '../services/Firebase/Auth'
const { uuid4, isEmpty, errorAlert } = require('../services/config')
const activeColor = "#1FB5AD"
const offColor = "#AAB2BD"
const SideBarBG = '#28282e'
const TIMERELEASED = "2018112016"

export default class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isSigned: false,
      userFirebase: null,
      userProfile: null,
    }
    this.Auth = Auth.getInstance()
    this.userFirebase = null
    this.isSigned = null
  }
  componentWillMount() {
    this._checkConnection()
  }
  componentWillReceiveProps() {
    this._checkConnection()
  }

  _checkConnection = async () => {
    const isSigned = await this.Auth._isSinged()
    const oldSign = this.state.isSigned
    if (isSigned !== oldSign) {
      if (isSigned) {
        const userFirebase = await this.Auth.getCurrentUser()
        const userProfile = await this.Auth.getUserProfile(userFirebase)
        this.setState({ userFirebase, userProfile, isSigned }, () => {
          this.setState({ isLoading: false })
        })
      }
      else {
        this.setState({ userFirebase: null, isSigned: false, isLoading: true }, () => {
          this.setState({ isLoading: false })
        })
      }
    }
  }
  _disconnect = () => {
    this.Auth.disconnect()
      .then(() => {
        console.log('logout')
        this.setState({ userFirebase: null, userProfile: null, isSigned: false })
      })
  }
  _navigation = (router, params) => {
    this.props.navigation.push(router, params)
  }
  _renderMenuItem = (data, index, userFirebase) => {
    return (
      <ListItem key={index} noBorder button style={styles.listItem} onPress={() => this._navigation(data.route, userFirebase)} >
        <Icon style={{ color: data.status == 'active' ? activeColor : offColor, fontSize: 20 }} name={data.icon} type={data.iconType} active />
        <Text style={[styles.text, { color: data.status == 'active' ? activeColor : offColor }]}>{data.title}</Text>
      </ListItem>
    )
  }
  render() {
    const { userFirebase, userProfile, isSigned, isLoading } = this.state
    let _renderUserInfo = <ActivityIndicator />
    _renderUserInfo = isSigned && userFirebase ?
      <UserInfo userFirebase={userFirebase} disconnect={() => { this._disconnect() }} _navigation={(router, params) => { this._navigation(router, params) }} />
      :
      <ListItem noBorder button style={[styles.listItem]} onPress={() => this._navigation('Connection')} >
        <Icon style={{ color: offColor, fontSize: 20 }} name="user" type="FontAwesome" />
        <Text style={[styles.text, { color: offColor }]}>Se connecter </Text>
      </ListItem>
    let _renderMenuList
    if (!isEmpty(userProfile) && userProfile.isNaturopath) {
      // _renderMenuList = <List dataArray={ROUTE} renderRow={data => this._renderMenuItem(data, userFirebase)} />
      _renderMenuList = ROUTE.map((data, index) => {
        return this._renderMenuItem(data, index, userFirebase)
      })
    }
    else {
      _renderMenuList = ROUTE.map((data, index) => {
        if (data.route !== "NaturopathList") {
          return this._renderMenuItem(data, index, userFirebase)
        }
        else {
          return <View />
        }
      })
    }
    // _renderMenuList = userProfile && userProfile.isNaturopath ?
    //   <List dataArray={ROUTE} renderRow={data => this._renderMenuItem(data, userFirebase)} />
    //   :
    //   <List dataArray={ROUTE} renderRow={data => {
    //     if (data.route !== "NaturopathList") {
    //       return this._renderMenuItem(data, userFirebase)
    //     }
    //     else { return <View /> }
    //   }}
    //   />

    return (
      <View style={styles.SideBar} >
        {_renderUserInfo}
        <ScrollView>
          {_renderMenuList}
        </ScrollView>
        {/*         
          <List dataArray={ROUTE}
            renderRow={data => {
              return (
                <View>
                  {data.route !== 'NaturopathList' &&
                    <ListItem noBorder button style={styles.listItem} onPress={() => this._navigation(data.route, userFirebase)} >
                      <Icon style={{ color: data.status == 'active' ? activeColor : offColor, fontSize: 20 }} name={data.icon} type={data.iconType} active />
                      <Text style={[styles.text, { color: data.status == 'active' ? activeColor : offColor }]}>{data.title}</Text>
                    </ListItem>
                  }
                </View>
              )
            }}
          />
        */}
        <Text style={{ textAlign: "center", color: offColor, fontSize: 12, marginTop: 10 }}>Version 1.0.4</Text>
      </View>
    )
  }
}

class UserInfo extends Component {
  render() {
    const { userFirebase, disconnect } = this.props
    return (
      <ListItem style={[styles.listItem, { justifyContent: 'space-between' }]}>
        <TouchableOpacity onPress={() => { this.props._navigation('UserProfile', { userFirebase }) }} activeOpacity={0.6}>
          <View style={{ flexDirection: 'row' }}>
            <Icon style={{ color: "#F1E583", fontSize: 20 }} name="user-circle" type="FontAwesome" />
            <Text style={[{ color: "#F1E583" }, styles.text]}>{userFirebase.displayName}</Text>
          </View>
          <Text style={[{ color: "#fff", fontSize: 14, fontStyle: 'italic' }]}>Voir le profil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={disconnect} activeOpacity={0.6}>
          <Text style={[{ color: "#fff", fontSize: 14, fontStyle: 'italic', fontWeight: '500' }]}>Déconnecter</Text>
        </TouchableOpacity>
      </ListItem>
    )
  }
}
const styles = StyleSheet.create({
  SideBar: {
    backgroundColor: SideBarBG,
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    paddingTop: 50
  },
  listItem: {
    backgroundColor: SideBarBG,
    marginLeft: 0,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    borderBottomWidth: 1,
    paddingRight: 0,

  },
  text: {
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 5
  }
})


