import React, { Component } from "react"
import { StyleSheet, ScrollView } from "react-native"
import { View, Text, ListItem, Icon } from "native-base"
import ROUTE from '../services/parsers/route'
const activeColor = "#1FB5AD"
const offColor = "#AAB2BD"
const SideBarBG = '#28282e'

export default class SideBar extends Component {
  _navigation = (router) => {
    this.props.navigation.navigate(router)
  }
  render() {
    return (
      <View style={styles.SideBar} >
        <ScrollView>
          {ROUTE.map((data, index) => (
            <ListItem key={index} noBorder button style={styles.listItem} onPress={() => this._navigation(data.route)} >
              <Icon style={{ color: data.status == 'active' ? activeColor : offColor, fontSize: 20 }} name={data.icon} type={data.iconType} active />
              <Text style={[styles.text, { color: data.status == 'active' ? activeColor : offColor }]}>{data.title}</Text>
            </ListItem>
          ))}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  SideBar: {
    backgroundColor: SideBarBG,
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    paddingTop: 50
  },
  listItem: {
    backgroundColor: SideBarBG,
    marginLeft: 0,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    borderBottomWidth: 1,
    paddingRight: 0,

  },
  text: {
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 5
  }
})


