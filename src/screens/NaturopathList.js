import React, { Component } from "react"
import { AsyncStorage, Dimensions, StyleSheet, View, Image, TouchableOpacity, Animated, ActivityIndicator } from 'react-native'
import { Container, Content, Button, Icon, Text } from "native-base"
import { Common, StyleWidget, styleHeader, styleUserPhoto, LANGUAGE } from "../constants/common";

import UserTag from '../constants/UserTag'
import TITLE from '../components/titleHeader'
import { SendBirdAction } from '../services/SendBirdAction'
import { Auth } from '../services/Firebase/Auth'

import { sortByStatus, isEmpty, removeCurrentUser } from '../services/config'

export default class NaturopathList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      isSigned: false,
      slideDown: false,
      sortByFavori: false,
      sortByAtoZ: true,
      sortBy: 'connectionStatus'
    }
    this.Authentication = Auth.getInstance()
    this.sendbirdAction = SendBirdAction.getInstance()
    this.channel = null
  }

  componentWillMount() {
    this._checkConnection()
  }
  _checkConnection = () => {
    return new Promise(async () => {
      const isSigned = await this.Authentication._isSinged()
      if (isSigned) {
        this._getFirebaseUserList()
        // this._getUserList()
      }
      else {
        this.props.navigation.navigate('Connection')
      }
    })
  }
  _getUserList = async () => {
    Promise.all([
      await this.Authentication.getUserList()
        .catch(error => { return { error: error } })
        .then((firebaseUsers) => {
          if (!isEmpty(firebaseUsers)) {
            const userFirebase = this.Authentication.getCurrentUser()
            firebaseUsers = removeCurrentUser(firebaseUsers, userFirebase)
            return { firebaseUsers }
          }
        }),
      await this.sendbirdAction.getUserList(true)
        .catch(error => { return { error: error } })
        .then(sendbirdUsers => {
          if (!isEmpty(sendbirdUsers)) {
            const userSendbird = this.sendbirdAction.getCurrentUser()
            sendbirdUsers = removeCurrentUser(sendbirdUsers, userSendbird)
            return { sendbirdUsers }
          }
        }),
    ]).then(data => {
      data.forEach((doc) => {
        if (doc.error) {
          //console.log(doc.error)
          this.setState({ error: doc.error })
        }
        else {
          firebaseUsers.forEach((userFb) => {
            const usersb = sendbirdUsers.find((user) => user.userId === userFb.uid)
            userFb.connectionStatus = usersb.connectionStatus
            userFb.lastSeenAt = usersb.lastSeenAt
            userFb.photoURL = usersb.profileUrl
          })

        }
      })
    })
  }
  _getFirebaseUserList() {
    this.Authentication.getUserList()
      .catch(error => { this.setState({ error }) })
      .then((firebaseUsers) => {
        if (!isEmpty(firebaseUsers)) {
          const userFirebase = this.Authentication.getCurrentUser()
          firebaseUsers = removeCurrentUser(firebaseUsers, userFirebase)
          // firebaseUsers.sort(function (vote1, vote2) {
          //   if (vote1.displayName > vote2.displayName) return 1;
          //   if (vote1.displayName < vote2.displayName) return -1;
          // })
          this.setState({ firebaseUsers }, () => {
            this._getSendBirdUserList(firebaseUsers)
          })
        }
      })
  }
  _getSendBirdUserList(firebaseUsers) {
    this.sendbirdAction.getUserList(true)
      .catch(error => { this.setState({ error }) })
      //.catch(error => { console.log('getUserList error.message:', error.message) })
      .then(sendbirdUsers => {
        if (!isEmpty(sendbirdUsers)) {
          const userSendbird = this.sendbirdAction.getCurrentUser()
          sendbirdUsers = removeCurrentUser(sendbirdUsers, userSendbird)
          // sendbirdUsers.sort(function (vote1, vote2) {
          //   if (vote1.displayName > vote2.displayName) return 1;
          //   if (vote1.displayName < vote2.displayName) return -1;
          // })
          this._merUserList(firebaseUsers, sendbirdUsers)
        }
      })
    // .then(userList => {
    //   if (!isEmpty(userList)) {
    //     const userSendbird = this.sendbirdAction.getCurrentUser()
    //     userList = removeCurrentUser(userList, userSendbird)
    //     userList = sortByStatus(userList)
    //     const participantList = userList
    //     this.setState({ isFetching: true, participantList }, () => {
    //       this.setState({ isFetching: false })
    //     })
    //   }
    // })
  }
  _merUserList = (firebaseUsers, sendbirdUsers) => {
    firebaseUsers.forEach((userFb, index1) => {
      sendbirdUsers.find((userSb, index2) => {
        if (userFb.uid === userSb.userId) {
          userFb.connectionStatus = userSb.connectionStatus
          userFb.lastSeenAt = userSb.lastSeenAt
          userFb.photoURL = userSb.profileUrl
          userFb.profileUrl = userSb.profileUrl
          userFb.nickname = userSb.nickname
          userFb.userId = userSb.userId
        }
      })
    })
    // firebaseUsers = sortByStatus(firebaseUsers)
    // firebaseUsers = this._sortByNom(firebaseUsers)
    const participantList = this._sortByNom(firebaseUsers)
    this.setState({ isFetching: true, participantList }, () => {
      this.setState({ isFetching: false })
    })
  }
  _sortByNom = (_list, _sortby1 = 'connectionStatus', _sortby2 = 'displayName') => {
    _list.sort((vote1, vote2) => {
      if (vote1[_sortby1] > vote2[_sortby1]) return -1
      if (vote1[_sortby1] < vote2[_sortby1]) return 1
      if (vote1[_sortby2] > vote2[_sortby2]) return 1
      if (vote1[_sortby2] < vote2[_sortby2]) return -1
    })
    return _list
  }
  _sortOnce = (_list, _sortby1 = 'displayName') => {
    _list.sort((vote1, vote2) => {
      if (vote1[_sortby1] < vote2[_sortby1]) return -1
      if (vote1[_sortby1] > vote2[_sortby1]) return 1
    })
    return _list
  }
  _sortChange(newSortBy) {
    let { sortBy, sortByAtoZ, participantList } = this.state
    console.log('sortByAtoZ', sortByAtoZ)
    if (sortBy == newSortBy) {
      sortByAtoZ = !sortByAtoZ

      console.log('sortByAtoZ', sortByAtoZ)
      sortByAtoZ == true ? participantList.sort((a, b) => a[newSortBy] < b[newSortBy] ? -1 : 1)
        : participantList.sort((a, b) => a[newSortBy] > b[newSortBy] ? -1 : 1)
      // if (sortByAtoZ == true) {
      //   participantList.sort((a, b) => a[sortBy] < b[sortBy] ? -1 : 1)
      // }
      // else {
      //   participantList.sort((a, b) => a[sortBy] > b[sortBy] ? -1 : 1)
      // }
    }
    else if (sortBy != newSortBy) {
      sortBy = newSortBy
      sortByAtoZ = true
      participantList = this._sortOnce(participantList, sortBy)
    }

    console.log('sortByAtoZ', sortByAtoZ)
    this.setState({ isFetching: true, sortBy, sortByAtoZ, participantList }, () => {
      this.setState({ isFetching: false })
    })
  }
  _onUserPress(user) {
    const routeName = this.props.navigation.state.routeName
    const item = { 'user': user, 'routeName': routeName }
    // this.props.navigation.navigate('GroupChannel', item)
    this.props.navigation.navigate('NaturopathProfile', item)
  }
  _slideDown() {
    let slideDown = this.state.slideDown
    slideDown = !slideDown
    this.setState({ slideDown })
  }
  _onPress(id) {
    this.props.navigation.navigate(id)
  }
  render() {
    const { slideDown, sortByFavori, sortByAtoZ, sortBy } = this.state
    const sortIcon = sortByAtoZ ? 'md-arrow-down' : 'md-arrow-up'
    // const cssSlideDown = !slideDown ? 'none' : 'flex'
    /**  */
    const cssSlideDown = slideDown ? 'flex' : 'none'
    const iconHeart = sortByFavori ? 'star' : 'star-o'
    return (
      <Container style={styles.container}>
        <TITLE navigation={this.props.navigation} title={this.props.title} />
        <View style={StyleWidget.block} >
          <Button style={[Common.boxShadow, StyleWidget.button]} onPress={() => this._slideDown()}>
            <Icon style={StyleWidget.icon} type="FontAwesome" name="filter" />
          </Button>
          <Button style={[Common.boxShadow, StyleWidget.button]} >
            <Icon style={[StyleWidget.icon, { color: 'grey' }]} type="FontAwesome" name={iconHeart} />
          </Button>
          <Button style={[Common.boxShadow, StyleWidget.button]} >
            <Icon style={[StyleWidget.icon, { color: 'grey' }]} type="FontAwesome" name="user-md" />
          </Button>
          <Button style={[Common.boxShadow, StyleWidget.button]} onPress={() => this._onPress("Discussion")}>
            <Icon style={StyleWidget.icon} type="MaterialIcons" name="forum" />
          </Button>
        </View>
        <Animated.View style={[StyleWidget.blockSort, { display: cssSlideDown, marginLeft: 10, marginRight: 10, marginBottom: 10, }]}>
          <TouchableOpacity style={[StyleWidget.buttonSort]} onPress={() => this._sortChange('connectionStatus')}>
            {sortBy == 'connectionStatus' ?
              <View style={{ flexDirection: 'row' }}>
                <Text style={[StyleWidget.textSort, StyleWidget.activeSort]}>{'Statut'}</Text>
                <Icon style={[StyleWidget.textSort, StyleWidget.iconSort, StyleWidget.activeSort]} name={sortIcon} />
              </View>
              : <Text style={[StyleWidget.textSort]}>{'Statut'}</Text>
            }
          </TouchableOpacity>
          <TouchableOpacity style={StyleWidget.buttonSort} onPress={() => this._sortChange('displayName')}>
            {sortBy == 'displayName' ?
              <View style={{ flexDirection: 'row' }}>
                <Text style={[StyleWidget.textSort, StyleWidget.activeSort]}>{LANGUAGE.Last}</Text>
                <Icon style={[StyleWidget.textSort, StyleWidget.iconSort, StyleWidget.activeSort]} name={sortIcon} />
              </View>
              : <Text style={[StyleWidget.textSort]}>{LANGUAGE.Last}</Text>
            }
          </TouchableOpacity>
          <TouchableOpacity style={StyleWidget.buttonSort} onPress={() => this._sortChange('ville')}>
            {sortBy == 'ville' ?
              <View style={{ flexDirection: 'row' }}>
                <Text style={[StyleWidget.textSort, StyleWidget.activeSort]}>{LANGUAGE.City}</Text>
                <Icon style={[StyleWidget.textSort, StyleWidget.iconSort, StyleWidget.activeSort]} name={sortIcon} />
              </View>
              : <Text style={[StyleWidget.textSort]}>{LANGUAGE.City}</Text>
            }
          </TouchableOpacity>
        </Animated.View>
        <Content>
          <View style={[styles.block]}>
            {!this.state.isFetching &&
              !this.state.participantList ? <ActivityIndicator size={'large'} style={{ alignSelf: 'center' }} /> :
              this.state.participantList.map((user, index) =>
                <TouchableOpacity key={index} onPress={() => this._onUserPress(user)}><UserTag user={user} /></TouchableOpacity>
              )
            }
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1E2D6',
  },
  block: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
})
