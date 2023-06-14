import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
  PermissionsAndroid,
} from 'react-native-permissions';
import Slider from '@react-native-community/slider';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Icon from 'react-native-vector-icons/AntDesign';
import url from '/utils/backend';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import styles from './style';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentage, heightPercentage} from '/Responsive';
import {NavigationContainer, useNavigation} from '@react-navigation/native';


const audioRecorderPlayer = new AudioRecorderPlayer();

Icon?.loadFont().catch(error => {
  console.info(error);
});
Ionicons?.loadFont().catch(error => {
  console.info(error);
});

function ChatRoom({route}) {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const [isAlreadyPlay, setisAlreadyPlay] = useState(false);
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [percent, setPercent] = useState(0);
  const [current_track, setCurrentTrack] = useState(0);
  const [inprogress, setInprogress] = useState(false);
  const [names, setNames] = useState({});
  const [images, setImages] = useState({});
  const [convFile, setConvFile] = useState({});
  const data = route.params.data;

  const id = route.params.data.id;

  // 대화 정보 가져오기
  const getMeeting = async () => {
    try {
      console.log('id:', id);
      const res = await axios.get(url + '/meetings/' + id);
      console.log('Existing Info: ', res.data);
      setConvFile(res.data.conversation_file);
      setChats(res.data.conversations);
    } catch (e) {
      console.log(e);
    }
  };

  const changeTime = async seconds => {
    // 50 / duration
    if (seconds !== undefined) {
      let seektime = parseInt((seconds / 100) * currentDurationSec, 10);
      setCurrentPositionSec(seektime);
      audioRecorderPlayer.seekToPlayer(seektime);
    }
  };

  const onStartPlay = async () => {
    setisAlreadyPlay(true);
    setInprogress(true);
    console.log('onStartPlay', convFile);
    const msg = await audioRecorderPlayer.startPlayer(convFile, null);
    audioRecorderPlayer.setVolume(1.0);
    console.log(msg); 
    audioRecorderPlayer.addPlayBackListener(e => {
      if (e.current_position === e.duration) {
        audioRecorderPlayer.stopPlayer();
      }
      let p;
      if (e.currentPosition !== undefined) {
        try {
          p = Math.round(
            (Math.floor(e.currentPosition) / Math.floor(e.duration)) * 100,
          );
        } catch (error) {
          console.error(error);
        }
      }
      if (typeof p === 'number') {
        setPercent(p);
      }
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

  // const onStartPress = async e => {
  //   setisAlreadyPlay(true);
  //   setInprogress(true);
  //   const path = convFile;
  //   audioRecorderPlayer.startPlayer(path);
  //   audioRecorderPlayer.setVolume(1.0);

  //   audioRecorderPlayer.addPlayBackListener(async e => {
  //     if (e.current_position === e.duration) {
  //       audioRecorderPlayer.stopPlayer();
  //     }
  //     let percent = Math.round(
  //       (Math.floor(e.current_position) / Math.floor(e.duration)) * 100,
  //     );
  //     setTimeElapsed(e.current_position);
  //     setPercent(percent);
  //     setDuration(e.duration);
  //   });
  // };

  // const onPausePress = async e => {
  //   setisAlreadyPlay(false);
  //   audioRecorderPlayer.pausePlayer();
  // };

  const onStopPress = async e => {
    await audioRecorderPlayer.stopPlayer();
    await audioRecorderPlayer.removePlayBackListener();
  };

  const onForward = async () => {
    let curr_track = playlist[current_track];
    let current_index = playlist.indexOf(curr_track) + 1;
    if (current_index === playlist.length) {
      setCurrentTrack(1);
    } else {
      setCurrentTrack(current_track => current_track + 1);
    }
    onStopPress().then(async () => {
      await onStartPress();
    });
  };

  const onBackward = async () => {
    let curr_track = playlist[current_track];

    let current_index = playlist.indexOf(curr_track);

    if (current_index === 0) {
      setCurrentTrack(5);
    } else {
      setCurrentTrack(current_track => current_track - 1);
    }
    onStopPress().then(async () => {
      await onStartPress();
    });
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

  function convertSecondsToMMSS(seconds) {
    let minutes = parseInt(seconds / 60, 10);
    let remainingSeconds = seconds % 60;

    let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    let formattedSeconds =
      remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    return formattedMinutes + ':' + formattedSeconds;
  }

  useEffect(() => {
    getMeeting();
    checkRecord();
    let obj = {};
    for (let i = 0; i < data.speakers_id.length; i++) {
      obj[data.speakers_id[i]] = data.speakers_name[i];
    }
    setNames(obj);
    obj = {};
    for (let i = 0; i < data.id.length; i++) {
      obj[data.speakers_id[i]] = data.speakers_image[i];
    }
    setImages(obj);
  }, []);

  useEffect(() => {
    console.log(route.params.header);
    navigation.setOptions({
      title: route.params.header,
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
      },
    });
  }, [navigation, route.params.header]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {chats !== undefined &&
          chats?.map((c, i) => (
            <View key={i} style={styles.chatBox}>
              <FastImage
                source={
                  images[c.speaker]
                    ? {
                        uri: images[c.speaker],
                        priority: FastImage.priority.normal,
                      }
                    : require('/assets/images/imgProfileEmpty.png')
                }
                resizeMode={FastImage.resizeMode.cover}
                style={styles.profileImg}
              />
              <View>
                <View style={styles.row}>
                  <Text style={styles.nameText}>{names[c.speaker]}</Text>
                  <Text style={styles.timeStamp}>
                    {convertSecondsToMMSS(parseInt(c.start_time, 10))}
                  </Text>
                </View>
                <View style={styles.speech}>
                  <Text style={styles.contents}>{c.script.toLowerCase()}</Text>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
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
          <Text style={styles.timeStamp}>
            {!inprogress
              ? '00:00:00'
              : audioRecorderPlayer.mmssss(Math.floor(currentPositionSec))}
          </Text>
          <TouchableOpacity onPress={() => onBackward()}>
            <Icon name="stepbackward" size={32} color="#93A8B3" />
          </TouchableOpacity>
          {!isAlreadyPlay ? (
            <TouchableOpacity onPress={() => onStartPlay()}>
              <Icon name={'caretright'} size={32} color="#3D425C" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => onPausePlay()}>
              <Icon name={'pause'} size={32} color="#3D425C" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => onForward()}>
            <Icon name="stepforward" size={32} color="#93A8B3" />
          </TouchableOpacity>
          <Text style={styles.timeStamp}>
            {!inprogress
              ? '00:00:00'
              : audioRecorderPlayer.mmssss(Math.floor(currentDurationSec))}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ChatRoom;
