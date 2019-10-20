import React from 'react';
import {View, Image, Button} from 'react-native';
import AwesomeButton from "react-native-really-awesome-button";

export default class TitleBar extends React.Component{
  render(){
    return(
      <View style={{flexDirection:'row', height:50, backgroundColor:'rgb(3, 86, 41)', justifyContent:'space-between', alignItems:'center', paddingHorizontal:10}}>
        <Image source={require('../assets/tipLogo.png')} />
        <AwesomeButton style={{alignSelf:'center'}} textColor='rgb(3, 86, 41)' raiseLevel={1} height={24} backgroundColor="#FFDF00" onPress={() => this.props.navCommand('Help')} >HELP</AwesomeButton>       
      </View>
    );
  }
}