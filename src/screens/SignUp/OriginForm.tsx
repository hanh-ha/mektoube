import React, {useState} from 'react';
import SignUpForm from '../../components/SignUpForm';
import {View, Text, StyleSheet} from 'react-native';
import RadioBox from '../../components/radioBox';
import {RadioButton} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {originForm} from '../../store/actions/signUp';

const OriginForm = ({navigation}) => {
  const [err, setErr]: any = useState();
  const [value, setValue]: any = React.useState();
  const dispatch = useDispatch();
  const onSubMit = () => {
    value
      ? (dispatch(originForm(value)), navigation.navigate('FromForm'))
      : setErr(<Text style={styles.styleErr}>Le champ est vide</Text>);
  };

  return (
    <View style={styles.wraper}>
      <SignUpForm
        title="Quelle est votre origine"
        iconName="map"
        subMit={onSubMit}
        navigation={navigation}
      />
      {err}
      <View style={styles.wrapperRadio}>
        <RadioButton.Group
          onValueChange={newValue => setValue(newValue)}
          value={value}>
          <RadioBox title="Algérienne" value="1" />
          <RadioBox title="Merocaine" value="2" />
          <RadioBox title="Tunisienne" value="3" />
          <RadioBox title="Autre" value="4" />
          <RadioBox title="je la garde poure moi" value="5" />
        </RadioButton.Group>
      </View>
    </View>
  );
};

export default OriginForm;
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
