import React, { Component } from "react"
import { View, StyleSheet } from 'react-native'
import { Button, Icon } from "native-base"

export default class WidgetBlock extends Component {

  render() {
    const screen = this.props.navigation.state.routeName === "PlantesList" ? "PlantesFavorite" : "PlantesList"
    return (
      <View style={styles.widgetBlock} >
        <Button style={[styles.boxShadow, styles.widgetButton]} onPress={() => this.props.navigation.navigate("SearchFilter")}>
          <Icon style={styles.widgetIcons} name="filter" type="FontAwesome" />
        </Button>
        <Button style={[styles.boxShadow, styles.widgetButton]} onPress={() => this.props.navigation.navigate(screen)}>
          <Icon style={styles.widgetIcons} name="star" type="FontAwesome" />
        </Button>
        <Button style={[styles.boxShadow, styles.widgetButton]} onPress={() => this.props.navigation.navigate("SearchFilter")}>
          <Icon style={styles.widgetIcons} name="user-md" type="FontAwesome" />
        </Button>
        <Button style={[styles.boxShadow, styles.widgetButton]} onPress={() => this.props.navigation.navigate("Scanner")}>
          <Icon style={styles.widgetIcons} name="barcode-scan" type="MaterialCommunityIcons" />
        </Button>
        {/* <Button style={[styles.boxShadow, styles.widgetButton]} onPress={() => this.props.navigation.navigate("CheckIn")}>
          <Icon style={styles.widgetIcons} name="user-md" type="FontAwesome" />
        </Button> */}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  boxShadow: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    paddingBottom: 5
  },
  widgetBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  widgetButton: {
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderRadius: 5,
    borderWidth: 0.5,
    flexBasis: '24%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  widgetIcons: {
    color: "#92C7A9",
    padding: 0
  }
})

