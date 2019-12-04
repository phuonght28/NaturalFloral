import React, { Component } from "react"
import { Platform, NativeModules, StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Container, Content, Item, Input, Icon } from "native-base"
import SYMPTOM from '../../parsers/symptom'


const { StatusBarManager } = NativeModules
let STATUS_BAR_H = 44
export default class SymptomList extends Component {
  constructor() {
    super()
    this.state = {
      text: '',
      isFetching: true,
      dataSource: []
    }
  }
  _platformStatusBar() {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(response => STATUS_BAR_H = response.height)
    }
    else {
      //STATUS_BAR_H = StatusBar.currentHeight + 6
      STATUS_BAR_H = 6
    }
  }
  componentDidMount() {
    this._platformStatusBar()
    this._clearText()
  }
  _onPress(symptom) {
    this.props.navigation.navigate('SymptomResult', { symptom })
  }

  _searching(text) {
    if (text == '') {
      this._clearText()
    }
    else {
      const dataSource = SYMPTOM.filter((item) => {
        if (!item.isHeader) {
          const itemData = item.text.toLowerCase()
          const textData = text.toLowerCase()
          return itemData.indexOf(textData) > -1
        }
      })
      this.setState({ isFetching: true, text, dataSource }, () => {
        this.setState({ isFetching: false })
      })
    }
  }
  _clearText() {
    this.setState({ isFetching: true, dataSource: SYMPTOM, text: '' }, () => {
      this.setState({ isFetching: false })
    })
  }
  render() {
    const items = this.state.dataSource
    return (
      <Container style={styles.container}>
        <View style={[styles.headerContainer, { paddingTop: STATUS_BAR_H }]} >
          <View style={styles.headerTitle} >
            <Item style={search.searchBar}>
              <Input
                onChangeText={(text) => this._searching(text)}
                value={this.state.text}
                underlineColorAndroid='transparent'
                placeholder="Entrez les symptômes, les avantages" />
              {this.state.text != '' &&
                <TouchableOpacity onPress={() => this._searching('')}>
                  <Icon style={{ fontSize: 24 }} name='close' />
                </TouchableOpacity>
              }
            </Item>
          </View>
          <View style={styles.headerMenu} >
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={{ color: '#fff', fontWeight: '600' }}>Retour</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Content>
          {this.state.isFetching && <ActivityIndicator />}
          {!this.state.isFetching &&
            <View style={{ paddingTop: 10, paddingBottom: 10 }}>
              {items.map((item, index) => {
                const lineCSS = item.isHeader ? TextStyle.headLine : TextStyle.rowLine
                const textCSS = item.isHeader ? TextStyle.character : TextStyle.rowText
                if (item.isHeader) {
                  return (
                    <View key={index} style={lineCSS}>
                      <Text style={textCSS}>{item.text}</Text>
                    </View>
                  )
                }
                else {
                  return (
                    <View key={index} style={lineCSS}>
                      <TouchableOpacity onPress={() => this._onPress(item.text)}>
                        <Text style={textCSS}>{item.text}</Text>
                      </TouchableOpacity>
                    </View>
                  )
                }
              })}
            </View>
          }
        </Content>
      </Container>
    )
  }
}
const COLOR = '#D1E2D6'
const search = StyleSheet.create({
  searchBar: {
    backgroundColor: "#FFFFFF",
    borderColor: COLOR,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    padding: 5,
    margin: 5
  },
  keywordBorder: {
    padding: 5,
    margin: 2,
    backgroundColor: COLOR,
    borderColor: COLOR,
    borderRadius: 5,
    borderWidth: 0.5,
    flexGrow: 1
  },
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: "#92C7A9",
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 6,
  },
  headerMenu: {
    flex: 0.2,
    alignSelf: "center",

  },
  headerTitle: {
    flex: 0.8
  },
})
const TextStyle = StyleSheet.create({
  paragraph: {
    marginBottom: 8
  },
  character: {
    fontSize: 20, fontWeight: '700', lineHeight: 30,
  },
  headLine: {
    backgroundColor: '#E1E1E1',
    flex: 1,
    paddingLeft: 20,
  },
  rowLine: {
    borderBottomColor: '#E1E1E1',
    borderBottomWidth: 1,
    flex: 1,
    paddingBottom: 5,
    paddingTop: 5,
    marginRight: 10,
    marginLeft: 10,
  },
  rowText: {
    fontSize: 15,
    lineHeight: 30,
    fontFamily: 'Montserrat-MediumItalic',
  },
  separator: {
    flex: 1,
    height: .5,
    backgroundColor: '#8E8E8E',
  },
  marginLine: {
    marginRight: 20,
    marginLeft: 20,
  }
})
