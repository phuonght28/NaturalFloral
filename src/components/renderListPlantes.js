import React, { Component } from "react"
import { Dimensions, StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import { Icon } from "native-base"
import ImageStorage from '../services/images'

export default class ListPlantes extends Component {
  _viewDetail(id) {
    this.props.navigation.navigate('PlantesDetail', { id })
  }
  _onStar(item) {
    console.log(item.nom)
  }
  
  render() {
    const { navigation, dataList } = this.props
    //console.log(dataList[0].img)
    return (
      <View style={cssPlante.block}>
        {dataList.map((item, index) =>
          <View key={index} style={cssPlante.listItem}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => { this._viewDetail(item.id) }}>
              <View style={[css.boxShadow]} >
                <Image style={cssPlante.img} source={ImageStorage.getPlantesImages(item.id)} />
              </View>
              <Text numberOfLines={1} style={cssPlante.nom}>{item.nom}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={cssPlante.favor} onPress={() => { this._onStar(item) }}>
              <Icon style={cssPlante.favorIcon} name={item.favorite} type='MaterialIcons' />
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }
}

const ITEM_Margin = 12
const IMAGES_PER_ROW = 2
const WIN_W = Dimensions.get('window').width
const container_W = (WIN_W - ITEM_Margin)
const ITEM_W = container_W / IMAGES_PER_ROW - ITEM_Margin

const cssPlante = StyleSheet.create({
  block: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginLeft: ITEM_Margin,
    marginTop: ITEM_Margin
    //justifyContent: 'space-around'
  },
  listItem: {
    position: 'relative',
    width: ITEM_W,
    marginRight: ITEM_Margin,
    marginBottom: ITEM_Margin,
  },
  img: {
    borderRadius: 8,
    height: 130,
    width: ITEM_W,
  },
  nom: {
    fontSize: 15,
    lineHeight: 22,
    color: '#00a486',
    textAlign: 'center',
    fontFamily: 'Montserrat-LightItalic',
  },
  favor: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 999
  },
  favorIcon: {
    fontSize: 21,
    color: '#F78B32',

  },
})
const css = StyleSheet.create({
  boxMgn: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  favorite: {
    width: 20, height: 20, position: 'absolute', top: 5, right: 5, zIndex: 999
  },
  boxShadow: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    paddingBottom: 5
  },
  favoriteIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 999
  }
})