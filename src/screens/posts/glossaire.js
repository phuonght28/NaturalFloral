import React, { Component } from "react"
import { StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Container, Content, Item, Input, Icon, Text } from "native-base"

import TITLE from "../../components/titleHeader"
import GLOSSAIRE from '../../parsers/glossaire'


export default class Glossaire extends Component {
  constructor() {
    super()
    this.state = {
      text: '',
      isFetching: true,
      dataSource: []
    }
  }
  componentDidMount() {
    this._clearText()
  }
  _searching(text) {
    if (text == '') {
      this._clearText()
    }
    else {
      const dataSource = GLOSSAIRE.filter((item) => {
        if (!item.isHeader) {
          const itemData = item.glossaire.toLowerCase()
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
    this.setState({ isFetching: true }, () => {
      this.setState({ dataSource: GLOSSAIRE, text: '' }, () => {
        this.setState({ isFetching: false })
      })
    })
  }
  render() {
    const dataSource = this.state.dataSource
    return (
      <Container style={{ backgroundColor: "#92C7A9" }}>
        <TITLE title={this.props.titleHeader} navigation={this.props.navigation} />
        <Content padder style={{ backgroundColor: "#f1f2f7" }}>
          <Item style={search.searchBar}>
            <Input
              onChangeText={(text) => this._searching(text)}
              value={this.state.text}
              underlineColorAndroid='transparent'
              placeholder="entrer des mots-clés" />
            {this.state.text != '' &&
              <TouchableOpacity onPress={() => this._searching('')}>
                <Icon style={{ fontSize: 24 }} name='close' />
              </TouchableOpacity>
            }
          </Item>
          {this.state.isFetching && <ActivityIndicator />}
          {!this.state.isFetching &&
            <View style={{ paddingTop: 10, paddingBottom: 10 }}>
              {dataSource.map((item, index) => {
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
                      <View key={index} style={[TextStyle2.paragraph]}>
                        <Text style={[TextStyle2.line]}>
                          <Text style={[TextStyle2.headLine]}>{item.glossaire && item.glossaire}: </Text>
                          {item.descript && item.descript}
                        </Text>
                      </View>
                    </View>
                  )
                }
              })}
            </View>
          }
          {/* {dataSource.map((item, index) => {
            return (
              <View key={index} style={[TextStyle.paragraph]}>
                <Text style={[TextStyle.line]}>
                  <Text style={[TextStyle.headLine]}>{item.glossaire && item.glossaire}: </Text>
                  {item.descript && item.descript}
                </Text>
              </View>
            )
          })} */}
        </Content>
      </Container >
    )
  }
}

const TextStyle2 = StyleSheet.create({
  paragraph: {
    marginBottom: 10
  },
  line: {
    fontFamily: 'Montserrat-LightItalic',
    marginBottom: 5
  },
  headLine: {
    color: "#5E9175",
    fontWeight: '600',
    fontFamily: 'Montserrat-BoldItalic',
    marginBottom: 8
  }
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