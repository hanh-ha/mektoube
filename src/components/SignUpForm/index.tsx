import LinearGradient from 'react-native-linear-gradient';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/AntDesign';
import {StackActions} from '@react-navigation/native';

const SignUpForm = ({title, iconName, subMit, navigation}) => {
  return (
    <View>
      <LinearGradient colors={['#FF59F4', '#FF5978']} style={styles.background}>
        <View style={styles.wrapper}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(StackActions.pop(1))}>
            <Icon1
              name="chevron-back-outline"
              size={30}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <Icon name={iconName} size={20} color="white" />
            </View>
            <Text style={styles.headerText}>{title}</Text>
          </View>
        </View>

        <View style={styles.submit}>
          <TouchableOpacity onPress={subMit}>
            <Icon3 name="check" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};
export default SignUpForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  icon: {
    alignSelf: 'flex-start',
  },
  header: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    borderColor: 'white',
    borderWidth: 1,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ff7eea',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'AvenirNextCondensed-DemiBold',
  },
  submit: {
    backgroundColor: '#ffabbd',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: 'center',
    marginBottom: 20,
  },
});
