import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import {Provider, useSelector} from 'react-redux';
import store from './src/store/stores';
import Discovery from './src/screens/Discovery';
import EntityForm from './src/screens/SignUp/EntityForm';
import BirthdayForm from './src/screens/SignUp/BirthdayForm';
import OriginForm from './src/screens/SignUp/OriginForm';
import FromForm from './src/screens/SignUp/FromForm';
import CountryForm from './src/screens/SignUp/CountryForm';
import RegionForm from './src/screens/SignUp/RegionForm';
import CityForm from './src/screens/SignUp/CityForm';
import SignUpForm from './src/screens/SignUp/SignUpForm';
import AsyncStorage from '@react-native-community/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Message from './src/screens/Message';
import Notification from './src/screens/Notification';
import User from './src/screens/User';
import Icon from 'react-native-vector-icons/AntDesign';
import LogOut from './src/screens/LogOut';
import GeolocationForm from './src/screens/SignUp/GeolocationForm';
import ZipcodeForm from './src/screens/SignUp/ZipcodeForm';
import ZipcodeFormCity from './src/screens/SignUp/ZipcodeFormCity';

navigator.geolocation = require('@react-native-community/geolocation');
const Auth = createStackNavigator();
const SingUpStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomePage = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Discovery') {
            iconName = 'search1';
          } else if (route.name === 'Message') {
            iconName = 'message1';
          } else if (route.name === 'Notification') {
            iconName = 'notification';
          } else if (route.name === 'User') {
            iconName = 'user';
          } else if (route.name === 'LogOut') {
            iconName = 'logout';
          }

          return <Icon name={iconName} size={20} color={color} />;
        },
      })}
      animationEnabled={true}
      swipeEnabled={true}
      tabBarOptions={{
        activeTintColor: '#24CF5E',
        inactiveTintColor: '#939EAA',
        showLabel: false,
        style: {
          borderTopWidth: 1,
          borderTopColor: '#EAEDF3',
        },
        indicatorStyle: {
          backgroundColor: 'black',
        },
        showIcon: true,
      }}>
      <Tab.Screen
        name="Discovery"
        component={Discovery}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="LogOut"
        component={LogOut}
        options={{headerShown: false}}
      />
      <Tab.Screen name="User" component={User} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};
const Signup = () => {
  return (
    <SingUpStack.Navigator initialRouteName="EntityForm">
      <SingUpStack.Screen
        name="EntityForm"
        component={EntityForm}
        options={{headerShown: false}}
      />
      <SingUpStack.Screen
        name="BirthdayForm"
        component={BirthdayForm}
        options={{headerShown: false}}
      />
      <SingUpStack.Screen
        name="OriginForm"
        component={OriginForm}
        options={{headerShown: false}}
      />
      <SingUpStack.Screen
        name="FromForm"
        component={FromForm}
        options={{headerShown: false}}
      />
      <SingUpStack.Screen
        name="CountryForm"
        component={CountryForm}
        options={{headerShown: false}}
      />
      <SingUpStack.Screen
        name="RegionForm"
        component={RegionForm}
        options={{headerShown: false}}
      />
      <SingUpStack.Screen
        name="CityForm"
        component={CityForm}
        options={{headerShown: false}}
      />
      <SingUpStack.Screen
        name="SignUpForm"
        component={SignUpForm}
        options={{headerShown: false}}
      />
      <SingUpStack.Screen
        name="GeolocationForm"
        component={GeolocationForm}
        options={{headerShown: false}}
      />
      <SingUpStack.Screen
        name="ZipcodeForm"
        component={ZipcodeForm}
        options={{headerShown: false}}
      />
      <SingUpStack.Screen
        name="ZipcodeFormCity"
        component={ZipcodeFormCity}
        options={{headerShown: false}}
      />
    </SingUpStack.Navigator>
  );
};

const App = () => {
  const tokenLogin = useSelector(state => state.signIn.token);
  const tokenSignUp = useSelector(state => state.postSignUp.token);
  console.log('tokenSignUp', tokenSignUp);
  const [Token, setToken] = useState();
  useEffect(() => {
    async function getToken() {
      try {
        const token = await AsyncStorage.getItem('AccessToken');
        token ? setToken(token) : setToken(null);
      } catch (e) {
        console.log(e);
      }
    }
    getToken();
  }, [tokenLogin, tokenSignUp]);
  console.log('getToken', Token);

  return (
    <NavigationContainer initialRouteName="Home">
      <Auth.Navigator>
        {Token ? (
          <>
            <Auth.Screen
              name="HomePage"
              component={HomePage}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Auth.Screen
              name="Home"
              component={Home}
              header="none"
              options={{headerShown: false}}
            />
            <Auth.Screen
              name="SignUp"
              component={Signup}
              header="none"
              options={{headerShown: false}}
            />
          </>
        )}
      </Auth.Navigator>
    </NavigationContainer>
  );
};

const AppWrap = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default AppWrap;
