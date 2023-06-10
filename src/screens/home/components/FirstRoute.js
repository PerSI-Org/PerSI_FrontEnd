import React, {useEffect, useState, useCallback} from 'react';
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
import url from '/utils/backend';
import axios from 'axios';
import {widthPercentage} from '/Responsive';

const FirstRoute = ({navigation, id}) => {
  const [rooms, setRooms] = useState([]);

  const getMeeting = async () => {
    try {
      const res = await axios.get(url + '/meetings/');
      console.log('all meetings ========', res.data);
      // setRooms(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMeeting();
    let tmp = [
      {
        name: '음성인식 회의1',
        date: '2023.03.05',
        members: ['김나현', '김지우', '김현기', '남윤재'],
        duration: 35,
      },
      {name: '김나현', date: '2023.03.04', members: ['김나현'], duration: 52},
      {
        name: '음성인식 회의1',
        date: '2023.03.02',
        members: ['김지우', '김현기', '남윤재'],
        duration: 63,
      },
      {
        name: '금요일 닭갈비 밥약',
        date: '2023.02.27',
        members: ['김지우', '남윤재'],
        duration: 13,
      },
    ];
    setRooms(tmp);
  }, []);

  const getConvLists = async () => {
    try {
      const res = await axios.post(url + '/users/login', {
        'email': email,
        'password' : password,
      });
      console.log(res.data);
      alert('성공');
      navigation.reset({routes: [{name: 'Main'}]});
    } catch (e) {
      alert('실패');
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.spaceTitle}>
          <Text style={styles.title}>최근 대화 목록</Text>
        </View>
        {rooms.map((r, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              return navigation.navigate({
                name: 'ChatRoom',
                params: {header: r.name},
              });
            }}>
            <View key={i} style={styles.contentBox}>
              <View style={styles.row}>
                <View style={{marginRight: widthPercentage(10)}}>
                  {r.members.length === 1 ? (
                    <Image
                      source={require('/assets/images/profile1.png')}
                      style={styles.profileImg1}
                    />
                  ) : r.members.length === 2 ? (
                    <View
                      style={{
                        width: widthPercentage(56),
                        height: widthPercentage(56),
                        flex: 1,
                        justifyContent: 'space-between',
                      }}>
                      <Image
                        source={require('/assets/images/profile3.png')}
                        style={[
                          styles.profileImg2,
                          {
                            marginBottom: widthPercentage(-8),
                            marginRight: widthPercentage(-8),
                          },
                        ]}
                      />
                      <Image
                        source={require('/assets/images/profile4.png')}
                        style={[
                          styles.profileImg2,
                          {
                            justifyContent: 'flex-end',
                            marginTop: widthPercentage(-8),
                            marginLeft: widthPercentage(19),
                          },
                        ]}
                      />
                    </View>
                  ) : (
                    <>
                      <View style={styles.center}>
                        <Image
                          source={require('/assets/images/profile1.png')}
                          style={styles.profileImg4}
                        />
                        {r.members.length >= 4 && (
                          <Image
                            source={require('/assets/images/profile2.png')}
                            style={styles.profileImg4}
                          />
                        )}
                      </View>

                      <View style={styles.row}>
                        <Image
                          source={require('/assets/images/profile3.png')}
                          style={styles.profileImg4}
                        />
                        <Image
                          source={require('/assets/images/profile4.png')}
                          style={styles.profileImg4}
                        />
                      </View>
                    </>
                  )}
                </View>
                <View style={styles.spaceB}>
                  <View>
                    <Text style={styles.subtitle}>{r.title}</Text>
                    <Text style={styles.descript}>
                      {r.members[0]}님
                      {r.members.length !== 1 &&
                        ' 외 ' + (r.members.length - 1) + '명'}
                      과의 대화
                    </Text>
                    <Text style={styles.descript}>
                      {r.date} 금요일 {r.duration}분
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      return navigation.navigate('SpeakerList');
                    }}>
                    <Image
                      source={require('/assets/images/more.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          return navigation.navigate({name: 'RecordConv', params: {id: id}});
        }}>
        <View style={styles.button}>
          <Text style={styles.btnText}>대화 생성하기</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FirstRoute;
