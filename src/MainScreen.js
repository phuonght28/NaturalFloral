import React from 'react'
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
} from "react-navigation"
import SideBar from "./components/sideBar"

/* Liste des plantes */
import {
  PlantesList,
    PlantesDetail,
    SymptomList,
    SymptomResult,
} from "./screens/plantes"
/* Liste des produits */
import ProductsList from "./screens/produitsList"
import ProductsDetail from "./screens/produitsDetail"
/* Scanner */
import Scanner from "./screens/scanner"
import {
  Glossaire,
  TypicalProfiles,
  LegalNotice,
  Progress,
  About,
  ContactUs
} from "./screens/posts"

const drawerRoutes = createDrawerNavigator(
  {
    PlantesList: {
      screen: createStackNavigator(
        {
          PlantesList: { screen: (props) => <PlantesList {...props} title={"Liste des plantes"} /> },
          PlantesDetail: { screen: (props) => <PlantesDetail {...props} /> },
          SymptomList: { screen: (props) => <SymptomList {...props} titleHeader={"Liste des Symptômes"} /> },
          SymptomResult: { screen: (props) => <SymptomResult {...props} titleHeader={"Liste des résultats"} /> },
        },
        {
          headerMode: "none", initialRouteName: 'PlantesList'
        })
    },
    ProductsList: {
      screen: createStackNavigator(
        {
          ProductsList: { screen: (props) => <ProductsList {...props} titleHeader={"Liste des ProductsList"} /> },
          ProductsDetail: { screen: (props) => <ProductsDetail {...props} title={"Détails du produit"} /> },

        },
        { headerMode: "none", initialRouteName: 'ProductsList' })
    },
    Glossaire: { screen: (props) => <Glossaire {...props} titleHeader={"Glossaire"} /> },
    LegalNotice: { screen: (props) => <LegalNotice {...props} titleHeader={"Mentions Légales"} /> },
    TypicalProfiles: { screen: (props) => <TypicalProfiles {...props} titleHeader={"Profils types et plantes associées"} /> },
    Progress: { screen: (props) => <Progress {...props} titleHeader={"Nature et progrès"} /> },
    About: { screen: (props) => <About {...props} titleHeader={"À Propos"} /> },
    ContactUs: { screen: (props) => <ContactUs {...props} titleHeader={"Contactez‑nous"} /> },
    Scanner: { screen: (props) => <Scanner {...props} titleHeader={"Scanner"} /> },
  },
  {
    initialRouteName: "PlantesList",
    headerMode: "none",
    contentOptions: { activeTintColor: "#1FB5AD" },
    contentComponent: props => <SideBar {...props} />
  }
)

const MainScreen = createStackNavigator(
  { Drawer: { screen: drawerRoutes } },
  { headerMode: "none" }
)

const App = createAppContainer(MainScreen);

export default App;
