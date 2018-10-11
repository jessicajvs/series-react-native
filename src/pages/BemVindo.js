import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Button,
  ImageBackground
} from 'react-native';

export default class BemVindo extends React.Component {
constructor(props){
    super(props);

    this.state = {
    };
  }
  render() {
    return (
      	
	    <ImageBackground source={require('../img/moto.jpeg')} style={styles.backgroundImage}> 
		    <View style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1}} >
			    <Text style={styles.title}>Bem vindo à rapify</Text>
			    
			    <View style={styles.content}>
					<Text style={styles.text}>Ligando usuários que querem gerar renda entregando pedidos com usuários que precisam de restaurantes, supermercados, farmácias, produtos de bebidas ou qualquer outra coisa.</Text>
				</View>
				<View style={styles.content}>
				    <Button title="Entrar" onPress={() => {
		                   this.props.navigation.navigate('Login')
		                }}/>
					<View style={styles.separator}/>
					<Button title="Cadastrar" onPress={() => {
		                   this.props.navigation.navigate('Login')
		                }} />
				</View>
			</View>
		</ImageBackground>
		
    );
  }
}

const styles = StyleSheet.create({


	title: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 40,
		textAlign: 'center',
		paddingTop: 95
	},
	text: {
		color: '#DDDDDD',
		fontSize: 18,
		textAlign: 'center',
		padding: 15,
		fontFamily: 'notoserif',
		justifyContent: 'center',
	},
	backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        flexDirection: 'column',
        display: 'flex',
    },
    content: {
    	alignSelf:  'center' ,
    	flex: 1,
    	display: 'flex',
    	justifyContent: 'flex-end',
    	padding: 10,
    	paddingBottom: 30,
    	width: 415,
    },
    separator:{
    	height: 15,
    },
    textoBotao:{
    	color: '#fff',
    }

});
