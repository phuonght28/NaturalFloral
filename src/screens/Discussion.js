import React, { Component } from "react"
//import OpenChannel from "./ClubFlora/OpenChannel"
import GroupChannels from '../components/Channel_GroupList'
import OpenChannels from '../components/Channel_OpenList'
import TITLE from '../components/titleHeader'
import { ActivityIndicator, View } from 'react-native'
import { Container, Content, Text, Button } from "native-base"

import STORAGE from '../services/Storage'
import { Auth } from '../services/Firebase/Auth'
import moment from 'moment'
import SendBird from 'sendbird'
import { SendBirdAction } from '../services/SendBirdAction'
const { uuid4, isEmpty } = require('../services/config')
const UNIQUE_HANDLER_ID = uuid4()

import { Permissions, Notifications } from 'expo'



export default class Discussion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isSigned: false,
      currentUser: null,
      recentGroupChannel: null,
    }
    this.groupChannel = []
    this.Authentication = Auth.getInstance()
    this.sb = SendBird.getInstance()
    this.sendbirdAction = SendBirdAction.getInstance()

  }
  componentWillUnmount() {
    this.sb.removeConnectionHandler(UNIQUE_HANDLER_ID)
  }
  componentDidMount() {
    // this._createChannelHandler()
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
          self._getGroupChannelList(true)
        })
      }
      else {
        this.props.navigation.navigate('Connection')
      }
    })
  }
  onRefesh = () => {
    console.log('_onRefesh======', moment(new Date()).format('h:mm:ss a'))
    this._getGroupChannelList(true)
  }
  _getGroupChannelList(isInit = false) {
    const self = this
    const { currentUser } = this.state
    const userId = currentUser.userSendbird.userId

    this.sendbirdAction.getGroupChannelList(isInit)
      .catch(error => {
        console.log('Discussion: _getGroupChannelList ==> catch(error): ', error.message)
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
        }
      })
  }
  _createChannelHandler() {
    const handler = new this.sb.ChannelHandler()
    handler.onMessageReceived = (channel, message) => {
      this._getGroupChannelList(true)
      // console.log('Discussion/_createChannelHandler: onMessageReceived: message', message)
    }
    handler.onReadReceiptUpdated = groupChannel => {
      this._updateReadReceipt(groupChannel)
      //console.log('Discussion/_createChannelHandler: onReadReceiptUpdated: groupChannel', groupChannel)
    }
    this.sb.addChannelHandler(UNIQUE_HANDLER_ID, handler)
  }
  async _updateReadReceipt(groupChannel) {
    const { recentGroupChannel } = this.state
    recentGroupChannel.forEach(channel => {
      if (channel.url === groupChannel.url) {
        console.log('Discussion/_updateReadReceipt/ groupChannel', groupChannel.lastMessage.message)
        console.log('Discussion/_updateReadReceipt/ channel=====', channel.lastMessage.message)
        channel = groupChannel
      }
    })
    return new Promise(() => {
      this.setState({ recentGroupChannel }, () => {
        console.log('_updateReadReceipt done')
      })
    })
  }

  _containerError = (value) => {
    this.setState({ error: value }, () => {
      setTimeout(() => { this.setState({ error: null }) }, 5000)
    })
  }
  _containerSuccess = (value) => {
    this.setState({ success: value }, () => {
      setTimeout(() => { this.setState({ success: null }) }, 5000)
    })
  }
  render() {
    return (
      <Container style={{ backgroundColor: '#D1E2D6', flex: 1 }} >
        <TITLE navigation={this.props.navigation} title={this.props.title} />
        {this.state.error &&
          <Button full bordered danger onPress={() => { this.setState({ error: null }) }} >
            <Text >{this.state.error}</Text>
          </Button>
        }
        {this.state.success &&
          <Button full bordered success onPress={() => { this.setState({ success: null }) }} >
            <Text>{this.state.success}</Text>
          </Button>
        }
        <Content>
          {this.state.recentGroupChannel &&
            <GroupChannels navigation={this.props.navigation} channels={this.state.recentGroupChannel} onRefesh={this.onRefesh} />}
          {!this.state.isSigned ? <ActivityIndicator size="large" color='black' /> :
            <OpenChannels navigation={this.props.navigation} userFirebase={this.state.userFirebase} userSendbird={this.state.userSendbird} />
          }
        </Content>
      </Container >
    )
  }
}
