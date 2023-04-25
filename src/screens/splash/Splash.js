import React, {useEffect, useCallback} from 'react';
import {View, ImageBackground} from 'react-native';
import styles from './style';

const image = '../../assets/images/splash.png';

const Splash = ({navigation, route}) => {
  useEffect(() => {
    try {
      setTimeout(() => {
        navigation.reset({routes: [{name: 'Main'}]});
      }, 1000); /** 스플래시 시간 조절 (1초) **/
    } catch (e) {
      console.warn(e);
    }
  }, []);
  
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require(image)}
        resizeMode="cover"
        style={styles.image}
      />
    </View>
  );
};

export default Splash;
