import SendBird from 'sendbird'
import { SendBird_API } from './config'

const isNull = value => {
  try {
    return value === null;
  } catch (e) {
    return false;
  }
};

function getSum(total, num) {
  return total + num;
}

let instance = null

class SendBirdAction {
  constructor() {
    if (instance) {
      return instance
    }
    this.sb = new SendBird({ appId: SendBird_API })
    this.userQuery = null
    this.openChannelQuery = null
    this.groupChannelQuery = null
    this.previousMessageQuery = null
    this.participantQuery = null
    this.blockedQuery = null
    instance = this
  }

  /**
   * Connect
   */
  connect(userId, nickname) {
    return new Promise((resolve, reject) => {
      const sb = SendBird.getInstance()
      sb.connect(userId, (user, error) => {
        if (error) {
          reject(error)
        } else {
          sb.updateCurrentUserInfo(decodeURIComponent(nickname), null, (user, error) => {
            error ? reject(error) : resolve(user)
          })
        }
      })
    })
  }
  updateCurrentUserInfo(nickname = null, profileUrl = null) {
    return new Promise((resolve, reject) => {
      this.sb.updateCurrentUserInfo(nickname, profileUrl, (response, error) => {
        error ? reject(error) : resolve(response)
      })
    })
  }


  disconnect() {
    return new Promise((resolve, reject) => {
      this.sb.disconnect((response, error) => {
        error ? reject(error) : resolve(true)
      })
    })
  }

  /**
   * User
   */
  getCurrentUser() {
    //console.log('this.sb.currentUser',this.sb.currentUser)
    return this.sb.currentUser
  }

  isCurrentUser(user) {
    return user.userId === this.sb.currentUser.userId
  }

  getUserList(isInit = false) {
    if (isInit || isNull(this.userQuery)) {
      this.userQuery = new this.sb.createUserListQuery()
      this.userQuery.limit = 30
    }
    return new Promise((resolve, reject) => {
      if (this.userQuery.hasNext) {
        this.userQuery.next((list, error) => {
          error ? reject(error) : resolve(list)
        })
      } else {
        resolve([])
      }
    })
  }

  getBlockedList(isInit = false) {
    if (isInit || isNull(this.blockedQuery)) {
      this.blockedQuery = this.sb.createBlockedUserListQuery()
      this.blockedQuery.limit = 30
    }
    return new Promise((resolve, reject) => {
      if (this.blockedQuery.hasNext && !this.blockedQuery.isLoading) {
        this.blockedQuery.next((blockedList, error) => {
          error ? reject(error) : resolve(blockedList)
        })
      } else {
        resolve([])
      }
    })
  }

  blockUser(user, isBlock = true) {
    return new Promise((resolve, reject) => {
      if (isBlock) {
        this.sb.blockUser(user, (response, error) => {
          error ? reject(error) : resolve()
        })
      } else {
        this.sb.unblockUser(user, (response, error) => {
          error ? reject(error) : resolve()
        })
      }
    })
  }

  /**
   * Channel
   */
  getChannel(channelUrl, isOpenChannel) {
    return new Promise((resolve, reject) => {
      if (isOpenChannel) {
        this.sb.OpenChannel.getChannel(channelUrl, (openChannel, error) => {
          if (error) {
            reject(error)
          }
          else {
            openChannel.enter(function (response, error) {
              resolve(openChannel)
            })
          }
          //error ? reject(error) : resolve(openChannel)
        })
      } else {
        this.sb.GroupChannel.getChannel(channelUrl, (groupChannel, error) => {
          error ? reject(error) : resolve(groupChannel)
        })
      }
    })
  }

  /**
   * Open Channel
   */
  getOpenChannelList(isInit = false) {
    if (isInit || isNull(this.openChannelQuery)) {
      this.openChannelQuery = new this.sb.OpenChannel.createOpenChannelListQuery()
      this.openChannelQuery.limit = 50
    }
    return new Promise((resolve, reject) => {
      if (this.openChannelQuery.hasNext && !this.openChannelQuery.isLoading) {
        this.openChannelQuery.next((list, error) => {
          error ? reject(error) : resolve(list)
        })
      } else {
        resolve([])
      }
    })
  }

