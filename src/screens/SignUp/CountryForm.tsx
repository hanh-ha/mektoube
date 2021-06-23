import React, {useEffect} from 'react';
import SignUpForm from '../../components/SignUpForm';
import {View, FlatList, StyleSheet} from 'react-native';
import RadioBox from '../../components/radioBox';
import {RadioButton} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {getCountry} from '../../store/actions/getCountry';
import {Country} from '../../store/actions/signUp';
import {IApplicationState} from '../../store/reducers/state';

const CountryForm = ({navigation}) => {
  const [value, setValue]: any = React.useState();
  // const [err, setErr]: any = useState();

  const dispatch = useDispatch();
  const onSubMit = () => {
    value.zipFormat && value.zipRegex
      ? (dispatch(Country(value.id)), navigation.navigate('ZipcodeForm'))
      : (dispatch(Country(value.id)), navigation.navigate('RegionForm'));
  };
  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);
  const countryState = useSelector(
    (state: IApplicationState) =>
      state.Country.data.data?.CONTENT?.ALL?.countries,
  );
  const renderItem = ({item}) => <RadioBox title={item.name} value={item} />;
  return (
    <View style={styles.wraper}>
      <SignUpForm
        title="Quel est votre pays"
        iconName="map"
        subMit={onSubMit}
        navigation={navigation}
      />
      {/* {err} */}
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
  );
};

export default CountryForm;
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
