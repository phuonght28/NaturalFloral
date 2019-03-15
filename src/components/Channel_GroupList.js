import React, { Component } from "react"
import LANGUAGE from '../constants/LanguageFrench'
import { H1, IconNotificaton, ChatTime, CoverImage } from '../constants/StyledText'

import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Image, FlatList } from 'react-native'
import { Text, Icon } from "native-base"
import { timestampToTime, uuid4 } from '../services/SendBird/utils'
import SendBird from 'sendbird'
import { SendBirdAction } from '../services/SendBirdAction'
export default class GroupChannels extends Component {
  constructor(props) {
    super(props)
    this.currentUser = SendBirdAction.getInstance().getCurrentUser()
    this.sb = SendBird.getInstance()
    this.key = uuid4()
  }

  updateData = () => {
    this.props.onRefesh()
  }
  _onOpenChannelPress = (propsUser) => {
    this.props.navigation.navigate("GroupChannel", { user: propsUser, updateData: this.updateData })
  }
  _renderItem = ({ item }) => {
    const isNew = item.unreadMessageCount > 0 ? '600' : '300'
    return (
      <TouchableOpacity style={styles.button} onPress={() => this._onOpenChannelPress(item.propsUser)}>
        <View style={{ flexDirection: 'row', marginBottom: 10, flex: 1 }}>
          <View style={{ flex: 0.1 }}>
            <Image style={styles.cover} source={{ uri: item.coverUrl }} />
          </View>
          <View style={{ flex: 0.7 }}>
            <Text numberOfLines={1} style={styles.title}>{item.name}</Text>
            <Text numberOfLines={1} style={[styles.text, { fontWeight: isNew }]}>{item.lastMessage.message}</Text>
          </View>
          <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
            <ChatTime>{timestampToTime(item.lastMessage.createdAt)}</ChatTime>
            {item.unreadMessageCount > 0 && <IconNotificaton>{item.unreadMessageCount}</IconNotificaton>}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    const { channels } = this.props
    return (
      <View style={{ margin: 10, flex: 1 }}>
        <H1>{LANGUAGE.Direct_Messages}</H1>
        <FlatList
          style={{ flex: 1 }}
          data={channels}
          renderItem={this._renderItem}
          keyExtractor={({ url }) => url}
        />
      </View>
    )
  }
}
const TEXTCOLOR = '#575757'
const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    marginBottom: 10,

  },
  button: {
    flexDirection: 'row',
  },
  cover: {
    backgroundColor: '#d8dce6',
    width: 28,
    height: 28,
    borderRadius: 14,
    borderColor: '#FFF',
    borderWidth: 0.5,
    marginRight: 8,
  },
  icon: {
    color: TEXTCOLOR,
    fontSize: 16,
    lineHeight: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 16,
    lineHeight: 30,
    color: TEXTCOLOR,
    fontWeight: "500",
    fontFamily: 'HelveticaNeue-Light',
  },
  text: {
    height: 20,
    color: TEXTCOLOR,
    fontSize: 13,
    fontFamily: 'HelveticaNeue-Light',
  },
  time: {
    height: 30,
    lineHeight: 30,
    fontSize: 12,
    textAlign: 'right',
  },

})



// class ListOpenChannels extends Component {
//   constructor(props) {
//     super(props)
//   }

//   render() {
//     const team = this.props.team
//     const teamNameStyle = [styles.teamName]
//     const logoStyle = [styles.teamLogo, this.props.imageStyle]

//     if (this.props.isStat) {
//       teamNameStyle.push(styles.statTeamName)
//       logoStyle.push(styles.teamLogoDark)
//     }

//     return (
//       <Animated.View style={styles.team}>
//         <Animated.Image
//           resizeMode='contain'
//           style={logoStyle}
//           source={{ uri: team.logo }}
//           defaultSource={require('../../resources/images/unknown.png')}
//         />
//         <Text numberOfLines={1} style={teamNameStyle}>{team.name}</Text>
//       </Animated.View>
//     )
//   }
// }


