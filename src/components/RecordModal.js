import React, {useState, useEffect} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {widthPercentage, heightPercentage, fontPercentage} from '/Responsive';
import Modal from 'react-native-modal';
import styles from './style';

const RecordModal = ({visible, setVisible}) => {
  const [isStarted, setIsStarted] = useState(false);
  return (
    <Modal onBackdropPress={() => setVisible(false)} isVisible={visible}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.container}>
          {!isStarted ? (
            <>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>
                  음성 등록을 위한 녹음을 시작할게요!
                </Text>
                <Text style={styles.text}>녹음은 약 8분 정도 소요됩니다.</Text>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.contentImage}
                  source={require('assets/images/talking.png')}
                />
              </View>

              <View style={styles.titleContainer}>
                <Text style={styles.text}>녹음할 문장은 총 20개 입니다.</Text>
                <Text style={styles.text}>
                  녹음 중 이어폰이나 블루투스 기기가 연결되면
                </Text>
                <Text style={styles.text}>
                  성능과 관련된 문제가 발생할 수 있습니다.
                </Text>
              </View>
              <View style={styles.spaceB}>
                <TouchableOpacity
                  style={styles.calcelButton}
                  onPress={() => setVisible(false)}>
                  <Text style={styles.calcelBtnText}>녹음 취소</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setIsStarted(true)}>
                  <Text style={styles.btnText}>녹음 시작</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>다음과 같이 말해보세요!</Text>
                <Text style={styles.text}>1 / 20</Text>
              </View>
              <View style={styles.scriptContainer}>
                <Text style={styles.title}>산허리는 온통 메밀밭이어서</Text>
                <Text style={styles.title}>
                  피기 시작한 꽃이 소금을 뿌린듯이
                </Text>
                <Text style={styles.title}>
                  흐붓한 달빛에 숨이 막힐 지경이다.
                </Text>
              </View>

              <View style={styles.spaceB}>
                <TouchableOpacity
                  style={styles.calcelButton}
                  onPress={() => setVisible(false)}>
                  <Text style={styles.calcelBtnText}>녹음 취소</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {setVisible(false); setIsStarted(false)}}>
                  <Text style={styles.btnText}>녹음 완료</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};
export default RecordModal;
