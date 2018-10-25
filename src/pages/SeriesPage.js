import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  Button,
  View,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import SerieCard from '../components/SerieCard';
import Header from '../components/Header';
import ButtonCustom from '../components/ButtonCustom';
import { watchSeries } from '../actions';

class SeriesPage extends React.Component {
    componentDidMount(){
      this.props.watchSeries();
    }

    render(){
      const { series, navigation } = this.props;
      if(!series){
        return  <View style={styles.container}><Header title="Séries" /><ActivityIndicator /></View>
      }
      return(
        <ScrollView style={styles.container}>
          <Header title="Séries" />        
          <FlatList 
              data={ series }
              renderItem={({item}) => 
                 (<SerieCard 
                      serie={item}  
                      //O nome SerieDetail deve ser o mesmo nome que está no Router
                      onNavigate={() => navigation.navigate('SerieDetail', {serie: item} )}
                    />
                 )}
              keyExtractor={item => item.id}
              numColumns={2}
          />
          <View style={styles.containerButton}>
             <ButtonCustom title="CRIAR NOVA SÉRIE" onPress={() => navigation.navigate('SerieForm')} />
          </View>
        </ScrollView>);
    }
}

const styles = StyleSheet.create({
	container:{
    paddingTop: 9,
    paddingLeft: 4,
    paddingRight: 4,
	},
  containerButton:{
    paddingBottom:  20,
    paddingLeft: 4,
    paddingRight: 4,
  }
});

const mapStateToProps = state => {
  const { series } = state;
  if(!series){
    return { series }
  }

  const keys = Object.keys(series); //Recupera todas as chaves de um array
  const seriesWithKeys = keys.map(id => {
    return {...series[id], id}
  });
  return { series: seriesWithKeys };
}

export default connect(mapStateToProps, { watchSeries })(SeriesPage);


