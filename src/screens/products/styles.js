const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 8,
    marginBottom: 30
  },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 40 : 50,
    top: Platform.OS === "android" ? 35 : 60,
    width: 280,
    height: 100
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
  },
  gridView: {
    flex: 1
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  boxShadow: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    paddingBottom: 5
  },
  boxInfo: {

  },

  itemName: {
    fontWeight: "700",
    color: '#FFF',
  },
  itemPack: {
    fontSize: 11,
    color: '#FFF',
  },
  itemBox: {
    fontSize: 11,
    color: '#FFF',
  },

  mb10: {
    marginBottom: 5,
    marginTop: 5
  },

  flag: {
    backgroundColor: "#96CCAD",
    height: 60,
    marginRight: 20,
    marginBottom: 10,
    marginLeft: -5,
    paddingLeft: 15,
    paddingRight: 10,
    justifyContent: 'center',
    alignSelf: 'flex-start'
  },
  flagBottom: {
    position: 'absolute',
    right: -15,
    bottom: 0,
    width: 0,
    height: 0,
    borderRightWidth: 15,
    borderRightColor: 'transparent',
    borderTopWidth: 30,
    borderTopColor: '#96CCAD',
    borderBottomWidth: 30,
    borderBottomColor: '#96CCAD'
  },
  mb: {
    marginBottom: 15
  }
};
