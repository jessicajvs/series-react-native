import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator, Alert} from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';

import { tryLogin } from '../actions';

import FormRow from '../components/FormRow';

class LoginPage extends React.Component{
	constructor(props) {
	  	super(props);
		
	  	this.state = {
	  		mail: '',
	  		password: '',
	  		isLoading:false,
	  		message:'',
	  		isFocusedMail: false
	  	};
	}

	componentDidMount(){
		const config = {
		  	apiKey: "AIzaSyDr77LaVTi0BB8ETRG3O093KcDT8poql-Q",
		  	authDomain: "series-e058b.firebaseapp.com",
		  	databaseURL: "https://series-e058b.firebaseio.com",
		  	projectId: "series-e058b",
		  	storageBucket: "series-e058b.appspot.com",
		  	messagingSenderId: "870232757164"
		};
		firebase.initializeApp(config);
	}

	onChangeHandler(field, value){
		this.setState({ 
			[field]:value 
		});
	}

	tryLogin(){
		this.setState({ isLoading: true, message: '' });
		const { mail, password } = this.state;

		this.props.tryLogin({ mail, password })
			.then((user) => {
				if(user){
					//Essa função deleta todo o historico de navegação
					//o botao voltar do android fica vazio, se clicar nele sai do app
					return this.props.navigation.replace('Main');
					//this.props.navigation.navigate('Main');
				};
				this.setState({
					isLoading: false,
					messagem: ''
				})
			})
			.catch(error => {
				this.setState({
					isLoading: false,
					message: this.getMessageByErrorCode(error.code)
				});
			});
	}

	getMessageByErrorCode(errorCode){
		switch(errorCode){
			case 'auth/wrong-password': return 'Senha incorreta';
			break;
			case 'auth/user-not-found': return 'Usuário não encontrado';
			break;
			case 'auth/invalid-email': return 'E-mail inválido';
			break;
		}
		return errorCode;
	}

	renderMessage(){
		const { message } = this.state;
		if(!message) 
			return null;
		
		return (
			<View>
				<Text>{ message }</Text>
			</View>
		);
	}

	renderButton(){
		if(this.state.isLoading)
			return <ActivityIndicator />;
		
		return (<Button title="Entrar" style={styles.button}
						onPress={() => this.tryLogin()}/>);
	}

	render(){
		return(
			<View style={styles.container}>
					<Text style={ styles.label }>E-mail</Text>
					<TextInput
						style={ styles.input }
						placeholder="user@hotmail.com"
						value={this.state.mail}
						onChangeText={value => this.onChangeHandler('mail', value)}
					/>
					<Text style={ styles.label }>Senha</Text>
					<TextInput
					  	style={ styles.input }
						placeholder="******"
						value={this.state.password}
						secureTextEntry
						onChangeText={value => this.onChangeHandler('password', value)}
					/>
				<View style={styles.button}>
					{ this.renderButton() }
					{ this.renderMessage() }
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		paddingTop: 95
	},
	button:{
		padding: 15,
	},
	input:{
		padding: 10
	},
	label:{
		paddingLeft: 5,
		paddingTop: 10
	},
});

export default connect(
						/*mapStateToProps*/ null, 
						/*mapDispatchToProps*/ { tryLogin }
					)(LoginPage);




