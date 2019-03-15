import React, { Component } from "react"
import { Platform, StyleSheet, View, TextInput, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView } from "react-native"
import { Container, Content, Text } from "native-base"
import { timestampToTime } from '../services/SendBird/utils'
import { SendBirdChatEvent } from '../services/SendBird/SendBirdChatEvent'
import { SendBird_API } from '../services/config'

const SendBird = require('sendbird')
const sb = new SendBird({ 'appId': SendBird_API })


export default class SlackChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true,
    }
    this.propsURL
  }

  componentWillMount() {
    this.propsURL = this.props.id.replace("-", "")
    const userSendbird = sb.currentUser
    if (userSendbird) {
      this.setState({ userSendbird }, () => {
        this._sbGetChannel(this.propsURL)
      })
    }
  }
  _addEventHandler() {
    const self = this
    const channelEvent = new SendBirdChatEvent();
    channelEvent.onMessageReceived = (channel, message) => {
      if (self.channel.url === channel.url) {
        this.main.renderMessages([message], false);
      }
    };
    channelEvent.onMessageUpdated = (channel, message) => {
      if (self.channel.url === channel.url) {
        this.main.renderMessages([message], false);
      }
    };
    channelEvent.onMessageDeleted = (channel, messageId) => {
      if (self.channel.url === channel.url) {
        this.main.removeMessage(messageId, false);
      }
    };

    // if ( self.channel.isGroupChannel()) {
    //   channelEvent.onReadReceiptUpdated = groupChannel => {
    //     if ( self.channel.url === groupChannel.url) {
    //       this.main.updateReadReceipt();
    //     }
    //   };
    //   channelEvent.onTypingStatusUpdated = groupChannel => {
    //     if ( self.channel.url === groupChannel.url) {
    //       this.main.updateTyping(groupChannel.getTypingMembers());
    //     }
    //   };
    // }
  }

  _sbGetChannel = (channelUrl) => {
    const self = this
    sb.OpenChannel.getChannel(channelUrl, function (channel, error) {
      self._addEventHandler()
      if (channel) {
        channel.enter(function (response, error) {
          if (error) {
            console.log('Profile/SendBird channel.enter error', error)
          }
          self._sbMessageListQuery(channel)
        })
      }
    })
  }
  _sbMessageListQuery(channel) {
    const self = this
    channel.createPreviousMessageListQuery().load(30, true, function (messageList, error) {
      if (error) {
        console.error('messageListQuery.load => error', error)
      }
      self.setState({ isFetching: true, messageList, channel }, () => {
        self.setState({ isFetching: false })
      })
    })
  }
  _sbSendUserMessage() {
    const self = this
    const { text, channel } = this.state
    const channelUrl = channel.channelUrl
    if (text != '') {
      channel.enter(function (response, error) {
        if (error) {
          console.log('Profile/SendBird channel.enter error', error)
        }
        channel.sendUserMessage(text, null, null, function (message, error) {
          if (error) {
            console.log('ClubFlora/Chat_ sendUserMessage error', error)
          }
          // onSent
          console.log('ClubFlora/Chat_ sendUserMessage:', message)
          //self.sendbirdCreatePreviousMessageListQuery()
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
    let messageListRender = <ActivityIndicator />

    const { isFetching, messageList, channel } = this.state
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
      <View>
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
              <TouchableOpacity style={{ flex: 0.2, alignSelf: 'flex-end' }} onPress={() => this._sbSendUserMessage()}>
                <Text style={{ lineHeight: 24, color: '#386C5F', fontWeight: '400', marginLeft: 10, textAlign: 'center' }}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
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
