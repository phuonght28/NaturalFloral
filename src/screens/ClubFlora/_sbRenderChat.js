import React, { Component } from "react"
import { Dimensions, Platform, StyleSheet, View, TextInput, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, SafeAreaView, Button, FlatList } from 'react-native'
import { Container, Content, Text, Icon } from "native-base"
import IMAGES from '../../services/images'
import { Auth } from '../../services/Firebase/Auth'
import { Firestore } from '../../services/Firebase/Firestore'
import { SendBirdAction } from './_sbAction'
import { SendBirdChatEvent } from '../../services/SendBird/SendBirdChatEvent'
import { timestampToTime, errorAlert, protectFromXSS, uuid4 } from '../../services/SendBird/utils'
import SendBird from 'sendbird'
import STORAGE from '../../services/Storage'
import { Permissions, Notifications } from 'expo'
const windowHeight = Dimensions.get('window').height

export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true,
      text: '',
      isSigned: false,
    }
    this.channel = null
    this.Authentication = Auth.getInstance()
    this.Firestore = Firestore.getInstance()
    this.sendbirdAction = SendBirdAction.getInstance()
    this.offsetY
    this.flatListRef
    this.sb = SendBird.getInstance()
    this.key = uuid4()
  }
  _createChannelHandler() {
    const handler = new this.sb.ChannelHandler()
    handler.onMessageReceived = (channel, message) => {
      if (this.channel.url === channel.url) {
        this._fetchingMessageList()
      }
    }
    handler.onReadReceiptUpdated = groupChannel => {
      if (this.channel.url === groupChannel.url) {
        this._onReadReceiptUpdated()
      }
    }
    handler.onTypingStatusUpdated = groupChannel => {
      if (this.channel.url === groupChannel.url) {
        this._updateTyping(groupChannel.getTypingMembers())
      }
    }
    this.sb.addChannelHandler(this.key, handler)
  }

  componentWillUnmount() {
    this.sb.removeChannelHandler(this.key)
  }

  async componentWillMount() {
    const isSigned = await this.Authentication._isSinged()
    if (isSigned) {
      const { channelUrl, isOpenChannel } = this.props
      this._getChannel(channelUrl, isOpenChannel)
    }
    else {
      this.setState({ error: "L'authentification est requise" })
    }
  }
  _getChannel(channelUrl, isOpenChannel) {
    const self = this
    this.sendbirdAction.getChannel(channelUrl, isOpenChannel)
      .then(channel => {
        this.channel = channel
        self._fetchingMessageList()
        self._createChannelHandler()
      })
      .catch(error => {
        errorAlert(error.message)
      })
  }
  /*  updateReadReceipt() {
    this.readReceiptManageList.forEach(message => {
      if (message.messageId.toString() !== '0') {
        const className = Message.getReadReceiptElementClassName()
        const messageItem = this._getItem(message.messageId, false)
        if (messageItem) {
          let readItem = null
          try {
            readItem = messageItem.getElementsByClassName(className)[0]
          } catch (e) {
            readItem = null
          }
          const latestCount = SendBirdAction.getInstance().getReadReceipt(this.channel, message)
          if (readItem && latestCount.toString() !== readItem.textContent.toString()) {
            readItem.innerHTML = latestCount
            if (latestCount.toString() === '0') {
              removeClass(readItem, className)
            }
          }
        }
      }
    })
  }
  */

  _onReadReceiptUpdated() {
    const messageList = this.state.messageList
    const channel = this.channel
    return new Promise(() => {
      messageList.forEach((message) => {
        const latestCount = SendBirdAction.getInstance().getReadReceipt(channel, message)
        message.seen = latestCount > 0 ? 'check' : 'check-all'
      })
      this.setState({ messageList })
    })
  }

  _updateTyping(memberList) {
    const self = this
    let nicknames = ''
    if (memberList.length === 1) {
      nicknames = `${protectFromXSS(memberList[0].nickname)} is`
    }
    else if (memberList.length === 2) {
      nicknames = `${memberList
        .map(member => {
          return protectFromXSS(member.nickname)
        })
        .join(', ')} are`
    }
    else if (memberList.length !== 0) {
      nicknames = 'Several are'
    }
    const TypingUser = `${nicknames} typing...`
    const Typingdisplay = nicknames !== '' ? 'block' : 'none'
    self.setState({ TypingUser, Typingdisplay })
  }
  _fetchingMessageList() {
    const self = this
    const channel = this.channel
    return new Promise(() => {
      this.sendbirdAction.getMessageList(channel, true)
        .catch(error => {
          console.log('_fetchingMessageList', error.message)
        })
        .then(messageList => {
          if (channel.channelType === 'group') {
            messageList.forEach((message) => {
              const latestCount = SendBirdAction.getInstance().getReadReceipt(channel, message)
              message.seen = latestCount > 0 ? 'check' : 'check-all'
            })
            channel.markAsRead()
          }
          self.setState({ messageList }, () => {
            self.setState({ isFetching: false })
          })
        })
    })

  }

  _inputOnChangeText(text) {
    const channel = this.channel
    this.setState({ text })
    if (channel.channelType === 'group') {
      channel.startTyping()
    }
  }

  _sendMessage() {
    const self = this
    const message = this.state.text
    if (message) {
      return new Promise(() => {
        this.sendbirdAction.sendUserMessage({
          channel: this.channel,
          message,
          handler: (message, error) => {
            if (error) {
              console.log('sendUserMessage error:', error)
            }
            else {
              if (this.channel.channelType === 'group') {
                this.channel.endTyping()
                this._getExpoPushTokenAsync(message)
              }

              self.setState({ text: '' }, () => {
                console.log('sendUserMessage success')
                self._fetchingMessageList()
              })
            }
          }
        })
      })
    }
  }
  _getExpoPushTokenAsync = async (message) => {
    const { propsUser } = this.props
    let token
    if (propsUser.expoPushTokenAsync) {
      token = propsUser.expoPushTokenAsync
    }
    else {
      await this.Firestore.getUserProfileById(propsUser.userId)
        .then(userProfile => {
          if (userProfile && userProfile.expoPushTokenAsync) {
             token = userProfile.expoPushTokenAsync
          }
        })
        .catch((error) => {
          console.warn('_getExpoPushTokenAsync 5'+ `${error}`)
        })
    }
    const title = `${message._sender.nickname} vous a envoyé un message`
    const content = message.message
    this._callToPushNotification(token, title, content)
  }
  // _getExpoPushTokenAsync = async (channel, message) => {
  //   console.log(channel)
  //   //console.warn('this.channel' + `${channel.propsUser}`)
  //   const propsUser = channel.propsUser
  //   this.Authentication.getUserProfileById(propsUser.userId)
  //     .then(userProfile => {
  //       if (userProfile && userProfile.expoPushTokenAsync) {
  //         let token = userProfile.expoPushTokenAsync
  //         const title = `${message._sender.nickname} vous a envoyé un message`
  //         const content = message.message
  //         this._callToPushNotification(token, title, content)
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('this.Authentication.getUserProfileById', error)
  //     })
  // }
  _callToPushNotification = async (token, title, content) => {
    const tokenArray = {
      to: token,
      title: title,
      body: content,
      badge: 1,
      //body: `* ${moment(new Date()).format('h:mm:ss a')} : Bonjour ${message} !!`
    }
    STORAGE._pushNotification(tokenArray)
      .then((data) => {
        this.setState({ success: `${title}` })
        console.log('STORAGE._pushNotification done', data.ok)
      })
      .catch((error) => {
        this.setState({ error: error })
        console.log('STORAGE._pushNotification error' + `${error}`)
      })
  }


  render() {

    // let keyboardVerticalOffset = 0
    // if (Platform.OS === 'ios') {
    //   keyboardVerticalOffset = this.props.inFrame ? 85 : 85
    // }
    const keyboardVerticalOffset = Platform.OS === "ios" ? 85 : 0
    const behavior = Platform.OS === "ios" ? 'padding' : 'height'
    const numberOfLines = Platform.OS === "ios" ? 4 : 1
    let messageListRender = <ActivityIndicator />
    const { isFetching, messageList } = this.state
    if (!isFetching && messageList) {
      messageListRender = messageList.map((message, index) => {
        const profileUrl = message._sender.profileUrl ? { uri: message._sender.profileUrl } : IMAGES.getImages('unknow')
        return (
          <View key={index} style={[stylesChat.line, { flexDirection: 'row', marginBottom: 10, }]} >
            <View style={stylesChat.messLeft}>
              <Image style={stylesChat.avatar} source={profileUrl} />
            </View>
            <View style={stylesChat.messCenter}>
              <Text style={[stylesChat.text, stylesChat.sender]}>{message._sender.nickname} </Text>
              <Text style={stylesChat.text}>{message.message}</Text>
            </View>
            <View style={[stylesChat.messLeft, { justifyContent: 'flex-end' }]}>
              <Text style={[stylesChat.text, stylesChat.time]}>{timestampToTime(message.createdAt)}</Text>
              {this.channel.channelType === 'group' &&
                <Icon style={{ color: '#92C7A9', fontSize: 18, alignSelf: 'flex-end' }} name={message.seen} type="MaterialCommunityIcons" />
              }
            </View>
          </View>
        )
      })
      setTimeout(() => {
        this.ScrollViewRef.scrollToEnd({ animated: false })
      }, 100)
      if (Platform.OS === "ios" && this.props.inFrame) {
        return (
          <View style={styles.container} >
            <ScrollView ref={(ref) => { this.ScrollViewRef = ref }} onScroll={() => { this.props.onScroll }}
              scrollEventThrottle={250} style={{ backgroundColor: "white", padding: 20 }}>
              {messageListRender}

            </ScrollView>
            {this.state.Typingdisplay === 'block' && <Text note style={{ textAlign: 'center' }}>{this.state.TypingUser}</Text>}
            <View style={stylesChat.inputMessage}>
              <View style={stylesChat.messLeft}></View>
              <View style={[stylesChat.messRight]}>
                <View style={{ flex: 0.8, maxHeight: 84, padding: 0, margin: 0 }} >
                  <TextInput
                    style={{ lineHeight: 21, fontSize: 16, padding: 5, margin: 0 }}
                    multiline={true}
                    numberOfLines={numberOfLines}
                    placeholder="Type a message"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this._inputOnChangeText(text)}
                    value={this.state.text}
                    editable={true}
                    autoCorrect={false}
                  />
                </View>
                <TouchableOpacity style={{ flex: 0.2, alignSelf: 'flex-end' }} onPress={() => this._sendMessage()}>
                  <Text style={{ lineHeight: 24, color: '#386C5F', fontWeight: '400', marginLeft: 10, textAlign: 'center' }}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      }
      else
        return (
          <View style={styles.container} >
            <ScrollView ref={(ref) => { this.ScrollViewRef = ref }} onScroll={() => { this.props.onScroll }}
              scrollEventThrottle={250} style={{ backgroundColor: "white", padding: 10 }}>
              {messageListRender}
            </ScrollView>
            <KeyboardAvoidingView behavior={behavior} keyboardVerticalOffset={keyboardVerticalOffset} enabled >
              {this.state.Typingdisplay === 'block' && <Text note style={{ textAlign: 'center' }}>{this.state.TypingUser}</Text>}
              <View style={stylesChat.inputMessage}>
                <View style={stylesChat.messLeft}></View>
                <View style={[stylesChat.messRight]}>
                  <View style={{ flex: 0.8, maxHeight: 84, padding: 0, margin: 0 }} >
                    <TextInput
                      style={{ lineHeight: 21, fontSize: 16, padding: 5, margin: 0 }}
                      multiline={true}
                      numberOfLines={numberOfLines}
                      placeholder="Type a message"
                      underlineColorAndroid='transparent'
                      onChangeText={(text) => this._inputOnChangeText(text)}
                      value={this.state.text}
                      editable={true}
                      autoCorrect={false}
                    />
                  </View>
                  <TouchableOpacity style={{ flex: 0.2, alignSelf: 'flex-end' }} onPress={() => this._sendMessage()}>
                    <Text style={{ lineHeight: 24, color: '#386C5F', fontWeight: '400', marginLeft: 10, textAlign: 'center' }}>Send</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View >
        )
    }
    return (
      <View style={styles.container} >
        {isFetching &&
          <Content padder style={{ paddingTop: 20 }}>
            <ActivityIndicator />
          </Content>
        }
      </View >
    )
  }
}

