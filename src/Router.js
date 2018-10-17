import { createStackNavigator } from 'react-navigation';
import LoginPage from './pages/LoginPage';
import SeriesPage from './pages/SeriesPage';

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
},{
   //regras default do menu 
  navigationOptions: {
    headerTransparent: true,
    headerStyle: {

    },
    headerTitleStyle: {
      fontSize: 18,
      flex: 1,
      textAlign: 'center',
      color:'#2C2C2C',
      fontStyle: 'normal'
    }
  }
});