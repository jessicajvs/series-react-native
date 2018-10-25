import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'; 

const SerieCard = ({ serie, onNavigate }) => (
		<TouchableOpacity 
			onPress={() => onNavigate({serie})}
			style={styles.container}>
			<View style={styles.card}>
				{
					serie.img 
					? 
					<Image 
						source={{uri: serie.img}}
						style={styles.image}
						aspectRatio={1}
					/>
					: 
					<Image
						source={require("../../assets/sem_imagem.png")}
						style={styles.image}
						aspectRatio={1}
					/>
				}
				<View style={styles.cardTitle}>
					<Text style={styles.cardTextTitle}>{serie.title}</Text>
				</View>
			</View>
		</TouchableOpacity>
);

const styles = StyleSheet.create({
	container:{
		//Pega a largura da tela e divide por 2 pra ficar quadrado o card
		//height: ((Dimensions.get('window').width) / 2),
		width: '50%',
		paddingTop:1 ,
		paddingBottom:9 ,
		paddingLeft:5 ,
		paddingRight:5 
	},
	card:{
		flex:1,
		backgroundColor: '#212529',
	},
	cardTitle:{
		alignItems: 'center',
		position: 'absolute',
		bottom: 0 ,
		backgroundColor: '#212529',
		opacity: 0.8,
		width: '100%'
	},
	cardTextTitle:{
		padding: 3,
		color: '#fff',
		fontSize: 14,
	},
	image:{
		resizeMode: 'contain'
	}
});

export default SerieCard;