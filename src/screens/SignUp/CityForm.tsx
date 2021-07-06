import React, {useEffect, useState} from 'react';
import SignUpForm from '../../components/SignUpForm';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import RadioBox from '../../components/radioBox';
import {RadioButton} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {getCity} from '../../store/actions/getCity';
import {City} from '../../store/actions/signUp';
import {IApplicationState} from '../../store/reducers/state';

const CityForm = ({navigation}) => {
  const [err, setErr]: any = useState();

  const dispatch = useDispatch();
  const [value, setValue]: any = React.useState();
  const getCountry = useSelector(
    (state: IApplicationState) => state.Country?.country,
  );
  const getRegion = useSelector(
    (state: IApplicationState) => state.Region?.region,
  );

  useEffect(() => {
    dispatch(getCity(getCountry, getRegion));
  }, [getCountry, dispatch, getRegion]);

  const getDataCity = useSelector(
    (state: IApplicationState) => state.City.data.data?.CONTENT.ALL.cities,
  );
  const onChange = newValue => {
    setValue(newValue);
  };
  const renderItem = ({item}) => (
    <RadioBox title={item.name} value={item.id} onChange={onChange} />
  );
  const onSubMit = () => {
    value
      ? (dispatch(City(value)), navigation.navigate('SignUpForm'))
      : (setErr(<Text style={styles.styleErr}>Le champ est vide</Text>),
        setTimeout(function () {
          setErr(null);
        }, 2000));
  };
  return (
    <View style={styles.wraper}>
      <SignUpForm
        title="Quelle est votre ville?"
        iconName="folder-o"
        subMit={onSubMit}
        navigation={navigation}
        subTitle=""
      />
      {err}
      <View style={styles.wrapperRadio}>
        <RadioButton.Group
          onValueChange={newValue => setValue(newValue)}
          value={value}>
          <FlatList
            data={getDataCity}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </RadioButton.Group>
      </View>
    </View>
  );
};

export default CityForm;
const styles = StyleSheet.create({
  wraper: {
    height: '100%',
    width: '100%',
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
  wrapperRadio: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    top: 200,
    paddingHorizontal: 30,
    bottom: 100,
  },
});
