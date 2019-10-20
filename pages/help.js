import React from 'react';
import {View, Text, ScrollView, Linking} from 'react-native';
import styleMain from './styles.js';
import AwesomeButton from "react-native-really-awesome-button";

export default class Help extends React.Component{
  content="";
  title="";

  render(){
    const { navigation } = this.props;
    const { goBack } = this.props.navigation;
    
    if(navigation.getParam('backPage') === 'Total'){
      this.title="Total Sum";
      this.content = `Enter in the total amount for the bill including taxes.\n
Enter in the total amount of the tax for the bill. (Not needed if you are going to include the tax as part of the tip calculation.)\n
Toggle the Include Taxes switch if you do not intend to include takes in your calculation.\n
Drag the slider to increase or decrease the tip percentage.\n`;
    }else if(navigation.getParam('backPage') === 'Even'){
      this.title="Even Steven";
      this.content = `Enter in the total amount for the bill including taxes. \n
Enter in the total amount of the tax for the bill. (Not needed if you are going to include the tax as part of the tip calculation.)\n
Toggle the Include Taxes switch if you do not intend to include takes in your calculation.\n
Drag the slider to increase or decrease the number of members in your party.\n
Drag the slider to increase or decrease the tip percentage.\n`;
}else if(navigation.getParam('backPage') === 'Itemized'){
      this.title="Itemize";
      this.content = `Enter in the total amount for the bill including taxes and total taxes for the bill. (This is needed to determine the exact tax rate.)\n
Toggle the Include Taxes switch if you do not intend to include takes in your calculation.\n
Drag the slider to increase or decrease the number of people in the party. Couples or groups of people that want to group thier portion of a bill should be counted as one.\n
Drag the slider to increase or decrease the tip percentage.\n
Click on the View/Itemizing button. If the Total Bill value is not set, you will not be able to proceed.\n
In the new window you can swipe right or left at any time to scroll though each of the party members. Note that when you add an item it only adds to the peron currently displayed on the screen.\n
While the desired party member is on the screen, enter in the item price, then enter in the number of ways the cost of the item should be split. This will divide the price into equal parts.\n
Click the Add to Person button.\n
You will still need to add the same split into each party member that shared the item.\n
A running total will show you how much of the bill is remaining to ensure the entire bill is covered.\n
You can click on the Back to the Bill button at any time to make adjustments to the bill like tip percentage, tax amount, etc.\n`
}else if(navigation.getParam('backPage') === 'Settings'){
      this.title="Setting";
      this.content = `In the settings you can enter in the default values for the tip percentage, number of people in the party and whether you want to include taxes in your tip calculations\n
      Each change is auto-saved into your cookies. Deleting the cookies removes these values.`
}else{
      this.title="Tip 'em";
      this.content = `Tip 'em allows you to choose from 0% to 30%. You can also choose to include the taxes in the top calculation or exclude it.\n
Total Sum mode applies the tip to one lump sum for the entire purchase.\n
Even Steven mode divides the check into even parts. (Up to 15 party members)\n
Itemized mode allows you to assign specific dollar amounts to up to 15 party members based on the prices of individual items and you can even split the cost of an item between varying multiple people.\n
Click on any one of the buttons on the main page to enter that tip calculator.\n`
    };

   
    return(
      <View style={[styleMain.container, styleMain.vStack]}>
        <Text style={{fontSize:32, alignSelf:'center', paddingTop:24}}>{this.title}</Text>
        <ScrollView style={{padding:25,  marginBottom:12}}>
          <Text>{this.content}</Text>
          <Text>Graphics used this app were supplied by </Text><Text style={{color: 'rgb(3, 86, 41)'}} onPress={() => Linking.openURL('https://www.vecteezy.com/')}>Vecteezy.com</Text>
          <View style={{flexDirection:'row', height:50, justifyContent:'center', alignItems:'center', marginHorizontal:10, marginVertical:24}}>
            <AwesomeButton backgroundColor='#FFDF00' textColor='rgb(3, 86, 41)' height={36} raiseLevel={1} onPress={() =>  goBack()} style={{marginRight:10}} >Back</AwesomeButton>
          </View>
        </ScrollView>
      </View>
    )
  }
}