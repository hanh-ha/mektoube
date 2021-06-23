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
  const getSignup = useSelector((state: IApplicationState) => state.signUp);
  useEffect(() => {
    dispatch(getCity(getSignup.country, getSignup.Region));
  }, [getSignup.country, dispatch, getSignup.Region]);
  const getDataCity = useSelector(
    (state: IApplicationState) => state.City.data.data?.CONTENT.ALL.cities,
  );
  const renderItem = ({item}) => <RadioBox title={item.name} value={item.id} />;
  const onSubMit = () => {
    value
      ? (dispatch(City(value)), navigation.navigate('SignUpForm'))
      : setErr(<Text style={styles.styleErr}>Le champ est vide</Text>);
  };
  return (
    <View style={styles.wraper}>
      <SignUpForm
        title="Quelle est votre ville?"
        iconName="folder-o"
        subMit={onSubMit}
        navigation={navigation}
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
