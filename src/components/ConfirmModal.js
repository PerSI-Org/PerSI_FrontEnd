import React, {useState, useEffect} from 'react';
import {View, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import {widthPercentage, heightPercentage, fontPercentage} from '/Responsive';
import Modal from 'react-native-modal';
import styles from './style';

const ConfirmModal = ({
  visible,
  setVisible,
  title,
  content,
  onPress,
  isCancel = false,
}) => {
  return (
    <Modal onBackdropPress={() => setVisible(false)} isVisible={visible}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.text}>{content}</Text>
          </View>
          <View style={styles.spaceB}>
            {isCancel ? (
              <TouchableOpacity
                style={styles.calcelButton}
                onPress={() => setVisible(false)}>
                <Text style={styles.calcelBtnText}>취소</Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              style={isCancel ? styles.button : styles.longButton}
              onPress={onPress}>
              <Text style={styles.btnText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default ConfirmModal;
