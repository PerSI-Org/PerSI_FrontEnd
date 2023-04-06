import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import styles from './style';
import {ScrollView} from 'react-native-gesture-handler';
import url from '../utils/backend';
import axios from 'axios';

const Main = () => {
  const navigation = useNavigation();

  useEffect(() => {}, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            return navigation.navigate('SpeakerList');
          }}>
          <View style={styles.button}>
            <Text style={styles.btnText}>화자 목록</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Main;
