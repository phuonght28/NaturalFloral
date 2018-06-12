import React, { Component } from "react"
import { Image } from "react-native"
import { View, Text, List, ListItem, Icon, Left, Right, Badge } from "native-base"
import styles from "./style"

const LOGO = require("../../../assets/logo.jpg")
const datas = [
  {
    name: "Liste des plantes",
    route: "PlantesList",
    icon: "envira",
    iconType: "FontAwesome",
    bg: "#C5F442",
    statusColor: "#1FB5AD"
  },
  {
    name: "Liste des Products",
    route: "ProductsList",
    icon: "ios-medical",
    iconType: "Ionicons",
    bg: "#C5F442",
    statusColor: "#1FB5AD"
  },
  {
    name: "Club Flora",
    route: "Clubflora",
    icon: "forum",
    iconType: "MaterialIcons",
    bg: "#C5F442",
    statusColor: "#aab2bd"
  },
  {
    name: "Trouver un produit autour de moi",
    route: "Productnearme",
    icon: "pin-drop",
    iconType: "MaterialIcons",
    bg: "#C5F442",
    statusColor: "#aab2bd"
  },
  {
    name: "Magasin Bio",
    route: "Shops",
    icon: "store",
    iconType: "MaterialIcons",
    bg: "#C5F442",
    statusColor: "#aab2bd"
  },
  {
    name: "Nature et Progrès",
    route: "Progress",
    icon: "ios-paper-outline",
    iconType: "Ionicons",
    bg: "#C5F442",
    statusColor: "#1FB5AD"
  },
  {
    name: "Aide et Assistance",
    route: "Help",
    icon: "assistant",
    iconType: "MaterialIcons",
    bg: "#C5F442",
    statusColor: "#aab2bd"
  },
  {
    name: "À propos de nous",
    route: "About",
    icon: "info-outline",
    iconType: "MaterialIcons",
    bg: "#C5F442",
    statusColor: "#1FB5AD"
  },
  {
    name: "Register",
    route: "Register",
    icon: "phone-portrait",
    bg: "#C5F442",
    statusColor: "#1FB5AD"
  },
  {
    name: "Scanner",
    route: "Scanner",
    icon: "barcode-scan",
    iconType: "MaterialCommunityIcons",
    bg: "#C5F442",
    statusColor: "#1FB5AD"
  }
]
class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    }
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', paddingTop: 100, backgroundColor: '#28282e' }} >
        <Image source={LOGO} style={styles.drawerCover} />
        <List dataArray={datas} renderRow={data =>
          <ListItem style={{ backgroundColor: "#28282e", marginLeft: 0, borderBottomColor: 'rgba(255,255,255,0.2)', borderBottomWidth: 0.5 }} button noBorder onPress={() => this.props.navigation.navigate(data.route)} >
            <Left style={{ paddingLeft: 10 }}>
              <Icon active name={data.icon} style={{ color: data.statusColor, fontSize: 20 }} type={data.iconType} />
              <Text style={[styles.text, { color: data.statusColor }]}>{data.name}</Text>
              {/*
              <Icon active name={data.icon} style={{ color: "#1FB5AD", fontSize: 20 }} type={data.iconType} />
              <Text style={[styles.text, { color: "#1FB5AD" }]}>{data.name}</Text>
              */}
            </Left>
            {data.types &&
              <Right style={{ flex: 1 }}>
                <Badge style={{ borderRadius: 3, height: 25, width: 72, backgroundColor: data.bg }} >
                  <Text style={styles.badgeText} >{`${data.types} Types`}</Text>
                </Badge>
              </Right>
            }
          </ListItem>
        }
        />
      </View>
    )
  }
}

export default SideBar


