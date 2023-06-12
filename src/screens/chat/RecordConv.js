import styles from './style';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
  PermissionsAndroid,
} from 'react-native-permissions';
import Slider from '@react-native-community/slider';
import {useNavigation} from '@react-navigation/native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentage} from '/Responsive';
import Modal from 'react-native-modal';
import url from '/utils/backend';
import axios from 'axios';
import WaitModal from '/components/WaitModal';

const audioRecorderPlayer = new AudioRecorderPlayer();

function RecordConv({route}) {
  const navigation = useNavigation();
  const [inprogress, setInprogress] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [percent, setPercent] = useState(0);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isWaitVisible, setIsWaitVisible] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [isAlreadyRecording, setisAlreadyRecording] = useState(false);
  const [isAlreadyPlay, setisAlreadyPlay] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [filePath, setFilePath] = useState('');
  const {getMeetings} = route.params;

  const id = route.params.id;

  const createMeeting = async () => {
    try {
      setIsConfirmVisible(false);
      const res = await axios.post(url + '/meetings/', {
        name: title,
        description: desc,
        owner_id: id,
      });
      uploadFile(res.data.id);
    } catch (e) {
      console.log(e);
    }
  };

  const uploadFile = meetingId => {
    let body = new FormData();
    body.append('file', {
      uri: filePath,
      type: 'audio/*',
      name: 'audio.m4a',
    });
    fetch(url + '/uploadfile/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body,
    })
      .then(response => response.json())
      .then(res => {
        addAudio(meetingId, res.file_url);
      })
      .catch(error => {
        console.error('Errors:', error);
      });
  };

  const addAudio = async (meetingId, fileUrl) => {
    try {
      // console.log('!!===========fileUrl : ', fileUrl);
      // console.log('!!===========id : ', meetingId);
      const res = await axios.post(
        url + '/meetings/meeting/' + meetingId + '/audio',
        {
          audio_file_url: fileUrl,
        },
      );
      console.log('/meetings/meeting/: ', res.data);
      createConv(meetingId);
    } catch (e) {
      alert('등록 실패');
      console.log(e);
    }
  };

  const createConv = async meetingId => {
    try {
      const res = await axios.post(url + '/meetings/conversation/' + meetingId);
      console.log('드디어 성공!!', res.data);
      setIsWaitVisible(false);
      getMeetings();
      navigation.pop();
    } catch (e) {
      setIsWaitVisible(false);
      console.log(e);
    }
  };

  const checkRecord = async () => {
    try {
      const result = await request(PERMISSIONS.IOS.SPEECH_RECOGNITION);
      if (result === RESULTS.BLOCKED) {
        openSettings();
      }
    } catch (e) {
      console.log(`에러 \n ${e}`);
    }
  };
  const onStartRecord = async () => {
    setIsFirst(false);
    setisAlreadyRecording(true);
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordSecs(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      return;
    });
    console.log(result);
  };

  const onPauseRecord = async () => {
    setisAlreadyRecording(false);
    const result = await audioRecorderPlayer.pauseRecorder();
    setRecordSecs('00:00:00');
    console.log(result);
  };
  const onResumeRecord = async () => {
    setisAlreadyRecording(true);
    const result = await audioRecorderPlayer.resumeRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordSecs(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      return;
    });
    console.log(result);
  };

  const onStopRecord = async () => {
    setisAlreadyRecording(false);
    setRecordSecs('00:00:00');
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setIsConfirmVisible(true);
    console.log(result);
    setFilePath(result);
  };

  const onStartPlay = async () => {
    setisAlreadyPlay(true);
    setInprogress(true);
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer();
    audioRecorderPlayer.setVolume(1.0);
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener(e => {
      if (e.current_position === e.duration) {
        audioRecorderPlayer.stopPlayer();
      }
      let percent = 0;
      if (e.currentPosition !== undefined) {
        try {
          percent = Math.round(
            (Math.floor(e.currentPosition) / Math.floor(e.duration)) * 100,
          );
        } catch (error) {
          console.error(error);
        }
      }
      setPercent(percent);
      setCurrentPositionSec(e.currentPosition);
      setCurrentDurationSec(e.duration);
      // setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      // setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
      return;
    });
  };

  const onPausePlay = async () => {
    console.log('onPausePlay');
    setisAlreadyPlay(false);
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    console.log('onStopPlay');
    setisAlreadyPlay(false);
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  const changeTime = async seconds => {
    // 50 / duration
    let seektime = (seconds / 100) * currentDurationSec;
    setCurrentPositionSec(seektime);
    audioRecorderPlayer.seekToPlayer(seektime);
  };

  useEffect(() => {
    navigation.setOptions({
      title: '대화녹음',
      headerStyle: {
        backgroundColor: '#60AAEF',
      },
      headerTitleAlign: 'center',
      // Header의 텍스트, 버튼 색상
      headerTintColor: '#ffffff',
      // 타이틀 텍스트의 스타일
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
      },
    });
  }, [navigation]);

  useEffect(() => {
    Icon.loadFont().catch(error => {
      console.info(error);
    });
    Ionicons.loadFont().catch(error => {
      console.info(error);
    });
    checkRecord();
  }, []);

  useEffect(() => {
    console.log('isWaitVisible', isWaitVisible);
  }, [isWaitVisible]);

  return (
    <View style={styles.container}>
      {!isWaitVisible && (
        <>
          <View style={styles.views}>
            <View style={styles.center}>
              <Text style={styles.descText}>
                {isAlreadyRecording ? '녹음 중입니다' : '녹음 중이 아닙니다'}
              </Text>
            </View>
            <View style={styles.center}>
              <Text style={styles.timeText}>{recordTime.slice(0, -3)}</Text>
            </View>

            <View style={styles.imageContainer}>
              <Image
                source={require('/assets/images/recording.png')}
                style={
                  isAlreadyRecording
                    ? {
                        width: widthPercentage(260),
                        height: widthPercentage(260),
                        opacity: 0.9,
                      }
                    : {
                        width: widthPercentage(260),
                        height: widthPercentage(260),
                        opacity: 0.5,
                      }
                }
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {!isFirst && <View style={{width: widthPercentage(32)}} />}
            {!isAlreadyRecording ? (
              <TouchableOpacity
                style={styles.playButtonContainer}
                onPress={() => {
                  if (isFirst) {
                    onStartRecord();
                  } else {
                    console.log('resume!!!!');
                    onResumeRecord();
                  }
                }}>
                <Icon name={'controller-record'} size={50} color="#E95C56" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.playButtonContainer}
                onPress={() => onPauseRecord()}>
                <Ionicons name={'pause'} size={50} color="#3D425C" />
              </TouchableOpacity>
            )}
            {!isFirst && (
              <TouchableOpacity onPress={() => onStopRecord()}>
                <Icon name="controller-stop" size={32} color="#3D425C" />
              </TouchableOpacity>
            )}
          </View>
          <Modal isVisible={isConfirmVisible}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View style={styles.modalContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>
                    {'대화 녹음이 완료되었습니다!'}
                  </Text>
                </View>
                <View style={styles.playBox}>
                  <View style={styles.row}>
                    <View style={styles.seekbar}>
                      <Slider
                        minimumValue={0}
                        maximumValue={100}
                        trackStyle={styles.track}
                        thumbStyle={styles.thumb}
                        value={percent}
                        minimumTrackTintColor="#93A8B3"
                        onValueChange={seconds => changeTime(seconds)}
                      />
                      <View style={styles.inprogress}>
                        <Text style={[styles.textLight, styles.timeStamp]}>
                          {!inprogress
                            ? currentPositionSec
                            : audioRecorderPlayer.mmssss(
                                Math.floor(currentPositionSec),
                              )}
                        </Text>
                        {!isAlreadyPlay ? (
                          <TouchableOpacity onPress={() => onStartPlay()}>
                            <Icon
                              name="controller-play"
                              size={32}
                              color="#3D425C"
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity onPress={() => onPausePlay()}>
                            <Ionicons name="pause" size={32} color="#3D425C" />
                          </TouchableOpacity>
                        )}
                        <Text style={[styles.textLight, styles.timeStamp]}>
                          {!inprogress
                            ? currentDurationSec
                            : audioRecorderPlayer.mmssss(
                                Math.floor(currentDurationSec),
                              )}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.itemBox}>
                  {/* <Text style={styles.title}>대화 제목</Text> */}
                  <TextInput
                    style={styles.nameInputBox}
                    placeholder={'대화 이름을 입력하세요.'}
                    placeholderTextColor={'#999'}
                    onChangeText={text => setTitle(text)}
                    underlineColorAndroid="transparent"
                  />
                  <TextInput
                    style={styles.nameInputBox}
                    placeholder={'대화 설명을 입력하세요.'}
                    placeholderTextColor={'#999'}
                    onChangeText={text => setDesc(text)}
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.text}>
                    {'등록된 화자는 화자 목록에서 확인할 수 있습니다.'}
                  </Text>
                </View>
                <View style={styles.spaceB}>
                  <TouchableOpacity
                    style={styles.calcelButton}
                    onPress={() => setIsConfirmVisible(false)}>
                    <Text style={styles.calcelBtnText}>취소</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      createMeeting();
                      setIsWaitVisible(true);
                    }}>
                    <Text style={styles.btnText}>확인</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
      <WaitModal visible={isWaitVisible} setVisible={setIsWaitVisible} />
    </View>
  );
}

export default RecordConv;
