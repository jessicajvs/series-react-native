import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = props => (
	<Text style={style.title}>{ props.title }</Text>
);

const style = StyleSheet.create({
	title:{
		paddingTop:  25,
		paddingBottom:  10,
		fontSize: 16,
		alignSelf:  'center',
		fontWeight: 'bold'
	},
});

export default Header;