/*


var channels = {
	"banUser": ["Function anonymous"],
	"banUserWithUserId": ["Function anonymous"],
	"channelType": "open",
	"coverUrl": "https://sendbird-upload.s3.amazonaws.com/800349B4-D01F-4C5C-8691-DE9F42288B8D/channels/c2446536e4b21ba2be7c47f6cad0660bcbd3c348.jpg",
	"createBannedUserListQuery": ["Function anonymous"],
	"createMutedUserListQuery": ["Function anonymous"],
	"createParticipantListQuery": ["Function anonymous"],
	"createdAt": 1536583126000,
	"customType": "",
	"data": "",
	"delete": ["Function anonymous"],
	"enter": ["Function anonymous"],
	"exit": ["Function anonymous"],
	"fileUploadRequest": {},
	"isEphemeral": false,
	"isFrozen": false,
	"isOperator": ["Function anonymous"],
	"isOperatorWithUserId": ["Function anonymous"],
	"muteUser": ["Function anonymous"],
	"muteUserWithUserId": ["Function anonymous"],
	"name": "Armoise commune",
	"operators": [],
	"parse": ["Function anonymous"],
	"participantCount": 1,
	"refresh": ["Function anonymous"],
	"unbanUser": ["Function anonymous"],
	"unbanUserWithUserId": ["Function anonymous"],
	"unmuteUser": ["Function anonymous"],
	"unmuteUserWithUserId": ["Function anonymous"],
	"update": ["Function anonymous"],
	"updateChannel": ["Function anonymous"],
	"updateChannelWithOperatorUserIds": ["Function anonymous"],
	"url": "armoisecommune",
}

_getGroupChannelList channel ================================ G {
  "_sendMarkAsRead": [Function anonymous],
  "acceptInvitation": [Function anonymous],
  "addMember": [Function anonymous],
  "banUser": [Function anonymous],
  "banUserWithUserId": [Function anonymous],
  "cachedReadReceiptStatus": Object {
    "WQ8pEDSIxPUUCwoWwv5nd8ITerx1": 0,
    "jXXwmms9e7UbrwayWrcPwVqyhIN2": 1537273639849,
  },
  "channelType": "group",
  "coverUrl": "https://sendbird.com/main/img/cover/cover_02.jpg",
  "createBannedUserListQuery": [Function anonymous],
  "createMemberListQuery": [Function anonymous],
  "createdAt": 1537184691000,
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
  "invitedAt": 1537184691697,
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
    "nickname": "Abctest",
    "profileUrl": "https://sendbird.com/main/img/profiles/profile_25_512px.png",
    "serialize": [Function anonymous],
    "updateMetaData": [Function anonymous],
    "userId": "jXXwmms9e7UbrwayWrcPwVqyhIN2",
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
      "nickname": "Abctest",
      "profileUrl": "https://sendbird.com/main/img/profiles/profile_25_512px.png",
      "serialize": [Function anonymous],
      "updateMetaData": [Function anonymous],
      "userId": "jXXwmms9e7UbrwayWrcPwVqyhIN2",
    },
    "channelType": "group",
    "channelUrl": "sendbird_group_channel_72066048_afeead811be3fa0c6f853e626d8cf7d407bb1ada",
    "createdAt": 1537244908211,
    "customType": "",
    "data": "",
    "mentionType": "users",
    "mentionedUsers": Array [],
    "message": "a",
    "messageId": 1835131426,
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
    "jXXwmms9e7UbrwayWrcPwVqyhIN2": K {
      "connectionStatus": "offline",
      "friendDiscoveryKey": null,
      "friendName": null,
      "isActive": true,
      "isBlockedByMe": false,
      "isBlockingMe": false,
      "lastSeenAt": 1537328202074,
      "metaData": Object {},
      "nickname": "Abctest",
      "parse": [Function anonymous],
      "profileUrl": "https://sendbird.com/main/img/profiles/profile_25_512px.png",
      "state": "joined",
      "userId": "jXXwmms9e7UbrwayWrcPwVqyhIN2",
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
      "lastSeenAt": 1537328202074,
      "metaData": Object {},
      "nickname": "Abctest",
      "parse": [Function anonymous],
      "profileUrl": "https://sendbird.com/main/img/profiles/profile_25_512px.png",
      "state": "joined",
      "userId": "jXXwmms9e7UbrwayWrcPwVqyhIN2",
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
  "unreadMessageCount": 31,
  "update": [Function anonymous],
  "updateChannel": [Function anonymous],
  "updateJoinedMemberCount": [Function anonymous],
  "updateReadReceipt": [Function anonymous],
  "updateTypingStatus": [Function anonymous],
  "url": "sendbird_group_channel_72066048_afeead811be3fa0c6f853e626d8cf7d407bb1ada",
}

*/