import React, { Component } from 'react'
import { Platform, StatusBar, NativeModules, Text, StyleSheet, View, TouchableOpacity } from "react-native"
import { Icon, Button } from "native-base"
import { STATUS_BAR_Height } from '../constants/Layout'
import { AppNotificaton, IconNotificaton } from '../constants/StyledText'
const { uuid4 } = require('../services/config')
const UNIQUE_HANDLER_ID = uuid4()
const STATUS_BAR_H = STATUS_BAR_Height()
import { SendBirdAction } from '../services/SendBirdAction'
import { Auth } from '../services/Firebase/Auth'
import SendBird from 'sendbird'
import { createStore } from 'redux'
import { counter } from '../services/Storage'


export default class TitleHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      unReadMessage: 0
    }
    this.sb = SendBird.getInstance()

    this.sendbirdAction = SendBirdAction.getInstance()
    this.Authentication = Auth.getInstance()
    this.sb = SendBird.getInstance();

    //this.store = createStore(counter)
  }
  componentWillMount() {
    this._checkConnection('componentWillMount')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this._checkConnection('componentWillReceiveProps')
    }
  }
  _checkConnection = async (FROM) => {
    const isSigned = await this.Authentication._isSinged('TitleHeader/' + FROM)
    if (isSigned) {
      this.setState({ isSigned }, () => {
        // this._getUnReadMessage(FROM)
        // this._createChannelHandler()
      })
    }
  }
  componentWillUnmount() {
    this.sb.removeConnectionHandler(UNIQUE_HANDLER_ID)
  }
  _createChannelHandler() {
    const handler = new this.sb.ChannelHandler()
    handler.onMessageReceived = (channel, message) => {
      this._getUnReadMessage('onMessageReceived')
    }
    handler.onReadReceiptUpdated = groupChannel => {
      this._getUnReadMessage('onReadReceiptUpdated')
    }
    this.sb.addChannelHandler(UNIQUE_HANDLER_ID, handler)
  }
  _getUnReadMessage() {
    this.sendbirdAction.getTotalUnreadMessageCount()
      .catch(error => {
        console.log('TitleHeader/_getUnReadMessage ==> catch(error)/' + error)
      })
      .then(count => {
        const unReadMessage = count
        console.log('TitleHeader/_getUnReadMessage/', count)
        this.setState({ unReadMessage })
      })
  }
  _onPress() {
    if (this.props.iconMenu == 'goBack' || this.props.iconMenu == 'close') {
      this.props.navigation.goBack()
    }
    else {
      this.props.navigation.openDrawer()
    }
  }

  render() {
    // this.store.dispatch({ type: 'INCREMENT' })
    // this.store.dispatch({ type: 'INCREMENT' })
    // this.store.dispatch({ type: 'DECREMENT' })

    // this.store.subscribe(() => {
    //   const testCount = this.store.getState()
    //   console.log('getState', this.store.getState())
    //   console.log('testCount', testCount)
    // })
    const iconMenu = this.props.iconMenu == 'goBack' ?
      <Icon style={styles.icon} name='chevron-left' type="Entypo" />
      : <Icon style={styles.icon} name='navicon' type="EvilIcons" />
    return (
      <View>
        <View style={styles.headerContainer} >
          <View style={styles.headerIcon} >
            {this.props.iconMenu != 'close' &&
              <TouchableOpacity onPress={() => this._onPress()}>{iconMenu}</TouchableOpacity>
            }
          </View>
          <Text style={styles.headerTitle}>{this.props.title}</Text>
          <View style={styles.headerIcon} >
            {this.props.iconMenu != 'close' ?
              this.props.iconMenu != 'goBack' &&
              <TouchableOpacity style={{ justifyContent: 'flex-end', alignSelf: 'flex-end', }} onPress={() => this.props.navigation.navigate('Discussion')}>
                <IconNotificaton>{this.state.unReadMessage}</IconNotificaton>
              </TouchableOpacity> :
              <TouchableOpacity onPress={() => this._onPress()}>
                <Icon style={[styles.icon, { alignSelf: "flex-end" }]} name={this.props.iconMenu} type="EvilIcons" />
              </TouchableOpacity>
            }
          </View>
        </View>
        {/* {this.props.notify && <AppNotificaton type='warning'>{this.props.notify}</AppNotificaton>} */}
        {/* <AppNotificaton type='warning'>fdfdfsdfsdf {this.state.testCount}</AppNotificaton> */}
      </View>
    )
  }
}

export { TitleHeader };

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: "#92C7A9",
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 8,
    paddingTop: STATUS_BAR_H,
    //height: Platform.OS === "ios" ? 64 : 56,
  },
  headerIcon: {
    flex: 0.2,
    alignSelf: 'flex-end'
  },
  headerTitle: {
    flex: 0.6,
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    alignSelf: "center",
    fontFamily: 'HelveticaNeue-Light'
  },
  icon: { color: "#fff", fontSize: 30 }
})

