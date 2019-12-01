import React, { Component } from "react"
import PropTypes from 'prop-types'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import { Container, Content, Card, CardItem } from "native-base"
import TITLE from '../components/titleHeader'
import PRODUITS from '../parsers/produits'
import IMAGES from '../services/images'

export default class ProductsList extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }
  _viewDetail(produit) {
    this.props.navigation.navigate('ProductsDetail', produit)
  }
  render() {
    return (
      <Container style={{ backgroundColor: "#92C7A9" }}>
        <TITLE title={"Liste des produits"} navigation={this.props.navigation} />
        <Content padder style={{ backgroundColor: "#f1f2f7" }}>
          <View>
            {PRODUITS.map((produit, index) => {
              produit.img = IMAGES.getProduitsImages(produit.id)
              const { nom, composition, extrait, img } = produit
              return (
                <Card key={index}>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => { this._viewDetail(produit) }}>
                    <CardItem>
                      <Image resizeMode="contain" style={styles.thumbnail} source={img} />
                      <View style={{ flex: 1 }}>
                        <View style={styles.flag}>
                          <Text numberOfLines={1} style={{ color: '#fff', fontWeight: '700' }}>{nom}</Text>
                          <Text numberOfLines={1} style={{ color: '#fff', fontSize: 13 }}>{composition}</Text>
                          <View style={styles.flagBottom} />
                        </View>
                        {extrait &&
                          <View style={{ paddingLeft: 10 }}>
                            <Text style={{ color: '#7ABC9D' }}>Ingrédients :</Text>
                            <Text style={{ fontSize: 13 }}>{extrait}</Text>
                          </View>
                        }
                      </View>
                    </CardItem>
                  </TouchableOpacity>
                </Card>
              )
            }
            )}
          </View>
        </Content>
      </Container >
    )
  }
}
const styles = StyleSheet.create({
  close: {
    color: 'white',
    alignSelf: 'flex-end'
  },
  flag: {
    backgroundColor: "#96CCAD",
    height: 60,
    marginRight: 20,
    marginBottom: 10,
    marginLeft: -5,
    paddingLeft: 15,
    paddingRight: 10,
    justifyContent: 'center',
    alignSelf: 'flex-start'
  },
  flagBottom: {
    position: 'absolute',
    right: -15,
    bottom: 0,
    width: 0,
    height: 0,
    borderRightWidth: 15,
    borderRightColor: 'transparent',
    borderTopWidth: 30,
    borderTopColor: '#96CCAD',
    borderBottomWidth: 30,
    borderBottomColor: '#96CCAD'
  },
  thumbnail: { width: 120, height: 200, zIndex: 999, alignSelf: 'flex-start' }
})