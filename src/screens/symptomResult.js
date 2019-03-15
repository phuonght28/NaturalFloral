import React, { Component } from "react"
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { Container, Content, Thumbnail } from "native-base"
import IMAGES from '../services/images'
import PRODUITS from '../services/parsers/produits'
import PLANTES from '../services/parsers/plantes'
import TitleHeader from "../components/titleHeader"

export default class SymptomResult extends Component {
	constructor(props) {
		super(props)
		this.state
	}

	_renderListSymptoms(symtome) {
		let listAssocies = []
		PRODUITS.map((produit) => {
			if (produit.keyword && produit.keyword != "") {
				let listKeyword = produit.keyword
				listKeyword = listKeyword.split(",")
				listKeyword.map((keyword) => {
					let item = []
					keyword = keyword.toLowerCase()
					keyword = keyword.replace(" -", "-")
					keyword = keyword.replace("- ", "-")
					keyword = keyword.replace(" - ", "-")
					keyword = keyword.replace("-", " - ")
					if (keyword != "" && keyword == symtome) {
						item.id = produit.id
						item.nom = produit.nom
						item.describe = produit.describe
						item.img = IMAGES.getProduitsImages(produit.id)
						item.screenProps = 'ProductsDetail'
						listAssocies.push(item)
					}
				})
			}
		})
		PLANTES.map((plante) => {
			if (plante.keyword && plante.keyword != "") {
				let listKeyword = plante.keyword
				listKeyword = listKeyword.split(",")
				listKeyword.map((keyword) => {
					let item = []
					keyword = keyword.toLowerCase()
					keyword = keyword.replace(" -", "-")
					keyword = keyword.replace("- ", "-")
					keyword = keyword.replace(" - ", "-")
					keyword = keyword.replace("-", " - ")
					if (keyword != "" && keyword == symtome) {
						item.id = plante.id
						item.nom = plante.nom
						item.describe = plante.description_botanique
						item.img = IMAGES.getPlantesImages(plante.id)
						item.screenProps = 'PlantesDetail'
						listAssocies.push(item)
					}
				})
			}
		})
		return listAssocies
	}
	_viewDetail(item) {
		const id = item.id
		const screenProps = item.screenProps
		if (screenProps == 'PlantesDetail') {
			this.props.navigation.navigate('PlantesDetail', { id })
		}
		else if (screenProps == 'ProductsDetail') {
			const produit = PRODUITS.find((item) => item.id == id)
			produit.img = IMAGES.getProduitsImages(produit.id)
			this.props.navigation.navigate('ProductsDetail', produit)

		}

	}
	render() {
		let symtome = ''
		if (this.props.navigation.state.params != undefined && this.props.navigation.state.params.symptom != undefined) {
			symtome = this.props.navigation.state.params.symptom
		}
		else {
			symtome = 'Found Nothing !!! '
		}
		const listSymptoms = this._renderListSymptoms(symtome)
		return (
			<Container style={{ backgroundColor: "#f1f2f7" }}>
				<TitleHeader title={'Liste des résultats'} navigation={this.props.navigation} iconMenu={'goBack'} />
				<Content padder style={{ backgroundColor: "#f1f2f7", padding: 10 }}>
					<View style={TextStyle.paragraph}>
						<Text style={TextStyle.headLine}><Text style={{ color: 'grey' }}>Résultat(s) pour: </Text>{symtome}</Text>
					</View>
					<ScrollView>
						{listSymptoms.map((symptom, index) =>
							<View key={index} style={[TextStyle.paragraph, TextStyle.listLine]}>
								<TouchableOpacity activeOpacity={0.7} onPress={() => { this._viewDetail(symptom) }}>
									<View style={[TextStyle.paragraph, { flexDirection: 'row' }]}>
										<View style={{ marginRight: 5 }}>
											<Thumbnail style={TextStyle.Thumbnail} square size={55} source={symptom.img} />
										</View>
										<View style={{ flex: 1 }}>
											<Text numberOfLines={1} note style={{ fontWeight: '600', color: '#457A82' }}>{symptom.nom}</Text>
											<Text numberOfLines={1} note>{symptom.describe}</Text>
										</View>
									</View>
								</TouchableOpacity>
							</View>
						)}
					</ScrollView>
				</Content>
			</Container>
		)
	}
}


const COLOR_PLANT = '#E4EEDC'
const TextStyle = StyleSheet.create({
	paragraph: {
		marginBottom: 10
	},
	line: {
		fontFamily: 'Montserrat-LightItalic',
		marginBottom: 5
	},
	headLine: {
		color: '#005919',
		fontSize: 15,
		fontWeight: '600',
		fontFamily: 'Montserrat-MediumItalic',
		marginBottom: 8
	},
	Thumbnail: {
		padding: 5,
		margin: 2,
		backgroundColor: COLOR_PLANT,
		borderColor: COLOR_PLANT,
		borderRadius: 5,
		borderWidth: 0.5,
	},
	listLine: {
		borderBottomColor: 'grey',
		borderBottomWidth: 1,
	}

})