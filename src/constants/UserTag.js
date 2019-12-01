import Colors from './Colors';
import React, { Component } from "react"
import { Dimensions, StyleSheet, View, Image } from 'react-native'
import { Text, Icon } from "native-base"
import moment from 'moment'
const { isBlank, isEmpty } = require('../services/config')
import LANGUAGE from "../constants/LanguageFrench"


export default class UserTag extends Component {
  render() {
    const { user } = this.props
    const userSkills = user.skills
    const userStatus = user.connectionStatus === "online" ? Colors.online : Colors.offline
    const profileUrl = { uri: user.profileUrl }
    return (
      <View style={styles.tag} >
        <View style={[styles.item, { minHeight: 130 }]} onLayout={(event) => {
          var { x, y, width, height } = event.nativeEvent.layout;
          console.log(user.displayName, height)
        }}
        >
          <View style={styles.itemRow}>
            <View style={{ flex: 0.4 }}>
              <View style={styles.cover} >
                <Icon style={[styles.status, { color: userStatus }]} name={'circle'} type="FontAwesome" />
                <Image style={[styles.coverImg, { width: '100%', height: '100%' }]} source={profileUrl} />
              </View>
            </View>
            <View style={{ flex: 0.6, paddingLeft: 10, paddingRight: 10 }}>
              <Text style={[styles.text, { fontSize: 15 }]}>{user.displayName}</Text>
              {/* {user.lastname && user.lastname ?
                <View>
                  <Text style={[styles.text, { fontSize: 15 }]}>{user.lastname}</Text>
                  <Text style={[styles.text, { fontSize: 15 }]}>{user.firstname}</Text>
                </View>
                : <Text style={[styles.text, { fontSize: 15 }]}>{user.displayName}</Text>
              } */}
            </View>
          </View>
          {(!isEmpty(user.ville) || !isEmpty(user.pays) || !isEmpty(user.postalcode)) &&
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 10, paddingRight: 10 }}>
              {!isEmpty(user.postalcode) &&
                <View style={{ marginRight: 5, flexDirection: 'row' }}>
                  <Icon style={styles.text} name={'location-pin'} type="Entypo" />
                  <Text style={styles.text}>{user.postalcode}</Text>
                </View>
              }
              {!isEmpty(user.ville) && <Text style={[styles.text, { paddingRight: 5 }]}>{user.ville}</Text>}
              {!isEmpty(user.pays) && <Text style={[styles.text, { paddingRight: 5 }]}>{user.pays}</Text>}
            </View>
          }
          {/* {!isEmpty(user.pays) &&
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 10, paddingRight: 10 }}>
              <Text style={styles.text}>{user.pays}</Text>
            </View>
          } */}
          <View style={{ flexDirection: 'row', padding: 5 }}>
            {/* {!isEmpty(userSkills) &&
              userSkills.map((item, index) =>
                <View key={index} style={{ backgroundColor: Colors.prime, borderRadius: 2, paddingLeft: 5, paddingRight: 5, margin: 4 }}>
                  <Text style={[styles.text, { color: '#fff', fontSize: 14 }]}>{item.skillName}</Text>
                </View>
              )} */}
            {/* {!isEmpty(userSkills) && (
              userSkills.length == 1 ?
                userSkills.map((item, index) =>
                  <View key={index} style={{ backgroundColor: Colors.prime, borderRadius: 2, paddingLeft: 5, paddingRight: 5, flex: 0.5, marginLeft: 5, marginRight: 5 }}>
                    <Text style={[styles.text, { color: '#fff', fontSize: 14, textAlign: 'center' }]} numberOfLines={1} >{item.skillName}</Text>
                  </View>
                )
                :
                userSkills.length > 1 ?
                  [0, 1].map((index) =>
                    <View key={index} style={{ backgroundColor: Colors.prime, borderRadius: 2, paddingLeft: 5, paddingRight: 5, flex: 0.5, marginLeft: 5, marginRight: 5 }}>
                      <Text style={[styles.text, { color: '#fff', fontSize: 14, textAlign: 'center' }]} numberOfLines={1}>{userSkills[index].skillName}</Text>
                    </View>
                  )
                  :
                  <View key={index} style={{ paddingLeft: 5, paddingRight: 5, flex: 0.5, marginLeft: 5, marginRight: 5 }}>
                    <Text style={styles.text} numberOfLines={1}></Text>
                  </View>
            )}
             */}
            {!isEmpty(user.specialties) && (
              user.specialties.length == 1 ?
                user.specialties.map((item, index) =>
                  <View key={index} style={{ backgroundColor: Colors.prime, borderRadius: 2, paddingLeft: 5, paddingRight: 5, flex: 0.5, marginLeft: 5, marginRight: 5 }}>
                    <Text style={[styles.text, { color: '#fff', fontSize: 14, textAlign: 'center' }]} numberOfLines={1} >{item}</Text>
                  </View>
                )
                :
                user.specialties.length > 1 ?
                  [0, 1].map((index) =>
                    <View key={index} style={{ backgroundColor: Colors.prime, borderRadius: 2, paddingLeft: 5, paddingRight: 5, flex: 0.5, marginLeft: 5, marginRight: 5 }}>
                      <Text style={[styles.text, { color: '#fff', fontSize: 14, textAlign: 'center' }]} numberOfLines={1}>{user.specialties[index]}</Text>
                    </View>
                  )
                  :
                  <View key={index} style={{ paddingLeft: 5, paddingRight: 5, flex: 0.5, marginLeft: 5, marginRight: 5 }}>
                    <Text style={styles.text} numberOfLines={1}></Text>
                  </View>
            )}
          </View>
        </View>
      </View>
    )
  }
}


const WIN_W = Dimensions.get('window').width
const IMAGES_PER_ROW = 2

// const ITEM_Margin = 15
// const container_W = (WIN_W - ITEM_Margin)
// const ITEM_W = container_W / IMAGES_PER_ROW - ITEM_Margin

const ITEM_Margin = 5
const ITEM_Padding = 10

const Tag_Width = WIN_W / IMAGES_PER_ROW
const ITEM_W = Tag_Width - (ITEM_Padding * 2)

const styles = StyleSheet.create({
  tag: {
    width: Tag_Width,
    paddingTop: ITEM_Padding,
    paddingLeft: ITEM_Padding,
    paddingRight: ITEM_Padding,
    paddingBottom: ITEM_Padding,
  },
  item: {
    backgroundColor: '#FFF',
    width: ITEM_W,
    //height: ITEM_W,
    shadowColor: '#000',
    shadowOpacity: 0.7, shadowRadius: 2,
    shadowOffset: { height: 1, width: 0 },
    elevation: 5,
    borderRadius: 5,
    paddingBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    //height: ITEM_W * 0.4
  },
  icon: {
    color: '#72B048',
    fontSize: 12,
    lineHeight: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    lineHeight: 20,
    color: Colors.text,
    fontFamily: 'HelveticaNeue-Light',
    fontSize: 13,
  },
  cover: {
    backgroundColor: '#cccccc',
    borderRightColor: 'grey',
    borderRightWidth: 0.5,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    borderTopStartRadius: 5,
    borderTopLeftRadius: 5,
    overflow: 'hidden',
    position: 'relative',
    height: ITEM_W * 0.4
  },
  coverImg: {
    width: '100%',
    height: '100%',
    borderTopStartRadius: 5,
    borderTopLeftRadius: 5,
  },
  status: {
    position: 'absolute',
    top: 3,
    left: 3,
    color: 'grey',
    fontSize: 12,
    zIndex: 1
  },
  online: {
    color: '#72B048',
  }
})
