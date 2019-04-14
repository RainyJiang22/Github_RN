/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';
//import WelcomePage from './js/page/WelcomePage';
import  AppNavigator from './js/navigator/AppNavigator';
//import Splash from './js/swiper/Splash';


import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppNavigator);