  createOpenChannel(channelName) {
    return new Promise((resolve, reject) => {
      channelName
        ? this.sb.OpenChannel.createChannel(channelName, null, null, (openChannel, error) => {
          error ? reject(error) : resolve(openChannel)
        })
        : this.sb.OpenChannel.createChannel((openChannel, error) => {
          error ? reject(error) : resolve(openChannel)
        })
    })
  }

  enter(channelUrl) {
    return new Promise((resolve, reject) => {
      this.sb.OpenChannel.getChannel(channelUrl, (openChannel, error) => {
        if (error) {
          reject(error)
        } else {
          openChannel.enter((response, error) => {
            error ? reject(error) : resolve()
          })
        }
      })
    })
  }

  exit(channelUrl) {
    return new Promise((resolve, reject) => {
      this.sb.OpenChannel.getChannel(channelUrl, (openChannel, error) => {
        if (error) {
          reject(error)
        } else {
          openChannel.exit((response, error) => {
            error ? reject(error) : resolve()
          })
        }
      })
    })
  }

  getParticipantList(channelUrl, isInit = false) {
    return new Promise((resolve, reject) => {
      this.sb.OpenChannel.getChannel(channelUrl, (openChannel, error) => {
        if (error) {
          reject(error)
        } else {
          if (isInit || isNull(this.participantQuery)) {
            this.participantQuery = openChannel.createParticipantListQuery()
            this.participantQuery.limit = 30
          }
          if (this.participantQuery.hasNext && !this.participantQuery.isLoading) {
            this.participantQuery.next((participantList, error) => {
              error ? reject(error) : resolve(participantList)
            })
          } else {
            resolve([])
          }
        }
      })
    })
  }

  /**
   * Group Channel
   */


  getGroupChannelByUserIds(userIds) {
    const channelListQuery = new this.sb.GroupChannel.createMyGroupChannelListQuery()
    channelListQuery.userIdsFilter = userIds
    return new Promise((resolve, reject) => {
      if (channelListQuery.hasNext) {
        channelListQuery.next(function (groupList, error) {
          if (error) {
            reject(error)
          }
          else {
            let groupChannel
            groupList.forEach((group) => {
              if (group.isDistinct && group.customType === 'Direct Message') {
                groupChannel = group
              }
            })
            resolve(groupChannel)
          }
        })
      }

      // if (isInit || isNull(this.groupChannelQuery)) {
      //   this.groupChannelQuery = new this.sb.GroupChannel.createMyGroupChannelListQuery()
      //   this.groupChannelQuery.limit = 50
      //   this.groupChannelQuery.includeEmpty = false
      //   this.groupChannelQuery.order = 'latest_last_message'
      //   this.groupChannelQuery.userIdsFilter = userIds

      //   console.log('this.groupChannelQuery.userIdsFilter', this.groupChannelQuery.userIdsFilter)
      // }

      // if (this.groupChannelQuery.hasNext && !this.groupChannelQuery.isLoading) {
      //   this.groupChannelQuery.next((groupList, error) => {
      //     if (groupList) {
      //       console.log('============================ groupList', groupList)
      //       groupList.forEach((group) => {
      //         if (group.isDistinct) {
      //           const membersList = []
      //           group.members.forEach(member => {
      //             membersList.push(member.nickname)
      //           })
      //           console.log('============================', group.memberCount, group.customType, membersList)
      //         }
      //       })
      //     }
      //     error ? reject(error) : resolve(groupList)
      //   })
      // } else {
      //   resolve([])
      // }
    })
  }

  getTotalUnreadMessageCount() {
    return new Promise((resolve, reject) => {
      this.sb.GroupChannel.getTotalUnreadMessageCount(function (count, error) {
        if (error) {
          reject(error)
        }
        resolve(count)
      })

    })
  }
  getGroupChannelList(isInit = false) {
    if (isInit || isNull(this.groupChannelQuery)) {
      this.groupChannelQuery = new this.sb.GroupChannel.createMyGroupChannelListQuery()
      this.groupChannelQuery.limit = 5
      this.groupChannelQuery.includeEmpty = false
      this.groupChannelQuery.order = 'latest_last_message'
    }
    return new Promise((resolve, reject) => {
      if (this.groupChannelQuery.hasNext && !this.groupChannelQuery.isLoading) {
        this.groupChannelQuery.next((list, error) => {
          error ? reject(error) : resolve(list)
        })
      } else {
        resolve([])
      }
    })
  }

