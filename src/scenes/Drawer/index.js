import React, { Component } from 'react'
import { createDrawerNavigator } from "react-navigation"
import SideBar from "../sidebar"
import PlantesList from "../plantes/plantesList"
import ProductsList from "../products/productsList"
import Register from "../register/register"
import About from "../about/about"
import Progress from "../progress/progress"
import Scanner from "../scanner/scanner"



const generateScreens = () => ({
  PlantesList: {
    screen: (props) => (<PlantesList {...props} />)
  },
  ProductsList: {
    screen: (props) => (<ProductsList {...props} />)
  },
  Progress: {
    screen: (props) => (<Progress {...props} />)
  },
  About: {
    screen: (props) => (<About {...props} />)
  },
  Register: {
    screen: (props) => (<Register {...props} />)
  },
  Scanner: {
    screen: (props) => (<Scanner {...props} />)
  }
})

// const Drawer = createDrawerNavigator(
//   {
//     Home: { screen: Home },
//     PlantesList: { screen: PlantesList },
//     PlantesDetail: { screen: PlantesDetail },
//     ProductsList: { screen: ProductsList },
//     Register: { screen: Register },
//     About: { screen: About },
//     Progress: { screen: Progress },
//     SideBar: { screen: SideBar },
//     Scanner: { screen: Scanner }
//   },
//   {
//     initialRouteName: "PlantesList",
//     contentComponent: props => <SideBar {...props} />
//   }
// )

export default class DrawerSidebar extends Component {
  
  render() {
    const AppNavigator = createDrawerNavigator(generateScreens(), {
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle',
      contentComponent: props => <SideBar {...props} />
    })

    return (
      <AppNavigator />
    )
  }
}
