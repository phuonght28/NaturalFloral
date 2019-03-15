import React, { Component } from "react"
import { Platform, NativeModules, StyleSheet, View, TextInput, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import { Container, Content, Text } from "native-base"
import IMAGES from '../../../services/images'
import TITLE from '../../../components/titleHeader'
import moment from 'moment'
import { LinearGradient } from 'expo'
import { timestampToTime, uuid4 } from '../../../services/SendBird/utils'
import { SendBird_API } from '../../../services/config'

const { StatusBarManager } = NativeModules
let STATUS_BAR_H = 44

import SendBird from 'sendbird'
const UNIQUE_HANDLER_ID = uuid4()

//const NoPhoto = require(uri: 'https://sendbird.com/main/img/profiles/profile_14_512px.png')
export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true,
      text: '',
    }
    this.sb = new SendBird({ 'appId': SendBird_API })
    this._createChannelHandler()
    this._sbConnectionHandler()
  }
  _sbConnectionHandler() {
    const ConnectionHandler = new this.sb.ConnectionHandler()
    ConnectionHandler.onReconnectStarted = function () {
      console.log('Connection Handler.onReconnectStarted: Network has been disconnected. Auto reconnecting starts.')
    }
    ConnectionHandler.onReconnectSucceeded = function () {
      console.log('Connection Handler.onReconnectSucceeded: Auto reconnecting succeeded.')
    }
    ConnectionHandler.onReconnectFailed = function () {
      console.log('Connection Handler.onReconnectFailed: Auto reconnecting failed. You can call `reconnect()` to reset timer and restart reconnection to SendBird.')
    }
    this.sb.addConnectionHandler(UNIQUE_HANDLER_ID, ConnectionHandler)
  }
  componentWillMount() {
    const { currentUser, channel } = this.props.navigation.state.params
    this.setState({ channel, currentUser }, () => {
      this.sendbirdCreatePreviousMessageListQuery()
    })
    //const ChannelHandler = new this.sb.ChannelHandler()
    // ChannelHandler.onMessageReceived = function (channel, message) {
    //   console.log('ClubFlora/Chat_ onMessageReceived', message)
    // }
    // this.sb.addChannelHandler(this.key, ChannelHandler)

  }
  
  componentWillUnmount() {
    this.sb.removeConnectionHandler(UNIQUE_HANDLER_ID);
  }
  _createChannelHandler() {
    const handler = new this.sb.ChannelHandler()
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
    this.sb.addChannelHandler(this.key, handler)
  }

  _onOpenChannelPress = (channelUrl) => {
    const self = this
    this.sendbird.OpenChannel.getChannel(channelUrl, function (channel, error) {
      if (error) {
        console.log('Profile/SendBird getChannel error', error)
      }
      channel.enter(function (response, error) {
        if (error) {
          console.log('Profile/SendBird channel.enter error', error)
        }
        console.log('Profile/SendBird channel.enter response: ', response)
      })
    })
  }
  sendbirdCreatePreviousMessageListQuery = () => {
    const channel = this.state.channel
    const self = this
    const messageListQuery = channel.createPreviousMessageListQuery()
    messageListQuery.load(30, true, function (messageList, error) {
      if (error) {
        //console.error('messageListQuery.load => error', error)
        alert(error)
        //return
      }
      messageList.reverse()
      self.setState({ isFetching: true, messageList }, () => {
        self.setState({ isFetching: false })
      })
    })
  }

  sendMessage() {
    const self = this
    const { text, channel } = this.state
    const channelUrl = channel.channelUrl
    if (text != '') {
      channel.enter(function (response, error) {
        if (error) {
          console.log('Profile/SendBird channel.enter error', error)
        }
        console.log('Profile/SendBird channel.enter response: ', response)
        channel.sendUserMessage(text, null, null, function (message, error) {
          if (error) {
            console.log('ClubFlora/Chat_ sendUserMessage error', error)
            //console.error('sendUserMessage => error', error)
            //alert(error)
            //return
          }
          // onSent
          console.log('ClubFlora/Chat_ sendUserMessage:', message)
          self.sendbirdCreatePreviousMessageListQuery()
          self._clearText()
        })
      })

    }
  }
  _clearText() {
    this.setState({ isFetching: true, text: '' }, () => {
      this.setState({ isFetching: false })
    })
  }
  render() {
    const { channel } = this.props.navigation.state.params
    let messageListRender = <ActivityIndicator />
    const { isFetching, messageList } = this.state
    if (!isFetching && messageList) {
      messageListRender = messageList.map((message, index) => {
        return (
          <View key={index} style={[stylesChat.line, { flexDirection: 'row', marginBottom: 10, }]}>
            <View style={stylesChat.messLeft}>
              <Image style={stylesChat.avatar} source={{ uri: message._sender.profileUrl }} />
            </View>
            <View style={stylesChat.messCenter}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[stylesChat.text, stylesChat.sender]}>{message._sender.nickname} </Text>
                <Text style={[stylesChat.text, stylesChat.time]}>{timestampToTime(message.createdAt)}</Text>
              </View>
              <Text style={stylesChat.text}>{message.message}</Text>
            </View>
          </View>
        )
      })
    }
    const behavior = Platform.OS === "ios" ? 'position' : 'height'
    return (
      <Container style={styles.container}>
        <TITLE title={channel.name} navigation={this.props.navigation} iconMenu={'goBack'} />
        <Content style={{ padding: 10 }}>
          {messageListRender}
        </Content>
        <KeyboardAvoidingView behavior={behavior} enabled >
          <View style={stylesChat.inputMessage}>
            <View style={stylesChat.messLeft}></View>
            <View style={[stylesChat.messRight]}>
              <View style={{ maxHeight: 120, flex: 0.8, padding: 0, margin: 0 }} >
                <TextInput
                  style={{ lineHeight: 21, fontSize: 16, padding: 5, margin: 0 }}
                  multiline={true}
                  numberOfLines={4}
                  placeholder="Type a message"
                  underlineColorAndroid='transparent'
                  onChangeText={(text) => this.setState({ text })}
                  value={this.state.text}
                  editable={true}
                />
              </View>
              <TouchableOpacity style={{ flex: 0.2, alignSelf: 'flex-end' }} onPress={() => this.sendMessage()}>
                <Text style={{ lineHeight: 24, color: '#386C5F', fontWeight: '400', marginLeft: 10, textAlign: 'center' }}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Container >
    )
  }
}

const COLOR = '#D1E2D6'
const TEXTCOLOR = '#575757'

const stylesChat = StyleSheet.create({
  inputMessage: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#f1f0f0',
    borderTopWidth: 1
  },

  line: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    //borderBottomWidth: 0.5,
    //borderBottomColor: TEXTCOLOR,

  },
  messLeft: {
    flex: 0.1,
  },
  messCenter: {
    backgroundColor: '#f1f0f0',
    flex: 0.9,
    padding: 10,
  },
  messRight: {
    flex: 0.9,
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 5,
    flexDirection: 'row',
    borderLeftColor: '#f1f0f0',
    borderLeftWidth: 1
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: '#f1f0f0',
    borderWidth: 1,
    marginTop: 10
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
  cover: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderColor: '#FFF',
    borderWidth: 1,
    marginRight: 8,
  },
  text: {
    color: TEXTCOLOR,
    lineHeight: 30,
    fontSize: 15,
    fontFamily: 'HelveticaNeue-Light'
  },
  sender: {
    color: '#673AB7',
    fontWeight: "500",
  },
  time: {
    color: '#9CB0A4',
    fontSize: 11,
    textAlign: 'right'
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#D1E2D6',
    backgroundColor: '#fff',
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
    borderWidth: 3,
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




