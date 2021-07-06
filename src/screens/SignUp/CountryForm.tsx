import React, {useEffect, useState} from 'react';
import SignUpForm from '../../components/SignUpForm';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import RadioBox from '../../components/radioBox';
import {RadioButton} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {getCountry, addCountry} from '../../store/actions/getCountry';
// import {Country} from '../../store/actions/signUp';
import {IApplicationState} from '../../store/reducers/state';

const CountryForm = ({navigation}) => {
  const [value, setValue]: any = React.useState();
  const [err, setErr]: any = useState();

  const dispatch = useDispatch();
  const onChange = newValue => {
    setValue(newValue);
  };
  const onSubMit = () => {
    if (value) {
      value.zipFormat && value.zipRegex
        ? (dispatch(addCountry(value.id)), navigation.navigate('ZipcodeForm'))
        : (dispatch(addCountry(value.id)), navigation.navigate('RegionForm'));
    } else {
      setErr(<Text style={styles.styleErr}>Le champ est vide</Text>);
      setTimeout(function () {
        setErr(null);
      }, 2000);
    }
  };
  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);
  const countryState = useSelector(
    (state: IApplicationState) =>
      state.Country.data.data?.CONTENT?.ALL?.countries,
  );
  const renderItem = ({item}) => (
    <RadioBox title={item.name} value={item} onChange={onChange} />
  );
  return (
    <View style={styles.wraper}>
      <SignUpForm
        title="Quel est votre pays ?"
        iconName="map"
        subMit={onSubMit}
        navigation={navigation}
        subTitle="Un seul choix possible"
      />
      {err}
      <View style={styles.wrapperBody}>
        <View style={styles.wrapperRadio}>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            <FlatList
              data={countryState}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </RadioButton.Group>
        </View>
      </View>
    </View>
  );
};

export default CountryForm;
const styles = StyleSheet.create({
  wraper: {
    // height: '100%',
    // width: '100%',
    flex: 1,
  },
  styleErr: {
    position: 'absolute',
    top: 0,
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    width: '100%',
    padding: 19,
    backgroundColor: '#ff2c2c',
  },
  wrapperBody: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    paddingHorizontal: 30,
    top: 200,
  },
  wrapperRadio: {
    height: '100%',
  },
});
