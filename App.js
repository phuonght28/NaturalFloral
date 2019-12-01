import React from 'react';
import _ from 'lodash';
import { YellowBox, NetInfo, AppState, Platform, StyleSheet, Text, View, Image, Alert } from 'react-native';
import { AppLoading, Updates, Asset, Font, Icon } from 'expo';
import STORAGE from './src/services/Storage';
import MainScreen from './src/MainScreen';
import { Root } from "native-base";

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { appIsReady: false }
    console.disableYellowBox = true
    console.ignoredYellowBox = ['Setting a timer']
    YellowBox.ignoreWarnings(['Setting a timer'])
    const _console = _.clone(console)
    console.warn = message => {
      if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
      }
    }
  }
  componentDidMount() {
    this._fetchNewVersion()
  }

  async _fetchNewVersion() {
    try {
      const update = await Updates.checkForUpdateAsync()
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync()
        Alert.alert(
          'New update',
          'A new update has been downloaded. Please reload to get new version now.',
          [
            { text: 'OK', onPress: () => Updates.reloadFromCache() }
          ],
          { cancelable: false }
        )
      }
    }
    catch (error) {
      return false
    }
  }
  async _loadAssetsAsync() {
    await Font.loadAsync(assetsFonts)
    await STORAGE.warmUp()
  }
  _handleLoadingError = error => {
    console.warn(error)
  }
  _handleFinishLoading = () => {
    this.setState({ appIsReady: true })
  }
  render() {
    if (!this.state.appIsReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    }
    return (
      <Root>
        {/* <View><Text>gfdgfd</Text></View> */}
        <MainScreen />
      </Root>
    )
  }
}


export const assetsFonts = {
  'Ionicons': require('./src/resources/fonts/vector-icons/Ionicons.ttf'),
  'Entypo': require('./src/resources/fonts/vector-icons/Entypo.ttf'),
  'EvilIcons': require('./src/resources/fonts/vector-icons/EvilIcons.ttf'),
  'FontAwesome': require('./src/resources/fonts/vector-icons/FontAwesome.ttf'),
  'Material Design Icons': require('./src/resources/fonts/vector-icons/MaterialCommunityIcons.ttf'),
  'MaterialCommunityIcons': require('./src/resources/fonts/vector-icons/MaterialCommunityIcons.ttf'),
  'MaterialIcons': require('./src/resources/fonts/vector-icons/MaterialIcons.ttf'),
  'Material Icons': require('./src/resources/fonts/vector-icons/MaterialIcons.ttf'),


  'Roboto': require('./src/resources/fonts/Roboto.ttf'),
  'Roboto_medium': require('./src/resources/fonts/Roboto_medium.ttf'),
  'HelveticaNeue-Light': require('./src/resources/fonts/HelveticaNeue/HelveticaNeue-Light.ttf'),

  'Montserrat-Regular': require('./src/resources/fonts/Montserrat/Montserrat-Regular.ttf'),
  'Montserrat-Light': require('./src/resources/fonts/Montserrat/Montserrat-Light.ttf'),
  'Montserrat-Medium': require('./src/resources/fonts/Montserrat/Montserrat-Medium.ttf'),
  'Montserrat-Bold': require('./src/resources/fonts/Montserrat/Montserrat-Bold.ttf'),

  'Montserrat-Italic': require('./src/resources/fonts/Montserrat/Montserrat-Italic.ttf'),
  'Montserrat-LightItalic': require('./src/resources/fonts/Montserrat/Montserrat-LightItalic.ttf'),
  'Montserrat-MediumItalic': require('./src/resources/fonts/Montserrat/Montserrat-MediumItalic.ttf'),
  'Montserrat-BoldItalic': require('./src/resources/fonts/Montserrat/Montserrat-BoldItalic.ttf'),

}