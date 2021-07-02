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
  const onChange = newValue => {
    setValue(newValue);
  };
  const onSubMit = () => {
    value
      ? (dispatch(originForm(value)), navigation.navigate('FromForm'))
      : (setErr(<Text style={styles.styleErr}>Le champ est vide</Text>),
        setTimeout(function () {
          setErr(null);
        }, 2000));
  };

  return (
    <View style={styles.wraper}>
      <SignUpForm
        title="Quelle est votre origine ?"
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
          <RadioBox title="Algérienne" value="1" onChange={onChange} />
          <RadioBox title="Merocaine" value="2" onChange={onChange} />
          <RadioBox title="Tunisienne" value="3" onChange={onChange} />
          <RadioBox title="Autre" value="4" onChange={onChange} />
          <RadioBox
            title="je la garde poure moi"
            value="5"
            onChange={onChange}
          />
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
