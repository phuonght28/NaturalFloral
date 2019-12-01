import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from "react-native"
import { Icon } from "native-base"
import { STATUS_BAR_Height } from '../constants/Layout'
const STATUS_BAR_H = STATUS_BAR_Height()
export default class TitleHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customScreen: ''
    }
  }
  _onPress() {
    if (this.props.iconMenu == 'goBack' || this.props.iconMenu == 'close') {
      if (this.props.customScreen == '' || this.props.customScreen == undefined) {
        this.props.navigation.goBack()
      } else {
        this.props.navigation.navigate(this.props.customScreen)
      }
    }
    else {
      this.props.navigation.openDrawer()
    }
  }

  render() {
    const iconMenu = this.props.iconMenu == 'goBack' ?
      <Icon style={styles.icon} name='chevron-left' type="Entypo" />
      : <Icon style={styles.icon} name='navicon' type="EvilIcons" />
    return (
      <View>
        <View style={styles.headerContainer} >
          <View style={styles.headerIcon} >
            {this.props.iconMenu != 'close' &&
              <TouchableOpacity onPress={() => this._onPress()}>{iconMenu}</TouchableOpacity>
            }
          </View>
          <Text style={styles.headerTitle}>{this.props.title}</Text>
          <View style={styles.headerIcon} >
            {this.props.iconMenu && this.props.iconMenu == 'close' &&
              <TouchableOpacity onPress={() => this._onPress()}>
                <Icon style={[styles.icon, { alignSelf: "flex-end" }]} name={this.props.iconMenu} type="EvilIcons" />
              </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    )
  }
}

export { TitleHeader };

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: "#92C7A9",
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 8,
    paddingTop: STATUS_BAR_H,
    //height: Platform.OS === "ios" ? 64 : 56,
  },
  headerIcon: {
    flex: 0.2,
    alignSelf: 'flex-end'
  },
  headerTitle: {
    flex: 0.6,
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    alignSelf: "center",
    fontFamily: 'HelveticaNeue-Light'
  },
  icon: { color: "#fff", fontSize: 30 }
})

