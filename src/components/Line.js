import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Line = ({ label = "", content = "", isTitle = "" }) => {
	return (
		<View style={styles.line}>
			{(label == "" ? null : 
				(<Text style={[
					styles.cell,
					styles.label,
					label.length > 8 ? styles.longLabel : null
				]}>{ label }</Text>)
			)}
			<Text style={[styles.content, (isTitle != "" ? styles.title : styles.cell)]}>{ content }</Text>
		</View>
	);
}
 
const styles = StyleSheet.create({
	line: {
		flexDirection: 'row',
		paddingTop: 3,
		paddingBottom: 3,
	},
	cell: {
		fontSize: 12,
	},
	label: {
		fontWeight: 'bold',
	},
	content: {
		textAlign:  'justify' 
	},
	longLabel: {
		fontSize: 12,
	},
	title:{
		fontWeight: 'bold',
		fontSize: 18,
	},
});

export default Line;