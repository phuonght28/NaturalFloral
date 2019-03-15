import React, { Component } from "react"
import LANGUAGE from '../constants/LanguageFrench'
import { H1 } from '../constants/StyledText'
import { AsyncStorage, StyleSheet, View } from 'react-native'

import { SendBirdAction } from '../services/SendBirdAction'
import RenderChannels from '../screens/ClubFlora/_sbRenderChannels'


export default class Channel_OpenList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true,
      FAVORITE: []
    }
    this.sendbirdAction = SendBirdAction.getInstance()
  }
  async componentWillMount() {
    return Promise.all([
      await AsyncStorage.getItem('FAVORITE').then((FAVORITE) => {
        if (FAVORITE && FAVORITE.length > 0) {
          FAVORITE = JSON.parse(FAVORITE)
          this.setState({ FAVORITE })
        }
      }),
      await this._getOpenChannelList(true),
    ])
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
        console.log('Channel_OpenList _getOpenChannelList error.', error.message)
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
      <View>
        <View style={{ margin: 10, marginBottom: 20 }}>
          <H1>{LANGUAGE.Favorite_Channels}</H1>
          <RenderChannels navigation={this.props.navigation} channelType={'open'} channels={channelsFAVORITE} />
        </View>
        <View style={{ margin: 10, marginBottom: 20 }}>
          <H1>{LANGUAGE.Other_Channels}</H1>
          <RenderChannels navigation={this.props.navigation} channelType={'open'} channels={channelsOthers} />
        </View>
      </View>
    )
  }
}

