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

Icon.loadFont().catch(error => {
  console.info(error);
});

const Modify = ({route}) => {
  const navigation = useNavigation();
  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recordedVoice, setRecordedVoice] = useState('');
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [result, setResult] = useState([]);
  const {getSpeaker} = route.params;

  const id = route.params.id;

  // 기존 정보 가져오기
  const getUserInfo = async () => {
    try {
      const res = await axios.get(url + '/speakers/' + id);
      console.log('Existing Info: ', res.data);
      setName(res.data.name);
      setResult(res.data.call_samples);
      setImg(res.data.profile_image);
      setRecordedVoice(res.data.voice_sample);
    } catch (e) {
      console.log(e);
    }
  };

  // 1-1) 이미지 업로드
  const uploadImg = () => {
    let body = new FormData();
    body.append('file', {
      uri: Platform.OS === 'android' ? img : img.replace('file://', ''),
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    fetch(url + '/uploadfiles/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body,
    })
      .then(response => response.json())
      .then(res => {
        console.log('uploadfile url: ', res.url);
        uploadFile(res.url);
      })
      .catch(error => {
        console.error('Errors:', error);
      });
  };

  // 1-1) 통화파일 업로드
  const uploadFile = image => {
    console.log('이건 무조건 찍혀야함');
    let body = new FormData();
    result.map((r, i) => {
      console.log('r: ', r.uri);
      body.append('file', {
        uri: r.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
    })
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
        updateSpeakerCall(image, res.file_url);
      })
      .catch(error => {
        console.error('Errors:', error);
      });
  };

  // 1-2) 통화파일로 생성
  const updateSpeakerCall = async (image, callUrl) => {
    try {
      console.log('image url: ', image);
      const res = await axios.put(url + '/speakers/', {
        name: name,
        call_sample: callUrl,
        profile_image: image,
        user_id: id,
      });
      console.log('speakers', res.data);
      getSpeaker();
    } catch (e) {
      console.log(e);
    }
  };

  // 2-1) 목소리 녹음으로 생성
  const updateSpeakerVoice = async image => {
    try {
      console.log('image url: ', image);
      const res = await axios.put(url + '/speakers/', {
        name: name,
        voice_sample: recordedVoice,
        profile_image: image,
        user_id: id,
      });
      console.log('드드드디어 성공~!', res.data);
      getSpeaker();
    } catch (e) {
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

  useEffect(() => {
    getUserInfo();
  }, []);

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
            {img !== null && img !== '' ? (
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
              onPress={() => {
                DocumentPicker.pick({
                  allowMultiSelection: true,
                  type: types.audio,
                })
                  .then(setResult)
                  .catch(handleError);
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
        {result && (
          <View style={styles.itemBox}>
            {result?.length > 0 && (
              <Text style={styles.filesTitle}>등록된 통화 파일</Text>
            )}
            {result.map((r, i) => (
              <View key={i} style={styles.fileBox}>
                <Image
                  style={styles.fileImg}
                  source={require('/assets/images/file.png')}
                />
                <Text style={styles.fileName}>{r.name}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setResult([]);
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
              <Text style={styles.fileName}>{recordedVoice}</Text>
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
          setIsConfirmVisible(true);
          if (recordedVoice === '') {
            uploadImg();
          } else {
            updateSpeakerVoice();
          }
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
        title={'수정이 완료되었습니다!'}
        content={'수정된 화자 정보는 화자 목록에서 확인할 수 있습니다.'}
      />
    </View>
  );
};

export default Modify;
