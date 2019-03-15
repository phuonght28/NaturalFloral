import React, { Component } from "react"
import { AsyncStorage, StyleSheet, View, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { Container, Content, Button, Text, Input, Icon } from "native-base"
import { LinearGradient } from 'expo'
import IMAGES from '../../services/images'
import PropTypes from 'prop-types'
import { SendBirdAction } from './_sbAction'
import { _Channels, _OtherChannels } from './_const'
import RenderChannels from './_sbRenderChannels'
//import { Authentication } from '../../services/Authentication'
import { SendBird_API } from '../../services/config'
import { timestampToTime, uuid4 } from '../../services/SendBird/utils'
import SendBird from 'sendbird'
const UNIQUE_HANDLER_ID = uuid4()


import { STATUS_BAR_Height } from '../../constants/Layout'
const STATUS_BAR_H = STATUS_BAR_Height()
const UnknowIMG = IMAGES.getImages('unknow')

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true
    }
    this.sendbird = new SendBird({ SendBird_API })
    this.sendbirdAction = SendBirdAction.getInstance()
    this._createChannelHandler()
    this._sbConnectionHandler()
    this.currentUser
  }
  _sbConnectionHandler() {
    const ConnectionHandler = new this.sendbird.ConnectionHandler()
    ConnectionHandler.onReconnectStarted = function () {
      console.log('Connection Handler.onReconnectStarted: Network has been disconnected. Auto reconnecting starts.')
    }
    ConnectionHandler.onReconnectSucceeded = function () {
      console.log('Connection Handler.onReconnectSucceeded: Auto reconnecting succeeded.')
    }
    ConnectionHandler.onReconnectFailed = function () {
      console.log('Connection Handler.onReconnectFailed: Auto reconnecting failed. You can call `reconnect()` to reset timer and restart reconnection to SendBird.')
    }
    this.sendbird.addConnectionHandler(UNIQUE_HANDLER_ID, ConnectionHandler)
  }
  _createChannelHandler() {
    const handler = new this.sendbird.ChannelHandler()
    handler.onMessageReceived = (channel, message) => {
      if (this.onMessageReceived) {
        this.onMessageReceived(channel, message)
      }
    }
    handler.onMessageUpdated = (channel, message) => {
      if (this.onMessageUpdated) {
        this.onMessageUpdated(channel, message)
      }
    }
    handler.onMessageDeleted = (channel, messageId) => {
      if (this.onMessageDeleted) {
        this.onMessageDeleted(channel, messageId)
      }
    }

    handler.onReadReceiptUpdated = groupChannel => {
      if (this.onReadReceiptUpdated) {
        this.onReadReceiptUpdated(groupChannel)
      }
    }
    handler.onTypingStatusUpdated = groupChannel => {
      if (this.onTypingStatusUpdated) {
        this.onTypingStatusUpdated(groupChannel)
      }
    }
    this.sendbird.addChannelHandler(this.key, handler)
  }
  async componentWillMount() {
    const { userSendbird, userFirebase } = this.props
    console.log('userSendbird', userSendbird)
    const profileUrl = userSendbird ? { uri: userSendbird.profileUrl } : UnknowIMG
    const profileName = userFirebase.displayName
    this.currentUser = { profileUrl, profileName }

    let FAVORITE = await AsyncStorage.getItem('FAVORITE')
    console.log(FAVORITE)
    if (FAVORITE) {
      FAVORITE = JSON.parse(FAVORITE)
    }
    else {
      FAVORITE = []
    }
    this.setState({ FAVORITE }, () => {
      this._getOpenChannelList(true)
      this._getGroupChannelList(true)
    })
  }

  _getOpenChannelList(isInit = false) {
    const self = this
    const userId = this.props.userSendbird.userId

    this.sendbirdAction.getOpenChannelList(isInit)
      .then(channels => {
        if (channels) {
          channels.sort(function (a, b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); })
          self.setState({ channels }, () => {
            self.setState({ isFetching: false })
          })
        }
      })
      .catch(error => {
        console.log('_getOpenChannelList error.', error.message)
      })
  }
  _getGroupChannelList(isInit = false) {
    const self = this
    const userId = this.props.userSendbird.userId

    this.sendbirdAction.getGroupChannelList(isInit)
      .then(list => {
        if (list) {
          list.forEach(channel => {
            console.log('_getGroupChannelList channel ================================', channel)
            let channelName, channelCoverUrl
            channel.members.forEach(K => {
              if (K.userId !== userId) {
                channelName = K.nickname
                channelCoverUrl = K.profileUrl
              }
            })
            channel.coverUrl = channelCoverUrl
            channel.nickname = channelName
          })
          const recentGroupChannel = list
          self.setState({ recentGroupChannel }, () => {
            self.setState({ isFetching: false })
          })
        }
      })
      .catch(error => {
        console.log('// error fetched the channel.', error.message)
      })
  }

  _onOpenChannelPress(channel) {
    this.props.navigation.navigate('ChatBox', { channel })
  }
  render() {
    const channelsFAVORITE = []
    const channelsOthers = []
    const channelsFAVORITEURL = []

    if (!this.state.isFetching && this.state.channels) {
      const { channels, FAVORITE } = this.state

      const clubfloraChannel = channels.find((channel) => channel.url === 'clubflora')
      if (clubfloraChannel) channelsFAVORITE.push(clubfloraChannel)


      FAVORITE.map((item) => {
        item = item.replace('-', '')
        channelsFAVORITEURL.push(item)
      })

      channels.map((channel) => {
        if (channel.url === 'clubflora') { /* Skipp */ }
        else if (channelsFAVORITEURL.find((url) => url === channel.url)) {
          channelsFAVORITE.push(channel)
        }
        else {
          channelsOthers.push(channel)
        }
      })
    }
    return (
      <Container style={styles.container}>
        <View style={styles.header}>
          <LinearGradient style={styles.gradient} colors={['#92C7A9', '#386C5F']}>
            <View style={styles.headerMenu}>
              <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                <Icon style={styles.headerIcon} name="navicon" type="EvilIcons" />
              </TouchableOpacity>
            </View>
            <View style={styles.headerTitle}>
              <RenderUserProfile currentUser={this.currentUser} />
            </View>
          </LinearGradient>
        </View>
        <Content>
          {this.state.recentGroupChannel &&
            <View style={{ margin: 10 }}>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text style={{ color: '#394B41', flex: 0.8, fontWeight: '700', lineHeight: 34 }}>Recent Messages</Text>
                {/*
                <TouchableOpacity style={{ alignItems: 'flex-end', flex: 0.2 }}>
                  <Icon style={{ color: '#394B41', fontSize: 30 }} name="md-add-circle" />
                </TouchableOpacity>
                */}
              </View>
              <RenderChannels navigation={this.props.navigation} channels={this.state.recentGroupChannel} />
            </View>
          }
          <View style={{ margin: 10, marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ color: '#394B41', fontWeight: '700', lineHeight: 34 }}>{_Channels}</Text>
            </View>
            <RenderChannels navigation={this.props.navigation} channels={channelsFAVORITE} />
          </View>
          <View style={{ margin: 10 }}>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ color: '#394B41', flex: 0.8, fontWeight: '700', lineHeight: 34 }}>{_OtherChannels}</Text>x
            </View>
            <RenderChannels navigation={this.props.navigation} channels={channelsOthers} />
          </View>
        </Content>
      </Container>
    )
  }
}

