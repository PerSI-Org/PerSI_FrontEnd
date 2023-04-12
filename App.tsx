import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './src/screens/home/Main';
import SplashScreen from './src/screens/splash/Splash';
import ChatRoom from './src/screens/chat/ChatRoom';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigationRef = React.createRef();

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            safeAreaInsets: {top: 0, bottom: 0},
            headerStyle: styles.header,
            headerTintColor: 'black',
            headerTitleStyle: styles.mainheaderText,
            headerBackTitleVisible: false,
          }}>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              title: 'PerSI',
              headerTitleAlign: 'center',
              // headerTitleStyle: styles.mainheaderText,
              // safeAreaInsets: {top: 0, bottom: 0},
            }}
            name="Main"
            component={Main}
          />
          <Stack.Screen
            options={{
              title: '대화방',
              headerTitleStyle: styles.subheaderText,
            }}
            name="ChatRoom"
            component={ChatRoom}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
