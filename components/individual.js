import React, {Component} from 'react';
import {View, Text, Dimensions} from 'react-native';
const { width } = Dimensions.get('window');

let tipTotal = 0;
let taxTotal = 0;
export default class Itemized extends Component{
  personTotalBeforeTaxes = () => this.props.sum.toFixed(2);
  taxes = () => {
    taxTotal = Math.round((this.props.sum*this.props.taxRate)*100)/100
    return taxTotal.toFixed(2);
  };
  tipAmount = () => {
    if(this.props.includeTaxes){
      tipTotal = (this.props.sum + (this.props.sum*this.props.taxRate)) * (this.props.tipPercent/100);        
    }else{
      tipTotal= this.props.sum * (this.props.tipPercent/100);
    }
    tipTotal = Math.round((tipTotal)*100)/100  
    return tipTotal.toFixed(2);
  };
  individualPayment = () => {
    return (this.props.sum + tipTotal + taxTotal).toFixed(2);
  }

  render(){
    return(
      <View style={{backgroundColor:'#cdcaa2', width:width-100, minHeight:200, borderColor:'rgb(3, 86, 41)', borderWidth:1, marginHorizontal:25}}>
        <Text style={{textAlign:'center', fontWeight:'bold', fontSize:24, marginVertical:18}}>Person {this.props.pNum}</Text>
        <View style={{flexDirection:"row", justifyContent:'space-between', paddingHorizontal:24}}>
          <Text style={{fontWeight:'bold', fontSize:16}}>Total without tax:</Text>
          <Text style={{fontWeight:'bold', fontSize:16}}>{this.personTotalBeforeTaxes()}</Text>
        </View>
        <View style={{flexDirection:"row", justifyContent:'space-between', paddingHorizontal:24}}>
          <Text style={{fontWeight:'bold', fontSize:16}}>Taxes:</Text>
          <Text style={{fontWeight:'bold', fontSize:16}}>{this.taxes()}</Text>
        </View>
        <View style={{flexDirection:"row", justifyContent:'space-between', paddingHorizontal:24}}>
          <Text style={{fontWeight:'bold', fontSize:16}}>Tip amount:</Text>
          <Text style={{fontWeight:'bold', fontSize:16}}>{this.tipAmount()}</Text>
        </View>
        <View style={{flexDirection:"row", justifyContent:'space-between', paddingHorizontal:24}}>
          <Text style={{fontWeight:'bold', fontSize:16}}>Total with tax and tip:</Text>
          <Text style={{fontWeight:'bold', fontSize:16}}>{this.individualPayment()}</Text>
        </View>        
      </View>
    )
  }
}