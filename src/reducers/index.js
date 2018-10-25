import { combineReducers } from 'redux';

import userReducer from './userReducer';
import serieFormReducer from './serieFormReducer';
import seriesReducer from './seriesReducer';

//Permite construir reducer para cada action
export default combineReducers({
	//é possível reduzir para ficar mais compacto, 
	//reduzindo a palavra 'reducer'
	//e quando a key e o value são iguais só é necessário informar uma vez
	//assim, ficaria apenas:
	//user e no import apenas user também
	user: userReducer,
	serieForm: serieFormReducer,
	series: seriesReducer
});