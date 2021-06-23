import React, {useState} from 'react';
import SignUpForm from '../../components/SignUpForm';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getZipCodeCity} from '../../store/actions/getZipCodeCity';
import {IApplicationState} from '../../store/reducers/state';

const EntityForm = ({navigation}) => {
  const [value, onChange] = useState();
  const dispatch = useDispatch();
  const getCountry = useSelector(
    (state: IApplicationState) => state.signUp?.country,
  );
  const [err, setErr]: any = useState(null);
  const chekcZipCode = useSelector(
    (state: IApplicationState) => state.getZipCodeCity.zipcode,
  );
  const onSubMit = () => {
    dispatch(getZipCodeCity(getCountry, value));
    chekcZipCode
      ? navigation.navigate('ZipcodeFormCity')
      : setErr('Le champ est vide');
  };

  return (
    <View style={styles.wrapper}>
      <SignUpForm
        title="Quel est votre code postal"
        iconName="folder-o"
        subMit={onSubMit}
        navigation={navigation}
      />
      {err ? <Text style={styles.err}>{err}</Text> : null}
      <View style={styles.wrapInput}>
        <TextInput
          placeholder="Code postal ?"
          style={styles.input}
          placeholderTextColor="#fdceed"
          onChangeText={(text: any) => onChange(text)}
        />
      </View>
    </View>
  );
};

export default EntityForm;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  input: {
    borderBottomColor: '#fdceed',
    borderBottomWidth: 1,
    fontFamily: 'AvenirNextCondensed-DemiBold',
    color: 'white',
    fontSize: 15,
  },
  err: {
    position: 'absolute',
    top: 0,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    width: '100%',
    padding: 20,
    backgroundColor: '#E71111',
  },
  wrapInput: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    top: 200,
    paddingHorizontal: 30,
  },
});
