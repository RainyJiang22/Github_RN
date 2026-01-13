import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from './styles';
import Details from "./details";

const Stack = createNativeStackNavigator();

export default function Index({navigation}) {
    return (
        <View style={styles.container}>
            <Text>这里是首页</Text>
            <Button title="跳转到详情" onPress={()=> navigation.navigate(Details)}></Button>
        </View>
    );
}


// export default function Index() {
//
//     const [selectedIndex, setSelectedIndex] = useState(0)
//
//     return (
//         <View style={styles.container}>
//
//
//             <View style={styles.segmentContainer}>
//
//                 <SegmentedControl
//                     values={['登陆', '会员注册']}
//                     selectedIndex={selectedIndex}
//                     style={styles.segmented}
//                     onChange={event => {
//                         setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
//                     }}>
//                 </SegmentedControl>
//             </View>
//
//
//             <Text>这里是首页</Text>
//
//
//             <Button title="跳转到详情页" onPress={() => router.navigate('/webview')}/>
//         </View>
//     )
// }
