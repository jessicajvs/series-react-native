# series-react-native
App de Séries

Linguagem: ES6, React Native.
IDE e emulador: Android Studio

Instalando no MAC:
			- Instalar o brew
				- Usar o brew p instalar o Node e o Watchman.
				Rodar o comando como NAO ROOT.
				- Vai pedir password algumas vezes. Informar o passw do PC
				$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
			- Instalar o Node e o Watchman
				$ brew install node
				$ brew install watchman
			- Instalar o React Native CLI
				- Rodar o comando como ROOT.
				$ sudo su -
				$ npm install -g react-native-cli

				$ yarn add é similar ao $npm install
			- Criar novo projeto
				$ create-react-native-app (se n reconhecer roda: $ npm i -g create-react-native-app)
				$ npm run android (rodando e preparando o emulador)
			- Instalar a linguagem Babel no Sublime
				http://www.storybench.org/install-babel-packages-sublime-text-3/

- React linguagem 
		<View> faz papel da <div>
		<Text> faz papel do <span> ou <p>

	- Erro: "Building JavaScript bundle Failed building JavaScript bundle." 
		Correção:
		$ npm i metro-bundler

	- Instalar a parte de navegação do React
		$ npm install --save react-navigation

	- Coisas clicáveis - Button - botoes
		TouchableHighlight - No clique ele fica brilhante
		TouchableNativeFeedback - Só funciona no Android
		TouchableOpacity - No clique ele fica opaco
		TouchableWithoutFeedback - No clique nao acontece nada visual

- Firebase (https://console.firebase.google.com)
- Instalar o firebase na pasta do projeto
			$ npm install --save firebase
