import React, {useState, useEffect} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {widthPercentage, heightPercentage, fontPercentage} from '/Responsive';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import styles from './style';
import url from '/utils/backend';
import axios from 'axios';

const RecordModal = ({visible, setVisible}) => {

  return (
    <Modal onBackdropPress={() => setVisible(false)} isVisible={visible}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {'서버에 대화 음성을 보내는 중입니다!'}
            </Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.text}>{'잠시만 기다려주세요.'}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default RecordModal;
