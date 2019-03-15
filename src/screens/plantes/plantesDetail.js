import React, { Component } from "react"
import { AsyncStorage, View, StyleSheet, ImageBackground, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Container, Content, Header, Button, ListItem, Icon, Left, Right, Thumbnail, Body, Tabs, Fab, Tab, CardItem, Footer } from "native-base"
import PRODUITS from '../../services/produits'
import PlantesStorage from '../../services/plantes'
import ImageStorage from '../../services/images'
import TitleHeader from "../../components/titleHeader"

import SlackChat from "../../components/slackChat"
import firebase from 'firebase'
export default class PlantesDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      favoriteState: []
    }
  }

  componentWillMount() {

    // var plantComment = firebase.database().ref("plant-comment/");
    // plantComment.orderByChild("id").equalTo(1).on("child_added", function (data) {
    //   console.log("Equal to filter: " + data.val().comment);
    // })
  }

  componentDidMount() {
    var plantComment = firebase.database().ref("plant-comment/");
    plantComment.orderByChild("id").equalTo(1).on("child_added", function (data) {
      //console.log("Equal to filter: " + data.val().comment);
    })
    this._getAsyncStorage()
  }

  _getAsyncStorage() {
    AsyncStorage.getItem('FAVORITE', (err, result) => {
      if (result) {
        const favoriteState = JSON.parse(result)
        this.setState({ favoriteState })
      }
    })
  }
  _viewDetail(id) {
    this.props.navigation.navigate('ProductsDetail', { id })
  }

  _renderHigtLight(hightLight) {
    return (
      <View style={[TextStyle.line]}>
        {hightLight.map((content, index) =>
          <Text key={index}>{content}</Text>
        )}
      </View>
    )
  }
  _renderProduitAssocies(produits_associes) {
    if (produits_associes && produits_associes.length > 0) {
      let listProduitAssocies = []
      produits_associes.map((id) => {
        let relatedProduct = PRODUITS.find((produit) => produit.id == id)
        if (relatedProduct != undefined) {
          listProduitAssocies.push(relatedProduct)
        }
      })
      return (
        <View style={[TextStyle.line]}>
          {listProduitAssocies.map((produit, index) =>
            <TouchableOpacity key={index} activeOpacity={0.7} onPress={() => { this._viewDetail(produit.id) }}>
              <View style={[TextStyle.paragraph, { flexDirection: 'row' }]}>
                <View style={{ marginRight: 5 }}>
                  <Thumbnail square size={55} source={ImageStorage.getProduitsImages(produit.id)} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1} note style={{ fontWeight: '600', color: '#85cfcd' }}>{produit.nom}</Text>
                  <Text numberOfLines={1} note>{produit.describe}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      )
    }
    else {
      return <Text style={{ fontSize: 12 }}>Pas de produit associé</Text>
    }
  }
  render() {
    const deviceHeight = Dimensions.get("window").height

    const { navigation } = this.props

    if (navigation.state.params != undefined && navigation.state.params.id != undefined) {
      const propsID = navigation.state.params.id
      const plant = PlantesStorage.find((item) => item.id === propsID)
      const isFavor = this.state.favoriteState.find((id) => id === propsID) ? true : false
      return (
        <Container style={{ backgroundColor: "white" }}>
          <View>
            <ImageBackground style={[StyleSheet.absoluteFill]} source={ImageStorage.getPlantesImages(plant.id)} />
            <Header hasTabs style={{ backgroundColor: 'rgba(0,0,0,0.2)', height: deviceHeight / 3.5 }} >
              <Left style={{ flex: 0.2 }}>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                  <Icon style={headerStyle.icon} name='arrow-back' />
                </Button>
              </Left>
              <Body>
                <Text style={headerStyle.title}>{plant.nom} </Text>
                <Text style={[headerStyle.title, { fontSize: 16, fontStyle: 'italic' }]}>{plant.nom_latin}</Text>
              </Body>
              <Right style={{ flex: 0.2 }} />
            </Header>
          </View>
          <Tabs>
            <Tab heading="Détail">
              <Content padder style={{ backgroundColor: "white", padding: 5 }}>
                {isFavor && <Icon style={{ color: "#F78B32" }} name='favorite' type="MaterialIcons" />}

                <ScrollView style={{ paddingBottom: 80 }}>
                  <View style={TextStyle.paragraph}>
                    <Text style={[TextStyle.paragraph]}><Text style={[{ fontWeight: '600' }]}>Nom latin : </Text>{plant.nom_latin}</Text>
                    <Text style={[TextStyle.paragraph]}><Text style={[{ fontWeight: '600' }]}>Nom commun : </Text>{plant.nom_commun}</Text>
                    <Text style={[TextStyle.paragraph]}><Text style={[{ fontWeight: '600' }]}>Famille : </Text>{plant.famille}</Text>
                    <Text style={[TextStyle.paragraph]}><Text style={[{ fontWeight: '600' }]}>Drogue : </Text>{plant.drogue}</Text>
                  </View>
                  <View style={TextStyle.paragraph}>
                    <Text style={[TextStyle.line, { fontWeight: '600', color: "#85cdb4" }]}>Description botanique</Text>
                    {this._renderHigtLight(plant.description_botanique)}
                  </View>
                  <View style={TextStyle.paragraph}>
                    <Text style={[TextStyle.line, { fontWeight: '600', color: "#85cdb4" }]}>Principaux constituants</Text>
                    {this._renderHigtLight(plant.principaux_constituants)}
                  </View>
                  <View style={TextStyle.paragraph}>
                    <Text style={[TextStyle.line, { fontWeight: '600', color: "#85cdb4" }]}>Principaux effets</Text>
                    {this._renderHigtLight(plant.principaux_effets)}
                  </View>
                  <View style={TextStyle.paragraph}>
                    <Text style={[TextStyle.line, { fontWeight: '600', color: "#85cdb4" }]}>Précautions d’emploi</Text>
                    {this._renderHigtLight(plant.precautions_demploi)}
                  </View>
                  <View style={TextStyle.paragraph}>
                    <Text style={[TextStyle.paragraph, { fontWeight: '600', color: "#85cdb4" }]}>Produits associés</Text>
                    {this._renderProduitAssocies(plant.produits_associes)}
                  </View>
                </ScrollView>
              </Content>
            </Tab>
            <Tab heading="Discussion">
              <SlackChat {...this.props} />
            </Tab>
          </Tabs>
          <Fab direction="up" containerStyle={{}} style={{ backgroundColor: "#92C7A9" }} position="bottomRight" onPress={() => alert("La fonction n'a pas été activée.")} >
            <Icon name="edit" type="Entypo" style={{ color: "#fff", fontSize: 26, width: 30 }} />
          </Fab>
        </Container>
      )
    }
    else {
      return (
        <Container style={{ backgroundColor: "#92C7A9" }}>
          <TitleHeader title={this.props.titleHeader} navigation={this.props.navigation} iconMenu={'close'} />
          <Content padder style={{ backgroundColor: "#f1f2f7" }}>
            <Text>Plante non trouvé</Text>
            <Button onPress={() => this.props.navigation.goBack()}>Retour</Button>
          </Content>
        </Container >
      )
    }
  }
}

const headerStyle = StyleSheet.create({
  title: { color: "#FFF", fontSize: 36, fontWeight: '300' },
  icon: { color: "#fff", fontSize: 30 }
})

const TextStyle = StyleSheet.create({
  paragraph: {
    marginBottom: 8
  },
  line: {
    marginBottom: 5
  },
  headLine: {
    color: "#92C7A9",
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center'
  }
})