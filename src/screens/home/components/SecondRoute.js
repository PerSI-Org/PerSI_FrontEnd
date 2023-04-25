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

const SecondRoute = ({navigation}) => {
  const [speakers, setSpeakers] = useState([]);
  const [peopleNum, setPeopleNum] = useState(4);

  useEffect(() => {
    let tmp = [
      {
        name: '김나현',
        image: '/assets/images/profile3.png',
      },
      {
        name: '김현기',
        image: '/assets/images/profile2.png',
      },
      {
        name: '김지우',
        image: '/assets/images/profile1.png',
      },
      {
        name: '남윤재',
        image: '/assets/images/profile4.png',
      },
    ];
    setSpeakers(tmp);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.spaceTitle}>
          <Text style={styles.title}>화자 목록</Text>
          <Text style={styles.descript}>총 {peopleNum}명</Text>
        </View>
        <View style={styles.contentBox}>
          {speakers.map((s, i) => (
            <View key={i}>
              <View style={[styles.spaceB, {alignItems: 'center'}]}>
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
                    style={[styles.icon, {width: widthPercentage(20),
                      height: widthPercentage(20),}]}
                  />
                </TouchableOpacity>
              </View>
              {i !== speakers.length - 1 && <View style={styles.line} />}
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          return navigation.navigate('Register');
        }}>
        <View style={styles.button}>
          <Text style={styles.btnText}>화자 추가하기</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SecondRoute;
