import React, { Component } from "react";
import {
  Header,
  Button,
  Icon,
  Left,
  Right,
  Body
} from "native-base";


class TopMenu extends Component {

  render() {

    return (
      <Header style={{ backgroundColor: "#92C7A9" }} >
        <Left>
          <Button
            transparent
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Icon style={{ color: "#fff" }} name="menu" />
          </Button>
        </Left>
        <Body>
        </Body>
        <Right>
          <Button transparent onPress={() => this.props.navigation.navigate("Filter")}>
            <Icon style={{ color: "#fff" }} name="filter" type="FontAwesome" />
          </Button>
          <Button transparent onPress={() => this.props.navigation.navigate("Comment")}>
            <Icon style={{ color: "#fff" }} name="comments" type="FontAwesome" />
          </Button>
          <Button transparent onPress={() => this.props.navigation.navigate("User")}>
            <Icon style={{ color: "#fff" }} name="user-circle" type="FontAwesome" />
          </Button>
          <Button transparent onPress={() => this.props.navigation.navigate("Liststar")}>
            <Icon style={{ color: "#fff" }} name="star" type="FontAwesome" />
          </Button>
          <Button transparent onPress={() => this.props.navigation.navigate("Scan")}>
            <Icon style={{ color: "#fff" }} name="barcode" />
          </Button>
        </Right>
      </Header>

    );
  }
}

export default TopMenu;
