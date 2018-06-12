import React, { Component } from "react"
import { Container, Header, Title, Content, Button, Input, Body, Left, Right, Icon, Form, Text, ListItem, CheckBox } from "native-base"
import styles from "./styles"

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pseudo: false,
      naturopathe: false,
      conditions: false
    }
  }
  toggleSwitch(checkbox) {
    if (checkbox == 'pseudo') {
      this.setState({
        pseudo: !this.state.pseudo
      })
    }
    else if (checkbox == 'naturopathe') {
      this.setState({
        naturopathe: !this.state.naturopathe
      })
    }
    else if (checkbox == 'conditions') {
      this.setState({
        conditions: !this.state.conditions
      })
    }
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: '#92C6A9' }}>
          <Left style={{ flex: 0.2 }}>
            <Button transparent onPress={() => this.props.navigation.openDrawer()} >
              <Icon style={{ color: "#fff", fontSize: 30 }} name="menu" type="Entypo" />
            </Button>
          </Left>
          <Body>
            <Title style={{ textAlign: 'center', color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}>D'INSCRIPTION</Title>
          </Body>
          <Right style={{ flex: 0.2, backgroundColor: 'yellow' }} />
        </Header>
        <Content>
          <Form>
            <Input style={{ borderBottomColor: 'rgba(0,0,0,0.5)', borderBottomWidth: 0.5, marginBottom: 5, marginTop: 5, marginLeft: 15, marginRight: 15, height: 40, lineHeight: 40 }} placeholder="Pseudo" />
            <Input style={{ borderBottomColor: 'rgba(0,0,0,0.5)', borderBottomWidth: 0.5, marginBottom: 5, marginTop: 5, marginLeft: 15, marginRight: 15, height: 40, lineHeight: 40 }} placeholder="Prénom" />
            <Input style={{ borderBottomColor: 'rgba(0,0,0,0.5)', borderBottomWidth: 0.5, marginBottom: 5, marginTop: 5, marginLeft: 15, marginRight: 15, height: 40, lineHeight: 40 }} placeholder="Nom" />
            <ListItem style={{ borderBottomWidth: 0 }} button onPress={() => this.toggleSwitch('pseudo')}>
              <CheckBox color="#1AAC8F" checked={this.state.pseudo} onPress={() => this.toggleSwitch('pseudo')} />
              <Body>
                <Text style={{ fontSize: 12 }}>Afficher seulement mon pseudo (vos prénom et nom ne seront pas affichés)</Text>
              </Body>
            </ListItem>
            <ListItem style={{ borderBottomWidth: 0 }} button onPress={() => this.toggleSwitch('naturopathe')}>
              <CheckBox color="#1AAC8F" checked={this.state.naturopathe} onPress={() => this.toggleSwitch('naturopathe')} />
              <Body><Text style={{ fontSize: 12 }}>Je suis naturopathe</Text></Body>
            </ListItem>
            <Input style={{ borderBottomColor: 'rgba(0,0,0,0.5)', borderBottomWidth: 0.5, marginBottom: 5, marginTop: 5, marginLeft: 15, marginRight: 15, height: 40, lineHeight: 40 }} placeholder="Mot de passe" secureTextEntry />
            <Input style={{ borderBottomColor: 'rgba(0,0,0,0.5)', borderBottomWidth: 0.5, marginBottom: 5, marginTop: 5, marginLeft: 15, marginRight: 15, height: 40, lineHeight: 40 }} placeholder="Re-confirmer le mot de passe" secureTextEntry />
            <Input style={{ borderBottomColor: 'rgba(0,0,0,0.5)', borderBottomWidth: 0.5, marginBottom: 5, marginTop: 5, marginLeft: 15, marginRight: 15, height: 40, lineHeight: 40 }} placeholder="Date de naissance" />
            <Input style={{ borderBottomColor: 'rgba(0,0,0,0.5)', borderBottomWidth: 0.5, marginBottom: 5, marginTop: 5, marginLeft: 15, marginRight: 15, height: 40, lineHeight: 40 }} placeholder="Ville" />
            <Input style={{ borderBottomColor: 'rgba(0,0,0,0.5)', borderBottomWidth: 0.5, marginBottom: 5, marginTop: 5, marginLeft: 15, marginRight: 15, height: 40, lineHeight: 40 }} placeholder="Code postal" />
            <Input style={{ borderBottomColor: 'rgba(0,0,0,0.5)', borderBottomWidth: 0.5, marginBottom: 5, marginTop: 5, marginLeft: 15, marginRight: 15, height: 40, lineHeight: 40 }} placeholder="No Tél" />
            <ListItem style={{ borderBottomWidth: 0 }} button onPress={() => this.toggleSwitch('conditions')}>
              <CheckBox color="#1AAC8F" checked={this.state.conditions} onPress={() => this.toggleSwitch('conditions')} />
              <Body>
                <Text style={{ fontSize: 12 }}>J'accepte les termes et conditions</Text>
              </Body>
            </ListItem>
          </Form>
          <Button block style={{ backgroundColor: "#92C6A9", alignSelf: "center" }}>
            <Text>S'inscrire</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default Register
