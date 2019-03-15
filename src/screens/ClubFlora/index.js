import React, { Component } from "react"
import { StyleSheet, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Container, Content, Text, Icon } from "native-base"

import TITLE from '../../components/titleHeader'
import ConnectScreen from "./connect"
import Naturopath from "./Naturopath"
import { SendBirdAction } from './_sbAction'
import { Authentication } from '../../services/Authentication'


export default class ClubFlora extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      isSigned: false
    }
    this.Authentication = Authentication.getInstance()
    this.channel = null
  }

  componentWillMount() {
    this._checkConnection()
  }
  _checkConnection = () => {
    const self = this
    return new Promise(async () => {
      const isSigned = await this.Authentication._isSinged()
      const currentUser = await this.Authentication.CURRENT_USER()
      if (isSigned) {
        self.setState({ currentUser, isSigned, isLoading: false }, () => {
          this._getUserList(true)
        })
      }
      else {
        this.props.navigation.navigate('Connection')
      }
    })
  }
  _getUserList(isInit = false) {
    const self = this
    const sendbirdAction = SendBirdAction.getInstance()
    sendbirdAction.getUserList(isInit)
      .then(userList => {
        const currentUser = sendbirdAction.getCurrentUser()
        const element = userList.find((user) => user.userId === currentUser.userId)
        const index = userList.indexOf(element)
        userList.splice(index, 1);
        userList.sort(function (vote1, vote2) {
          if (vote1.connectionStatus > vote2.connectionStatus) return -1;
          if (vote1.connectionStatus < vote2.connectionStatus) return 1;
          if (vote1.nickname > vote2.nickname) return 1;
          if (vote1.nickname < vote2.nickname) return -1;
        })
        const participantList = userList
        self.setState({ isFetching: true, participantList }, () => {
          self.setState({ isFetching: false })
        })
      })
      .catch(error => { console.log('getUserList error.message:', error.message) })
  }
  _openGroupChannel(user) {
    const routeName = this.props.navigation.state.routeName
    const item = { 'user': user, 'routeName': routeName }
    this.props.navigation.navigate('GroupChannel', item)
  }
  render() {
    let renderParticipantList = <ActivityIndicator />
    if (!this.state.isFetching && this.state.participantList) {
      const { participantList } = this.state
      renderParticipantList = participantList.map((user, index) => {
        const userName = user.nickname
        const profileUrl = { uri: user.profileUrl }
        const userStatus = user.connectionStatus === "online" ? 'circle' : 'circle-o'
        return (
          <TouchableOpacity key={index} onPress={() => this._openGroupChannel(user)}>
            <View style={[stylesChat.line, { flexDirection: 'row', marginBottom: 10, flex: 1 }]}>
              <Icon style={stylesChat.icon} name={userStatus} type="FontAwesome" />
              <Image style={stylesChat.cover} source={profileUrl} />
              <Text style={stylesChat.text}>{userName}</Text>
            </View>
          </TouchableOpacity>
        )
      })
    }
    return (
      <Container style={styles.container}>
        <TITLE navigation={this.props.navigation} title={this.props.title} />
        <Content padder style={styles.container}>
          <View style={{ marginBottom: 20 }}>
            {renderParticipantList}
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1E2D6',
  },
})
const TEXTCOLOR = '#575757'
const stylesChat = StyleSheet.create({
  line: {
    flexDirection: 'row',
    marginBottom: 10,

  },
  button: {
    flexDirection: 'row',
  },
  icon: {
    color: '#72B048',
    fontSize: 12,
    lineHeight: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    color: TEXTCOLOR,
    lineHeight: 30,
    fontFamily: 'HelveticaNeue-Light'
  },
  cover: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderColor: '#FFF',
    borderWidth: 1,
    marginRight: 8,
  },
})
