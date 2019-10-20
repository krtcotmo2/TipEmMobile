import {createStackNavigator} from 'react-navigation-stack';

//PAGES
import Main from '../pages/main';
import Even from '../pages/even';
import Total from '../pages/total';
import Itemized from '../pages/itemized';
import Help from '../pages/help';

//NAVIGATION
const AppNavigator = createStackNavigator({
  Main : {screen: Main},
  Even : {screen: Even},
  Total : {screen: Total},
  Itemized : {screen: Itemized},
  Help : {screen: Help },
},
{
  initialRouteName: 'Main',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 })

export default AppNavigator;