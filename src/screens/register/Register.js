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
import FastImage from 'react-native-fast-image';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Register = () => {
  const [img, setImg] = useState('');
  const [name, setName] = useState('');

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

  const addImage = () => {
    launchImageLibrary({}, response => {
      if (response?.assets) {
        console.log(response.assets[0].uri);
        setImg(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{flexGrow: 1}}>
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
                alert('record voice');
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
                alert('file upload');
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
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          return navigation.navigate('ChatRoom');
        }}>
        <View style={styles.button}>
          <Text style={styles.btnText}>완 료</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
