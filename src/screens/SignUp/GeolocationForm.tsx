import React, {useState, useEffect} from 'react';
import SignUpForm from '../../components/SignUpForm';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';
import RadioBox from '../../components/radioBox';
import Geolocation from 'react-native-geolocation-service';
import {useDispatch, useSelector} from 'react-redux';
import {getGeolocationCity} from '../../store/actions/getGeolocationCity';
import {City} from '../../store/actions/signUp';
import {IApplicationState} from '../../store/reducers/state';

interface ILocation {
  latitude: number;
  longitude: number;
}
const GeolocationForm = ({navigation}) => {
  const [value, setValue]: any = React.useState();
  const [err, setErr]: any = useState();
  Geolocation.getCurrentPosition(info => console.log(info));
  const [location, setLocation] = useState<ILocation>(undefined);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGeolocationCity(location?.latitude, location?.longitude));
  }, [location, dispatch]);
  const getCity = useSelector(
    (state: IApplicationState) => state.getGeolocationCity.data,
  );
  const renderItem = ({item}) => <RadioBox title={item.name} value={item.id} />;
  const onSubMit = () => {
    value
      ? (dispatch(City(value)), navigation.navigate('SignUpForm'))
      : setErr('Le champ est vide');
  };
  const getstate = useSelector((state: IApplicationState) => state.signUp);
  console.log('getstate', getstate);

  return (
    <View style={styles.wraper}>
      <SignUpForm
        title="Quelle est votre ville?"
        iconName="folder-o"
        subMit={onSubMit}
        navigation={navigation}
      />
      {err ? <Text style={styles.styleErr}>{err}</Text> : null}
      <View style={styles.wrapperRadio}>
        <RadioButton.Group
          onValueChange={newValue => setValue(newValue)}
          value={value}>
          <FlatList
            data={getCity}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </RadioButton.Group>
      </View>
    </View>
  );
};

export default GeolocationForm;
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
