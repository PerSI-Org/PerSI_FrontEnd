import styles from './style';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Image, TouchableOpacity, Platform} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
  PermissionsAndroid,
} from 'react-native-permissions';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentage} from '/Responsive';
import ConfirmModal from '/components/ConfirmModal';

Icon.loadFont();
Ionicons.loadFont();
const audioRecorderPlayer = new AudioRecorderPlayer();

function RecordConv() {
  const navigation = useNavigation();
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [isAlreadyRecording, setisAlreadyRecording] = useState(false);
  const [isAlreadyPlay, setisAlreadyPlay] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
    // audioRecorderPlayer.addRecordBackListener(e => {
    //   setRecordSecs(e.currentPosition);
    //   setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
    //   return;
    // });
    console.log(result);
  };

  const onStopRecord = async () => {
    setisAlreadyRecording(false);
    setRecordSecs('00:00:00');
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setIsConfirmVisible(true);
    console.log(result);
  };

  const onStartPlay = async () => {
    onPauseRecord();
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer();
    audioRecorderPlayer.setVolume(1.0);
    setisAlreadyPlay(true);
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener(e => {
      setCurrentPositionSec(e.currentPosition);
      setCurrentDurationSec(e.duration);
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
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
    checkRecord();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.views}>
        <View style={styles.center}>
          <Text style={styles.descText}>
            {isAlreadyRecording ? '녹음 중입니다' : '녹음 중이 아닙니다'}
          </Text>
        </View>
        <View style={styles.center}>
          <Text style={styles.timeText}>{recordTime}</Text>
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
        {!isFirst &&
          (!isAlreadyPlay ? (
            <TouchableOpacity onPress={() => onStartPlay()}>
              <Icon name="controller-play" size={32} color="#3D425C" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => onPausePlay()}>
              <Ionicons name="pause" size={32} color="#3D425C" />
            </TouchableOpacity>
          ))}
        {!isAlreadyRecording ? (
          <TouchableOpacity
            style={styles.playButtonContainer}
            onPress={() => {
              if (isFirst) {
                onStartRecord();
              } else {
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
      <ConfirmModal
        visible={isConfirmVisible}
        setVisible={setIsConfirmVisible}
        onPress={() => {
          setIsConfirmVisible(false);
          navigation.navigate('Main');
        }}
        title={'대화 녹음이 완료되었습니다!'}
        content={'등록된 화자는 화자 목록에서 확인할 수 있습니다.'}
      />
    </View>
  );
}

export default RecordConv;
