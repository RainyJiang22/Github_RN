import {View, Text, Button} from 'react-native';
import styles from './styles';
import {router} from "expo-router";
import {Stack} from "expo-router/stack";
import Swiper from 'react-native-swiper';

export default function Details() {
    return (

        <View style={styles.container}>
            <Stack.Screen options={{
                title: "详情"
            }}/>

            <Swiper style={styles.wrapper} showsButtons={false}>
                <View style={styles.slide1}>
                    <Text style={styles.text}>Hello Swipe</Text>
                </View>
                <View style={styles.slide2}>
                    <Text style={styles.text}>Beautiful</Text>
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.text}>and Simple</Text>
                </View>
            </Swiper>
        </View>
    );
}