const TEXTCOLOR = '#575757'
const stylesChat = StyleSheet.create({
  inputMessage: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#f1f0f0',
    borderWidth: 1
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
    flex: 0.8,
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
    backgroundColor: '#fff',
  },
  header: {
    //height: 250,
    flexDirection: 'row',
    backgroundColor: "#92C7A9",
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




var messageList = [
  {
    "_sender": {
      "_update": ["Function anonymous"],
      "_updateMetaData": ["Function anonymous"],
      "connectionStatus": "nonavailable",
      "createMetaData": ["Function anonymous"],
      "deleteAllMetaData": ["Function anonymous"],
      "deleteMetaData": ["Function anonymous"],
      "friendDiscoveryKey": null,
      "friendName": null,
      "getOriginalProfileUrl": ["Function anonymous"],
      "isActive": true,
      "lastSeenAt": 0,
      "metaData": {},
      "nickname": "Seb",
      "profileUrl": "https://sendbird.com/main/img/profiles/profile_26_512px.png",
      "serialize": ["Function anonymous"],
      "updateMetaData": ["Function anonymous"],
      "userId": "Fs7yPbhNQ5MtECexh5qY4PJL5hn2",
    },
    "channelType": "open",
    "channelUrl": "clubflora",
    "createdAt": 1536580350842,
    "customType": "",
    "data": "",
    "mentionType": "users",
    "mentionedUsers": [],
    "message": "Hi",
    "messageId": 1818922679,
    "messageType": "user",
    "reqId": "",
    "translations": {},
    "updatedAt": 0,
  },
  {
    "_sender": {
      "_update": ["Function anonymous"],
      "_updateMetaData": ["Function anonymous"],
      "connectionStatus": "nonavailable",
      "createMetaData": ["Function anonymous"],
      "deleteAllMetaData": ["Function anonymous"],
      "deleteMetaData": ["Function anonymous"],
      "friendDiscoveryKey": null,
      "friendName": null,
      "getOriginalProfileUrl": ["Function anonymous"],
      "isActive": true,
      "lastSeenAt": 0,
      "metaData": {},
      "nickname": "Seb",
      "profileUrl": "https://sendbird.com/main/img/profiles/profile_26_512px.png",
      "serialize": ["Function anonymous"],
      "updateMetaData": ["Function anonymous"],
      "userId": "Fs7yPbhNQ5MtECexh5qY4PJL5hn2",
    },
    "channelType": "open",
    "channelUrl": "clubflora",
    "createdAt": 1536580472194,
    "customType": "",
    "data": "",
    "mentionType": "users",
    "mentionedUsers": [],
    "message": "Anybody ?",
    "messageId": 1818926869,
    "messageType": "user",
    "reqId": "",
    "translations": {},
    "updatedAt": 0,
  },
  {
    "_sender": {
      "_update": ["Function anonymous"],
      "_updateMetaData": ["Function anonymous"],
      "connectionStatus": "nonavailable",
      "createMetaData": ["Function anonymous"],
      "deleteAllMetaData": ["Function anonymous"],
      "deleteMetaData": ["Function anonymous"],
      "friendDiscoveryKey": null,
      "friendName": null,
      "getOriginalProfileUrl": ["Function anonymous"],
      "isActive": true,
      "lastSeenAt": 0,
      "metaData": {},
      "nickname": "Seb",
      "profileUrl": "https://sendbird.com/main/img/profiles/profile_26_512px.png",
      "serialize": ["Function anonymous"],
      "updateMetaData": ["Function anonymous"],
      "userId": "Fs7yPbhNQ5MtECexh5qY4PJL5hn2",
    },
    "channelType": "open",
    "channelUrl": "clubflora",
    "createdAt": 1536580472817,
    "customType": "",
    "data": "",
    "mentionType": "users",
    "mentionedUsers": [],
    "message": "Anybody ?",
    "messageId": 1818926890,
    "messageType": "user",
    "reqId": "",
    "translations": {},
    "updatedAt": 0,
  },
]