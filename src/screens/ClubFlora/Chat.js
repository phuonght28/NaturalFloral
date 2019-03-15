import React, { Component } from "react"
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Container, Content, Text, Icon } from "native-base"
import { SendBirdAction } from './_sbAction'

import RenderChat from './_sbRenderChat'


import { STATUS_BAR_Height } from '../../constants/Layout'
const STATUS_BAR_H = STATUS_BAR_Height()

export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.sendbirdAction = SendBirdAction.getInstance()
  }
  componentWillMount() {
  }
  componentWillUnmount() {
  }
  _enterChannel(channelUrl) {
    this.sendbirdAction.getChannel(channelUrl, isOpenChannel = true)
      .then(channel => {
        channel.enter(function (response, error) { })
      })
      .catch(error => {
        errorAlert(error.message)
      })
  }
  render() {
    const channel = this.props.navigation.state.params
    const channelUrl = channel.url
    this._enterChannel(channelUrl)
    return (
      <Container style={styles.container}>
        <View style={styles.headerContainer} >
          <View style={styles.headerIcon} >
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon style={styles.icon} name='chevron-left' type="Entypo" />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>{channel.name}</Text>
        </View>
        <View style={styles.container}>
          <RenderChat navigation={this.props.navigation} channelUrl={channelUrl} isOpenChannel={true} />
        </View>
      </Container >
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



