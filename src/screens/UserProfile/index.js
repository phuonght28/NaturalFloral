import React, { Component } from 'react'
import { StackNavigator, createStackNavigator } from 'react-navigation'
import PropTypes from 'prop-types'
import ProfileScreen from './ProfileScreen'
import UpdateUserName from './UpdateUserName'
import UpdateEmailTel from './UpdateEmailTel'
import UpdateOthers from './UpdateOthers'
import UpdateSkills from './UpdateSkills'
import UpdateSocial from './UpdateSocial'
import UpdateSpecialties from './UpdateSpecialties'

export default class UserProfileScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    game: PropTypes.object,
    getRoutes: PropTypes.func
  }

  _openMenu = () => {
    this.props.navigation.openDrawer()
  }

  _createStackNavigator() {
    return createStackNavigator({
      ProfileScreen: { screen: (props) => <ProfileScreen openDrawer={this._openMenu} {...props} /> },
      UpdateUserName: { screen: (props) => <UpdateUserName openDrawer={this._openMenu} {...props} /> },
      UpdateEmailTel: { screen: (props) => <UpdateEmailTel openDrawer={this._openMenu} {...props} /> },
      UpdateOthers: { screen: (props) => <UpdateOthers openDrawer={this._openMenu} {...props} /> },
      UpdateSkills: { screen: (props) => <UpdateSkills openDrawer={this._openMenu} {...props} /> },
      UpdateSocial: { screen: (props) => <UpdateSocial openDrawer={this._openMenu} {...props} /> },
      UpdateSpecialties: { screen: (props) => <UpdateSpecialties openDrawer={this._openMenu} {...props} /> },

    },
      {
        headerMode: 'none',
        initialRouteName: "ProfileScreen",
      })
  }

  render() {
    const Screen = this._createStackNavigator()
    return <Screen />
  }
}
