import React, {useEffect, useState} from 'react';
import SignUpForm from '../../components/SignUpForm';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import RadioBox from '../../components/radioBox';
import {RadioButton} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {getRegion} from '../../store/actions/getRegion';
import {Region} from '../../store/actions/signUp';
import {IApplicationState} from '../../store/reducers/state';

const RegionForm = ({navigation}) => {
  const [err, setErr]: any = useState();
  const dispatch = useDispatch();
  const [value, setValue]: any = React.useState();
  const countryState = useSelector(
    (state: IApplicationState) => state.signUp?.country,
  );
  const onSubMit = () => {
    value
      ? (dispatch(Region(value)), navigation.navigate('CityForm'))
      : setErr(<Text style={styles.styleErr}>Le champ est vide</Text>);
  };
  useEffect(() => {
    dispatch(getRegion(countryState));
  }, [countryState, dispatch]);
  const regionState = useSelector(
    (state: IApplicationState) => state.Region?.data?.data?.CONTENT?.regions,
  );
  const renderItem = ({item}) => {
    return <RadioBox title={item.name} value={item.id} />;
  };
  return (
    <View style={styles.wraper}>
      <SignUpForm
        title="Quelle est votre région ?"
        iconName="map"
        subMit={onSubMit}
        navigation={navigation}
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
    fontSize: 18,
    width: '100%',
    padding: 20,
    backgroundColor: '#E71111',
    fontFamily: 'AvenirNextCondensed-Bold',
  },
  wrapperRadio: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    top: 200,
    paddingHorizontal: 30,
    height: 320,
  },
});
