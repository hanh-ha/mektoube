import React, {useState} from 'react';
import SignUpForm from '../../components/SignUpForm';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {BirthDay} from '../../store/actions/signUp';
import {useDispatch} from 'react-redux';

const BirthdayForm = ({navigation}) => {
  const [err, setErr]: any = useState();
  const [day, setDay]: any = useState();
  const [month, setMoth]: any = useState();
  const dispatch = useDispatch();
  const [year, setYear]: any = useState();
  const onChangeDate = (date: any) => {
    if (date.toString().length <= 2 && date !== 0) {
      if (date > 31) {
        const aa: any = Math.floor(date / 10);
        setDay(aa);
      } else {
        setDay(date);
      }
    }
  };
  const onChangeMonth = valueMonth => {
    if (valueMonth.toString().length <= 2) {
      if (valueMonth >= 13) {
        const aa: any = Math.floor(valueMonth / 10);
        setMoth(aa);
      } else {
        setMoth(valueMonth);
      }
    }
  };
  const onChangeYear = valueYear => {
    if (valueYear.toString().length <= 4) {
      setYear(valueYear);
    }
  };
  const onSubMit = () => {
    console.log(`${year}- ${month} -${day}`);
    if (
      day > 0 &&
      month > 0 &&
      year > 1960 &&
      year < 2004 &&
      year.toString().length === 4
    ) {
      dispatch(BirthDay(`${year}-${month}-${day}`));
      navigation.navigate('OriginForm');
    } else {
      setErr(<Text style={style.styleErr}>Le champ est vide</Text>);
    }
  };
  return (
    <View>
      <SignUpForm
        title="Quelle est votre date de naissance "
        iconName="birthday-cake"
        subMit={onSubMit}
        navigation={navigation}
      />
      {err}
      <View style={style.wrapperTextInput}>
        <TextInput
          placeholder="JJ"
          style={style.textInput}
          placeholderTextColor="#fdceed"
          onChangeText={date => onChangeDate(date)}
          keyboardType={'numeric'}
          value={day}
        />
        <Text style={style.flash}>/</Text>
        <TextInput
          placeholder="MM"
          style={style.textInput}
          placeholderTextColor="#fdceed"
          onChangeText={valueMonth => onChangeMonth(valueMonth)}
          keyboardType={'numeric'}
          value={month}
        />
        <Text style={style.flash}>/</Text>
        <TextInput
          placeholder="AAAA"
          style={style.textInput}
          placeholderTextColor="#fdceed"
          keyboardType={'numeric'}
          onChangeText={valueYear => onChangeYear(valueYear)}
          value={year}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  textInput: {
    fontSize: 18,
    color: '#fdceed',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    marginRight: 10,
    marginLeft: 10,
    fontFamily: 'AvenirNextCondensed',
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
  wrapperTextInput: {
    position: 'absolute',
    top: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  flash: {
    color: 'white',
  },
});
export default BirthdayForm;
