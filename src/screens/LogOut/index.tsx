import {View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';
import {logOut} from '../../store/actions/logOut';

const LogOut = ({}) => {
  const dispatch = useDispatch();
  const clearAppData = async () => {
    try {
      await AsyncStorage.multiRemove(['AccessToken', 'AccessPuk']);
      dispatch(logOut(true));
      //   navigation.navigate('Home');
    } catch (error) {
      console.error('Error clearing app data.');
    }
  };

  return (
    <View>
      <Button onPress={clearAppData}>Logout</Button>
    </View>
  );
};
export default LogOut;
