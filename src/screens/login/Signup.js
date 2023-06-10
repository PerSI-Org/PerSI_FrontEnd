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
import url from '/utils/backend';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [name, setName] = useState('');



  const createUser = async () => {
    try {
      const res = await axios.post(url + '/users', {
        "name": name,
        "email": email,
        "password": password,
      });
      console.log(res.data);
      alert('회원가입 완료');
      navigation.reset({routes: [{name: 'Login'}]});
    } catch (e) {
      alert('회원가입 실패');
      console.log(e);
    }
  };

  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.itemBox}>
        <Text style={styles.title}>회원가입</Text>
        <TextInput
          style={styles.nameInputBox}
          placeholder={'이메일'}
          placeholderTextColor={'#fff'}
          onChangeText={text => setEmail(text)}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.nameInputBox}
          placeholder={'비밀번호'}
          placeholderTextColor={'#fff'}
          onChangeText={text => setPassword(text)}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={password2 == '' || password == password2 ? styles.nameInputBox: styles.nameInputBox2}
          placeholder={'비밀번호 확인'}
          placeholderTextColor={'#fff'}
          onChangeText={text => setPassword2(text)}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.nameInputBox}
          placeholder={'이름'}
          placeholderTextColor={'#fff'}
          onChangeText={text => setName(text)}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity
          onPress={() => {
            createUser();
          }}>
          <View style={styles.button}>
            <Text style={styles.btnText}>회원가입</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.reset({routes: [{name: 'Login'}]});
          }}>
          <Text style={styles.desc}>로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
