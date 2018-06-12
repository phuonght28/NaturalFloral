import React from "react"
import { Root } from "native-base"
import { createStackNavigator, createDrawerNavigator } from "react-navigation"
import Home from "./screens/home/"
import SideBar from "./screens/sidebar"
import PlantesList from "./screens/plantes/plantesList"
import PlantesDetail from "./screens/plantes/plantesDetail"
import ProductsList from "./screens/products/productsList"
import Register from "./screens/register/register"
import About from "./screens/about/about"
import Progress from "./screens/progress/progress"
import Scanner from "./screens/scanner/scanner"


const Drawer = createDrawerNavigator(
  {
    Home: { screen: Home },
    PlantesList: { screen: PlantesList },
    PlantesDetail: { screen: PlantesDetail },
    ProductsList: { screen: ProductsList },
    Register: { screen: Register },
    About: { screen: About },
    Progress: { screen: Progress },
    SideBar: { screen: SideBar },
    Scanner: { screen: Scanner }
  },
  {
    initialRouteName: "PlantesList",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
)

const AppNavigator = createStackNavigator(
  {
    Drawer: { screen: Drawer },
    PlantesList: { screen: PlantesList },
    PlantesDetail: { screen: PlantesDetail },
    ProductsList: { screen: ProductsList },
    Register: { screen: Register },
    SideBar: { screen: SideBar },
    Scanner: { screen: Scanner }
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
)

export default () =>
  <Root>
    <AppNavigator />
  </Root>
