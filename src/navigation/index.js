import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import Discovery from '../screens/Discovery';
import Message from '../screens/Message';
import Notification from '../screens/Notification';
import LogOut from '../screens/LogOut';
import EntityForm from '../screens/SignUp/EntityForm';
import BirthdayForm from '../screens/SignUp/BirthdayForm';
import FromForm from '../screens/SignUp/FromForm';
import CityForm from '../screens/SignUp/CityForm';
import GeolocationForm from '../screens/SignUp/GeolocationForm';
import OriginForm from '../screens/SignUp/OriginForm';
import RegionForm from '../screens/SignUp/RegionForm';
import SignUpForm from '../screens/SignUp/SignUpForm';
import ZipcodeForm from '../screens/SignUp/ZipcodeForm';
import ZipcodeFormCity from '../screens/SignUp/ZipcodeFormCity';
import CountryForm from '../screens/SignUp/CountryForm';
import AsyncStorage from '@react-native-community/async-storage';

import User from '../screens/User';

// navigator.geolocation = require('@react-native-community/geolocation');
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

const RootNavigation = () => {
  const tokenLogin = useSelector(state => state.signIn.token);
  const tokenSignUp = useSelector(state => state.postSignUp.token);
  const tokenLogout = useSelector(state => state.logOut.activeLogout);

  const [Token, setToken] = useState();
  useEffect(() => {
    async function getToken() {
      try {
        const token = await AsyncStorage.getItem('AccessToken');
        token ? setToken(token) : setToken(null);
      } catch (e) {}
    }
    getToken();
  }, [tokenLogin, tokenSignUp]);

  return (
    <NavigationContainer initialRouteName="Home">
      <Auth.Navigator>
        {Token && tokenLogout ? (
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

export default RootNavigation;
