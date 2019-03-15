import React, { Component } from "react"
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import { Card, CardItem } from "native-base"
import ImageStorage from '../services/images'
import ProduitsStorage from '../services/produits'



export default class ProductsList extends Component {
  _viewDetail(id) {
    this.props.navigation.navigate('ProductsDetail', { id })
  }
  render() {
    return (
      <View>
        {ProduitsStorage.map(({ id, qrCode, nom, extrait, composition }, index) => {
          return (
            <Card key={index}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => { this._viewDetail(id) }}>
                <CardItem>
                  <Image resizeMode="contain" style={{ width: 120, height: 200, zIndex: 999, alignSelf: 'flex-start' }} source={ImageStorage.getProduitsImages(id)} />
                  <View style={{ flex: 1 }}>
                    <View style={styles.flag}>
                      <Text numberOfLines={1} style={{ color: '#fff', fontWeight: '700' }}>{nom}</Text>
                      <Text numberOfLines={1} style={{ color: '#fff', fontSize: 13 }}>{composition}</Text>
                      <View style={styles.flagBottom} />
                    </View>
                    <View style={{ paddingLeft: 10 }}>
                      <Text style={{ color: '#7ABC9D' }}>Ingrédients :</Text>
                      <Text style={{ fontSize: 13 }}>{extrait}</Text>
                    </View>
                  </View>
                </CardItem>
              </TouchableOpacity>
            </Card>
          )
        }
        )}
      </View>
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
  }
})