import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  Picker,
  Slider,
  ActivityIndicator,
  Alert
} from 'react-native';
import { connect } from 'react-redux'; 

import ButtonCustom from '../components/ButtonCustom';
import FormRow from '../components/FormRow';
import { resetForm, setField, saveSerie, setWholeSerie } from '../actions';


/*
Passos de criação:
- Pedaço do estado/state - no reducers/index.js
- Criar reducer
- Criar action
- Conectar o SerieFormPage
*/
class SerieFormPage extends React.Component {
	constructor(props){	
		super(props);

		this.state = {
			isLoading: false
		}
	}

	componentDidMount() {
		const { navigation, setWholeSerie, resetForm } = this.props;
		const { params } = navigation.state; 
		if(params && params.serieToEdit){
			setWholeSerie(params.serieToEdit);
		} else {
			resetForm();
		}
	}

	renderButton() {
		if(this.state.isLoading)
			return <ActivityIndicator />;

		const { saveSerie, serieForm, navigation } = this.props;
		return (
			<ButtonCustom title="SALVAR" 
				onPress={ async () => {
					this.setState({ isLoading: true });
					try{
						await saveSerie(serieForm); //espera carregar essa função depois carrega o restante do código
						navigation.goBack();
					} catch (error) {
						Alert.alert("Erro!", error.message);
					} finally { //Vai executar dando catch ou não
						this.setState({ isLoading: false });
					}
				}} 
			/>
		);
	}

	render(){
		const { serieForm, setField, saveSerie, navigation } = this.props;
		return ( 
		 	<ScrollView style={styles.container}>
		 		<FormRow>
					<Text style={ styles.label }>Título</Text>
					<TextInput
						underlineColorAndroid="#000"
						style={ styles.input }
						placeholder="La Casa de Papel"
						value={serieForm.title}
						onChangeText={value => setField('title', value)}
					/>
					<Text style={ styles.label }>Banner</Text>
					<TextInput
						underlineColorAndroid="#000"
						autoCapitalize="none" 
						style={ styles.input }
						placeholder="https://assets0.minhaserie.com.br/uploads/editor_pictures/000/058/692/content_pic.jpg"
						value={serieForm.img}
						onChangeText={value => setField('img', value)}
					/>

					{/* COMBOBOX - PICKER */}
					<Text style={ styles.label }>Gênero</Text>
					<Picker
						selectedValue={serieForm.gender}
						onValueChange={(itemValue, itemIndex) => setField('gender', itemValue)}
						>
						<Picker.Item label="Drama" value="Drama" />
						<Picker.Item label="Comédia" value="Comédia" />
						<Picker.Item label="Ficção Científica" value="Ficção Científica" />
						<Picker.Item label="Ação" value="Ação" />
						<Picker.Item label="Terror" value="Terror" />
					</Picker>

					<View style={styles.sameRow}>
						<Text style={ styles.label }>Avaliação</Text>
						<Text style={ styles.label }>{`${serieForm.rate}%`}</Text>
					</View>
					<Slider 
						minimumValue={ 0 }
						maximumValue={ 100 } 
						onValueChange={value => setField('rate', value) }
						value={serieForm.rate} 
						step={10}
					/>

					{/* TextArea */}
					<Text style={ styles.label }>Descrição</Text>
					<TextInput
						underlineColorAndroid="#000"
						style={ styles.input }
						placeholder="Descreva esta Série"
						value={serieForm.description}
						onChangeText={value => setField('description', value)}
						numberOfLines={4}
						multiline={true}
					/>
			 		<View style={styles.containerButton}>
			 	    	{ this.renderButton() }
			 	    </View>
		 	    </FormRow>
		 	</ScrollView>
		);
	}
}


const styles = StyleSheet.create({
	container:{
		paddingTop: 70
	},
	containerButton:{
		paddingTop:  20,
	  	paddingBottom:  10,
	  	paddingLeft: 4,
	  	paddingRight: 4,
	},
	input:{
		padding: 10
	},
	label:{
		paddingLeft: 5,
		paddingTop: 10
	},
	sameRow:{
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});



const mapStateToProps = (state) => {
	return {
		serieForm: state.serieForm
	}
}

const mapDispatchToProps = {
	setField, 
	saveSerie,
	setWholeSerie,
	resetForm
};

//connect(mapStateToProps, mapDispatchToProps)
export default connect(mapStateToProps, mapDispatchToProps)(SerieFormPage);


