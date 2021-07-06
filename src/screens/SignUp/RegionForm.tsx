import React, {useEffect, useState} from 'react';
import SignUpForm from '../../components/SignUpForm';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import RadioBox from '../../components/radioBox';
import {RadioButton} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {getRegion} from '../../store/actions/getRegion';
import {addRegionSuccess} from '../../store/actions/getRegion';
import {IApplicationState} from '../../store/reducers/state';

const RegionForm = ({navigation}) => {
  const [err, setErr]: any = useState();
  const dispatch = useDispatch();
  const [value, setValue]: any = React.useState();
  const countryState = useSelector(
    (state: IApplicationState) => state.Country?.country,
  );
  const onChange = newValue => {
    setValue(newValue);
  };
  const onSubMit = () => {
    value
      ? (dispatch(addRegionSuccess(value)), navigation.navigate('CityForm'))
      : (setErr(<Text style={styles.styleErr}>Le champ est vide</Text>),
        setTimeout(function () {
          setErr(null);
        }, 2000));
  };
  useEffect(() => {
    dispatch(getRegion(countryState));
  }, [countryState, dispatch]);
  const regionState = useSelector(
    (state: IApplicationState) => state.Region?.data?.data?.CONTENT?.regions,
  );
  const renderItem = ({item}) => {
    return <RadioBox title={item.name} value={item.id} onChange={onChange} />;
  };
  return (
    <View style={styles.wraper}>
      <SignUpForm
        title="Quelle est votre région ?"
        iconName="map"
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
            data={regionState}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </RadioButton.Group>
      </View>
    </View>
  );
};

export default RegionForm;
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
    fontFamily: 'AvenirNextCondensed-Bold',
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
