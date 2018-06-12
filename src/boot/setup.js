import React, { Component } from "react";
import { StyleProvider } from "native-base";

import MainScreen from "../MainScreen";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

export default class Setup extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
        <MainScreen />
      </StyleProvider>
    );
  }
}
