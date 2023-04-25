import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import styles from './style';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import url from '/utils/backend';
import axios from 'axios';
import FirstRoute from './components/FirstRoute';
import SecondRoute from './components/SecondRoute';
import {widthPercentage, heightPercentage} from '/Responsive';

const Main = () => {
  const navigation = useNavigation();
  const [routes] = useState([
    {key: 'first', title: '대화 목록'},
    {key: 'second', title: '화자 목록'},
  ]);

  const [index, setIndex] = useState(0);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute navigation={navigation} />;
      case 'second':
        return <SecondRoute navigation={navigation} />;
      default:
        return null;
    }
  };

  useEffect(() => {}, []);

  return (
    <TabView
      navigationState={{index, routes}}
      renderTabBar={props => (
        <TabBar
          {...props}
          renderLabel={({route, color}) => (
            <Text style={styles.selecetedText}>{route.title}</Text>
          )}
          style={{backgroundColor: 'white'}}
          indicatorStyle={{
            backgroundColor: '#60AAEF',
            height: heightPercentage(4),
          }}
        />
      )}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: '100%'}}
    />
  );
};

export default Main;
