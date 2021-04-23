import React, { Component } from "react"
import { AsyncStorage, Dimensions, StyleSheet, View, Image, TouchableOpacity, Animated, ActivityIndicator } from 'react-native'
import { Container, Content, Button, Icon, Text } from "native-base"
import TITLE from '../../components/titleHeader'
import STORAGE from '../../services/Storage'

export default class PlantesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slideDown: false,
      sortByFavori: false,
      sortByCommon: true,
      sortByAtoZ: false,
      isFetching: true,
      FAVORITE: [],
      plantesList: []
    }
  }
  async componentDidMount() {
    await AsyncStorage.getItem('FAVORITE').then(async (FAVORITE) => {
      FAVORITE = JSON.parse(FAVORITE)
      const plantesList = STORAGE.getPlantesList(FAVORITE)
      this.setState({ isFetching: true, plantesList, FAVORITE }, () => {
        this.setState({ isFetching: false })
      })
    })
  }
  _favoriteChange(item) {
    const { plantesList, FAVORITE } = this.state
    const itemID = item.id
    const index = FAVORITE.indexOf(itemID)
    if (item.favori && index > -1) {
      FAVORITE.splice(index, 1)
    }
    else {
      FAVORITE.push(itemID)
    }
    plantesList.map((plante) => {
      plante.favori = FAVORITE.find((id) => id === plante.id) ? true : false
    })
    this.setState({ isFetching: true, plantesList, FAVORITE }, () => {
      AsyncStorage.setItem('FAVORITE', JSON.stringify(FAVORITE))
      this.setState({ isFetching: false })
    })
  }
  _sortChange(nom) {
    let { sortByCommon, sortByAtoZ, plantesList } = this.state
    if (nom == 'Commun' && sortByCommon == true || nom == 'Latin' && sortByCommon == false) {
      sortByAtoZ = !sortByAtoZ
      if (sortByAtoZ == true) {
        plantesList.sort((a, b) => a.nom > b.nom ? -1 : 1)
      }
      else {
        plantesList.sort((a, b) => a.nom < b.nom ? -1 : 1)
      }
    }
    else if (nom == 'Commun' && sortByCommon == false) {
      sortByCommon = !sortByCommon
    }
    else if (nom == 'Latin' && sortByCommon == true) {
      sortByCommon = !sortByCommon
    }
    plantesList.map((plante) => {
      plante.nom = sortByCommon == true ? plante.nom_common : plante.nom_latin
    })
    this.setState({ isFetching: true, sortByCommon, sortByAtoZ, plantesList }, () => {
      this.setState({ isFetching: false })
    })
  }
  _filterByFavori() {
    let sortByFavori = !this.state.sortByFavori
    this.setState({ sortByFavori })
  }
  _slideDown() {
    let slideDown = this.state.slideDown
    slideDown = !slideDown
    this.setState({ slideDown })
  }
  _RenderListPlantes() {
    const { plantesList, FAVORITE } = this.state
    let renderPlantList = <ActivityIndicator />

    if (FAVORITE == '') {
      renderPlantList = <View><Text>Plante non trouvé</Text></View>
    }
    if (plantesList) {
      renderPlantList = plantesList.map((plante, index) => {
        const iconHeart = plante.favori ? 'star' : 'star-o'
        if (!this.state.sortByFavori) {
          return (
            <View key={index} style={cssPlante.listItem}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => { this._viewDetail(plante.id) }}>
                <View style={[css.boxShadow]} >
                  <Image style={cssPlante.img} source={plante.img} />
                </View>
                <Text numberOfLines={1} style={cssPlante.nom}>{plante.nom}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={cssPlante.favor} onPress={() => { this._favoriteChange(plante) }}>
                <Icon style={cssPlante.favorIcon} type='FontAwesome' name={iconHeart} />
              </TouchableOpacity>
            </View>
          )
        }
        else {
          if (this.state.sortByFavori && plante.favori) {
            return (
              <View key={index} style={cssPlante.listItem}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => { this._viewDetail(plante.id) }}>
                  <View style={[css.boxShadow]} >
                    <Image style={cssPlante.img} source={plante.img} />
                  </View>
                  <Text numberOfLines={1} style={cssPlante.nom}>{plante.nom}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={cssPlante.favor} onPress={() => { this._favoriteChange(plante) }}>
                  <Icon style={cssPlante.favorIcon} type='FontAwesome' name={iconHeart} />
                </TouchableOpacity>
              </View>
            )
          }
        }
      })
    }
    return renderPlantList
  }
  _onPress(id) {
    this.props.navigation.navigate(id)
  }
  _viewDetail(id) {
    this.props.navigation.navigate('PlantesDetail', { id })
  }
  render() {
    const { slideDown, sortByFavori, sortByCommon, sortByAtoZ, isFetching, FAVORITE, plantesList } = this.state
    const byCommonActive = sortByCommon == true ? cssSort.active : ''
    const byLatinActive = sortByCommon == false ? cssSort.active : ''
    const sortIcon = sortByAtoZ ? 'md-arrow-down' : 'md-arrow-up'
    const cssSlideDown = slideDown ? 'flex' : 'none'
    const iconHeart = sortByFavori ? 'star' : 'star-o'
    return (
      <Container style={{ backgroundColor: "#f1f2f7" }}>
        <TITLE {...this.props} navigation={this.props.navigation} title={this.props.title} />
        <View style={cssWidget.block} >
          <Button style={[css.boxShadow, cssWidget.button]} onPress={() => this._slideDown()}>
            <Icon style={cssWidget.icon} type="FontAwesome" name="filter" />
          </Button>
          <Button style={[css.boxShadow, cssWidget.button]} onPress={() => this._filterByFavori()}>
            <Icon style={cssWidget.icon} type="FontAwesome" name={iconHeart} />
          </Button>
          <Button style={[css.boxShadow, cssWidget.button]} onPress={() => this._onPress("SymptomList")}>
            <Icon style={cssWidget.icon} type="FontAwesome" name="user-md" />
          </Button>
        </View>
        <Animated.View style={[css.boxMgn, cssSort.block, { display: cssSlideDown }]}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this._sortChange('Commun')}>
            <Text style={[cssSort.button, byCommonActive]}>Nom Commun</Text>
            {sortByCommon == true && (
              <Icon style={[cssSort.button, cssSort.icon, byCommonActive]} name={sortIcon} />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this._sortChange('Latin')}>
            <Text style={[cssSort.button, byLatinActive]}>Nom Latin</Text>
            {sortByCommon == false && (
              <Icon style={[cssSort.button, cssSort.icon, byLatinActive]} name={sortIcon} />
            )}
          </TouchableOpacity>
        </Animated.View>
        <Content>
          <View style={cssPlante.block}>
            {!isFetching && this._RenderListPlantes()}
          </View>
        </Content>
      </Container >
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
    fontSize: 19,
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
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    paddingBottom: 5,
    elevation: 1,
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

const cssSort = StyleSheet.create({
  block: {
    backgroundColor: '#F6F6F6',
    borderRadius: 5,
    borderColor: '#C9C9C9',
    borderWidth: 0.5,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  button: {
    lineHeight: 30,
    color: "#92C7A9",
    fontSize: 15,
    padding: 5
  },
  icon: {
    fontSize: 20
  },
  active: {
    fontWeight: '700'
  }
})
const cssWidget = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  button: {
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderRadius: 5,
    borderWidth: 0.5,
    flexBasis: '30%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  icon: {
    color: "#92C7A9",
    padding: 0
  }
})
