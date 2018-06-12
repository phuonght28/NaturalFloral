import React, { Component } from 'react'
import { Title, Body, } from "native-base"

export default class Title extends Component {
  render() {
    return (
      <Body>
        <Title style={{ color: "#FFF", fontSize: 20, fontWeight: "700" }}>{this.props.title.toUpperCase()}</Title>
      </Body>
    )
  }
}
