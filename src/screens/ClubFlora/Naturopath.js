import React, { Component } from "react"
import { StyleSheet, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Container, Content, Text, Icon } from "native-base"
import TITLE from '../../components/titleHeader'

import RenderChat from './_sbRenderChat'
import ListNaturopath from './_renderListNaturopath'
import { SendBirdAction } from './_sbAction'

const _ = require('lodash')

import { STATUS_BAR_Height } from '../../constants/Layout'
const STATUS_BAR_H = STATUS_BAR_Height()

export default class Naturopath extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.channel = null
  }
  componentWillMount() {
    this._getUserList(true)
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
  // _getParticipant() {
  //   const self = this
  //   this.sendbirdAction.getParticipantList(this.channel.url, isInit = false)
  //     .then(participantList => {
  //       self.setState({ isFetching: true, participantList }, () => {
  //         self.setState({ isFetching: false })
  //       })
  //     })
  //     .catch(error => {
  //       errorAlert(error.message)
  //     })
  // }

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
        <TITLE navigation={this.props.navigation} title={'Communauté Pro onLine'} />
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
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: "#92C7A9",
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 8,
    paddingTop: STATUS_BAR_H,
  },
  headerIcon: {
    flex: 0.2,
    alignSelf: 'flex-end'
  },
  headerTitle: {
    flex: 0.6,
    paddingLeft: 8,
    paddingRight: 8,
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    alignSelf: "center",
    fontFamily: 'HelveticaNeue-Light'
  },
  icon: { color: "#fff", fontSize: 30 }
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







