import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const ButtonCustom = ({ title, onPress }) => (
	<TouchableOpacity onPress={onPress}>
		<View style={styles.container}>
			<Text style={styles.text}>{ title }</Text>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container:{
	  padding:  10,
	  backgroundColor: '#212529',
	  borderRadius:5,
	  width: '100%',
	},
	text:{
		color: '#fff',
		textAlign: 'center',
		fontWeight: 'bold' 
	}
});

export default ButtonCustom;
