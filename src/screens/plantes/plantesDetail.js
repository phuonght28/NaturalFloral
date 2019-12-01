import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AsyncStorage, Platform, StyleSheet, View, ActivityIndicator, KeyboardAvoidingView, ImageBackground, Dimensions, Text, ScrollView, Animated } from 'react-native'
import { Container, Content, Header, Button, Icon, Left, Right, Body, Tabs, Fab, Tab } from 'native-base'
import TITLE from '../../components/titleHeader'
import PlanteDetail from '../../components/PlanteDetail'
import STORAGE from '../../services/Storage'

const HEADER_MAX_HEIGHT = Dimensions.get("window").height / 3.5
const HEADER_MIN_HEIGHT = 0
const HEADER_SCROLL_DISTANCE = Dimensions.get("window").height / 3.5

export default class PlantesDetail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isSendBird: false,
			isReady: false,
			isFetching: true,
			scrollY: new Animated.Value(0)
		}
		this.HEADER_H = Dimensions.get("window").height / 3.5
		this._previousHeaderHeight = 0
		this._readyForAnimation = true
		this.propsPlanteID
	}

	async componentWillMount() {
		this.propsPlanteID = this.props.navigation.state.params.id
		await AsyncStorage.getItem('FAVORITE').then(async (FAVORITE) => {
			FAVORITE = JSON.parse(FAVORITE)
			await STORAGE.getPlanteDetail(this.propsPlanteID, FAVORITE).then(async (plante) => {
				this.setState({ isFetching: true, plante, FAVORITE }, () => {
					this.setState({ isFetching: false })
				})
			})
		})
	}

	handleScroll = event => {
		const currentOffset = event.nativeEvent.contentOffset.y
		const goingDown = currentOffset < this._previousHeaderHeight
		if (!this._readyForAnimation) {
			return
		}
		if (goingDown) {
			if (currentOffset < 20) {
				if (this._previousHeaderHeight > 20) {
					this._readyForAnimation = false
					// Expand
					Animated.timing(this.state.scrollY, {
						toValue: 0,
						duration: 300
					}).start(() => {
						this._readyForAnimation = true
					})
				}
			}
		}
		else if (currentOffset > 250) {
			if (this._previousHeaderHeight < 250) {
				this._readyForAnimation = false
				// Collapse
				Animated.timing(this.state.scrollY, {
					toValue: 100,
					duration: 300
				}).start(() => {
					this._readyForAnimation = true
				})
			}
		}
		this._previousHeaderHeight = currentOffset
	}
	render() {

		const headerHeight = this.state.scrollY.interpolate({
			inputRange: [0, 50, HEADER_SCROLL_DISTANCE],
			outputRange: [HEADER_MAX_HEIGHT, 50, HEADER_MIN_HEIGHT],
			extrapolate: 'clamp'
		})
		const { plante, isFetching } = this.state
		if (!isFetching) {
			return (
				<Container style={{ flex: 1 }}>
					<Animated.View >
						<ImageBackground style={[StyleSheet.absoluteFill]} source={plante.img} />
						<Header hasTabs style={{ backgroundColor: 'rgba(0,0,0,0.2)', height: this.HEADER_H }} >
							<Left style={{ flex: 0.2 }}>
								<Button transparent onPress={() => this.props.navigation.goBack()}>
									<Icon style={headerStyle.icon} name='arrow-back' />
								</Button>
							</Left>
							<Body>
								<Text style={headerStyle.title}>{plante.nom} </Text>
								<Text style={[headerStyle.title, { fontSize: 16, fontStyle: 'italic' }]}>{plante.nom_latin}</Text>
							</Body>
							<Right style={{ flex: 0.2 }} />
						</Header>
					</Animated.View>
					<Container key={'Détail'} tabLabel={'Détail'} style={{}}>
						<ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }} onScroll={this.handleScroll} scrollEventThrottle={100} >
							<PlanteDetail navigation={this.props.navigation} plante={plante} />
						</ScrollView>
					</Container>
				</Container >
			)
		}
		return (
			<Container style={{ backgroundColor: "#92C7A9" }}>
				<TITLE title={this.props.title} navigation={this.props.navigation} iconMenu={'close'} />
				<Content padder style={{ backgroundColor: "#f1f2f7" }}>
					<ActivityIndicator />
				</Content>
			</Container >
		)
	}



}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	tabBar: {
		backgroundColor: '#fff',
		borderColor: '#737373',
		borderBottomWidth: 4
	},
	label: {
		fontFamily: 'Roboto_medium',
		fontSize: 18,
		width: 100,
		textAlign: 'center',
	},
	indicator: {
		backgroundColor: '#92C7A9',
		bottom: -4
	}
})
const headerStyle = StyleSheet.create({
	title: { color: "#FFF", fontSize: 36, fontWeight: '300' },
	icon: { color: "#fff", fontSize: 30 }
})
