import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Text,
  View
} from "native-base";
import {
  Image
} from 'react-native'
import styleLogin from "./styles";

class Login extends Component {
  render() {
    return (
      <Container style={styleLogin.container}>
      
        
        <View  style={styleLogin.viewLogo}>
        <Image
              style={styleLogin.logo}
              source={require('../../../assets/logo-natural-floral.png')}
          /></View>
<Content>
          <Form>
            <Item floatingLabel style={styleLogin.input}>
              <Label style={styleLogin.label}>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel style={styleLogin.input}>
              <Label  style={styleLogin.label}>Password</Label>
              <Input secureTextEntry />
            </Item>
          </Form>
          <Button block style={{ margin: 15, marginTop: 50 }}>
            <Text>Sign In</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Login;
