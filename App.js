import React from 'react'
import _ from 'lodash';
import { YellowBox, NetInfo, AppState, Platform, Text, Image, Alert } from 'react-native'
import Expo, { AppLoading, Updates, Asset, Font, Icon } from 'expo'

import MainScreen from './src/MainScreen'
import STORAGE from './src/services/Storage'
import { Auth } from './src/services/Firebase/Auth'

const firebase = require('firebase')
const { Firebase_API } = require('./src/services/config')


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    Text.defaultProps.allowFontScaling = false
    console.disableYellowBox = true
    console.ignoredYellowBox = ['Setting a timer']
    YellowBox.ignoreWarnings(['Setting a timer'])
    const _console = _.clone(console)
    console.warn = message => {
      if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
      }
    }
    firebase.initializeApp(Firebase_API)
    //this.Authentication = Auth.getInstance()
    // this.Authentication.checkConnection('App/constructor(props)')
  }
  async componentDidMount() {

    this._fetchNewVersion()
    STORAGE.askAsyncPermissionsNOTIFICATIONS()

    // AppState.addEventListener("change", this._handleAppStateChange)
    // NetInfo.getConnectionInfo().then((connectionInfo) => {
    //   console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    // });
    // function handleFirstConnectivityChange(connectionInfo) {
    //   console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    //   NetInfo.removeEventListener(
    //     'connectionChange',
    //     handleFirstConnectivityChange
    //   );
    // }
    // NetInfo.addEventListener(
    //   'connectionChange',
    //   handleFirstConnectivityChange
    // );

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
    let imageAssets = []
    imageAssets = imageAssets.concat(commonImages)
    imageAssets = imageAssets.concat(produitsImages)
    imageAssets = imageAssets.concat(plantesImages)
    return Promise.all([
      await imageAssets.map(image => {
        if (typeof image === 'string') {
          return Image.prefetch(image)
        } else {
          return Expo.Asset.fromModule(image).downloadAsync().catch((ignored) => {
            console.error(ignored)
          })
        }
      }),

      await Expo.Font.loadAsync(fontsIcons).catch((ignored) => {
        console.error(ignored)
      }),
      await STORAGE.warmUp(),
    ])
  }
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      console.log(Platform.OS, 'app is into foreground');
    }
    else if (nextAppState === 'background') {
      console.log(Platform.OS, 'app is into background');
    }
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
    return <MainScreen />
  }
  componentWillUnmount() {
    console.log('app is killed');
    // AppState.removeEventListener("change", this._handleAppStateChange);
  }
}

