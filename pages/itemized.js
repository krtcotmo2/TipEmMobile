import React from 'react';
import {Modal, View, Text, StyleSheet, TextInput, Button, Switch, Dimensions, Alert} from 'react-native';
import Constants from "expo-constants";
import TitleBar from '../components/TitleBar';
import Slider from '../components/slider';
import { ScrollView } from 'react-native-gesture-handler';
import Individual from '../components/individual';
import AwesomeButton from "react-native-really-awesome-button";
import {AdMobBanner} from 'expo-ads-admob';
import styleMain from './styles.js';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
export default class Itemized extends React.Component{
  state={
    modalVisible:false,
    numPeople:3,
    tipPercent:15,
    taxAmount:0,
    totalBill:0,
    scrollPosition:0,
    itemPrice:0, 
    waySplit:1,
    includeTax:true,
    addedSoFar:0,
    screenH: 0
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
      textAlign:'center'
    },
    modal:{
      backgroundColor:'green'
    },
    container2:{
      flex:1,
      backgroundColor:'#e2e0c5'
    },
    vStack2:{
      flexDirection:"column",
      alignItems:"stretch",
      paddingTop:24
    },
  });
  componentDidMount = () => {
    this.setState({screenH: height - 100});
    for(let d= 0;d<this.state.numPeople;d++){
      let varName = 'person'+(d+1);
      this.setState({[varName]:[]});
    }
  };
  navToPage = arg => {
    this.props.navigation.navigate(arg, {backPage:'Itemized'});
  };
  updateBill = (value, name) =>{   
    this.setState({[name]: this.renderStringToNumber(value)}); 
  };
  changeVal = value => {
    this.setState({tipPercent: value});
  }
  changePeopleVal = value => {
    this.setState({numPeople: value});
  }
  setModalVisible = isVisible =>{
    if(this.state.totalBill <= 0 ){
      return;
    }
    for(let d= 0;d<this.state.numPeople;d++){
      let varName = 'person'+(d+1);
      if(this.state[varName] === undefined){
        this.setState({[varName]:[]})
      }
    }
    this.setState({modalVisible: isVisible});
  }
  generatePeople =() => {
    var tmp = [];
    for (var i = 0; i < this.state.numPeople; i++) {
      tmp.push(i+1);     
    }   
    
    return tmp.map(item => {
      let personName = "person"+item;
      let sum = 0;
      let taxRate = 0;
      if(this.state[personName]){
        sum=this.state[personName].reduce((a,b)=> a+b, 0);
        taxRate = this.state.taxAmount / (this.state.totalBill-this.state.taxAmount);
      }

      return <Individual pNum = {item} key={item} sum={sum} tipPercent={this.state.tipPercent} taxRate={taxRate} includeTaxes={this.state.includeTax}/>
    });
  }
  scrollDone = (event)=> {
    this.setState({scrollPosition:event.nativeEvent.contentOffset.x/(width-50)});  
  }
  addToPerson=()=>{
      if(this.state.itemPrice === 0 || this.state.waySplit < 1){
        return;
      }
      let personArr = "person" + (1+this.state.scrollPosition);
      let curValues = this.state[personArr];
      let itemPrice = Number(this.state.itemPrice) / Number(this.state.waySplit);
      let soFar = this.state.addedSoFar + itemPrice;
      this.setState({[personArr]: [...curValues, itemPrice], waySplit:1, itemPrice:0, addedSoFar:soFar });
  };
  toggleTaxes = event => {
    this.setState({includeTax:event}, this.calculatePerPerson);
  };
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
   render(){
    return(
      <View style={[this.customStyles2.container2, this.customStyles2.vStack2]}>
        <TitleBar navCommand={this.navToPage}/>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
          presentationStyle="overFullScreen"
          height = {this.state.screenH}>
          <View style={{backgroundColor:"#e2e0c5"}}>
          <View style={{marginTop: 22}}>
            <View>
              <Text style={[this.customStyles2.topicHeader, {textAlign:'center'}]}>Swipe right or left to change the person</Text>
            </View>
            <View style={{padding:25, paddingTop:6}}>
              <ScrollView 
              id='scroller'
              horizontal={true} 
              pagingEnabled={true} 
              snapToAlignment='center'
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={this.scrollDone}
              >
                {this.generatePeople()} 
              </ScrollView>
              <View style={{flexDirection:"row", marginVertical:12}}>
                <View style={{width:(width-50)/2}}>
                  <Text style={this.customStyles2.topicHeader}>Item Price</Text>
                  <TextInput type="number"  name="itemPrice"  keyboardType="numeric" style={{textAlign:'center', borderColor: 'gray', borderBottomWidth: 1, width:'40%', alignSelf:'center' }} onChangeText ={text => this.updateBill(text, 'itemPrice')} value={this.renderNumberToString(this.state.itemPrice)}/>
                </View>
                <View style={{width:(width-50)/2}}>
                  <Text style={this.customStyles2.topicHeader}>Split By</Text>
                  <TextInput type="number"  name="waySplit"  keyboardType="numeric" style={{textAlign:'center', borderColor: 'gray', borderBottomWidth: 1, width:'40%', alignSelf:'center' }} onChangeText ={text => this.updateBill(text, 'waySplit')} value={this.state.waySplit.toString()}/>
                </View>
              </View>
              <View style={{marginVertical:25}}>
                <AwesomeButton backgroundColor='#FFDF00' textColor='rgb(3, 86, 41)' height={36} raiseLevel={1} onPress={this.addToPerson} style={{alignSelf:'center', marginBottom:12}}>ADD TO PERSON</AwesomeButton>
                <Text style={{alignSelf:'center'}}>Total Remaining: {(this.state.totalBill - this.state.taxAmount - this.state.addedSoFar).toFixed(2)}</Text>  
              </View>
              <AwesomeButton backgroundColor='#FFDF00' textColor='rgb(3, 86, 41)' height={36} raiseLevel={1} onPress={() => {this.setModalVisible(!this.state.modalVisible)}} style={{alignSelf:'center'}}>BACK TO THE BILL</AwesomeButton>
                
              
            </View>
          </View>
          </View>
        </Modal>
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
        <View>
          <Text style={[this.customStyles2.topicHeader, {textAlign:'center'}]}>Number of people in party: {this.state.numPeople.toString()}</Text>
        </View>
        <View style={{paddingHorizontal:25, marginBottom:24}}>
          <Slider name="numPeople"
              minimumValue={2} 
              maximumValue={15} 
              step={1} 
              onValueChange={this.changePeopleVal} 
              value={this.state.numPeople} 
              handleLabel={this.state.numPeople.toString()} 
              thumbImage={require('../assets/or.png')}
              trackStyle={this.customStyles2.track}
              thumbStyle={this.customStyles2.thumb}/>
        </View>
        <View>
          <Text style={[this.customStyles2.topicHeader, {textAlign:'center'}]}>Tip Percentage: {this.state.tipPercent.toString()}%</Text>
        </View>

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
        <View style={{flexDirection:'row', height:50, justifyContent:'center', alignItems:'center', paddingHorizontal:10}}>
          <AwesomeButton backgroundColor='#FFDF00' textColor='rgb(3, 86, 41)' height={36} raiseLevel={1} onPress={() => {              
              this.setModalVisible(true);
            }} >VIEW/START ITEMIZING</AwesomeButton>
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
              style={{alignSelf:'center', zIndex:100}} />  
    </View>
    );
  }
}