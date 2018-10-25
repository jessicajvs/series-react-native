import firebase from 'firebase';

export const SET_FIELD = 'SET_FIELD';
export const setField = (field,value) => {
	return {
		type: SET_FIELD,
		field,
		value
	}
};

export const SERIE_SAVED_SUCCESS = 'SERIE_SAVED_SUCCESS';
export const serieSavedSuccess = () => ({
	type: SERIE_SAVED_SUCCESS,
});

export const SET_WHOLE_SERIE = 'SET_WHOLE_SERIE';
export const setWholeSerie = serie => ({
	type: SET_WHOLE_SERIE,
	serie
});

export const RESET_FORM = 'RESET_FORM';
export const resetForm = () => ({
	type: RESET_FORM,
});

/*
arrow function com corpo:

*/

//Documentação do firebase como os comandos usados nesse escopo abaixo: 
// https://firebase.google.com/docs/database/web/read-and-write?hl=pt-br
// Pegando quando tem a opção WEB e não Android/iOS
export const saveSerie = serie => {
	const { currentUser } = firebase.auth(); 
	return async dispatch => {
		const db =  firebase.database();
		if(serie.id){ //UPDATE
			await db.ref(`/users/${currentUser.uid}/series/${serie.id}`)
					.set(serie);
		}else{ //INSERT
			await db.ref(`/users/${currentUser.uid}/series`)
					.push(serie);
		}
		dispatch(serieSavedSuccess());
	}
};