import {createStackNavigator,
        createSwitchNavigator,
        createAppContainer} from 'react-navigation';

import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';

const InitNavigator = createStackNavigator({
    WelcomePage:{
        screen:WelcomePage,
        navigationOptions:{
            header:null
        }
    }
});


const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions:{
            header:null
        }
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions:{
            header:null
        }
    }
});

const SwitchNavigator = createSwitchNavigator({
    Init:{
        screen:InitNavigator
    },
    Main:{
        screen:MainNavigator
    }
}, {
    backBehavior: 'none'
});


export  default createAppContainer(SwitchNavigator);
