import React, { Component } from "react"
import { Platform, StatusBar, NativeModules, StyleSheet, View, ListView, Text, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Container, Content, } from "native-base"
const ProduitsStorage = require('../../services/produits.json')

const { StatusBarManager } = NativeModules
let STATUS_BAR_H = 44
export default class SearchKeyWord extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      text: ''
    }
    this.arrayholder = []
  }

  componentDidMount() {

    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(response => STATUS_BAR_H = response.height)
    }
    else {
      STATUS_BAR_H = StatusBar.currentHeight + 6
    }
    // return fetch('../../services/produits.json')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log(responseJson)

    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.setState({
      isLoading: false,
      dataSource: ds.cloneWithRows(ProduitsStorage),
    }, function () {
      // In this block you can do something with new state.
      this.arrayholder = ProduitsStorage
      //console.log(this.state.dataSource)
    })
  }
  _viewDetail(qrCode) {
    this.props.navigation.navigate('ProductsDetail', { qrCode })
  }

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function (item) {
      const itemData = item.nom.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    //console.log('newData', newData)
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
      text: text
    })
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: .5, width: "100%", backgroundColor: "#000", }} />
    )
  }

  render() {
    console.log(this.state.dataSource)
    return (
      <Container style={styles.container}>
        <View style={[styles.headerContainer, { paddingTop: STATUS_BAR_H }]} >
          <View style={styles.headerTitle} >
            <TextInput
              style={styles.searchBar}
              onChangeText={(text) => this.SearchFilterFunction(text)}
              value={this.state.text}
              underlineColorAndroid='transparent'
              placeholder="Entrez les symptômes, les avantages"
            />
          </View>
          <View style={styles.headerMenu} >
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={{ color: '#fff', fontWeight: '600' }}>Retour</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Content padder>
          {this.state.isLoading && <ActivityIndicator />}
          {!this.state.isLoading &&
            <ListView
              dataSource={this.state.dataSource}
              renderSeparator={this.ListViewItemSeparator}
              renderRow={(rowData) => <Text style={styles.rowViewContainer} onPress={this._viewDetail.bind(this, rowData.qrCode)} >{rowData.keyword}</Text>}
              enableEmptySections={true}
              style={{ marginTop: 10, marginBottom: 10 }}
            />
          }
        </Content>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rowViewContainer: {
    fontSize: 17,
    padding: 10
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    borderColor: '#629478',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    padding: 5,
    margin: 5
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: "#92C7A9",
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: STATUS_BAR_H,
    paddingBottom: 6,
  },
  headerMenu: {
    flex: 0.2,
    alignSelf: "center",

  },
  headerTitle: {
    flex: 0.8
  },
  icon: { color: "#fff", fontSize: 30 }
})
