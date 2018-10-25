import firebase from 'firebase';
import { Alert } from 'react-native';

/*type
actionCreator*/
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const userLoginSuccess = user => ({
	type: USER_LOGIN_SUCCESS,
	user
});

export const USER_LOGOUT = 'USER_LOGOUT'; 
const userLogout = () => ({
	type: USER_LOGOUT
});


/*
	A linha abaixo é mesmo q uma function retornando uma function
	Ex.:
	function tryLogin({ mail, password }){
		return function(dispatch){
			//..
		}
	}

	redux-thunk (assincrono)- usando ele posso despachar actions que retornam funções
	- Sempre q for salvar algo no servidor e ter q esperar resposta eu vou 
	criar uma funcao que retorna um dispatch
	- Ele deixa a acao assincrona
	- Existem outras maneiras de fazer acoes assincronas (como redux-saga)
		Com o thunk é um pouco mais facil de aprender e escrever

*/
export const tryLogin = ({ mail, password }) => dispatch => {
	return firebase
		.auth()
		.signInWithEmailAndPassword(mail, password)
		.then(user => {
			const action = userLoginSuccess(user);
			dispatch(action);
			return user;
		})//success - se der tudo certo a autenticacao
		.catch(error => {
			if(error.code === 'auth/user-not-found'){
				return new Promise((resolve, reject) => {
					Alert.alert(
						//title 
						'Usuário não encontrado', 
						//message
						'Deseja se cadastrar usando as informações inseridas?', 
						//[{text, onPress}] 
						[{
							text: 'Não',
							onPress: () => resolve(),
							style: 'cancel'
						}, {
							text: 'Sim',
							onPress: () => {
								firebase
									.auth()
									.createUserWithEmailAndPassword(mail, password)
									.then(resolve)
									.catch(reject)
							}
						}],
						{ cancelable: false } 
					)
				});
			}
			return Promise.reject(error);
			
			//auth/wrong-password //senha errada
			//auth/user-not-found  //email nao cadastrado
			//auth/invalid-email //email invalido
		})//error - se nao der certo a autenticacao
}