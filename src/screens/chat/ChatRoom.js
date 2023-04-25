import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Math,
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
import PlayButton from './PlayButton';
import styles from './style';
import {widthPercentage, heightPercentage} from '/Responsive';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

Icon.loadFont();

const playlist = [
  {
    title: 'Emergence of Talents',
    path: 'track1.mp3',
    cover:
      'https://images.unsplash.com/photo-1515552726023-7125c8d07fb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80',
  },
  {
    title: 'Shippuden',
    path: 'track2.mp3',
    cover:
      'https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80',
  },
  {
    title: 'Rising Dragon',
    path: 'track3.mp3',
    cover:
      'https://images.unsplash.com/photo-1512036666432-2181c1f26420?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
  },
  {
    title: 'Risking it all',
    path: 'track4.mp3',
    cover:
      'https://images.unsplash.com/photo-1501761095094-94d36f57edbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=401&q=80',
  },
  {
    title: 'Gekiha',
    path: 'track5.mp3',
    cover:
      'https://images.unsplash.com/photo-1471400974796-1c823d00a96f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
  },
];

function ChatRoom({route}) {
  const navigation = useNavigation();
  const [chats, setChats] = useState([
    {
      name: '김나현',
      time: '00:03',
      contents: '안녕하세요!\n저는 김나현 입니다.',
    },
    {name: '김지우', time: '00:05', contents: '안녕하세요'},
    {name: '김나현', time: '00:09', contents: '안녕하세요!'},
    {name: '김나현', time: '00:12', contents: '안녕하세요!'},
  ]);
  const [isAlreadyPlay, setisAlreadyPlay] = useState(false);
  const [duration, setDuration] = useState('00:00:00');
  const [timeElapsed, setTimeElapsed] = useState('00:00:00');
  const [percent, setPercent] = useState(0);
  const [current_track, setCurrentTrack] = useState(0);
  const [inprogress, setInprogress] = useState(false);
  const audioRecorderPlayer = useState(new AudioRecorderPlayer());

  const changeTime = async seconds => {
    // 50 / duration
    let seektime = (seconds / 100) * duration;
    setTimeElapsed(seektime);
    audioRecorderPlayer.seekToPlayer(seektime);
  };

  const onStartPress = async e => {
    setisAlreadyPlay(true);
    setInprogress(true);
    const path = 'file://' + dirs + '/' + playlist[current_track].path;
    audioRecorderPlayer.startPlayer(path);
    audioRecorderPlayer.setVolume(1.0);

    audioRecorderPlayer.addPlayBackListener(async e => {
      if (e.current_position === e.duration) {
        audioRecorderPlayer.stopPlayer();
      }
      let percent = Math.round(
        (Math.floor(e.current_position) / Math.floor(e.duration)) * 100,
      );
      setTimeElapsed(e.current_position);
      setPercent(percent);
      setDuration(e.duration);
    });
  };

  const onPausePress = async e => {
    setisAlreadyPlay(false);
    audioRecorderPlayer.pausePlayer();
  };

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
        {chats.map((c, i) => (
          <View style={styles.chatBox}>
            <Image
              source={require('/assets/images/profile3.png')}
              style={[
                {
                  width: widthPercentage(35),
                  height: widthPercentage(35),
                  borderRadius: 30,
                  marginRight: widthPercentage(7),
                },
              ]}
            />
            <View>
              <View style={styles.row}>
                <Text style={styles.nameText}>{c.name}</Text>
                <Text style={styles.timeStamp}>{c.time}</Text>
              </View>
              <View style={styles.speech}>
                <Text style={styles.contents}>{c.contents}</Text>
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
          <Text style={[styles.textLight, styles.timeStamp]}>
            {!inprogress
              ? timeElapsed
              : audioRecorderPlayer.mmssss(Math.floor(timeElapsed))}
          </Text>
          <Text style={[styles.textLight, styles.timeStamp]}>
            {!inprogress
              ? duration
              : audioRecorderPlayer.mmssss(Math.floor(duration))}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => onBackward()}>
          <Icon name="stepbackward" size={32} color="#93A8B3" />
        </TouchableOpacity>
        {!isAlreadyPlay ? (
          <TouchableOpacity onPress={() => onStartPress()}>
            <Icon name={'caretright'} size={32} color="#3D425C" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => onPausePress()}>
            <Icon name={'pause'} size={32} color="#3D425C" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => onForward()}>
          <Icon name="stepforward" size={32} color="#93A8B3" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default ChatRoom;
