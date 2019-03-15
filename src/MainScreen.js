import React, { Component } from 'react'
import { Root } from "native-base"
import { createStackNavigator, createDrawerNavigator } from "react-navigation"
import SideBar from "./components/sideBar"

/* Liste des plantes */
import PlantesList from "./screens/plantesList"
import PlantesDetail from "./screens/plantesDetail"
import SymptomList from "./screens/symptomList"
import SymptomResult from "./screens/symptomResult"

/* Liste des produits */
import ProductsList from "./screens/produitsList"
import ProductsDetail from "./screens/produitsDetail"
/* Scanner */
import Scanner from "./screens/scanner"

/* Glossaire */
/* Profils types et plantes associées */
/* "À Propos des Laboratoires Scientia Natura" */
/* Nature et progrès */
/* Contactez‑nous */
import Glossaire from "./screens/posts/glossaire"
import TypicalProfiles from "./screens/posts/profilsTypes"
import LegalNotice from "./screens/posts/LegalNotice"
import Progress from "./screens/posts/progress"
import About from "./screens/posts/about"
import ContactUs from "./screens/posts/contact"
/* HealthCheck */
import HealthCheck from "./screens/HealthCheck"
/* Club Flora */
import NaturopathList from "./screens/NaturopathList"
import NaturopathProfile from "./screens/NaturopathProfile"
import GroupChannel from "./screens/ClubFlora/GroupChannel"
/* Groupes de discussion */
import Discussion from "./screens/Discussion"
import Chat from "./screens/ClubFlora/Chat"

/* Profile */
import UserProfile from "./screens/UserProfile/index"
import UserProfileScreen from "./screens/UserProfile/index"
import Connection from "./screens/Connection"
import ForgotPassword from "./screens/ClubFlora/connect/ForgotPassword"

export default class MainScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    //this.Auth = Authentication.getInstance()
    //this.Auth.checkConnection('MainScreen componentWillMount')
  }

  _generateNavigator() {

    const stackRoutes = {
      PlantesList: { screen: (props) => <PlantesList {...props} title={"Liste des plantes"} /> },
      PlantesDetail: { screen: (props) => <PlantesDetail {...props} /> },

      SymptomList: { screen: (props) => <SymptomList {...props} titleHeader={"Liste des Symptômes"} /> },
      SymptomResult: { screen: (props) => <SymptomResult {...props} titleHeader={"Liste des résultats"} /> },

      ProductsList: { screen: (props) => <ProductsList {...props} titleHeader={"Liste des ProductsList"} /> },
      ProductsDetail: { screen: (props) => <ProductsDetail {...props} title={"Détails du produit"} /> },
      Scanner: { screen: (props) => <Scanner {...props} titleHeader={"Scanner"} /> },

      Glossaire: { screen: (props) => <Glossaire {...props} titleHeader={"Glossaire"} /> },
      
      LegalNotice: { screen: (props) => <LegalNotice {...props} titleHeader={"Legal Notice"} /> },
      TypicalProfiles: { screen: (props) => <TypicalProfiles {...props} titleHeader={"Profils types et plantes associées"} /> },
      Progress: { screen: (props) => <Progress {...props} titleHeader={"Nature et progrès"} /> },
      About: { screen: (props) => <About {...props} titleHeader={"À Propos"} /> },
      ContactUs: { screen: (props) => <ContactUs {...props} titleHeader={"Contactez‑nous"} /> },
      HealthCheck: { screen: (props) => <HealthCheck {...props} title={"Mon bilan de santé"} /> },

      NaturopathList: { screen: (props) => <NaturopathList {...props} title={"Communauté Pro onLine"} /> },
      NaturopathProfile: { screen: (props) => <NaturopathProfile {...props} title={"Communauté Pro onLine"} /> },

      Discussion: { screen: (props) => <Discussion {...props} title={"Groupes de discussion"} /> },
      GroupChannel: { screen: (props) => <GroupChannel {...props} /> },
      Chat: { screen: (props) => <Chat {...props} /> },
      UserProfile: { screen: (props) => <UserProfile {...props} /> },
      UserProfileScreen: { screen: (props) => <UserProfileScreen {...props} /> },

      Connection: { screen: (props) => <Connection {...props} /> },
      ForgotPassword: { screen: (props) => <ForgotPassword {...props} title={"Réinitialisez votre mot de passe"} /> },

      // Profile: { screen: (props) => <Profile {...props} /> },
      // Test: { screen: (props) => <Test {...props} /> },

    }
    const drawerRoutes = createDrawerNavigator(
      {
        PlantesList: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'PlantesList' }) },
        PlantesDetail: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'PlantesDetail' }) },
        SymptomList: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'SymptomList' }) },
        //SymptomResult: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'SymptomResult'})},
        ProductsList: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'ProductsList' }) },
        //ProductsDetail: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'ProductsDetail'})},
        Scanner: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'Scanner' }) },

        Glossaire: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'Glossaire' }) },
        LegalNotice: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'LegalNotice' }) },
        TypicalProfiles: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'TypicalProfiles' }) },
        Progress: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'Progress' }) },
        About: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'About' }) },
        ContactUs: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'ContactUs' }) },
        HealthCheck: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'HealthCheck' }) },

        NaturopathList: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'NaturopathList' }) },
        NaturopathProfile: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'NaturopathProfile' }) },

        Discussion: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'Discussion' }) },
        UserProfile: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'UserProfile' }) },
        UserProfileScreen: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'UserProfileScreen' }) },
        Connection: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'Connection' }) },
        ForgotPassword: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'ForgotPassword' }) },

        //Profile: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'Profile'})},
        //Test: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'Test' }) },
        // PlantesFavorite: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'PlantesFavorite'})},
        // Register: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'Register'})},
        // Login: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'Login'})},
        // SearchFilter: { screen: createStackNavigator(stackRoutes, { headerMode: "none", initialRouteName: 'SearchFilter'})},
      },
      {
        //initialRouteName: "PlantesList",
        //initialRouteName: "NaturopathList",
        //initialRouteName: "Discussion",
        //initialRouteName: "UserProfile",
        initialRouteName: "PlantesList",
        headerMode: "none",
        contentOptions: { activeTintColor: "#1FB5AD" },
        contentComponent: props => <SideBar {...props} />
      }
    )

    return createStackNavigator(
      {
        Drawer: { screen: drawerRoutes },
        ...stackRoutes
      },
      { headerMode: "none" }
    )
  }
  render() {
    const AppNavigator = this._generateNavigator()
    return (
      <Root>
        <AppNavigator />
      </Root>
    )
  }
}
