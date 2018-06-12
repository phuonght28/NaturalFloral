import React from "react"
import Setup from "./src/boot/setup"
import { Text } from 'react-native'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    Text.defaultProps.allowFontScaling = false
    console.disableYellowBox = true
  }
  render() {
    return <Setup />
  }
}
