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
import {JumpingTransition, SlideOutLeft} from 'react-native-reanimated';

const SecondRoute = ({navigation}) => {
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    let tmp = [
      {
        name: '김나현',
      },
      {
        name: '김현기',
      },
      {
        name: '김지우',
      },
      {
        name: '남윤재',
      },
    ];
    setSpeakers(tmp);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.spaceTitle}>
          <Text style={styles.title}>화자 목록</Text>
          <Text style={styles.descript}>총 4명</Text>
        </View>
        <View style={styles.contentBox}>
          {speakers.map((s, i) => (
            <>
              <View key={i} style={[styles.spaceB, {alignItems: 'center'}]}>
                <View style={styles.row}>
                  <Image
                    source={require('/assets/images/profile3.png')}
                    style={[
                      {
                        width: widthPercentage(35),
                        height: widthPercentage(35),
                        borderRadius: 30,
                        marginRight: widthPercentage(7),
                        borderColor: '#fff',
                        borderWidth: 2,
                      },
                    ]}
                  />
                  <Text style={styles.title}>{s.name}</Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    return navigation.navigate('ChatRoom');
                  }}>
                  <Image
                    source={require('/assets/images/modify.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.line} />
            </>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          return navigation.navigate('SpeakerList');
        }}>
        <View style={styles.button}>
          <Text style={styles.btnText}>화자 추가하기</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SecondRoute;
