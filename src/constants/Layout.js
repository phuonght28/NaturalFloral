import { Dimensions } from 'react-native';
import { Platform, NativeModules } from 'react-native'

// import STORAGE, { counter } from '../services/Storage'
// import Redux, { createStore } from 'redux'
// const reduxStore = createStore(counter)


// export const REDUXSTORE = () => {
//   let stateValue
//   stateValue = reduxStore.subscribe(() => reduxStore.getState())
//   return stateValue
// }

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// export default {
//   window: {
//     width,
//     height,
//   },
//   isSmallDevice: width < 375,
// }

export const STATUS_BAR_Height = () => {
  let STATUS_BAR_H = 44
  const { StatusBarManager } = NativeModules
  if (Platform.OS === 'ios') {
    StatusBarManager.getHeight(response => STATUS_BAR_H = response.height)
  }
  else STATUS_BAR_H = 6
  return STATUS_BAR_H
}

