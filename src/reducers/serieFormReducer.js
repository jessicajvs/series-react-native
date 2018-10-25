import { SET_FIELD, SERIE_SAVED_SUCCESS, SET_WHOLE_SERIE, RESET_FORM } from '../actions';

const INITIAL_STATE = {
	title: "",
	gender: "Drama",
	rate: 0,
	img: "",
	description: "",
	id: null,
};

export default function(state = INITIAL_STATE, action) {
	console.log("Chamou o Reducer");
	console.log(action.type);
	switch(action.type){
		case SET_FIELD:
			//cada tecla digitada pelo user passará aqui
			const newState = { ...state };
			newState[action.field] = action.value;
			return newState;
		case SERIE_SAVED_SUCCESS:
			return INITIAL_STATE;
		case RESET_FORM:
			return INITIAL_STATE;
		case SET_WHOLE_SERIE:
			return action.serie;
		default:
			return state;
	}
}