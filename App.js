import React from 'react';
import { AppRegistry,  StyleSheet  } from "react-native";
import { createAppContainer } from 'react-navigation';
import AppNavigator from './components/AppNavigator';

//FONTS
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

//STYLES AND THEMES
const theme = {
  ...DefaultTheme,
  roundness: 0,
  colors: {
    ...DefaultTheme.colors,
    primary: '#cacdbb',
    placeholder :"#fce181",
    text: '#fce181',
    underlineColor:'transparent',
    background : '#026670',
    backdrop  :"#ff0000",
  },
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppContainer = createAppContainer(AppNavigator);

//APP EXPORT
export default function App() {
  return (  
      <AppContainer/>    
  );
}

AppRegistry.registerComponent('Tip Em', () => App);
