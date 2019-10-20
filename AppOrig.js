import React from 'react';
import { AppRegistry,  StyleSheet  } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//PAGES
import Main from './pages/main';
import Even from './pages/even';
import Total from './pages/total';
import Itemized from './pages/itemized';
import ItemiNavzed from './pages/nav';

//FONTS
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Nav/>
    </PaperProvider>
  );
}

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
AppRegistry.registerComponent('Tipem', () => App);
