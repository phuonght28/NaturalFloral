import React, { Component } from "react"
import { AsyncStorage, StyleSheet, View, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { Container, Content, Button, Text, Input, Icon } from "native-base"
import { LinearGradient } from 'expo'
import TITLE from '../../components/titleHeader'
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
import moment from 'moment'

import { STATUS_BAR_Height } from '../../constants/Layout'
const STATUS_BAR_H = STATUS_BAR_Height()
const UnknowIMG = IMAGES.getImages('unknow')

export default class OpenChannel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true,
      FAVORITE: []
    }
    this.sb = SendBird.getInstance()
    this.sendbirdAction = SendBirdAction.getInstance()
    this.currentUser
    this.groupChannel = []
  }

  componentWillUnmount() {
    this.sb.removeConnectionHandler(this.key)
  }
  async componentWillMount() {
    return Promise.all([
      await AsyncStorage.getItem('FAVORITE').then((FAVORITE) => {
        if (FAVORITE && FAVORITE.length > 0) {
          FAVORITE = JSON.parse(FAVORITE)
          this.setState({ FAVORITE })
        }
      }),
      await this._getGroupChannelList(true),
      await this._getOpenChannelList(true),
    ])
  }

  onRefesh = () => {
    console.log('_onRefesh======', moment(new Date()).format('h:mm:ss a'))
    this._getGroupChannelList(true)
  }
  _getGroupChannelList(isInit = false) {
    const self = this
    const userId = this.props.userSendbird.userId
    this.sendbirdAction.getGroupChannelList(isInit)
      .catch(error => {
        console.log('_getGroupChannelList ==> catch(error): ', error.message)
      })
      .then(channels => {
        if (channels) {
          channels.forEach(channel => {
            channel.members.forEach(member => {
              if (member.userId !== userId) {
                channel.name = member.nickname
                channel.coverUrl = member.profileUrl
                channel.propsUser = member
              }
            })
          })
          const recentGroupChannel = channels
          self.setState({ recentGroupChannel })
          self._createChannelHandler()
        }
      })
  }
  _getOpenChannelList(isInit = false) {
    const self = this
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
        console.log('OpenChannel _getOpenChannelList error.', error.message)
      })
  }
  _createChannelHandler() {
    const handler = new this.sb.ChannelHandler()
    handler.onMessageReceived = (channel, message) => {
      this._getGroupChannelList(true)
    }
    handler.onReadReceiptUpdated = groupChannel => {
      console.log('onReadReceiptUpdated')
      this._updateReadReceipt(groupChannel)
    }
    this.sb.addChannelHandler(this.key, handler)
  }
  async _updateReadReceipt(groupChannel) {
    const { recentGroupChannel } = this.state
    recentGroupChannel.forEach(channel => {
      if (channel.url === groupChannel.url) {
        console.log('groupChannel', groupChannel.lastMessage.message)
        console.log('channel=====', channel.lastMessage.message)
        channel = groupChannel
      }
    })
    return new Promise(() => {
      this.setState({ recentGroupChannel }, () => {
        console.log('_updateReadReceipt done')
      })
    })
  }

  render() {
    const channelsFAVORITE = []
    const channelsOthers = []
    const channelsFAVORITEURL = []

    if (!this.state.isFetching && this.state.channels) {
      const { channels } = this.state

      const clubfloraChannel = channels.find((channel) => channel.url === 'clubflora')
      if (clubfloraChannel) channelsFAVORITE.push(clubfloraChannel)

      if (this.state.FAVORITE && this.state.FAVORITE.length > 0) {
        this.state.FAVORITE.map((item) => {
          item = item.replace('-', '')
          channelsFAVORITEURL.push(item)
        })
      }

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
        <TITLE navigation={this.props.navigation} title={'Groupes de discussion'} />
        <Content>
          {this.state.recentGroupChannel &&
            <View style={{ margin: 10 }}>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text style={{ color: '#394B41', flex: 0.8, fontWeight: '700', lineHeight: 34 }}>Recent Messages</Text>
              </View>
              <RenderChannels navigation={this.props.navigation} channelType={'group'} channels={this.state.recentGroupChannel} onRefesh={this.onRefesh} />
            </View>
          }
          <View style={{ margin: 10, marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ color: '#394B41', fontWeight: '700', lineHeight: 34 }}>{_Channels}</Text>
            </View>
            <RenderChannels navigation={this.props.navigation} channelType={'open'} channels={channelsFAVORITE} />
          </View>
          <View style={{ margin: 10 }}>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ color: '#394B41', flex: 0.8, fontWeight: '700', lineHeight: 34 }}>{_OtherChannels}</Text>
            </View>
            <RenderChannels navigation={this.props.navigation} channelType={'open'} channels={channelsOthers} />
          </View>
        </Content>
      </Container>
    )
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





