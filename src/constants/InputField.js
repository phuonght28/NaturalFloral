import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Label, Item, Text } from "native-base"
import { Icon } from 'expo';

import Colors from './Colors'
import { H1, H2, TitleText, DesText } from './StyledText'
import { isEmpty } from "../services/utils";

export class InputField extends React.Component {
  static defaultProps = {
    focus: () => { },
    style: {},
    placeholder: '',
    blurOnSubmit: false,
    returnKeyType: 'next',
    error: false,
    keyboardType: null,
    secureTextEntry: false,
    autoCapitalize: "none",
    multiline: false,
    numberOfLines: 1,
    value: ''
  }

  state = { text: this.props.value }
  getInputValue = () => this.state.text
  render() {
    return (
      <View>
        {this.props.label && <Label style={[styles.label]}>{this.props.label}</Label>}
        <Item style={[styles.input, this.props.style,
        this.props.error ? styles.containerError : {},
        this.props.noBorder ? { borderBottomWidth: 0, paddingBottom: 10, } : {}
        ]}>
          {this.props.icon &&
            // <Icon style={[styles.icon]} name={this.props.icon} type="Ionicons" />
            <Icon.Ionicons
              name={this.props.icon}
              style={[styles.icon]}
            />
          }
          <Input
            multiline={this.props.multiline}
            numberOfLines={this.props.numberOfLines ? this.props.numberOfLines : this.props.multiline ? 4 : 1}
            disabled={this.props.disabled ? true : false}
            style={[styles.text, this.props.styleText]}
            value={this.state.text}
            //selectionColor={'#fff'}
            autoCapitalize={this.props.autoCapitalize}
            ref={ref => this.input = ref}
            autoCorrect={false}
            underlineColorAndroid='transparent'
            secureTextEntry={this.props.secureTextEntry}
            blurOnSubmit={this.props.blurOnSubmit}
            keyboardType={this.props.keyboardType}
            returnKeyType={this.props.returnKeyType}
            placeholder={this.props.placeholder}
            onSubmitEditing={this.props.focus(this.props.label ? this.props.label : this.props.placeholder)}
            placeholderTextColor={TEXTCOLOR}
            onChangeText={(text) => { this.setState({ text }) }}
          />
          {this.props.error &&
            //  <Icon style={[styles.icon]} name='md-close' type="Ionicons" />
            <Icon.Ionicons style={[styles.icon]} name={'md-close'} />
          }
        </Item>
      </View>
    )
  }
}

export class OutputField extends React.Component {
  static defaultProps = {
    focus: () => { },
    style: {},
    styleLine: {},
    styleLabel: {},
    label: '',
    data: '',
  }
  render() {
    return (
      <View style={[styles.line, this.props.styleLine]}>
        <Label style={[{ color: Colors.H2, fontSize: 13 }, this.props.styleLabel]}>{this.props.label}: </Label>
        {!isEmpty(this.props.data) ?
          <Text style={[styles.text, this.props.styleText]}>{this.props.data}</Text>
          : <H2 icon="md-add" iconType="Ionicons" style={{ alignSelf: 'flex-start', paddingBottom: 3, paddingTop: 3 }}>Ajouter des {this.props.label} </H2>}
      </View>
    )
  }
}

const TEXTCOLOR = Colors.text
const styles = StyleSheet.create({
  input: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.5,
    paddingBottom: 3,
    marginBottom: 15,
    //marginTop: 5,
    // padding: 0,
    //marginLeft: 15,
    //marginRight: 15,
  },
  hasLabel: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  label: {
    color: Colors.H2,
    fontSize: 13,
  },
  icon: {
    color: TEXTCOLOR,
    fontSize: 20,
    //lineHeight: 46,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    color: TEXTCOLOR,
    width: '100%',
    lineHeight: 22,
    height: 'auto',
    marginLeft: 0,
    paddingLeft: 0,
  },
  containerError: {
    backgroundColor: '#EF9A9A',
    borderWidth: 1,
    borderColor: '#E57373',
  },
  line: {
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.5,
    paddingBottom: 3,
    marginBottom: 10,
  },
})