const fontsIcons = {
  'Ionicons': require('./node_modules/@expo/vector-icons/fonts/Ionicons.ttf'),
  'Entypo': require('./node_modules/@expo/vector-icons/fonts/Entypo.ttf'),
  'EvilIcons': require('./node_modules/@expo/vector-icons/fonts/EvilIcons.ttf'),
  'FontAwesome': require('./node_modules/@expo/vector-icons/fonts/FontAwesome.ttf'),
  'Material Design Icons': require('./node_modules/@expo/vector-icons/fonts/MaterialCommunityIcons.ttf'),
  'MaterialCommunityIcons': require('./node_modules/@expo/vector-icons/fonts/MaterialCommunityIcons.ttf'),
  'MaterialIcons': require('./node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf'),
  'Material Icons': require('./node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf'),


  'Roboto': require('./node_modules/native-base/Fonts/Roboto.ttf'),
  'Roboto_medium': require('./node_modules/native-base/Fonts/Roboto_medium.ttf'),

  'Montserrat-Regular': require('./src/resources/fonts/Montserrat/Montserrat-Regular.ttf'),
  'Montserrat-Light': require('./src/resources/fonts/Montserrat/Montserrat-Light.ttf'),
  'Montserrat-Medium': require('./src/resources/fonts/Montserrat/Montserrat-Medium.ttf'),
  'Montserrat-Bold': require('./src/resources/fonts/Montserrat/Montserrat-Bold.ttf'),

  'Montserrat-Italic': require('./src/resources/fonts/Montserrat/Montserrat-Italic.ttf'),
  'Montserrat-LightItalic': require('./src/resources/fonts/Montserrat/Montserrat-LightItalic.ttf'),
  'Montserrat-MediumItalic': require('./src/resources/fonts/Montserrat/Montserrat-MediumItalic.ttf'),
  'Montserrat-BoldItalic': require('./src/resources/fonts/Montserrat/Montserrat-BoldItalic.ttf'),

  'HelveticaNeue-Light': require('./src/resources/fonts/HelveticaNeue-Light.ttf'),

}
const plantesImages = [
  require('./src/resources/images/plantes/achillee-millefeuille.jpg'),
  require('./src/resources/images/plantes/aloes-vera.jpg'),
  require('./src/resources/images/plantes/argousier.jpg'),
  require('./src/resources/images/plantes/armoise-commune.jpg'),
  require('./src/resources/images/plantes/artichaut.jpg'),
  require('./src/resources/images/plantes/bouleau.jpg'),
  require('./src/resources/images/plantes/bruyere.jpg'),
  require('./src/resources/images/plantes/canneberge.jpg'),
  require('./src/resources/images/plantes/cassis.jpg'),
  require('./src/resources/images/plantes/chardon-marie.jpg'),
  require('./src/resources/images/plantes/desmodium.jpg'),
  require('./src/resources/images/plantes/echinacee-pourpre.jpg'),
  require('./src/resources/images/plantes/fumeterre.jpg'),
  require('./src/resources/images/plantes/ginkgo.jpg'),
  require('./src/resources/images/plantes/ginseng.jpg'),
  require('./src/resources/images/plantes/harpagophyton.jpg'),
  require('./src/resources/images/plantes/lin.jpg'),
  require('./src/resources/images/plantes/lotier-cornicule.jpg'),
  require('./src/resources/images/plantes/marron-dinde.jpg'),
  require('./src/resources/images/plantes/mauve.jpg'),
  require('./src/resources/images/plantes/melisse.jpg'),
  require('./src/resources/images/plantes/menthe-nanah.jpg'),
  require('./src/resources/images/plantes/menthe-poivree.jpg'),
  require('./src/resources/images/plantes/millepertuis.jpg'),
  require('./src/resources/images/plantes/myrtille.jpg'),
  require('./src/resources/images/plantes/olivier.jpg'),
  require('./src/resources/images/plantes/ortie-dioique.jpg'),
  require('./src/resources/images/plantes/pavot-de-californie.jpg'),
  require('./src/resources/images/plantes/pissenlit.jpg'),
  require('./src/resources/images/plantes/prele.jpg'),
  require('./src/resources/images/plantes/radis-noir.jpg'),
  require('./src/resources/images/plantes/reine-des-pres.jpg'),
  require('./src/resources/images/plantes/romarin.jpg'),
  require('./src/resources/images/plantes/sarriette.jpg'),
  require('./src/resources/images/plantes/serpolet.jpg'),
  require('./src/resources/images/plantes/tanaisie.jpg'),
  require('./src/resources/images/plantes/tilleul.jpg'),
  require('./src/resources/images/plantes/valeriane.jpg'),
  require('./src/resources/images/plantes/vigne-rouge.jpg'),
]
const commonImages = [
  require('./src/resources/images/logo-natway.png'),
  require('./src/resources/images/logo-natway-bg.jpg'),
  require('./src/resources/images/bandeau2.jpg'),
]
const produitsImages = [
  require('./src/resources/images/produits/3760265300013.png'),
  require('./src/resources/images/produits/3760265300020.png'),
  require('./src/resources/images/produits/3760265300037.png'),
  require('./src/resources/images/produits/3760265300044.png'),
  require('./src/resources/images/produits/3760265300051.png'),
  require('./src/resources/images/produits/3760265300068.png'),
  require('./src/resources/images/produits/3760265300075.png'),
  require('./src/resources/images/produits/3760265300082.png'),
  require('./src/resources/images/produits/3760265300099.png'),
  require('./src/resources/images/produits/3760265300105.png'),
  require('./src/resources/images/produits/3760265300112.png'),
  require('./src/resources/images/produits/3760265300129.png'),
  require('./src/resources/images/produits/3760265300136.png'),
  require('./src/resources/images/produits/3760265300143.png'),
  require('./src/resources/images/produits/3760265300150.png'),
  require('./src/resources/images/produits/3760265300167.png'),
  require('./src/resources/images/produits/3760265300174.png'),
  require('./src/resources/images/produits/3760265300181.png'),
  require('./src/resources/images/produits/3760265300198.png'),
  require('./src/resources/images/produits/3760265300204.png'),
  require('./src/resources/images/produits/3760265300211.png'),
  require('./src/resources/images/produits/3760265300228.png'),
  require('./src/resources/images/produits/3760265300235.png'),
  require('./src/resources/images/produits/3760265300242.png'),
  require('./src/resources/images/produits/3760265300259.png'),
  require('./src/resources/images/produits/3760265300266.png'),
  require('./src/resources/images/produits/3760265300273.png'),
  require('./src/resources/images/produits/3760265300280.png'),
  require('./src/resources/images/produits/3760265300297.png'),
  require('./src/resources/images/produits/3760265300303.png'),
  require('./src/resources/images/produits/3760265300310.png'),
  require('./src/resources/images/produits/3760265300327.png'),
  require('./src/resources/images/produits/3760265300334.png'),
  require('./src/resources/images/produits/3760265300341.png'),
  require('./src/resources/images/produits/3760265300358.png'),
  require('./src/resources/images/produits/3760265300365.png'),
  require('./src/resources/images/produits/3760265300372.png'),
  require('./src/resources/images/produits/3760265300389.png'),
  require('./src/resources/images/produits/3760265301607.png'),
  require('./src/resources/images/produits/3760265301614.png'),
  require('./src/resources/images/produits/3760265301621.png'),
  require('./src/resources/images/produits/3760265301638.png'),
  require('./src/resources/images/produits/3760265301645.png'),
  require('./src/resources/images/produits/3760265301652.png'),
  require('./src/resources/images/produits/3760265301669.png'),
  require('./src/resources/images/produits/3760265301683.png'),
  require('./src/resources/images/produits/3760265301690.png'),
  require('./src/resources/images/produits/3760265301706.png'),
  require('./src/resources/images/produits/3760265302000.png'),
  require('./src/resources/images/produits/3760265302017.png'),
  require('./src/resources/images/produits/3760265302024.png'),
  require('./src/resources/images/produits/3760265302031.png'),
  require('./src/resources/images/produits/3760265302048.png'),
  require('./src/resources/images/produits/3760265302055.png'),
  require('./src/resources/images/produits/3760265302062.png'),
  require('./src/resources/images/produits/3760265302079.png'),
  require('./src/resources/images/produits/3760265302086.png'),
  require('./src/resources/images/produits/3760265302093.png'),
  require('./src/resources/images/produits/3760265302109.png'),
  require('./src/resources/images/produits/3760265302208.png'),
  require('./src/resources/images/produits/3760265302703.png'),
  require('./src/resources/images/produits/3760265302710.png'),
  require('./src/resources/images/produits/3760265302727.png')
]