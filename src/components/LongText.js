import React from 'react';
import { 
	View, 
	Text, 
	StyleSheet, 
	TouchableWithoutFeedback,
	LayoutAnimation,
	NativeModules 
} from 'react-native';

// Android - é preciso ativar essa flag como é feito abaixo. No ios ela já vem por padrão ativada.
// Se existe "NativeModules.UIManager.setLayoutAnimationEnabledExperimental"
// aí sim executa a função NativeModules.UIManager.setLayoutAnimationEnabledExperimental(true)
// assim se n existir ele n vai dar nenhum erro, vai continuar funcionando normalmente
NativeModules.UIManager.setLayoutAnimationEnabledExperimental && NativeModules.UIManager.setLayoutAnimationEnabledExperimental(true);

export default class LongText extends React.Component {
	constructor(props) {
	  	super(props);
	
		//Sempre q um state é alterado o render() é chamado
		this.state = {
			isExpanded: false,
		};
	}

	toggleIsExpanded(){
		const { isExpanded } = this.state;
		this.setState({
			isExpanded: !isExpanded
		});
	}

	componentWillUpdate(nextProps, nextState){
		LayoutAnimation.spring();
	}


	// Mais sobre essas funções: https://reactjs.org/docs/react-component.html
	/* 
	componentWillUpdate - 
	 - Ela é chamada ANTES da alteraçao do status e assim, antes do render ser chamado novamente tb
	 - É possível acessar as props antigas e as props novas
	 - Similar ao funcionamento de uma trigger do mysql
	 Ex: new.props e old.props  
	 Novas props eu acesso com: nextProps e nextState
	 E as antigas com o this.state normal
	 componentWillUpdate(nextProps, nextState){}
	*/
	/*
	componentDidUpdate - 
	 - Ela é chamada DEPOIS da alteraçao do status
	*/


	render(){
		const { label = "", content = "", isTitle = "" } = this.props;
		const { isExpanded } = this.state;
		return (
			<View style={styles.line}>
				{(label == "" ? null : 
					(<Text style={[
						styles.cell,
						styles.label,
						label.length > 8 ? styles.longLabel : null
					]}>{ label }</Text>)
				)}
				<TouchableWithoutFeedback
					onPress={() => this.toggleIsExpanded()}>
					<View>
						<Text style={[
						styles.content, 
						(isTitle != "" ? styles.title : styles.cell),
						(isExpanded ? styles.expanded : styles.collapsed)
						]}>{ content }</Text>
						{(
							content.length > 300 
							? 
								<Text style={styles.moreText} >{(isExpanded ? `Reduzir` : `Continuar Lendo`)}</Text>
							:
								null
						)}
					</View>
				</TouchableWithoutFeedback>
				
			</View>
		);
	}
}




const styles = StyleSheet.create({
	line: {
		paddingTop: 3,
		paddingBottom: 3,
	},
	cell: {
		fontSize: 12,
	},
	label: {
		fontWeight: 'bold',
	},
	content: {
		textAlign:  'justify' 
	},
	longLabel: {
		fontSize: 12,
	},
	title:{
		fontWeight: 'bold',
		fontSize: 18,
	},
	collapsed:{
		maxHeight: 50
	},
	expanded: {
		flex:1
	},
	moreText: {
		alignSelf:  'center',
		fontSize: 11,
		color: '#8E8E8E'
	}
});
