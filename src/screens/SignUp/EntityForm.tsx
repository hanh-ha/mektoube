import React, {useState} from 'react';
import SignUpForm from '../../components/SignUpForm';
import {View, Text, StyleSheet} from 'react-native';
import RadioBox from '../../components/radioBox';
import {RadioButton} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {EntryForm} from '../../store/actions/signUp';

const EntityForm = ({navigation}) => {
  const dispatch = useDispatch();
  const [value, setValue]: any = React.useState();
  const [err, setErr]: any = useState();
  const onSubMit = () => {
    value
      ? (dispatch(EntryForm(value)), navigation.navigate('BirthdayForm'))
      : setErr(<Text style={styles.styleErr}>Le champ est vide</Text>);
  };

  return (
    <View style={styles.wraper}>
      <SignUpForm
        title="Vous êtes"
        iconName="intersex"
        subMit={onSubMit}
        navigation={navigation}
      />
      {err}
      <View style={styles.wrapperRadio}>
        <RadioButton.Group
          onValueChange={newValue => setValue(newValue)}
          value={value}>
          <RadioBox title="Homme" value="1" />
          <RadioBox title="Femme" value="2" />
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
