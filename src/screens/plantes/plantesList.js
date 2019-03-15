import React, { Component } from "react"
import { AsyncStorage, Dimensions, View, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { Container, Content, Button, Icon, Text } from "native-base"
import TitleHeader from "../../components/titleHeader"
import Store from '../../services/store'
export default class PlantesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      widget: { show: false, display: 'none' },
      sortPlantes: { byCommon: true, byAtoZ: true },
      sortByFavorite: false,
      isFetching: true,
      favoriteState: [],
      plantesState: []
    }
    this.listPrimary = []
  }
  async componentWillMount() {
    const plantesState = await Store.getPlantesList()
    this.listPrimary = plantesState
    this.setState({ plantesState }, () => {
      this._getAsyncStorage()
    })
  }
  _setAsyncStorage() {
    const FAVORITE = []
    AsyncStorage.setItem('FAVORITE', JSON.stringify(FAVORITE), () => {
      this._getAsyncStorage()
    })
  }
  _getAsyncStorage() {
    AsyncStorage.getItem('FAVORITE', (err, result) => {
      if (result) {
        const favoriteState = JSON.parse(result)
        this.setState({ favoriteState }, () => {
          this._favoriteChange()
        })
      }
      else {
        this._setAsyncStorage()
      }
    })
  }
  _updateAsyncStorage(listItem) {
    AsyncStorage.clear(() => {
      AsyncStorage.setItem('FAVORITE', JSON.stringify(listItem), () => {
        this._getAsyncStorage()
      })
    })
  }
  _favoriteChange() {
    let favoriteState = this.state.favoriteState
    let plantesState = this.state.plantesState
    plantesState.map((plante) => {
      plante.isFavor = favoriteState.find((id) => plante.id === id) ? true : false
      plante.favorite = favoriteState.find((id) => plante.id === id) ? 'favorite' : 'favorite-border'
    })
    this.setState({
      isFetching: true,
      plantesState
    }, () => {
      this.setState({ isFetching: false })
    })
  }
  _callToFavoriteChange(item) {
    let favoriteState = this.state.favoriteState
    var index = favoriteState.indexOf(item.id)
    if (item.isFavor && index > -1) {
      favoriteState.splice(index, 1)
    }
    else {
      favoriteState.push(item.id)
    }
    this._updateAsyncStorage(favoriteState)
  }
  _sortChange(nom) {
    const sortPlantes = this.state.sortPlantes
    let plantesState = this.state.plantesState
    if (nom == 'Commun' && sortPlantes.byCommon == true || nom == 'Latin' && sortPlantes.byCommon == false) {
      sortPlantes.byAtoZ = !sortPlantes.byAtoZ
      if (sortPlantes.byAtoZ == true) {
        plantesState.sort((a, b) => a.nom > b.nom ? -1 : 1)
      }
      else {
        plantesState.sort((a, b) => a.nom < b.nom ? -1 : 1)
      }
    }
    else if (nom == 'Commun' && sortPlantes.byCommon == false) {
      sortPlantes.byCommon = !sortPlantes.byCommon
    }
    else if (nom == 'Latin' && sortPlantes.byCommon == true) {
      sortPlantes.byCommon = !sortPlantes.byCommon
    }
    plantesState.map((plante) => {
      plante.nom = sortPlantes.byCommon == true ? plante.nom_common : plante.nom_latin
    })
    this.setState({
      isFetching: true,
      sortPlantes,
      plantesState
    }, () => {
      this.setState({ isFetching: false })
    })
  }
  _filterByFavorite() {
    let sortByFavorite = !this.state.sortByFavorite
    this.setState({ sortByFavorite })
  }
  _slideDown() {
    const widget = this.state.widget
    widget.show = !widget.show
    widget.display = widget.show == true ? 'flex' : 'none'
    this.setState({ widget })
  }
  render() {
    const cssSortBox = { display: this.state.widget.display }
    const byCommonActive = this.state.sortPlantes.byCommon == true ? cssSort.active : ''
    const byLatinActive = this.state.sortPlantes.byCommon == false ? cssSort.active : ''
    const sortIcon = this.state.sortPlantes.byAtoZ == true ? 'md-arrow-down' : 'md-arrow-up'
    const byFavorite = this.state.sortByFavorite ? 'favorite' : 'favorite-border'

    return (
      <Container style={{ backgroundColor: "#f1f2f7" }}>
        <TitleHeader navigation={this.props.navigation} title={"Liste des plantes"} />
        <View style={cssWidget.block} >
          <Button style={[css.boxShadow, cssWidget.button]} onPress={() => this._slideDown()}>
            <Icon style={cssWidget.icon} name="filter" type="FontAwesome" />
          </Button>
          <Button style={[css.boxShadow, cssWidget.button]} onPress={() => this._filterByFavorite()}>
            <Icon style={cssWidget.icon} name={byFavorite} type="MaterialIcons" />
          </Button>
          <Button style={[css.boxShadow, cssWidget.button]} onPress={() => this._onPress("SymptomList")}>
            <Icon style={cssWidget.icon} name="user-md" type="FontAwesome" />
          </Button>
          <Button style={[css.boxShadow, cssWidget.button]} onPress={() => this._onPress("Scanner")}>
            <Icon style={cssWidget.icon} name="md-barcode" />
          </Button>
        </View>
        <Animated.View style={[css.boxMgn, cssSort.block, cssSortBox]}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this._sortChange('Commun')}>
            <Text style={[cssSort.button, byCommonActive]}>Nom Commun</Text>
            {this.state.sortPlantes.byCommon == true && (
              <Icon style={[cssSort.button, cssSort.icon, byCommonActive]} name={sortIcon} />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this._sortChange('Latin')}>
            <Text style={[cssSort.button, byLatinActive]}>Nom Latin</Text>
            {this.state.sortPlantes.byCommon == false && (
              <Icon style={[cssSort.button, cssSort.icon, byLatinActive]} name={sortIcon} />
            )}
          </TouchableOpacity>
        </Animated.View>
        <Content>
          <View style={cssPlante.block}>
            {!this.state.isFetching && this._RenderListPlantes()}
          </View>
        </Content>
      </Container >
    )
  }
  _RenderListPlantes() {
    let rederList = this.state.plantesState.map((plante, index) => {
      const favorite = plante.isFavor ? 'favorite' : 'favorite-border'
      if (this.state.sortByFavorite && plante.isFavor) {
        return (
          <View key={index} style={cssPlante.listItem}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => { this._viewDetail(plante.id) }}>
              <View style={[css.boxShadow]} >
                <Image style={cssPlante.img} source={plante.img} />
              </View>
              <Text numberOfLines={1} style={cssPlante.nom}>{plante.nom}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={cssPlante.favor} onPress={() => { this._callToFavoriteChange(plante) }}>
              <Icon style={cssPlante.favorIcon} name={favorite} type='MaterialIcons' />
            </TouchableOpacity>
          </View>
        )
      }
      else if (!this.state.sortByFavorite) {
        return (
          <View key={index} style={cssPlante.listItem}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => { this._viewDetail(plante.id) }}>
              <View style={[css.boxShadow]} >
                <Image style={cssPlante.img} source={plante.img} />
              </View>
              <Text numberOfLines={1} style={cssPlante.nom}>{plante.nom}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={cssPlante.favor} onPress={() => { this._callToFavoriteChange(plante) }}>
              <Icon style={cssPlante.favorIcon} name={favorite} type='MaterialIcons' />
            </TouchableOpacity>
          </View>
        )
      }
    })
    return rederList
  }
  _onPress(id) {
    this.props.navigation.navigate(id)
  }
  _viewDetail(id) {
    this.props.navigation.navigate('PlantesDetail', { id })
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
    flexBasis: '24%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  icon: {
    color: "#92C7A9",
    padding: 0
  }
})
