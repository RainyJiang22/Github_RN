import React, {Component} from 'react';
import {Image,StyleSheet,Text,View} from 'react-native';
import {TouchableOpacity} from "react-native-gesture-handler";
import HTMLView from 'react-native-htmlview';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BaseItem from "./BaseItem";

export default class TrendingItem extends BaseItem{
      render(){
          const {projectModel} = this.props;
         const {item} = projectModel;
         if (!item ){
             return null;
         }
         // let favoriteButton=
         //     <TouchableOpacity
         //         style={{padding: 6,}}
         //         onPress={() => {
         //         }}
         //         underlayColor={'transparent'}
         //     >
         //         <FontAwesome
         //           name={'star-o'}
         //           size={26}
         //           style={{color:'#2a8ffa'}}
         //         />
         //     </TouchableOpacity>;
          let description = '<p>' + item.description + '</p>';
         return (
           <TouchableOpacity
               onPress={() => this.onItemClick()}
           >

               <View style={styles.cell_container}>
                   <Text style={styles.title}>
                       {item.fullName}
                   </Text>
                   <HTMLView
                      value={description}
                      //调装到指定的界面
                      onLinkPress={(url) => {
                      }}
                      stylesheet={{
                          p: styles.description,
                          a: styles.description,
                      }}
                   />
                   <Text style={styles.description}>
                       {item.meta}
                   </Text>
                  <View style={styles.tandem}>
                      <View style={styles.tandem}>
                          <Text>Built By:</Text>
                          {item.contributors.map((result,i,arr) => {
                             return  <Image
                                     key={i}
                                     style={{height:22,width:22,marginLeft: 4,margin:2}}
                                     source={{uri: arr[i]}}
                              />
                          })}
                      </View>
                      {this._favoriteIcon()}
                  </View>
               </View>

           </TouchableOpacity>
         );
      }
}

const styles  = StyleSheet.create({
    cell_container: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    },
    tandem: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575',
    }

});
