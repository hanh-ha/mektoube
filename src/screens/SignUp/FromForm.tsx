import React from 'react';
import SignUpForm from '../../components/SignUpForm';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// import {useDispatch} from 'react-redux';

const FromForm = ({navigation}) => {
  const onSubMit = () => {};

  return (
    <View style={styles.wraper}>
      <SignUpForm
        title="Où habitez-vous ?"
        iconName="map-marker"
        subMit={onSubMit}
        navigation={navigation}
        subTitle=""
      />
      <View style={styles.wrapperView}>
        <TouchableOpacity onPress={() => navigation.navigate('CountryForm')}>
          <Text style={styles.textLocalisation}>Ma Localisation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.wraperIcon}
          onPress={() => {
            navigation.navigate('GeolocationForm');
          }}>
          <Icon name="map-pin" style={styles.icon} color="white" size={15} />
          <Text style={styles.textlocaliser}>Ma géolocaliser ?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FromForm;
const styles = StyleSheet.create({
  wraper: {
    flex: 1,
  },
  wrapperView: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    top: 220,
    paddingHorizontal: 30,
  },
  styleErr: {
    position: 'absolute',
    top: 0,
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    width: '100%',
    padding: 19,
    backgroundColor: '#E71111',
    fontFamily: 'AvenirNextCondensed-Bold',
  },
  wrapperRadio: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    top: 200,
    paddingHorizontal: 30,
  },
  textLocalisation: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    color: 'white',
    paddingBottom: 3,
    fontSize: 17,
    fontFamily: 'AvenirNextCondensed-DemiBold',
  },
  wraperIcon: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  icon: {
    marginRight: 5,
  },
  textlocaliser: {color: 'white', fontFamily: 'AvenirNextCondensed-DemiBold'},
});
