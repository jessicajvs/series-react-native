import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  View,
  Button
} from 'react-native';
import { connect } from 'react-redux';

import { deleteSerie } from '../actions';
import Line from '../components/Line';
import LongText from '../components/LongText';

class SerieDetailPage extends React.Component {
  render() {
  	const { navigation } = this.props;
  	const { serie } = navigation.state.params;

    return (
      <ScrollView style={styles.container}>
      	 <View style={styles.containerImage}>
      	 	{
      	 		serie.img 
				? 
				<Image 
			  		source={{uri: serie.img }}
			  		style={styles.image}
			  		aspectRatio={1}
			  	 />
			  	 :
			  	 <Image
					source={require("../../assets/sem_imagem.png")}
					style={styles.imageVazia}
					aspectRatio={1}
				/>
      	 	}
      	 </View>
      	 <View style={styles.containerText}>
	      	 <Line content={serie.title} isTitle="true" />
	      	 <Line label={`${serie.rate}% relevante`} />
	      	 <Line label="Gênero: " content={serie.gender} />
	      	 <LongText  label="Descrição: " content={serie.description} />
      	 </View>
      	 <View style={styles.containerText}>
      	   <Button color="#000" title="Editar" onPress={() => navigation.replace('SerieForm', { serieToEdit: serie } )}/>
         </View>
         <View style={styles.containerText}>
      	   <Button color="#FC3A46" title="Excluir" onPress={ async () => {
      	   		const hasDeleted = await this.props.deleteSerie(serie);
      	   		if(hasDeleted) 
      	   			navigation.goBack();
      	   }}/>
         </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
	container:{
	},
	containerText:{
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 10,
	},
	containerImage:{
		paddingTop: 28,
		backgroundColor: 'black',
	},
	image:{
		resizeMode: 'contain',
		backgroundColor: 'black'
	},
	imageVazia:{
		resizeMode: 'contain',
		backgroundColor: 'black',
		alignSelf: 'center'
	},
});


export default connect(null, { deleteSerie })(SerieDetailPage);



