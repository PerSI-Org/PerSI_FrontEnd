import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView} from 'react-native';
import styles from './style';

const ChatRoom = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={{flexGrow : 1}}>
        <Text>대화방</Text>
      </ScrollView>
    </View>
  );
};

export default ChatRoom;
