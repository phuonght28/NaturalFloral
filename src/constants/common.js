const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
import { StyleSheet, PixelRatio } from 'react-native'

import LanguageFrench from "./LanguageFrench"
import { STATUS_BAR_Height } from './Layout'
import { InputField } from "./InputField"
const STATUS_BAR_H = STATUS_BAR_Height()
import { AlertModal, H1, H2 } from "./StyledText"
import Colors from './Colors'

import SPECIALTIES from ' ../parsers/specialties'

export const NEWSPECIALTIES = SPECIALTIES
export const LANGUAGE = LanguageFrench
export const INPUT_FIELD = InputField
export const ALERT_MODAL = AlertModal

export const Common = StyleSheet.create({
    boxShadow: {
        elevation: 3,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: Colors.shadow,
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    button: { backgroundColor: '#72B048', borderColor: '#72B048', borderRadius: 3, marginTop: 10, alignSelf: 'center' },
    buttonText: {
        fontSize: 18,
        fontFamily: 'HelveticaNeue-Light'
    }
})


export const styleHeader = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: "#92C7A9",
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        paddingBottom: 5,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: STATUS_BAR_H,
        //height: Platform.OS === "ios" ? 64 : 56,
    },
    left: {
        alignItems: "flex-start"
    },
    right: {
        alignItems: 'flex-end'
    },
    headerIcon: {
        backgroundColor: "#92C7A9",
        flex: 0.2,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    headerTitle: {
        backgroundColor: "#92C7A9",
        flex: 0.6,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    title: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "500",
        fontFamily: 'HelveticaNeue-Light',
        lineHeight: 27,
        //textAlign: "center",
    },
    icon: {
        color: "#fff",
        fontSize: 24,
        lineHeight: 27,
    },
    text: {
        color: "#FFF",
        fontFamily: 'HelveticaNeue-Light',
        lineHeight: 27,
    }
})

export const styleUserPhoto = StyleSheet.create({
    contain: {
        // backgroundColor: 'red',
        // justifyContent: 'center',
        // padding: 5,
        // alignItems: 'center'
    },
    avatar: {
        borderRadius: 60,
        width: 120,
        height: 120,
        padding: 1,
        borderWidth: 1,
        borderColor: '#9B9B9B',
    },
})
export const StyleWidget = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    button: {
        backgroundColor: "#fff",
        borderRadius: 5,
        flexBasis: '23%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    icon: {
        color: "#92C7A9",
        padding: 0
    },
    blockSort: {
        backgroundColor: '#F6F6F6',
        borderRadius: 5,
        borderColor: '#C9C9C9',
        borderWidth: 0.5,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        display: 'flex',
    },
    buttonSort: {
        // backgroundColor: 'pink',
        flexDirection: 'row', 
        // flexBasis: `${(100 / 3)-2}%`,
        // flexBasis: '30%',
        // margin: `${10 / 6}%`,
        marginBottom: 5,
        marginTop: 5,
        // margin: '1%',
        alignContent: 'center',
        justifyContent: 'center'
    },
    textSort: {
        color: "#92C7A9",
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 30,
    },
    iconSort: {
        fontSize: 20,
        marginLeft: 5,
    },
    activeSort: {
        fontWeight: '700'
    }
})


