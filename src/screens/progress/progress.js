import React, { Component } from "react"
import { View, Image } from 'react-native'
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, H1 } from "native-base"

const laboratoiles = require("../../../assets/laboratoiles.png")
const posts = {
  title: "Scientia Natura",
  intro: "Les compléments alimentaires Flora Natura sont les seuls labellisés Nature et Progrès",
  content: "Nous fabriquons et conditionnons réellement tous nos extraits dans notre Laboratoire de Nouvelle Aquitaine, et avons établi des partenariats de qualité avec les producteurs de plantes avec qui nous sommes en relations étroites.\nL’origine de chaque plante est inscrite sur chacune de nos boites, ce qui traduit une traçabilité des plus transparentes. Nous avons mis en place une méthode d’extraction et pasteurisation efficace et respectueuse des actifs de la plante, pour en extraire le meilleur sans en altérer la qualité.\nNos synergies de la ruche associent sous forme d’extraits fluides aqueux, le meilleur de la ruche et des plantes ,sans additifs ni conservateurs.\nLa gelée royale Flora Natura est garantie d’origine française : conditionnée fraiche, ses propriétés et son efficacité sont optimales ."
}
export default class About extends Component {

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#92C7A9" }} >
          <Left style={{ flex: 0.2, zIndex: 9999 }}>
            <Button transparent onPress={() => this.props.navigation.openDrawer()} >
              <Icon style={{ color: "#fff", fontSize: 30 }} name="menu" type="Entypo" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#FFF", fontSize: 20, fontWeight: "700" }}>Nature et Progrès</Title>
          </Body>
          <Right style={{ flex: 0.2 }} />
        </Header>
        <Content style={{ backgroundColor: "#FFF" }}>
          <Image source={laboratoiles} style={{ marginTop: 10, alignSelf: 'center' }} />
          <View style={{ backgroundColor: "#92C7A9", margin: 10, padding: 10 }}>
            <H1 style={{ textAlign: 'center', color: "#FFF" }}>{posts.title}</H1>
            <Text style={{ color: "#FFF", fontWeight:'bold' }}>{posts.intro}</Text>
            <Text style={{ color: "#FFF" }}>{posts.content}</Text>
          </View>
        </Content>
      </Container>
    )
  }
}
