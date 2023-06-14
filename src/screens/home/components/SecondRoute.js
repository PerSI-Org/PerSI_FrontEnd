import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
import styles from '../style';
import {widthPercentage} from '/Responsive';
import url from '/utils/backend';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import ConfirmModal from '/components/ConfirmModal';
import FastImage from 'react-native-fast-image';

const SecondRoute = ({navigation, id}) => {
  const [speakers, setSpeakers] = useState([]);
  const [index, setIndex] = useState(-1); //삭제할 인덱스
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const getSpeaker = async () => {
    try {
      const res = await axios.get(url + '/speakers/');
      // console.log('all speaker ++==========', res.data);
      setSpeakers(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteSpeaker = async index => {
    try {
      console.log(speakers[index].id);
      const res = await axios.delete(url + '/speakers/' + speakers[index].id);
      // console.log('deleteSpeaker response: ', res.data);
      getSpeaker();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    Icon?.loadFont().catch(error => {
      console.info(error);
    });
    Ionicons?.loadFont().catch(error => {
      console.info(error);
    });
    getSpeaker();
  }, []);

  useEffect(() => {
    getSpeaker();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.spaceTitle}>
          <Text style={styles.title}>화자 목록</Text>
          <Text style={styles.descript}>총 {speakers.length}명</Text>
        </View>
        <View style={styles.contentBox}>
          {speakers.map((s, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                return navigation.navigate({
                  name: 'Modify',
                  params: {id: s.id, getSpeaker: getSpeaker},
                });
              }}>
              <View style={[styles.spaceB, {alignItems: 'center'}]}>
                <View style={styles.row}>
                  <Image
                    source={
                      s.profile_image
                        ? {uri: s.profile_image}
                        : require('/assets/images/imgProfileEmpty.png')
                    }
                    style={styles.profileImg}
                  />
                  <Text style={styles.title}>{s.name}</Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setIndex(i);
                    setIsConfirmVisible(true);
                  }}>
                  <Ionicons name={'delete'} size={20} color="#9496A1" />
                </TouchableOpacity>
              </View>
              {i !== speakers.length - 1 && <View style={styles.line} />}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          console.log('id: ', id);
          return navigation.navigate({
            name: 'Register',
            params: {id: id, getSpeaker: getSpeaker},
          });
        }}>
        <View style={styles.button}>
          <Text style={styles.btnText}>화자 추가하기</Text>
        </View>
      </TouchableOpacity>
      <ConfirmModal
        visible={isConfirmVisible}
        setVisible={setIsConfirmVisible}
        onPress={() => {
          deleteSpeaker(index);
          getSpeaker();
          setIndex(-1);
          setIsConfirmVisible(false);
        }}
        isCancel={true}
        title={'화자를 정말 삭제하시겠습니까?'}
        content={'삭제된 화자의 음성 정보는 다시 복구할 수 없습니다.'}
      />
    </View>
  );
};

export default SecondRoute;