  // createGroupChannel(userIds) {
  //   return new Promise((resolve, reject) => {
  //     let params = new this.sb.GroupChannelParams();
  //     params.addUserIds(userIds);
  //     this.sb.GroupChannel.createChannel(params, (groupChannel, error) => {
  //       error ? reject(error) : resolve(groupChannel);
  //     });
  //   });
  // }

  createGroupChannel(userIds, isDistinct, name, coverUrl, data, customType) {
    return new Promise((resolve, reject) => {
      /*
      createChannelWithUserIds(
        userIds: Array<string>,
        isDistinct: boolean,
        name: string,
        coverUrlOrImageFile: string | File,
        data: string,
        customType: string,
        callback: groupChannelCallback
      ): void;
      */
      this.sb.GroupChannel.createChannelWithUserIds(userIds, isDistinct, name, coverUrl, data, customType,
        function (createdChannel, error) {
          error ? reject(error) : resolve(createdChannel)
        });
    })
  }

  getGroupChannel(channelUrl) {
    return new Promise((resolve, reject) => {
      this.sb.GroupChannel.getChannel(channelUrl, function (channel, error) {
        //Successfully fetched the channel.
        //console.log(channel)
        error ? reject(error) : resolve(channel)
      });
    })
  }
  inviteGroupChannel(channelUrl, userIds) {
    return new Promise((resolve, reject) => {
      this.sb.GroupChannel.getChannel(channelUrl, (groupChannel, error) => {
        if (error) {
          reject(error)
        } else {
          groupChannel.inviteWithUserIds(userIds, (groupChannel, error) => {
            error ? reject(error) : resolve(groupChannel)
          })
        }
      })
    })
  }

  leave(channelUrl) {
    return new Promise((resolve, reject) => {
      this.sb.GroupChannel.getChannel(channelUrl, (groupChannel, error) => {
        if (error) {
          reject(error)
        } else {
          groupChannel.leave((response, error) => {
            error ? reject(error) : resolve()
          })
        }
      })
    })
  }

  hide(channelUrl) {
    return new Promise((resolve, reject) => {
      this.sb.GroupChannel.getChannel(channelUrl, (groupChannel, error) => {
        if (error) {
          reject(error)
        } else {
          groupChannel.hide((response, error) => {
            error ? reject(error) : resolve()
          })
        }
      })
    })
  }

  markAsRead(channel) {
    channel.markAsRead()
  }

  /**
   * Message
   */
  getMessageList(channel, isInit = false) {
    if (isInit || isNull(this.previousMessageQuery)) {
      this.previousMessageQuery = channel.createPreviousMessageListQuery()
    }
    return new Promise((resolve, reject) => {
      if (this.previousMessageQuery.hasMore && !this.previousMessageQuery.isLoading) {
        this.previousMessageQuery.load(50, false, (messageList, error) => {
          error ? reject(error) : resolve(messageList)
        })
      } else {
        resolve([])
      }
    })
  }

  getReadReceipt(channel, message) {
    if (this.isCurrentUser(message.sender)) {
      return channel.getReadReceipt(message)
    } else {
      return 0
    }
  }

  sendUserMessage({ channel, message, handler }) {
    return channel.sendUserMessage(message, (message, error) => {
      if (handler) handler(message, error)
    })
  }

  sendFileMessage({ channel, file, handler }) {
    return channel.sendFileMessage(file, (message, error) => {
      if (handler) handler(message, error)
    })
  }

  deleteMessage({ channel, message }) {
    return new Promise((resolve, reject) => {
      if (!this.isCurrentUser(message.sender)) {
        reject({ message: 'You have not ownership in this message.' })
      }
      channel.deleteMessage(message, (response, error) => {
        error ? reject(error) : resolve(response)
      })
    })
  }

  static getInstance() {
    return new SendBirdAction()
  }
}

export { SendBirdAction }
