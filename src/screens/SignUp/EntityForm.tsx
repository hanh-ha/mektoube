import React, {useState} from 'react';
import SignUpForm from '../../components/SignUpForm';
import {View, Text, StyleSheet} from 'react-native';
import RadioBox from '../../components/radioBox';
import {RadioButton} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {EntryForm} from '../../store/actions/signUp';

const EntityForm = ({navigation}) => {
  const dispatch = useDispatch();
  const [value, newValues]: any = React.useState();
  const [err, setErr]: any = useState();
  const onChange = newValue => {
    newValues(newValue);
  };
  const onSubMit = () => {
    value
      ? (dispatch(EntryForm(value)), navigation.navigate('BirthdayForm'))
      : (setErr(<Text style={styles.styleErr}>Le champ est vide</Text>),
        setTimeout(function () {
          setErr(null);
        }, 2000));
  };

  return (
    <View style={styles.wraper}>
      <SignUpForm
        title="Vous êtes :"
        iconName="intersex"
        subMit={onSubMit}
        navigation={navigation}
        subTitle=""
      />
      {err}
      <View style={styles.wrapperRadio}>
        <RadioButton.Group
          onValueChange={newValue => onChange(newValue)}
          value={value}>
          <RadioBox title="Homme" value="1" onChange={onChange} />
          <RadioBox title="Femme" value="2" onChange={onChange} />
        </RadioButton.Group>
      </View>
    </View>
  );
};

export default EntityForm;
const styles = StyleSheet.create({
  wraper: {
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
