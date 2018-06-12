import React, { Component } from "react"
import { View, Image } from 'react-native'
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, Card, CardItem } from "native-base"
import styles from "../styles"

const products = [
  { name: "Cassis feuilles", price: "11,41", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/cassis-bio.png") },
  { name: "Jus d'Argousier", price: "12,47", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Aloé Vera Sève", price: "14,67", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/aloe-vera-seve-bio.jpg") },
  { name: "Achillée millefeuille", price: "14,67", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/achillee-millefeuille-bio.jpg") },
  { name: "Artichaut", price: "10,37", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/artichaut-bio.jpg") },
  { name: "Armoise", price: "12,47", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/armoise-bio.jpg") },
  { name: "Aubier de Tilleul", price: "12,47", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/aubier-de-tilleul-bio.jpg") },
  { name: "Sève de Bouleau", price: "16,76", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/seve-de-bouleau-bio.jpg") },
  { name: "Bruyère", price: "13,52", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/bruyere-bio.jpg") },
  { name: "Chardon Marie Semence", price: "11,41", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/chardon-marie-bio.jpg") },
  { name: "Cranberry Canneberge fruit", price: "12,47", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/cranberry-canneberge-bio.jpg") },
  { name: "Desmodium", price: "12,47", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/desmodium-bio.jpg") },
  { name: "Valériane racine", price: "14,65", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Fumeterre", price: "12,47", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Radis Noir racines", price: "11,41", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Ginkgo Biloba feuilles", price: "12,47", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Pissenlit racine", price: "13,52", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Harpagophytum", price: "12,47", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Olivier feuilles", price: "12,47", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Millepertuis Plante entière", price: "14,17", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Marron d'Inde fruit", price: "11,41", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Pavot de Californie Plante entière flecodee", price: "14,65", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Mélisse feuilles", price: "13,52", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Reine des Prés", price: "12,47", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Vigne Rouge feuilles", price: "11,41", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Serpolet Plante entière", price: "13,52", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Mauve Plante entière flecodee", price: "13,52", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Echinacée Plante entière flecodee", price: "15,23", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Sarriette feuilles", price: "14,65", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Prèle des Champs", price: "12,47", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Ortie piquante Plante entière", price: "12,47", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Lotier corniculé Plante entière", price: "14,65", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Tanaisie Plante entière", price: "12,47", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Aloe Vera Mucilage", price: "14,67", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Myrtille feuilles", price: "13,52", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Menthe poivrée Plante entière", price: "12,47", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Menthe Nanah feuilles", price: "12,47", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") },
  { name: "Romarin feuilles", price: "11,41", pack: "20 ampoules de 15 ml", box: "300 ml", code: require("../../../assets/products/argousier-bio.jpg") }
]
export default class ProductsDetail extends Component {

  render() {
    return (
      <Container style={{ backgroundColor: "#f1f2f7" }}>
        <Header style={{ backgroundColor: "#92C7A9" }} >
          <Left style={{ flex: 0.2, zIndex: 9999 }}>
            <Button transparent onPress={() => this.props.navigation.openDrawer()} >
              <Icon style={{ color: "#fff", fontSize: 30 }} name="menu" type="Entypo" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#FFF", fontSize: 20, fontWeight: "700" }}>Liste Des Products</Title>
          </Body>
          <Right style={{ flex: 0.2 }} />
        </Header>
        <Content padder>
          {
            products.map(({ code, name, pack, box }, index) => {
              return (
                <Card key={index}>
                  <CardItem>
                    <Image style={{ width: 120, height: 200, zIndex: 999 }} source={code} />
                    <View style={{ flex: 1 }}>
                      <View style={styles.flag}>
                        <Text numberOfLines={1} style={{ color: '#fff', fontWeight: '700' }}>{name}</Text>
                        <Text numberOfLines={1} style={{ color: '#fff', fontSize: 13 }}>{pack}</Text>
                        <Text numberOfLines={1} style={{ color: '#fff', fontSize: 13 }}>Boîte complète: {box}</Text>
                        <View style={styles.flagBottom} />
                      </View>
                      <View style={{ paddingLeft: 10 }}>
                        <Text style={{ color: '#7ABC9D' }}>Ingrédients :</Text>
                        <Text style={{ fontSize: 13 }}>Extrait de racine de valériane Bio* 100%. Convient aux Vegans *100% des ingrédients agricoles sont issus de l’Agriculture Biologique.</Text>
                      </View>
                    </View>
                  </CardItem>
                </Card>
              )
            })
          }
        </Content>
      </Container >
    )
  }
}
