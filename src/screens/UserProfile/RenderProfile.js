import React, { Component } from "react"
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, FlatList, Linking } from 'react-native'
import { Text, Button, Item, Input, Icon, Label, Card, CardItem, Right, CheckBox } from "native-base"
import { DatePicker } from '../../constants/DatePicker'
import { InputField, OutputField } from '../../constants/InputField'
import Colors from '../../constants/Colors'
import { H1, H2, TitleText, DesText } from '../../constants/StyledText'
import { styleHeader, Common, LANGUAGE, INPUT_FIELD, ALERT_MODAL } from "../../constants/common"
import { isEmpty } from "../../services/SendBird/utils";


export default class RenderProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { userProfile } = this.props
    return (
      <View style={styles.container}>
        <View>
          <View style={{ flexDirection: 'row', }}>
            <H1 style={{ flex: 0.8 }}>Informations de base</H1>
            <TouchableOpacity onPress={() => { this.props.navigation.push('UpdateUserName', { userProfile: userProfile }) }}
              style={{ flex: 0.2, justifyContent: 'flex-end', alignContent: 'flex-end', paddingBottom: 5 }}>
              <H2 icon="edit" iconType="Entypo">Éditer</H2>
            </TouchableOpacity>
          </View>
          <View style={[styles.p, Common.boxShadow]}>
            <InputField
              label={'Pseudo'}
              placeholder={userProfile.username}
              autoCapitalize="words"
              disabled={true}
              ref={ref => this.username = ref} />
            <InputField
              label={'Prénom'}
              placeholder={userProfile.firstname}
              autoCapitalize="words"
              disabled={true}
              ref={ref => this.firstname = ref} />
            <InputField
              label={'Nom'}
              ref={ref => this.lastname = ref}
              placeholder={userProfile.lastname}
              autoCapitalize="words"
              disabled={true}
            />
          </View>
        </View>
        <View>
          <View style={{ flexDirection: 'row', }}>
            <H1 style={{ flex: 0.8 }}>Informations de contact</H1>
            <TouchableOpacity onPress={() => { this.props.navigation.push('UpdateEmailTel', { userProfile: userProfile }) }}
              style={{ flex: 0.2, justifyContent: 'flex-end', alignContent: 'flex-end', paddingBottom: 5 }}>
              <H2 icon="edit" iconType="Entypo" >Éditer</H2>
            </TouchableOpacity>
          </View>
          <View style={[styles.p, Common.boxShadow]}>
            <OutputField label={LANGUAGE.Email} data={userProfile.email} />
            <OutputField label={LANGUAGE.Telephone} data={userProfile.phoneNumber} />
          </View>
        </View>
        <View>
          <View style={{ flexDirection: 'row', }}>
            <H1 style={{ flex: 0.8 }}>Autres renseignements</H1>
            <TouchableOpacity onPress={() => { this.props.navigation.push('UpdateOthers', { userProfile: userProfile }) }}
              style={{ flex: 0.2, justifyContent: 'flex-end', alignContent: 'flex-end', paddingBottom: 5 }}>
              <H2 icon="edit" iconType="Entypo">Éditer</H2>
            </TouchableOpacity>
          </View>
          <View style={[styles.p, Common.boxShadow]}>
            {/* <OutputField label={"Date de naissance"} data={"Date de naissance"} /> */}
            <OutputField label={"Code postal"} data={userProfile.postalcode} />
            <OutputField label={"Ville"} data={userProfile.ville} />
            <OutputField label={"Pays"} data={userProfile.pays} />
          </View>
        </View>
        <View>
          <View style={{ flexDirection: 'row', }}>
            <H1 style={{ flex: 0.8 }}>Spécialités</H1>
            <TouchableOpacity onPress={() => { this.props.navigation.push('UpdateSpecialties', { userProfile: userProfile }) }}
              style={{ flex: 0.2, justifyContent: 'flex-end', alignContent: 'flex-end', paddingBottom: 5 }}>
              <H2 icon="edit" iconType="Entypo">Éditer</H2>
            </TouchableOpacity>
          </View>
          <View style={[styles.p, Common.boxShadow, { flexDirection: 'row', flexWrap: 'wrap' }]}>
            {!isEmpty(userProfile.specialties) ?
              userProfile.specialties.map((item, index) =>
                <View key={index} style={styles.skillTag}>
                  <TitleText>{item}</TitleText>
                </View>
              )
              : <TouchableOpacity onPress={() => { this.props.navigation.push('UpdateSkills', { userProfile: userProfile }) }} >
                <H2 icon="md-add" iconType="Ionicons" style={{ alignSelf: 'flex-start', paddingBottom: 3, paddingTop: 3 }}>Ajouter des spécialités</H2>
              </TouchableOpacity>
            }
          </View>
          {/* <View>
          <View style={{ flexDirection: 'row', }}>
            <H1 style={{ flex: 0.8 }}>Compétences professionnelles</H1>
            <TouchableOpacity onPress={() => { this.props.navigation.push('UpdateSkills', { userProfile: userProfile }) }}
              style={{ flex: 0.2, justifyContent: 'flex-end', alignContent: 'flex-end', paddingBottom: 5 }}>
              <H2 icon="edit" iconType="Entypo">Éditer</H2>
            </TouchableOpacity>
          </View>
          <View style={[styles.p, Common.boxShadow]}>
            {!isEmpty(userProfile.skills) ?
              userProfile.skills.map((item, index) =>
                <View key={index} style={styles.line}>
                  <TitleText>{item.skillName}</TitleText>
                  {!isEmpty(item.description) && <DesText>{item.description}</DesText>}
                </View>
              )
              : <TouchableOpacity onPress={() => { this.props.navigation.push('UpdateSkills', { userProfile: userProfile }) }} >
                <H2 icon="md-add" iconType="Ionicons" style={{ alignSelf: 'flex-start', paddingBottom: 3, paddingTop: 3 }}>Ajoutez vos compétences</H2>
              </TouchableOpacity>
            }
          </View> */}
          <View>
            <View style={{ flexDirection: 'row', }}>
              <H1 style={{ flex: 0.8 }}>Connexions sociales</H1>
              <TouchableOpacity onPress={() => { this.props.navigation.push('UpdateSocial', { userProfile: userProfile }) }}
                style={{ flex: 0.2, justifyContent: 'flex-end', alignContent: 'flex-end', paddingBottom: 5 }}>
                <H2 icon="edit" iconType="Entypo">Éditer</H2>
              </TouchableOpacity>
            </View>
            <View style={[styles.p, Common.boxShadow, { flexDirection: 'row', justifyContent: 'space-around' }]}>
              {['facebook', 'youtube', 'linkedin', 'instagram'].map((item, index) => {
                if (!isEmpty(userProfile.sociales) && !isEmpty(userProfile.sociales[item])) {
                  return (
                    <TouchableOpacity key={index} onPress={() => Linking.openURL(LANGUAGE.domain[item] + userProfile.sociales[item])}>
                      <Icon style={[styles.socialIcon, { color: Colors[item], }]} key={index} name={`${item}-with-circle`} type='Entypo' />
                    </TouchableOpacity>
                  )
                }
                else return <Icon style={[styles.socialIcon, { color: 'grey' }]} key={index} name={`${item}-with-circle`} type='Entypo' />
              })}
            </View>
          </View>
        </View>

        {/* <H1>Compétences professionnelles</H1>
        <View style={[styles.p, Common.boxShadow]}>
          <H2>Ajoutez vos compétences</H2>
        </View> 
       */}
        {/* 
        <View style={[styles.p, Common.boxShadow]}>
          <TouchableOpacity onPress={() => this._updateProviderData({ type: LANGUAGE.Email, value: userProfile.email })} >
            <Label style={{ color: Colors.H2, fontSize: 13, }}>{LANGUAGE.Email} </Label>
            <View style={StylesCommon.TextField}>
              <Text style={{ lineHeight: 34, color: Colors.text }}> {userProfile.email}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._updateProviderData({ type: LANGUAGE.Telephone, value: userProfile.phoneNumber })} >
            <Label style={{ color: Colors.H2, fontSize: 13, }}>{LANGUAGE.Telephone} </Label>
            <View style={StylesCommon.TextField}>
              <Text style={{ lineHeight: 34, color: Colors.text }}> {userProfile.phoneNumber}</Text>
            </View>
          </TouchableOpacity> 
        </View>*/}

      </View >
    )
  }
}

const TEXTCOLOR = '#575757'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginBottom: 30,
  },
  p: {
    // borderColor: Colors.border,
    //borderWidth: 0.2,
    borderRadius: 5,
    backgroundColor: "#FCFCFC",
    padding: 15,
    marginBottom: 15,
  },
  line: {
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.5,
    paddingBottom: 3,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: 'HelveticaNeue-Light'
  },
  cardItem: {
    margin: 0,
    padding: 0,
  },
  button: { backgroundColor: '#72B048', borderColor: '#72B048', borderRadius: 10, marginTop: 10, alignSelf: 'center' },

  socialIcon: { fontSize: 55, padding: 5, paddingLeft: 8, paddingRight: 8 },
  skillTag: {
    backgroundColor: '#D9EDDF',
    borderRadius: 2,
    padding: 3,
    paddingLeft: 6,
    paddingRight: 6,
    marginRight: 6,
    marginRight: 6,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
})