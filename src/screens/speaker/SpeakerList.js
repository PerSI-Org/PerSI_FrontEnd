import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView} from 'react-native';
import styles from './style';
const MyGame = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={{flexGrow : 1}}>
        <Text>화자 목록</Text>
      </ScrollView>
    </View>
  );
};

export default MyGame;
