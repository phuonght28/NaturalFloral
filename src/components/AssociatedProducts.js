import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, } from 'react-native'
import { Text, Thumbnail, } from 'native-base'
import PRODUITS from '../services/produits'
import IMAGES from '../services/images'


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
						return (
							<TouchableOpacity key={index} activeOpacity={0.7} onPress={() => { this._viewDetail(produit) }}>
								<View style={{ flexDirection: 'row', marginBottom: 8 }}>
									<View style={{ marginRight: 5 }}>
										<Thumbnail square size={55} source={img} />
									</View>
									<View style={{ flex: 1 }}>
										<Text numberOfLines={1} note style={{ fontWeight: '600', color: '#85cfcd' }}>{nom}</Text>
										<Text numberOfLines={1} note>{describe}</Text>
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
