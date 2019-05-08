import React from 'react';
import {Image,View,Text,Dimensions,StyleSheet,Platform,DeviceInfo} from  'react-native';
import BackPressComponent from "../../common/BackPressComponent";
import NavigationUtil from "../../navigator/NavigationUtil";
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import GlobalStyles from "../../res/GlobalStyles";
import ViewUtil from "../../util/ViewUtil";
export const FLAG_ABOUT = {flag_about: 'about', flag_about_me: 'about_me'};
//const THEME_COLOR = '#2a8ffa';
export default class AboutCommon {

    constructor(props, updateState) {
        this.props = props;
        this.updateState = updateState;
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
    }

    onBackPress() {
        NavigationUtil.goBack(this.props.navigation);
        return true;
    }

    onShare() {
    }

    componentDidMount(){
        this.backPress.componentDidMount();
        fetch('http://localhost:8081/github_app_config.json')
            .then(response=>{
                if (response.ok){
                    return response.json();
                }
                throw new Error('Network Error');
            })
            .then(config=>{
                  if (config){
                      this.updateState({
                          data: config
                      })
                  }
            })
            .catch(e => {
                console(e);
            })
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    getParallaxRenderConfig(params) {
        let config = {};
        let avatar = typeof(params.avatar) === 'string' ? {uri: params.avatar} : params.avatar;
        config.renderBackground = () => (
            <View key="background">
                <Image source={{
                    uri: params.backgroundImg,
                    width: window.width,
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    width: window.width,
                    backgroundColor: 'rgba(0,0,0,.4)',
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
            </View>
        );
        //前景
        config.renderForeground = () => (
            <View key="parallax-header" style={styles.parallaxHeader}>
                <Image style={styles.avatar}
                       source={avatar}/>
                <Text style={styles.sectionSpeakerText}>
                    {params.name}
                </Text>
                <Text style={styles.sectionTitleText}>
                    {params.description}
                </Text>
            </View>
        );

        //顶部悬停设置
        config.renderStickyHeader = () => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.name}</Text>
            </View>
        );

        //左右两边按钮
        config.renderFixedHeader = () => (
            <View key="fixed-header" style={styles.fixedSection}>
                {ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation))}
                {ViewUtil.getShareButton(() => this.onShare())}
            </View>
        );
        return config;

    }



    render(contentView,params){
        const {theme} = this.props;
        const renderConfig = this.getParallaxRenderConfig(params);
        return (
            <ParallaxScrollView
                backgroundColor={theme.themeColor}
                contentBackgroundColor={GlobalStyles.backgroundColor}
                parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                backgroundScrollSpeed={10}
                // renderScrollComponent={() => <Animated.View />}
                {...renderConfig}>
                {contentView}
            </ParallaxScrollView>
        );


    }
}

const window = Dimensions.get('window');
const AVATAR_SIZE = 90;
const PARALLAX_HEADER_HEIGHT = 270;
const TOP = (Platform.OS === 'ios') ? 20 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0) : 0;
const STICKY_HEADER_HEIGHT = (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios + TOP : GlobalStyles.nav_bar_height_android;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        alignItems: 'center',
        paddingTop:TOP
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop:TOP
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5,
        marginBottom: 10
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 16,
        marginRight: 10,
        marginLeft: 10
    },
});
