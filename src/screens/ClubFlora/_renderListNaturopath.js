import React, { Component } from "react"
import { StyleSheet, FlatList, ActivityIndicator, Text, View, Animated, TouchableOpacity, Image } from 'react-native'
import { Icon } from "native-base"
import { Authentication } from '../../services/Authentication'
import IMAGES from '../../services/images'

export default class ListNaturopath extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: true }
    this.Authentication = Authentication.getInstance()
  }
  componentWillMount() {
    this.Authentication.getUserList()
      .then((listUsers) => {
        const listNaturopath = []
        listUsers.map((user) => {
          if (user.isNaturopath) {
            listNaturopath.push(user)
          }
        })
        this.setState({ isLoading: true, listNaturopath }, () => {
          this.setState({ isLoading: false })
        })
      })
      .catch(error => {
        console.log(error.message)
      })
  }
  
  _openGroupChannel() {
    this.props.navigation.navigate('GroupChannel')
  }
  _renderItem = ({ item, index }) => {
    const userName = item.displayName
    const profileUrl = item.photoURL ? { uri: item.profileUrl } : IMAGES.getImages('unknow')
    const userStatus = item.isActive ? 'circle' : 'circle-o'
    return (
      <TouchableOpacity onPress={() => this._openGroupChannel()}>
        <View style={stylesChat.line}>
          <Icon style={stylesChat.icon} name={userStatus} type="FontAwesome" />
          <Image style={stylesChat.cover} source={profileUrl} />
          <Text style={stylesChat.text}>{userName}</Text>
        </View>
      </TouchableOpacity>
    )

  }

  render() {
    return (
      <Animated.View style={styles.container}>
        {this.state.isLoading &&
          <View style={{ flex: 1, padding: 20 }}>
            <ActivityIndicator />
          </View>
        }
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ height: '100%' }}
            data={this.state.listNaturopath}
            renderItem={this._renderItem}
            keyExtractor={({ uid }, index) => uid}
          />
        </View>
      </Animated.View>
    )
  }
}

const TEXTCOLOR = '#575757'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  input: {
    flexDirection: 'row',
    borderBottomColor: 'rgba(0,0,0,0.5)',
    borderBottomWidth: 0.5,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    height: 40,
  },
})

const stylesChat = StyleSheet.create({
  line: {
    flexDirection: 'row',
    marginBottom: 10,

  },
  button: {
    flexDirection: 'row',
  },
  icon: {
    color: '#72B048',
    fontSize: 12,
    lineHeight: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    color: TEXTCOLOR,
    lineHeight: 30,
    fontFamily: 'HelveticaNeue-Light'
  },
  cover: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderColor: '#FFF',
    borderWidth: 1,
    marginRight: 8,
  },
})

