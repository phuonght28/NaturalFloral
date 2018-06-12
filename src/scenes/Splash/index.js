import React, { Component } from 'react'
import { View, Image, ImageBackground } from 'react-native'
import { Container } from "native-base"

import { NavigationActions } from 'react-navigation'
import { Asset, AppLoading } from 'expo'

const logo = require("../../../assets/logo.jpg")
const bandeau = require("../../../assets/bandeau2.jpg")
export default class SplashScreen extends Component {Í
  constructor(props) {
    super(props)
    this.state = { isReady: false }
  }

  async _cacheResourcesAsync() {
    const images = [
      require("../../../assets/logo.jpg"),
      require("../../../assets/bandeau2.jpg")
    ]

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync()
    })
    return Promise.all(cacheImages)

  }



  _appLoadingFinish = () => {
    this.setState({ isReady: true })
    console.log('dsfsd')
    //return NavigationActions.navigate({ routeName: 'Drawer' })

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Drawer' })
      ]
    })
    this.props.navigation.dispatch(resetAction)

  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={this._appLoadingFinish}
          onError={console.warn}
        />
      )
    }

    return (
      // <Container>
      //   <ImageBackground source={bandeau} style={{ flex: 1, width: null, height: null, alignItems: 'center', justifyContent: 'center' }}>
      //   <Image source={logo} style={{ marginBottom: 10, alignSelf: 'center', borderRadius: 10 }} />
      //   </ImageBackground>
      // </Container>
      <View />
    )
  }
}
