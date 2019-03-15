import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Icon, Right } from "native-base"
import Colors from './Colors'

export class BoldText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontWeight: '700' }]} />
  }
}
export class H1 extends React.Component {
  render() {
    return (
      <Text {...this.props} style={[{ color: Colors.H1, fontWeight: '600', fontSize: 16, lineHeight: 32 }, this.props.style]} />
    )
  }
}
export class H2 extends React.Component {
  render() {
    return (
      <View style={[{ flexDirection: 'row', }, this.props.icon && { alignItems: 'flex-end', alignSelf: 'flex-end' }, this.props.style]}>
        {this.props.icon && <Icon name={this.props.icon} type={this.props.iconType} style={[{ color: Colors.H2, fontSize: 13, lineHeight: 20, marginRight: 3 }, this.props.iconStyle]} />}
        <Text {...this.props} style={[{ color: Colors.H2, fontWeight: '500', fontSize: 13, lineHeight: 20 }, this.props.textStyle]} />
      </View>
    )
  }
}

export class TitleText extends React.Component {
  render() {
    return (
      <View style={[{ flexDirection: 'row' }, this.props.style]}>
        {this.props.icon && <Icon name={this.props.icon} type={this.props.iconType} style={[_TitleText.icon, this.props.styleIcon]} />}
        <Text style={[_TitleText.title, this.props.styleText]} {...this.props} />
      </View>
    )
  }
}

export class DesText extends React.Component {
  render() {
    return (
      <Text style={[_TitleText.text, this.props.styles]} {...this.props} />

    )
  }
}
const _TitleText = StyleSheet.create({
  title: {
    color: Colors.text,
    // color: '#203B62',
    lineHeight: 24,
    fontSize: 16,
    fontWeight: '400'
  },
  icon: {
    color: Colors.text,
    marginRight: 3,
    lineHeight: 24
  },
  text: {
    color: Colors.H2,
    lineHeight: 20
  }
})


export class IconNotificaton extends React.Component {
  render() {
    return (
      <View style={styles.IconNotificatonView}>
        <Text style={styles.IconNotificatonText} adjustsFontSizeToFit {...this.props} />
      </View>
    )
  }
}
export class AppNotificaton extends React.Component {
  render() {
    let colorBrand
    switch (this.props.type) {
      case 'success':
        colorBrand = Colors.brandSuccess
        break
      case 'danger':
        colorBrand = Colors.brandDanger
        break
      case 'warning':
        colorBrand = Colors.brandWarning
        break
      default:
        colorBrand = '#d8dce6'
    }

    const background = { backgroundColor: colorBrand }
    return (
      <View style={[styles.AppNotificatonView, this.props.style, background]}>
        <Text style={styles.AppNotificatonText} adjustsFontSizeToFit {...this.props} />
      </View>
    )
  }
}
export class AlertModal extends React.Component {
  render() {
    let colorBrand, iconName
    switch (this.props.type) {
      case 'success':
        colorBrand = Colors.brandSuccess
        iconName = 'check-circle'
        break
      case 'error':
      case 'danger':
        colorBrand = Colors.brandDanger
        iconName = 'error'
        break
      case 'warning':
        colorBrand = Colors.brandWarning
        iconName = 'warning'
        break
      default:
        colorBrand = '#d8dce6'
        iconName = 'info'
    }

    const borderTopColor = { borderTopColor: colorBrand }
    return (
      <View style={[styles.AlertModalBox, this.props.style, borderTopColor]}>
        <Icon style={[styles.AlertModalIcon, { color: colorBrand }]} name={iconName} type='MaterialIcons' />
        <Text style={[styles.AlertModalText, { color: colorBrand }]} {...this.props} />
      </View>
    )
  }
}
export class ChatTime extends React.Component {
  render() {
    return (
      <Text numberOfLines={1} style={[styles.ChatTime, this.props.style]}  {...this.props} />
    )
  }
}
export class CoverImage extends React.Component {
  render() {
    return (
      <Image style={[styles.CoverImage, this.props.style]} {...this.props} source={{ uri: this.props.source }} />
    )
  }
}
const styles = StyleSheet.create({
  TitleText: {
    color: Colors.text,
  },
  TitleSub: {
    color: Colors.H1,
  },
  CoverImage: {
    backgroundColor: '#d8dce6',
    width: 50,
    height: 50,
    borderColor: '#fff',
    borderWidth: 0.5,
  },

  ChatTime: {
    color: '#575757',
    fontFamily: 'HelveticaNeue-Light',
    height: 30,
    lineHeight: 30,
    fontSize: 12,
    textAlign: 'right',
  },
  IconNotificatonView: { backgroundColor: Colors.brandDanger, borderRadius: 3, alignItems: 'center', padding: 2, minWidth: 16 },
  IconNotificatonText: { backgroundColor: 'transparent', color: '#FFFFFF', textAlign: 'center', lineHeight: 16, fontSize: 12, fontWeight: '700' },
  AppNotificatonView: { backgroundColor: Colors.brandDanger, justifyContent: "center", alignSelf: "stretch", padding: 3 },
  AppNotificatonText: { backgroundColor: 'transparent', color: '#FFFFFF', textAlign: 'center' },
  AlertModalBox: { backgroundColor: '#FFFFFF', borderTopWidth: 2, borderRadius: 5, flexDirection: 'row', padding: 3 },
  AlertModalText: { fontWeight: '400', fontSize: 16, lineHeight: 24 },
  AlertModalIcon: { fontSize: 24, paddingRight: 6 },

})
