import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, } from 'react-native'
import { Text, Thumbnail, Icon, } from 'native-base'
import PRODUITS from '../parsers/produits'
import IMAGES from '../services/images'
import Colors from '../constants/Colors'


export default class AssociatedProducts extends Component {
	constructor(props) {
		super(props)
	}
	_viewDetail(produit) {
		this.props.navigation.navigate('ProductsDetail', produit)
	}
	render() {
		const { produits_associes } = this.props
		if (produits_associes && produits_associes.length > 0) {
			let listProduitAssocies = []
			produits_associes.map((id) => {
				let relatedProduct = PRODUITS.find((produit) => produit.id == id)
				if (relatedProduct != undefined) {
					listProduitAssocies.push(relatedProduct)
				}
			})
			return (
				<View style={{ marginBottom: 5 }}>
					{listProduitAssocies.map((produit, index) => {
						produit.img = IMAGES.getProduitsImages(produit.id)
						const { nom, describe, img } = produit
						console.log(produit)
						return (
							<TouchableOpacity key={index} activeOpacity={0.7} onPress={() => { this._viewDetail(produit) }}>
								<View style={{ flexDirection: 'row', marginBottom: 8, justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
									<View style={{ flexDirection: 'row', flex: 0.8, alignContent: 'center', alignItems: 'center' }}>
										<View style={{ marginRight: 10 }}>
											<Thumbnail square size={55} source={img} />
										</View>
										<View>
											<Text numberOfLines={1} note style={{ fontWeight: '600', color: '#85cfcd' }}>{nom}</Text>
											<Text numberOfLines={2} note>{describe}</Text>
										</View>
									</View>
									<View style={{ alignContent: 'center', alignItems: 'center' }}>
										<Icon style={{ fontSize: 28, color: Colors.prime }} name={'md-cart'} />
									</View>
								</View>
							</TouchableOpacity>
						)
					}
					)}
				</View>
			)
		}
		else {
			return <Text style={{ fontSize: 12 }}>Pas de produit associé</Text>
		}
	}
}
