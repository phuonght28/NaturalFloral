import SendBird from 'sendbird';
import { uuid4 } from './utils';

let instance = null;

class SendBirdChatEvent {
  constructor() {
    if (instance) {
      return instance;
    }

    this.sb = SendBird.getInstance();
    this.key = uuid4();
    this._createChannelHandler();

    this.onMessageReceived = null;
    this.onMessageUpdated = null;
    this.onMessageDeleted = null;

    this.onReadReceiptUpdated = null;
    this.onTypingStatusUpdated = null;
    instance = this;
  }

  /**
   * Channel Handler
   */
  _createChannelHandler() {
    console.log('SendBirdChatEvent/_createChannelHandler')

    const handler = new this.sb.ChannelHandler();
    handler.onMessageReceived = (channel, message) => {
      console.log('SendBirdChatEvent/handler.onMessageReceived', message._sender.nickname, message.message)

      if (this.onMessageReceived) {
        this.onMessageReceived(channel, message);
      }
    };
    handler.onMessageUpdated = (channel, message) => {
      if (this.onMessageUpdated) {
        this.onMessageUpdated(channel, message);
      }
    };
    handler.onMessageDeleted = (channel, messageId) => {
      if (this.onMessageDeleted) {
        this.onMessageDeleted(channel, messageId);
      }
    };

    handler.onReadReceiptUpdated = groupChannel => {
      if (this.onReadReceiptUpdated) {
        this.onReadReceiptUpdated(groupChannel);
      }
    };
    handler.onTypingStatusUpdated = groupChannel => {
      if (this.onTypingStatusUpdated) {
        this.onTypingStatusUpdated(groupChannel);
      }
    };
    this.sb.addChannelHandler(this.key, handler);
  }

  remove() {
    this.sb.removeChannelHandler(this.key);
  }
  static getInstance() {
    return new SendBirdChatEvent();
  }
}

export { SendBirdChatEvent };


/*
this.onReadReceiptUpdated G {
  "_sendMarkAsRead": [Function anonymous],
  "acceptInvitation": [Function anonymous],
  "addMember": [Function anonymous],
  "banUser": [Function anonymous],
  "banUserWithUserId": [Function anonymous],
  "cachedReadReceiptStatus": Object {
    "WQ8pEDSIxPUUCwoWwv5nd8ITerx1": 1537545987262,
    "x2Z949IXlDMRI6frLlGMg3W8owr2": 1537546006113,
  },
  "channelType": "group",
  "coverUrl": "https://sendbird.com/main/img/cover/cover_02.jpg",
  "createBannedUserListQuery": [Function anonymous],
  "createMemberListQuery": [Function anonymous],
  "createdAt": 1537347023000,
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
  "invitedAt": 1537347023620,
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
      "nickname": "PhuongAmagumo",
      "profileUrl": "https://sendbird.com/main/img/profiles/profile_14_512px.png",
      "serialize": [Function anonymous],
      "updateMetaData": [Function anonymous],
      "userId": "x2Z949IXlDMRI6frLlGMg3W8owr2",
    },
    "channelType": "group",
    "channelUrl": "sendbird_group_channel_72066048_d9f24b3f5e53943a50b619c836d68170ef4a57b4",
    "createdAt": 1537545998989,
    "customType": "",
    "data": "",
    "mentionType": "users",
    "mentionedUsers": Array [],
    "message": "dsadsadsa",
    "messageId": 1843008233,
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
    "x2Z949IXlDMRI6frLlGMg3W8owr2": K {
      "connectionStatus": "online",
      "friendDiscoveryKey": null,
      "friendName": null,
      "isActive": true,
      "isBlockedByMe": false,
      "isBlockingMe": false,
      "lastSeenAt": 0,
      "metaData": Object {},
      "nickname": "PhuongAmagumo",
      "parse": [Function anonymous],
      "profileUrl": "https://sendbird.com/main/img/profiles/profile_14_512px.png",
      "state": "joined",
      "userId": "x2Z949IXlDMRI6frLlGMg3W8owr2",
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
      "connectionStatus": "online",
      "friendDiscoveryKey": null,
      "friendName": null,
      "isActive": true,
      "isBlockedByMe": false,
      "isBlockingMe": false,
      "lastSeenAt": 0,
      "metaData": Object {},
      "nickname": "PhuongAmagumo",
      "parse": [Function anonymous],
      "profileUrl": "https://sendbird.com/main/img/profiles/profile_14_512px.png",
      "state": "joined",
      "userId": "x2Z949IXlDMRI6frLlGMg3W8owr2",
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
  "unreadMessageCount": 1,
  "update": [Function anonymous],
  "updateChannel": [Function anonymous],
  "updateJoinedMemberCount": [Function anonymous],
  "updateReadReceipt": [Function anonymous],
  "updateTypingStatus": [Function anonymous],
  "url": "sendbird_group_channel_72066048_d9f24b3f5e53943a50b619c836d68170ef4a57b4",
}

*/