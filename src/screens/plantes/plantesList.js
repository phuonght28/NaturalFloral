import React, { Component } from "react"
import { View, Image } from 'react-native'
import GridView from 'react-native-super-grid'
import { Container, Header, Title, Content, Button, Icon, Left, Right, Thumbnail, Body, Text } from "native-base"
import styles from "./styles"

const items = [
  { name: 'Achillea millefolium', isStar: true, code: require("../../../assets/plant/achilleamillefolium.png") },
  { name: 'Aloe vera barbadensis', isStar: false, code: require("../../../assets/plant/aloeverabarbadensis.png") },
  { name: 'Elaeagnus rhamnoides', isStar: false, code: require("../../../assets/plant/elaeagnusrhamnoides.png") },
  { name: 'Cynara slolymus', isStar: true, code: require("../../../assets/plant/cynaraslolymus.png") },
  { name: 'Artemisia vulgarisa', isStar: true, code: require("../../../assets/plant/artemisiavulgarisa.png") },
  { name: 'Tilia cordata', isStar: false, code: require("../../../assets/plant/tiliacordata.png") },
  { name: 'Betula pendula roth', isStar: false, code: require("../../../assets/plant/betulapendularoth.png") },
  { name: 'Calluna vulgaris', isStar: true, code: require("../../../assets/plant/callunavulgaris.png") },
  { name: 'Ribes nigrum', isStar: false, code: require("../../../assets/plant/ribesnigrum.png") },
  { name: 'Silybum marianum', isStar: false, code: require("../../../assets/plant/silybummarianum.png") },
  { name: 'Vaccinium oxycoccus', isStar: true, code: require("../../../assets/plant/vacciniumoxycoccus.png") },
  { name: 'Desmodium', isStar: true, code: require("../../../assets/plant/desmodium.png") },
  { name: 'Aloe vera barbadensis', isStar: false, code: require("../../../assets/plant/aloeverabarbadensis.png") },
  { name: 'Elaeagnus rhamnoides', isStar: false, code: require("../../../assets/plant/elaeagnusrhamnoides.png") },
  { name: 'Cynara slolymus', isStar: true, code: require("../../../assets/plant/cynaraslolymus.png") },
  { name: 'Artemisia vulgarisa', isStar: true, code: require("../../../assets/plant/artemisiavulgarisa.png") },
  { name: 'Tilia cordata', isStar: false, code: require("../../../assets/plant/tiliacordata.png") },
  { name: 'Betula pendula roth', isStar: false, code: require("../../../assets/plant/betulapendularoth.png") },
  { name: 'Calluna vulgaris', isStar: true, code: require("../../../assets/plant/callunavulgaris.png") },
  { name: 'Ribes nigrum', isStar: false, code: require("../../../assets/plant/ribesnigrum.png") },
  { name: 'Silybum marianum', isStar: false, code: require("../../../assets/plant/silybummarianum.png") },
  { name: 'Vaccinium oxycoccus', isStar: true, code: require("../../../assets/plant/vacciniumoxycoccus.png") },
  { name: 'Desmodium', isStar: true, code: require("../../../assets/plant/desmodium.png") }
]

export default class PlantesList extends Component {

  _showListStar() {

  }
  render() {
    return (
      <Container style={{ backgroundColor: "#f1f2f7" }}>
        <Header style={{ backgroundColor: "#92C7A9" }} >
          <Left style={{ flex: 0.2 }}>
            <Button transparent onPress={() => this.props.navigation.openDrawer()} >
              <Icon style={{ color: "#fff", fontSize: 30 }} name="menu" type="Entypo" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#FFF", fontSize: 20, fontWeight: "700" }}>Liste Des Plantes</Title>
          </Body>
          <Right style={{ flex: 0.2 }} />
        </Header>
        <Content>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, paddingBottom: 0 }} >
            <Button style={[styles.boxShadow, styles.widgetButton]} onPress={() => this.props.navigation.navigate("Filter")}>
              <Icon style={styles.widgetIcons} name="filter" type="FontAwesome" />
            </Button>
            <Button style={[styles.boxShadow, styles.widgetButton]} onPress={() => this.props.navigation.navigate("Liststar")}>
              <Icon style={styles.widgetIcons} name="star" type="FontAwesome" />
            </Button>
            <Button style={[styles.boxShadow, styles.widgetButton]} onPress={() => this.props.navigation.navigate("Comment")}>
              <Icon style={styles.widgetIcons} name="comments" type="FontAwesome" />
            </Button>
            <Button style={[styles.boxShadow, styles.widgetButton]} onPress={() => this.props.navigation.navigate("User")}>
              <Icon style={styles.widgetIcons} name="user-circle" type="FontAwesome" />
            </Button>
            <Button style={[styles.boxShadow, styles.widgetButton]} onPress={() => this.props.navigation.navigate("Scanner")}>
              <Icon style={styles.widgetIcons} name="barcode-scan" type="MaterialCommunityIcons" />
            </Button>
          </View>
          <GridView
            itemDimension={130}
            items={items}
            style={styles.gridView}
            renderItem={item => (
              <View style={{ flex: 1 }}>
                <View style={[{ position: 'relative', marginBottom: 5 }, styles.boxShadow]} >
                  {item.isStar && <Image style={{ width: 20, height: 20, position: 'absolute', top: 5, right: 5, zIndex: 999 }} resizeMode="contain" source={require("../../../assets/icon-favorite.png")} />}
                  <Image style={{ borderRadius: 8, height: 130, width: null, flex: 1 }} source={item.code} />
                </View>
                <Text numberOfLines={1} style={styles.itemName} onPress={() => this.props.navigation.navigate("PlantesDetail")}>{item.name}</Text>
              </View>
            )}
          />
        </Content>
      </Container >
    )
  }
}
