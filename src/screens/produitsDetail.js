import React, { Component } from "react"
import PropTypes from 'prop-types'
import { StyleSheet, Image, ActivityIndicator, Linking, Share, TouchableOpacity } from "react-native"
import { Container, Content, View, Text, Button, Icon } from "native-base"
import TITLE from '../components/titleHeader'
import Colors from '../constants/Colors'

export default class ProductsList extends Component {
	static propTypes = {
		title: PropTypes.string,
	}
	onShare = async (link, nom) => {
		try {
			const result = await Share.share({
				url: link,
				message: nom,
			});

			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			alert(error.message);
		}
	};
	render() {
		const produit = this.props.navigation.state.params
		const { id, nom, plante, extrait, composition, describe, attention, img, link } = produit
		if (!id) {
			return (
				<Container>
					<TITLE title={this.props.title} navigation={this.props.navigation} iconMenu={'close'} />
					<ActivityIndicator />
				</Container>
			)
		}
		return (

			<Container style={{ backgroundColor: "#f1f2f7" }}>
				<TITLE navigation={this.props.navigation} title={this.props.title} iconMenu={'close'} />
				<Content padder style={{ backgroundColor: "#f1f2f7" }}>
					<View style={[TextStyle.paragraph, { justifyContent: 'center', flexDirection: 'row' }]}>
						<Image source={img} />
					</View>
					<View style={TextStyle.paragraph}>
						<Text style={[TextStyle.line, TextStyle.headLine]}>{nom}</Text>
						<Text style={[TextStyle.line, { textAlign: 'center' }]}>{plante}</Text>
					</View>
					<View style={TextStyle.paragraph}>
						<TouchableOpacity activeOpacity={1} onPress={() => Linking.openURL(link)}>
							<Icon style={{ fontSize: 32, color: Colors.prime }} name={'md-cart'} />
						</TouchableOpacity>
					</View>
					{extrait &&
						<View style={TextStyle.paragraph}>
							<Text style={[TextStyle.line, { fontWeight: '600' }]}>Ingrédients</Text>
							<Text style={[TextStyle.line]}>{extrait}</Text>
						</View>
					}
					{composition &&
						<View style={TextStyle.paragraph}>
							<Text style={[TextStyle.line, { fontWeight: '600' }]}>Composition</Text>
							<Text style={[TextStyle.line]}>{composition}</Text>
						</View>
					}
					<View style={TextStyle.paragraph}>
						<Text style={[TextStyle.line]}>{describe && describe}</Text>
						<Text style={[TextStyle.line, { color: "#E68772", marginBottom: 5, marginTop: 5 }]}>{attention && attention}</Text>
					</View>
				</Content>
				<View style={{ flexDirection: 'row', padding: 5, justifyContent: 'center' }}>
					<View style={{ flex: 0.5, margin: 3 }}>
						<Button vertical full light style={[css.boxShadow]} onPress={() => this.onShare(link, nom)}>
							<Text numberOfLines={2} uppercase={false} style={{ textAlign: 'center', color: 'black' }}>{'Send to a friend\n'} </Text>
						</Button>
					</View>
					<View style={{ flex: 0.5, margin: 3 }}>
						<Button vertical full light style={[css.boxShadow]} onPress={() => Linking.openURL(`mailto:infoproduit@flora-natura.com?subject=${nom}`)}>
							<Text numberOfLines={2} uppercase={false} style={{ textAlign: 'center', color: 'black' }}>{'Contacter le \n fabricant'}</Text>
						</Button>
					</View>
				</View>
			</Container >
		)
	}
}

const css = StyleSheet.create({
	boxShadow: {
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 2,
		paddingBottom: 5
	},
})

const TextStyle = StyleSheet.create({
	paragraph: {
		marginBottom: 10
	},
	line: {
		marginBottom: 5
	},
	headLine: {
		color: "#92C7A9",
		fontSize: 20,
		fontWeight: '700',
		textAlign: 'center'
	}
})