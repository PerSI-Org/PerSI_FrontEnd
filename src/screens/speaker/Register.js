import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './style';
import RecordModal from '/components/RecordModal';
import ConfirmModal from '/components/ConfirmModal';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import url from '/utils/backend';
import axios from 'axios';
import WaitModal from '/components/WaitModal';

Icon?.loadFont().catch(error => {
  console.info(error);
});

const Register = ({route}) => {
  const navigation = useNavigation();
  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recordedVoice, setRecordedVoice] = useState('');
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [result, setResult] = useState([]);
  const [idx, setIdx] = useState(-1);
  const [isWaitVisible, setIsWaitVisible] = useState(false);

  const {getSpeaker} = route.params;

  const id = route.params.id;

  // 0) 이미지 업로드
  const uploadImg = () => {
    if (img) {
      let body = new FormData();
      body.append('file', {
        uri: img,
        type: 'image/png',
        name: 'photo.png',
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
          console.log('uploadfile url: ', res.file_url);
          if (recordedVoice) {
            addSpeakerVoice(res.file_url);
          } else {
            uploadFile(res.urfile_urll);
          }
        })
        .catch(error => {
          console.error('Errors:', error);
        });
    } else {
      console.log('이미지 없음/ recordedVoice: ', recordedVoice);
      if (recordedVoice) {
        addSpeakerVoice('');
      } else {
        uploadFile('');
      }
    }
  };

  // Call 1) 통화파일 업로드
  const uploadFile = image => {
    console.log('통화 파일 업로드 중');
    let body = new FormData();
    result.map((r, i) => {
      console.log('r: ', r);
      body.append('file', {
        uri: r,
        type: 'audio/*',
        name: 'audio.m4a',
      });
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
        addSpeakerCall(image, res.file_url);
      })
      .catch(error => {
        console.error('Errors:', error);
      });
  };

  // Call 2) 통화파일로 생성
  const addSpeakerCall = async (image, callUrl) => {
    try {
      console.log('image url: ', image);
      const res = await axios.post(url + '/speakers/', {
        name: name,
        call_sample: callUrl,
        profile_image: image,
        user_id: id,
      });
      console.log('addSpeakerCall res: ', res.data);
      concatCallFiles(res.data.id);
    } catch (e) {
      console.log(e);
    }
  };
  // Call 3) concat
  const concatCallFiles = async sid => {
    try {
      console.log('speaker id: ', sid);
      const res = await axios.post(url + '/speakers/concat_call_data?speaker_id=' + sid);
      console.log('addSpeakerVoice res: ', res.data);
      registerSpeaker(sid);
    } catch (e) {
      setIsWaitVisible(false);
      console.log(e);
    }
  };

  // Voice 1) 목소리 녹음으로 생성
  const addSpeakerVoice = async image => {
    try {
      console.log('image url: ', image);
      const res = await axios.post(url + '/speakers/', {
        name: name,
        voice_sample: recordedVoice,
        profile_image: image,
        user_id: id,
      });
      console.log('addSpeakerVoice res: ', res.data);
      registerSpeaker(res.data.id);
    } catch (e) {
      console.log(e);
    }
  };
  function sleep(sec) {
    return new Promise(resolve => setTimeout(resolve, sec * 1000));
  }

  // Voice, Call last) register Speaker
  const registerSpeaker = async sid => {
    try {
      console.log('registerSpeaker / speaker id: ', sid);
      const res = await axios.post(url + '/speakers/register_speaker/', {
        speaker_id: sid,
      });
      console.log('드드드디어 성공~!', res.data);
      await sleep(2);
      setIsWaitVisible(false);
      setIsConfirmVisible(true);
      getSpeaker();
      navigation.pop();
    } catch (e) {
      setIsWaitVisible(false);
      console.log(e);
    }
  };
  // 프로필 사진 업로드
  const addImage = () => {
    launchImageLibrary({}, response => {
      if (response?.assets) {
        console.log(response.assets[0].uri);
        setImg(response.assets[0].uri);
      }
    });
  };

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  // 녹음된 파일
  useEffect(() => {
    if(idx !== -1){
      const newArray = result.filter((_, index) => index !== idx);
      // console.log(res.length, tmp);
      setResult(newArray);
      setIdx(-1);
    }
  }, [idx]);

  // 녹음된 파일
  useEffect(() => {
    console.log('voice files: ', recordedVoice);
  }, [recordedVoice]);

  // 선택된 통화 파일
  useEffect(() => {
    console.log('call files: ', result);
  }, [result]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imgBox}>
          <TouchableOpacity
            style={styles.imgBtn}
            onPress={() => {
              addImage();
            }}>
            {img != '' ? (
              <View>
                <FastImage
                  style={styles.profileImg}
                  source={{
                    uri: img,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <Image
                  source={require('/assets/images/iconCamera.png')}
                  style={styles.iconCamera}
                />
              </View>
            ) : (
              <View>
                <Image
                  style={styles.profileImg}
                  source={require('/assets/images/imgProfileEmpty.png')}
                />
                <Image
                  source={require('/assets/images/iconCamera.png')}
                  style={styles.iconCamera}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.itemBox}>
          <Text style={styles.title}>화자 이름</Text>
          <TextInput
            style={styles.nameInputBox}
            placeholder={'화자의 이름을 입력하세요.'}
            placeholderTextColor={'#999'}
            onChangeText={text => setName(text)}
            defaultValue={name}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.itemBox}>
          <Text style={styles.title}>음성 등록</Text>
          <Text style={styles.desc}>
            목소리 녹음 또는 통화 파일 업로드를 통해{' '}
          </Text>
          <Text style={styles.desc}>화자의 음성을 등록해주세요!</Text>

          <View style={styles.spaceB}>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(true);
              }}>
              <View style={styles.recordingButton}>
                <View style={styles.colCenter}>
                  <Image
                    style={styles.btnIcon}
                    source={require('/assets/images/iconRecord.png')}
                  />
                  <Text style={styles.recordingText}>목소리 녹음</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                const response = await DocumentPicker.pick({
                  allowMultiSelection: true,
                  type: types.audio,
                })
                const uriArray = response.map(obj => obj.uri);
                console.log(uriArray);
                setResult(uriArray);
                  // .then(console.log(response)) //setResult(response.assets[0].uri)
                  // .catch(handleError);
              }}>
              <View style={styles.recordingButton}>
                <View style={styles.colCenter}>
                  <Image
                    style={styles.btnIcon}
                    source={require('/assets/images/iconCall.png')}
                  />
                  <Text style={styles.recordingText}>통화 파일 업로드</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {result.length > 0 && (
          <View style={styles.itemBox}>
            <Text style={styles.filesTitle}>등록된 통화 파일</Text>
            {result?.map((r, i) => (
              <View key={i} style={styles.fileBox}>
                <Image
                  style={styles.fileImg}
                  source={require('/assets/images/file.png')}
                />
                <Text style={styles.fileName}>{"..." + r.slice(-24)}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setIdx(i);
                  }}>
                  <Icon name="close" size={20} color="#3D425C" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        {recordedVoice && recordedVoice !== '' && (
          <View style={styles.itemBox}>
            <Text style={styles.filesTitle}>등록된 녹음 파일</Text>
            <View style={styles.fileBox}>
              <Image
                style={styles.fileImg}
                source={require('/assets/images/file.png')}
              />
              <Text style={styles.fileName}>{recordedVoice.slice(44)}</Text>
              <TouchableOpacity
                onPress={() => {
                  setRecordedVoice('');
                }}>
                <Icon name="close" size={20} color="#3D425C" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          setIsWaitVisible(true);
          uploadImg();
        }}>
        <View style={styles.button}>
          <Text style={styles.btnText}>완 료</Text>
        </View>
      </TouchableOpacity>
      <RecordModal
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        setVoice={setRecordedVoice}
      />
      <ConfirmModal
        visible={isConfirmVisible}
        setVisible={setIsConfirmVisible}
        onPress={() => {
          setIsConfirmVisible(false);
          navigation.pop();
        }}
        title={'화자 등록이 완료되었습니다!'}
        content={'등록된 화자는 화자 목록에서 확인할 수 있습니다.'}
      />
      <WaitModal visible={isWaitVisible} setVisible={setIsWaitVisible} />
    </View>
  );
};

export default Register;
