const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
import Colors from './Colors'

export default {
  TextField: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.5,
    marginBottom: 15,
  },
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
    //borderRadius: 8,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: Colors.shadow,
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  widgetButton: { borderColor: "#fff", borderRadius: 5, borderWidth: 0.5, backgroundColor: "#fff" },
  widgetIcons: { color: "#92C7A9", padding: 0 },

  itemName: {
    fontSize: 15,
    lineHeight: 22,
    color: '#00a486',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  mb10: {
    marginBottom: 5,
    marginTop: 5
  }
};
