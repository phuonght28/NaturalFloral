import React, { Component } from "react"
import { StyleSheet, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Container, Content, Text, Icon } from "native-base"
import { Auth } from '../../services/Firebase/Auth'
import { SendBirdAction } from './_sbAction'
import RenderChat from './_sbRenderChat'

import moment from 'moment'

import { STATUS_BAR_Height } from '../../constants/Layout'
const STATUS_BAR_H = STATUS_BAR_Height()

export default class GroupChannel extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: true }
    this.Authentication = Auth.getInstance()
    this.sendbirdAction = SendBirdAction.getInstance()
    this.userIds = []
  }
  componentWillMount() {
    const propsUser = this.props.navigation.state.params.user
    const currentUser = this.Authentication.CURRENT_USER()
    const userFirebase = currentUser.userFirebase
    this.userIds = [propsUser.userId, userFirebase.uid]
    this._getGroupChannelByUserIds([propsUser.userId, userFirebase.uid])
  }
  _getGroupChannelByUserIds(userIds) {
    const self = this
    this.sendbirdAction.getGroupChannelByUserIds(userIds)
      .then(groupChannel => {
        if (!groupChannel) {
          console.log('// The channel undefined .')
          this.createGroupChannel(userIds, true, 'Direct Message', null, null, 'Direct Message')
        }
        else {
          self.setState({ isFetching: true, groupChannel }, () => {
            self.setState({ isFetching: false })
          })
        }
      })
      .catch(error => {
        console.log('// error fetched the channel.', error.message)
      })
  }
  getListNaturopath() {
    this.Authentication.getUserList()
      .then((listUsers) => {
        const listNaturopath = []
        const listNaturopathIds = []
        listUsers.forEach((user) => {
          if (user.isNaturopath) {
            listNaturopathIds.push(user.uid)
            listNaturopath.push(user)
          }
        })
        this.setState({ isLoading: true, listNaturopath, listNaturopathIds }, () => {
          this._getGroupChannel()
          this.setState({ isLoading: false })
        })
      })
      .catch(error => {
        console.log(error.message)
      })
  }
  createGroupChannel(userIds, isDistinct, name, coverUrl, data, customType) {
    const self = this
    this.sendbirdAction.createGroupChannel(userIds, isDistinct, name, coverUrl, data, customType)
      .then(groupChannel => {
        self.setState({ isFetching: true, groupChannel }, () => {
          //self._sendMessageFirstMeseeage(groupChannel)
          self.setState({ isFetching: false })
        })
      })
      .catch(error => {
        console.log(error.message)
      })
  }
  _getGroupChannel() {
    this.sendbirdAction.getGroupChannel('sendbird_group_channel_72066048_2c3236f0c31f88a504ceab07d59961be7faaa02a')
      .then(groupChannel => {
        console.log('// Successfully fetched the channel.', groupChannel)
      })
      .catch(error => {
        console.log(error.message)
      })
  }
  _goBack() {
    if (this.props.navigation.state.params.updateData) {
      this.props.navigation.state.params.updateData()
    }
    this.props.navigation.goBack()
  }
  render() {
    const propsUser = this.props.navigation.state.params.user
    return (
      <Container style={styles.container}>
        <View style={styles.headerContainer} >
          <View style={styles.headerIcon} >
            <TouchableOpacity onPress={() => this._goBack()}>
              <Icon style={styles.icon} name='chevron-left' type="Entypo" />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>{propsUser.nickname}</Text>
        </View>
        <View style={styles.container}>
          {this.state.groupChannel &&
            <RenderChat navigation={this.props.navigation} propsUser={propsUser} channelUrl={this.state.groupChannel.url} isOpenChannel={false} />
          }
        </View>
      </Container >
    )
  }
}

const TEXTCOLOR = '#575757'

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

