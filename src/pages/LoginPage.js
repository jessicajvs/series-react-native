import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator, Alert} from 'react-native';
import firebase from 'firebase';
import FormRow from '../components/FormRow';

export default class LoginPage extends React.Component{
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
		const { mail, password } = this.state;
		const loginUserSuccess = user => {
			this.setState({ message : "Sucesso!"});
			this.props.navigation.navigate('Main');
		};
		const loginUserFailed = error => {
			this.setState({ message : this.getMessageByErrorCode(error.code) });
		};


		if(mail == "" ){
			this.setState({ message: 'É necessário informar o e-mail' });
		}else if(password == "" ){
			this.setState({ message: 'É necessário informar a senha' });
		}else{
			this.setState({ isLoading: true, message: '' });
			firebase
				.auth()
				.signInWithEmailAndPassword(mail, password)
				.then(loginUserSuccess)//success - se der tudo certo a autenticacao
				.catch(error => {
					if(error.code === 'auth/user-not-found'){
						Alert.alert(
							/* title */ 'Usuário não encontrado', 
							/* message */ 'Deseja se cadastrar usando as informações inseridas?', 
							/* [{text, onPress}] */
							[{
								text: 'Não',
								onPress: () => {},
								style: 'cancel'
							}, {
								text: 'Sim',
								onPress: () => {
									firebase
										.auth()
										.createUserWithEmailAndPassword(mail, password)
										.then(loginUserSuccess)
										.catch(loginUserFailed)
								}
							}],
							{ cancelable: false } 
						)
					} else {
						loginUserFailed
					}
					//auth/wrong-password //senha errada
					//auth/user-not-found  //email nao cadastrado
					//auth/invalid-email //email invalido
				})//error - se nao der certo a autenticacao
				.then(() => {
					this.setState({ isLoading: false });
				})//vai executar depois independente do resultado
			;
		}
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
		return 'Erro desconhecido. Tente novamente.';
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
				<FormRow>
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
				</FormRow>
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