class RenderUserProfile extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    profileUrl: PropTypes.string,
    profileName: PropTypes.string
  }
  render() {
    if (this.props.currentUser) {
      const { profileUrl, profileName } = this.props.currentUser
      return (
        <View>
          <View style={styles.line}>
            <Image style={stylesProfile.avatarImg} source={profileUrl} />
          </View>
          <View style={styles.line}>
            <Text style={stylesProfile.displayName}>{profileName}</Text>
          </View>
        </View>
      )
    }
    else {
      return (
        <View>
          <ActivityIndicator />
        </View>
      )
    }
  }
}

const COLOR = '#D1E2D6'
const TEXTCOLOR = '#575757'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1E2D6',
    //backgroundColor: '#fff',
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
    //alignSelf: 'center',
  },
  headerTitle: {
    flex: 0.8,
    //alignSelf: 'center',
    alignItems: 'center'
  },
  headerIcon: {
    color: '#fff',
    fontSize: 30,
  },
  headerText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: 'HelveticaNeue-Light'
  },
  line: {
    marginBottom: 10,
  },
})
const stylesProfile = StyleSheet.create({
  avatarImg: {
    height: 70,
    width: 70,
    borderRadius: 35,
    borderColor: '#FFF',
    borderWidth: 2,
    margin: 5,
    //alignSelf: 'center',
  },
  displayName: {
    //alignSelf: 'center',
    lineHeight: 35,
    color: "#FFF",
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    fontFamily: 'HelveticaNeue-Light'
  },
})
const stylesChat = StyleSheet.create({
  line: {
    flexDirection: 'row',
    marginBottom: 10,

  },
  button: {
    flexDirection: 'row',
  },
  icon: {
    color: TEXTCOLOR,
    fontSize: 16,
    lineHeight: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    color: TEXTCOLOR,
    lineHeight: 30,
    fontWeight: "500",
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