/*
_getGroupChannelByUserIds ====================== 
 G {
  "_sendMarkAsRead": [Function anonymous],
  "acceptInvitation": [Function anonymous],
  "addMember": [Function anonymous],
  "banUser": [Function anonymous],
  "banUserWithUserId": [Function anonymous],
  "cachedReadReceiptStatus": Object {
    "WQ8pEDSIxPUUCwoWwv5nd8ITerx1": 1537524078725,
    "vNFRKRoW0mUAsmZQNGBQjc6Paex1": 0,
  },
  "channelType": "group",
  "coverUrl": "https://sendbird.com/main/img/cover/cover_08.jpg",
  "createBannedUserListQuery": [Function anonymous],
  "createMemberListQuery": [Function anonymous],
  "createdAt": 1537348879000,
  "customType": "Direct Message",
  "data": "",
  "declineInvitation": [Function anonymous],
  "endTyping": [Function anonymous],
  "fileUploadRequest": Object {},
  "freeze": [Function anonymous],
  "getPushPreference": [Function anonymous],
  "getReadReceipt": [Function anonymous],
  "getReadStatus": [Function anonymous],
  "getTypingMembers": [Function anonymous],
  "hide": [Function anonymous],
  "invalidateTypingStatus": [Function anonymous],
  "invite": [Function anonymous],
  "inviteWithUserIds": [Function anonymous],
  "invitedAt": 1537348879381,
  "inviter": x {
    "_update": [Function anonymous],
    "_updateMetaData": [Function anonymous],
    "connectionStatus": "nonavailable",
    "createMetaData": [Function anonymous],
    "deleteAllMetaData": [Function anonymous],
    "deleteMetaData": [Function anonymous],
    "friendDiscoveryKey": null,
    "friendName": null,
    "getOriginalProfileUrl": [Function anonymous],
    "isActive": true,
    "lastSeenAt": 0,
    "metaData": Object {},
    "nickname": "Phuong Huynh",
    "profileUrl": "https://sendbird.com/main/img/profiles/profile_37_512px.png",
    "serialize": [Function anonymous],
    "updateMetaData": [Function anonymous],
    "userId": "WQ8pEDSIxPUUCwoWwv5nd8ITerx1",
  },
  "isDistinct": true,
  "isEphemeral": false,
  "isFrozen": false,
  "isHidden": false,
  "isPublic": false,
  "isPushEnabled": true,
  "isSuper": false,
  "isTyping": [Function anonymous],
  "join": [Function anonymous],
  "joinedMemberCount": 2,
  "lastMessage": b {
    "_sender": x {
      "_update": [Function anonymous],
      "_updateMetaData": [Function anonymous],
      "connectionStatus": "nonavailable",
      "createMetaData": [Function anonymous],
      "deleteAllMetaData": [Function anonymous],
      "deleteMetaData": [Function anonymous],
      "friendDiscoveryKey": null,
      "friendName": null,
      "getOriginalProfileUrl": [Function anonymous],
      "isActive": true,
      "lastSeenAt": 0,
      "metaData": Object {},
      "nickname": "Philippe Nguyen",
      "profileUrl": "https://sendbird.com/main/img/profiles/profile_22_512px.png",
      "serialize": [Function anonymous],
      "updateMetaData": [Function anonymous],
      "userId": "vNFRKRoW0mUAsmZQNGBQjc6Paex1",
    },
    "channelType": "group",
    "channelUrl": "sendbird_group_channel_72066048_acb256b4338ac9ff3eea64bc1f41e388d68ec48a",
    "createdAt": 1537540577774,
    "customType": "",
    "data": "",
    "mentionType": "users",
    "mentionedUsers": Array [],
    "message": "Hello Phuog. Oi",
    "messageId": 1842795008,
    "messageType": "user",
    "reqId": "",
    "translations": Object {},
    "updatedAt": 0,
  },
  "leave": [Function anonymous],
  "markAsRead": [Function anonymous],
  "memberCount": 2,
  "memberMap": Object {
    "WQ8pEDSIxPUUCwoWwv5nd8ITerx1": K {
      "connectionStatus": "online",
      "friendDiscoveryKey": null,
      "friendName": null,
      "isActive": true,
      "isBlockedByMe": false,
      "isBlockingMe": false,
      "lastSeenAt": 0,
      "metaData": Object {},
      "nickname": "Phuong Huynh",
      "parse": [Function anonymous],
      "profileUrl": "https://sendbird.com/main/img/profiles/profile_37_512px.png",
      "state": "joined",
      "userId": "WQ8pEDSIxPUUCwoWwv5nd8ITerx1",
    },
    "vNFRKRoW0mUAsmZQNGBQjc6Paex1": K {
      "connectionStatus": "offline",
      "friendDiscoveryKey": null,
      "friendName": null,
      "isActive": true,
      "isBlockedByMe": false,
      "isBlockingMe": false,
      "lastSeenAt": 1537541167593,
      "metaData": Object {},
      "nickname": "Philippe Nguyen",
      "parse": [Function anonymous],
      "profileUrl": "https://sendbird.com/main/img/profiles/profile_22_512px.png",
      "state": "joined",
      "userId": "vNFRKRoW0mUAsmZQNGBQjc6Paex1",
    },
  },
  "members": Array [
    K {
      "connectionStatus": "online",
      "friendDiscoveryKey": null,
      "friendName": null,
      "isActive": true,
      "isBlockedByMe": false,
      "isBlockingMe": false,
      "lastSeenAt": 0,
      "metaData": Object {},
      "nickname": "Phuong Huynh",
      "parse": [Function anonymous],
      "profileUrl": "https://sendbird.com/main/img/profiles/profile_37_512px.png",
      "state": "joined",
      "userId": "WQ8pEDSIxPUUCwoWwv5nd8ITerx1",
    },
    K {
      "connectionStatus": "offline",
      "friendDiscoveryKey": null,
      "friendName": null,
      "isActive": true,
      "isBlockedByMe": false,
      "isBlockingMe": false,
      "lastSeenAt": 1537541167593,
      "metaData": Object {},
      "nickname": "Philippe Nguyen",
      "parse": [Function anonymous],
      "profileUrl": "https://sendbird.com/main/img/profiles/profile_22_512px.png",
      "state": "joined",
      "userId": "vNFRKRoW0mUAsmZQNGBQjc6Paex1",
    },
  ],
  "muteUser": [Function anonymous],
  "muteUserWithUserId": [Function anonymous],
  "myCountPreference": "all",
  "myMemberState": "joined",
  "myMutedState": "unmuted",
  "myRole": "none",
  "name": "Direct Message",
  "parse": [Function anonymous],
  "refresh": [Function anonymous],
  "removeMember": [Function anonymous],
  "resetMyHistory": [Function anonymous],
  "setLatestMemberCount": [Function anonymous],
  "setMyCountPreference": [Function anonymous],
  "setPushPreference": [Function anonymous],
  "startTyping": [Function anonymous],
  "unbanUser": [Function anonymous],
  "unbanUserWithUserId": [Function anonymous],
  "unfreeze": [Function anonymous],
  "unmuteUser": [Function anonymous],
  "unmuteUserWithUserId": [Function anonymous],
  "unreadMentionCount": 0,
  "unreadMessageCount": 2,
  "update": [Function anonymous],
  "updateChannel": [Function anonymous],
  "updateJoinedMemberCount": [Function anonymous],
  "updateReadReceipt": [Function anonymous],
  "updateTypingStatus": [Function anonymous],
  "url": "sendbird_group_channel_72066048_acb256b4338ac9ff3eea64bc1f41e388d68ec48a",
}


*/