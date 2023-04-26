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
import * as RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/AntDesign';

const Register = () => {
  const navigation = useNavigation();
  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [result, setResult] = useState([]);

  // const uploadImg = () => {
  //   let body = new FormData();
  //   body.append('profile_img', {
  //     uri: Platform.OS === 'android' ? img : img.replace('file://', ''),
  //     type: 'image/jpeg',
  //     name: 'photo.jpg',
  //   });
  //   fetch(url + '/user/me/profile/image', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'multipart/form-data',
  //       Authorization: 'Bearer ' + user.user,
  //     },
  //     body,
  //   })
  //     .then(response => response.json())
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(error => {
  //       console.error('Errors:', error);
  //     });
  // };

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
            placeholderTextColor={'#bbb'}
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
        <View style={styles.itemBox}>
          <Text style={styles.filesTitle}>등록된 파일</Text>
          {result &&
            result.map((r, i) => (
              <View key={i} style={styles.fileBox}>
                <Image
                  style={styles.fileImg}
                  source={require('/assets/images/file.png')}
                />
                <Text>{r.name}</Text>
                <Icon name="close" size={20} color="#3D425C" />
              </View>
            ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          setIsConfirmVisible(true);
        }}>
        <View style={styles.button}>
          <Text style={styles.btnText}>완 료</Text>
        </View>
      </TouchableOpacity>
      <RecordModal visible={isModalVisible} setVisible={setIsModalVisible} />
      <ConfirmModal
        visible={isConfirmVisible}
        setVisible={setIsConfirmVisible}
        onPress={() => {
          setIsConfirmVisible(false);
          navigation.navigate('Main');
        }}
        title={'화자 등록이 완료되었습니다!'}
        content={'등록된 화자는 화자 목록에서 확인할 수 있습니다.'}
      />
    </View>
  );
};

export default Register;
