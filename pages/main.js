import React from 'react';
import {View, Text, Image, TouchableWithoutFeedback, Dimensions} from 'react-native';
import TitleBar from '../components/TitleBar';
import styleMain from './styles.js';
const { width } = Dimensions.get('window');

export default class Main extends React.Component{
  navToPage = arg => {
    this.props.navigation.navigate(arg, {backPage:'Main'});
  }


  render(){
    return(
      <View style={[styleMain.container, styleMain.vStack]}>
      <TitleBar navCommand={this.navToPage}/>
        
        <TouchableWithoutFeedback  onPress={() =>  this.navToPage('Total')} style={{flex:1, justifyContent:'center'}} >
          <View style={{flex:1, justifyContent:'center', alignContent:'center', borderColor:'rgb(3, 86, 41)', borderBottomWidth:2 }}>          
            <Image resizeMode='contain' source={require('../assets/cartouche3.png')} style={{position:'absolute', left:5, top:0, width:70}}/>
              <Image resizeMode='contain' source={require('../assets/cartouche3.png')} style={{position:'absolute', right:5, top:0, width:70}}/>
              <Image source={require('../assets/totalSum.png')} style={{alignSelf:'center'}}/>
              <Image style={{height:22, position:'absolute', bottom:0, left:0}} source={require('../assets/border2.png')}/>
              <Image resizeMode='contain' source={require('../assets/or2.png')} style={{position:'absolute', left:(width/2)-12, bottom:-25, width:25}}/>
          </View>
        </TouchableWithoutFeedback>
        
        
        <TouchableWithoutFeedback  onPress={() =>  this.navToPage('Even')} style={{flex:1, justifyContent:'center'}} >
          <View style={{flex:1, justifyContent:'center', alignContent:'center', borderColor:'rgb(3, 86, 41)', borderBottomWidth:2}}>
            <Image resizeMode='contain' source={require('../assets/cartouche3.png')} style={{position:'absolute', left:5, top:0, width:70}}/>
            <Image resizeMode='contain' source={require('../assets/cartouche3.png')} style={{position:'absolute', right:5, top:0, width:70}}/>
            <Image source={require('../assets/even.png')} style={{alignSelf:'center'}}/>
            <Image style={{height:22, position:'absolute', bottom:0, left:0}} source={require('../assets/border2.png')}/>
            <Image resizeMode='contain' source={require('../assets/or2.png')} style={{position:'absolute', left:(width/2)-12, bottom:-25, width:25}}/>
          </View>
        </TouchableWithoutFeedback>
        
        
        <TouchableWithoutFeedback  onPress={() =>  this.navToPage('Itemized')} style={{flex:1, justifyContent:'center'}} >
          <View style={{flex:1, justifyContent:'center', alignContent:'center', borderColor:'rgb(3, 86, 41)', borderBottomWidth:2}}>
            <Image resizeMode='contain' source={require('../assets/cartouche3.png')} style={{position:'absolute', left:5, top:0, width:70}}/>
            <Image resizeMode='contain' source={require('../assets/cartouche3.png')} style={{position:'absolute', right:5, top:0, width:70}}/>
            <Image style={{height:22, position:'absolute', bottom:0, left:0}} source={require('../assets/border2.png')}/>
            <Image source={require('../assets/itemize.png')} style={{alignSelf:'center'}}/>            
          </View>
        </TouchableWithoutFeedback>  
       
      </View>
    );
  }
}