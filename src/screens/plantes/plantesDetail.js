import React, { Component } from "react"
import { View, Image, Modal, ScrollView } from 'react-native'
import { Container, Content, Header, Title, Button, List, ListItem, Icon, Left, Right, Thumbnail, Body, Tabs, Fab, H1, H3, Tab, Text, Card, CardItem } from "native-base"
import styles from "./styles"
const sankhadeep = require("../../../assets/product-thumbile/1.png")
const supriya = require("../../../assets/product-thumbile/2.png")
const himanshu = require("../../../assets/product-thumbile/2.png")
const shweta = require("../../../assets/plant/betulapendularoth.png")
const shruti = require("../../../assets/plant/achilleamillefolium.png")
const shivraj = require("../../../assets/plant/achilleamillefolium.png")
const datas = [
  {
    img: sankhadeep,
    text: "Achillea millefolium",
    note: "Chez les femmes, apaise les crampes . ."
  },
  {
    img: supriya,
    text: "Elaeagnus rhamnoides",
    note: "One needs courage to be happy and smiling all time . . "
  },
  {
    img: shivraj,
    text: "Artemisia vulgarisa",
    note: "Time changes everything . ."
  },
  {
    img: shruti,
    text: "Betula pendula roth",
    note: "The biggest risk is a missed opportunity !!"
  },
  {
    img: himanshu,
    text: "Himanshu",
    note: "Live a life style that matchs your vision"
  },
  {
    img: shweta,
    text: "Shweta",
    note: "Failure is temporary, giving up makes it permanent"
  }
]
class PlantesDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      modalVisible: false,
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  _onBack = () => {
    console.log(this.props.stackNavigation, this.props.stackNavigation)
    if (this.props.stackNavigation) { 
      this.props.stackNavigation.goBack()
    }
    else {
      this.props.navigation.goBack()
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: '#92C6A9' }}>
          <Left style={{ flex: 0.2 }}>
            <Button transparent onPress={() => this.props.navigation.navigate("PlantesList")}>
              <Icon name='arrow-back' style={{ color: '#FFFFFF' }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ textAlign: 'center', color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}>Plantes Detail</Title>
          </Body>
          <Right style={{ flex: 0.2, backgroundColor: 'yellow' }} />
        </Header>
        <Content>
          <H1 style={styles.mb10}> Achillea millefolium</H1>
          <Tabs>
            <Tab heading="Detail information">
              <List>
                <ListItem avatar>
                  <Body>
                    <Text>Chez les femmes, apaise les crampes abdominales périodiques - Aide à favoriser la digestion</Text>
                  </Body>

                </ListItem>
                <ListItem avatar>
                  <Body>
                    <Text>Chez les femmes, apaise les crampes abdominales périodiques - Aide à favoriser la digestion</Text>
                  </Body>

                </ListItem>
                <ListItem avatar>
                  <Body>
                    <Text>Chez les femmes, apaise les crampes abdominales périodiques - Aide à favoriser la digestion</Text>
                  </Body>

                </ListItem>
              </List>

              <View style={{ flex: 1 }}>
                <Fab
                  active={this.state.active}
                  direction="up"
                  containerStyle={{}}
                  style={{ backgroundColor: "#92C7A9" }}
                  position="bottomRight"
                  onPress={() => this.setState({ active: !this.state.active })}
                >

                  <Icon name="edit" type="Entypo" style={{ color: "#fff", fontSize: 26, width: 30 }} />

                </Fab>
              </View>
            </Tab>
            <Tab heading="Product">

              {/*  <View style={{ flex: 1}}>
          <H3 style={[styles.mb10,{ color: '#85cfcd', marginTop:10 }]}>Achillée millefeuille Bio - Plante entière</H3>
          <Image style={{height:600, width: null, flex: 1}} source={require('../../../assets/products/achilleemillefeuillebioplanteentiere.png')} />
          </View> */}
              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}>
                <ScrollView>
                  <Card >
                    <CardItem header>
                      <H3 style={[{ color: '#85cfcd', marginTop: 10 }]}>Achillée millefeuille Bio - Plante entière</H3>
                    </CardItem>
                    <CardItem cardBody>
                      <Image
                        style={{
                          resizeMode: "cover",
                          width: null,
                          height: 550,
                          flex: 1
                        }}
                        source={require('../../../assets/products/achilleemillefeuillebioplanteentiere.png')}
                      />
                    </CardItem>

                    <CardItem>
                      <Body>
                        <Text>Ingrédients</Text>
                        <Text note>Extrait de plante entière d’achillée millefeuile Bio* 100%. Convient aux Vegans. *100% des ingrédients agricoles sont issus de l’Agriculture Biologique.</Text>
                        <Text note>L’achillée millefeuille est une plante vivace à racine rampante. Les tiges sont pubescentes, laineuses et blanchâtres. Les feuilles sont très découpées et de couleur vert foncé. La floraison a lieu entre juin et septembre : les fleurs regroupées en capitules sont de couleur blanche, rose ou pourpre et portent en leur cœur des fleurons blanc-jaune à jaune.</Text>
                      </Body>
                    </CardItem>
                    <CardItem>
                      <Body>

                        <Text>Composition</Text>
                        <Text note> Achillée millefeuille Bio : 2000mg** par ampoule de 15ml ** équivalent en plante sèches (EPS)</Text>
                      </Body>
                    </CardItem>
                    <CardItem>
                      <Body>

                        <H3 style={[styles.mb10, { color: "#85cdb4" }]}>
                          CARTON : 12 UNITÉS.
              </H3>
                      </Body>
                    </CardItem>
                    <CardItem footer>
                      <Left />
                      <Body />
                      <Right>
                        <Button block light onPress={() => {
                          this.setModalVisible(!this.state.modalVisible)
                        }}>
                          <Text>Close</Text>
                        </Button>
                      </Right>
                    </CardItem>
                  </Card>
                </ScrollView>



              </Modal>


              <List
                dataArray={datas}
                renderRow={data =>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail square size={55} source={data.img} />
                    </Left>
                    <Body>
                      <Text style={[{ color: '#85cfcd' }]}>
                        {data.text}
                      </Text>
                      <Text numberOfLines={1} note>
                        {data.note}
                      </Text>
                    </Body>
                    <Right>
                      <Button transparent>
                        <Text onPress={() => {
                          this.setModalVisible(true)
                        }}>View</Text>
                      </Button>
                    </Right>
                  </ListItem>}
              />
              {/* <List>
          <ListItem avatar>
              <Body>
                <Text>Ingrédients</Text>
                <Text note>Extrait de plante entière d’achillée millefeuile Bio* 100%. Convient aux Vegans. *100% des ingrédients agricoles sont issus de l’Agriculture Biologique.</Text>
                <Text note>L’achillée millefeuille est une plante vivace à racine rampante. Les tiges sont pubescentes, laineuses et blanchâtres. Les feuilles sont très découpées et de couleur vert foncé. La floraison a lieu entre juin et septembre : les fleurs regroupées en capitules sont de couleur blanche, rose ou pourpre et portent en leur cœur des fleurons blanc-jaune à jaune.</Text>
              </Body>
              
            </ListItem>
            <ListItem avatar>
              <Body>
                <Text>Composition</Text>
                <Text note> Achillée millefeuille Bio : 2000mg** par ampoule de 15ml ** équivalent en plante sèches (EPS)</Text>
              </Body>
              
            </ListItem>
            <ListItem avatar>
              <Body>
              <H3 style={[styles.mb10,{ color: "#85cdb4"}]}>
              CARTON : 12 UNITÉS.
              </H3>
              </Body>
              
            </ListItem>
            </List> */}

            </Tab>
            <Tab heading="Slack chat">
              <List>
                <ListItem avatar>
                  <Left>
                    <Thumbnail source={require('../../../assets/contacts/atul.png')} />
                  </Left>
                  <Body>
                    <Text>Kumar Pratik</Text>
                    <Text note>Doing what you like will always keep you happy . .</Text>
                  </Body>
                  <Right>
                    <Text note>3:43 pm</Text>
                  </Right>
                </ListItem>
                <ListItem avatar>
                  <Left>
                    <Thumbnail source={require('../../../assets/contacts/shweta.png')} />
                  </Left>
                  <Body>
                    <Text>Kumar Pratik</Text>
                    <Text note>Doing what you like will always keep you happy . .</Text>
                  </Body>
                  <Right>
                    <Text note>3:43 pm</Text>
                  </Right>
                </ListItem>
                <ListItem avatar>
                  <Left>
                    <Thumbnail source={require('../../../assets/contacts/sankhadeep.png')} />
                  </Left>
                  <Body>
                    <Text>Kumar Pratik</Text>
                    <Text note>Doing what you like will always keep you happy . .</Text>
                  </Body>
                  <Right>
                    <Text note>3:43 pm</Text>
                  </Right>
                </ListItem>
                <ListItem avatar>
                  <Left>
                    <Thumbnail source={require('../../../assets/contacts/pratik.png')} />
                  </Left>
                  <Body>
                    <Text>Kumar Pratik</Text>
                    <Text note>Doing what you like will always keep you happy . .</Text>
                  </Body>
                  <Right>
                    <Text note>3:43 pm</Text>
                  </Right>
                </ListItem>
              </List>
            </Tab>
          </Tabs>

        </Content>

      </Container>
    )
  }
}

export default PlantesDetail
