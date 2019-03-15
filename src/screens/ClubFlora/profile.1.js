import React, { Component } from "react"
import { Platform, NativeModules, StyleSheet, View, Text, TextInput, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { Container, Content, Icon } from "native-base"
import { LinearGradient } from 'expo'
import TITLE from '../../components/titleHeader'
import moment from 'moment'
const firebase = require('firebase')
require('firebase/firestore')

const { StatusBarManager } = NativeModules
let STATUS_BAR_H = 44

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true,
    }
    firebase.firestore().settings({ timestampsInSnapshots: true })
  }
  componentWillUnmount() {
    this.authSubscription()
  }
  async componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((currentUser) => {
      this.setState({ isFetching: true, currentUser }, () => {
        //const userData = this.getDataUser(currentUser.uid)
      })
    })
  }
  getDataUser = (uid) => {
    const docRef = firebase.firestore().collection("users").doc(uid)
    return new Promise(resolve => {
      docRef.onSnapshot(function (doc) {
        console.log(" data: ", doc.data())
      })
      // docRef.get().catch(error => {
      //   resolve(false)
      // }).then(doc => {
      //   if (doc) {
      //     resolve(doc.data())
      //   }
      // })
    })
  }
  _userGetInfo(uid) {
    const docRef = firebase.firestore().collection("users").doc(uid)
    let dataArray = []
    dataArray = docRef.get().then((doc) => {
      let data = []
      data.push(doc.data())
      return data
    })
    console.log(dataArray)
  }
  _setStateData(data) {
    this.setState({ isFetching: true, data }, () => {
      this.setState({ isFetching: false })
    })
  }
  _userUpdate(uid, data) {
    var updateData = {
      username: "phuonghuynh",
      lastname: "huynh",
      firstname: "phuong",
      conditions: true,
      isNaturopath: false,
      showUsername: false,
      postalcode: 3.14159265,
      telephone: "+84906589850",
      birthday: new Date("August 25, 1990"),
    }
    const docRef = this.db.collection("users").doc(uid)
    docRef.set(data)
      .then(function () {
        console.log("Document successfully written!")
      })
      .catch(function (error) {
        console.error("Error writing document: ", error)
      })

    // firebase.auth().currentUser.updateProfile({ displayName: 'Phuong Huynh' }).catch(error => {
    //   console.log(error)
    // }).then(function () {
    //   firebase.auth().onAuthStateChanged((currentUser) =>{
    //     console.log(' ================== currentUser:', currentUser)

    //   })
    // })


  }
  render() {
    let userData = ['empty']
    const currentUser = this.state.currentUser
    if (!this.state.isFetching && currentUser) {


      // docRef.get()
      //   .then(querySnapshot => {
      //     querySnapshot.docs.map(function (documentSnapshot) {
      //       return (output[documentSnapshot.id] = documentSnapshot.data())
      //     })
      //     this.setState({ dataSource: Object.entries(output) })
      //     console.log("datasource:", this.state.dataSource)
      //   })


      // docRef.onSnapshot(function (doc) {
      //   var username = doc.data().username
      //   output.push(username)
      // })
      // console.log("Current data: ", output)

      // docRef
      //   .get()
      //   .then(querySnapshot => {
      //     querySnapshot.docs.map(function (documentSnapshot) {
      //       return (output[documentSnapshot.id] = documentSnapshot.data())
      //     })
      //     this.setState({ dataSource: Object.entries(output) })
      //     console.log("datasource:", this.state.dataSource)
      //   })

      {/*
      this.db.collection("users").doc(currentUser.uid)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            const username = doc.data().username
            userData.push(username)
            //return doc.data()
          } else {
            console.log("No such document!")
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error)
        })
      */}
    }
    //console.log(' ================== this.userData: ', userData)
    return (
      <Container style={styles.container}>
        <View style={styles.header}>
          <LinearGradient style={styles.gradient} colors={['#92C7A9', '#386C5F']} />
          <View style={styles.headerMenu}>
            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
              <Icon style={styles.headerIcon} name="navicon" type="EvilIcons" />
            </TouchableOpacity>
          </View>
          {!this.state.isFetching &&
            <View style={styles.headerTitle}>
              <View style={styles.line}>
                <Image style={stylesProfile.avatarImg} source={require('../../resources/images/no-image.png')} />
              </View>
              <View style={styles.line}>
                <Text style={stylesProfile.displayName}>{currentUser.displayName}</Text>
              </View>
            </View>
          }
        </View>
      </Container>
    )
  }
}

const COLOR = '#D1E2D6'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1E2D6',
  },
  header: {
    //flexDirection: 'column',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: STATUS_BAR_H,
    height: 300
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300
  },
  headerMenu: {
    //flex: 0.2,
  },
  headerIcon: {
    color: '#fff',
    fontSize: 30,
  },
  headerTitle: {
    alignSelf: "center",
    flex: 0.8
  },
  headerText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: 'HelveticaNeue-Light'
  },
  line: {
    marginBottom: 10,
  }
})
const stylesProfile = StyleSheet.create({

  avatarImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: '#FFF',
    borderWidth: 5
  },
  displayName: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: 'HelveticaNeue-Light'
  }
})



