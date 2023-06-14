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

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      console.log('email', email, 'password', password);
      const res = await axios.post(url + '/users/login', {
        email: email,
        password: password,
      });
      alert('로그인 성공');
      console.log(res.data);
      navigation.navigate({
        name: 'Main',
        params: {id: res.data.id},
      });
    } catch (e) {
      alert('로그인 실패');
      console.log(e);
    }
  };

  useEffect(() => {
    // getUsers();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.itemBox}>
        <Text style={styles.title}>LOGIN</Text>
        <TextInput
          style={styles.nameInputBox}
          placeholder={'이메일을 입력하세요.'}
          placeholderTextColor={'#fff'}
          onChangeText={text => setEmail(text)}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.nameInputBox}
          placeholder={'비밀번호를 입력하세요.'}
          placeholderTextColor={'#fff'}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity
          onPress={() => {
            login();
          }}>
          <View style={styles.button}>
            <Text style={styles.btnText}>로그인</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.reset({routes: [{name: 'Signup'}]});
          }}>
          <Text style={styles.desc}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
