import React from 'react';
import {View, Text, Image, TouchableWithoutFeedback, Dimensions} from 'react-native';
import TitleBar from '../components/TitleBar';
import styleMain from './styles.js';
import {AdMobBanner,  AdMobInterstitial,  PublisherBanner,  AdMobRewarded} from 'expo-ads-admob';
const { width } = Dimensions.get('window');

export default class Main extends React.Component{
  state={
    numClicks:0
  }

  incClick=()=>{
    this.setState({
      numClicks: this.state.numClicks + 1
    });
  }

  navToPage = arg => {
    if(arg.toLowerCase() !== 'help'){
      this.incClick();
    }
    this.props.navigation.navigate(arg, {backPage:'Main'});
  }
  async componentDidMount(){
    // AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
    // AdMobInterstitial.setTestDeviceID('EMULATOR');
    // await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    // await AdMobInterstitial.showAdAsync();
  }
  async componentDidUpdate(){
    // if(this.state.numClicks%5 === 0){
    //   AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
    //   AdMobInterstitial.setTestDeviceID('EMULATOR');
    //   await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    //   await AdMobInterstitial.showAdAsync();
    // }
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
        {/* <AdMobBanner
          bannerSize="banner"
          adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
          testDeviceID="EMULATOR"
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={this.bannerError}
          style={{alignSelf:'center'}} />       */}
      </View>
    );
  }
}