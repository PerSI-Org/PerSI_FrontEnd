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
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import ConfirmModal from '/components/ConfirmModal';

const FirstRoute = ({navigation, id}) => {
  const [rooms, setRooms] = useState([]);
  const [index, setIndex] = useState(-1); //삭제할 인덱스
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const getMeetings = async () => {
    try {
      const res = await axios.get(url + '/meetings/');
      // console.log('all meetings ========', res.data);
      setRooms(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteRoom = async index => {
    try {
      console.log(rooms[index].id);
      const res = await axios.delete(url + '/meetings/' + rooms[index].id);
      console.log('deleteSpeaker response: ', res.data);
      getMeetings();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMeetings();
  }, [navigation]);

  useEffect(() => {
    Icon.loadFont().catch(error => {
      console.info(error);
    });
    Ionicons.loadFont().catch(error => {
      console.info(error);
    });
    getMeetings();
    // let tmp = [
    //   {
    //     name: '음성인식 회의1',
    //     date: '2023.03.05',
    //     speakers_name: ['김나현', '김지우', '김현기', '남윤재'],
    //     duration: 35,
    //   },
    //   {
    //     name: '김나현',
    //     date: '2023.03.04',
    //     speakers_name: ['김나현'],
    //     duration: 52,
    //   },
    //   {
    //     name: '음성인식 회의1',
    //     date: '2023.03.02',
    //     speakers_name: ['김지우', '김현기', '남윤재'],
    //     duration: 63,
    //   },
    //   {
    //     name: '금요일 닭갈비 밥약',
    //     date: '2023.02.27',
    //     speakers_name: ['김지우', '남윤재'],
    //     duration: 13,
    //   },
    // ];
    // setRooms(tmp);
  }, []);

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
                {r.speakers_image && (
                  <View style={{marginRight: widthPercentage(10)}}>
                    {r.speakers_image?.length === 1 ? (
                      <FastImage
                        source={
                          r.speakers_image[0]
                            ? {
                                uri: r.speakers_image[0],
                                priority: FastImage.priority.normal,
                              }
                            : require('/assets/images/imgProfileEmpty.png')
                        }
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.profileImg1}
                      />
                    ) : r.speakers_image?.length === 2 ? (
                      <View
                        style={{
                          width: widthPercentage(56),
                          height: widthPercentage(56),
                          flex: 1,
                          justifyContent: 'space-between',
                        }}>
                        <FastImage
                          source={
                            r.speakers_image[0]
                              ? {
                                  uri: r.speakers_image[0],
                                  priority: FastImage.priority.normal,
                                }
                              : require('/assets/images/imgProfileEmpty.png')
                          }
                          resizeMode={FastImage.resizeMode.cover}
                          style={[
                            styles.profileImg2,
                            {
                              marginBottom: widthPercentage(-8),
                              marginRight: widthPercentage(-8),
                            },
                          ]}
                        />
                        <FastImage
                          source={
                            r.speakers_image[1]
                              ? {
                                  uri: r.speakers_image[1],
                                  priority: FastImage.priority.normal,
                                }
                              : require('/assets/images/imgProfileEmpty.png')
                          }
                          resizeMode={FastImage.resizeMode.cover}
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
                          <FastImage
                            source={
                              r.speakers_image[0]
                                ? {
                                    uri: r.speakers_image[0],
                                    priority: FastImage.priority.normal,
                                  }
                                : require('/assets/images/imgProfileEmpty.png')
                            }
                            resizeMode={FastImage.resizeMode.cover}
                            style={styles.profileImg4}
                          />
                          {r.speakers_image?.length >= 4 && (
                            <FastImage
                              source={
                                r.speakers_image[3]
                                  ? {
                                      uri: r.speakers_image[3],
                                      priority: FastImage.priority.normal,
                                    }
                                  : require('/assets/images/imgProfileEmpty.png')
                              }
                              resizeMode={FastImage.resizeMode.cover}
                              style={styles.profileImg4}
                            />
                          )}
                        </View>

                        <View style={styles.row}>
                          <FastImage
                            source={
                              r.speakers_image[2]
                                ? {
                                    uri: r.speakers_image[2],
                                    priority: FastImage.priority.normal,
                                  }
                                : require('/assets/images/imgProfileEmpty.png')
                            }
                            resizeMode={FastImage.resizeMode.cover}
                            style={styles.profileImg4}
                          />
                          <FastImage
                            source={
                              r.speakers_image[1]
                                ? {
                                    uri: r.speakers_image[1],
                                    priority: FastImage.priority.normal,
                                  }
                                : require('/assets/images/imgProfileEmpty.png')
                            }
                            resizeMode={FastImage.resizeMode.cover}
                            style={styles.profileImg4}
                          />
                        </View>
                      </>
                    )}
                  </View>
                )}
                <View style={styles.spaceB}>
                  <View>
                    <Text style={styles.subtitle}>{r.name}</Text>
                    <Text style={styles.descript}>
                      {r.speakers_name[0]}님
                      {r.speakers_name?.length !== 1 &&
                        ' 외 ' + (r.speakers_name?.length - 1) + '명'}
                      과의 대화
                    </Text>
                    <Text style={styles.descript}>
                      {r.created_at?.slice(0, 4)}.{r.created_at?.slice(4, 6)}.
                      {r.created_at?.slice(6, 8)}.
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setIndex(i);
                      setIsConfirmVisible(true);
                    }}>
                    <Ionicons name={'delete'} size={20} color="#9496A1" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          return navigation.navigate({name: 'RecordConv', params: {id: id, getMeetings: getMeetings}});
        }}>
        <View style={styles.button}>
          <Text style={styles.btnText}>대화 생성하기</Text>
        </View>
      </TouchableOpacity>
      <ConfirmModal
        visible={isConfirmVisible}
        setVisible={setIsConfirmVisible}
        onPress={() => {
          deleteRoom(index);
          setIndex(-1);
          setIsConfirmVisible(false);
        }}
        isCancel={true}
        title={'대화방을 정말 삭제하시겠습니까?'}
        content={'삭제된 대화 정보는 다시 복구할 수 없습니다.'}
      />
    </View>
  );
};

export default FirstRoute;
