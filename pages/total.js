import React from 'react';
import {View, Text, TextInput, ScrollView, Button, Switch, StyleSheet} from 'react-native';
import Constants from "expo-constants";
import TitleBar from '../components/TitleBar';
import Slider from '../components/slider';
import styleMain from './styles.js';
import AwesomeButton from "react-native-really-awesome-button";
import {AdMobBanner} from 'expo-ads-admob';

export default class Total extends React.Component{
  state = {
    tipPercent: 15,
    totalWTip:0,
    totalBill:0,
    taxAmount:0,
    tipMount: 0,
    includeTax:true
  }
  navToPage = arg => {
    this.props.navigation.navigate(arg, {backPage:'Total'});
  }
  changeVal = value => {
    this.setState({tipPercent: value},this.calculateTotal);
  }
  customStyles2 = StyleSheet.create({
    track: {
      height: 8,
      borderRadius: 4,
      borderColor:'#6a6a6a',
      borderWidth:1,
    },
    thumb: {
      width: 30,
      height: 30,
      borderRadius: 30 / 2,
    },
    halfCell:{
      flex:1,
      alignItems:'center',
      paddingVertical:36
    },
    topicHeader:{
      fontWeight:"bold",
      paddingBottom:12,
    }
  });   
  updateBill = (value, name) =>{   
    this.setState({[name]: this.renderStringToNumber(value)}, this.calculateTotal);    
  };
  toggleTaxes = event => {
    this.setState({includeTax:event}, this.calculateTotal);
  }
  renderNumberToString = (arg) => {
    let decPos = arg.toString().indexOf(".");
    return arg.toString()
  }
  renderStringToNumber = (arg) => {
    if(arg.length>1 && arg.charAt(0) === '0' && arg.charAt(1) !== '.'){
      arg = arg.substr(1);
    }
    if(isNaN(arg) || arg ===""){
      return 0;
    }else{
      return arg;
    }
  }
  //main function that takes in the totals and generates the values for the tip total and grand total
  calculateTotal = () => {
    let tippableAmount = this.state.includeTax ? this.state.totalBill : this.state.totalBill - this.state.taxAmount;
    let totalTip = tippableAmount * (this.state.tipPercent/100); 
    this.setState({tipMount: totalTip, totalWTip:totalTip + Number(this.state.totalBill) }) 
    return totalTip + this.state.totalBill;
  };
  render(){
    return(
      <View style={[styleMain.container, styleMain.vStack]}>
        <TitleBar navCommand={this.navToPage}/>
        
        <ScrollView>
          <View>  
            <View style={{flexDirection:'row'}}>
              <View style={this.customStyles2.halfCell}>
                <Text style={this.customStyles2.topicHeader}>Total Bill Including Tax</Text>
                <TextInput type="number"  name="totalBill" value={this.renderNumberToString(this.state.totalBill)} onChangeText ={text => this.updateBill(text, 'totalBill')} keyboardType="numeric" style={{textAlign:'center', borderColor: 'gray', borderBottomWidth: 1, width:'60%' }}/>
              </View>
              <View style={this.customStyles2.halfCell}>
                <Text style={this.customStyles2.topicHeader}>Total Tax Amount</Text>
                <TextInput type="number" name="taxAmount" value={this.renderNumberToString(this.state.taxAmount)} onChangeText ={text => this.updateBill(text, 'taxAmount')}  keyboardType="numeric" style={{textAlign:'center', borderColor: 'gray', borderBottomWidth: 1, width:'60%' }}/>
              </View>
            </View>      
            <View style={{paddingHorizontal:25, flexDirection:'row', alignItems:'flex-start', marginBottom:12}}>
              <Text style={[this.customStyles2.topicHeader], {paddingRight:16}}>Include taxes as part of tip</Text>
              <Switch 
                value={this.state.includeTax} 
                onValueChange={this.toggleTaxes} 
                thumbColor='#FFDF00'  
                trackColor={{true:'#d59c30', false:"#6a6a6a"}} 
                ios_backgroundColor="#d59c30"/>
            </View>
            <Text style={[this.customStyles2.topicHeader, {textAlign:'center'}]}>Tip Percentage: {this.state.tipPercent.toString()}%</Text>
            <View style={{paddingHorizontal:25}}>
              <Slider name="tipPercent"
                  minimumValue={0} 
                  maximumValue={30} 
                  step={1} 
                  onValueChange={this.changeVal} 
                  value={this.state.tipPercent} 
                  handleLabel={this.state.tipPercent.toString()} 
                  thumbImage={require('../assets/or.png')}
                  trackStyle={this.customStyles2.track}
                  thumbStyle={this.customStyles2.thumb}/>
            </View>
            <View style={{flexDirection:'row'}}>
              <View style={this.customStyles2.halfCell}>
                <Text style={this.customStyles2.topicHeader}>Tip Amount</Text>
                <TextInput disabled value={(this.state.tipMount).toFixed(2)} />
              </View>
              <View style={this.customStyles2.halfCell}>
                <Text style={this.customStyles2.topicHeader}>Total Including Tip</Text>
                <TextInput disabled value={this.state.totalWTip.toFixed(2)} /> 
              </View>
            </View>
            <View style={{flexDirection:'row', height:50, justifyContent:'center', alignItems:'center', paddingHorizontal:10}}>
              <AwesomeButton backgroundColor='#FFDF00' textColor='rgb(3, 86, 41)' height={36} raiseLevel={1} onPress={() =>  this.props.navigation.navigate('Main')} >HOME</AwesomeButton>
            </View>
          </View>
        </ScrollView>
        <AdMobBanner
              bannerSize="banner"
              adUnitID={Constants.manifest.extra.adId}  // Test ID, Replace with your-admob-unit-id
              testDeviceID="EMULATOR"
              servePersonalizedAds // true or false
              onDidFailToReceiveAdWithError={this.bannerError}
              style={{alignSelf:'center'}} />  
    
      </View>
    );
  }
}