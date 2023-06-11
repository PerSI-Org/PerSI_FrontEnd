import React, {useState, useEffect} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {widthPercentage, heightPercentage, fontPercentage} from '/Responsive';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import styles from './style';
import url from '/utils/backend';
import Slider from '@react-native-community/slider';
import axios from 'axios';

const audioRecorderPlayer = new AudioRecorderPlayer();

// fileupload -> create_speaker -> register_speaker
// 여기서는 file_upload 한 후의 url을 부모컴포넌트(second~)에 넘겨준다.
const RecordModal = ({visible, setVisible, setVoice}) => {
  const navigation = useNavigation();
  const [inprogress, setInprogress] = useState(false);
  const [percent, setPercent] = useState(0);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [isAlreadyRecording, setisAlreadyRecording] = useState(false);
  const [isAlreadyPlay, setisAlreadyPlay] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [filePath, setFilePath] = useState('');
  const [page, setPage] = useState(0);

  const [isStarted, setIsStarted] = useState(false);

  const story = [
    '내 나이 여섯 살 적에, 한번은 체험담 이라고 부르는 처녀림에 관한 책에서 멋있는 그림 하나를 보았다. 보아뱀 한 마리가 맹수를 삼키고 있는 그림이었다. 그걸 옮겨 놓은 그림이 위에 있다. \
    그 책에 이런 말이 있었다. "보아뱀은 먹이를 씹지 않고 통째로 삼킨다. 그러고 나면 몸을 움직일 수가 없어 먹이가 소화될 때까지 여섯 달 동안 잠을 잔다." ',

    '나는 그 그림을 보고 나서 밀림의 가지가지 모험들을 곰곰이 생각해 보았으며, 드디어는 나도 색연필을 들고 나의 첫 그림을 용케 그려내었다. 나의 그림 제1호, 그건 다음과 같았다. \
    나는 내 걸작을 어른들에게 보여주며 내 그림이 무섭지 않느냐고 물어 보았다. 어른들은 대답했다. "아니, 모자가 다 무서워?" ',

    '내 그림은 모자를 그린 게 아니라 코끼리를 소화시키고 있는 보아뱀을 그린 것이었다. 그래서 나는 어른들이 알아볼 수 있도록 보아뱀의 속을 그렸다. 어른들에겐 항상 설명을 해 주어야 한다. 내 그림 제2호는 아래와 같았다. 어른들은 나에게 속이 보였다 안 보였다 하는 보아뱀의 그림 따위는 집어치우고, 차라리 지리나 역사·산수·문법에 재미를 붙여 보라고 충고했다. ',

    '나는 이렇게 해서 내 나이 여섯 살 적에 화가라고 하는 멋있는 직업을 포기했다. 나는 내 그림 제1호와 제2호의 실패로 그만 기가 죽었던 것이다. 어른들은 자리들 혼자서는 아무것도 이해하지 못하고, 그렇다고 그때마다 자꾸자꾸 설명을 해 주자니 어린애에겐 힘겨운 일이었다. 그래서 나는 다른 직업을 골라야 했고, 비행기 조종을 배웠다.',

    '나는 세계의 여기저기 제법 많은 곳을 날아다녔다. 그리고 이건 틀림없는 이야긴데, 지리는 내게 많은 도움이 되었다. 그 덕분에 나는 한번 쓱 보아도 중국과 아리조나를 구별할 수 있었다. 밤의 어둠 속에서 길을 잃었을 때 지리는 매우 편리하다. 나는 이렇게 살아오는 동안 수많은 진지한 사람들과 수많은 접촉을 했다.',

    '나는 오랫동안 어른들과 함께 살며 그들을 아주 가까이서 보아왔다. 그렇다고 해서 내 의견이 크게 달라지지는 않았다. 나는 좀 똑똑해 보이는 사람을 만날 때마다, 항상 품고 다니던 내 그림 제1호를 꺼내 그를 시험해 보곤 했다. 그가 정말 이해력이 있는 사람인가 알고 싶었던 것이다. 그러나 늘 이런 대답이었다. ',

    '"그건 모자로군요." 그러면 나는 보아뱀 이야기도 처녀림 이야기도 별 이야기도 꺼내지 않았다. 나는 그가 알아들을 수 있도록, 트럼프 이야기, 골프 이야기, 정치 이야기, 넥타이 이야기를 했다. 그러면 그 어른은 그만큼 분별있는 사람을 하나 알게 되었다고 아주 흐뭇해 하는 것이었다. 나는 이렇게 진심을 털어놓고 이야기할 사람도 없이 혼자 살아오던 끝에, 육년 전, 사하라 사막에서 비행기사고를 만났다. ',

    '모터에서 무언가가 부서진 것이다. 기관사도 승객도 없었던 터라 나는 그 어려운 수리를 혼자서 감당해 볼 작정이었다. 나로서는 죽느냐 사느냐 하는 문제였다. 가진 것이라고는 겨우 일주일 동안 마실 물밖에 없었다. 첫날 저녁, 나는 따라서 사람이 사는 곳에서 사방으로 수천 마일 떨어진 사막 위에 누워 잠이 들었다.',

    '넓은 바다 한가운데서 뗏목을 타고 흘러가는 난파선의 뱃사람보다도 나는 훨씬 더 외로운 처지였다. 그러니 해뜰 무렵 이상한 작은 목소리가 나를 불러 깨웠을 때 내가 얼마나 놀랐겠는가. 그 목소리는 이렇게 말했다. "저...... 양 한 마리만 그려 줘요!"  "뭐!"  "양 한 마리만 그려 줘......"  나는 벼락이라도 맞은 듯 벌떡 일어섰다. 나는 눈을 비비고 주위를 잘 살펴보았다. ',

    '아주 신기한 어린이가 엄숙하게 나를 바라보고 있었다. 여기 그의 초상화가 있다. 이 그림은 내가 훗날 그를 모델로 그린 그림 중에서 가장 훌륭한 것이다. 그러나 내 그림이 그 모델만큼 멋이 있으려면 아직 멀었다. 그렇다고 내 잘못이 아니다. 내 나이 여섯 살 적에 나는 어른들 때문에 기가 죽어 화가라고 하는 직업에서 멀어졌고, 속이 보이는 보아뱀과 보이지 않는 보아뱀밖에는 한번도 그림공부를 해 본 적이 없지 않은가. ',

    '아무튼 나는 놀란 눈을 휘둥그레 뜨고 홀연히 나타난 그 모습을 바라보았다. 사람이 사는 곳에서 사방으로 수천 마일이나 떨어진 곳이 아닌가. 그런데 내가 본 어린이는 길을 잃은 것 같지도 않았고, 피곤이나 굶주림이나 목마름에 시달려 녹초가 된 것 같지도 않았으며, 겁에 질려 있는 것 같지도 않았다.',

    '사람이 사는 곳에서 사방으로 수천 마일 떨어진 사막 한가운데서 길을 잃은 어린아이의 모습이 전혀 아니었다. 나는 마침내 입을 열 수 있게 되자, 겨우 이렇게 말했다. "그런데...... 넌 거기서 뭘 하고 있느냐?" 그러나 그 애는 무슨 중대한 일이나 되는 것처럼 아주 천천히 같은 말을 되풀이했다. "저...... 양 한 마리만 그려 줘요......" ',
  ];

  const uploadFile  = async () => {
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
      .then(async res => {
        console.log('file_url:', res.file_url);
        setVoice(res.file_url);
        setPage(0);
        setVisible(false);
      })
      .catch(error => {
        console.error('Errors:', error);
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
      if (typeof percent === 'number'){
        setPercent(percent);
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

  const onStopRecord = async () => {
    setisAlreadyRecording(false);
    setRecordSecs('00:00:00');
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setIsConfirmVisible(true);
    console.log(result);
    setFilePath(result);
  };

  useEffect(() => {
    Icon.loadFont();
    Ionicons.loadFont();
    checkRecord();
  }, []);

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
                <Text style={styles.text}>녹음할 문단은 총 12개 입니다.</Text>
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
                  onPress={() => {
                    onStartRecord();
                    setIsStarted(true);
                  }}>
                  <Text style={styles.btnText}>녹음 시작</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              {page < 12 ?
                <>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>다음과 같이 말해보세요!</Text>
                    <Text style={styles.text}>{page + 1} / 12</Text>
                  </View>
                  <View style={styles.scriptContainer}>
                    <Text style={styles.story}>{story[page]}</Text>
                  </View>
                </>
              : <>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>녹음이 완료되었습니다!</Text>
                    <Text style={styles.text}>녹음된 음성을 들어보세요</Text>
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
                              <Ionicons
                                name="pause"
                                size={32}
                                color="#3D425C"
                              />
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
                </>
              }

              <View style={styles.spaceB}>
                <TouchableOpacity
                  style={styles.calcelButton}
                  onPress={() => {
                    if (page > 11) {
                      onStopRecord();
                      onStartRecord();
                      setPage(0);
                    } else if (page === 0) {
                      setVisible(false);
                    } else {
                      setPage(page - 1);
                    }
                  }}>
                  <Text style={styles.calcelBtnText}>
                    {page == 1 ? '녹음 취소' : page === 12 ? '다시 녹음' :'이전'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    if (page > 11) {
                      uploadFile();
                    } else if (page == 11) {
                      onStopRecord();
                      setPage(page + 1);
                    } else {
                      setPage(page + 1);
                    }
                  }}>
                  <Text style={styles.btnText}>
                    {page === 11 ? '녹음 완료' : page === 12 ? '확인' : '다음'}
                  </Text>
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
