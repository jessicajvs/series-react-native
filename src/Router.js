import { createStackNavigator } from 'react-navigation';

import LoginPage from './pages/LoginPage';
import SeriesPage from './pages/SeriesPage';
import SerieDetailPage from './pages/SerieDetailPage';
import SerieFormPage from './pages/SerieFormPage';

export default createStackNavigator({
  'Login': {
    screen: LoginPage,
    //regra especifica do menu nesta página
    navigationOptions: ({ navigation }) => {
      return ({
        title: 'Entrar',
      });
    }
  },

  'Main': {
    screen: SeriesPage,
  },

  'SerieForm': {
    screen: SerieFormPage,
    navigationOptions: ({ navigation }) => {
        if(navigation.state.params && navigation.state.params.serieToEdit){
            return {
               title: 'Editar Série' ,
               headerTintColor: '#000000',
            }
        }
        return {
            title: 'Nova Série',
            headerTintColor: '#000000',
        }
    }
  },
  
  'SerieDetail': {
    screen: SerieDetailPage,
  },

},{
   //regras default do menu 
  navigationOptions: {
    headerTransparent: true,
    headerTintColor: '#fff',
    headerStyle: {
    },
    headerTitleStyle: {
      fontSize: 18,
      textAlign: 'center',
      color:'#2C2C2C',
      fontStyle: 'normal'
    }
  }
});