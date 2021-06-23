import React, {useState} from 'react';
import SignUpForm from '../../components/SignUpForm';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import RadioBox from '../../components/radioBox';
import {RadioButton} from 'react-native-paper';
import {City} from '../../store/actions/signUp';
import {IApplicationState} from '../../store/reducers/state';

const ZipcodeFormCity = ({navigation}) => {
  const [err, setErr]: any = useState(null);
  const getCity = useSelector(
    (state: IApplicationState) => state.getZipCodeCity?.data,
  );
  console.log('getCity', getCity);
  const [value, setValue]: any = React.useState();
  const dispatch = useDispatch();
  const onSubMit = () => {
    value
      ? (dispatch(City(value)), navigation.navigate('SignUpForm'))
      : setErr('Le champ est vide');
  };
  const renderItem = ({item}) => {
    return <RadioBox title={item.name} value={item.id} />;
  };
  return (
    <View style={styles.wraper}>
      <SignUpForm
        title="Quel est votre code postal"
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

export default ZipcodeFormCity;
const styles = StyleSheet.create({
  wraper: {
    flex: 1,
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
  },
});
